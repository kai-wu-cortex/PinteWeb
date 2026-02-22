
import React from 'react';
import FactoryTour360 from '../components/FactoryTour360';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const FactoryTour: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Virtual Factory Tour | PINTE Foil"
        description="Take a virtual tour of our state-of-the-art manufacturing facility. See how we produce high-quality hot stamping foils."
      />
      <FactoryTour360 onClose={() => navigate('/')} />
    </>
  );
};

export default FactoryTour;
