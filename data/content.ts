import { ProductId, ProductDetail, CatalogItem, SolutionData, CulturePost } from '../types';

// Icons are stored as strings here to allow JSON serialization/editing in the Debug Panel.
// The App component maps these strings to actual Lucide components.

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://youke2.picui.cn/s1/2025/12/13/693d082b27fe1.png',
    title: '专注 <br/><span class="text-pinte-gold">"烫金表面美学"</span>',
    subtitle: "做高端烫金膜专家",
    description: "品特®专注于研发高端烫金材料，赋予包装卓越的视觉冲击力与品牌价值。从电化铝，颜料箔到数码冷烫，定义光影艺术。",
    buttonText: "产品中心"
  },
  {
    id: 2,
    image: "https://youke2.picui.cn/s1/2025/12/13/693d2eb71c6ee.jpg",
    title: '20,000m² <br/><span class="text-blue-400">自有研发基地</span>',
    subtitle: "先进的涂布生产设备",
    description: "拥有超3条自动化涂布生产线与产品研发实验室，月均产能超180万米。ISO9001体系认证，确保每一卷产品的极致稳定性。",
    buttonText: "在线看厂"
  },
  {
    id: 3,
    image: "https://youke2.picui.cn/s1/2025/12/13/693d305bf17b7.jpg",
    title: '值得信赖的 <br/><span class="text-green-400">OEM/ODM 烫金制造商</span>',
    subtitle: "以技术为核心，以品质为根本，以客户为中心，以信誉为资本",
    description: "代代相传的四个理念是我们服务的信念",
    buttonText: "合作咨询"
  }
];

export const COMPANY_STATS = [
    { targetValue: "1999", label: "公司成立于", icon: "Building2" },
    { targetValue: "180,000+", suffix: "+", label: "月均出货(米)", icon: "TrendingUp" },
    { targetValue: "20,000+", suffix: "+", label: "厂房面积(㎡)", icon: "Factory" },
    { targetValue: "10+", suffix: "+", label: "专利技术", icon: "Lightbulb" },
];

