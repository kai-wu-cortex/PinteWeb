
import React from 'react';
import CompanyCulture from '../components/CompanyCulture';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const Culture: React.FC = () => {
  const { content, ui } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Company Culture | PINTE Foil"
        description="Discover the values and vision that drive PINTE Foil. We are committed to innovation, quality, and sustainability."
      />
      <CompanyCulture 
        onBack={() => navigate(-1)} 
        posts={content.CULTURE_POSTS} 
        ui={ui.about} 
      />
    </>
  );
};

export default Culture;
