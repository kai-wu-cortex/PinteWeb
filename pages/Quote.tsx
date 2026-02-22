
import React from 'react';
import QuoteRequest from '../components/QuoteRequest';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const Quote: React.FC = () => {
  const { ui } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Request a Quote | PINTE Foil"
        description="Get a custom quote for your hot stamping foil needs. We offer competitive pricing and high-quality solutions."
      />
      <QuoteRequest onBack={() => navigate(-1)} ui={ui.quote} />
    </>
  );
};

export default Quote;
