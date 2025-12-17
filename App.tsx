
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChatWidget from './components/ChatWidget';
import TechParticles from './components/TechParticles';
import QuoteRequest from './components/QuoteRequest';
import ProductShowcase from './components/ProductShowcase';
import ItemDetailView from './components/ItemDetailView'; // New component import
import CompanyCulture from './components/CompanyCulture'; // New Component
import { DebugPanel } from './components/DebugPanel'; // New Debug Panel
import { PinteLogo } from './components/PinteLogo';
import { Section, ProductId, ProductDetail, CatalogItem, SolutionData } from './types';
import * as Content from './data/content'; // Import all content as a single object for state management

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
  HeartHandshake,
  Cpu,
  Crown,
  Trophy // Added Trophy
} from 'lucide-react';

// === ICON MAP FOR DYNAMIC CONTENT ===
const ICON_MAP: Record<string, any> = {
  Layers, Zap, CheckCircle2, Droplet, Box, Star, Cpu, Crown, Users, HeartHandshake,
  Building2, TrendingUp, Factory, Lightbulb, Award, Palette, Scissors, Microscope, Truck, Headphones, Settings,
  PenTool, Laptop, MapPin, Globe, Mail, Phone
};

// --- REUSABLE COMPONENTS ---

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
  iconName, 
  suffix = '',
  duration = 2000,
  textClassName = "text-3xl md:text-4xl text-neutral-900" 
}: { 
  targetValue: string, 
  label?: string, 
  iconName?: string,
  suffix?: string,
  duration?: number,
  textClassName?: string
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const Icon = iconName ? ICON_MAP[iconName] : null;

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
  // === CONTENT STATE MANAGEMENT FOR DEBUG CMS ===
  const [content, setContent] = useState(Content);

  const [activeProduct, setActiveProduct] = useState<ProductId | null>(null);
  const [activeCatalogItemId, setActiveCatalogItemId] = useState<string | null>(null); // State for specific item
  const [activeSolution, setActiveSolution] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showCulture, setShowCulture] = useState(false); // New State for Company Culture Page
  const [detailTab, setDetailTab] = useState<'overview' | 'specs' | 'apps'>('overview');
  const [scrolled, setScrolled] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Manual Control Timeout Ref
  // Using ReturnType<typeof setInterval> to avoid NodeJS namespace issues in browser
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // PURCHASE NOTICES DATA
  const NOTICES = [
    { id: '01', title: '尺寸误差说明', text: '由于测量方法的不同可能导致 1-2cm 的误差，属正常公差范围。' },
    { id: '02', title: '关于色差', text: '我们已将色差调至接近实物，但不同显示器下显示的颜色依然会有所差异，请以实物为准。' },
    { id: '03', title: '烫印工艺建议', text: '为获取最佳烫印质量，需依据被烫物特性及建议条件，对温度、速度及压力进行调整。建议烫印前校正烫印版（如添加垫片、清洗版面）。' },
    { id: '04', title: '标准卷储存', text: '标准支建议以垂直方式摆放；若采用水平方式，请使用原箱原封装摆放，避免受压变形。' },
    { id: '05', title: '大卷膜储存', text: '大卷膜建议以水平悬挂的方式摆放，并且要避免直接接触地面或其他物品，防止受潮或损伤。' },
    { id: '06', title: '氧化/起斑规避', text: '烫金后出现氧化或起斑问题，建议尽量规避在重油墨和珠光纸上直接烫金，否则请在纸张的表面做好保护处理。' },
    { id: '07', title: '表面干燥', text: '在烫印之前，务必确保油墨或其他表面处理工艺（如UV、光油）已完全干燥/固化。' },
    { id: '08', title: '样品申请须知', text: '索要样品前，请向客服沟通烫印底材、前后工艺、底材颜色及烫印面积。我司将提供专业建议。大货采购前请务必确认烫印效果。' },
    { id: '09', title: '分切服务说明', text: '有分切需求请提前告知，我司原则上不提供分切服务（除特定定制订单外）。' },
  ];

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
  }, [activeProduct, activeCatalogItemId, activeSolution, isQuoteOpen, showCatalog, showCulture]);

  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % content.HERO_SLIDES.length);
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
      setHeroImageIndex((prev) => (prev + 1) % content.HERO_SLIDES.length);
    } else {
      setHeroImageIndex((prev) => (prev - 1 + content.HERO_SLIDES.length) % content.HERO_SLIDES.length);
    }
  };

  const setHeroSlideManual = (index: number) => {
     startAutoSlide();
     setHeroImageIndex(index);
  };

  const scrollToSection = (id: Section) => {
    setActiveProduct(null);
    setActiveCatalogItemId(null);
    setActiveSolution(null); // Clear solution view
    setIsQuoteOpen(false); // Clear quote view
    setShowCatalog(false); // Clear catalog view
    setShowCulture(false); // Clear culture view
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // --- SOLUTION DETAIL VIEW (New Layout based on Reference) ---
  const SolutionDetailView = ({ solutionId }: { solutionId: string }) => {
    const solution = content.SOLUTIONS_DATA[solutionId];
    if (!solution) return null;
    
    const series = content.SERIES_INFO[solution.series] || content.SERIES_INFO['PK']; // Default fallback

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
                                        {solution.description /* DATA DRIVEN TEXT */}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Application Description / Grid (Mocking more content) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl border border-neutral-100">
                                    <h3 className="font-bold text-xl mb-4">应用优势</h3>
                                    <p className="text-neutral-600 leading-relaxed mb-4">
                                        采用品特独家研发的涂层技术，不仅提升了生产效率，更大幅降低了不良率。
                                        无论是大面积实地烫印，还是精细线条表现，都能游刃有余。
                                    </p>
                                    {/* Data Driven Features for Solution */}
                                    {solution.features && (
                                        <ul className="space-y-2">
                                            {solution.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
                                                    <CheckCircle2 size={16} className="text-pinte-blue"/> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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

  // --- PRODUCT DETAIL VIEW (Context: For generic category view if needed) ---
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
              {product.features.map((feature, i) => {
                 const IconComponent = ICON_MAP[feature.icon] || Star;
                 return (
                   <div key={i} className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-pinte-blue mb-6">
                         <IconComponent size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-neutral-500 leading-relaxed">{feature.desc}</p>
                   </div>
                 );
              })}
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
  
  // === RENDER COMPANY CULTURE PAGE ===
  if (showCulture) {
    return <CompanyCulture onBack={() => setShowCulture(false)} posts={content.CULTURE_POSTS} />;
  }

  // === NEW: RENDER SPECIFIC CATALOG ITEM VIEW ===
  if (activeCatalogItemId) {
      // Find the item across all categories
      let selectedItem: CatalogItem | undefined;
      for (const catId of Object.keys(content.CATALOG_DATA)) {
          const found = content.CATALOG_DATA[catId as ProductId].find(i => i.id === activeCatalogItemId);
          if (found) {
              selectedItem = found;
              break;
          }
      }

      if (selectedItem) {
          return <ItemDetailView item={selectedItem} onBack={() => setActiveCatalogItemId(null)} />;
      }
  }

  // Fallback / Legacy behavior (if category is selected but not specific item)
  if (activeProduct) {
    return <ProductDetailView product={content.PRODUCT_DATA[activeProduct]} />;
  }

  if (showCatalog) {
      return <ProductShowcase 
               onBack={() => setShowCatalog(false)} 
               products={content.PRODUCT_DATA} 
               catalog={content.CATALOG_DATA}
               onItemClick={(id) => setActiveCatalogItemId(id)} // Pass specific item ID
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
                                {Object.values(content.SOLUTIONS_DATA).map((sol) => (
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
                                {Object.values(content.PRODUCT_DATA).map((product) => (
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

      {/* ... (Rest of the APP components - Hero, etc - kept same, only changing Solution section render) ... */}

      {/* === HERO SECTION (Carousel) === */}
      <section id={Section.HOME} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
         {/* Background Carousel */}
         <div className="absolute inset-0 z-0">
            {content.HERO_SLIDES.map((slide, index) => (
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
            {content.HERO_SLIDES.map((_, index) => (
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
                {content.HERO_SLIDES.map((slide, index) => (
                    index === heroImageIndex && (
                        <div key={slide.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                           <p className="text-white/80 font-bold tracking-widest text-sm uppercase mb-4 animate-in fade-in duration-1000 delay-100">
                             {slide.subtitle}
                           </p>
                           {/* Using dangerouslySetInnerHTML to support bold/span tags from CMS */}
                           <h1 
                             className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 tracking-tight animate-in fade-in slide-in-from-left-4 duration-700 delay-200"
                             dangerouslySetInnerHTML={{ __html: slide.title }}
                           />
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
                 <video 
                   src="https://file.icve.com.cn/file_doc/qdqqd/4691765858373657.mov" 
                   className="w-full h-full object-contain" 
                   controls 
                   autoPlay
                 />
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
            {content.COMPANY_STATS.map((stat, i) => (
                <NumberTicker 
                   key={i}
                   targetValue={stat.targetValue} 
                   suffix={stat.suffix}
                   label={stat.label} 
                   iconName={stat.icon} 
                />
            ))}
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
                src="https://youke2.picui.cn/s1/2025/12/16/6941049ede1f3.jpg" 
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
                    集<span className="text-pinte-blue">研发、生产、销售</span><br/>于一体的<br/>
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

                  {/* 4 Leading Advantages Grid (Replaced Key Points) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {content.COMPANY_ADVANTAGES.map((item, i) => {
                       const Icon = ICON_MAP[item.icon] || Cpu;
                       return (
                       <div 
                          key={i} 
                          className="group p-4 rounded-2xl bg-white border border-neutral-100 hover:border-pinte-blue/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                       >
                          <div className="w-12 h-12 bg-pinte-blue text-white rounded-xl flex items-center justify-center mb-4 shadow-md shadow-pinte-blue/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                             <Icon size={24} />
                          </div>
                          <h4 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-pinte-blue transition-colors">{item.title}</h4>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">{item.en}</p>
                          <p className="text-xs text-neutral-500 leading-relaxed text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                             {item.desc}
                          </p>
                       </div>
                    )})}
                  </div>

                  
                </div>
              </div>

              {/* Right Side: Description & Stats */}
              <div className="lg:w-1/2 lg:pl-12 border-l border-neutral-100">
                <div className="flex items-baseline gap-3 mb-8">
                    {/* Number Ticker for 25+ */}
                    <NumberTicker 
                       targetValue="28+" 
                       suffix="+" 
                       duration={2500}
                       textClassName="text-7xl lg:text-8xl text-pinte-blue leading-none"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-neutral-900">YEARS</span>
                        <span className="text-neutral-400 text-sm">研发生产经验</span>
                    </div>
                </div>
                <div className="text-s text-neutral-500 leading-relaxed text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                   <p>
                      东莞佰仕特工艺制品有限公司烫金事业部在2020年这个充满机遇与挑战的年份应运而生。旗下的“品特”品牌，犹如一颗闪耀的明珠，专注于高端烫金膜的生产，其产品涵盖了咖啡底、PC底以及颜料箔等多种类型。
                   </p>
                   <br/>
                   <p>
                      自 1998 年成立以来，我们以金葱粉为起点深耕葱粉领域，如今已成为行业内品类最全、技术领先的标杆企业。200000㎡自有车间与全自动化生产线，确保稳定供应与卓越质感。
                   </p>
                   <br/>
                   <p>
                   佰仕特秉持彼此成就、合作共赢的核心理念，在经营方式上精益求精。“做好”产品，意味着从源头把控质量，选用优质原材料，精心打磨每一个生产环节；“做全”产品种类，以适应不同客户在各个领域的多样化需求；“做专”技术研发，不断投入精力和资源，提升工艺水平，让产品更具竞争力；“做快”响应速度，无论是客户的咨询还是订单处理，都以高效的方式进行，确保客户的时间成本最小化；“做精”产品品质，对每一个细节都严格要求，追求极致的完美；“做优”服务质量，提供全方位的售前售后服务，让客户感受到无微不至的关怀。通过这一系列的努力，佰仕特烫金事业部立志为客户创造更多价值，在行业中稳健发展，与客户携手迈向更加辉煌的未来。
                   </p>
                   <br/>
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
                    const product = content.PRODUCT_DATA[id];
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
                一站式烫金服务 <br/> 解决方案
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
              我们不仅提供优质的烫金材料，更提供全方位的技术支持与定制服务。
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
               { icon: Scissors, title: '精密分切', en: 'Precision Slitting', desc: '最小分切宽度 10mm，切面平整' },
               { icon: Microscope, title: '实验室检测', en: 'Lab Testing', desc: '耐磨、耐酒精、3M胶带拉力等多项测试' },
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
                     img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFhZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1jaGVjazItaWNvbiBsdWNpZGUtY2FsZW5kYXItY2hlY2stMiI+PHBhdGggZD0iTTggMnY0Ii8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik0yMSAxNFY2YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoOCIvPjxwYXRoIGQ9Ik0zIDEwaDE4Ii8+PHBhdGggZD0ibTE2IDIwIDIgMiA0LTQiLz48L3N2Zz4=", 
                     label: "日均涂布产量", 
                     value: "60,000", 
                     unit: "米/Day" 
                  },
                  { 
                     img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFhZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1qYXBhbmVzZS15ZW4taWNvbiBsdWNpZGUtYmFkZ2UtamFwYW5lc2UteWVuIj48cGF0aCBkPSJNMy44NSA4LjYyYTQgNCAwIDAgMSA0Ljc4LTQuNzcgNCA0IDAgMCAxIDYuNzQgMCA0IDQgMCAwIDEgNC43OCA0Ljc4IDQgNCAwIDAgMSAwIDYuNzQgNCA0IDAgMCAxLTQuNzcgNC43OCA0IDQgMCAwIDEtNi43NSAwIDQgNCAwIDAgMS00Ljc4LTQuNzcgNCA0IDAgMCAxIDAtNi43NloiLz48cGF0aCBkPSJtOSA4IDMgM3Y3Ii8+PHBhdGggZD0ibTEyIDExIDMtMyIvPjxwYXRoIGQ9Ik05IDEyaDYiLz48cGF0aCBkPSJNOSAxNmg2Ii8+PC9zdmc+", 
                     label: "研发投入占比", 
                     value: "15", 
                     unit: "%/年" 
                  },
                  { 
                     img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFhZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1kYXRhYmFzZS16YXAtaWNvbiBsdWNpZGUtZGF0YWJhc2UtemFwIj48ZWxsaXBzZSBjeD0iMTIiIGN5PSI1IiByeD0iOSIgcnk9IjMiLz48cGF0aCBkPSJNMyA1VjE5QTkgMyAwIDAgMCAxNSAyMS44NCIvPjxwYXRoIGQ9Ik0yMSA1VjgiLz48cGF0aCBkPSJNMjEgMTJMMTggMTdIMjJMMTkgMjIiLz48cGF0aCBkPSJNMyAxMkE5IDMgMCAwIDAgMTQuNTkgMTQuODciLz48L3N2Zz4=", 
                     label: "库存周转效率", 
                     value: "98.5", 
                     unit: "% Rate" 
                  }
                ].map((item, i) => (
                   <div key={i} className="flex gap-6 items-start">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                         <img src={item.img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 p-4 bg-blue/10 rounded-xl" alt={item.label} />
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
 
       {/* === ACCORDION SECTION REPLACEMENT (New Independent Cards) === */}
       <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6 leading-tight">
                   选择品特<br/>
                   用专业打造人人认可的产品
                </h2>
                <p className="text-neutral-500 text-lg mb-12">
                   二十余年深耕烫金领域，我们不仅提供材料，更传递价值。
                </p>
                
                {/* New Grid Layout for Corporate Culture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                   {/* Vision */}
                   <div className="flex flex-col gap-4 group">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-neutral-100 flex items-center justify-center text-pinte-blue shadow-sm group-hover:scale-110 group-hover:bg-pinte-blue group-hover:text-white transition-all duration-300">
                         <Target size={28} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-neutral-900 mb-1">公司愿景</h4>
                         <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Our Vision</p>
                         <p className="text-neutral-600 leading-relaxed text-sm">
                            成为全球烫金膜领域的卓越引领者，让每一份包装都传递独特的品牌价值。
                         </p>
                      </div>
                   </div>

                   {/* Values */}
                   <div className="flex flex-col gap-4 group">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-neutral-100 flex items-center justify-center text-pinte-blue shadow-sm group-hover:scale-110 group-hover:bg-pinte-blue group-hover:text-white transition-all duration-300">
                         <HeartHandshake size={28} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-neutral-900 mb-1">公司价值观</h4>
                         <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Core Values</p>
                         <p className="text-neutral-600 leading-relaxed text-sm">
                            彼此成就，合作共赢。我们深知客户的成功就是我们的成功，始终坚持以品质建立信任。
                         </p>
                      </div>
                   </div>

                   {/* Achievements */}
                   <div className="flex flex-col gap-4 group">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-neutral-100 flex items-center justify-center text-pinte-blue shadow-sm group-hover:scale-110 group-hover:bg-pinte-blue group-hover:text-white transition-all duration-300">
                         <Trophy size={28} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-neutral-900 mb-1">我们的成就</h4>
                         <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Our Achievements</p>
                         <p className="text-neutral-600 leading-relaxed text-sm">
                            拥有 20,000㎡ 现代化生产基地，日产能突破 60,000 米，产品畅销全球 50 多个国家。
                         </p>
                      </div>
                   </div>

                   {/* Partners */}
                   <div className="flex flex-col gap-4 group">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-neutral-100 flex items-center justify-center text-pinte-blue shadow-sm group-hover:scale-110 group-hover:bg-pinte-blue group-hover:text-white transition-all duration-300">
                         <Globe size={28} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-neutral-900 mb-1">全球合作伙伴</h4>
                         <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Global Partners</p>
                         <p className="text-neutral-600 leading-relaxed text-sm">
                            与多家国际知名印刷包装企业建立长期战略合作，共同推动表面装饰工艺的技术革新。
                         </p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Right Side Image */}
             <div className="relative h-full min-h-[500px]">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden sticky top-32 shadow-2xl shadow-neutral-200">
                   <img 
                      src="https://s3plus.meituan.net/opapisdk/op_ticket_1_5677168484_1765950617863_qdqqd_jqs18c.JPG" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                      alt="Green Future"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20">
                         <Trophy size={32} className="text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">公司文化建设</h3>
                      <p className="opacity-80 leading-relaxed">
                         致力于为每位员工带来家的体验。
                      </p>
                      <button 
                         onClick={() => setShowCulture(true)}
                         className="mt-8 bg-white text-neutral-900 px-8 py-3 rounded-full text-sm font-bold w-fit hover:bg-blue-50 transition-colors flex items-center gap-2"
                      >
                         了解更多 <ArrowRight size={16}/>
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
                <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">客户声音</h2>
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

       {/* === PURCHASE NOTES (Grid Style) === */}
       <section className="py-24 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
             <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b-2 border-neutral-900 pb-6">
                <div>
                   <span className="text-neutral-500 font-bold tracking-widest text-xs uppercase mb-2 block">Important Information</span>
                   <h2 className="text-3xl md:text-5xl font-display font-bold text-neutral-900 leading-none uppercase">
                      购买与使用<br/>须知事项
                   </h2>
                </div>
                <div className="text-right hidden md:block">
                   <p className="text-neutral-900 font-bold text-lg">READ CAREFULLY</p>
                   <p className="text-neutral-400 text-xs uppercase tracking-wide">Before Purchase</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-200">
                {NOTICES.map((note) => (
                   <div key={note.id} className="relative p-8 border-r border-b border-neutral-200 group hover:bg-neutral-50 transition-colors">
                      <div className="flex justify-between items-start mb-6">
                         <span className="font-display font-bold text-4xl text-neutral-200 group-hover:text-pinte-blue transition-colors duration-300">
                            {note.id}
                         </span>
                         <div className="w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-pinte-blue transition-colors"></div>
                      </div>
                      <h3 className="font-bold text-lg text-neutral-900 mb-3 uppercase tracking-tight">
                         {note.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed text-justify font-medium">
                         {note.text}
                      </p>
                   </div>
                ))}
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
                <button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="bg-pinte-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pinte-dark transition-colors"
                >
                   Contact Support
                </button>
             </div>
             <div className="lg:col-span-2 space-y-4">
                <FAQItem q="常规发货时间是多久?" a="常规产品现货当天/隔天发货，定制产品通常需要 5-14 个工作日。" />
                <FAQItem q="品特提供免费的样品吗?" a="是的，我们提供免费64cm x 20m规格的卷材供测试，您只需支付运费。" />
                <FAQItem q="佰仕特·品特有哪些资格证书" a="我们通过了 ISO9001, RoHS, EN71-3, ASTM-F963 等多项国际认证。" />
                <FAQItem q="颜色可以定制吗?" a="可以，我们支持 Pantone 调色。" />
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
                 做高端烫金膜专家 <br/>
                 以技术为核心，以品质为根本，以客户为中心，以信誉为资本
              </p>
              <div className="flex gap-4">
                 {/* Social Icons Placeholders */}
                 <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-pinte-blue hover:text-white transition-colors cursor-pointer"><Globe size={18}/></div>
                 <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-pinte-blue hover:text-white transition-colors cursor-pointer"><Mail size={18}/></div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-neutral-900">快速链接</h4>
              <ul className="space-y-4 text-neutral-600 font-medium">
                 <li><button onClick={() => scrollToSection(Section.HOME)} className="hover:text-pinte-blue transition-colors">主页</button></li>
                 <li><button onClick={() => scrollToSection(Section.PRODUCTS)} className="hover:text-pinte-blue transition-colors">产品info</button></li>
                 <li><button onClick={() => scrollToSection(Section.SOLUTIONS)} className="hover:text-pinte-blue transition-colors">解决方案</button></li>
                 <li><button onClick={() => scrollToSection(Section.ABOUT)} className="hover:text-pinte-blue transition-colors">关于我们</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-neutral-900">联系我们</h4>
              <ul className="space-y-4 text-neutral-600">
                 <li className="flex items-start gap-3">
                    <Building2 className="shrink-0 mt-1 text-pinte-blue" size={18}/>
                    <span>广东省东莞市长安镇涌头工业区佰仕特工艺制品有限公司</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <Mail className="shrink-0 text-pinte-blue" size={18}/>
                    <a href="mailto:sales@bestglitter.com" className="hover:text-pinte-blue">sales9@bestglitter.com</a>
                 </li>
                 <li className="flex items-center gap-3">
                    <Phone className="shrink-0 text-pinte-blue" size={18}/>
                    <a href="tel:+8613192267509" className="hover:text-pinte-blue">+86-13192267509</a>
                 </li>
              </ul>
            </div>

            {/* WeChat QR Code */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-neutral-900">微信名片</h4>
              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm inline-block">
                 {/* Generating a dummy QR code */}
                 <img 
                   src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://u.wechat.com/MHPZfF2HCiCARXbjSIeIcBY?s=2&color=1e40af" 
                   alt="WeChat QR Code" 
                   className="w-32 h-32 mb-3"
                 />
                 <p className="text-center text-xs text-neutral-400 font-medium uppercase tracking-wider">扫码与我们联系</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-neutral-400 text-sm">© 2026 Dongguan Best Craftwork Products Co., Ltd. All rights reserved.</p>
             <div className="flex gap-8 text-sm font-medium text-neutral-500">
                <a href="#" className="hover:text-pinte-blue transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-pinte-blue transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-pinte-blue transition-colors">Sitemap</a>
             </div>
          </div>
        </div>
      </footer>
       
       <ChatWidget />
       {/* Debug Panel for CMS editing */}
       <DebugPanel 
         data={content} 
         onUpdate={(newData) => setContent(newData)} 
       />
     </div>
   );
 };
 
 export default App;
