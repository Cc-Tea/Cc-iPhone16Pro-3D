/* =========================================================
   iPhone 16 Pro · Precision Structure Lab
   Scene, interaction and interface logic.
   ========================================================= */

(function () {
  'use strict';

  var THREE = window.THREE;
  var MODEL_API = window.IPHONE_MODEL;

  if (!THREE || !MODEL_API || MODEL_API.error) {
    showEarlyFailure('3D 引擎未能加载，请确认 vendor/three.min.js 存在。');
    return;
  }

  var PARTS = MODEL_API.PARTS;
  var FINISHES = MODEL_API.FINISHES;
  var PART_BY_ID = {};
  PARTS.forEach(function (part) {
    PART_BY_ID[part.id] = part;
  });

  var CALLOUT_IDS = ['screen', 'camera', 'battery', 'logic', 'taptic', 'speaker'];
  var SELECT_COLOR = new THREE.Color('#86e9ff');
  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (selector, parent) {
    return (parent || document).querySelector(selector);
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function damp(current, target, lambda, dt) {
    return THREE.MathUtils.damp(current, target, lambda, dt);
  }

  function smoothStep(value) {
    var t = clamp(value, 0, 1);
    return t * t * (3 - 2 * t);
  }

  function pad2(number) {
    return String(number).padStart(2, '0');
  }

  function iconMarkup(icon) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + icon + '"></use></svg>';
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showEarlyFailure(message) {
    function reveal() {
      var loader = document.getElementById('loader');
      var error = document.getElementById('webgl-error');
      if (loader) loader.classList.add('is-hidden');
      if (error) {
        error.hidden = false;
        var paragraph = error.querySelector('p');
        if (paragraph && message) paragraph.textContent = message;
      }
      document.body.classList.add('is-ready');
      document.body.classList.remove('is-loading');
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', reveal, { once: true });
    } else {
      reveal();
    }
  }

  /* ------------------------------------------------------------------
     App state
     ------------------------------------------------------------------ */

  var state = {
    exploded: false,
    explode: 0,
    explodeTarget: 0,
    selectedId: null,
    hoveredId: null,
    autoRotate: !REDUCED_MOTION,
    finishId: 'white',
    layoutScale: 1,
    booted: false,
    firstVisitHidden: false,
    loading: true,
    backViewActive: false,
    screenOn: true,
    screenLevel: 1,
    screenPulse: 0
  };

  var dom = {};
  var scene;
  var camera;
  var renderer;
  var model;
  var phoneRoot;
  var pickables = [];
  var parts = new Map();
  var partButtons = new Map();
  var mobilePartButtons = new Map();
  var annotations = [];
  var annotationTemplates = [];
  var finishButtons = [];
  var raycaster = new THREE.Raycaster();
  var pointerNdc = new THREE.Vector2();
  var stageWidth = 1;
  var stageHeight = 1;
  var cameraTarget = new THREE.Vector3(0, 0.05, 0);
  var selectionSprite;
  var selectionLight;
  var screenLight;
  var particles;
  var particleMaterial;
  var particleGroup;
  var particleGroupDust;
  var finishMaterialList = [];
  var loaderProgress = 3;
  var loaderTicker = null;
  var bootSafety = null;
  var firstVisitTimer = null;
  var toastTimer = null;
  var selectionToastTimer = null;
  var resizeTick = null;
  var lastFrame = performance.now();
  var elapsed = 0;
  var needInitialRoute = true;

  var orbit = {
    theta: 0.36,
    targetTheta: 0.36,
    phi: 1.34,
    targetPhi: 1.34,
    radius: 34,
    targetRadius: 34,
    dragging: false
  };

  var drag = {
    active: false,
    moved: 0,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startTime: 0,
    pinch: null,
    hadPinch: false
  };

  var pointers = new Map();
  var hoverTipVisible = false;

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */

  function init() {
    cacheDom();
    document.body.classList.add('is-loading');
    buildPartUI();
    buildFinishSwatches();
    buildAnnotationUI();
    renderOverview();
    bindStaticUI();
    startLoaderProgress();

    try {
      setupScene();
      updateCamera(0.016, true);
      attachCanvasEvents();
      setupResizeHandling();
      syncAllSelectionUI();
      syncViewUI();
      syncAutoRotateUI();
      syncScreenUI();
      syncDetailsPanelA11y();
      setLoaderProgress(92);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          finishBoot();
        });
      });
      requestAnimationFrame(animate);
    } catch (error) {
      console.error('[iPhone teardown]', error);
      clearInterval(loaderTicker);
      showEarlyFailure('3D 场景初始化失败：' + (error && error.message ? error.message : '未知错误'));
    }
  }

  function cacheDom() {
    dom.app = document.getElementById('app');
    dom.stage = document.getElementById('stage');
    dom.canvas = document.getElementById('scene');
    dom.partsList = document.getElementById('parts-list');
    dom.mobileParts = document.getElementById('mobile-parts');
    dom.mobilePartsTrack = document.getElementById('mobile-parts-track');
    dom.finishSwatches = document.getElementById('finish-swatches');
    dom.finishName = document.getElementById('finish-name');
    dom.detailsPanel = document.getElementById('details-panel');
    dom.detailContent = document.getElementById('detail-content');
    dom.detailModeLabel = document.getElementById('detail-mode-label');
    dom.detailClose = document.getElementById('detail-close');
    dom.explodeToggle = document.getElementById('explode-toggle');
    dom.explodeLabel = document.getElementById('explode-label');
    dom.explodeKicker = document.getElementById('explode-kicker');
    dom.autoRotate = document.getElementById('auto-rotate');
    dom.resetView = document.getElementById('reset-view');
    dom.mobileInfo = document.getElementById('mobile-info');
    dom.helpOpen = document.getElementById('help-open');
    dom.helpDialog = document.getElementById('help-dialog');
    dom.helpClose = document.getElementById('help-close');
    dom.helpStart = document.getElementById('help-start');
    dom.viewState = document.getElementById('view-state');
    dom.viewCode = document.getElementById('view-code');
    dom.assemblyFill = document.getElementById('assembly-fill');
    dom.assemblyValue = document.getElementById('assembly-value');
    dom.callouts = document.getElementById('callouts');
    dom.calloutLines = document.getElementById('callout-lines');
    dom.reticle = document.getElementById('reticle');
    dom.reticleTag = document.getElementById('reticle-tag');
    dom.hoverTip = document.getElementById('hover-tip');
    dom.hoverTipIndex = document.getElementById('hover-tip-index');
    dom.hoverTipName = document.getElementById('hover-tip-name');
    dom.hoverTipAction = document.getElementById('hover-tip-action');
    dom.firstVisit = document.getElementById('first-visit');
    dom.firstVisitClose = document.getElementById('first-visit-close');
    dom.selectionToast = document.getElementById('selection-toast');
    dom.screenHint = document.getElementById('screen-hint');
    dom.screenToggle = document.getElementById('screen-toggle');
    dom.screenToggleLabel = document.getElementById('screen-toggle-label');
    dom.toast = document.getElementById('toast');
    dom.loader = document.getElementById('loader');
    dom.loaderFill = document.getElementById('loader-fill');
    dom.loaderPercent = document.getElementById('loader-percent');
    dom.webglError = document.getElementById('webgl-error');
    dom.viewSwitch = document.getElementById('view-switch');
    dom.viewButtons = dom.viewSwitch ? Array.from(dom.viewSwitch.querySelectorAll('[data-view-preset]')) : [];
  }

  function startLoaderProgress() {
    setLoaderProgress(4);
    loaderTicker = window.setInterval(function () {
      if (loaderProgress >= 88) return;
      loaderProgress += Math.random() * 8 + 2;
      setLoaderProgress(Math.min(loaderProgress, 88));
    }, 130);
  }

  function setLoaderProgress(value) {
    loaderProgress = value;
    if (dom.loaderFill) {
      dom.loaderFill.style.transform = 'scaleX(' + (value / 100) + ')';
    }
    if (dom.loaderPercent) {
      dom.loaderPercent.textContent = String(Math.round(value)).padStart(2, '0');
    }
  }

  function finishBoot() {
    if (state.booted) return;
    state.booted = true;
    window.clearInterval(loaderTicker);
    setLoaderProgress(100);
    if (needInitialRoute) {
      applyInitialRoute();
      needInitialRoute = false;
    }
    window.setTimeout(function () {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
      if (dom.loader) dom.loader.classList.add('is-hidden');
      state.loading = false;
      scheduleFirstVisitTimer();
      if (dom.canvas) dom.canvas.focus({ preventScroll: true });
    }, 520);
  }

  function scheduleFirstVisitTimer() {
    window.clearTimeout(firstVisitTimer);
    firstVisitTimer = window.setTimeout(function () {
      hideFirstVisit();
    }, 11000);
  }

  function hideFirstVisit() {
    if (state.firstVisitHidden || !dom.firstVisit) return;
    state.firstVisitHidden = true;
    window.clearTimeout(firstVisitTimer);
    dom.firstVisit.classList.add('is-hidden');
  }

  /* ------------------------------------------------------------------
     UI construction
     ------------------------------------------------------------------ */

  function buildPartUI() {
    dom.partsList.innerHTML = '';
    dom.mobilePartsTrack.innerHTML = '';

    PARTS.forEach(function (part, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'part-item';
      button.dataset.part = part.id;
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('title', part.name);
      button.innerHTML =
        '<span class="part-item__index">' + pad2(index + 1) + '</span>' +
        '<span class="part-item__icon">' + iconMarkup(part.icon) + '</span>' +
        '<span class="part-item__text">' +
          '<strong>' + escapeHTML(part.listName) + '</strong>' +
          '<small>' + escapeHTML(part.listSpec) + '</small>' +
        '</span>' +
        '<span class="part-item__marker" aria-hidden="true"></span>';

      button.addEventListener('click', function () {
        selectPart(part.id);
      });
      button.addEventListener('pointerenter', function () {
        setHoveredPart(part.id);
      });
      button.addEventListener('pointerleave', function () {
        if (state.hoveredId === part.id) setHoveredPart(null);
      });
      button.addEventListener('focus', function () {
        setHoveredPart(part.id);
      });
      button.addEventListener('blur', function () {
        if (state.hoveredId === part.id) setHoveredPart(null);
      });
      dom.partsList.appendChild(button);
      partButtons.set(part.id, button);

      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'mobile-part';
      chip.dataset.part = part.id;
      chip.setAttribute('aria-pressed', 'false');
      chip.innerHTML = iconMarkup(part.icon) + '<span>' + escapeHTML(part.listName) + '</span>';
      chip.addEventListener('click', function () {
        selectPart(part.id);
      });
      dom.mobilePartsTrack.appendChild(chip);
      mobilePartButtons.set(part.id, chip);
    });
  }

  function buildFinishSwatches() {
    finishButtons = [];
    FINISHES.forEach(function (finish) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'finish-swatch' + (finish.id === state.finishId ? ' is-active' : '');
      button.style.setProperty('--swatch', finish.swatch);
      button.style.setProperty('--swatch-glow', finish.glow);
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', finish.id === state.finishId ? 'true' : 'false');
      button.setAttribute('aria-label', finish.name);
      button.setAttribute('title', finish.name);
      button.dataset.finish = finish.id;
      button.addEventListener('click', function () {
        setFinish(finish.id);
      });
      dom.finishSwatches.appendChild(button);
      finishButtons.push(button);
    });
    dom.finishName.textContent = getFinish().name;
  }

  function buildAnnotationUI() {
    annotations = [];
    annotationTemplates = [];
    CALLOUT_IDS.forEach(function (id) {
      var part = PART_BY_ID[id];
      if (!part || !part.annotation) return;
      annotationTemplates.push({ id: id, side: part.annotation.side });

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'callout callout--' + part.annotation.side;
      button.dataset.part = id;
      button.setAttribute('aria-label', '查看' + part.annotation.title + '详情');
      button.innerHTML =
        '<span class="callout__index">' + pad2(part.index) + '</span>' +
        '<span class="callout__body">' +
          '<strong>' + escapeHTML(part.annotation.title) + '</strong>' +
          '<small>' + escapeHTML(part.annotation.spec) + '</small>' +
        '</span>';
      button.style.visibility = 'hidden';
      button.addEventListener('click', function () {
        selectPart(id);
      });
      button.addEventListener('pointerenter', function () {
        setHoveredPart(id);
        var annotation = annotations.filter(function (item) { return item.id === id; })[0];
        if (annotation) annotation.path.classList.add('is-active');
      });
      button.addEventListener('pointerleave', function () {
        if (state.hoveredId === id) setHoveredPart(null);
        var annotation = annotations.filter(function (item) { return item.id === id; })[0];
        if (annotation && state.selectedId !== id) annotation.path.classList.remove('is-active');
      });
      dom.callouts.appendChild(button);

      var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('opacity', '0');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'callout-line');
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('class', 'callout-anchor');
      dot.setAttribute('r', '2.2');
      group.appendChild(path);
      group.appendChild(dot);
      dom.calloutLines.appendChild(group);

      annotations.push({
        id: id,
        side: part.annotation.side,
        button: button,
        group: group,
        path: path,
        dot: dot,
        width: 154,
        height: 38,
        top: 0,
        visible: false
      });
    });
  }

  /* ------------------------------------------------------------------
     Static bindings
     ------------------------------------------------------------------ */

  function bindStaticUI() {
    dom.explodeToggle.addEventListener('click', function () {
      toggleExploded();
    });

    dom.autoRotate.addEventListener('click', function () {
      setAutoRotate(!state.autoRotate);
    });

    dom.screenToggle.addEventListener('click', function () {
      setScreenPower(!state.screenOn);
    });

    dom.screenHint.addEventListener('click', function () {
      setScreenPower(true);
    });

    dom.resetView.addEventListener('click', function () {
      resetView();
    });

    dom.mobileInfo.addEventListener('click', function () {
      openDetailsSheet();
    });

    dom.detailClose.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 900px)').matches && state.selectedId) {
        closeDetailsSheet();
      } else {
        clearSelection();
      }
    });

    dom.helpOpen.addEventListener('click', openHelp);
    dom.helpClose.addEventListener('click', closeHelp);
    dom.helpStart.addEventListener('click', closeHelp);

    dom.helpDialog.addEventListener('click', function (event) {
      if (event.target === dom.helpDialog) closeHelp();
    });

    dom.helpDialog.addEventListener('close', function () {
      dom.helpOpen.focus({ preventScroll: true });
    });

    dom.firstVisitClose.addEventListener('click', function (event) {
      event.stopPropagation();
      hideFirstVisit();
    });

    dom.firstVisit.addEventListener('click', hideFirstVisit);

    dom.viewButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        setViewPreset(button.dataset.viewPreset);
      });
    });

    dom.detailContent.addEventListener('click', function (event) {
      var navButton = event.target.closest('[data-nav]');
      if (!navButton || !state.selectedId) return;
      var currentIndex = PARTS.findIndex(function (part) {
        return part.id === state.selectedId;
      });
      var delta = navButton.dataset.nav === 'next' ? 1 : -1;
      var nextIndex = (currentIndex + delta + PARTS.length) % PARTS.length;
      selectPart(PARTS[nextIndex].id);
    });

    document.addEventListener('keydown', handleKeydown);

    if (window.matchMedia) {
      var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', function (event) {
          if (event.matches) {
            state.autoRotate = false;
            syncAutoRotateUI();
          }
        });
      }
    }
  }

  function openHelp() {
    hideFirstVisit();
    if (!dom.helpDialog.open) {
      if (typeof dom.helpDialog.showModal === 'function') {
        dom.helpDialog.showModal();
      } else {
        dom.helpDialog.setAttribute('open', '');
      }
      window.setTimeout(function () {
        dom.helpClose.focus({ preventScroll: true });
      }, 40);
    }
  }

  function closeHelp() {
    if (dom.helpDialog.open && typeof dom.helpDialog.close === 'function') {
      dom.helpDialog.close();
    } else {
      dom.helpDialog.removeAttribute('open');
    }
  }

  function handleKeydown(event) {
    var tag = event.target && event.target.tagName;
    var inDialog = dom.helpDialog && dom.helpDialog.open;
    if (inDialog) {
      if (event.key === 'Escape') closeHelp();
      return;
    }

    if (event.key === 'Escape') {
      if (state.selectedId) {
        clearSelection();
      } else if (dom.detailsPanel.classList.contains('is-open')) {
        closeDetailsSheet();
      }
      return;
    }

    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) {
      return;
    }
    if (tag === 'BUTTON' || tag === 'A') return;

    if (event.code === 'Space') {
      event.preventDefault();
      toggleExploded();
    } else if (event.key === 'r' || event.key === 'R') {
      resetView();
    } else if (event.key === 'a' || event.key === 'A') {
      setAutoRotate(!state.autoRotate);
    } else if (event.key === 'l' || event.key === 'L') {
      setScreenPower(!state.screenOn);
    }
  }

  /* ------------------------------------------------------------------
     Scene setup
     ------------------------------------------------------------------ */

  function setupScene() {
    renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.6 : 1.9));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.shadowMap.enabled = false;
    renderer.setClearColor(0x000000, 0);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(getCameraFov(), 1, 0.1, 180);
    camera.position.set(0, 0, 34);

    setupEnvironment();
    setupLights();

    model = MODEL_API.buildModel(renderer, state.finishId);
    phoneRoot = model.root;
    pickables = model.pickables;
    parts = model.parts;
    scene.add(phoneRoot);

    var screenPart = parts.get('screen');
    if (screenPart) {
      screenLight = new THREE.PointLight(0xcfefff, 3.6, 10, 2);
      screenLight.position.set(0, 0.15, 1.35);
      screenPart.root.add(screenLight);
    }

    // Flatten finish materials so transitions are trivial to animate.
    finishMaterialList = [];
    Object.keys(model.finishMaterials).forEach(function (role) {
      model.finishMaterials[role].forEach(function (material) {
        material.userData.finishRole = role;
        finishMaterialList.push(material);
      });
    });

    setupParticles();
    setupSelectionVisuals();
    setupInitialCamera();
    measureStage();
    resizeScene(true);

    // Make the canvas keyboard-focusable for the built-in shortcuts.
    dom.canvas.setAttribute('tabindex', '0');
    dom.canvas.setAttribute('role', 'application');
    dom.canvas.setAttribute(
      'aria-label',
      'iPhone 16 Pro 可交互三维模型。拖拽旋转，滚轮缩放，点击部件查看拆解和参数。'
    );

    window.iphoneTeardown = {
      state: state,
      scene: scene,
      camera: camera,
      renderer: renderer,
      model: model,
      orbit: orbit,
      selectPart: selectPart,
      clearSelection: clearSelection,
      setExploded: function (value) { setExploded(value); },
      toggleExploded: toggleExploded,
      resetView: resetView,
      setFinish: setFinish,
      setScreenPower: setScreenPower,
      debugAdvance: advanceSimulation
    };
  }

  function advanceSimulation(seconds) {
    var steps = Math.max(1, Math.ceil(seconds * 60));
    var dt = seconds / steps;
    for (var i = 0; i < steps; i++) {
      elapsed += dt;
      updateCamera(dt);
      updateExplosion(dt);
      updateFinishAnimation(dt);
      updatePartMaterials(dt);
      updateScreenState(dt);
      updateSelectionVisuals(dt);
    }
    phoneRoot.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    updateAnnotations();
    updateReticle();
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  function getCameraFov() {
    if (window.innerWidth <= 680) return 42;
    if (window.innerWidth <= 900) return 38;
    return 32;
  }

  function setupEnvironment() {
    var canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    var ctx = canvas.getContext('2d');

    var sky = ctx.createLinearGradient(0, 0, 0, 512);
    sky.addColorStop(0, '#040507');
    sky.addColorStop(0.44, '#11151a');
    sky.addColorStop(0.58, '#37332e');
    sky.addColorStop(0.8, '#080b0e');
    sky.addColorStop(1, '#020304');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 1024, 512);

    function softLight(x, y, rx, ry, colors) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, ry / rx);
      var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      colors.forEach(function (stop) {
        gradient.addColorStop(stop[0], stop[1]);
      });
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    softLight(195, 118, 260, 100, [
      [0, 'rgba(255, 236, 207, 0.9)'],
      [0.35, 'rgba(255, 210, 160, 0.28)'],
      [1, 'rgba(255, 210, 160, 0)']
    ]);
    softLight(790, 154, 230, 90, [
      [0, 'rgba(157, 227, 255, 0.42)'],
      [0.4, 'rgba(72, 146, 180, 0.1)'],
      [1, 'rgba(72, 146, 180, 0)']
    ]);
    softLight(545, 355, 350, 130, [
      [0, 'rgba(255, 178, 113, 0.34)'],
      [0.4, 'rgba(135, 89, 58, 0.12)'],
      [1, 'rgba(0, 0, 0, 0)']
    ]);
    softLight(104, 410, 210, 80, [
      [0, 'rgba(255, 255, 255, 0.34)'],
      [1, 'rgba(255, 255, 255, 0)']
    ]);
    softLight(720, 420, 300, 100, [
      [0, 'rgba(71, 135, 164, 0.22)'],
      [1, 'rgba(0, 0, 0, 0)']
    ]);

    // A few vertical studio strips.
    ctx.fillStyle = 'rgba(236, 243, 247, 0.6)';
    ctx.fillRect(60, 0, 7, 210);
    ctx.fillStyle = 'rgba(186, 222, 235, 0.32)';
    ctx.fillRect(95, 0, 2, 160);
    ctx.fillStyle = 'rgba(255, 214, 172, 0.34)';
    ctx.fillRect(920, 135, 5, 160);

    var texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    var pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    var env = pmrem.fromEquirectangular(texture).texture;
    scene.environment = env;
    texture.dispose();
    pmrem.dispose();
  }

  function setupLights() {
    scene.add(new THREE.HemisphereLight(0xb8d7e6, 0x141617, 0.95));

    var key = new THREE.DirectionalLight(0xfffbf4, 3.8);
    key.position.set(7.5, 10.5, 11);
    scene.add(key);

    var fill = new THREE.DirectionalLight(0x9fe5ff, 1.9);
    fill.position.set(-10, 2.5, 7);
    scene.add(fill);

    var rim = new THREE.DirectionalLight(0xbfe8ff, 1.4);
    rim.position.set(-5, -4, -9);
    scene.add(rim);

    var backKey = new THREE.DirectionalLight(0xfffbf5, 2.2);
    backKey.position.set(4.5, 5.5, -10);
    scene.add(backKey);

    var backFill = new THREE.DirectionalLight(0x9fd7e4, 1.1);
    backFill.position.set(-7, 1.5, -7);
    scene.add(backFill);

    var top = new THREE.PointLight(0xfff7ee, 32, 32, 2);
    top.position.set(0.5, 10.5, 7);
    scene.add(top);

    var coolKick = new THREE.PointLight(0x72e7ff, 20, 24, 2);
    coolKick.position.set(8, -2, 5);
    scene.add(coolKick);
  }

  function setupParticles() {
    particleGroup = new THREE.Group();
    particleGroup.name = 'ambient dust';
    scene.add(particleGroup);

    var count = window.innerWidth < 700 ? 190 : 420;
    var positions = new Float32Array(count * 3);
    var colors = new Float32Array(count * 3);
    var colorA = new THREE.Color('#a6d6dd');
    var colorB = new THREE.Color('#d2b18b');
    var colorC = new THREE.Color('#638c95');
    var random = mulberry32(196610);

    for (var i = 0; i < count; i++) {
      var angle = random() * Math.PI * 2;
      var radius = 5.5 + random() * 12;
      positions[i * 3] = Math.cos(angle) * radius * (0.9 + random() * 0.4);
      positions[i * 3 + 1] = (random() - 0.5) * 18;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 3.8;
      var pick = random();
      var color = pick < 0.6 ? colorA : pick < 0.85 ? colorB : colorC;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    particleMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 700 ? 0.075 : 0.062,
      map: model.textures.glow,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true,
      alphaTest: 0.01
    });

    particles = new THREE.Points(geometry, particleMaterial);
    particles.frustumCulled = false;
    particleGroup.add(particles);

    var dustGeo = new THREE.BufferGeometry();
    var dustPositions = new Float32Array(90 * 3);
    for (var j = 0; j < 90; j++) {
      dustPositions[j * 3] = (random() - 0.5) * 29;
      dustPositions[j * 3 + 1] = (random() - 0.5) * 19;
      dustPositions[j * 3 + 2] = -5 - random() * 11;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    particleGroupDust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: 0.13,
        map: model.textures.glow,
        color: new THREE.Color('#d6c0a5'),
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        alphaTest: 0.01
      })
    );
    particleGroupDust.frustumCulled = false;
    particleGroup.add(particleGroupDust);
  }

  function setupSelectionVisuals() {
    var spriteMaterial = new THREE.SpriteMaterial({
      map: model.textures.glow,
      color: new THREE.Color('#6ce7ff'),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending
    });
    selectionSprite = new THREE.Sprite(spriteMaterial);
    selectionSprite.scale.set(5, 5, 1);
    selectionSprite.renderOrder = 3;
    scene.add(selectionSprite);

    selectionLight = new THREE.PointLight(0x73e9ff, 0, 10, 2);
    scene.add(selectionLight);
  }

  function setupInitialCamera() {
    measureStage();
    var fit = getFitRadius(false);
    orbit.theta = 0.4;
    orbit.targetTheta = 0.4;
    orbit.phi = 1.33;
    orbit.targetPhi = 1.33;
    orbit.radius = fit * 1.16;
    orbit.targetRadius = fit;
    orbit.dragging = false;
    updateCamera(0.016, true);
  }

  function mulberry32(seed) {
    return function () {
      var t = seed += 0x6d2b79f5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ------------------------------------------------------------------
     Resize & layout
     ------------------------------------------------------------------ */

  function measureStage() {
    if (!dom.stage) return;
    stageWidth = Math.max(1, dom.stage.clientWidth);
    stageHeight = Math.max(1, dom.stage.clientHeight);
  }

  function getExplodeScale() {
    if (window.innerWidth <= 680) return 0.6;
    if (window.innerWidth <= 900) return 0.76;
    if (window.innerWidth <= 1180) return 0.86;
    return 1;
  }

  function getFitRadius(exploded) {
    var aspect = stageWidth / Math.max(1, stageHeight);
    var fov = THREE.MathUtils.degToRad(camera ? camera.fov : getCameraFov());
    var tan = Math.tan(fov / 2);
    var scale = getExplodeScale();
    var halfHeight = exploded ? 8.75 + 2.45 * scale : 8.85;
    var halfWidth = exploded ? 4.05 + 4.8 * scale : 4.1;
    var radius = Math.max(
      halfHeight / tan,
      halfWidth / (tan * Math.max(0.35, aspect))
    );
    var margin = window.innerWidth <= 680 ? 1.13 : window.innerWidth <= 900 ? 1.08 : 1.055;
    return clamp(radius * margin, 15, 72);
  }

  function resizeScene(force) {
    if (!renderer || !camera || !dom.stage) return;
    measureStage();
    var width = stageWidth;
    var height = stageHeight;
    if (width <= 0 || height <= 0) return;

    var fov = getCameraFov();
    var fovChanged = Math.abs(camera.fov - fov) > 0.01;
    camera.fov = fov;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.6 : 1.9));
    renderer.setSize(width, height, false);

    state.layoutScale = getExplodeScale();
    cacheAnnotationSizes();
    dom.calloutLines.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    dom.calloutLines.setAttribute('width', width);
    dom.calloutLines.setAttribute('height', height);

    syncDetailsPanelA11y();

    var fit = getFitRadius(state.exploded);
    var focusedPart = state.selectedId ? parts.get(state.selectedId) : null;
    orbit.targetRadius = fit * (focusedPart ? getFocusZoomFactor(focusedPart) : 1);

    if (dom.reticle) {
      dom.reticle.style.width = '0px';
      dom.reticle.style.height = '0px';
    }
  }

  function scheduleResize() {
    window.cancelAnimationFrame(resizeTick);
    resizeTick = window.requestAnimationFrame(function () {
      resizeScene(false);
    });
  }

  function setupResizeHandling() {
    window.addEventListener('resize', scheduleResize);
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        scheduleResize();
      });
      observer.observe(dom.stage);
    }
  }

  function cacheAnnotationSizes() {
    annotations.forEach(function (annotation) {
      var width = annotation.button.offsetWidth;
      var height = annotation.button.offsetHeight;
      if (width > 0) annotation.width = width;
      if (height > 0) annotation.height = height;
    });
  }

  /* ------------------------------------------------------------------
     Camera
     ------------------------------------------------------------------ */

  function updateCamera(dt, immediate) {
    if (!camera) return;

    if (state.autoRotate && !drag.active && !REDUCED_MOTION) {
      orbit.targetTheta += dt * 0.055;
    }

    var desiredTarget = new THREE.Vector3(0, 0.05, 0);
    if (state.selectedId) {
      var selectedPart = parts.get(state.selectedId);
      if (selectedPart && selectedPart.centerLocal) {
        desiredTarget.copy(selectedPart.centerLocal).applyMatrix4(selectedPart.root.matrixWorld);
        desiredTarget.y += 0.08;
      }
    }

    if (immediate) {
      cameraTarget.copy(desiredTarget);
      orbit.theta = orbit.targetTheta;
      orbit.phi = orbit.targetPhi;
      orbit.radius = orbit.targetRadius;
    } else {
      cameraTarget.lerp(desiredTarget, 1 - Math.exp(-4.2 * dt));
      orbit.theta = damp(orbit.theta, orbit.targetTheta, 6.5, dt);
      orbit.phi = damp(orbit.phi, orbit.targetPhi, 6.5, dt);
      orbit.radius = damp(orbit.radius, orbit.targetRadius, 4.8, dt);
    }

    var sinPhi = Math.sin(orbit.phi);
    var x = Math.sin(orbit.theta) * sinPhi * orbit.radius;
    var y = Math.cos(orbit.phi) * orbit.radius;
    var z = Math.cos(orbit.theta) * sinPhi * orbit.radius;

    camera.position.set(x + cameraTarget.x, y + cameraTarget.y, z + cameraTarget.z);
    camera.lookAt(cameraTarget);
    camera.updateMatrixWorld(true);
    syncViewSwitch();
  }

  function resetView() {
    orbit.targetTheta = 0.4;
    orbit.targetPhi = 1.33;
    var focusedPart = state.selectedId ? parts.get(state.selectedId) : null;
    orbit.targetRadius = getFitRadius(state.exploded) * (focusedPart ? getFocusZoomFactor(focusedPart) : 1);
    orbit.dragging = false;
  }

  function setViewPreset(preset) {
    pauseAutoRotate();
    hideFirstVisit();
    var target = preset === 'back' ? Math.PI - 0.36 : 0.4;
    orbit.targetTheta = nearestAngle(target, orbit.theta);
    orbit.targetPhi = 1.33;
  }

  function nearestAngle(target, current) {
    var twoPi = Math.PI * 2;
    var currentMod = ((current % twoPi) + twoPi) % twoPi;
    var targetMod = ((target % twoPi) + twoPi) % twoPi;
    var delta = targetMod - currentMod;
    if (delta > Math.PI) delta -= twoPi;
    if (delta < -Math.PI) delta += twoPi;
    return current + delta;
  }

  function syncViewSwitch() {
    var back = Math.cos(orbit.theta) < -0.08;
    if (back === state.backViewActive) return;
    state.backViewActive = back;
    dom.viewButtons.forEach(function (button) {
      var active = button.dataset.viewPreset === (back ? 'back' : 'front');
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setAutoRotate(value) {
    state.autoRotate = Boolean(value);
    syncAutoRotateUI();
  }

  function syncAutoRotateUI() {
    if (!dom.autoRotate) return;
    dom.autoRotate.classList.toggle('is-active', state.autoRotate);
    dom.autoRotate.setAttribute('aria-pressed', state.autoRotate ? 'true' : 'false');
    dom.autoRotate.title = state.autoRotate ? '暂停自动旋转（A）' : '开启自动旋转（A）';
  }

  function pauseAutoRotate() {
    if (!state.autoRotate) return;
    state.autoRotate = false;
    syncAutoRotateUI();
  }

  /* ------------------------------------------------------------------
     Screen power / lock screen
     ------------------------------------------------------------------ */

  function setScreenPower(value, options) {
    options = options || {};
    var next = Boolean(value);
    hideFirstVisit();
    if (next === state.screenOn) {
      syncScreenUI();
      return;
    }
    state.screenOn = next;
    if (next) {
      state.screenPulse = REDUCED_MOTION ? 0 : 1;
      if (REDUCED_MOTION) state.screenLevel = 1;
    } else {
      state.screenPulse = 0;
      if (REDUCED_MOTION) state.screenLevel = 0;
    }
    hideSelectionToast();
    syncScreenUI();
  }

  function syncScreenUI() {
    if (dom.app) {
      dom.app.dataset.screen = state.screenOn ? 'on' : 'off';
    }
    if (dom.screenToggle) {
      dom.screenToggle.classList.toggle('is-active', state.screenOn);
      dom.screenToggle.setAttribute('aria-pressed', state.screenOn ? 'true' : 'false');
      dom.screenToggle.title = state.screenOn ? '熄灭屏幕（L）' : '点亮屏幕（L）';
    }
    if (dom.screenToggleLabel) {
      dom.screenToggleLabel.textContent = state.screenOn ? '熄屏' : '亮屏';
    }
    if (dom.screenHint) {
      var showHint = !state.screenOn && !state.selectedId;
      dom.screenHint.classList.toggle('is-visible', showHint);
      dom.screenHint.setAttribute('aria-hidden', showHint ? 'false' : 'true');
      dom.screenHint.tabIndex = showHint ? 0 : -1;
    }
  }

  function updateScreenState(dt) {
    var screenPart = parts.get('screen');
    if (!screenPart) return;

    var target = state.screenOn ? 1 : 0;
    state.screenLevel = damp(state.screenLevel, target, state.screenOn ? 6.4 : 9.5, dt);
    if (Math.abs(state.screenLevel - target) < 0.0008) state.screenLevel = target;

    state.screenPulse = damp(state.screenPulse, 0, 2.15, dt);
    if (state.screenPulse < 0.0008) state.screenPulse = 0;

    var brightness = clamp(state.screenLevel + state.screenPulse * 0.34, 0, 1.32);
    var displayMaterial = screenPart.displayMaterial;
    if (displayMaterial) {
      if (!screenPart.screenTexture) screenPart.screenTexture = displayMaterial.map;
      if (!state.screenOn && state.screenLevel < 0.012 && displayMaterial.map) {
        displayMaterial.map = null;
        displayMaterial.needsUpdate = true;
      } else if (state.screenOn && !displayMaterial.map && screenPart.screenTexture) {
        displayMaterial.map = screenPart.screenTexture;
        displayMaterial.needsUpdate = true;
      }
      if (!displayMaterial.map) {
        displayMaterial.color.setRGB(0, 0, 0);
        if (screenLight) {
          screenLight.intensity = damp(screenLight.intensity, 0, 9, dt);
        }
        return;
      }
      displayMaterial.color.setRGB(
        0.0008 + brightness * 0.972,
        0.0008 + brightness * 0.997,
        0.001 + brightness * 1.012
      );
    }

    if (screenLight) {
      var lightIntensity = state.screenLevel * 3.2 + state.screenPulse * 2.4;
      screenLight.intensity = damp(screenLight.intensity, lightIntensity, 7, dt);
    }
  }

  /* ------------------------------------------------------------------
     Pointer interaction
     ------------------------------------------------------------------ */

  function attachCanvasEvents() {
    dom.canvas.addEventListener('pointerdown', onPointerDown);
    dom.canvas.addEventListener('pointermove', onPointerMove);
    dom.canvas.addEventListener('pointerup', onPointerUp);
    dom.canvas.addEventListener('pointercancel', onPointerCancel);
    dom.canvas.addEventListener('pointerleave', onPointerLeave);
    dom.canvas.addEventListener('wheel', onWheel, { passive: false });
    dom.canvas.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  }

  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    hideHoverTip();
    if (dom.canvas.focus) {
      dom.canvas.focus({ preventScroll: true });
    }

    if (dom.canvas.setPointerCapture) {
      try { dom.canvas.setPointerCapture(event.pointerId); } catch (error) { /* ignored */ }
    }

    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 1) {
      drag.active = true;
      drag.moved = 0;
      drag.startX = event.clientX;
      drag.startY = event.clientY;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.startTime = performance.now();
      drag.pinch = null;
      drag.hadPinch = false;
      orbit.dragging = true;
      dom.canvas.classList.add('is-dragging');
    } else if (pointers.size === 2) {
      var points = Array.from(pointers.values());
      drag.pinch = {
        distance: Math.max(12, Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)),
        radius: orbit.targetRadius
      };
      drag.hadPinch = true;
      drag.moved = 999;
    }
  }

  function onPointerMove(event) {
    if (pointers.has(event.pointerId)) {
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    if (pointers.size >= 2 && drag.pinch) {
      var points = Array.from(pointers.values());
      var distance = Math.max(12, Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y));
      var fit = getFitRadius(state.exploded);
      orbit.targetRadius = clamp(
        drag.pinch.radius * (drag.pinch.distance / distance),
        fit * 0.42,
        fit * 2.15
      );
      drag.moved = 999;
      pauseAutoRotate();
      return;
    }

    if (drag.active && pointers.has(event.pointerId)) {
      var dx = event.clientX - drag.lastX;
      var dy = event.clientY - drag.lastY;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);

      if (drag.moved > 2) {
        pauseAutoRotate();
        orbit.targetTheta -= dx * 0.0054;
        orbit.targetPhi = clamp(orbit.targetPhi - dy * 0.0052, 0.48, 2.3);
        orbit.dragging = true;
      }
      hideHoverTip();
      return;
    }

    if (event.pointerType === 'mouse' && !state.loading) {
      updatePointerHover(event);
    }
  }

  function onPointerUp(event) {
    var wasTracking = pointers.has(event.pointerId);
    if (!wasTracking) return;
    var point = pointers.get(event.pointerId);
    pointers.delete(event.pointerId);
    try {
      if (dom.canvas.releasePointerCapture) dom.canvas.releasePointerCapture(event.pointerId);
    } catch (error) { /* ignored */ }

    if (pointers.size === 0) {
      var shouldTap = drag.active &&
        drag.moved < 6 &&
        !drag.hadPinch &&
        performance.now() - drag.startTime < 700;
      drag.active = false;
      drag.pinch = null;
      orbit.dragging = false;
      dom.canvas.classList.remove('is-dragging');
      if (shouldTap) {
        handleSceneTap(event.clientX, event.clientY);
      }
      drag.hadPinch = false;
      if (event.pointerType === 'mouse') {
        window.setTimeout(function () {
          if (pointers.size === 0) updatePointerHover(event);
        }, 30);
      }
    } else if (pointers.size === 1) {
      var remaining = Array.from(pointers.values())[0];
      drag.active = true;
      drag.moved = 999;
      drag.lastX = remaining.x;
      drag.lastY = remaining.y;
      drag.pinch = null;
    }
  }

  function onPointerCancel(event) {
    pointers.delete(event.pointerId);
    if (pointers.size === 0) {
      drag.active = false;
      drag.pinch = null;
      orbit.dragging = false;
      drag.hadPinch = false;
      dom.canvas.classList.remove('is-dragging');
    }
  }

  function onPointerLeave() {
    if (!drag.active) {
      hideHoverTip();
      setHoveredPart(null);
    }
  }

  function onWheel(event) {
    event.preventDefault();
    pauseAutoRotate();
    hideHoverTip();
    var factor = Math.exp(event.deltaY * 0.00115);
    var fit = getFitRadius(state.exploded);
    orbit.targetRadius = clamp(orbit.targetRadius * factor, fit * 0.4, fit * 2.2);
  }

  function handleSceneTap(clientX, clientY) {
    var id = pickPartAt(clientX, clientY, false);
    if (id) {
      if (id === 'screen' && !state.screenOn) {
        setScreenPower(true);
        return;
      }
      selectPart(id);
    } else if (state.selectedId || detailsSheetIsOpen()) {
      clearSelection();
    } else {
      hideFirstVisit();
    }
  }

  function pickPartAt(clientX, clientY, forHover) {
    if (!renderer || !camera) return null;
    var rect = dom.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    var hits = raycaster.intersectObjects(pickables, false);

    if (!hits.length) return null;

    var filtered = [];
    for (var i = 0; i < hits.length; i++) {
      var hit = hits[i];
      var material = hit.object && hit.object.material;
      if (!hit.object.visible) continue;
      if (material && material.opacity !== undefined && material.transparent && material.opacity < 0.022) continue;
      filtered.push(hit);
    }
    if (!filtered.length) return null;

    if (!forHover && state.selectedId) {
      for (var j = 0; j < filtered.length; j++) {
        var selectedId = filtered[j].object.userData.partId;
        var selectedPart = selectedId ? parts.get(selectedId) : null;
        if (selectedPart && selectedPart.root.visible && selectedId === state.selectedId) {
          return state.selectedId;
        }
      }
    }

    for (var k = 0; k < filtered.length; k++) {
      var candidate = filtered[k].object.userData.partId;
      var candidatePart = candidate ? parts.get(candidate) : null;
      if (candidatePart && candidatePart.root.visible) {
        return candidate;
      }
    }
    return null;
  }

  function updatePointerHover(event) {
    if (state.selectedId) {
      hideHoverTip();
      dom.canvas.classList.remove('is-hovering');
      return;
    }
    var id = pickPartAt(event.clientX, event.clientY, true);
    if (id) {
      if (state.hoveredId !== id) {
        setHoveredPart(id);
        var part = PART_BY_ID[id];
        dom.hoverTipIndex.textContent = pad2(part.index);
        dom.hoverTipName.textContent = part.listName;
      }
      if (dom.hoverTipAction) {
        dom.hoverTipAction.textContent =
          id === 'screen' && !state.screenOn ? '轻触点亮锁屏' : '点击查看部件详情';
      }
      showHoverTip(event.clientX, event.clientY);
      dom.canvas.classList.add('is-hovering');
    } else {
      if (state.hoveredId) setHoveredPart(null);
      hideHoverTip();
      dom.canvas.classList.remove('is-hovering');
    }
  }

  function showHoverTip(clientX, clientY) {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    var rect = dom.stage.getBoundingClientRect();
    var x = clientX - rect.left;
    var y = clientY - rect.top;
    x = clamp(x, 92, stageWidth - 92);
    y = clamp(y, 74, stageHeight - 64);
    dom.hoverTip.style.left = x + 'px';
    dom.hoverTip.style.top = y + 'px';
    dom.hoverTip.classList.add('is-visible');
    dom.hoverTip.setAttribute('aria-hidden', 'false');
    hoverTipVisible = true;
  }

  function hideHoverTip() {
    if (!dom.hoverTip) return;
    dom.hoverTip.classList.remove('is-visible');
    dom.hoverTip.setAttribute('aria-hidden', 'true');
    hoverTipVisible = false;
  }

  function setHoveredPart(id) {
    if (state.hoveredId === id) return;
    state.hoveredId = id;
    if (!state.selectedId) {
      dom.canvas.classList.toggle('is-hovering', Boolean(id));
    }
  }

  /* ------------------------------------------------------------------
     Selection & explosion
     ------------------------------------------------------------------ */

  function selectPart(id, options) {
    options = options || {};
    if (!PART_BY_ID[id]) return;
    hideFirstVisit();
    pauseAutoRotate();
    setHoveredPart(null);
    dom.canvas.classList.remove('is-hovering');
    if (id === 'screen' && !state.screenOn) {
      setScreenPower(true, { silent: true });
    }
    state.selectedId = id;

    if (!state.exploded) {
      setExploded(true, { silent: options.silent, preserveSelection: true });
    }

    syncAllSelectionUI();
    renderPartDetail(PART_BY_ID[id]);
    openDetailsSheet();
    var selectedPart = parts.get(id);
    var fit = getFitRadius(state.exploded);
    orbit.targetRadius = fit * (selectedPart ? getFocusZoomFactor(selectedPart) : 1);
    showSelectionToast('聚焦 ' + pad2(PART_BY_ID[id].index) + ' / ' + PART_BY_ID[id].listName);
    if (!options.silent) {
      scrollButtonIntoView(partButtons.get(id));
      scrollButtonIntoView(mobilePartButtons.get(id), true);
    }
    hideHoverTip();
  }

  function getFocusZoomFactor(part) {
    if (!part) return 1;
    return clamp(0.44 + Math.min(part.maxDimension || 4, 12) * 0.035, 0.52, 0.9);
  }

  function clearSelection(options) {
    options = options || {};
    if (!state.selectedId) {
      if (!options.keepSheet) closeDetailsSheet();
      return;
    }
    state.selectedId = null;
    syncAllSelectionUI();
    renderOverview();
    closeDetailsSheet();
    hideSelectionToast();
    hideHoverTip();
    setHoveredPart(null);
    dom.canvas.classList.remove('is-hovering');
    if (state.exploded) {
      orbit.targetRadius = getFitRadius(true);
    }
  }

  function toggleExploded() {
    hideFirstVisit();
    if (state.exploded) {
      if (state.selectedId) {
        state.selectedId = null;
        syncAllSelectionUI();
        renderOverview();
        closeDetailsSheet();
      }
      setExploded(false);
    } else {
      setExploded(true);
    }
  }

  function setExploded(value, options) {
    options = options || {};
    var next = Boolean(value);
    if (state.exploded === next) {
      if (!next && state.selectedId) {
        clearSelection();
      }
      syncViewUI();
      return;
    }
    if (!next && state.selectedId && !options.preserveSelection) {
      state.selectedId = null;
      syncAllSelectionUI();
      renderOverview();
      closeDetailsSheet();
    }
    state.exploded = next;
    state.explodeTarget = next ? 1 : 0;
    if (!options.silent) pauseAutoRotate();
    if (next) hideFirstVisit();
    syncViewUI();
    var fit = getFitRadius(next);
    orbit.targetRadius = fit;
  }

  function syncViewUI() {
    if (!dom.app) return;
    dom.app.dataset.view = state.exploded ? 'exploded' : 'assembled';
    dom.explodeToggle.setAttribute('aria-pressed', state.exploded ? 'true' : 'false');
    dom.explodeKicker.textContent = state.exploded ? 'REASSEMBLE' : 'EXPLODE';
    dom.explodeLabel.textContent = state.exploded ? '合体复原' : '拆解视图';
    dom.viewState.textContent = state.exploded ? '解构观察' : '完整装配';
    dom.viewCode.textContent = state.exploded ? 'EXPLODED' : 'ASSEMBLED';
    if (state.exploded) {
      dom.callouts.classList.add('is-active');
    } else {
      dom.callouts.classList.remove('is-active');
    }
    updateAssemblyReadout();
  }

  function syncAllSelectionUI() {
    var selectedId = state.selectedId;
    partButtons.forEach(function (button, id) {
      var active = id === selectedId;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    mobilePartButtons.forEach(function (button, id) {
      var active = id === selectedId;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    annotations.forEach(function (annotation) {
      var active = annotation.id === selectedId;
      annotation.button.classList.toggle('is-active', active);
      annotation.button.classList.toggle('is-dimmed', Boolean(selectedId) && !active);
      annotation.path.classList.toggle('is-active', active);
      annotation.dot.classList.toggle('is-active', active);
    });

    if (selectedId) {
      dom.detailsPanel.classList.add('has-selection');
      dom.detailModeLabel.textContent = '部件检视';
      dom.reticle.classList.add('is-visible');
      dom.reticleTag.textContent = pad2(PART_BY_ID[selectedId].index) + ' / ' + PART_BY_ID[selectedId].english;
    } else {
      dom.detailsPanel.classList.remove('has-selection');
      dom.detailModeLabel.textContent = '整机概览';
      dom.reticle.classList.remove('is-visible');
    }
    syncScreenUI();
  }

  function scrollButtonIntoView(button, horizontal) {
    if (!button) return;
    try {
      button.scrollIntoView({
        block: 'nearest',
        inline: horizontal ? 'center' : 'nearest',
        behavior: REDUCED_MOTION ? 'auto' : 'smooth'
      });
    } catch (error) {
      /* Older browsers */
    }
  }

  function showSelectionToast(text) {
    if (!dom.selectionToast) return;
    window.clearTimeout(selectionToastTimer);
    dom.selectionToast.textContent = text;
    dom.selectionToast.classList.add('is-visible');
    selectionToastTimer = window.setTimeout(function () {
      dom.selectionToast.classList.remove('is-visible');
    }, 2400);
  }

  function hideSelectionToast() {
    window.clearTimeout(selectionToastTimer);
    if (dom.selectionToast) dom.selectionToast.classList.remove('is-visible');
  }

  /* ------------------------------------------------------------------
     Finish
     ------------------------------------------------------------------ */

  function getFinish() {
    return FINISHES.filter(function (finish) {
      return finish.id === state.finishId;
    })[0] || FINISHES[0];
  }

  function setFinish(id) {
    var finish = FINISHES.filter(function (item) { return item.id === id; })[0];
    if (!finish || finish.id === state.finishId) return;
    state.finishId = finish.id;
    dom.finishName.textContent = finish.name;

    finishButtons.forEach(function (button) {
      var active = button.dataset.finish === finish.id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', active ? 'true' : 'false');
    });

    finishMaterialList.forEach(function (material) {
      if (!material.userData.finishTarget) material.userData.finishTarget = new THREE.Color();
      material.userData.finishTarget.set(finish[material.userData.finishRole]);
    });

    var overviewFinish = document.getElementById('overview-finish');
    if (overviewFinish) overviewFinish.textContent = finish.name;
  }

  function updateFinishAnimation(dt) {
    var alpha = 1 - Math.exp(-6.2 * dt);
    finishMaterialList.forEach(function (material) {
      if (material.userData.finishTarget) {
        material.color.lerp(material.userData.finishTarget, alpha);
      }
    });
  }

  /* ------------------------------------------------------------------
     Overview & detail panel
     ------------------------------------------------------------------ */

  function animateDetailContent() {
    dom.detailContent.classList.remove('detail-animate');
    void dom.detailContent.offsetHeight;
    dom.detailContent.classList.add('detail-animate');
    dom.detailContent.scrollTop = 0;
  }

  function renderOverview() {
    var finish = getFinish();
    dom.detailContent.innerHTML =
      '<div class="overview-orbit" aria-hidden="true">' +
        '<span class="overview-orbit__ticks"></span>' +
        '<span class="overview-orbit__phone"></span>' +
        '<span class="overview-orbit__tag">A3101 · FULL DEVICE</span>' +
        '<span class="overview-orbit__coord">149.6 × 71.5 × 8.25</span>' +
      '</div>' +
      '<span class="overview-kicker">FULL DEVICE / STRUCTURAL STUDY</span>' +
      '<h2 class="overview-title">iPhone 16 Pro<span>钛金属。如此坚固，如此轻盈。</span></h2>' +
      '<p class="overview-lede">在 8.25 毫米的机身里，层叠着钛金属骨架、A18 Pro 芯片、三段式相机系统与一块金属壳电池。选择任意部件，让精密的内部结构在眼前展开。</p>' +
      '<div class="overview-stats">' +
        '<div class="overview-stat"><span>DISPLAY</span><strong>6.3″</strong><small>Super Retina XDR<br>ProMotion 120Hz</small></div>' +
        '<div class="overview-stat"><span>CHIP</span><strong>A18 Pro</strong><small>第二代 3nm<br>6 核 CPU · 6 核 GPU</small></div>' +
        '<div class="overview-stat"><span>BODY</span><strong>199 g</strong><small>5 级钛金属<br>149.6 × 71.5 × 8.25 mm</small></div>' +
        '<div class="overview-stat"><span>CAMERA</span><strong>48MP</strong><small>Fusion 三摄系统<br>5× 光学长焦</small></div>' +
      '</div>' +
      '<div class="overview-hint">' +
        iconMarkup('click') +
        '<span>点击 3D 模型中的任意部件，模型会自动展开、高亮并显示该结构的详细参数。</span>' +
      '</div>' +
      '<div class="overview-meta"><span><span id="overview-finish">' + escapeHTML(finish.name) + '</span> · 11 个部件</span><span>CODE-BUILT GEOMETRY</span></div>';

    dom.detailsPanel.classList.remove('has-selection');
    dom.detailModeLabel.textContent = '整机概览';
    animateDetailContent();
  }

  function renderPartDetail(part) {
    var currentIndex = PARTS.findIndex(function (item) { return item.id === part.id; });
    var previous = PARTS[(currentIndex - 1 + PARTS.length) % PARTS.length];
    var next = PARTS[(currentIndex + 1) % PARTS.length];
    var specsMarkup = part.specs.map(function (spec) {
      return '<div class="spec-row"><dt>' + escapeHTML(spec[0]) + '</dt><dd>' + escapeHTML(spec[1]) + '</dd></div>';
    }).join('');
    var tagsMarkup = part.tags.map(function (tag) {
      return '<span class="part-tag">' + escapeHTML(tag) + '</span>';
    }).join('');

    dom.detailContent.innerHTML =
      '<div class="part-detail-head">' +
        '<span class="part-detail-count"><b>' + pad2(part.index) + '</b> / 11 · STRUCTURE</span>' +
        '<span class="part-detail-category">' + escapeHTML(part.category) + '</span>' +
      '</div>' +
      '<div class="part-hero" aria-hidden="true">' +
        '<span class="part-hero__index">NODE ' + pad2(part.index) + '</span>' +
        '<span class="part-hero__scan"></span>' +
        '<span class="part-hero__icon">' + iconMarkup(part.icon) + '</span>' +
        '<span class="part-hero__english">' + escapeHTML(part.english) + '</span>' +
      '</div>' +
      '<span class="part-kicker">' + escapeHTML(part.category.split('/')[0].trim()) + ' MODULE</span>' +
      '<h2 class="part-title">' + escapeHTML(part.name) + '</h2>' +
      '<p class="part-english-title">' + escapeHTML(part.english) + '</p>' +
      '<p class="part-desc">' + escapeHTML(part.description) + '</p>' +
      '<dl class="spec-list">' + specsMarkup + '</dl>' +
      '<div class="part-tags">' + tagsMarkup + '</div>' +
      '<div class="part-nav">' +
        '<button type="button" class="part-nav--prev" data-nav="prev" aria-label="上一部件：' + escapeHTML(previous.listName) + '">' +
          '<small>PREVIOUS · ' + pad2(previous.index) + '</small>' +
          '<strong>' + iconMarkup('chevron') + escapeHTML(previous.listName) + '</strong>' +
        '</button>' +
        '<button type="button" data-nav="next" aria-label="下一部件：' + escapeHTML(next.listName) + '">' +
          '<small>NEXT · ' + pad2(next.index) + '</small>' +
          '<strong>' + escapeHTML(next.listName) + iconMarkup('chevron') + '</strong>' +
        '</button>' +
      '</div>' +
      '<div class="inspect-note">已在模型中高亮 · 拖拽旋转以观察剖面</div>';

    dom.detailsPanel.classList.add('has-selection');
    dom.detailModeLabel.textContent = '部件 ' + pad2(part.index) + ' / 11';
    animateDetailContent();
    dom.detailContent.setAttribute('aria-live', 'polite');
  }

  function openDetailsSheet() {
    if (window.matchMedia('(max-width: 900px)').matches) {
      dom.detailsPanel.classList.add('is-open');
      dom.mobileInfo.classList.add('is-active');
    }
    syncDetailsPanelA11y();
  }

  function closeDetailsSheet() {
    dom.detailsPanel.classList.remove('is-open');
    dom.mobileInfo.classList.remove('is-active');
    syncDetailsPanelA11y();
  }

  function syncDetailsPanelA11y() {
    if (!dom.detailsPanel) return;
    var isMobile = window.matchMedia('(max-width: 900px)').matches;
    var isOpen = dom.detailsPanel.classList.contains('is-open');
    if (isMobile && !isOpen) {
      dom.detailsPanel.setAttribute('aria-hidden', 'true');
      if ('inert' in dom.detailsPanel) dom.detailsPanel.inert = true;
    } else {
      dom.detailsPanel.removeAttribute('aria-hidden');
      if ('inert' in dom.detailsPanel) dom.detailsPanel.inert = false;
    }
  }

  function detailsSheetIsOpen() {
    return dom.detailsPanel.classList.contains('is-open');
  }

  /* ------------------------------------------------------------------
     Explosion animation
     ------------------------------------------------------------------ */

  function updateExplosion(dt) {
    state.explode = damp(state.explode, state.explodeTarget, 3.0, dt);
    if (Math.abs(state.explode - state.explodeTarget) < 0.0004) {
      state.explode = state.explodeTarget;
    }
    var scale = getExplodeScale();
    var time = elapsed;
    var viewDirection = new THREE.Vector3()
      .subVectors(camera.position, cameraTarget)
      .normalize();

    parts.forEach(function (part) {
      var data = part.data;
      var delayed = clamp(
        (state.explode - data.delay) / Math.max(0.05, 1 - data.delay),
        0,
        1
      );
      var progress = smoothStep(delayed);
      part.explodeProgress = progress;

      var targetFocus = state.selectedId === part.id ? 1 : 0;
      part.focus = damp(part.focus || 0, targetFocus, 7.2, dt);

      var x = data.explode[0] * scale * progress;
      var y = data.explode[1] * scale * progress;
      var z = data.explode[2] * (0.82 + 0.18 * scale) * progress;

      var rotX = data.explodeRot[0] * progress;
      var rotY = data.explodeRot[1] * progress;
      var rotZ = data.explodeRot[2] * progress;

      if (data.inspectRot) {
        rotX += data.inspectRot[0] * progress;
        rotY += data.inspectRot[1] * progress;
        rotZ += data.inspectRot[2] * progress;
      }

      if (data.inspectFacing && part.focus > 0.0001) {
        var facingYaw = Math.atan2(-viewDirection.x, -viewDirection.z);
        rotY = rotY * (1 - part.focus) + facingYaw * part.focus;
      }

      part.root.rotation.set(rotX, rotY, rotZ);

      if (data.inspectRot && part.centerLocal) {
        var rotatedCenter = part.centerLocal.clone().applyEuler(part.root.rotation);
        var pivotShift = part.centerLocal.clone().sub(rotatedCenter);
        x += pivotShift.x;
        y += pivotShift.y;
        z += pivotShift.z;
      }

      if (part.focus > 0.0001) {
        var focusDistance = part.focus * (1.3 + Math.min(part.maxDimension || 4, 9) * 0.055);
        x += viewDirection.x * focusDistance;
        y += viewDirection.y * focusDistance;
        z += viewDirection.z * focusDistance;
      }

      part.root.position.set(x, y, z);
    });

    if (!REDUCED_MOTION) {
      phoneRoot.position.y = Math.sin(time * 0.54) * 0.035 * (1 - state.explode * 0.45);
      phoneRoot.rotation.z = Math.sin(time * 0.29) * 0.004 * (1 - state.explode * 0.6);
      phoneRoot.rotation.x = Math.sin(time * 0.37 + 0.7) * 0.006 * (1 - state.explode * 0.55);
    } else {
      phoneRoot.position.y = 0;
      phoneRoot.rotation.z = 0;
      phoneRoot.rotation.x = 0;
    }

    phoneRoot.updateMatrixWorld(true);
    updateAssemblyReadout();
  }

  function updateAssemblyReadout() {
    var value = Math.round(clamp(state.explode, 0, 1) * 100);
    if (dom.assemblyValue && dom.assemblyValue.textContent !== String(value).padStart(3, '0')) {
      dom.assemblyValue.textContent = String(value).padStart(3, '0');
    }
    if (dom.assemblyFill) {
      dom.assemblyFill.style.transform = 'scaleX(' + clamp(state.explode, 0, 1) + ')';
    }
  }

  /* ------------------------------------------------------------------
     Part material feedback
     ------------------------------------------------------------------ */

  function updatePartMaterials(dt) {
    var time = elapsed;
    parts.forEach(function (part) {
      var selected = state.selectedId === part.id;
      var hovered = !state.selectedId && state.hoveredId === part.id;
      var glowTarget = selected ? 1 : hovered ? 0.42 : 0;
      var ghostTarget = state.selectedId && !selected ? 1 : 0;

      part.glow = damp(part.glow || 0, glowTarget, 10, dt);
      part.ghost = damp(part.ghost || 0, ghostTarget, 8.5, dt);

      var hideForFocus = Boolean(state.selectedId) && !selected &&
        part.maxDimension > 7 && part.ghost > 0.9;
      part.root.visible = !hideForFocus;

      if (selected) ensurePartOutline(part);
      if (part.outlineMaterial) {
        var outlineTarget = selected ? 0.46 : 0;
        part.outlineOpacity = damp(part.outlineOpacity || 0, outlineTarget, 8, dt);
        part.outlineMaterial.opacity = part.outlineOpacity * (0.82 + Math.sin(time * 3.8) * 0.18);
        var outlineVisible = part.outlineOpacity > 0.006;
        if (part.outlineLines) {
          for (var oi = 0; oi < part.outlineLines.length; oi++) {
            part.outlineLines[oi].visible = outlineVisible;
          }
        }
      }

      var ghostFactor = 1 - part.ghost * 0.972;
      var shouldBeTransparent = part.ghost > 0.012;
      var depthAllowed = part.ghost < 0.45;

      for (var i = 0; i < part.materials.length; i++) {
        var material = part.materials[i];
        var baseOpacity = material.userData.baseOpacity;
        if (baseOpacity === undefined) baseOpacity = 1;

        material.opacity = baseOpacity * ghostFactor;

        var wantTransparent = material.userData.baseTransparent || shouldBeTransparent;
        if (material.transparent !== wantTransparent) {
          material.transparent = wantTransparent;
        }
        material.depthWrite = depthAllowed && material.userData.baseDepthWrite;

        if (material.emissive) {
          var glow = part.glow;
          material.emissive.copy(material.userData.baseEmissive || new THREE.Color(0x000000));
          if (glow > 0.0005) {
            var tint = glow * 0.026;
            material.emissive.r = Math.min(1, material.emissive.r + SELECT_COLOR.r * tint);
            material.emissive.g = Math.min(1, material.emissive.g + SELECT_COLOR.g * tint);
            material.emissive.b = Math.min(1, material.emissive.b + SELECT_COLOR.b * tint);
          }
          material.emissiveIntensity = material.userData.baseEmissiveIntensity || 0;
        }
      }
    });
  }

  function ensurePartOutline(part) {
    if (part.outlineMaterial) return;
    var material = new THREE.LineBasicMaterial({
      color: new THREE.Color('#78e8ff'),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false
    });
    part.outlineMaterial = material;
    part.outlineLines = [];
    var meshes = [];
    var minRadius = part.data && part.data.outlineMinRadius ? part.data.outlineMinRadius : 0.22;
    part.root.traverse(function (object) {
      if (object.isMesh && !object.isInstancedMesh && object.geometry) {
        var geometry = object.geometry;
        if (!geometry.boundingSphere) geometry.computeBoundingSphere();
        if (geometry.boundingSphere && geometry.boundingSphere.radius > minRadius) {
          meshes.push(object);
        }
      }
    });
    meshes.forEach(function (mesh) {
      try {
        var edges = new THREE.EdgesGeometry(mesh.geometry, 38);
        var line = new THREE.LineSegments(edges, material);
        line.scale.setScalar(1.0025);
        line.renderOrder = 8;
        line.visible = false;
        mesh.add(line);
        part.outlineLines.push(line);
      } catch (error) {
        /* Skip geometries that cannot be converted into edges. */
      }
    });
  }

  function updateSelectionVisuals(dt) {
    if (!selectionSprite || !selectionLight) return;
    if (!state.selectedId) {
      selectionSprite.material.opacity = damp(selectionSprite.material.opacity, 0, 9, dt);
      selectionLight.intensity = damp(selectionLight.intensity, 0, 9, dt);
      return;
    }
    var part = parts.get(state.selectedId);
    if (!part) return;
    var center = part.centerLocal.clone().applyMatrix4(part.root.matrixWorld);
    selectionSprite.position.copy(center);
    selectionSprite.material.opacity = 0;
    selectionLight.position.copy(center);
    selectionLight.intensity = damp(selectionLight.intensity, 0, 8, dt);
  }

  /* ------------------------------------------------------------------
     Annotations
     ------------------------------------------------------------------ */

  function updateAnnotations() {
    if (!dom.callouts) return;
    var show = state.exploded && state.explode > 0.12 && window.innerWidth > 900;
    if (!show) {
      annotations.forEach(function (annotation) {
        annotation.button.style.visibility = 'hidden';
        annotation.group.setAttribute('opacity', '0');
        annotation.visible = false;
      });
      return;
    }

    var sides = { left: [], right: [] };
    var cameraPos = camera.position;

    annotations.forEach(function (annotation) {
      var part = parts.get(annotation.id);
      if (!part || !part.localBox) {
        annotation.button.style.visibility = 'hidden';
        annotation.group.setAttribute('opacity', '0');
        annotation.visible = false;
        return;
      }

      var world = part.anchor.clone().applyMatrix4(part.root.matrixWorld);
      var viewSpace = world.clone().applyMatrix4(camera.matrixWorldInverse);
      if (viewSpace.z > -0.2) {
        annotation.button.style.visibility = 'hidden';
        annotation.group.setAttribute('opacity', '0');
        annotation.visible = false;
        return;
      }

      var projected = world.clone().project(camera);
      var x = (projected.x * 0.5 + 0.5) * stageWidth;
      var y = (-projected.y * 0.5 + 0.5) * stageHeight;
      if (!Number.isFinite(x) || !Number.isFinite(y) || x < -40 || x > stageWidth + 40 || y < -20 || y > stageHeight + 20) {
        annotation.button.style.visibility = 'hidden';
        annotation.group.setAttribute('opacity', '0');
        annotation.visible = false;
        return;
      }

      annotation.anchorX = x;
      annotation.anchorY = y;
      annotation.visible = true;
      sides[annotation.side].push(annotation);
    });

    layoutAnnotationSide(sides.left);
    layoutAnnotationSide(sides.right);
    drawAnnotationSide(sides.left, 'left');
    drawAnnotationSide(sides.right, 'right');
  }

  function layoutAnnotationSide(items) {
    if (!items.length) return;
    var minTop = 84;
    var maxTop = stageHeight - 118;
    var gap = 11;
    items.sort(function (a, b) {
      return a.anchorY - b.anchorY;
    });

    var totalHeight = items.reduce(function (sum, item) {
      return sum + item.height + gap;
    }, -gap);

    if (maxTop - minTop < totalHeight) {
      minTop = 58;
      maxTop = stageHeight - 82;
    }

    var cursor = minTop;
    items.forEach(function (item) {
      var desired = clamp(item.anchorY - item.height / 2, minTop, maxTop - item.height);
      item.top = Math.max(desired, cursor);
      cursor = item.top + item.height + gap;
    });

    var overflow = (items[items.length - 1].top + items[items.length - 1].height) - maxTop;
    if (overflow > 0) {
      items.forEach(function (item) {
        item.top -= overflow;
      });
    }
    if (items[0].top < minTop) {
      var shift = minTop - items[0].top;
      items.forEach(function (item) {
        item.top += shift;
      });
    }

    items.forEach(function (item) {
      item.top = clamp(item.top, minTop, maxTop - item.height);
      item.button.style.top = item.top.toFixed(1) + 'px';
      item.button.style.visibility = 'visible';
    });
  }

  function drawAnnotationSide(items, side) {
    if (!items.length) return;
    var edge = 16;
    var activeSelection = state.selectedId;

    items.forEach(function (item) {
      if (!item.visible) return;
      var dir = side === 'left' ? 1 : -1;
      var startX = side === 'left'
        ? edge + item.width + 14
        : stageWidth - edge - item.width - 14;
      var startY = item.top + item.height / 2;
      var x1 = startX + dir * 18;
      var x2 = item.anchorX - dir * 18;
      var path = 'M ' + startX.toFixed(1) + ' ' + startY.toFixed(1) +
        ' L ' + x1.toFixed(1) + ' ' + startY.toFixed(1) +
        ' L ' + x2.toFixed(1) + ' ' + item.anchorY.toFixed(1) +
        ' L ' + item.anchorX.toFixed(1) + ' ' + item.anchorY.toFixed(1);

      item.path.setAttribute('d', path);
      item.dot.setAttribute('cx', item.anchorX.toFixed(1));
      item.dot.setAttribute('cy', item.anchorY.toFixed(1));
      var isActive = activeSelection === item.id;
      var isDim = Boolean(activeSelection) && !isActive;
      item.path.classList.toggle('is-active', isActive);
      item.dot.classList.toggle('is-active', isActive);
      item.group.setAttribute('opacity', isDim ? '0' : '1');
    });
  }

  /* ------------------------------------------------------------------
     Selection reticle
     ------------------------------------------------------------------ */

  function updateReticle() {
    if (!dom.reticle) return;
    if (!state.selectedId) {
      dom.reticle.classList.remove('is-visible');
      return;
    }
    var part = parts.get(state.selectedId);
    if (!part || !part.localBox) {
      dom.reticle.classList.remove('is-visible');
      return;
    }

    var box = part.localBox;
    var min = box.min;
    var max = box.max;
    var corners = [
      new THREE.Vector3(min.x, min.y, min.z),
      new THREE.Vector3(max.x, min.y, min.z),
      new THREE.Vector3(min.x, max.y, min.z),
      new THREE.Vector3(max.x, max.y, min.z),
      new THREE.Vector3(min.x, min.y, max.z),
      new THREE.Vector3(max.x, min.y, max.z),
      new THREE.Vector3(min.x, max.y, max.z),
      new THREE.Vector3(max.x, max.y, max.z)
    ];

    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var anyVisible = false;

    for (var i = 0; i < corners.length; i++) {
      var world = corners[i].applyMatrix4(part.root.matrixWorld);
      var view = world.clone().applyMatrix4(camera.matrixWorldInverse);
      if (view.z > -0.2) continue;
      var projected = world.project(camera);
      var sx = (projected.x * 0.5 + 0.5) * stageWidth;
      var sy = (-projected.y * 0.5 + 0.5) * stageHeight;
      if (!Number.isFinite(sx) || !Number.isFinite(sy)) continue;
      minX = Math.min(minX, sx);
      maxX = Math.max(maxX, sx);
      minY = Math.min(minY, sy);
      maxY = Math.max(maxY, sy);
      anyVisible = true;
    }

    if (!anyVisible) {
      dom.reticle.classList.remove('is-visible');
      return;
    }

    var pad = 8;
    var left = clamp(minX - pad, 4, stageWidth - 40);
    var top = clamp(minY - pad, 42, stageHeight - 40);
    var right = clamp(maxX + pad, left + 34, stageWidth - 4);
    var bottom = clamp(maxY + pad, top + 34, stageHeight - 4);
    var width = right - left;
    var height = bottom - top;

    dom.reticle.style.left = left + 'px';
    dom.reticle.style.top = top + 'px';
    dom.reticle.style.width = width + 'px';
    dom.reticle.style.height = height + 'px';
    dom.reticle.classList.add('is-visible');

    if (top < 30) {
      dom.reticleTag.style.top = '0px';
    } else {
      dom.reticleTag.style.top = '-20px';
    }
  }

  /* ------------------------------------------------------------------
     Animation loop
     ------------------------------------------------------------------ */

  function animate(now) {
    requestAnimationFrame(animate);
    var dt = clamp((now - lastFrame) / 1000, 0.001, 0.05);
    lastFrame = now;
    if (state.loading) {
      // Keep rendering under the loader so shaders compile before reveal.
      elapsed += dt * 0.2;
    } else {
      elapsed += dt;
    }

    if (!state.debugFreeze) {
      updateCamera(dt);
      updateExplosion(dt);
      updateFinishAnimation(dt);
      updatePartMaterials(dt);
      updateScreenState(dt);
      updateSelectionVisuals(dt);
      updateAnnotations();
      updateReticle();

      if (!REDUCED_MOTION) {
        if (particleGroup) {
          particleGroup.rotation.y += dt * 0.009;
          particleGroup.children[0].rotation.z += dt * 0.004;
          if (particleGroupDust) particleGroupDust.rotation.z -= dt * 0.0025;
        }
      }
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  /* ------------------------------------------------------------------
     Toast, help states, route
     ------------------------------------------------------------------ */

  function showToast(message, duration) {
    if (!dom.toast) return;
    window.clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    toastTimer = window.setTimeout(function () {
      dom.toast.classList.remove('is-visible');
    }, duration || 2100);
  }

  function applyInitialRoute() {
    try {
      var params = new URLSearchParams(window.location.search);
      var finishId = params.get('finish');
      if (finishId && FINISHES.some(function (finish) { return finish.id === finishId; })) {
        setFinish(finishId);
      }
      var partId = params.get('part');
      var view = params.get('view');
      var screenState = params.get('screen');
      if (screenState === 'off') {
        setScreenPower(false, { silent: true });
      }
      if (partId && PART_BY_ID[partId]) {
        state.autoRotate = false;
        syncAutoRotateUI();
        selectPart(partId, { silent: true });
      } else if (view === 'exploded') {
        state.autoRotate = false;
        syncAutoRotateUI();
        setExploded(true, { silent: true });
      }
    } catch (error) {
      /* URLSearchParams unavailable — ignore deep links. */
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
