import React from 'react';
import HeroSection from '../component/home/herosection';
import Features from '../component/home/features';
import Testimonials from '../component/home/testimonials';
import Header from '../component/home/header';
import Footer from '../component/home/footer';
const HomePage = () => {
  return (
    <div>
       <Header />
          <HeroSection />
         <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
