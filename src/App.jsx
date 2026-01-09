import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Testimonials from './components/Testimonials';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';

import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
