
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Mail, 
  Building2, 
  User, 
  Phone, 
  Palette, 
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { PinteLogo } from './PinteLogo';
import emailjs from '@emailjs/browser';

interface QuoteRequestProps {
  onBack: () => void;
}

const PAIN_POINTS = [
  "附着力差 (Adhesion Issues)",
  "容易氧化变黑 (Oxidation)",
  "金粉脱落 (Foil Dusting)",
  "边缘不整齐 (Poor Edge Definition)",
  "拉丝/飞金 (Flaking)",
  "耐磨性不足 (Low Abrasion Resistance)",
  "光泽度不够 (Low Gloss)",
  "很难上烫 (Hard to Stamp)"
];

const APPLICATIONS = [
  "纸张包装 (Paper Packaging)",
  "皮革/PU (Leather/PU)",
  "塑胶外壳 (Plastic Housing)",
  "化妆品容器 (Cosmetic Container)",
  "纺织布料 (Textile)",
  "标签贴纸 (Labels)",
  "其他 (Others)"
];

// --- EMAILJS CONFIGURATION ---
// 1. 去 https://www.emailjs.com/ 注册免费账号
// 2. 添加 Email Service (如 Gmail) -> 获取 Service ID
// 3. 添加 Email Template -> 获取 Template ID
// 4. 去 Account -> API Keys -> 获取 Public Key
// 5. 将下方变量替换为您自己的 ID
const EMAILJS_SERVICE_ID: string = "service_o5cnsro"; 
const EMAILJS_TEMPLATE_ID: string = "template_yztox8m";
const EMAILJS_PUBLIC_KEY: string = "VBjpFY6nA0vANF7ok";

const QuoteRequest: React.FC<QuoteRequestProps> = ({ onBack }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    application: '',
    painPoints: [] as string[],
    colorRequirements: '',
    description: ''
  });

  const togglePainPoint = (point: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(point) 
        ? prev.painPoints.filter(p => p !== point)
        : [...prev.painPoints, point]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Prepare template parameters matching your EmailJS template variables
    // Added 'to_email' to resolve "The recipients address is empty" error
    const templateParams = {
      subject:"PINTE Thanks for your feedback. We will reply you soon. -PINTE hot stamping foil",
      to_name: formData.name,
      to_email: formData.email, // Explicitly setting the recipient email
      from_name: "PINTE 销售团队 / PINTE SALES TEAM",
      from_email: "cortexwu@gmail.com",
      company: formData.company,
      phone: formData.phone,
      application: formData.application,
      color_requirements: formData.colorRequirements,
      pain_points: formData.painPoints.join(", "),
      message: formData.description,
      reply_to: formData.email
    };

    try {
      // Check if keys are configured
      if (EMAILJS_SERVICE_ID === "") {
         console.warn("EmailJS 未配置。请在代码中填写您的 Service ID, Template ID 和 Public Key。");
         // 模拟成功，以免阻塞演示
         await new Promise(resolve => setTimeout(resolve, 1500));
         setStep('success');
         window.scrollTo(0, 0);
         return;
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      setStep('success');
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error('Email sending failed:', error);
      // More detailed error message for debugging
      const errorText = error?.text || "未知错误";
      setErrorMessage(`发送失败 (${errorText})，请检查网络或稍后重试。如果不便，请直接发送邮件至 sales9@bestglitter.com`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="bg-white max-w-lg w-full rounded-[2.5rem] p-12 text-center shadow-xl border border-neutral-100">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">需求提交成功!</h2>
          <p className="text-neutral-500 leading-relaxed mb-8">
            感谢您选择品特(PINTE)。我们的技术团队已收到您的需求，将在 24 小时内制定初步解决方案并发送至您的邮箱。
          </p>
          <div className="space-y-3">
             <button 
               onClick={onBack}
               className="w-full bg-pinte-blue text-white py-4 rounded-xl font-bold hover:bg-pinte-dark transition-colors shadow-lg shadow-pinte-blue/20"
             >
               返回首页
             </button>
             <button 
               onClick={() => {
                 setStep('form');
                 setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    application: '',
                    painPoints: [],
                    colorRequirements: '',
                    description: ''
                 });
               }}
               className="w-full bg-white text-neutral-600 py-4 rounded-xl font-bold hover:bg-neutral-50 transition-colors"
             >
               提交新需求
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1000px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-pinte-blue font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回</span>
          </button>
          <div className="flex items-center gap-2">
            <PinteLogo originalColors className="h-6 w-auto" />
            <span className="font-display font-bold text-xl tracking-tight">PINTE QUOTE</span>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
            开启您的定制方案
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed">
            请告诉我们您的具体需求与当前遇到的问题，品特技术工程师将为您匹配最适合的烫金材料与工艺参数。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Project Details */}
          <section className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-neutral-100">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-100">
              <div className="w-10 h-10 bg-blue-50 text-pinte-blue rounded-full flex items-center justify-center">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">项目详情</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                  应用领域 <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  value={formData.application}
                  onChange={(e) => setFormData({...formData, application: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all appearance-none"
                >
                  <option value="" disabled>请选择...</option>
                  {APPLICATIONS.map((app) => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                  <Palette size={16} className="text-neutral-400" /> 颜色/效果需求
                </label>
                <input 
                  type="text" 
                  placeholder="例如: 亮金, 哑银, 镭射素面..."
                  value={formData.colorRequirements}
                  onChange={(e) => setFormData({...formData, colorRequirements: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-neutral-400" /> 目前遇到的痛点 (可多选)
              </label>
              <div className="flex flex-wrap gap-3">
                {PAIN_POINTS.map((point) => (
                  <button
                    key={point}
                    type="button"
                    onClick={() => togglePainPoint(point)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                      formData.painPoints.includes(point)
                        ? 'bg-pinte-blue text-white border-pinte-blue shadow-md'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-pinte-blue hover:text-pinte-blue'
                    }`}
                  >
                    {point}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
               <label className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                  补充说明 (基材/设备型号等)
               </label>
               <textarea 
                  rows={4}
                  placeholder="请描述您的基材特性（如：UV光油表面、粗纹纸）或使用的烫金设备型号..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all resize-none"
               />
            </div>
          </section>

          {/* Section 2: Contact Info */}
          <section className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-neutral-100">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-100">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">联系方式</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">姓名 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all"
                    placeholder="您的称呼"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">公司名称</label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full pl-12 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all"
                    placeholder="公司全称"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">电子邮箱 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">联系电话</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pinte-blue/20 focus:border-pinte-blue transition-all"
                    placeholder="+86 ..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* Submit Action */}
          <div className="flex items-center justify-end pt-4">
             <button 
               type="submit"
               disabled={isSubmitting}
               className="bg-pinte-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-pinte-dark disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-pinte-blue/30 flex items-center gap-3"
             >
               {isSubmitting ? (
                 <>
                   <Loader2 size={20} className="animate-spin" />
                   提交中...
                 </>
               ) : (
                 <>
                   发送需求
                   <Send size={20} />
                 </>
               )}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default QuoteRequest;
