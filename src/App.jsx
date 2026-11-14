import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Home, GradientButton, Background, PalettePage, NotFound } from './pages';

export default function App() {
  const [selectedGradientForStudio, setSelectedGradientForStudio] = useState(null);
  const [randomTrigger, setRandomTrigger] = useState(0);

  const handleRandomizeFromNav = () => {
    setRandomTrigger((prev) => prev + 1);
  };

  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-violet-500 selection:text-white">
          <Navbar onRandomize={handleRandomizeFromNav} />

          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    key={randomTrigger}
                    externalGradient={selectedGradientForStudio}
                  />
                }
              />
              <Route
                path="/gradient-generator-react"
                element={
                  <Home
                    key={randomTrigger}
                    externalGradient={selectedGradientForStudio}
                  />
                }
              />
              <Route path="/button" element={<GradientButton />} />
              <Route
                path="/background"
                element={
                  <Background
                    onSelectGradientForStudio={(grad) =>
                      setSelectedGradientForStudio(grad)
                    }
                  />
                }
              />
              <Route
                path="/palette"
                element={
                  <PalettePage
                    onSelectGradientForStudio={(grad) =>
                      setSelectedGradientForStudio(grad)
                    }
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