export const PRODUCT_DATA: Record<ProductId, ProductDetail> = {
  PK: {
    id: 'PK',
    name: 'PK 咖啡底系列',
    subtitle: 'COFFEE GLUE SERIES',
    description: '专为粗糙表面设计，拥有极佳的遮盖率与上烫性。在重油墨纸张上也能保持光泽，不会氧化发黑。',
    heroImage: 'https://meiqia-upload-temp.meiqiausercontent.com/files/20251216/DQQZuxMUEECg/qdqqd/_1765866836300.png',
    features: [
      { title: '重油墨不氧化', desc: '特有涂层配方，防止在深色/重油墨表面氧化。', icon: "Zap" },
      { title: '强附着力', desc: '针对粗纹纸、压纹皮革等不平整表面优化。', icon: "Layers" },
      { title: '离型稳定', desc: '剥离干净，边缘锐利，适合大面积烫印。', icon: "CheckCircle2" },
    ],
    params: [
      { label: '厚度', value: '12μm / 15μm' },
      { label: '标准卷', value: '0.64m x 120m' },
      { label: '类型', value: '通用型 / 强力型' },
      { label: '耐抗性', value: '抗氧化 / 耐刮擦' },
    ],
    substrates: ['粗纹纸', '特种纸', '人造皮 (PU/PVC)', '真皮', '充皮纸', '触感纸'],
    applications: ['高档酒盒', '化妆品包装', '皮具吊牌', '精装书封面'],
    colors: ['亮金', '亮银', '哑金', '哑银', '玫瑰金'],
    temp: { flat: '95 - 105°C', round: '140 - 170°C' }
  },
  PC: {
    id: 'PC',
    name: 'PC 塑胶系列',
    subtitle: 'PLASTIC SERIES',
    description: '采用特制PC胶底，专攻塑胶材质。具有卓越的耐酒精性与分切性。可完美通过百格测试。',
    heroImage: 'https://youke2.picui.cn/s1/2025/12/16/69410046cf35c.png',
    features: [
      { title: '耐酒精', desc: '烫印后可耐酒精擦拭，符合化妆品包材标准。', icon: "Droplet" },
      { title: '分切性好', desc: '烫印边缘整齐，无毛边，无金粉脱落。', icon: "Box" },
      { title: '兼容UV', desc: '支持在UV光油表面进行后续烫印。', icon: "Layers" },
    ],
    params: [
      { label: '厚度', value: '12μm' },
      { label: '标准卷', value: '0.64m x 120m' },
      { label: '光泽度', value: '高亮 / 镜面' },
      { label: '测试', value: '3M胶带百格测试' },
    ],
    substrates: ['ABS', 'PS', 'PVC', 'PMMA (亚克力)', 'PP', 'PE软管'],
    applications: ['口红管', '粉饼盒', '睫毛膏管', '洗面奶软管', '电器面板'],
    colors: ['金属色', '全息色', '拉丝纹'],
    temp: { flat: '100 - 160°C', round: '180 - 230°C' }
  },
  PLPY: {
    id: 'PLPY',
    name: 'PL/PY 颜料箔',
    subtitle: 'PIGMENT FOILS',
    description: '以颜料为原料的非镀铝产品。解决印刷油墨遮盖力不足的问题，色彩饱满，呈现纯正色彩。',
    heroImage: 'https://youke2.picui.cn/s1/2025/12/16/6940faa5f2874.png',
    features: [
      { title: '高遮盖力', desc: '轻松遮盖深色底材，不透底。', icon: "Layers" },
      { title: '色彩纯正', desc: '无金属光泽干扰，还原设计本色。', icon: "Star" },
      { title: '双重质感', desc: '提供 PL(亮面) 和 PY(哑面) 两种选择。', icon: "CheckCircle2" },
    ],
    params: [
      { label: '类型', value: '颜料箔 (Pigment)' },
      { label: '表面', value: 'Glossy (PL) / Matte (PY)' },
      { label: '标准卷', value: '0.64m x 120m' },
      { label: '环保', value: 'ROHS / EN71-3' },
    ],
    substrates: ['铜版纸', '白卡纸', '艺术纸', '充皮纸', '皮革'],
    applications: ['贺卡', '礼品盒', '吊牌', '铅笔杆', '日期打码'],
    colors: ['黑', '白', '红', '蓝', '以及Pantone定制色'],
    temp: { flat: '100 - 150°C', round: '150 - 190°C' }
  },
  DIGITAL: {
    id: 'DIGITAL',
    name: '数码/冷烫系列',
    subtitle: 'DIGITAL & COLD FOIL',
    description: '无需制版，直接在UV光油或数码墨层上进行固化转移。适合个性化定制与小批量生产。',
    heroImage: 'https://youke2.picui.cn/s1/2025/12/16/694100f7bd175.jpg',
    features: [
      { title: '无需制版', desc: '数码文件直接输出，立等可取。', icon: "Zap" },
      { title: '立体感强', desc: '配合堆金工艺，实现浮雕般效果。', icon: "Layers" },
      { title: '精细度高', desc: '极细线条与网点也能完美呈现。', icon: "CheckCircle2" },
    ],
    params: [
      { label: '工艺', value: 'UV冷烫 / 数码烫' },
      { label: '设备', value: 'MGI / Scodix / 丝印机' },
      { label: '速度', value: '高速固化' },
      { label: '光泽', value: '极高亮度' },
    ],
    substrates: ['UV光油表面', '数码碳粉层', '冷烫胶水层'],
    applications: ['个性化名片', '少量包装打样', '日化标签', '创意印刷品'],
    colors: ['亮金', '亮银', '全息素面'],
    temp: { flat: 'UV 固化', round: '冷压转移' }
  },
  GLITTER: {
    id: 'GLITTER',
    name: '金葱粉系列',
    subtitle: 'PREMIUM GLITTER',
    description: '25年生产经验，六角形切片，耐高温、耐溶剂。光泽度持久，不褪色。',
    heroImage: 'https://youke2.picui.cn/s1/2025/12/16/69410140d4733.jpg',
    features: [
      { title: '耐溶剂', desc: '在指甲油、胶水中不褪色、不溶化。', icon: "Droplet" },
      { title: '形状规则', desc: '标准正六角形，边缘整齐。', icon: "Box" },
      { title: '规格齐全', desc: '从 1/4" 到 1/500" 多种粒径可选。', icon: "Star" },
    ],
    params: [
      { label: '材质', value: 'PET / PVC / 铝材' },
      { label: '耐温', value: '180°C - 260°C' },
      { label: '形状', value: '六角 / 四角 / 条状 / 异形' },
      { label: '环保', value: 'EN71-3 / ASTM' },
    ],
    substrates: ['纸张', '布料', '塑胶', '指甲油', '油墨'],
    applications: ['圣诞饰品', '丝网印刷', '美甲', '注塑', '贺卡'],
    colors: ['镭射', '七彩', '金银', '幻彩'],
    temp: { flat: '常温', round: '注塑高温' }
  }
};

