
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChatWidget from './components/ChatWidget';
import TechParticles from './components/TechParticles';
import QuoteRequest from './components/QuoteRequest';
import ProductShowcase from './components/ProductShowcase';
import { PinteLogo } from './components/PinteLogo';
import { Section, ProductId, ProductDetail } from './types';
import { 
  ArrowRight, 
  Menu,
  Play,
  Star,
  Search,
  Mail,
  ArrowLeft,
  Layers,
  Thermometer,
  Zap,
  Box,
  Droplet,
  CheckCircle2,
  Hexagon,
  Globe,
  Leaf,
  ShieldCheck,
  Factory,
  ChevronDown,
  Plus,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  Building2,
  Lightbulb,
  Users,
  PenTool,
  Laptop,
  Palette,
  Scissors,
  Microscope,
  Settings,
  Truck,
  Headphones,
  Phone,
  X,
  LayoutGrid,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
  Target,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

// --- HERO CAROUSEL DATA ---
const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://youke2.picui.cn/s1/2025/12/13/693d082b27fe1.png', // Abstract Fluid Gold/Dark
    title: <span>专注 <br/><span className="text-pinte-gold">"烫金表面美学"</span></span>,
    subtitle: "做高端烫金膜专家",
    description: "品特®专注于研发高端烫金材料，赋予包装卓越的视觉冲击力与品牌价值。从电化铝，颜料箔到数码冷烫，定义光影艺术。",
    buttonText: "产品中心"
  },
  {
    id: 2,
    image: "https://youke2.picui.cn/s1/2025/12/13/693d2eb71c6ee.jpg", // Industrial/Factory High Tech
    title: <span>20,000m² <br/><span className="text-blue-400">自有研发基地</span></span>,
    subtitle: "先进的涂布生产设备",
    description: "拥有超3条自动化涂布生产线与产品研发实验室，月均产能超180万米。ISO9001体系认证，确保每一卷产品的极致稳定性。",
    buttonText: "在线看厂"
  },
  {
    id: 3,
    image: "https://youke2.picui.cn/s1/2025/12/13/693d305bf17b7.jpg", // Abstract Tech/Green
    title: <span>值得信赖的 <br/><span className="text-green-400">OEM/ODM 烫金制造商</span></span>,
    subtitle: "以技术为核心，以品质为根本，以客户为中心，以信誉为资本",
    description: "代代相传的四个理念是我们服务的信念",
    buttonText: "合作咨询"
  }
];

// --- PRODUCT DATA ---
const PRODUCT_DATA: Record<ProductId, ProductDetail> = {
  PK: {
    id: 'PK',
    name: 'PK 咖啡底系列',
    subtitle: 'COFFEE GLUE SERIES',
    description: '专为粗糙表面设计，拥有极佳的遮盖率与上烫性。在重油墨纸张上也能保持光泽，不会氧化发黑。',
    heroImage: 'https://meiqia-upload-temp.meiqiausercontent.com/files/20251216/DQQZuxMUEECg/qdqqd/_1765866836300.png',
    features: [
      { title: '重油墨不氧化', desc: '特有涂层配方，防止在深色/重油墨表面氧化。', icon: Zap },
      { title: '强附着力', desc: '针对粗纹纸、压纹皮革等不平整表面优化。', icon: Layers },
      { title: '离型稳定', desc: '剥离干净，边缘锐利，适合大面积烫印。', icon: CheckCircle2 },
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
      { title: '耐酒精', desc: '烫印后可耐酒精擦拭，符合化妆品包材标准。', icon: Droplet },
      { title: '分切性好', desc: '烫印边缘整齐，无毛边，无金粉脱落。', icon: Box },
      { title: '兼容UV', desc: '支持在UV光油表面进行后续烫印。', icon: Layers },
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
      { title: '高遮盖力', desc: '轻松遮盖深色底材，不透底。', icon: Layers },
      { title: '色彩纯正', desc: '无金属光泽干扰，还原设计本色。', icon: Star },
      { title: '双重质感', desc: '提供 PL(亮面) 和 PY(哑面) 两种选择。', icon: CheckCircle2 },
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
      { title: '无需制版', desc: '数码文件直接输出，立等可取。', icon: Zap },
      { title: '立体感强', desc: '配合堆金工艺，实现浮雕般效果。', icon: Layers },
      { title: '精细度高', desc: '极细线条与网点也能完美呈现。', icon: CheckCircle2 },
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
      { title: '耐溶剂', desc: '在指甲油、胶水中不褪色、不溶化。', icon: Droplet },
      { title: '形状规则', desc: '标准正六角形，边缘整齐。', icon: Box },
      { title: '规格齐全', desc: '从 1/4" 到 1/500" 多种粒径可选。', icon: Star },
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

// --- SOLUTION DATA STRUCTURE ---
// Defining specific solution verticals as requested by the user
interface SolutionData {
    id: string;
    title: string;
    series: string; // Links to parent series (PK, PC, etc) for left sidebar info
    img: string;
    featuresOverride?: string[]; // Optional specific features
}

const SOLUTIONS_DATA: Record<string, SolutionData> = {
    'pkg_bags': {
        id: 'pkg_bags',
        title: '包装与手提袋专用烫金解决方案',
        series: 'PK',
        img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop' // Bag
    },
    'special_paper': {
        id: 'special_paper',
        title: '印刷特种纸烫金解决方案',
        series: 'PK',
        img: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop' // Book/Paper
    },
    'leather': {
        id: 'leather',
        title: '皮革烫金解决方案',
        series: 'PK',
        img: 'https://images.unsplash.com/photo-1550586041-fbf79acb969c?q=80&w=1000&auto=format&fit=crop' // Leather
    },
    'plastic_surface': {
        id: 'plastic_surface',
        title: '塑胶产品表面烫金解决方案',
        series: 'PC',
        img: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1000&auto=format&fit=crop' // Cups/Plastic
    },
    'digital_cold': {
        id: 'digital_cold',
        title: '数码/丝印冷烫解决方案',
        series: 'PC',
        img: 'https://images.unsplash.com/photo-1633479397988-700951a239f6?q=80&w=1000&auto=format&fit=crop' // Holographic
    },
    'bottles': {
        id: 'bottles',
        title: '酒瓶/酒瓶盖烫印解决方案',
        series: 'PC',
        img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop' // Wine
    },
    'gift_pkg': {
        id: 'gift_pkg',
        title: '印刷礼品包装解决方案',
        series: 'PLPY',
        img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop' // Gift Box
    },
    'reverse_uv': {
        id: 'reverse_uv',
        title: '逆向UV/触感膜解决方案',
        series: 'PJ', // Assuming PJ is for UV/Paper/Plastic hybrid
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop' // Portrait/Magazine
    }
};

// Series-level info for the left sidebar of the solution detail view
const SERIES_INFO: Record<string, { title: string, rollImg: string, features: string[] }> = {
    'PK': {
        title: 'PK 系列解决方案',
        rollImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', // Gold Roll
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
        rollImg: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop', // Silver Roll
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
        rollImg: 'https://youke2.picui.cn/s1/2025/12/16/6940faa5f2874.png', // Color Roll
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
        rollImg: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=600&auto=format&fit=crop', // Holographic Roll
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

// --- REUSABLE COMPONENTS ---

const AccordionItem: React.FC<{ title: string; isOpen: boolean; onClick: () => void }> = ({ title, isOpen, onClick }) => (
  <div className="border-b border-neutral-200 py-6 group cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-pinte-blue transition-colors">{title}</h3>
      <div className={`p-2 rounded-full border transition-all ${isOpen ? 'bg-pinte-blue border-pinte-blue text-white rotate-45' : 'border-neutral-300 text-neutral-500'}`}>
        <ArrowUpRight size={20} />
      </div>
    </div>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}>
      <p className="text-neutral-500 leading-relaxed">
        品特(PINTE)致力于提供最优质的烫金解决方案。我们拥有25年的行业经验，产品远销全球，通过多项国际环保认证。
      </p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, text, stars }: { name: string, role: string, text: string, stars: number }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={`${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-200'}`} />
      ))}
    </div>
    <p className="text-neutral-600 mb-8 leading-relaxed font-medium">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
      </div>
      <div>
        <h4 className="font-bold text-neutral-900">{name}</h4>
        <p className="text-xs text-neutral-400 uppercase tracking-wide">{role}</p>
      </div>
    </div>
  </div>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center gap-4">
        <h4 className="font-bold text-lg text-neutral-800">{q}</h4>
        <Plus size={20} className={`text-pinte-blue transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-32 mt-4' : 'max-h-0'}`}>
        <p className="text-neutral-500">{a}</p>
      </div>
    </div>
  );
};

