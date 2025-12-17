
import React from 'react';
import { 
  ArrowRight, 
  Search,
  ArrowLeft,
  Filter,
  LayoutGrid,
  List,
  ChevronDown
} from 'lucide-react';
import { PinteLogo } from './PinteLogo';
import { ProductId, ProductDetail, CatalogItem } from '../types';

interface ProductShowcaseProps {
  onBack: () => void;
  products: Record<ProductId, ProductDetail>;
  catalog: Record<ProductId, CatalogItem[]>;
  onItemClick: (id: string) => void; // Changed to string to accept specific item IDs
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onBack, products, catalog, onItemClick }) => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
       
       {/* Sticky Header */}
       <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
         <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <button 
             onClick={onBack}
             className="flex items-center gap-2 text-neutral-500 hover:text-pinte-blue font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2">
                <PinteLogo originalColors className="h-6 w-auto" />
                <span className="font-display font-bold text-lg tracking-tight">PINTE CATALOG</span>
            </div>
            <div className="flex gap-4">
                <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Search size={20} />
                </button>
            </div>
         </div>
       </div>

       {/* Main Title Area */}
       <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-12 border-b border-neutral-200">
         <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-neutral-900">
            Product Catalog
         </h1>
       </div>

       {/* Catalog Grid List */}
       <div className="max-w-[1400px] mx-auto px-6 py-20 space-y-32">
          {(Object.values(products) as ProductDetail[]).map((product) => {
            // Get specific items from the catalog prop
            const items = catalog[product.id] || [];

            return (
              <div key={product.id} className="flex flex-col lg:flex-row gap-12 xl:gap-24 group/section">
                 
                 {/* Left Column: Category Info */}
                 <div className="lg:w-1/4 shrink-0 flex flex-col justify-start items-start gap-8">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold font-display leading-tight text-neutral-900">
                          {product.name}
                      </h2>
                      <p className="text-neutral-500 leading-relaxed text-sm max-w-xs">
                          {product.description}
                      </p>
                    </div>

                    {/* Added Tags to fill the space left by the removed button */}
                    <div className="flex flex-wrap gap-2">
                        {product.substrates.slice(0, 5).map((sub, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-md bg-neutral-100 text-neutral-500 text-xs font-medium uppercase tracking-wide">
                                {sub}
                            </span>
                        ))}
                    </div>
                 </div>

                 {/* Right Column: Product Cards Grid */}
                 <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {items.length > 0 ? (
                      items.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-neutral-50 hover:bg-white rounded-xl p-6 flex flex-col justify-between h-[360px] cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 border border-transparent hover:border-neutral-100 group/card"
                            onClick={() => onItemClick(item.id)}
                        >
                            {/* Image Area */}
                            <div className="w-full h-40 mb-6 flex items-center justify-center relative overflow-hidden rounded-lg bg-white">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover mix-blend-normal group-hover/card:scale-105 transition-transform duration-700" 
                                />
                                {/* Overlay tag */}
                                {item.tags && item.tags.length > 0 && (
                                  <div className="absolute top-2 left-2 bg-neutral-100/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                                      {item.tags[0]}
                                  </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div>
                               <p className="text-xs font-medium text-neutral-400 mb-2 line-clamp-1">{item.description}</p>
                               <h3 className="font-bold text-lg leading-tight text-neutral-900 mb-6 pr-4">
                                    {item.name}
                               </h3>
                               
                               {/* Bottom Link */}
                               <div className="flex justify-between items-center border-t border-neutral-200 pt-4">
                                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover/card:text-pinte-blue transition-colors">View Details</span>
                                  <ArrowRight size={14} className="text-neutral-300 group-hover/card:text-pinte-blue group-hover/card:translate-x-1 transition-all" />
                               </div>
                            </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center text-neutral-400 italic">
                        No specific products listed yet.
                      </div>
                    )}
                 </div>
              </div>
            );
          })}
       </div>

       {/* Footer */}
       <div className="border-t border-neutral-100 py-12 text-center text-neutral-400 text-sm">
          <p>© 2024 PINTE Catalog. All rights reserved.</p>
       </div>
    </div>
  );
};

export default ProductShowcase;
