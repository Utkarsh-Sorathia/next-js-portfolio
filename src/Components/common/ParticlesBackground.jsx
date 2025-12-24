"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

const ParticlesBackground = () => {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  const [particleSize, setParticleSize] = useState({ min: 1, max: 5 });
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [particleCount, setParticleCount] = useState(250);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        setParticleSize({ min: 1, max: 5 });
        setParticleSpeed(2);
        setHoverEnabled(false);
        setParticleCount(250);
      } else {
        setParticleSize({ min: 1, max: 3 });
        setParticleSpeed(1);
        setHoverEnabled(true);
        setParticleCount(150);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: false },
            style: {
              position: "absolute",
              width: "100%",
              height: "100%",
            },
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: hoverEnabled, 
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: { quantity: 6 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: theme === "dark" ? "#ffffff" : "#4a2c2a" },
              links: {
                color: theme === "dark" ? "#ffffff" : "#4a2c2a",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: particleSpeed,
                straight: false,
              },
              number: {
                density: { enable: true, area: 800 },
                value: particleCount,
              },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: {
                value: {
                  min: particleSize.min,
                  max: particleSize.max,
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ParticlesBackground;