// --- NUMBER TICKER COMPONENT (New) ---
const NumberTicker = ({ 
  targetValue, 
  label, 
  icon: Icon, 
  suffix = '',
  duration = 2000,
  textClassName = "text-3xl md:text-4xl text-neutral-900" 
}: { 
  targetValue: string, 
  label?: string, 
  icon?: any,
  suffix?: string,
  duration?: number,
  textClassName?: string
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Extract number from string (e.g. "180,000+" -> 180000)
  const finalNumber = parseInt(targetValue.replace(/,/g, '').replace(/\+/g, '')) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: easeOutExpo
      const easeValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeValue * finalNumber));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasAnimated, finalNumber, duration]);

  const formattedCount = count.toLocaleString();

  return (
    <div ref={elementRef} className="text-center group">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-blue-50 text-pinte-blue rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-pinte-blue group-hover:text-white">
            <Icon size={24} />
          </div>
        </div>
      )}
      <div className={`font-display font-bold mb-2 tracking-tight ${textClassName}`}>
        {formattedCount}{suffix}
      </div>
      {label && <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest">{label}</p>}
    </div>
  );
};

// --- MATRIX TEXT EFFECT COMPONENT (Keeping for non-numeric text) ---
const MatrixText = ({ targetText, label, icon: Icon }: { targetText: string, label: string, icon?: any }) => {
  const [displayText, setDisplayText] = useState('');
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Characters to scramble
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';

  const animate = useCallback(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            if (char === ' ' || char === '+') return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText); 
      }

      iteration += 1 / 3; 
    }, 30);
  }, [targetText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [animate, hasAnimated]);

  return (
    <div ref={elementRef} className="text-center group">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-blue-50 text-pinte-blue rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-pinte-blue group-hover:text-white">
            <Icon size={24} />
          </div>
        </div>
      )}
      <div className="font-display font-bold text-3xl md:text-4xl text-neutral-900 mb-2 h-10 tracking-tight">
        {displayText}
      </div>
      <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest">{label}</p>
    </div>
  );
};