export const CATALOG_DATA: Record<ProductId, CatalogItem[]> = {
  PK: [
    {
      id: 'PK-Universal',
      name: 'PK 通用型 (Universal)',
      subtitle: '经典配方，全能应用',
      description: 'PK 通用型是品特最畅销的系列之一，具有优异的通用性。无论是铜版纸、白卡纸还是OPP复膜表面，都能提供出色的光泽度和附着力。',
      content: '该产品经过多年市场验证，配方稳定。在高速烫印机上表现优异，离型轻快，边缘清晰，极少出现拉丝或飞金现象。是印刷包装厂的常备库存首选。',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      tags: ['Best Seller', 'General Use'],
      features: [
        { title: '广泛适用性', desc: '兼容90%的纸张与复膜材料' },
        { title: '高光泽度', desc: '镜面效果显著，提升包装档次' },
        { title: '易操作', desc: '宽泛的温度适应范围 (95-130°C)' }
      ],
      params: [
        { label: '厚度', value: '12 micron' },
        { label: '标准宽度', value: '640mm' },
        { label: '长度', value: '120m / 3000m' },
        { label: '保质期', value: '2年 (阴凉干燥处)' }
      ],
      applications: ['烟包', '药盒', '化妆品折叠盒', '贺卡'],
      temp: { flat: '95 - 110°C', round: '130 - 160°C' }
    },
    {
      id: 'PK-Heavy',
      name: 'PK 强力型 (Heavy)',
      subtitle: '重油墨克星，抗氧化配方',
      description: '针对深色、重油墨纸张开发。传统烫金膜在未干透的油墨上容易氧化变黑，PK 强力型通过特殊的背涂层技术彻底解决了这一痛点。',
      content: '除了抗氧化，该系列还增强了胶水层的抓力，特别适合表面粗糙的艺术纸、触感纸以及布纹纸。即使在细线条表现上，也能保持极高的完整度。',
      image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200&auto=format&fit=crop',
      tags: ['Anti-Oxidation', 'Strong Adhesion'],
      features: [
        { title: '抗氧化', desc: '在UV油墨或深色胶印油墨上永不发黑' },
        { title: '超强附着', desc: '通过3M胶带拉扯测试' },
        { title: '适应粗糙表面', desc: '填充纸张纹理，烫印平整' }
      ],
      params: [
        { label: '厚度', value: '15 micron (加厚)' },
        { label: '标准宽度', value: '640mm' },
        { label: '胶水类型', value: '特种丙烯酸树脂' }
      ],
      applications: ['红酒标签', '精装书封面', '皮具Logo', '高档礼盒'],
      temp: { flat: '100 - 120°C', round: '140 - 170°C' }
    },
    {
      id: 'PK-Matte',
      name: 'PK 哑光系列 (Matte)',
      subtitle: '低调奢华，丝绸质感',
      description: '提供非镜面的哑光金属质感。表面细腻均匀，触感如丝绸般顺滑，且不易残留指纹。适合追求极简、高级感的设计风格。',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop',
      tags: ['Matte Finish'],
      features: [
        { title: '无指纹', desc: '哑光表面处理，耐脏耐磨' },
        { title: '漫反射', desc: '柔和光泽，视觉舒适' }
      ],
      applications: ['电子产品包装', '奢侈品吊牌', '名片'],
      temp: { flat: '100 - 115°C', round: '135 - 165°C' }
    },
    {
      id: 'PK-Holo',
      name: 'PK 镭射素面 (Holographic)',
      subtitle: '光影魔术，防伪首选',
      description: '采用高精度模压技术，呈现彩虹般的光圈效果。无缝镭射素面不仅提升了包装的科技感，由于其制造难度高，还具有一定的防伪属性。',
      image: 'https://images.unsplash.com/photo-1633479397988-700951a239f6?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      tags: ['Security', 'Visual Effect'],
      features: [
        { title: '高亮度', desc: '衍射效率高，色彩鲜艳' },
        { title: '无版缝', desc: '连续压印技术，无接缝痕迹' }
      ],
      applications: ['牙膏盒', '防伪标贴', '烟酒包装'],
      temp: { flat: '95 - 110°C', round: '130 - 160°C' }
    }
  ],
  PC: [
    {
      id: 'PC-Standard',
      name: 'PC 标准塑胶箔',
      subtitle: '通用塑胶方案',
      description: '适用于一般 ABS, PS, 亚克力材质。烫印字迹清晰，边缘整齐无毛刺。是电子电器面板、文具用品的理想选择。',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop',
      features: [
        { title: '通用性强', desc: '适配多种硬质塑料' },
        { title: '易剥离', desc: '高速冲压不粘模' }
      ],
      applications: ['家电面板', '圆珠笔杆', '开关插座'],
      temp: { flat: '120 - 150°C', round: '180 - 210°C' }
    },
    {
      id: 'PC-Alcohol',
      name: 'PC 耐酒精级',
      subtitle: '化妆品包材专用',
      description: '通过严格的耐酒精、耐磨擦测试。即使在接触护肤品、香水等化学成分后，烫金层依然牢固不脱落。',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=500&auto=format&fit=crop', 
      detailImage: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1200&auto=format&fit=crop',
      tags: ['Cosmetic Grade', 'Chemical Resistant'],
      features: [
        { title: '耐化学性', desc: '通过200次酒精擦拭测试' },
        { title: '高亮度', desc: '媲美直接电镀效果' }
      ],
      applications: ['口红管', '粉饼盒', '睫毛膏盖'],
      temp: { flat: '130 - 160°C', round: '190 - 230°C' }
    },
    {
      id: 'PC-Tube',
      name: 'PC 软管级 (PE/PP)',
      subtitle: '难粘材料克星',
      description: '针对 PE 软管、PP 瓶盖等表面能较低的难粘材质优化。无需火焰处理（部分材料）即可实现良好附着。',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1585250003058-2996d9961db6?q=80&w=1200&auto=format&fit=crop',
      tags: ['PE/PP Specialist'],
      features: [
        { title: '低表面能适配', desc: '专攻PP/PE材质' },
        { title: '柔韧性好', desc: '软管挤压不爆裂' }
      ],
      applications: ['洗面奶软管', '洗发水瓶盖'],
      temp: { flat: '140 - 170°C', round: '200 - 240°C' }
    }
  ],
  PLPY: [
    {
      id: 'PL-Glossy',
      name: 'PL 亮面颜料箔',
      subtitle: '色彩鲜艳，高遮盖',
      description: '色彩鲜艳，遮盖力强，如油漆般质感。',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop', 
      detailImage: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?q=80&w=1200&auto=format&fit=crop',
      features: [{title: 'Color', desc: 'Vivid'}],
      temp: { flat: '100-130', round: '140-170'}
    },
    {
      id: 'PY-Matte',
      name: 'PY 哑面颜料箔',
      subtitle: '沉稳哑光，书写性好',
      description: '色彩沉稳，书写性好，适合高档礼品盒。',
      image: 'https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1456953180671-730de08edaa7?q=80&w=1200&auto=format&fit=crop',
      features: [{title: 'Matte', desc: 'Elegant'}],
      temp: { flat: '100-130', round: '140-170'}
    },
    {
      id: 'PL-White',
      name: 'PL 亮白/珍珠白',
      subtitle: '纯净不透底',
      description: '纯净白色，不透底，适用于深色卡纸。',
      image: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?q=80&w=500&auto=format&fit=crop', 
      detailImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop',
      features: [{title: 'Opaque', desc: 'High Coverage'}],
      temp: { flat: '100-130', round: '140-170'}
    }
  ],
  DIGITAL: [
    {
      id: 'Digi-UV',
      name: 'UV 冷烫箔 (Cold Foil)',
      description: '配合冷烫胶水或 UV 印刷机使用，高速转移。',
      image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'Digi-Toner',
      name: '数码碳粉箔 (Toner Foil)',
      description: '直接覆盖于激光打印机的碳粉层，无需制版。',
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1200&auto=format&fit=crop',
    }
  ],
  GLITTER: [
    {
      id: 'G-Hex',
      name: '六角金葱粉 (Hexagon)',
      description: '标准的正六角形切割，闪烁度高。',
      image: 'https://images.unsplash.com/photo-1507643179173-442f8552932c?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1515948449767-c250d03708e9?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'G-Strip',
      name: '条状金葱粉 (Strip)',
      description: '细长条状，适合特殊的纺织或装饰效果。',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=crop',
      detailImage: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?q=80&w=1200&auto=format&fit=crop',
    }
  ]
};

