import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogicShift from './components/LogicShift';
import CTA from './components/CTA';
import Calibration from './components/Calibration';
import CalculationTheater from './components/CalculationTheater';
import ShishenReveal from './components/ShishenReveal';
import Foundation from './components/Foundation';
import Checkout from './components/Checkout';
import SocialProof from './components/SocialProof';
import FinalPush from './components/FinalPush';
import EnergyForecast from './components/HorizontalScroll';
import AnxietyFeed from './components/BentoGrid';
import CelebrityProfiles from './components/CelebrityProfiles';
import Footer from './components/Footer';

type ViewState = 'LANDING' | 'CALIBRATION' | 'CALCULATION' | 'REVEAL' | 'FOUNDATION' | 'CHECKOUT';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LANDING');

  return (
    <main className="min-h-screen relative overflow-x-hidden font-sans antialiased selection:bg-zen-accent/30 transition-colors duration-500">
      
      {view === 'CALIBRATION' && (
        <Calibration 
            onBack={() => setView('LANDING')} 
            onComplete={() => setView('CALCULATION')} 
        />
      )}

      {view === 'CALCULATION' && (
        <CalculationTheater 
            onComplete={() => setView('REVEAL')} 
            onHome={() => setView('LANDING')}
        />
      )}

      {view === 'REVEAL' && (
        <ShishenReveal 
            onComplete={() => setView('FOUNDATION')} 
        />
      )}

      {view === 'FOUNDATION' && (
        <Foundation 
            onUnlock={() => setView('CHECKOUT')}
            onBack={() => setView('REVEAL')}
            onHome={() => setView('LANDING')}
        />
      )}

      {view === 'CHECKOUT' && (
        <Checkout 
            onBack={() => setView('FOUNDATION')}
        />
      )}

      {view === 'LANDING' && (
        <>
          <Header />
          <div className="relative z-10 flex flex-col items-center w-full">
            <Hero />
            
            {/* Bento Grid / Anxiety Feed */}
            <AnxietyFeed />

            {/* CTA Button Section */}
            <CTA onStart={() => setView('CALIBRATION')} />
            
            {/* 3D Logic Visualization */}
            <LogicShift />

            {/* Celebrity Profiles / Decrypted Archive */}
            <CelebrityProfiles />

            {/* Social Proof */}
            <div className="w-full relative z-20 shadow-sm border-t border-zen-accent/5">
                <SocialProof />
            </div>
            
            {/* Archive Bureau / Forecast Section */}
            <EnergyForecast />

            {/* Final CTA & FAQ Section */}
            <FinalPush onStart={() => setView('CALIBRATION')} />

            {/* Comprehensive Footer */}
            <Footer />
          </div>
        </>
      )}
    </main>
  );
};

export default App;