
import React from 'react';
import ProductShowcase from '../components/ProductShowcase';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const ProductCatalog: React.FC = () => {
  const { content, ui } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-20"> {/* Add padding for fixed header */}
      <SEO 
        title="Product Catalog | PINTE Foil"
        description="Explore our wide range of hot stamping foils, including Graphic, Packaging, Plastic, and Digital series."
        keywords="Product Catalog, Hot Stamping Foil, Packaging Foil, Graphic Foil"
      />
      <ProductShowcase 
        onBack={() => navigate('/')} 
        products={content.PRODUCT_DATA} 
        catalog={content.CATALOG_DATA}
        onItemClick={(id) => navigate(`/products/item/${id}`)} 
        ui={ui.products}
      />
    </div>
  );
};

export default ProductCatalog;