export const SOLUTIONS_DATA: Record<string, SolutionData> = {
    'pkg_bags': {
        id: 'pkg_bags',
        title: '包装与手提袋专用烫金解决方案',
        series: 'PK',
        img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop',
        description: '针对纸袋折痕处易掉金粉的痛点，我们开发了高柔韧性配方。即使在反复折叠测试中，烫金层依然完整如初。',
        features: ['耐折叠', '耐磨擦', '适合大面积实地'],
        painPoints: ['折痕掉粉', '手提处磨损']
    },
    'special_paper': {
        id: 'special_paper',
        title: '印刷特种纸烫金解决方案',
        series: 'PK',
        img: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop',
        description: '特种纸通常纹理较深，普通烫金膜难以完全覆盖。PK系列强力型具有优秀的填充能力，确保在布纹、皮纹纸上也能烫出平整光亮的图案。',
        features: ['强填充性', '边缘锐利', '不透底'],
        painPoints: ['露底', '毛边', '附着力差']
    },
    'leather': {
        id: 'leather',
        title: '皮革烫金解决方案',
        series: 'PK',
        img: 'https://images.unsplash.com/photo-1550586041-fbf79acb969c?q=80&w=1000&auto=format&fit=crop',
        description: '专为 PU、PVC 人造革及真皮设计。耐老化性能优异，不仅初粘力强，且在长期使用中不会脱落或变色。',
        features: ['耐揉搓', '耐老化', '低温柔韧性'],
        painPoints: ['老化脱落', '弯曲开裂']
    },
    'plastic_surface': {
        id: 'plastic_surface',
        title: '塑胶产品表面烫金解决方案',
        series: 'PC',
        img: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1000&auto=format&fit=crop',
        description: '解决塑料表面能低、难附着的问题。PC系列在注塑件、挤出管材上表现卓越，通过百格测试与酒精测试。',
        features: ['通过百格测试', '耐指纹', '高光镜面'],
        painPoints: ['一刮就掉', '耐候性差']
    },
    'digital_cold': {
        id: 'digital_cold',
        title: '数码/丝印冷烫解决方案',
        series: 'PC',
        img: 'https://images.unsplash.com/photo-1633479397988-700951a239f6?q=80&w=1000&auto=format&fit=crop',
        description: '适配 MGI, Scodix 等数码增效设备。无需制烫金版，直接在 UV 胶水层固化转移，实现可变数据的金属光泽印制。',
        features: ['无需制版', '可变数据', '3D立体感'],
        painPoints: ['制版成本高', '交期慢']
    },
    'bottles': {
        id: 'bottles',
        title: '酒瓶/酒瓶盖烫印解决方案',
        series: 'PC',
        img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
        description: '针对酒盖深拉伸工艺优化。在顶侧面滚烫时，不仅光泽度高，且能承受后续的罐装线摩擦。',
        features: ['耐深冲', '耐摩擦', '耐水煮'],
        painPoints: ['拉伸破裂', '运输磨损']
    },
    'gift_pkg': {
        id: 'gift_pkg',
        title: '印刷礼品包装解决方案',
        series: 'PLPY',
        img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
        description: '颜料箔色泽纯正，为礼品盒提供类似丝网印刷的厚重感，但效率更高，且环保无溶剂残留。',
        features: ['色彩纯正', '环保无味', '遮盖力强'],
        painPoints: ['油墨异味', '干燥慢']
    },
    'reverse_uv': {
        id: 'reverse_uv',
        title: '逆向UV/触感膜解决方案',
        series: 'PJ',
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
        description: '逆向 UV 光油表面通常极难附着。PJ 系列通过特殊配方，能穿透部分光油层，牢牢锁住基材。',
        features: ['穿透UV层', '牢固度高', '边缘清晰'],
        painPoints: ['UV面烫不上', '起泡']
    }
};

