'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Link from 'next/link';

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.8,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      lerp: 0.1,
      infinite: false,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center px-4 relative bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold text-center mb-6">
            Welcome to
            <span className="block text-blue-400 mt-2">The Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl animate-fade-in-up-delay-1">
            Experience the next generation of web design with smooth animations and
            seamless interactions.
          </p>
          <Link href='/dashboard' className="mt-12 w-full flex justify-center animate-fade-in-up-delay-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-blue-500/20">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Content Sections */}
      <div className="space-y-32 py-32 px-4 bg-gray-800">
        {[1, 2, 3].map((section) => (
          <div
            key={section}
            className="max-w-4xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out"
            style={{
              animation: `fadeInUp 1s ease-out ${section * 0.2}s forwards`,
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Section {section}
            </h2>
            <p className="text-xl text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-blue-400 rounded-full mt-2 animate-scroll-indicator" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scrollIndicator {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fade-in-up-delay-1 {
          animation: fadeInUp 1s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 1s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        .animate-scroll-indicator {
          animation: scrollIndicator 1.5s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        /* Intersection Observer styles */
        .fade-in {
          opacity: 0;
          transform: translateY(2rem);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                  }
                });
              }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
              });

              document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
            });
          `,
        }}
      />
    </div>
  );
}