// --- MENU DATA ---
const NAV_MENU_ITEMS = [
   { id: Section.HOME, label: '网站首页' },
   { id: Section.SOLUTIONS, label: '解决方案', hasDropdown: true },
   { id: Section.ABOUT, label: '关于品特' },
   { id: Section.PRODUCTS, label: '产品中心', hasDropdown: true },
   { id: Section.DISTRIBUTORS, label: '代理商' },
   { id: Section.CONTACT, label: '联系我们' },
];

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<ProductId | null>(null);
  const [activeSolution, setActiveSolution] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [detailTab, setDetailTab] = useState<'overview' | 'specs' | 'apps'>('overview');
  const [scrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Manual Control Timeout Ref
  // Using ReturnType<typeof setInterval> to avoid NodeJS namespace issues in browser
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- AUTO SCROLL TO TOP ON VIEW CHANGE ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProduct, activeSolution, isQuoteOpen, showCatalog]);

  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 seconds per slide
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  const changeHeroImage = (direction: 'next' | 'prev') => {
    // Reset Timer on manual interaction
    startAutoSlide(); 
    if (direction === 'next') {
      setHeroImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    } else {
      setHeroImageIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
  };

  const setHeroSlideManual = (index: number) => {
     startAutoSlide();
     setHeroImageIndex(index);
  };

  const scrollToSection = (id: Section) => {
    setActiveProduct(null);
    setActiveSolution(null); // Clear solution view
    setIsQuoteOpen(false); // Clear quote view
    setShowCatalog(false); // Clear catalog view
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // --- SOLUTION DETAIL VIEW (New Layout based on Reference) ---
  const SolutionDetailView = ({ solutionId }: { solutionId: string }) => {
    const solution = SOLUTIONS_DATA[solutionId];
    if (!solution) return null;
    
    const series = SERIES_INFO[solution.series] || SERIES_INFO['PK']; // Default fallback

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 animate-in fade-in duration-500">
           {/* Simple Header for Detail Page */}
           <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
             <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                <button 
                 onClick={() => { setActiveSolution(null); scrollToSection(Section.SOLUTIONS); }}
                 className="flex items-center gap-2 text-neutral-600 hover:text-pinte-blue font-medium transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>返回解决方案</span>
                </button>
                <div className="flex items-center gap-2">
                    <PinteLogo originalColors className="h-8 w-auto" />
                    <span className="font-bold">{solution.title}</span>
                </div>
                <div className="w-20"></div> {/* Spacer */}
             </div>
           </div>

           <div className="max-w-[1400px] mx-auto px-6 py-12">
               <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                   
                   {/* LEFT COLUMN: Series Info & Features (Sticky) */}
                   <div className="lg:w-1/3 shrink-0">
                       <div className="sticky top-28 space-y-8">
                           {/* Series Title */}
                           <div>
                               <p className="text-pinte-blue text-sm font-bold tracking-widest uppercase mb-2">Core Technology</p>
                               <h1 className="text-4xl font-display font-bold text-blue-600 leading-tight">
                                   {series.title}
                               </h1>
                           </div>

                           {/* Features List */}
                           <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                               <ul className="space-y-6">
                                   {series.features.map((feature, idx) => (
                                       <li key={idx} className="flex items-center gap-4 group">
                                           <div className="w-6 h-6 rounded-full border-2 border-neutral-200 flex items-center justify-center text-transparent group-hover:border-pinte-blue group-hover:bg-pinte-blue group-hover:text-white transition-all">
                                               <CheckCircle2 size={14} />
                                           </div>
                                           <span className="font-medium text-lg text-neutral-700 group-hover:text-neutral-900 transition-colors">
                                               {feature}
                                           </span>
                                       </li>
                                   ))}
                               </ul>
                           </div>

                           {/* Roll Image Card */}
                           <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm relative overflow-hidden group">
                               <p className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                   <Layers size={18} className="text-pinte-blue"/>
                                   <span>标准卷材展示</span>
                               </p>
                               <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                                   <img 
                                       src={series.rollImg} 
                                       alt="Foil Roll" 
                                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                   />
                               </div>
                               <div className="mt-4 text-sm text-neutral-500">
                                   <p>涵盖常用色、定制色达 <strong className="text-neutral-900">60+种</strong></p>
                                   <p className="text-xs opacity-70 mt-1">原料100% 进口，配方100%自研</p>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* RIGHT COLUMN: Specific Application Details */}
                   <div className="lg:w-2/3">
                        <div className="space-y-12">
                            {/* Main Application Image */}
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-200 group">
                                <img 
                                    src={solution.img} 
                                    alt={solution.title} 
                                    className="w-full h-[500px] lg:h-[700px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">{solution.title}</h2>
                                    <p className="text-white/80 text-lg max-w-xl leading-relaxed">
                                        针对该特定应用场景的专业解决方案，确保极佳的附着力与视觉表现。
                                        {solution.series === 'PK' && " 特别针对粗糙表面与重油墨纸张优化。"}
                                        {solution.series === 'PC' && " 完美适配塑胶表面，耐酒精测试。"}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Application Description / Grid (Mocking more content) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl border border-neutral-100">
                                    <h3 className="font-bold text-xl mb-4">应用优势</h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        采用品特独家研发的涂层技术，不仅提升了生产效率，更大幅降低了不良率。
                                        无论是大面积实地烫印，还是精细线条表现，都能游刃有余。
                                    </p>
                                </div>
                                <div className="bg-pinte-blue text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center">
                                    <h3 className="font-bold text-xl mb-2">获取详细方案书</h3>
                                    <p className="text-white/80 text-sm mb-6">Download the technical datasheet.</p>
                                    <button className="bg-white text-pinte-blue px-6 py-2.5 rounded-full font-bold hover:bg-neutral-100 transition-colors">
                                        下载 PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
        </div>
    );
  }

  // --- PRODUCT DETAIL VIEW (Existing) ---
  const ProductDetailView = ({ product }: { product: ProductDetail }) => (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 animate-in fade-in duration-500">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
           <button 
            onClick={() => setActiveProduct(null)}
            className="flex items-center gap-2 text-neutral-600 hover:text-pinte-blue font-medium transition-colors"
           >
             <ArrowLeft size={20} />
             <span>返回列表</span>
           </button>
           <h2 className="text-lg font-bold">{product.name}</h2>
           <div className="flex gap-2">
             {['overview', 'specs', 'apps'].map((tab: any) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    detailTab === tab 
                      ? 'bg-pinte-blue text-white shadow-md' 
                      : 'text-neutral-500 hover:bg-neutral-100'
                  }`}
                >
                  {tab === 'overview' ? '概览' : tab === 'specs' ? '参数' : '应用'}
                </button>
             ))}
           </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100 mb-12 flex flex-col md:flex-row gap-12 items-center">
           <div className="flex-1">
              <span className="text-pinte-blue font-bold tracking-wider text-sm uppercase mb-4 block">{product.subtitle}</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">{product.name}</h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">{product.description}</p>
              <div className="flex gap-4">
                 <button className="bg-pinte-blue text-white px-8 py-3 rounded-full font-bold hover:bg-pinte-dark transition-colors shadow-lg shadow-pinte-blue/30">
                   获取样品
                 </button>
              </div>
           </div>
           <div className="flex-1 w-full h-[400px]">
              <img src={product.heroImage} alt={product.name} className="w-full h-full object-cover rounded-3xl shadow-soft" />
           </div>
        </div>

        {detailTab === 'overview' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
              {product.features.map((feature, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-pinte-blue mb-6">
                       <feature.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-neutral-500 leading-relaxed">{feature.desc}</p>
                 </div>
              ))}
           </div>
        )}
        
        {detailTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
             <div className="bg-white p-8 rounded-[2rem] border border-neutral-100">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Layers size={20} className="text-pinte-blue"/> 技术参数</h3>
               <div className="space-y-4">
                 {product.params.map((p, i) => (
                   <div key={i} className="flex justify-between border-b border-neutral-100 pb-2 last:border-0">
                     <span className="text-neutral-500">{p.label}</span>
                     <span className="font-semibold text-neutral-900">{p.value}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div className="bg-white p-8 rounded-[2rem] border border-neutral-100">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Thermometer size={20} className="text-pinte-blue"/> 烫印温度推荐</h3>
               <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-neutral-500">平压平烫金</span>
                      <span className="font-bold text-pinte-blue">{product.temp.flat}</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pinte-blue rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-neutral-500">圆压圆烫金</span>
                      <span className="font-bold text-pinte-blue">{product.temp.round}</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pinte-blue rounded-full w-3/4"></div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        )}

        {detailTab === 'apps' && (
           <div className="animate-in slide-in-from-bottom-4">
             <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 mb-8">
                <h3 className="text-xl font-bold mb-6">适用基材</h3>
                <div className="flex flex-wrap gap-3">
                  {product.substrates.map((sub, i) => (
                    <span key={i} className="bg-neutral-50 text-neutral-700 px-4 py-2 rounded-full text-sm font-medium border border-neutral-100">
                      {sub}
                    </span>
                  ))}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-neutral-100">
                   <h3 className="text-xl font-bold mb-6">推荐应用场景</h3>
                   <ul className="space-y-3">
                      {product.applications.map((app, i) => (
                        <li key={i} className="flex items-center gap-3 text-neutral-600">
                          <CheckCircle2 size={16} className="text-green-500" />
                          {app}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="bg-pinte-blue text-white p-8 rounded-[2rem] flex flex-col justify-center items-center text-center">
                   <h3 className="text-2xl font-bold mb-4">需要技术指导？</h3>
                   <p className="mb-6 opacity-90">我们的技术团队随时为您解决烫印难题。</p>
                   <button className="bg-white text-pinte-blue px-6 py-2 rounded-full font-bold hover:bg-neutral-100 transition-colors">
                     联系工程师
                   </button>
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
  
  // Render specific view if active
  if (isQuoteOpen) {
    return <QuoteRequest onBack={() => setIsQuoteOpen(false)} />;
  }

  if (activeSolution) {
      return <SolutionDetailView solutionId={activeSolution} />;
  }

  // Moved Active Product Check before Show Catalog to ensure nested details can be viewed from catalog list
  if (activeProduct) {
    return <ProductDetailView product={PRODUCT_DATA[activeProduct]} />;
  }

  if (showCatalog) {
      return <ProductShowcase 
               onBack={() => setShowCatalog(false)} 
               products={PRODUCT_DATA} 
               onItemClick={(id) => setActiveProduct(id)}
             />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-pinte-blue selection:text-white">
      
      {/* === NAVIGATION (Floating Pill with Liquid Glass Effect) === */}
      <nav className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-[1000px]
        rounded-full px-2 py-2 flex justify-between items-center
        border
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-white/50' 
          : 'bg-white/5 backdrop-blur-[2px] shadow-soft border-white/20' 
        }
      `}>
         <div className="flex items-center gap-2 pl-6">
            <PinteLogo 
              originalColors={scrolled} 
              className={`h-8 w-auto transition-colors duration-300 ${scrolled ? '' : 'text-white'}`} 
            />
            <span className={`font-display font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`}>PINTE</span>
         </div>
         
         {/* Navigation Items with Dropdowns */}
         <div className="hidden md:flex items-center gap-1 h-full">
            {NAV_MENU_ITEMS.map((item) => (
               <div key={item.id} className="relative group h-full flex items-center px-1">
                  <button 
                      onClick={() => scrollToSection(item.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center
                        ${scrolled 
                          ? 'text-neutral-700 hover:bg-neutral-100 hover:text-pinte-blue' 
                          : 'text-white hover:bg-white/20'
                        }
                      `}
                  >
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown size={14} className="ml-1 inline-block group-hover:rotate-180 transition-transform duration-300"/>
                      )}
                  </button>
                  
                  {/* === SOLUTIONS DROPDOWN (UPDATED WITH IMAGES) === */}
                  {item.id === Section.SOLUTIONS && (
                     <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[700px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 cursor-default">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 relative">
                             {/* Arrow Tip */}
                             <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-neutral-100"></div>
                             
                             {/* Grid Content */}
                             <div className="grid grid-cols-2 gap-3">
                                {Object.values(SOLUTIONS_DATA).map((sol) => (
                                   <div 
                                      key={sol.id} 
                                      onClick={(e) => { e.stopPropagation(); setActiveSolution(sol.id); }} 
                                      className="group/sol flex items-start gap-4 p-3 hover:bg-neutral-50 rounded-xl cursor-pointer transition-colors"
                                   >
                                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-100">
                                        <img src={sol.img} alt={sol.title} className="w-full h-full object-cover group-hover/sol:scale-110 transition-transform duration-500" />
                                      </div>
                                      <div className="py-1">
                                         <div className="font-bold text-neutral-900 text-sm group-hover/sol:text-pinte-blue transition-colors line-clamp-1">{sol.title}</div>
                                         <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">{sol.series} Series</div>
                                      </div>
                                   </div>
                                ))}
                             </div>
                        </div>
                     </div>
                  )}

                  {/* === PRODUCTS DROPDOWN === */}
                  {item.id === Section.PRODUCTS && (
                     <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[550px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 cursor-default">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 relative">
                             {/* Arrow Tip */}
                             <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-neutral-100"></div>
                             
                             {/* Product Grid */}
                             <div className="grid grid-cols-2 gap-3">
                                {Object.values(PRODUCT_DATA).map((product) => (
                                   <div 
                                      key={product.id} 
                                      onClick={(e) => { e.stopPropagation(); setActiveProduct(product.id); }} 
                                      className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-xl cursor-pointer group/item transition-colors"
                                   >
                                      <img src={product.heroImage} className="w-12 h-12 rounded-lg object-cover shadow-sm group-hover/item:scale-105 transition-transform" alt={product.name} />
                                      <div className="overflow-hidden">
                                         <div className="font-bold text-neutral-900 text-sm group-hover/item:text-pinte-blue transition-colors truncate">{product.name}</div>
                                         <div className="text-xs text-neutral-400 truncate uppercase tracking-wider">{product.subtitle}</div>
                                      </div>
                                   </div>
                                ))}
                             </div>
                             {/* Footer Link */}
                             <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
                                <button onClick={() => setShowCatalog(true)} className="text-xs font-bold text-pinte-blue hover:text-pinte-dark uppercase tracking-widest flex items-center justify-center gap-1">
                                   View All Products <ArrowRight size={12}/>
                                </button>
                             </div>
                        </div>
                     </div>
                  )}

               </div>
            ))}
         </div>

         <div className="pr-2 flex items-center gap-4">
             <button 
               onClick={() => setIsQuoteOpen(true)}
               className="hidden md:flex bg-pinte-blue text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-pinte-dark transition-colors items-center gap-2 shadow-lg shadow-pinte-blue/20"
             >
                获取报价
             </button>

             {/* Mobile Menu Button */}
             <button 
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
             >
                <Menu size={24} className={scrolled ? 'text-neutral-900' : 'text-white'} />
             </button>
         </div>
      </nav>

      {/* === HERO SECTION (Carousel) === */}
      <section id={Section.HOME} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
         {/* Background Carousel */}
         <div className="absolute inset-0 z-0">
            {HERO_SLIDES.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                   src={slide.image} 
                   className="w-full h-full object-cover"
                   alt={slide.subtitle}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
            ))}
         </div>

         {/* Carousel Controls */}
         <div className="absolute inset-0 z-20 flex justify-between items-center px-4 pointer-events-none">
            <button 
              onClick={() => changeHeroImage('prev')}
              className="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={() => changeHeroImage('next')}
              className="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <ChevronRight size={32} />
            </button>
         </div>
         
         {/* Carousel Indicators */}
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroSlideManual(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === heroImageIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
         </div>

         {/* CONTENT (Dynamic based on Slide) */}
         <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 pt-20">
            <div className="max-w-2xl text-white">
                {/* Dynamic Content Rendering */}
                {HERO_SLIDES.map((slide, index) => (
                    index === heroImageIndex && (
                        <div key={slide.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                           <p className="text-white/80 font-bold tracking-widest text-sm uppercase mb-4 animate-in fade-in duration-1000 delay-100">
                             {slide.subtitle}
                           </p>
                           <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 tracking-tight animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                              {slide.title}
                           </h1>
                           <p className="text-lg text-white/90 mb-10 max-w-lg leading-relaxed font-light animate-in fade-in duration-700 delay-300">
                              {slide.description}
                           </p>
                           <button 
                              onClick={() => scrollToSection(Section.PRODUCTS)}
                              className="bg-white text-neutral-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-3 w-fit group animate-in fade-in duration-700 delay-500"
                           >
                              {slide.buttonText} 
                              <div className="w-8 h-8 rounded-full bg-pinte-blue text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                 <ArrowRight size={16}/>
                              </div>
                           </button>
                        </div>
                    )
                ))}
            </div>
         </div>

         {/* Floating Project Card (Bottom Right) with VIDEO MODAL */}
         <div className="absolute bottom-12 right-6 md:right-12 z-20 hidden md:block animate-in slide-in-from-right-8 duration-1000">
            <div 
               onClick={() => setShowVideoModal(true)}
               className="bg-white/10 backdrop-blur-md p-4 rounded-[2rem] border border-white/20 w-[300px] group cursor-pointer hover:bg-white/20 transition-all shadow-lg"
            >
               <div className="h-32 rounded-3xl overflow-hidden mb-4 relative">
                  <video 
                     src="https://file.icve.com.cn/file_doc/qdqqd/4691765858373657.mov" 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                     autoPlay 
                     muted 
                     loop 
                     playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                     <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40">
                        <Play size={16} fill="currentColor" />
                     </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                     <ArrowUpRight size={14} className="text-neutral-900"/>
                  </div>
               </div>
               <div className="flex justify-between items-end px-2">
                  <div>
                     <p className="text-white/60 text-xs uppercase tracking-wider mb-1">在线看厂</p>
                     <p className="text-white font-bold text-lg">高端烫金膜产线</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                     <ArrowRight size={16}/>
                  </div>
               </div>
            </div>
         </div>

         {/* VIDEO MODAL */}
         {showVideoModal && (
            <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
              <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                 <button 
                    onClick={() => setShowVideoModal(false)}
                    className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
                 >
                    <X size={24} />
                 </button>
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src="https://www.youtube.com/embed/zhcXEjjlAsg?autoplay=1" 
                   title="YouTube video player" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   allowFullScreen
                   className="w-full h-full"
                 ></iframe>
              </div>
              {/* Click outside to close */}
              <div className="absolute inset-0 -z-10 cursor-pointer" onClick={() => setShowVideoModal(false)}></div>
            </div>
         )}
      </section>

      {/* === COMPANY STRENGTH (MATRIX EFFECT + NUMBER TICKER) === */}
      <section className="py-16 bg-white border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            <NumberTicker targetValue="1999" label="公司成立于" icon={Building2} />
            <NumberTicker targetValue="180,000+" suffix="+" label="月均出货(米)" icon={TrendingUp} />
            <NumberTicker targetValue="20,000+" suffix="+" label="厂房面积(㎡)" icon={Factory} />
            <NumberTicker targetValue="10+" suffix="+" label="专利技术" icon={Lightbulb} />
            <MatrixText targetText="ISO/SGS/BSCI" label="多项国际认证" icon={Award} />
          </div>
        </div>
      </section>

      {/* === SERVICE SOLUTIONS (NEW SECTION) === */}
      <section id={Section.SOLUTIONS} className="py-24 px-6 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4 animate-in slide-in-from-bottom-4 duration-700">
            担心定制过程太难？
          </h2>
          <p className="text-neutral-500 text-lg mb-16 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            品特®️将为不同类型的客户开发服务
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Card 1: Distributor */}
            <div className="flex flex-col items-center group animate-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="w-24 h-24 bg-pinte-blue rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-200 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                 <Users size={40} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">经销商/批发商</h3>
              <p className="text-neutral-500 leading-relaxed max-w-xs">
                1V1援助服务，免费的产品培训，专业的市场咨询，稳定的供货能力。
              </p>
            </div>

            {/* Card 2: Designer */}
            <div className="flex flex-col items-center group animate-in slide-in-from-bottom-8 duration-700 delay-300">
              <div className="w-24 h-24 bg-pinte-blue rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-200 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                 <PenTool size={40} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">设计师/工作室</h3>
              <p className="text-neutral-500 leading-relaxed max-w-xs">
                根据设计要求，技术团队将在36小时内提供匹配的产品方案，参考各种成功案例，并直接与设计师沟通。
              </p>
            </div>

            {/* Card 3: E-commerce */}
            <div className="flex flex-col items-center group animate-in slide-in-from-bottom-8 duration-700 delay-400">
              <div className="w-24 h-24 bg-pinte-blue rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-200 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                 <Laptop size={40} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">个人电子商务</h3>
              <p className="text-neutral-500 leading-relaxed max-w-xs">
                全天在线客服，发货时间7天内，物流运输清晰透明。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === COMPANY PROFILE (PARALLAX LAYOUT) === */}
      <section id={Section.ABOUT} className="relative bg-neutral-50 pb-24">
        
        {/* 1. Full Width Image (The background for the parallax feel) */}
        {/* We use sticky top-0 and z-0 to make it stay while content scrolls over it, 
            but we need a container height constraint. 
            Simpler approach: Standard parallax with bg-fixed or just a large image with negative margin content.
        */}
        <div className="w-full h-[80vh] min-h-[600px] relative z-0">
           <div className="absolute inset-0 overflow-hidden">
             <img 
                src="https://28882593.s21i.faiusr.com/2/ABUIABACGAAgoJGfkgYorsS7tAUwtAM4jQQ.jpg.webp" 
                className="w-full h-full object-cover"
                alt="Company Panorama"
                style={{ objectPosition: 'center' }} 
             />
             <div className="absolute inset-0 bg-black/20"></div>
           </div>
           
           {/* Factory Label Badge inside Image */}
           <div className="absolute top-16 left-8 md:left-24 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg z-10">
              <p className="font-bold text-neutral-900 flex items-center gap-2">
                <Factory size={18} className="text-pinte-blue"/>
                东莞市佰仕特工艺制品有限公司 · 生产基地
              </p>
           </div>
        </div>

        {/* 2. Floating White Card (Overlapping) */}
        <div className="relative z-10 -mt-40 px-6">
           <div className="max-w-[1200px] mx-auto bg-white rounded-[3rem] shadow-2xl shadow-neutral-900/10 p-12 md:p-20 flex flex-col lg:flex-row gap-16 lg:items-start">
              
              {/* Left Side: Slogan */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-pinte-blue font-bold tracking-widest text-sm uppercase mb-4 block">Company Profile</span>
                  <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-[1.2] mb-6">
                    集<span className="text-pinte-blue">研发、生产、销售</span>于一体的<br/>
                    高新技术企业
                  </h2>
                  <p className="text-xl text-neutral-500 font-medium mb-8">
                    An high-tech enterprise integrating <span className="text-pinte-blue">R&D, production and sales</span>
                  </p>
                  
                  {/* New Vision Text */}
                  <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 mb-8">
                     <p className="text-neutral-700 leading-relaxed font-medium">
                        品特的愿景是成为全球烫金膜领域的卓越引领者。使命是将高端，高质，易用的烫金膜带给每一位追求品质与创新的行业伙伴，让他们的产品焕发独特光彩。
                     </p>
                  </div>

                  {/* Key Point Icons */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     {[
                        {icon: Target, title: "卓越引领", desc: "Vision"},
                        {icon: ShieldCheck, title: "高端品质", desc: "High Quality"},
                        {icon: Sparkles, title: "创新易用", desc: "Innovation"},
                        {icon: HeartHandshake, title: "合作共赢", desc: "Partnership"}
                     ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-blue-50 text-pinte-blue flex items-center justify-center">
                              <item.icon size={18}/>
                           </div>
                           <div>
                              <p className="font-bold text-neutral-900 text-sm">{item.title}</p>
                              <p className="text-neutral-400 text-xs uppercase tracking-wider">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>


                </div>
              </div>

              {/* Right Side: Description & Stats */}
              <div className="lg:w-1/2 lg:pl-12 border-l border-neutral-100">
                <div className="flex items-baseline gap-3 mb-8">
                    {/* Number Ticker for 25+ */}
                    <NumberTicker 
                       targetValue="25+" 
                       suffix="+" 
                       duration={2500}
                       textClassName="text-7xl lg:text-8xl text-pinte-blue leading-none"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-neutral-900">YEARS</span>
                        <span className="text-neutral-400 text-sm">研发生产经验</span>
                    </div>
                </div>
                <div className="space-y-6 text-neutral-600 leading-relaxed text-lg text-justify">
                   <p>
                      东莞佰仕特工艺制品有限公司烫金事业部在2020年这个充满机遇与挑战的年份应运而生。旗下的“品特”品牌，犹如一颗闪耀的明珠，专注于高端烫金膜的生产，其产品涵盖了咖啡底、PC底以及颜料箔等多种类型。
                   </p>
                   <p>
                      自 1998 年成立以来，我们以金葱粉为起点深耕葱粉领域，如今已成为行业内品类最全、技术领先的标杆企业。200000㎡自有车间与全自动化生产线，确保稳定供应与卓越质感。
                   </p>
                   <p>
                      依托 “全、专、快、精、优” 核心能力：多色多尺寸定制适配包装、服装、车辆等全领域，精准温控与专利技术保障色彩稳定、离型可靠，高效响应与全流程品控让合作更省心。从金葱粉的绚烂点缀到烫金膜的高端质感，佰仕特始终以 “彼此成就、合作共赢” 为理念，用专业工艺为您的产品赋能。
                   </p>
                </div>
              </div>

           </div>
        </div>
      </section>


      {/* === DISCOVER EXCELLENCE (Vertical Grid) === */}
      <section id={Section.PRODUCTS} className="py-24 px-6 bg-white">
         <div className="max-w-[1200px] mx-auto">
             {/* Split Header */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
                <h2 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 leading-[1.1]">
                   发现<br/>
                   梦中的<br/>
                   包装效果<br/>
                </h2>
                <div className="lg:pl-12 flex flex-col items-start gap-8">
                   <p className="text-neutral-500 text-lg leading-relaxed">
                      无论是粗糙纸张还是光滑塑胶，抑或是酒瓶盖，UV，特种纸，甚至汽车用品，我们都有完美的解决方案。
                      解锁色彩新范式，让烫印毫不费力地呈现。
                   </p>
                   <button 
                      onClick={() => setShowCatalog(true)}
                      className="group flex items-center gap-2 text-pinte-blue font-bold text-sm tracking-widest uppercase border-b-2 border-pinte-blue/20 pb-1 hover:border-pinte-blue transition-all"
                   >
                     查看产品目录
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
 
             {/* Product Cards Grid - UPDATED STYLE */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['PK', 'PC', 'PLPY'] as ProductId[]).map((id) => {
                    const product = PRODUCT_DATA[id];
                    // Map generic icons
                    const Icon = id === 'PK' ? Layers : id === 'PC' ? Box : Palette;
                    
                    return (
                      <div 
                         key={id}
                         onClick={() => setActiveProduct(id)} 
                         className="group cursor-pointer relative h-[500px] overflow-hidden rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500"
                      >
                         {/* Background Image */}
                         <div className="absolute inset-0">
                           <img 
                              src={product.heroImage} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              alt={product.name}
                           />
                           {/* Gradient Overlay for Text Readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-60 group-hover:opacity-75 transition-opacity duration-500"></div>
                         </div>

                         {/* Content Container */}
                         <div className="relative z-10 h-full flex flex-col justify-between p-8">
                            {/* Top Row: Icon & Badge */}
                            <div className="flex justify-between items-start">
                               <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm group-hover:bg-white group-hover:text-neutral-900 transition-colors duration-300">
                                  <Icon size={24} />
                               </div>
                               <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-xs font-bold text-white tracking-widest uppercase">
                                  {id} SERIES
                               </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                               <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">
                                  {product.subtitle}
                               </p>
                               <h3 className="text-4xl font-display font-bold text-white mb-4 leading-none">
                                  {product.name.split(' ')[0]} 
                                  <span className="text-xl opacity-60 font-normal ml-2">Series</span>
                               </h3>
                               
                               {/* Reveal Content on Hover */}
                               <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                 <div className="overflow-hidden">
                                   <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">
                                      {product.description}
                                   </p>
                                   <div className="flex items-center gap-3 text-white font-bold text-sm group/btn">
                                      <span>View Details</span>
                                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-colors">
                                        <ArrowRight size={14} />
                                      </div>
                                   </div>
                                 </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    );
                })}
             </div>
          </div>
       </section>

      {/* === NEW CORE SERVICES SECTION (Blue) === */}
      <section className="bg-[#1e40af] text-white py-24 px-6 relative overflow-hidden">
        {/* Tech Particles Effect */}
        <TechParticles />

        {/* Decorative Background Elements (Still kept for layered depth) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                 <span className="text-orange-400 font-bold tracking-widest text-sm uppercase">Our Services</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                Comprehensive <br/> Service Solutions
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                 我们不仅提供优质的烫金材料，更提供全方位的技术支持与加工服务。
              </p>
            </div>
            <div className="hidden lg:block pb-2">
               <p className="font-bold text-lg opacity-90">主要服务内容</p>
               <p className="text-white/50 text-sm">Main Service Capabilities</p>
            </div>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
             {[
               { icon: Palette, title: '色彩定制', en: 'Color Matching', desc: 'Pantone 专色调配，99% 还原度' },
               { icon: Scissors, title: '精密分切', en: 'Precision Slitting', desc: '最小分切宽度 6mm，切面平整' },
               { icon: Microscope, title: '实验室检测', en: 'Lab Testing', desc: '耐磨、耐酒精、拉力等多项测试' },
               { icon: Truck, title: '全球物流', en: 'Global Shipping', desc: '海陆空多式联运，快速通关' },
               { icon: Headphones, title: '技术支持', en: 'Technical Support', desc: '7x24小时 工程师在线解答' },
               { icon: Settings, title: '设备调试', en: 'Machine Setup', desc: '协助客户优化烫金机参数设置' },
             ].map((item, i) => (
               <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight className="text-white/60" size={20} />
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 bg-white/5">
                     <item.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-4">{item.en}</p>
                  <p className="text-white/70 leading-relaxed text-sm">{item.desc}</p>
               </div>
             ))}
          </div>

          {/* Bottom Processing Service Banner */}
          <div className="bg-[#2563eb] rounded-2xl p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-[#3b82f6] transition-colors cursor-pointer group relative overflow-hidden">
             {/* Gradient glow for the banner */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
             
             <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-white/10 rounded-xl">
                   <Factory size={40} />
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-1">OEM/ODM 代工服务</h3>
                   <p className="text-white/70 text-sm">Processing Service</p>
                </div>
             </div>
             <div className="flex items-center gap-4 relative z-10">
                <span className="text-white/80 group-hover:text-white transition-colors">了解更多代工详情</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                   <ArrowRight size={20} />
                </div>
             </div>
          </div>

          {/* White Card: Real-time Data */}
          <div className="bg-white text-neutral-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/20 relative z-10">
             <div className="flex items-center justify-between mb-10 border-b border-neutral-100 pb-6">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                   <h3 className="font-display font-bold text-2xl">企业实时数据看板</h3>
                </div>
                <span className="text-neutral-400 text-sm hidden md:block">Data updated: {new Date().toLocaleDateString()}</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { 
                     img: "https://images.unsplash.com/photo-1565514020176-db79339a6a5d?q=80&w=400&auto=format&fit=crop", 
                     label: "日均涂布产量", 
                     value: "60,000", 
                     unit: "米/Day" 
                  },
                  { 
                     img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop", 
                     label: "研发投入占比", 
                     value: "15", 
                     unit: "% YoY" 
                  },
                  { 
                     img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400&auto=format&fit=crop", 
                     label: "库存周转效率", 
                     value: "98.5", 
                     unit: "% Rate" 
                  }
                ].map((item, i) => (
                   <div key={i} className="flex gap-6 items-start">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                         <img src={item.img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={item.label} />
                      </div>
                      <div>
                         <p className="text-neutral-500 text-sm font-medium mb-1">{item.label}</p>
                         <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold font-display text-neutral-900">{item.value}</span>
                            <span className="text-xs text-neutral-400 font-medium">{item.unit}</span>
                         </div>
                         <div className="h-1 bg-neutral-100 rounded-full mt-3 overflow-hidden w-full">
                            <div className="h-full bg-pinte-blue w-2/3 rounded-full"></div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </section>
 
       {/* === ACCORDION SECTION (Switch to PINTE) === */}
       <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
             <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-12 leading-tight">
                   Switch to PINTE for a <br/>
                   greener future.
                </h2>
                <div className="space-y-2">
                   {[
                      'Company Mission Statement',
                      'Sustainability Commitment',
                      'Our Achievements',
                      'Global Partners'
                   ].map((title, i) => (
                      <AccordionItem 
                         key={i} 
                         title={title} 
                         isOpen={openAccordion === i} 
                         onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      />
                   ))}
                </div>
             </div>
             <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden sticky top-32">
                   <img 
                      src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop" 
                      className="w-full h-full object-cover" 
                      alt="Green Future"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-10 text-white">
                      <h3 className="text-3xl font-bold mb-2">Empower your packaging</h3>
                      <p className="opacity-80">With our sustainable foil solutions.</p>
                      <button className="mt-6 bg-white text-neutral-900 px-6 py-2 rounded-full text-sm font-bold w-fit hover:bg-blue-50 transition-colors">
                         Explore More
                      </button>
                   </div>
                </div>
             </div>
          </div>
       </section>
 
       {/* === TESTIMONIALS (Grid) === */}
       <section className="py-24 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
              <div className="mb-16">
                <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">What our customers are saying</h2>
                <p className="text-neutral-500 max-w-xl">我们致力于为全球客户提供最优质的烫金膜产品，听听他们怎么说。</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard 
                   name="James Oliver" 
                   role="Packaging Designer" 
                   text="PINTE Energy Solar is the most professional company I've ever worked with. The foil quality is consistent and the service is outstanding."
                   stars={5}
                />
                <TestimonialCard 
                   name="Jenny Wilson" 
                   role="Procurement Manager" 
                   text="An absolute treat to work with. Top notch craftsmanship and professionalism. I'd have PINTE supply all our projects again."
                   stars={5}
                />
                <TestimonialCard 
                   name="Liam Nelson" 
                   role="Brand Director" 
                   text="Very easy. The metallic effects are stunning and the cold foil application was seamless. Highly recommended."
                   stars={4}
                />
              </div>
          </div>
       </section>
 
       {/* === FAQ SECTION (Minimal) === */}
       <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
             <div>
                <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">FAQ</h2>
                <p className="text-neutral-500 mb-8">
                   Still have a question? Contact us via chat or email.
                </p>
                <button className="bg-pinte-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pinte-dark transition-colors">
                   Contact Support
                </button>
             </div>
             <div className="lg:col-span-2 space-y-4">
                <FAQItem q="How long does it take to ship orders?" a="常规产品现货当天发货，定制产品通常需要 3-5 个工作日。" />
                <FAQItem q="Do you provide free samples?" a="是的，我们提供免费的 A4 样张或 15m 小卷供测试，您只需支付运费。" />
                <FAQItem q="What certificates do you have?" a="我们通过了 ISO9001, RoHS, EN71-3, ASTM-F963 等多项国际认证。" />
                <FAQItem q="Can you customize colors?" a="可以，我们支持 Pantone 调色，起订量通常为 5000m。" />
             </div>
          </div>
       </section>
 
       {/* === FOOTER (MEGA FOOTER) === */}
      <footer id={Section.CONTACT} className="bg-white pt-24 pb-12 px-6 border-t border-neutral-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand & Copyright */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <PinteLogo originalColors className="h-8 w-auto" />
                 <span className="font-display font-bold text-2xl tracking-tight">PINTE</span>
              </div>
              <p className="text-neutral-500 leading-relaxed mb-6">
                 Mastery in Surface Aesthetics. <br/>
                 Providing premium hot stamping foil solutions since 1999.
              </p>
              <div className="flex gap-4">
                 {/* Social Icons Placeholders */}
                 <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-pinte-blue hover:text-white transition-colors cursor-pointer"><Globe size={18}/></div>
                 <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-pinte-blue hover:text-white transition-colors cursor-pointer"><Mail size={18}/></div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-neutral-900">Quick Links</h4>
              <ul className="space-y-4 text-neutral-600 font-medium">
                 <li><button onClick={() => scrollToSection(Section.HOME)} className="hover:text-pinte-blue transition-colors">Home</button></li>
                 <li><button onClick={() => scrollToSection(Section.PRODUCTS)} className="hover:text-pinte-blue transition-colors">Products</button></li>
                 <li><button onClick={() => scrollToSection(Section.SOLUTIONS)} className="hover:text-pinte-blue transition-colors">Solutions</button></li>
                 <li><button onClick={() => scrollToSection(Section.ABOUT)} className="hover:text-pinte-blue transition-colors">About Us</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-neutral-900">Contact Us</h4>
              <ul className="space-y-4 text-neutral-600">
                 <li className="flex items-start gap-3">
                    <Building2 className="shrink-0 mt-1 text-pinte-blue" size={18}/>
                    <span>No. 123, Industrial Road, Chang'an Town, Dongguan City, Guangdong, China</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <Mail className="shrink-0 text-pinte-blue" size={18}/>
                    <a href="mailto:sales@bestglitter.com" className="hover:text-pinte-blue">sales@bestglitter.com</a>
                 </li>
                 <li className="flex items-center gap-3">
                    <Phone className="shrink-0 text-pinte-blue" size={18}/>
                    <a href="tel:+8613922543175" className="hover:text-pinte-blue">+86-13922543175</a>
                 </li>
              </ul>
            </div>

            {/* WeChat QR Code */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-neutral-900">WeChat Official</h4>
              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm inline-block">
                 {/* Generating a dummy QR code */}
                 <img 
                   src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://www.pinte.cn&color=1e40af" 
                   alt="WeChat QR Code" 
                   className="w-32 h-32 mb-3"
                 />
                 <p className="text-center text-xs text-neutral-400 font-medium uppercase tracking-wider">Scan to Follow</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-neutral-400 text-sm">© 2024 Dongguan Best Craftwork Products Co., Ltd. All rights reserved.</p>
             <div className="flex gap-8 text-sm font-medium text-neutral-500">
                <a href="#" className="hover:text-pinte-blue transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-pinte-blue transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-pinte-blue transition-colors">Sitemap</a>
             </div>
          </div>
        </div>
      </footer>
       
       <ChatWidget />
     </div>
   );
 };
 
 export default App;