export const SERIES_INFO: Record<string, { title: string, rollImg: string, features: string[] }> = {
    'PK': {
        title: 'PK 系列解决方案',
        rollImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', 
        features: [
            '色彩表现力极佳',
            '分切性能好离型稳定',
            '遮盖力较好',
            '多种质感亮面与哑面',
            '色差控制优秀',
            '不同底材适用广'
        ]
    },
    'PC': {
        title: 'PC 塑胶系列解决方案',
        rollImg: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop', 
        features: [
            '双组份色层耐腐蚀高亮度',
            '分切性能好离型稳定',
            '兼容UV丝印/数码',
            '适配特殊载体PVC、APET',
            '耐磨性能优秀',
            '不同底材适用广'
        ]
    },
    'PLPY': {
        title: 'PL、PY 颜料箔解决方案',
        rollImg: 'https://youke2.picui.cn/s1/2025/12/16/6940faa5f2874.png', 
        features: [
            '色彩表现力极佳',
            '分切性能好离型稳定',
            '遮盖力较好',
            '不同底材适用广',
            '多种质感亮面与哑面',
            '色差控制优秀'
        ]
    },
    'PJ': {
        title: 'PJ 纸塑通用解决方案',
        rollImg: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=600&auto=format&fit=crop',
        features: [
            '色彩表现力极佳',
            '分切性能好离型稳定',
            '遮盖力较好',
            '纸塑通用',
            '耐磨性能优秀',
            '色差控制优秀'
        ]
    }
};

