/* =========================================================
   iPhone 16 Pro · Procedural 3D model
   Everything in this file is generated with code — no GLB,
   no textures loaded from disk, no external 3D assets.
   ========================================================= */

(function () {
  'use strict';

  if (!window.THREE) {
    window.IPHONE_MODEL = { error: 'THREE_NOT_LOADED' };
    return;
  }

  var THREE = window.THREE;
  var PI = Math.PI;

  var PHONE_W = 7.16;
  var PHONE_H = 14.96;
  var PHONE_D = 0.84;
  var PHONE_R = 1.02;

  var FINISHES = [
    {
      id: 'desert',
      name: '沙漠色钛金属',
      english: 'DESERT TITANIUM',
      frame: '#958472',
      back: '#635d56',
      button: '#a08f7e',
      plateau: '#70685f',
      lensRing: '#e7dbcb',
      swatch: 'radial-gradient(circle at 32% 25%, #d7c1aa 0%, #a98f76 40%, #715f4d 74%, #3c332b 100%)',
      glow: 'rgba(205, 167, 122, 0.35)'
    },
    {
      id: 'natural',
      name: '自然色钛金属',
      english: 'NATURAL TITANIUM',
      frame: '#a39d92',
      back: '#7b776f',
      button: '#b3ac9f',
      plateau: '#858178',
      lensRing: '#d1ccc1',
      swatch: 'radial-gradient(circle at 32% 25%, #e1ddd4 0%, #b8b1a4 40%, #7f7a70 74%, #46433e 100%)',
      glow: 'rgba(200, 195, 180, 0.35)'
    },
    {
      id: 'white',
      name: '白色钛金属',
      english: 'WHITE TITANIUM',
      frame: '#c3c7ca',
      back: '#c7c9c7',
      button: '#d4d7d8',
      plateau: '#c9cbc9',
      lensRing: '#edf0ef',
      swatch: 'radial-gradient(circle at 32% 25%, #ffffff 0%, #e0e3e3 40%, #b8bdbe 74%, #7a8082 100%)',
      glow: 'rgba(196, 230, 239, 0.42)'
    },
    {
      id: 'black',
      name: '黑色钛金属',
      english: 'BLACK TITANIUM',
      frame: '#3d3f42',
      back: '#26282b',
      button: '#4a4c4f',
      plateau: '#303235',
      lensRing: '#686b6e',
      swatch: 'radial-gradient(circle at 32% 25%, #74777a 0%, #4a4c4f 40%, #2d2f32 74%, #141517 100%)',
      glow: 'rgba(158, 177, 186, 0.27)'
    }
  ];

  var PARTS = [
    {
      id: 'screen',
      icon: 'screen',
      name: '超视网膜 XDR 显示屏',
      listName: '超瓷晶面板',
      listSpec: 'SUPER RETINA XDR · 6.3″',
      english: 'SUPER RETINA XDR DISPLAY',
      category: 'DISPLAY / 显示',
      description:
        '6.3 英寸超视网膜 XDR 显示屏，以 ProMotion 在 1Hz 与 120Hz 之间自适应切换。2000 尼特户外峰值亮度与超瓷晶面板，让显示、触控与坚固性在同一层结构中完成。',
      specs: [
        ['显示屏', '6.3 英寸 OLED'],
        ['分辨率', '2622 × 1206 · 460 ppi'],
        ['刷新率', 'ProMotion 1–120Hz'],
        ['峰值亮度', '2000 尼特（户外）'],
        ['表面材质', '超瓷晶面板']
      ],
      tags: ['全天候显示', '原彩显示', '灵动岛'],
      annotation: { side: 'left', title: '屏幕总成', spec: '6.3″ · ProMotion 120Hz' },
      anchor: [0, 0.35, 0.47],
      explode: [-4.8, 0.2, 2.45],
      explodeRot: [0.04, -0.16, -0.02],
      delay: 0.02
    },
    {
      id: 'frame',
      icon: 'frame',
      name: '钛金属中框',
      listName: '钛金属中框',
      listSpec: 'GRADE 5 TITANIUM',
      english: 'TITANIUM CHASSIS',
      category: 'CHASSIS / 结构',
      description:
        '航空级 5 级钛金属构成整机骨架，以精密拉丝与喷砂工艺处理表面。中框与内部铝合金导热结构通过固态扩散结合，在更轻的重量里保留更高的结构刚性。',
      specs: [
        ['材质', '航空级 5 级钛金属'],
        ['表面工艺', '拉丝 + 精细喷砂'],
        ['整机尺寸', '149.6 × 71.5 × 8.25 mm'],
        ['整机重量', '199 g'],
        ['防护等级', 'IP68（6 米 / 30 分钟）']
      ],
      tags: ['Grade 5', '199 g', 'IP68'],
      annotation: null,
      anchor: [0, -0.25, 0.22],
      explode: [0, 0, 0],
      explodeRot: [0, 0, 0],
      delay: 0.05
    },
    {
      id: 'back',
      icon: 'back',
      name: '纹理哑光玻璃背板',
      listName: '哑光玻璃背板',
      listSpec: 'TEXTURED MATTE GLASS',
      english: 'TEXTURED MATTE GLASS BACK',
      category: 'BACK / 背板',
      description:
        '纹理哑光玻璃背板与正面超瓷晶面板共同构成双面防护，柔砂表面细腻且不易留下指纹。背板内侧为 MagSafe 磁吸阵列与无线充电模组预留了精确的层叠空间。',
      specs: [
        ['材质', '纹理哑光玻璃'],
        ['表面', '柔砂质感 / 抗指纹'],
        ['无线充电', 'MagSafe · Qi2'],
        ['配色', '钛金属系列'],
        ['防护', 'IP68 级别']
      ],
      tags: ['哑光玻璃', 'MagSafe', 'IP68'],
      annotation: null,
      anchor: [0, -0.1, -0.48],
      explode: [5.0, -0.35, -3.1],
      explodeRot: [0.02, 0.12, 0.014],
      inspectRot: [0, PI, 0],
      delay: 0.06
    },
    {
      id: 'camera',
      icon: 'camera',
      name: 'Pro 级相机系统',
      listName: 'Pro 相机系统',
      listSpec: '48MP FUSION · 5× TELE',
      english: 'PRO CAMERA SYSTEM',
      category: 'OPTICS / 影像',
      description:
        '三颗镜头覆盖 13mm 超广角到 120mm 长焦。4800 万像素融合式主摄支持 2 倍光学品质变焦，配合第二代传感器位移式防抖与 4K 120fps 杜比视界，把专业影像装进 8.25mm 厚的机身。',
      specs: [
        ['融合式主摄', '48MP · f/1.78 · 24mm'],
        ['超广角', '48MP · f/2.2 · 13mm'],
        ['长焦', '12MP · f/2.8 · 5× 光学'],
        ['前置相机', '12MP 原深感 · f/1.9'],
        ['视频', '4K 120fps 杜比视界']
      ],
      tags: ['48MP Fusion', '5× 长焦', '4K 120'],
      annotation: { side: 'right', title: 'Pro 相机系统', spec: '48MP · 5× 长焦' },
      anchor: [1.5, 5.35, -0.62],
      explode: [2.9, 2.0, 2.2],
      explodeRot: [0.02, 0.06, 0.025],
      inspectRot: [0, PI, 0],
      inspectFacing: true,
      outlineMinRadius: 1.05,
      delay: 0.1
    },
    {
      id: 'logic',
      icon: 'logic',
      name: 'A18 Pro 逻辑主板',
      listName: 'A18 Pro 主板',
      listSpec: 'A18 PRO · SECOND-GEN 3NM',
      english: 'A18 PRO LOGIC BOARD',
      category: 'SILICON / 芯片',
      description:
        'A18 Pro 以第二代 3 纳米制程打造，6 核 CPU、6 核 GPU 与 16 核神经网络引擎在紧凑的主板上协同工作。更高带宽的统一内存与硬件级光线追踪，让 Apple Intelligence 与主机级游戏都在这块芯片上发生。',
      specs: [
        ['芯片', 'A18 Pro'],
        ['制程', '第二代 3 纳米'],
        ['CPU', '6 核（2 性能 + 4 能效）'],
        ['GPU', '6 核 · 硬件光追'],
        ['神经网络引擎', '16 核 · 35 TOPS']
      ],
      tags: ['A18 Pro', '3nm', '硬件光追'],
      annotation: { side: 'right', title: 'A18 Pro 主板', spec: '第二代 3nm · 16 核引擎' },
      anchor: [1.0, 5.4, 0.24],
      explode: [-0.45, 1.15, 2.65],
      explodeRot: [0.005, 0.035, 0.018],
      delay: 0.14
    },
    {
      id: 'battery',
      icon: 'battery',
      name: '金属壳电池',
      listName: '金属壳电池',
      listSpec: '3,582 mAh · 27H VIDEO',
      english: 'METAL-ENCASED BATTERY',
      category: 'POWER / 能源',
      description:
        '金属外壳电池在结构强度与散热效率之间取得平衡，并由 A18 Pro 的能效调度统一管理。配合 USB-C 快充与最高 25W 的 MagSafe 无线充电，最长可提供 27 小时视频播放。',
      specs: [
        ['典型容量', '3,582 mAh（参考）'],
        ['视频播放', '最长 27 小时'],
        ['有线快充', '30 分钟充至 50%'],
        ['无线充电', 'MagSafe 最高 25W'],
        ['外壳', '金属封装']
      ],
      tags: ['27 小时视频', '金属外壳', 'USB-C 快充'],
      annotation: { side: 'left', title: '金属壳电池', spec: '3,582 mAh · 金属封装' },
      anchor: [-0.15, -2.2, 0.25],
      explode: [-0.6, -0.65, 2.35],
      explodeRot: [0, 0.03, 0.01],
      delay: 0.12
    },
    {
      id: 'taptic',
      icon: 'taptic',
      name: '触感引擎',
      listName: '触感引擎',
      listSpec: 'CUSTOM LINEAR ACTUATOR',
      english: 'TAPTIC ENGINE',
      category: 'HAPTICS / 触觉',
      description:
        '定制线性马达把电信号转化为干净、克制的触觉反馈。从系统提示、键盘敲击到相机快门，每一次触碰都由这颗小型引擎在毫秒之间完成。',
      specs: [
        ['类型', '定制线性触感引擎'],
        ['功能', '系统级精细触觉反馈'],
        ['结构', '稀土磁体 + 定制线圈'],
        ['应用', '相机控制 / 系统交互'],
        ['响应', '毫秒级触觉响应']
      ],
      tags: ['Taptic Engine', '线性马达', '精细反馈'],
      annotation: { side: 'left', title: '触感引擎', spec: '定制线性马达' },
      anchor: [-2.15, -5.95, 0.3],
      explode: [-1.8, -1.7, 2.85],
      explodeRot: [0.04, 0.035, -0.025],
      delay: 0.16
    },
    {
      id: 'speaker',
      icon: 'speaker',
      name: '立体声扬声器',
      listName: '立体声扬声器',
      listSpec: 'SPATIAL AUDIO · STEREO',
      english: 'STEREO SPEAKER',
      category: 'AUDIO / 声学',
      description:
        '底部扬声器与听筒共同组成立体声系统，支持空间音频与杜比全景声。定制驱动单元与独立的声学腔体在有限空间内营造出更宽阔的声场。',
      specs: [
        ['配置', '底部 + 听筒双扬声器'],
        ['音效', '空间音频 · 杜比全景声'],
        ['通话', '多麦克风降噪'],
        ['结构', '定制驱动单元'],
        ['接口', '独立声学腔体']
      ],
      tags: ['空间音频', '杜比全景声', '立体声'],
      annotation: { side: 'right', title: '立体声扬声器', spec: '空间音频 · 杜比全景声' },
      anchor: [1.4, -6.5, 0.24],
      explode: [1.8, -1.9, 3.1],
      explodeRot: [0.02, -0.03, 0.018],
      delay: 0.18
    },
    {
      id: 'usb',
      icon: 'usb',
      name: 'USB-C 充电接口',
      listName: 'USB-C 接口',
      listSpec: 'USB 3 · 10GB/S · USB-PD',
      english: 'USB-C CONNECTOR',
      category: 'I/O / 接口',
      description:
        'USB-C 将充电、数据与显示输出汇聚于同一接口，支持最高 10Gb/s 的 USB 3 传输与 DisplayPort 输出，为专业工作流提供更直接的有线连接。',
      specs: [
        ['接口', 'USB-C'],
        ['传输速度', 'USB 3 · 最高 10Gb/s'],
        ['充电', 'USB-PD 快速充电'],
        ['扩展', 'DisplayPort 输出'],
        ['结构', '独立防水密封']
      ],
      tags: ['USB 3', '10Gb/s', 'DisplayPort'],
      annotation: null,
      anchor: [0.15, -7.05, 0.28],
      explode: [0.4, -1.05, 3.55],
      explodeRot: [0.02, 0, 0],
      delay: 0.2
    },
    {
      id: 'magsafe',
      icon: 'magsafe',
      name: 'MagSafe 无线充电模组',
      listName: 'MagSafe 模组',
      listSpec: '25W WIRELESS CHARGING',
      english: 'MAGSAFE CHARGING ARRAY',
      category: 'MAGNETICS / 磁吸',
      description:
        '环形磁体阵列、无线充电线圈与屏蔽层在背板内侧精确堆叠。系统会自动对齐 MagSafe 配件，并以最高 25W 功率完成无线充电。',
      specs: [
        ['无线功率', '最高 25W'],
        ['兼容协议', 'MagSafe / Qi2'],
        ['磁体', '环形磁吸阵列'],
        ['对齐', '自动磁吸对位'],
        ['安全', '温控与异物检测']
      ],
      tags: ['25W', 'Qi2', '磁吸对位'],
      annotation: null,
      anchor: [0.2, 0.25, -0.32],
      explode: [2.4, -0.2, -4.1],
      explodeRot: [-0.03, -0.05, -0.02],
      delay: 0.1
    },
    {
      id: 'buttons',
      icon: 'buttons',
      name: '操作按钮与相机控制',
      listName: '按键与相机控制',
      listSpec: 'ACTION BUTTON · CAMERA CONTROL',
      english: 'BUTTONS & CAMERA CONTROL',
      category: 'CONTROLS / 交互',
      description:
        '操作按钮可自定义快捷功能；相机控制采用蓝宝石玻璃表面与触感反馈，通过轻按、滑动与压感完成变焦、曝光和快门操作。音量键与侧边按钮也经过重新打磨，与钛金属中框平齐衔接。',
      specs: [
        ['操作按钮', '可自定义快捷功能'],
        ['相机控制', '轻按 · 滑动 · 压感'],
        ['音量键', '独立音量加 / 减'],
        ['电源键', '侧边按钮'],
        ['表面', '蓝宝石玻璃 / 钛金属']
      ],
      tags: ['Action Button', 'Camera Control', '蓝宝石'],
      annotation: null,
      anchor: [-3.6, 3.5, 0.2],
      explode: [-0.05, 0.2, 1.5],
      explodeRot: [0, 0, 0],
      delay: 0.22
    }
  ];

  var PART_MAP = {};
  PARTS.forEach(function (part, index) {
    PART_MAP[part.id] = part;
    part.index = index + 1;
  });

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function seedRandom(seed) {
    var value = seed >>> 0;
    return function random() {
      value += 0x6d2b79f5;
      var t = value;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function roundedRectShape(w, h, r) {
    r = Math.max(0.001, Math.min(r, Math.min(w, h) / 2));
    var hw = w / 2;
    var hh = h / 2;
    var shape = new THREE.Shape();
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.absarc(hw - r, -hh + r, r, -PI / 2, 0, false);
    shape.lineTo(hw, hh - r);
    shape.absarc(hw - r, hh - r, r, 0, PI / 2, false);
    shape.lineTo(-hw + r, hh);
    shape.absarc(-hw + r, hh - r, r, PI / 2, PI, false);
    shape.lineTo(-hw, -hh + r);
    shape.absarc(-hw + r, -hh + r, r, PI, PI * 1.5, false);
    shape.closePath();
    return shape;
  }

  function roundedBoxGeometry(w, h, d, radius, bevel) {
    bevel = bevel === undefined ? 0.018 : bevel;
    var b = Math.min(bevel, d * 0.4, w * 0.18, h * 0.18);
    var shape = roundedRectShape(
      Math.max(0.02, w - 2 * b),
      Math.max(0.02, h - 2 * b),
      Math.max(0.005, radius - b)
    );
    var geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.004, d - 2 * b),
      steps: 1,
      curveSegments: 12,
      bevelEnabled: b > 0.0005,
      bevelThickness: b,
      bevelSize: b,
      bevelSegments: 3
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedPlaneGeometry(w, h, radius, segments) {
    var shape = roundedRectShape(w, h, radius);
    var geometry = new THREE.ShapeGeometry(shape, segments || 16);
    var pos = geometry.attributes.position;
    var uv = geometry.attributes.uv;
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i);
      var y = pos.getY(i);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    for (var j = 0; j < uv.count; j++) {
      uv.setXY(
        j,
        (pos.getX(j) - minX) / (maxX - minX),
        (pos.getY(j) - minY) / (maxY - minY)
      );
    }
    uv.needsUpdate = true;
    return geometry;
  }

  function discGeometry(radius, depth, segments) {
    var geometry = new THREE.CylinderGeometry(radius, radius, depth, segments || 48, 1, false);
    geometry.rotateX(-PI / 2);
    return geometry;
  }

  function makeCanvasTexture(renderer, width, height, draw, options) {
    options = options || {};
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    draw(ctx, width, height);
    var texture = new THREE.CanvasTexture(canvas);
    if (options.srgb !== false) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.anisotropy = Math.min(
      options.anisotropy || 8,
      renderer.capabilities.getMaxAnisotropy()
    );
    if (options.repeat) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(options.repeat[0], options.repeat[1]);
    }
    texture.needsUpdate = true;
    return texture;
  }

  /* ------------------------------------------------------------------
     Procedural textures
     ------------------------------------------------------------------ */

  function createScreenTexture(renderer) {
    return makeCanvasTexture(renderer, 1024, 2222, function (ctx, w, h) {
      var random = seedRandom(160920);

      // Deep blue-black OLED base, tuned to the cool White Titanium reference.
      var base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, '#010304');
      base.addColorStop(0.28, '#04090c');
      base.addColorStop(0.52, '#071113');
      base.addColorStop(0.76, '#030a0b');
      base.addColorStop(1, '#010303');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      function radialGlow(x, y, radius, stops) {
        var g = ctx.createRadialGradient(x, y, radius * 0.02, x, y, radius);
        stops.forEach(function (stop) {
          g.addColorStop(stop[0], stop[1]);
        });
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      radialGlow(w * 0.68, h * 0.2, w * 0.75, [
        [0, 'rgba(134, 149, 151, 0.16)'],
        [0.4, 'rgba(54, 75, 81, 0.07)'],
        [1, 'rgba(0, 0, 0, 0)']
      ]);
      radialGlow(w * 0.85, h * 0.68, w * 0.7, [
        [0, 'rgba(44, 183, 178, 0.13)'],
        [0.44, 'rgba(15, 79, 82, 0.065)'],
        [1, 'rgba(0, 0, 0, 0)']
      ]);
      radialGlow(w * 0.12, h * 0.45, w * 0.78, [
        [0, 'rgba(52, 90, 106, 0.12)'],
        [0.52, 'rgba(18, 42, 52, 0.045)'],
        [1, 'rgba(0, 0, 0, 0)']
      ]);
      radialGlow(w * 0.5, h * 0.47, w * 0.62, [
        [0, 'rgba(0, 0, 0, 0.05)'],
        [0.58, 'rgba(0, 0, 0, 0.12)'],
        [1, 'rgba(0, 0, 0, 0.48)']
      ]);

      function glassLeaf(ax, ay, bx, by, u1x, u1y, u2x, u2y, l1x, l1y, l2x, l2y, fillStops, rimStops) {
        function upperPath() {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.bezierCurveTo(u1x, u1y, u2x, u2y, bx, by);
        }
        function lowerPath() {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.bezierCurveTo(l2x, l2y, l1x, l1y, bx, by);
        }
        function closedPath() {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.bezierCurveTo(u1x, u1y, u2x, u2y, bx, by);
          ctx.bezierCurveTo(l1x, l1y, l2x, l2y, ax, ay);
          ctx.closePath();
        }

        ctx.save();
        closedPath();
        var fill = ctx.createLinearGradient(ax, ay, bx, by);
        fillStops.forEach(function (stop) {
          fill.addColorStop(stop[0], stop[1]);
        });
        ctx.fillStyle = fill;
        ctx.fill();

        // A soft silver reflection trapped inside the glass.
        ctx.save();
        closedPath();
        ctx.clip();
        var sheen = ctx.createRadialGradient(
          ax + (bx - ax) * 0.16,
          ay + (by - ay) * 0.1,
          4,
          ax + (bx - ax) * 0.3,
          ay + (by - ay) * 0.3,
          w * 0.45
        );
        sheen.addColorStop(0, 'rgba(219, 240, 240, 0.17)');
        sheen.addColorStop(0.32, 'rgba(127, 164, 171, 0.07)');
        sheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();

        // Dim body of the lens, then the luminous edge.
        closedPath();
        ctx.strokeStyle = 'rgba(170, 251, 242, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        upperPath();
        ctx.strokeStyle = 'rgba(197, 247, 243, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        lowerPath();
        ctx.strokeStyle = 'rgba(53, 255, 226, 0.12)';
        ctx.lineWidth = 10;
        ctx.shadowColor = 'rgba(72, 255, 230, 0.38)';
        ctx.shadowBlur = 38;
        ctx.stroke();
        ctx.shadowBlur = 0;

        lowerPath();
        var rim = ctx.createLinearGradient(ax, ay, bx, by);
        rimStops.forEach(function (stop) {
          rim.addColorStop(stop[0], stop[1]);
        });
        ctx.strokeStyle = rim;
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(103, 255, 234, 0.55)';
        ctx.shadowBlur = 38;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // A second, tighter highlight makes the cyan edge feel glassy.
        lowerPath();
        ctx.strokeStyle = 'rgba(74, 255, 226, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Long, overlapping glass leaves echo the two sweeping arcs in the
      // supplied iPhone 16 Pro product image.
      glassLeaf(
        w * 0.02, h * 0.13,
        w * 0.97, h * 0.42,
        w * 0.33, h * 0.06,
        w * 0.74, h * 0.15,
        w * 0.64, h * 0.39,
        w * 0.24, h * 0.35,
        [
          [0, 'rgba(118, 132, 134, 0.5)'],
          [0.24, 'rgba(57, 70, 74, 0.64)'],
          [0.56, 'rgba(13, 27, 31, 0.92)'],
          [1, 'rgba(2, 6, 8, 0.99)']
        ],
        [
          [0, 'rgba(105, 240, 230, 0)'],
          [0.2, 'rgba(113, 255, 238, 0.18)'],
          [0.46, 'rgba(86, 255, 229, 0.86)'],
          [0.63, 'rgba(118, 255, 235, 0.98)'],
          [0.82, 'rgba(92, 224, 219, 0.3)'],
          [1, 'rgba(92, 224, 219, 0)']
        ]
      );

      glassLeaf(
        w * 0.01, h * 0.64,
        w * 0.9, h * 0.92,
        w * 0.34, h * 0.54,
        w * 0.76, h * 0.58,
        w * 0.65, h * 0.86,
        w * 0.22, h * 0.88,
        [
          [0, 'rgba(14, 49, 52, 0.93)'],
          [0.36, 'rgba(5, 26, 30, 0.98)'],
          [0.76, 'rgba(2, 9, 12, 1)'],
          [1, 'rgba(1, 5, 7, 1)']
        ],
        [
          [0, 'rgba(80, 222, 212, 0)'],
          [0.24, 'rgba(88, 242, 226, 0.24)'],
          [0.52, 'rgba(90, 255, 230, 0.84)'],
          [0.7, 'rgba(128, 255, 237, 0.98)'],
          [0.88, 'rgba(80, 218, 213, 0.22)'],
          [1, 'rgba(80, 218, 213, 0)']
        ]
      );

      // A low, quiet arc near the bottom keeps the composition from ending on
      // a hard edge.
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.moveTo(-w * 0.05, h * 0.83);
      ctx.bezierCurveTo(w * 0.25, h * 0.76, w * 0.68, h * 0.87, w * 1.05, h * 0.79);
      ctx.strokeStyle = 'rgba(127, 255, 239, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(105, 245, 229, 0.25)';
      ctx.shadowBlur = 22;
      ctx.stroke();
      ctx.restore();

      // Thin sweeping glints across the lower glass.
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (var i = 0; i < 6; i++) {
        var y0 = h * 0.58 + i * 42;
        ctx.beginPath();
        ctx.moveTo(-w * 0.18, y0);
        ctx.bezierCurveTo(w * 0.24, y0 - 190 - i * 12, w * 0.62, y0 + 300, w * 1.18, y0 - 120 + i * 7);
        var silk = ctx.createLinearGradient(0, y0 - 240, w, y0 + 240);
        silk.addColorStop(0, 'rgba(95, 216, 218, 0)');
        silk.addColorStop(0.28, 'rgba(144, 233, 230, ' + (0.02 + i * 0.002) + ')');
        silk.addColorStop(0.57, 'rgba(205, 255, 249, ' + (0.045 + i * 0.003) + ')');
        silk.addColorStop(0.8, 'rgba(83, 211, 209, ' + (0.024 + i * 0.002) + ')');
        silk.addColorStop(1, 'rgba(83, 211, 209, 0)');
        ctx.strokeStyle = silk;
        ctx.lineWidth = 11 + i * 4.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(102, 235, 222, 0.12)';
        ctx.shadowBlur = 24;
        ctx.stroke();
      }
      ctx.restore();

      // A cool silver sheen in the upper-left and a teal flare at the lower
      // edge keep the composition from feeling like a flat gradient.
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      var silver = ctx.createRadialGradient(w * 0.08, h * 0.2, 2, w * 0.08, h * 0.2, w * 0.55);
      silver.addColorStop(0, 'rgba(214, 239, 240, 0.09)');
      silver.addColorStop(0.45, 'rgba(112, 155, 162, 0.035)');
      silver.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = silver;
      ctx.fillRect(0, 0, w, h);

      var flare = ctx.createRadialGradient(w * 0.82, h * 0.72, 1, w * 0.82, h * 0.72, w * 0.45);
      flare.addColorStop(0, 'rgba(77, 255, 231, 0.10)');
      flare.addColorStop(0.36, 'rgba(43, 174, 170, 0.04)');
      flare.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flare;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Sparse dust helps the OLED texture feel less synthetic.
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (var p = 0; p < 640; p++) {
        var px = random() * w;
        var py = random() * h;
        var radius = random() * 1.1 + 0.15;
        var alpha = random() * 0.18 + 0.01;
        ctx.fillStyle = random() > 0.5
          ? 'rgba(205, 246, 244, ' + alpha + ')'
          : 'rgba(158, 207, 226, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Gentle top and bottom falloff.
      var topShade = ctx.createLinearGradient(0, 0, 0, h * 0.32);
      topShade.addColorStop(0, 'rgba(1, 1, 1, 0.7)');
      topShade.addColorStop(0.54, 'rgba(2, 2, 2, 0.2)');
      topShade.addColorStop(1, 'rgba(2, 2, 2, 0)');
      ctx.fillStyle = topShade;
      ctx.fillRect(0, 0, w, h * 0.34);

      var bottomShade = ctx.createLinearGradient(0, h * 0.72, 0, h);
      bottomShade.addColorStop(0, 'rgba(2, 2, 2, 0)');
      bottomShade.addColorStop(0.7, 'rgba(2, 2, 2, 0.3)');
      bottomShade.addColorStop(1, 'rgba(1, 1, 1, 0.82)');
      ctx.fillStyle = bottomShade;
      ctx.fillRect(0, h * 0.7, w, h * 0.3);

      var vignette = ctx.createRadialGradient(w * 0.5, h * 0.47, w * 0.18, w * 0.5, h * 0.5, w * 1.02);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.65, 'rgba(0, 0, 0, 0.08)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // A gentle veil keeps the lock-screen clock readable over the bright
      // reflective folds of the wallpaper.
      var clockShade = ctx.createRadialGradient(w * 0.5, h * 0.31, w * 0.1, w * 0.5, h * 0.31, w * 0.62);
      clockShade.addColorStop(0, 'rgba(1, 1, 1, 0.4)');
      clockShade.addColorStop(0.55, 'rgba(2, 2, 2, 0.2)');
      clockShade.addColorStop(1, 'rgba(2, 2, 2, 0)');
      ctx.fillStyle = clockShade;
      ctx.fillRect(0, 0, w, h);

      // Lock-screen status chrome, kept intentionally quiet.
      ctx.save();
      ctx.fillStyle = 'rgba(230, 248, 246, 0.48)';
      [5, 8, 11, 14].forEach(function (barHeight, index) {
        ctx.beginPath();
        var bx = 53 + index * 10;
        var by = 100 - barHeight;
        if (ctx.roundRect) {
          ctx.roundRect(bx, by, 4, barHeight, 2);
        } else {
          ctx.rect(bx, by, 4, barHeight);
        }
        ctx.fill();
      });
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(230, 248, 246, 0.48)';
      for (var wifi = 0; wifi < 3; wifi++) {
        ctx.beginPath();
        ctx.arc(108, 100, 7 + wifi * 6, -Math.PI * 0.83, -Math.PI * 0.17);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(230, 248, 246, 0.55)';
      ctx.lineWidth = 2;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(w - 122, 84, 42, 19, 5);
        ctx.stroke();
        ctx.fillStyle = 'rgba(230, 248, 246, 0.58)';
        ctx.fillRect(w - 116, 89, 26, 9);
        ctx.fillRect(w - 77, 90, 3, 7);
      }
      ctx.restore();

      // A small lock glyph.
      ctx.save();
      ctx.strokeStyle = 'rgba(228, 247, 244, 0.5)';
      ctx.fillStyle = 'rgba(228, 247, 244, 0.28)';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.134, 10, PI, 0, false);
      ctx.stroke();
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(w / 2 - 14, h * 0.137, 28, 21, 5);
        ctx.fill();
      } else {
        ctx.fillRect(w / 2 - 14, h * 0.137, 28, 21);
      }
      ctx.restore();

      // Lock-screen date and time.
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(233, 248, 246, 0.8)';
      ctx.font = '500 34px -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
      ctx.fillText('9月20日  星期五', w / 2, 385);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 58;
      ctx.shadowOffsetY = 15;
      var timeGradient = ctx.createLinearGradient(w * 0.24, 0, w * 0.76, 0);
      timeGradient.addColorStop(0, 'rgba(230, 247, 245, 0.92)');
      timeGradient.addColorStop(0.48, 'rgba(255, 255, 255, 0.98)');
      timeGradient.addColorStop(1, 'rgba(197, 238, 236, 0.88)');
      ctx.fillStyle = timeGradient;
      ctx.font = '200 218px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif';
      ctx.fillText('9:41', w / 2, 590);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillStyle = 'rgba(218, 241, 239, 0.46)';
      ctx.font = '400 23px -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText('加州 · 晴朗  24°', w / 2, 746);
      ctx.restore();

      // Lock-screen quick controls.
      function control(cx, cy) {
        ctx.beginPath();
        ctx.arc(cx, cy, 48, 0, PI * 2);
        ctx.fillStyle = 'rgba(222, 241, 239, 0.105)';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.075)';
        ctx.stroke();
      }

      control(142, 1974);
      control(w - 142, 1974);

      ctx.save();
      ctx.translate(142, 1974);
      ctx.rotate(-0.5);
      ctx.fillStyle = 'rgba(236, 249, 247, 0.86)';
      ctx.fillRect(-7, -14, 14, 30);
      ctx.fillRect(-12, -21, 24, 8);
      ctx.fillStyle = 'rgba(15, 19, 22, 0.55)';
      ctx.fillRect(-4, -11, 8, 4);
      ctx.restore();

      ctx.save();
      ctx.translate(w - 142, 1974);
      ctx.fillStyle = 'rgba(236, 249, 247, 0.86)';
      ctx.beginPath();
      ctx.arc(0, 2, 13, 0, PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(20, 24, 27, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 2, 7, 0, PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(236, 249, 247, 0.86)';
      ctx.fillRect(13, -5, 11, 14);
      ctx.restore();

      // Home indicator.
      ctx.fillStyle = 'rgba(241, 250, 248, 0.65)';
      ctx.beginPath();
      var barW = w * 0.36;
      var barX = (w - barW) / 2;
      var barY = h - 58;
      if (ctx.roundRect) {
        ctx.roundRect(barX, barY, barW, 8, 4);
      } else {
        ctx.rect(barX, barY, barW, 8);
      }
      ctx.fill();

      // A veil of fingerprint-free glass.
      var glassReflection = ctx.createLinearGradient(0, 0, w, h);
      glassReflection.addColorStop(0, 'rgba(203, 244, 244, 0.028)');
      glassReflection.addColorStop(0.31, 'rgba(255, 255, 255, 0)');
      glassReflection.addColorStop(0.63, 'rgba(91, 205, 203, 0.025)');
      glassReflection.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glassReflection;
      ctx.fillRect(0, 0, w, h);
    }, { anisotropy: 12 });
  }

  function createFlashTexture(renderer) {
    return makeCanvasTexture(renderer, 256, 256, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2;
      var cy = h / 2;
      var base = ctx.createRadialGradient(cx - 10, cy - 14, 2, cx, cy, 124);
      base.addColorStop(0, '#fffefa');
      base.addColorStop(0.2, '#f7f5ee');
      base.addColorStop(0.48, '#e3e4df');
      base.addColorStop(0.76, '#858a89');
      base.addColorStop(0.93, '#3d413f');
      base.addColorStop(1, '#101211');
      ctx.beginPath();
      ctx.arc(cx, cy, 124, 0, PI * 2);
      ctx.fillStyle = base;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 253, 239, 0.24)';
      for (var r = 22; r < 120; r += 12) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, PI * 2);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      var halo = ctx.createRadialGradient(cx - 30, cy - 30, 1, cx - 20, cy - 20, 90);
      halo.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      halo.addColorStop(0.4, 'rgba(238, 245, 237, 0.16)');
      halo.addColorStop(1, 'rgba(223, 238, 230, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 124, 0, PI * 2);
      ctx.fill();
    }, { anisotropy: 4 });
  }

  function createLensTexture(renderer) {
    return makeCanvasTexture(renderer, 512, 512, function (ctx, w, h) {
      var cx = w / 2;
      var cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      var base = ctx.createRadialGradient(cx - 22, cy - 30, 5, cx, cy, 252);
      base.addColorStop(0, '#010204');
      base.addColorStop(0.2, '#02070b');
      base.addColorStop(0.42, '#041019');
      base.addColorStop(0.58, '#071823');
      base.addColorStop(0.72, '#0b2634');
      base.addColorStop(0.86, '#0c2734');
      base.addColorStop(0.94, '#07131a');
      base.addColorStop(1, '#010202');
      ctx.beginPath();
      ctx.arc(cx, cy, 252, 0, PI * 2);
      ctx.fillStyle = base;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 246, 0, PI * 2);
      ctx.clip();
      ctx.globalCompositeOperation = 'screen';

      var sky = ctx.createRadialGradient(cx - 85, cy - 120, 4, cx - 70, cy - 90, 235);
      sky.addColorStop(0, 'rgba(159, 212, 235, 0.4)');
      sky.addColorStop(0.16, 'rgba(78, 150, 189, 0.17)');
      sky.addColorStop(0.48, 'rgba(18, 65, 90, 0.06)');
      sky.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      var violet = ctx.createRadialGradient(cx + 92, cy + 58, 2, cx + 80, cy + 58, 150);
      violet.addColorStop(0, 'rgba(102, 99, 192, 0.18)');
      violet.addColorStop(0.35, 'rgba(45, 65, 132, 0.08)');
      violet.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = violet;
      ctx.fillRect(0, 0, w, h);

      var amber = ctx.createRadialGradient(cx - 80, cy + 90, 2, cx - 70, cy + 80, 140);
      amber.addColorStop(0, 'rgba(214, 144, 80, 0.09)');
      amber.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = amber;
      ctx.fillRect(0, 0, w, h);

      var rings = [
        [205, 'rgba(104, 161, 182, 0.09)'],
        [166, 'rgba(184, 215, 224, 0.035)'],
        [126, 'rgba(41, 102, 128, 0.1)'],
        [82, 'rgba(96, 168, 191, 0.045)']
      ];
      rings.forEach(function (ring) {
        ctx.beginPath();
        ctx.arc(cx, cy, ring[0], 0, PI * 2);
        ctx.strokeStyle = ring[1];
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(cx - 48, cy - 66, 195, PI * 1.03, PI * 1.58);
      ctx.strokeStyle = 'rgba(207, 238, 248, 0.11)';
      ctx.lineWidth = 42;
      ctx.stroke();

      var glint = ctx.createRadialGradient(cx - 92, cy - 104, 0, cx - 92, cy - 104, 26);
      glint.addColorStop(0, 'rgba(242, 252, 255, 0.7)');
      glint.addColorStop(0.28, 'rgba(158, 211, 236, 0.2)');
      glint.addColorStop(1, 'rgba(70, 140, 180, 0)');
      ctx.fillStyle = glint;
      ctx.beginPath();
      ctx.arc(cx - 92, cy - 104, 26, 0, PI * 2);
      ctx.fill();

      var pupil = ctx.createRadialGradient(cx + 5, cy + 8, 2, cx, cy, 94);
      pupil.addColorStop(0, 'rgba(2, 5, 8, 0.4)');
      pupil.addColorStop(0.48, 'rgba(4, 12, 18, 0.55)');
      pupil.addColorStop(0.72, 'rgba(9, 31, 43, 0.22)');
      pupil.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = pupil;
      ctx.beginPath();
      ctx.arc(cx, cy, 94, 0, PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(84, 151, 186, 0.32)';
      ctx.beginPath();
      ctx.arc(cx - 5, cy + 3, 4.2, 0, PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(212, 238, 246, 0.45)';
      ctx.beginPath();
      ctx.arc(cx - 11, cy - 5, 1.4, 0, PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, 250, 0, PI * 2);
      ctx.strokeStyle = 'rgba(173, 197, 201, 0.17)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }, { anisotropy: 8 });
  }

  function createBackSheenTexture(renderer) {
    return makeCanvasTexture(renderer, 512, 1024, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      var veil = ctx.createLinearGradient(0, 0, w, h);
      veil.addColorStop(0, 'rgba(255, 233, 205, 0.13)');
      veil.addColorStop(0.24, 'rgba(255, 241, 221, 0.04)');
      veil.addColorStop(0.52, 'rgba(255, 255, 255, 0)');
      veil.addColorStop(0.8, 'rgba(20, 15, 11, 0.08)');
      veil.addColorStop(1, 'rgba(4, 3, 2, 0.18)');
      ctx.fillStyle = veil;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w * 0.26, h * 0.33);
      ctx.rotate(-0.58);
      var g = ctx.createLinearGradient(-w * 0.45, 0, w * 0.45, 0);
      g.addColorStop(0, 'rgba(255, 232, 204, 0)');
      g.addColorStop(0.4, 'rgba(255, 236, 212, 0.075)');
      g.addColorStop(0.52, 'rgba(255, 245, 228, 0.11)');
      g.addColorStop(0.7, 'rgba(255, 220, 185, 0.03)');
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(-w * 0.55, -h * 0.35, w * 1.1, h * 0.7);
      ctx.restore();

      ctx.save();
      ctx.translate(w * 0.74, h * 0.72);
      ctx.rotate(0.42);
      var g2 = ctx.createLinearGradient(-w * 0.25, 0, w * 0.25, 0);
      g2.addColorStop(0, 'rgba(255, 255, 255, 0)');
      g2.addColorStop(0.5, 'rgba(255, 228, 195, 0.035)');
      g2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(-w * 0.3, -h * 0.4, w * 0.6, h * 0.8);
      ctx.restore();
    }, { anisotropy: 8 });
  }

  function createGlareTexture(renderer) {
    return makeCanvasTexture(renderer, 512, 1024, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w * 0.56, h * 0.5);
      ctx.rotate(-0.58);
      var g = ctx.createLinearGradient(-w * 0.7, 0, w * 0.7, 0);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.38, 'rgba(255,255,255,0.015)');
      g.addColorStop(0.52, 'rgba(226,246,255,0.15)');
      g.addColorStop(0.58, 'rgba(255,243,225,0.07)');
      g.addColorStop(0.73, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(-w * 0.8, -h * 0.5, w * 1.6, h);
      ctx.restore();

      ctx.save();
      ctx.translate(w * 0.24, h * 0.35);
      ctx.rotate(0.54);
      var g2 = ctx.createLinearGradient(-w * 0.3, 0, w * 0.3, 0);
      g2.addColorStop(0, 'rgba(255,255,255,0)');
      g2.addColorStop(0.5, 'rgba(255,225,195,0.055)');
      g2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(-w * 0.4, -h * 0.35, w * 0.8, h * 0.7);
      ctx.restore();
    }, { anisotropy: 4 });
  }

  function createAppleLogoTexture(renderer) {
    return makeCanvasTexture(renderer, 320, 384, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w * 0.5, h * 0.55);
      ctx.scale(1, 1);

      var g = ctx.createLinearGradient(-100, -110, 100, 130);
      g.addColorStop(0, 'rgba(255, 247, 233, 0.96)');
      g.addColorStop(0.5, 'rgba(225, 207, 182, 0.8)');
      g.addColorStop(1, 'rgba(165, 141, 113, 0.7)');
      ctx.fillStyle = g;

      ctx.beginPath();
      ctx.moveTo(0, -56);
      ctx.bezierCurveTo(-28, -89, -87, -80, -105, -28);
      ctx.bezierCurveTo(-123, 25, -96, 112, -53, 140);
      ctx.bezierCurveTo(-34, 152, -16, 142, 0, 142);
      ctx.bezierCurveTo(16, 142, 34, 152, 53, 140);
      ctx.bezierCurveTo(96, 112, 123, 25, 105, -28);
      ctx.bezierCurveTo(87, -80, 28, -89, 0, -56);
      ctx.closePath();
      ctx.fill();

      var leaf = ctx.createLinearGradient(-12, -145, 85, -60);
      leaf.addColorStop(0, 'rgba(255, 247, 233, 0.98)');
      leaf.addColorStop(1, 'rgba(190, 163, 132, 0.8)');
      ctx.fillStyle = leaf;
      ctx.beginPath();
      ctx.moveTo(8, -92);
      ctx.bezierCurveTo(42, -134, 92, -129, 96, -121);
      ctx.bezierCurveTo(90, -85, 49, -66, 8, -92);
      ctx.closePath();
      ctx.fill();

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(108, 35, 45, 0, PI * 2);
      ctx.fill();
      ctx.restore();
    }, { anisotropy: 8 });
  }

  function createRegulatoryTexture(renderer) {
    return makeCanvasTexture(renderer, 512, 96, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(239, 231, 218, 0.42)';
      ctx.font = '500 14px Consolas, "SF Mono", monospace';
      ctx.fillText('iPhone 16 Pro', w / 2, 27);
      ctx.fillStyle = 'rgba(239, 231, 218, 0.23)';
      ctx.font = '400 9px Consolas, "SF Mono", monospace';
      ctx.fillText('DESIGNED BY APPLE IN CALIFORNIA', w / 2, 46);
      ctx.fillText('TITANIUM · CERAMIC SHIELD · 2024', w / 2, 60);
      ctx.fillStyle = 'rgba(239, 231, 218, 0.16)';
      ctx.fillRect(w / 2 - 35, 75, 70, 1);
    }, { anisotropy: 4 });
  }

  function createBoardTexture(renderer) {
    return makeCanvasTexture(renderer, 768, 768, function (ctx, w, h) {
      var random = seedRandom(31678);
      ctx.fillStyle = '#061713';
      ctx.fillRect(0, 0, w, h);

      var radial = ctx.createRadialGradient(w * 0.4, h * 0.35, 20, w * 0.45, h * 0.45, w * 0.7);
      radial.addColorStop(0, 'rgba(30, 84, 64, 0.3)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0.16)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(186, 148, 84, 0.17)';
      ctx.lineWidth = 1;
      for (var i = 0; i < 95; i++) {
        var x = Math.floor(random() * 24) * 32 + 8;
        var y = Math.floor(random() * 24) * 32 + 8;
        var len = 32 + Math.floor(random() * 5) * 32;
        ctx.beginPath();
        ctx.moveTo(x, y);
        if (random() > 0.5) {
          ctx.lineTo(x + len, y);
          if (random() > 0.35) ctx.lineTo(x + len, y + 32);
        } else {
          ctx.lineTo(x, y + len);
          if (random() > 0.35) ctx.lineTo(x + 32, y + len);
        }
        ctx.stroke();
      }

      for (var j = 0; j < 160; j++) {
        var vx = 10 + Math.floor(random() * 47) * 16;
        var vy = 10 + Math.floor(random() * 47) * 16;
        ctx.beginPath();
        ctx.arc(vx, vy, 1.3, 0, PI * 2);
        ctx.fillStyle = random() > 0.4 ? 'rgba(197, 159, 91, 0.34)' : 'rgba(123, 189, 161, 0.22)';
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (var k = 0; k < 16; k++) {
        var px = Math.floor(random() * 20) * 36 + 15;
        var py = Math.floor(random() * 20) * 36 + 15;
        ctx.fillRect(px, py, 18, 5);
      }

      ctx.strokeStyle = 'rgba(112, 208, 176, 0.09)';
      ctx.strokeRect(16, 16, w - 32, h - 32);
    }, { anisotropy: 8 });
  }

  function createChipTexture(renderer) {
    return makeCanvasTexture(renderer, 512, 512, function (ctx, w, h) {
      var g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#1a2022');
      g.addColorStop(0.45, '#0b0f11');
      g.addColorStop(1, '#252b2d');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(200, 216, 218, 0.11)';
      ctx.lineWidth = 1;
      for (var i = 0; i < 8; i++) {
        ctx.strokeRect(22 + i * 8, 22 + i * 8, w - 44 - i * 16, h - 44 - i * 16);
      }

      ctx.strokeStyle = 'rgba(218, 229, 228, 0.17)';
      for (var j = 0; j < 11; j++) {
        var p = 40 + j * 43;
        ctx.beginPath();
        ctx.moveTo(p, 18);
        ctx.lineTo(p, 43);
        ctx.moveTo(p, h - 18);
        ctx.lineTo(p, h - 43);
        ctx.stroke();
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(237, 240, 237, 0.88)';
      ctx.font = '600 55px "SF Pro Display", "Segoe UI", sans-serif';
      ctx.fillText('A18', w / 2, h * 0.45);
      ctx.font = '400 26px "SF Mono", Consolas, monospace';
      ctx.fillStyle = 'rgba(201, 215, 213, 0.57)';
      ctx.fillText('PRO', w / 2, h * 0.56);

      ctx.fillStyle = 'rgba(217, 192, 156, 0.38)';
      ctx.font = '400 14px "SF Mono", Consolas, monospace';
      ctx.fillText('APPLE  ·  3NM', w / 2, h * 0.69);

      var shine = ctx.createLinearGradient(0, 0, w, h * 0.7);
      shine.addColorStop(0, 'rgba(255,255,255,0.08)');
      shine.addColorStop(0.4, 'rgba(255,255,255,0)');
      shine.addColorStop(0.8, 'rgba(255,255,255,0.04)');
      ctx.fillStyle = shine;
      ctx.fillRect(0, 0, w, h);
    }, { anisotropy: 8 });
  }

  function createBatteryTexture(renderer) {
    return makeCanvasTexture(renderer, 768, 1024, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);

      var base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, '#15191a');
      base.addColorStop(0.6, '#0c0f10');
      base.addColorStop(1, '#191c1c');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(217, 226, 222, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(28, 28, w - 56, h - 56);
      ctx.strokeStyle = 'rgba(217, 226, 222, 0.065)';
      ctx.strokeRect(45, 45, w - 90, h - 90);

      ctx.fillStyle = 'rgba(229, 235, 230, 0.75)';
      ctx.font = '500 47px "SF Pro Display", "Segoe UI", "PingFang SC", sans-serif';
      ctx.fillText('iPhone 16 Pro', 80, 177);
      ctx.fillStyle = 'rgba(203, 216, 210, 0.45)';
      ctx.font = '400 23px "SF Mono", Consolas, monospace';
      ctx.fillText('Li-ion Polymer Battery', 80, 225);

      ctx.strokeStyle = 'rgba(204, 217, 213, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 282);
      ctx.lineTo(w - 80, 282);
      ctx.stroke();

      ctx.fillStyle = 'rgba(218, 227, 223, 0.48)';
      ctx.font = '400 27px "SF Mono", Consolas, monospace';
      ctx.fillText('3.58 V', 80, 354);
      ctx.fillText('3582 mAh', 80, 401);
      ctx.fillText('12.82 Wh', 80, 448);

      ctx.fillStyle = 'rgba(218, 227, 223, 0.26)';
      ctx.font = '400 19px "SF Mono", Consolas, monospace';
      ctx.fillText('CELL 01 / 001', 80, 515);
      ctx.fillText('MADE IN CHINA', 80, 551);

      // Barcode.
      ctx.fillStyle = 'rgba(232, 234, 227, 0.2)';
      var bx = 80;
      var random = seedRandom(90318);
      for (var i = 0; i < 68; i++) {
        var bw = random() > 0.62 ? 5 : 2;
        ctx.fillRect(bx, 633, bw, 173);
        bx += bw + (random() > 0.7 ? 5 : 2);
        if (bx > w - 90) break;
      }
      ctx.fillStyle = 'rgba(232, 234, 227, 0.21)';
      ctx.font = '400 15px "SF Mono", Consolas, monospace';
      ctx.fillText('A3101  ·  616-00891  ·  APPLE', 80, 856);

      ctx.strokeStyle = 'rgba(223, 229, 222, 0.12)';
      ctx.strokeRect(w - 230, 96, 128, 190);
      ctx.fillStyle = 'rgba(223, 229, 222, 0.25)';
      ctx.font = '400 16px "SF Mono", Consolas, monospace';
      ctx.fillText('NO FLAMMABLE', w - 226, 700);
      ctx.fillText('NO PUNCTURE', w - 226, 726);

      var finish = ctx.createLinearGradient(0, 0, w, 0);
      finish.addColorStop(0, 'rgba(255,255,255,0.02)');
      finish.addColorStop(0.5, 'rgba(255,255,255,0.055)');
      finish.addColorStop(1, 'rgba(0,0,0,0.03)');
      ctx.fillStyle = finish;
      ctx.fillRect(0, 0, w, h);
    }, { anisotropy: 8 });
  }

  function createGrilleTexture(renderer) {
    return makeCanvasTexture(renderer, 512, 192, function (ctx, w, h) {
      var base = ctx.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, '#16191a');
      base.addColorStop(0.5, '#0b0e0f');
      base.addColorStop(1, '#1a1e1f');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      var cols = 28;
      var rows = 7;
      for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
          var cx = 21 + x * 17.2;
          var cy = 30 + y * 22;
          var g = ctx.createRadialGradient(cx - 2, cy - 2, 0, cx, cy, 6.5);
          g.addColorStop(0, 'rgba(224, 230, 221, 0.24)');
          g.addColorStop(0.45, 'rgba(60, 66, 65, 0.5)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
          ctx.beginPath();
          ctx.arc(cx, cy, 5.6, 0, PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      var shine = ctx.createLinearGradient(0, 0, w, 0);
      shine.addColorStop(0, 'rgba(255,255,255,0.02)');
      shine.addColorStop(0.5, 'rgba(255,255,255,0.08)');
      shine.addColorStop(1, 'rgba(255,255,255,0.01)');
      ctx.fillStyle = shine;
      ctx.fillRect(0, 0, w, h);
    }, { anisotropy: 4 });
  }

  function createBumpTexture(renderer) {
    return makeCanvasTexture(renderer, 256, 256, function (ctx, w, h) {
      var image = ctx.createImageData(w, h);
      var random = seedRandom(7461);
      for (var i = 0; i < image.data.length; i += 4) {
        var value = 112 + Math.floor(random() * 26);
        image.data[i] = value;
        image.data[i + 1] = value;
        image.data[i + 2] = value;
        image.data[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#fff';
      for (var y = 0; y < h; y += 2) {
        ctx.beginPath();
        ctx.moveTo(0, y + random());
        ctx.lineTo(w, y + random());
        ctx.stroke();
      }
    }, {
      srgb: false,
      repeat: [3, 5],
      anisotropy: 4
    });
  }

  function createMicroTextTexture(renderer, text, sub, width, height) {
    return makeCanvasTexture(renderer, width || 512, height || 144, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(242, 235, 222, 0.65)';
      ctx.font = '500 ' + Math.floor(h * 0.26) + 'px "SF Mono", Consolas, monospace';
      ctx.fillText(text, w / 2, h * 0.42);
      if (sub) {
        ctx.fillStyle = 'rgba(242, 235, 222, 0.32)';
        ctx.font = '400 ' + Math.floor(h * 0.14) + 'px "SF Mono", Consolas, monospace';
        ctx.fillText(sub, w / 2, h * 0.7);
      }
    }, { anisotropy: 4 });
  }

  function createGlowTexture(renderer) {
    return makeCanvasTexture(renderer, 256, 256, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      var g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.18, 'rgba(205,249,255,0.72)');
      g.addColorStop(0.45, 'rgba(111,226,255,0.18)');
      g.addColorStop(1, 'rgba(54,157,191,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }, { srgb: true, anisotropy: 2 });
  }

  /* ------------------------------------------------------------------
     Model assembly
     ------------------------------------------------------------------ */

  function buildModel(renderer, finishId) {
    var finish = FINISHES.filter(function (item) {
      return item.id === finishId;
    })[0] || FINISHES[0];

    var phoneRoot = new THREE.Group();
    phoneRoot.name = 'iPhone 16 Pro';
    var parts = new Map();
    var pickables = [];
    var finishMaterials = { frame: [], back: [], button: [], plateau: [], lensRing: [] };

    var textures = {
      screen: createScreenTexture(renderer),
      glare: createGlareTexture(renderer),
      lens: createLensTexture(renderer),
      flash: createFlashTexture(renderer),
      backSheen: createBackSheenTexture(renderer),
      apple: createAppleLogoTexture(renderer),
      regulatory: createRegulatoryTexture(renderer),
      board: createBoardTexture(renderer),
      chip: createChipTexture(renderer),
      battery: createBatteryTexture(renderer),
      grille: createGrilleTexture(renderer),
      bump: createBumpTexture(renderer),
      glow: createGlowTexture(renderer),
      magsafeLabel: createMicroTextTexture(renderer, 'MagSafe', '25W WIRELESS CHARGING', 512, 170)
    };

    function registerFinishMaterial(role, material) {
      finishMaterials[role].push(material);
      return material;
    }

    function finishMaterial(role, options) {
      options = options || {};
      var material = new THREE.MeshPhysicalMaterial(Object.assign({
        color: new THREE.Color(finish[role]),
        metalness: role === 'back' ? 0.32 : 0.92,
        roughness: role === 'back' ? 0.5 : 0.28,
        clearcoat: role === 'back' ? 0.28 : 0.16,
        clearcoatRoughness: 0.32,
        envMapIntensity: role === 'back' ? 0.8 : 1.15
      }, options));
      return registerFinishMaterial(role, material);
    }

    function metal(color, options) {
      return new THREE.MeshPhysicalMaterial(Object.assign({
        color: new THREE.Color(color),
        metalness: 0.92,
        roughness: 0.28,
        clearcoat: 0.2,
        clearcoatRoughness: 0.28,
        envMapIntensity: 1.05
      }, options || {}));
    }

    function matte(color, options) {
      return new THREE.MeshStandardMaterial(Object.assign({
        color: new THREE.Color(color),
        metalness: 0.12,
        roughness: 0.68,
        envMapIntensity: 0.6
      }, options || {}));
    }

    function glass(color, options) {
      return new THREE.MeshPhysicalMaterial(Object.assign({
        color: new THREE.Color(color),
        metalness: 0.08,
        roughness: 0.08,
        transparent: true,
        opacity: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.4,
        depthWrite: false,
        side: THREE.DoubleSide
      }, options || {}));
    }

    function createPart(id) {
      var data = PART_MAP[id];
      if (!data) throw new Error('Unknown part: ' + id);
      var root = new THREE.Group();
      root.name = 'part-' + id;
      root.userData.partId = id;
      phoneRoot.add(root);
      var part = {
        id: id,
        data: data,
        root: root,
        materialSet: new Set(),
        pickables: [],
        anchor: new THREE.Vector3(data.anchor[0], data.anchor[1], data.anchor[2]),
        localBox: null
      };
      parts.set(id, part);
      return part;
    }

    function addMesh(part, geometry, material, position, rotation, scale, pickable) {
      position = position || [0, 0, 0];
      rotation = rotation || [0, 0, 0];
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);
      mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
      if (scale) mesh.scale.set(scale[0], scale[1], scale[2]);
      mesh.userData.partId = part.id;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      part.root.add(mesh);
      if (material) part.materialSet.add(material);
      if (pickable !== false) {
        part.pickables.push(mesh);
        pickables.push(mesh);
      }
      return mesh;
    }

    function addCurvedCable(part, points, radius, material, segments) {
      var curve = new THREE.CatmullRomCurve3(
        points.map(function (point) {
          return new THREE.Vector3(point[0], point[1], point[2]);
        })
      );
      var geometry = new THREE.TubeGeometry(curve, segments || 24, radius, 5, false);
      return addMesh(part, geometry, material, null, null, null, false);
    }

    function addScrew(part, x, y, z, radius, material) {
      var head = discGeometry(radius, 0.035, 18);
      addMesh(part, head, material, [x, y, z], null, null, false);
      var slotMaterial = matte('#121416', { roughness: 0.55, metalness: 0.3 });
      var slot = new THREE.BoxGeometry(radius * 1.45, radius * 0.18, 0.01);
      addMesh(part, slot, slotMaterial, [x, y, z + 0.02], [0, 0, 0.6], null, false);
      part.materialSet.add(slotMaterial);
    }

    function addLabel(part, texture, width, height, x, y, z, opacity, rotationY) {
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: opacity === undefined ? 1 : opacity,
        depthWrite: false,
        side: THREE.FrontSide,
        toneMapped: true
      });
      var geometry = new THREE.PlaneGeometry(width, height);
      var mesh = addMesh(part, geometry, material, [x, y, z], [0, rotationY || 0, 0], null, false);
      return mesh;
    }

    /* ----------------------------- Frame ----------------------------- */

    function buildFrame() {
      var part = createPart('frame');
      var frameMat = finishMaterial('frame', {
        roughness: 0.24,
        metalness: 0.94,
        clearcoat: 0.36,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.3
      });

      var outer = roundedRectShape(PHONE_W - 0.04, PHONE_H - 0.04, PHONE_R);
      var inner = roundedRectShape(PHONE_W - 0.25, PHONE_H - 0.25, PHONE_R - 0.09);
      outer.holes.push(inner);
      var frameGeometry = new THREE.ExtrudeGeometry(outer, {
        depth: PHONE_D - 0.085,
        steps: 1,
        curveSegments: 18,
        bevelEnabled: true,
        bevelThickness: 0.038,
        bevelSize: 0.024,
        bevelSegments: 4
      });
      frameGeometry.center();
      frameGeometry.computeVertexNormals();
      addMesh(part, frameGeometry, frameMat);

      var railLinerMat = matte('#151617', { roughness: 0.5, metalness: 0.55 });
      part.materialSet.add(railLinerMat);
      var innerLiner = roundedBoxGeometry(PHONE_W - 0.22, PHONE_H - 0.22, 0.035, PHONE_R - 0.08, 0.008);
      addMesh(part, innerLiner, railLinerMat, [0, 0, -0.12], null, null, false);

      // Internal lip that catches the light when the phone is opened.
      var lipMat = metal('#68655f', { roughness: 0.32, metalness: 0.9 });
      part.materialSet.add(lipMat);
      var lipOuter = roundedRectShape(PHONE_W - 0.29, PHONE_H - 0.29, PHONE_R - 0.12);
      var lipInner = roundedRectShape(PHONE_W - 0.4, PHONE_H - 0.4, PHONE_R - 0.17);
      lipOuter.holes.push(lipInner);
      var lipGeometry = new THREE.ExtrudeGeometry(lipOuter, {
        depth: 0.04,
        steps: 1,
        curveSegments: 16,
        bevelEnabled: true,
        bevelThickness: 0.008,
        bevelSize: 0.006,
        bevelSegments: 2
      });
      lipGeometry.center();
      addMesh(part, lipGeometry, lipMat, [0, 0, 0.34], null, null, false);

      // Antenna bands.
      var antennaMat = matte('#272625', { roughness: 0.46, metalness: 0.4 });
      part.materialSet.add(antennaMat);
      [6.1, 0.7, -5.7].forEach(function (y) {
        var geometry = new THREE.BoxGeometry(0.014, 0.085, PHONE_D * 0.9);
        addMesh(part, geometry, antennaMat, [-PHONE_W / 2 + 0.006, y, 0], null, null, false);
        addMesh(part, geometry, antennaMat, [PHONE_W / 2 - 0.006, y, 0], null, null, false);
      });

      // Button recesses.
      var recessMat = matte('#08090a', { roughness: 0.7, metalness: 0.2 });
      part.materialSet.add(recessMat);
      [
        [-1, 4.35, 0.6], [-1, 3.0, 0.82], [-1, 2.03, 0.82],
        [1, 3.3, 1.55], [1, -1.72, 0.72]
      ].forEach(function (item) {
        var geometry = roundedBoxGeometry(0.012, item[2], 0.28, 0.025, 0.003);
        addMesh(part, geometry, recessMat, [item[0] * (PHONE_W / 2 - 0.004), item[1], 0], null, null, false);
      });

      // Interior screw bosses.
      var bossMat = metal('#4b4a46', { roughness: 0.43, metalness: 0.8 });
      part.materialSet.add(bossMat);
      [[-2.95, 6.62], [2.95, 6.62], [-2.95, -6.55], [2.95, -6.55]].forEach(function (item) {
        var geometry = new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16);
        geometry.rotateX(PI / 2);
        addMesh(part, geometry, bossMat, [item[0], item[1], -0.08], null, null, false);
        addScrew(part, item[0], item[1], 0.17, 0.055, bossMat);
      });

      // Tiny bottom-side details (speaker perforations and connector opening).
      var bottomMat = matte('#050607', { roughness: 0.82, metalness: 0.15 });
      part.materialSet.add(bottomMat);
      for (var i = 0; i < 6; i++) {
        var side = i < 3 ? -1 : 1;
        var offset = 1.45 + (i % 3) * 0.35;
        var hole = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 10);
        hole.rotateX(PI / 2);
        addMesh(part, hole, bottomMat, [side * offset, -PHONE_H / 2 + 0.014, 0.02], null, null, false);
      }
      var usbCutout = roundedBoxGeometry(1.04, 0.17, 0.035, 0.06, 0.004);
      addMesh(part, usbCutout, bottomMat, [0.1, -PHONE_H / 2 + 0.032, 0.03], null, null, false);

      // Invisible-ish interior rails add structure in the exploded view.
      var railMat = metal('#33322f', { roughness: 0.5, metalness: 0.7 });
      part.materialSet.add(railMat);
      var railGeo = new THREE.BoxGeometry(0.055, 12.5, 0.06);
      addMesh(part, railGeo, railMat, [-3.2, 0, -0.03], null, null, false);
      addMesh(part, railGeo, railMat, [3.2, 0, -0.03], null, null, false);
    }

    /* ----------------------------- Screen ----------------------------- */

    function buildScreen() {
      var part = createPart('screen');

      var bezelMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#030506'),
        metalness: 0.35,
        roughness: 0.15,
        clearcoat: 0.7,
        clearcoatRoughness: 0.08,
        envMapIntensity: 0.75
      });
      part.materialSet.add(bezelMat);
      var bezel = roundedBoxGeometry(PHONE_W - 0.06, PHONE_H - 0.06, 0.09, PHONE_R - 0.015, 0.018);
      addMesh(part, bezel, bezelMat, [0, 0, 0.36]);

      var displayMat = new THREE.MeshBasicMaterial({
        map: textures.screen,
        color: 0xffffff,
        toneMapped: false
      });
      part.materialSet.add(displayMat);
      part.displayMaterial = displayMat;
      part.screenTexture = textures.screen;
      var displayGeo = roundedPlaneGeometry(PHONE_W - 0.34, PHONE_H - 0.35, PHONE_R - 0.19, 20);
      addMesh(part, displayGeo, displayMat, [0, 0, 0.414], null, null, true);

      var frontGlassMat = glass('#93adba', {
        opacity: 0.08,
        roughness: 0.055,
        metalness: 0.05,
        envMapIntensity: 1.35
      });
      part.materialSet.add(frontGlassMat);
      var frontGlassGeo = roundedPlaneGeometry(PHONE_W - 0.11, PHONE_H - 0.11, PHONE_R - 0.03, 20);
      addMesh(part, frontGlassGeo, frontGlassMat, [0, 0, 0.438], null, null, false);

      var glareMat = new THREE.MeshBasicMaterial({
        map: textures.glare,
        color: new THREE.Color('#d9eef2'),
        transparent: true,
        opacity: 0.085,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false
      });
      part.materialSet.add(glareMat);
      part.screenGlareMaterial = glareMat;
      var glareGeo = roundedPlaneGeometry(PHONE_W - 0.32, PHONE_H - 0.32, PHONE_R - 0.2, 20);
      addMesh(part, glareGeo, glareMat, [0, 0, 0.446], null, null, false);

      var blackMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#010203'),
        metalness: 0.55,
        roughness: 0.16,
        clearcoat: 0.8,
        clearcoatRoughness: 0.08,
        envMapIntensity: 0.8
      });
      part.materialSet.add(blackMat);

      var island = roundedBoxGeometry(1.68, 0.44, 0.046, 0.22, 0.008);
      addMesh(part, island, blackMat, [0, 6.19, 0.455]);

      var frontCameraTexture = textures.lens;
      var frontLensMat = new THREE.MeshBasicMaterial({
        map: frontCameraTexture,
        color: 0xffffff,
        toneMapped: false
      });
      part.materialSet.add(frontLensMat);
      var frontLensGeo = new THREE.CircleGeometry(0.092, 32);
      addMesh(part, frontLensGeo, frontLensMat, [0.46, 6.19, 0.481], [0, 0, 0], null, false);
      var frontLensRingMat = metal('#171a1b', { roughness: 0.22, metalness: 0.75 });
      part.materialSet.add(frontLensRingMat);
      var frontLensRingGeo = new THREE.TorusGeometry(0.091, 0.012, 8, 28);
      addMesh(part, frontLensRingGeo, frontLensRingMat, [0.46, 6.19, 0.482], null, null, false);

      var sensorMat = new THREE.MeshBasicMaterial({ color: 0x020305 });
      part.materialSet.add(sensorMat);
      var sensorGeo = new THREE.CircleGeometry(0.026, 16);
      addMesh(part, sensorGeo, sensorMat, [0.66, 6.19, 0.481], null, null, false);

      var earpieceMat = new THREE.MeshBasicMaterial({ color: 0x020202 });
      part.materialSet.add(earpieceMat);
      var earpiece = roundedPlaneGeometry(1.05, 0.065, 0.03, 8);
      addMesh(part, earpiece, earpieceMat, [0, 7.22, 0.454], null, null, false);

      // The display's backside flexes.
      var flexMat = metal('#b47d3f', { roughness: 0.34, metalness: 0.65 });
      part.materialSet.add(flexMat);
      addCurvedCable(part, [
        [-1.5, -6.45, 0.3],
        [-1.42, -6.8, 0.23],
        [-0.8, -7.04, 0.1],
        [0.6, -7.06, 0.05]
      ], 0.026, flexMat, 28);
      var flexMat2 = metal('#d0a457', { roughness: 0.3, metalness: 0.6 });
      part.materialSet.add(flexMat2);
      addCurvedCable(part, [
        [1.1, -6.2, 0.3],
        [1.62, -6.65, 0.22],
        [1.38, -7.0, 0.06]
      ], 0.018, flexMat2, 22);

      // Subtle illuminated rim line around the glass.
      var rimMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#9eeeff'),
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      part.materialSet.add(rimMat);
      var rimOuter = roundedRectShape(PHONE_W - 0.045, PHONE_H - 0.045, PHONE_R);
      var rimInner = roundedRectShape(PHONE_W - 0.135, PHONE_H - 0.135, PHONE_R - 0.045);
      rimOuter.holes.push(rimInner);
      var rimGeometry = new THREE.ShapeGeometry(rimOuter, 20);
      addMesh(part, rimGeometry, rimMat, [0, 0, 0.443], null, null, false);
    }

    /* ----------------------------- Back cover ----------------------------- */

    function buildBack() {
      var part = createPart('back');
      var backMat = finishMaterial('back', {
        roughness: 0.52,
        metalness: 0.28,
        clearcoat: 0.22,
        clearcoatRoughness: 0.46,
        envMapIntensity: 0.75,
        bumpMap: textures.bump,
        bumpScale: 0.005
      });
      var geometry = roundedBoxGeometry(PHONE_W - 0.06, PHONE_H - 0.06, 0.14, PHONE_R - 0.01, 0.022);
      addMesh(part, geometry, backMat, [0, 0, -0.39]);

      var linerMat = matte('#161514', { roughness: 0.64, metalness: 0.3 });
      part.materialSet.add(linerMat);
      var liner = roundedBoxGeometry(PHONE_W - 0.22, PHONE_H - 0.22, 0.045, PHONE_R - 0.08, 0.012);
      addMesh(part, liner, linerMat, [0, 0, -0.31], null, null, false);

      var gasketMat = matte('#08090a', { roughness: 0.72, metalness: 0.15 });
      part.materialSet.add(gasketMat);
      var gasketOuter = roundedRectShape(PHONE_W - 0.07, PHONE_H - 0.07, PHONE_R - 0.01);
      var gasketInner = roundedRectShape(PHONE_W - 0.19, PHONE_H - 0.19, PHONE_R - 0.06);
      gasketOuter.holes.push(gasketInner);
      var gasketGeometry = new THREE.ExtrudeGeometry(gasketOuter, {
        depth: 0.012,
        steps: 1,
        curveSegments: 16,
        bevelEnabled: true,
        bevelThickness: 0.004,
        bevelSize: 0.004,
        bevelSegments: 2
      });
      gasketGeometry.center();
      addMesh(part, gasketGeometry, gasketMat, [0, 0, -0.455], null, null, false);

      var appleMat = new THREE.MeshStandardMaterial({
        map: textures.apple,
        color: new THREE.Color('#9da4a6'),
        transparent: true,
        opacity: 0.8,
        metalness: 0.64,
        roughness: 0.29,
        envMapIntensity: 1.2,
        depthWrite: false,
        alphaTest: 0.01
      });
      part.materialSet.add(appleMat);
      var logo = new THREE.PlaneGeometry(1.22, 1.46);
      addMesh(part, logo, appleMat, [0, 0.18, -0.501], [0, PI, 0], null, false);

      var regMat = new THREE.MeshBasicMaterial({
        map: textures.regulatory,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        toneMapped: false
      });
      part.materialSet.add(regMat);
      var regulatory = new THREE.PlaneGeometry(2.2, 0.42);
      addMesh(part, regulatory, regMat, [0, -5.96, -0.502], [0, PI, 0], null, false);

      var sheenMat = new THREE.MeshBasicMaterial({
        map: textures.backSheen,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        toneMapped: false
      });
      part.materialSet.add(sheenMat);
      var sheenGeo = roundedPlaneGeometry(PHONE_W - 0.1, PHONE_H - 0.1, PHONE_R - 0.03, 18);
      addMesh(part, sheenGeo, sheenMat, [0, 0, -0.5005], [0, PI, 0], null, false);
    }

    /* ----------------------------- Camera ----------------------------- */

    function buildCamera() {
      var part = createPart('camera');
      var cx = 1.5;
      var cy = 5.35;
      var moduleY = cy;

      // The raised island is a continuation of the matte back glass,
      // surrounded by a very thin polished titanium lip.
      var plateauMat = finishMaterial('plateau', {
        roughness: 0.45,
        metalness: 0.1,
        clearcoat: 0.28,
        clearcoatRoughness: 0.44,
        envMapIntensity: 0.65
      });
      var island = roundedBoxGeometry(3.74, 3.74, 0.16, 0.9, 0.035);
      addMesh(part, island, plateauMat, [cx, moduleY, -0.47]);

      var surface = roundedBoxGeometry(3.54, 3.54, 0.055, 0.82, 0.012);
      addMesh(part, surface, plateauMat, [cx, moduleY, -0.548], null, null, false);

      var polishedMat = finishMaterial('lensRing', {
        metalness: 0.95,
        roughness: 0.22,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.35,
        side: THREE.DoubleSide
      });

      var rimOuter = roundedRectShape(3.72, 3.72, 0.9);
      var rimInner = roundedRectShape(3.6, 3.6, 0.84);
      rimOuter.holes.push(rimInner);
      var rimGeo = new THREE.ShapeGeometry(rimOuter, 18);
      addMesh(part, rimGeo, polishedMat, [cx, moduleY, -0.579], null, null, false);

      var barrelMat = matte('#070808', { roughness: 0.32, metalness: 0.62 });
      part.materialSet.add(barrelMat);
      var blackWellMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#020204'),
        metalness: 0.52,
        roughness: 0.09,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.5
      });
      part.materialSet.add(blackWellMat);
      var lensMat = new THREE.MeshBasicMaterial({
        map: textures.lens,
        transparent: false,
        toneMapped: true
      });      part.materialSet.add(lensMat);
      var domeMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#b9def0'),
        metalness: 0.02,
        roughness: 0.035,
        transparent: true,
        opacity: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 1.15,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      part.materialSet.add(domeMat);

      var lenses = [
        { x: 0.9, y: 0.9, rotation: 0.24 },
        { x: 0.9, y: -0.9, rotation: 2.45 },
        { x: -0.9, y: 0, rotation: 4.1 }
      ];

      lenses.forEach(function (lens) {
        var x = cx + lens.x;
        var y = moduleY + lens.y;

        // Dark mounting collar under the polished barrel.
        var mount = discGeometry(0.825, 0.035, 64);
        addMesh(part, mount, barrelMat, [x, y, -0.585], null, null, false);

        var barrelWall = new THREE.CylinderGeometry(0.815, 0.82, 0.062, 64, 1, true);
        barrelWall.rotateX(PI / 2);
        addMesh(part, barrelWall, polishedMat, [x, y, -0.617], null, null, false);

        // Thin polished ring around a large, dark lens window.
        var ringTop = new THREE.RingGeometry(0.665, 0.82, 72, 1);
        addMesh(part, ringTop, polishedMat, [x, y, -0.646], [0, PI, 0], null, false);

        var blackWell = discGeometry(0.69, 0.016, 72);
        addMesh(part, blackWell, blackWellMat, [x, y, -0.623], null, null, false);

        var lensPlane = new THREE.CircleGeometry(0.66, 72);
        var lensMesh = addMesh(part, lensPlane, lensMat, [x, y, -0.6415], [0, PI, 0], null, false);
        lensMesh.rotation.z = lens.rotation;

        var innerBevel = new THREE.TorusGeometry(0.672, 0.012, 8, 72);
        addMesh(part, innerBevel, barrelMat, [x, y, -0.644], null, null, false);

        var outerBevel = new THREE.TorusGeometry(0.812, 0.012, 8, 72);
        addMesh(part, outerBevel, polishedMat, [x, y, -0.641], null, null, false);

        var dome = new THREE.SphereGeometry(0.655, 40, 20, 0, PI * 2, 0, PI * 0.5);
        dome.rotateX(-PI / 2);
        dome.scale(1, 1, 0.16);
        addMesh(part, dome, domeMat, [x, y, -0.641], null, null, false);
      });

      // Flash: a large frosted white window with concentric Fresnel rings.
      var flashX = cx - 0.98;
      var flashY = moduleY + 1.24;
      var flashRingMat = polishedMat;
      var flashCollar = discGeometry(0.36, 0.035, 48);
      addMesh(part, flashCollar, barrelMat, [flashX, flashY, -0.585], null, null, false);
      var flashRim = new THREE.TorusGeometry(0.33, 0.026, 10, 48);
      addMesh(part, flashRim, flashRingMat, [flashX, flashY, -0.615], null, null, false);
      var flashMat = new THREE.MeshBasicMaterial({
        map: textures.flash,
        toneMapped: true
      });
      part.materialSet.add(flashMat);
      var flashFace = new THREE.CircleGeometry(0.31, 48);
      addMesh(part, flashFace, flashMat, [flashX, flashY, -0.619], [0, PI, 0], null, false);

      // LiDAR scanner.
      var lidarX = cx - 0.98;
      var lidarY = moduleY - 1.24;
      var lidarCollar = discGeometry(0.29, 0.032, 48);
      addMesh(part, lidarCollar, barrelMat, [lidarX, lidarY, -0.585], null, null, false);
      var lidarRingMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0c0c0e'),
        metalness: 0.65,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.1
      });
      part.materialSet.add(lidarRingMat);
      var lidarGlass = discGeometry(0.245, 0.018, 48);
      addMesh(part, lidarGlass, lidarRingMat, [lidarX, lidarY, -0.607], null, null, false);
      var lidarInner = new THREE.TorusGeometry(0.145, 0.012, 8, 40);
      addMesh(part, lidarInner, polishedMat, [lidarX, lidarY, -0.616], null, null, false);
      var lidarDot = new THREE.CircleGeometry(0.05, 24);
      addMesh(part, lidarDot, blackWellMat, [lidarX, lidarY, -0.618], [0, PI, 0], null, false);

      // Microphone pinhole between the LiDAR and the plateau edge.
      var micMat = new THREE.MeshBasicMaterial({ color: 0x020202 });
      part.materialSet.add(micMat);
      var mic = new THREE.CircleGeometry(0.028, 18);
      addMesh(part, mic, micMat, [cx - 1.63, moduleY - 0.47, -0.577], [0, PI, 0], null, false);
    }

    /* ----------------------------- Logic board ----------------------------- */

    function buildLogic() {
      var part = createPart('logic');
      var pcbMat = matte('#0a2b23', { roughness: 0.52, metalness: 0.26 });
      part.materialSet.add(pcbMat);
      var board = roundedBoxGeometry(3.9, 3.22, 0.105, 0.3, 0.014);
      addMesh(part, board, pcbMat, [1.02, 5.5, 0.055]);

      var extBoard = roundedBoxGeometry(1.36, 1.78, 0.1, 0.18, 0.012);
      addMesh(part, extBoard, pcbMat, [2.15, 3.16, 0.055], null, null, false);

      var traceMat = new THREE.MeshStandardMaterial({
        map: textures.board,
        color: 0xffffff,
        metalness: 0.26,
        roughness: 0.45,
        envMapIntensity: 0.55
      });
      part.materialSet.add(traceMat);
      var tracePlane = roundedPlaneGeometry(3.68, 2.98, 0.22, 12);
      addMesh(part, tracePlane, traceMat, [1.02, 5.5, 0.113], null, null, false);
      var tracePlane2 = roundedPlaneGeometry(1.15, 1.5, 0.12, 10);
      addMesh(part, tracePlane2, traceMat, [2.15, 3.16, 0.109], null, null, false);

      var substrateMat = matte('#101312', { roughness: 0.42, metalness: 0.28 });
      part.materialSet.add(substrateMat);
      var substrate = roundedBoxGeometry(1.22, 1.22, 0.055, 0.12, 0.01);
      addMesh(part, substrate, substrateMat, [0.88, 5.53, 0.13], null, null, false);

      var chipTopMat = metal('#7d8787', { roughness: 0.22, metalness: 0.92 });
      part.materialSet.add(chipTopMat);
      var chip = roundedBoxGeometry(0.91, 0.91, 0.075, 0.09, 0.01);
      addMesh(part, chip, chipTopMat, [0.88, 5.53, 0.195]);

      var chipLabelMat = new THREE.MeshBasicMaterial({
        map: textures.chip,
        color: 0xffffff,
        toneMapped: false
      });
      part.materialSet.add(chipLabelMat);
      var chipLabel = roundedPlaneGeometry(0.79, 0.79, 0.08, 10);
      addMesh(part, chipLabel, chipLabelMat, [0.88, 5.53, 0.238], null, null, false);

      var shieldMat = metal('#4c5252', { roughness: 0.37, metalness: 0.92 });
      part.materialSet.add(shieldMat);
      var shield1 = roundedBoxGeometry(0.92, 0.62, 0.11, 0.16, 0.01);
      addMesh(part, shield1, shieldMat, [2.08, 5.72, 0.15]);
      var shield2 = roundedBoxGeometry(0.58, 0.73, 0.1, 0.1, 0.008);
      addMesh(part, shield2, shieldMat, [2.47, 4.89, 0.145], null, null, false);
      var shield3 = roundedBoxGeometry(0.62, 0.48, 0.09, 0.1, 0.008);
      addMesh(part, shield3, shieldMat, [-0.25, 6.46, 0.14], null, null, false);

      // NAND and modem packages.
      var nandMat = matte('#171a1b', { roughness: 0.38, metalness: 0.25 });
      part.materialSet.add(nandMat);
      var nand = roundedBoxGeometry(0.72, 0.48, 0.09, 0.07, 0.008);
      addMesh(part, nand, nandMat, [1.32, 6.34, 0.16]);
      var modemMat = matte('#26292a', { roughness: 0.35, metalness: 0.4 });
      part.materialSet.add(modemMat);
      var modem = roundedBoxGeometry(0.54, 0.54, 0.085, 0.06, 0.008);
      addMesh(part, modem, modemMat, [1.78, 4.93, 0.16]);

      // Small SMD components via instancing.
      var smdMat = matte('#302d26', { roughness: 0.5, metalness: 0.45 });
      part.materialSet.add(smdMat);
      var smdSilver = metal('#777d7a', { roughness: 0.35, metalness: 0.85 });
      part.materialSet.add(smdSilver);
      var random = seedRandom(8823);
      var componentGeometry = new THREE.BoxGeometry(1, 1, 1);
      var instanced = new THREE.InstancedMesh(componentGeometry, smdMat, 26);
      var dummy = new THREE.Object3D();
      for (var i = 0; i < 26; i++) {
        var x = 0.1 + random() * 3.25;
        var y = 4.35 + random() * 2.58;
        if (Math.abs(x - 0.88) < 0.9 && Math.abs(y - 5.53) < 0.9) x += 0.95;
        var w = 0.07 + random() * 0.12;
        var h = 0.05 + random() * 0.08;
        dummy.position.set(x, y, 0.127 + random() * 0.02);
        dummy.scale.set(w, h, 0.035 + random() * 0.02);
        dummy.rotation.set(0, 0, random() > 0.5 ? 0 : PI / 2);
        dummy.updateMatrix();
        instanced.setMatrixAt(i, dummy.matrix);
      }
      instanced.instanceMatrix.needsUpdate = true;
      instanced.userData.partId = part.id;
      instanced.matrixAutoUpdate = false;
      part.root.add(instanced);
      part.materialSet.add(smdMat);

      var capacitorGeometry = new THREE.BoxGeometry(0.14, 0.06, 0.06);
      for (var c = 0; c < 11; c++) {
        var cx2 = 0.1 + random() * 3.1;
        var cy2 = 4.4 + random() * 2.3;
        addMesh(part, capacitorGeometry, smdSilver, [cx2, cy2, 0.14], [0, 0, random() > 0.5 ? PI / 2 : 0], null, false);
      }

      // Board connectors.
      var connectorMat = matte('#0c0c0c', { roughness: 0.58, metalness: 0.2 });
      part.materialSet.add(connectorMat);
      var goldMat = metal('#bc8b45', { roughness: 0.3, metalness: 0.82 });
      part.materialSet.add(goldMat);
      [[-0.3, 4.1], [1.9, 4.04], [2.55, 6.72]].forEach(function (connector) {
        var conn = roundedBoxGeometry(0.36, 0.14, 0.08, 0.025, 0.005);
        addMesh(part, conn, connectorMat, [connector[0], connector[1], 0.12], null, null, false);
        var pins = roundedBoxGeometry(0.25, 0.025, 0.02, 0.008, 0.002);
        addMesh(part, pins, goldMat, [connector[0], connector[1], 0.17], null, null, false);
      });

      // Copper/dark flex cable from board to display and camera.
      var flexCopper = metal('#9f6f36', { roughness: 0.35, metalness: 0.58 });
      part.materialSet.add(flexCopper);
      addCurvedCable(part, [
        [-0.48, 6.7, 0.11],
        [-1.45, 6.25, 0.15],
        [-2.2, 5.37, 0.08],
        [-2.48, 4.9, 0.0]
      ], 0.032, flexCopper, 32);

      var flexKapton = metal('#b9924f', { roughness: 0.32, metalness: 0.42 });
      part.materialSet.add(flexKapton);
      addCurvedCable(part, [
        [0.15, 6.7, 0.14],
        [-0.8, 6.86, 0.18],
        [-1.5, 6.74, 0.12]
      ], 0.022, flexKapton, 24);

      var screwMat = metal('#9a9285', { roughness: 0.27, metalness: 0.9 });
      part.materialSet.add(screwMat);
      addScrew(part, 0.18, 4.22, 0.14, 0.042, screwMat);
      addScrew(part, 2.76, 4.25, 0.14, 0.042, screwMat);
      addScrew(part, 2.75, 6.9, 0.14, 0.042, screwMat);
    }

    /* ----------------------------- Battery ----------------------------- */

    function buildBattery() {
      var part = createPart('battery');
      var casingMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#777c77'),
        metalness: 0.82,
        roughness: 0.34,
        clearcoat: 0.18,
        clearcoatRoughness: 0.38,
        envMapIntensity: 0.85
      });
      part.materialSet.add(casingMat);

      var main = roundedBoxGeometry(4.18, 6.86, 0.46, 0.34, 0.035);
      addMesh(part, main, casingMat, [-0.12, -1.95, 0.045]);

      var upper = roundedBoxGeometry(2.12, 2.0, 0.44, 0.3, 0.03);
      addMesh(part, upper, casingMat, [-1.15, 2.15, 0.045]);

      var seamMat = matte('#1b1d1c', { roughness: 0.74, metalness: 0.2 });
      part.materialSet.add(seamMat);
      var seam = roundedBoxGeometry(4.12, 0.038, 0.008, 0.01, 0.002);
      addMesh(part, seam, seamMat, [-0.12, -3.5, 0.281], null, null, false);
      var seam2 = roundedBoxGeometry(4.12, 0.024, 0.008, 0.005, 0.002);
      addMesh(part, seam2, seamMat, [-0.12, 0.82, 0.281], null, null, false);

      var labelMat = new THREE.MeshBasicMaterial({
        map: textures.battery,
        transparent: true,
        opacity: 0.96,
        depthWrite: false,
        toneMapped: true
      });
      part.materialSet.add(labelMat);
      var label = roundedPlaneGeometry(3.58, 5.72, 0.22, 12);
      addMesh(part, label, labelMat, [-0.16, -2.06, 0.283], null, null, false);

      var upperLabelMat = new THREE.MeshBasicMaterial({
        map: createMicroTextTexture(renderer, 'iPhone', 'Li-ion · 001', 512, 256),
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        toneMapped: true
      });
      part.materialSet.add(upperLabelMat);
      var upperLabel = new THREE.PlaneGeometry(1.35, 0.68);
      addMesh(part, upperLabel, upperLabelMat, [-1.19, 2.16, 0.275], null, null, false);

      var bmsMat = matte('#0c0f10', { roughness: 0.56, metalness: 0.3 });
      part.materialSet.add(bmsMat);
      var bms = roundedBoxGeometry(1.5, 0.37, 0.12, 0.06, 0.008);
      addMesh(part, bms, bmsMat, [-0.35, 3.12, 0.18], null, null, false);

      var connectorMat = metal('#b78a48', { roughness: 0.3, metalness: 0.72 });
      part.materialSet.add(connectorMat);
      var connector = roundedBoxGeometry(0.72, 0.21, 0.08, 0.03, 0.006);
      addMesh(part, connector, connectorMat, [0.45, 3.18, 0.22], null, null, false);

      var flexMat = metal('#9f6b37', { roughness: 0.37, metalness: 0.58 });
      part.materialSet.add(flexMat);
      addCurvedCable(part, [
        [0.45, 3.17, 0.18],
        [1.25, 3.35, 0.17],
        [1.45, 4.0, 0.1]
      ], 0.025, flexMat, 20);

      // Pull tabs.
      var tabMat = matte('#18120d', { roughness: 0.85, metalness: 0.05 });
      part.materialSet.add(tabMat);
      var tabGeo = new THREE.PlaneGeometry(0.58, 0.54);
      addMesh(part, tabGeo, tabMat, [-1.22, -5.38, 0.24], [-0.18, 0, 0.04], null, false);
      addMesh(part, tabGeo, tabMat, [0.86, -5.38, 0.24], [-0.18, 0, -0.03], null, false);

      // Corner protection tape.
      var tapeMat = matte('#0d0d0c', { roughness: 0.7, metalness: 0.1 });
      part.materialSet.add(tapeMat);
      var tapeGeo = new THREE.BoxGeometry(0.3, 0.08, 0.04);
      addMesh(part, tapeGeo, tapeMat, [-1.76, 3.04, 0.25], [0, 0, 0.3], null, false);
    }

    /* ----------------------------- Taptic engine ----------------------------- */

    function buildTaptic() {
      var part = createPart('taptic');
      var bodyMat = metal('#3b3f40', { roughness: 0.34, metalness: 0.88 });
      part.materialSet.add(bodyMat);
      var body = roundedBoxGeometry(1.94, 2.18, 0.55, 0.27, 0.025);
      addMesh(part, body, bodyMat, [-2.15, -6.05, 0.03]);

      var topMat = matte('#0c0f10', { roughness: 0.42, metalness: 0.3 });
      part.materialSet.add(topMat);
      var top = roundedPlaneGeometry(1.72, 1.96, 0.2, 14);
      addMesh(part, top, topMat, [-2.15, -6.05, 0.315], null, null, false);

      var copperMat = metal('#ba7a39', { roughness: 0.27, metalness: 0.78 });
      part.materialSet.add(copperMat);
      var coil = new THREE.TorusGeometry(0.53, 0.052, 10, 44);
      addMesh(part, coil, copperMat, [-2.15, -6.05, 0.338], null, null, false);
      var coil2 = new THREE.TorusGeometry(0.62, 0.018, 8, 44);
      addMesh(part, coil2, copperMat, [-2.15, -6.05, 0.34], null, null, false);

      var discMat = metal('#b9b3a8', { roughness: 0.4, metalness: 0.88 });
      part.materialSet.add(discMat);
      var center = discGeometry(0.31, 0.035, 32);
      addMesh(part, center, discMat, [-2.15, -6.05, 0.352], null, null, false);

      var flexMat = metal('#b78246', { roughness: 0.32, metalness: 0.55 });
      part.materialSet.add(flexMat);
      addCurvedCable(part, [
        [-1.55, -5.0, 0.2],
        [-0.98, -4.65, 0.15],
        [-0.1, -4.4, 0.06]
      ], 0.028, flexMat, 22);

      var screwMat = metal('#a49a8b', { roughness: 0.26, metalness: 0.9 });
      part.materialSet.add(screwMat);
      addScrew(part, -2.9, -5.28, 0.33, 0.045, screwMat);
      addScrew(part, -1.4, -5.28, 0.33, 0.045, screwMat);

      var labelMat = new THREE.MeshBasicMaterial({
        map: createMicroTextTexture(renderer, 'TAPTIC', 'ENGINE', 384, 128),
        transparent: true,
        opacity: 0.36,
        depthWrite: false,
        toneMapped: true
      });
      part.materialSet.add(labelMat);
      var label = new THREE.PlaneGeometry(0.75, 0.25);
      addMesh(part, label, labelMat, [-2.15, -7.03, 0.338], null, null, false);
    }

    /* ----------------------------- Speaker ----------------------------- */

    function buildSpeaker() {
      var part = createPart('speaker');
      var housingMat = metal('#303435', { roughness: 0.36, metalness: 0.84 });
      part.materialSet.add(housingMat);
      var housing = roundedBoxGeometry(3.12, 1.26, 0.48, 0.24, 0.02);
      addMesh(part, housing, housingMat, [1.58, -6.53, 0.04]);

      var grilleMat = new THREE.MeshStandardMaterial({
        map: textures.grille,
        color: 0xffffff,
        metalness: 0.5,
        roughness: 0.4,
        envMapIntensity: 0.6
      });
      part.materialSet.add(grilleMat);
      var grille = roundedPlaneGeometry(2.84, 0.99, 0.17, 10);
      addMesh(part, grille, grilleMat, [1.58, -6.53, 0.295], null, null, false);

      var frameMat = metal('#666964', { roughness: 0.39, metalness: 0.9 });
      part.materialSet.add(frameMat);
      var lip = roundedBoxGeometry(3.18, 0.1, 0.54, 0.04, 0.012);
      addMesh(part, lip, frameMat, [1.58, -7.06, 0.03], null, null, false);

      var coilMat = metal('#c4894c', { roughness: 0.3, metalness: 0.73 });
      part.materialSet.add(coilMat);
      var coil = new THREE.TorusGeometry(0.21, 0.035, 8, 28);
      addMesh(part, coil, coilMat, [0.34, -6.35, 0.292], null, null, false);
      var magnetMat = metal('#191b1b', { roughness: 0.3, metalness: 0.7 });
      part.materialSet.add(magnetMat);
      var magnet = discGeometry(0.16, 0.035, 28);
      addMesh(part, magnet, magnetMat, [0.34, -6.35, 0.31], null, null, false);

      var cableMat = metal('#a2723e', { roughness: 0.36, metalness: 0.5 });
      part.materialSet.add(cableMat);
      addCurvedCable(part, [
        [2.7, -6.2, 0.19],
        [2.95, -5.75, 0.12],
        [2.8, -4.95, 0.03]
      ], 0.025, cableMat, 20);
    }

    /* ----------------------------- USB-C ----------------------------- */

    function buildUsb() {
      var part = createPart('usb');
      var housingMat = metal('#606460', { roughness: 0.3, metalness: 0.92 });
      part.materialSet.add(housingMat);
      var housing = roundedBoxGeometry(1.24, 0.95, 0.38, 0.2, 0.018);
      addMesh(part, housing, housingMat, [0.15, -7.06, 0.04]);

      var insideMat = matte('#080a0a', { roughness: 0.66, metalness: 0.22 });
      part.materialSet.add(insideMat);
      var inside = roundedBoxGeometry(0.99, 0.36, 0.05, 0.16, 0.006);
      addMesh(part, inside, insideMat, [0.15, -7.05, 0.235], null, null, false);

      var tongueMat = metal('#b48b4b', { roughness: 0.3, metalness: 0.82 });
      part.materialSet.add(tongueMat);
      var tongue = roundedBoxGeometry(0.73, 0.12, 0.04, 0.05, 0.004);
      addMesh(part, tongue, tongueMat, [0.15, -7.02, 0.257], null, null, false);

      var pinMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#e1bd73') });
      part.materialSet.add(pinMat);
      for (var i = 0; i < 6; i++) {
        var pin = new THREE.PlaneGeometry(0.035, 0.055);
        addMesh(part, pin, pinMat, [0.15 - 0.26 + i * 0.104, -7.02, 0.278], null, null, false);
      }

      var shieldMat = metal('#333634', { roughness: 0.4, metalness: 0.85 });
      part.materialSet.add(shieldMat);
      var shield = roundedBoxGeometry(0.77, 0.5, 0.06, 0.1, 0.008);
      addMesh(part, shield, shieldMat, [0.15, -7.37, 0.03], null, null, false);

      var flexMat = metal('#a4743d', { roughness: 0.3, metalness: 0.62 });
      part.materialSet.add(flexMat);
      addCurvedCable(part, [
        [0.15, -6.6, 0.08],
        [-0.1, -6.26, 0.03],
        [0.0, -5.48, -0.02]
      ], 0.03, flexMat, 18);

      var labelMat = new THREE.MeshBasicMaterial({
        map: createMicroTextTexture(renderer, 'USB-C', '10Gb/s', 384, 128),
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        toneMapped: true
      });
      part.materialSet.add(labelMat);
      var label = new THREE.PlaneGeometry(0.7, 0.23);
      addMesh(part, label, labelMat, [0.15, -7.33, 0.239], null, null, false);
    }

    /* ----------------------------- MagSafe ----------------------------- */

    function buildMagsafe() {
      var part = createPart('magsafe');
      var shieldMat = matte('#171b1c', { roughness: 0.57, metalness: 0.42 });
      part.materialSet.add(shieldMat);
      var shield = discGeometry(2.82, 0.055, 64);
      addMesh(part, shield, shieldMat, [0.05, 0.2, -0.405], null, null, false);

      var magnetMat = matte('#2f3130', { roughness: 0.43, metalness: 0.62 });
      part.materialSet.add(magnetMat);
      var segmentGeo = new THREE.BoxGeometry(0.4, 0.13, 0.07);
      for (var i = 0; i < 16; i++) {
        var angle = (i / 16) * PI * 2;
        var x = Math.cos(angle) * 2.4;
        var y = Math.sin(angle) * 2.4 + 0.2;
        var seg = addMesh(part, segmentGeo, magnetMat, [x, y, -0.36], [0, 0, angle + PI / 2], null, false);
        seg.matrixAutoUpdate = true;
      }

      var coilMat = metal('#c1894f', { roughness: 0.25, metalness: 0.8 });
      part.materialSet.add(coilMat);
      [2.2, 2.11, 2.02, 1.93, 1.84].forEach(function (radius, index) {
        var coil = new THREE.TorusGeometry(radius, 0.018, 6, 72);
        addMesh(part, coil, coilMat, [0.05, 0.2, -0.318 + index * 0.001], null, null, false);
      });

      var centerMat = metal('#7d817e', { roughness: 0.45, metalness: 0.82 });
      part.materialSet.add(centerMat);
      var center = discGeometry(1.35, 0.035, 48);
      addMesh(part, center, centerMat, [0.05, 0.2, -0.35], null, null, false);

      var chipMat = matte('#0a0c0c', { roughness: 0.5, metalness: 0.25 });
      part.materialSet.add(chipMat);
      var chip = roundedBoxGeometry(1.55, 0.82, 0.06, 0.08, 0.008);
      addMesh(part, chip, chipMat, [0.05, 0.2, -0.305], null, null, false);

      var labelMat = new THREE.MeshBasicMaterial({
        map: textures.magsafeLabel,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        toneMapped: true
      });
      part.materialSet.add(labelMat);
      var label = new THREE.PlaneGeometry(1.7, 0.56);
      addMesh(part, label, labelMat, [0.05, 0.2, -0.27], null, null, false);

      var flexMat = metal('#9b6d3c', { roughness: 0.35, metalness: 0.55 });
      part.materialSet.add(flexMat);
      addCurvedCable(part, [
        [1.55, 1.08, -0.36],
        [2.3, 2.45, -0.4],
        [2.35, 3.2, -0.28]
      ], 0.028, flexMat, 22);
    }

    /* ----------------------------- Buttons ----------------------------- */

    function buildButtons() {
      var part = createPart('buttons');
      var buttonMat = finishMaterial('button', {
        roughness: 0.2,
        metalness: 0.96,
        clearcoat: 0.35,
        clearcoatRoughness: 0.18,
        envMapIntensity: 1.2
      });
      var trimMat = finishMaterial('button', {
        roughness: 0.3,
        metalness: 0.92,
        clearcoat: 0.2,
        clearcoatRoughness: 0.24,
        envMapIntensity: 1
      });

      var xL = -PHONE_W / 2 - 0.016;
      var xR = PHONE_W / 2 + 0.016;

      var action = roundedBoxGeometry(0.16, 0.58, 0.31, 0.055, 0.012);
      addMesh(part, action, buttonMat, [xL, 4.35, 0.02]);
      var actionRidge = roundedBoxGeometry(0.022, 0.42, 0.19, 0.008, 0.003);
      addMesh(part, actionRidge, trimMat, [xL - 0.075, 4.35, 0.02], null, null, false);

      var volumeUp = roundedBoxGeometry(0.17, 0.8, 0.31, 0.065, 0.012);
      addMesh(part, volumeUp, buttonMat, [xL, 3.0, 0.02]);
      var volumeDown = roundedBoxGeometry(0.17, 0.8, 0.31, 0.065, 0.012);
      addMesh(part, volumeDown, buttonMat, [xL, 2.04, 0.02]);

      var power = roundedBoxGeometry(0.17, 1.55, 0.32, 0.075, 0.014);
      addMesh(part, power, buttonMat, [xR, 3.3, 0.02]);

      var cameraControlFrame = roundedBoxGeometry(0.15, 0.82, 0.3, 0.065, 0.012);
      addMesh(part, cameraControlFrame, buttonMat, [xR, -1.72, 0.02]);

      var sapphireMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#8ac3d7'),
        metalness: 0.15,
        roughness: 0.08,
        transparent: true,
        opacity: 0.42,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.8
      });
      part.materialSet.add(sapphireMat);
      var sapphire = roundedBoxGeometry(0.035, 0.65, 0.18, 0.04, 0.006);
      addMesh(part, sapphire, sapphireMat, [xR + 0.075, -1.72, 0.02], null, null, false);

      var lineMat = matte('#171615', { roughness: 0.5, metalness: 0.4 });
      part.materialSet.add(lineMat);
      var line = new THREE.BoxGeometry(0.01, 0.6, 0.24);
      addMesh(part, line, lineMat, [xR + 0.09, -1.72, 0.02], null, null, false);

      // Contact gaskets behind each button.
      var gasketMat = matte('#070808', { roughness: 0.8, metalness: 0.1 });
      part.materialSet.add(gasketMat);
      var gasketGeo = new THREE.BoxGeometry(0.018, 0.46, 0.25);
      addMesh(part, gasketGeo, gasketMat, [xL + 0.08, 4.35, 0.02], null, null, false);
      var gasketGeo2 = new THREE.BoxGeometry(0.018, 0.66, 0.25);
      addMesh(part, gasketGeo2, gasketMat, [xL + 0.08, 3.0, 0.02], null, null, false);
      addMesh(part, gasketGeo2, gasketMat, [xL + 0.08, 2.04, 0.02], null, null, false);
      var gasketGeo3 = new THREE.BoxGeometry(0.018, 1.35, 0.26);
      addMesh(part, gasketGeo3, gasketMat, [xR - 0.08, 3.3, 0.02], null, null, false);
    }

    /* ----------------------------- Assemble ----------------------------- */

    // The internals come first so that the glass parts render above them
    // when the layer stack is exposed.
    buildFrame();
    buildLogic();
    buildBattery();
    buildMagsafe();
    buildTaptic();
    buildSpeaker();
    buildUsb();
    buildCamera();
    buildBack();
    buildScreen();
    buildButtons();

    // Cache the local bounds before any transform is applied.
    phoneRoot.updateWorldMatrix(true, true);
    parts.forEach(function (part) {
      part.root.updateWorldMatrix(true, true);
      var box = new THREE.Box3().setFromObject(part.root);
      if (!box.isEmpty()) {
        part.localBox = box;
      } else {
        part.localBox = new THREE.Box3(
          new THREE.Vector3(-0.2, -0.2, -0.2),
          new THREE.Vector3(0.2, 0.2, 0.2)
        );
      }

      // Collect unique materials and prepare them for runtime highlighting.
      var materials = Array.from(part.materialSet);
      materials = materials.filter(function (material) {
        return material && material.isMaterial;
      });
      materials.forEach(function (material) {
        if (material.userData.baseOpacity === undefined) {
          material.userData.baseOpacity = material.opacity;
          material.userData.baseTransparent = material.transparent;
          material.userData.baseDepthWrite = material.depthWrite;
          material.userData.baseEmissive = material.emissive
            ? material.emissive.clone()
            : null;
          material.userData.baseEmissiveIntensity = material.emissiveIntensity === undefined
            ? 1
            : material.emissiveIntensity;
        }
      });
      part.materials = materials;
      part.centerLocal = new THREE.Vector3();
      if (part.localBox) {
        var center = new THREE.Vector3();
        part.localBox.getCenter(center);
        part.centerLocal.copy(center);
        var size = new THREE.Vector3();
        part.localBox.getSize(size);
        part.size = size;
        part.maxDimension = Math.max(size.x, size.y, size.z);
      }
    });

    return {
      root: phoneRoot,
      parts: parts,
      pickables: pickables,
      finishMaterials: finishMaterials,
      textures: textures,
      finishData: finish,
      phone: {
        width: PHONE_W,
        height: PHONE_H,
        depth: PHONE_D,
        radius: PHONE_R
      }
    };
  }

  window.IPHONE_MODEL = {
    buildModel: buildModel,
    PARTS: PARTS,
    FINISHES: FINISHES,
    dimensions: {
      width: PHONE_W,
      height: PHONE_H,
      depth: PHONE_D,
      radius: PHONE_R
    }
  };
})();