export const COMPANY_ADVANTAGES = [
  {
    title: "技术领先",
    en: "BEST TECHNOLOGY",
    icon: "Cpu",
    desc: "公司拥有先进的进口涂布机、完善的QC质检中心、专业色彩管理与研发实验室及胶水实验室，确保产品色彩精准、操作便捷，充分展示技术优势。"
  },
  {
    title: "产品领先",
    en: "BEST PRODUCT",
    icon: "Crown",
    desc: "品特烫金膜专注高端烫金纸粉箔研发，适用于粗纹纸、特种纸、人造皮、PP、PE、PU、ABS、PVC、木材等多种材料。"
  },
  {
    title: "团队领先",
    en: "BEST TEAM",
    icon: "Users",
    desc: "公司拥有大量高质量的人才，其中从事研发的人员超过20%，从事销售与服务的人员超过40%。"
  },
  {
    title: "服务领先",
    en: "BEST SERVICE",
    icon: "HeartHandshake",
    desc: "充足库存与专业售后团队提供个性化定制服务，确保售前售后快速响应，满足客户的多样化需求。"
  }
];

export const CULTURE_POSTS: CulturePost[] = [
  {
    id: 'culture-1',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
    title: '2024 年度团队拓展训练',
    desc: '凝聚力量，超越自我。我们在挑战中成长，在协作中前行。#TeamBuilding #团建 #PinTeLife',
    date: '2024-05-20',
    author: 'HR Dept',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HR',
    likes: 128,
    tags: ['TeamBuilding', 'Outdoor']
  },
  {
    id: 'culture-2',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
    title: '品特10周年庆典晚宴',
    desc: '感恩有你，一路同行。十年磨一剑，我们将继续在烫金领域深耕细作。',
    date: '2023-12-15',
    author: 'Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    likes: 342,
    tags: ['Anniversary', 'Party']
  },
  {
    id: 'culture-3',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
    title: '全员质量管理培训周',
    desc: '品质是企业的生命线。通过系统的学习，我们再次强化了“匠心精神”。',
    date: '2024-03-10',
    author: 'Quality QC',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=QC',
    likes: 89,
    tags: ['Training', 'Quality']
  },
  {
    id: 'culture-4',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    title: '研发中心技术交流会',
    desc: '与行业专家深入探讨新型环保材料的应用前景。创新永不止步！',
    date: '2024-04-05',
    author: 'R&D Center',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RD',
    likes: 156,
    tags: ['Tech', 'Innovation']
  },
  {
    id: 'culture-5',
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1000&auto=format&fit=crop',
    title: '优秀员工表彰大会',
    desc: '每一份付出都值得被看见。恭喜2023年度获得“金牌工匠”称号的同事们！',
    date: '2024-01-20',
    author: 'HR Dept',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HR2',
    likes: 210,
    tags: ['Awards', 'Employee']
  },
  {
    id: 'culture-6',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1000&auto=format&fit=crop',
    title: '办公室下午茶时光',
    desc: '忙碌工作之余的甜蜜补给。劳逸结合，快乐工作！☕️🍰',
    date: '2024-06-01',
    author: 'Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    likes: 450,
    tags: ['Life', 'TeaTime']
  }
];