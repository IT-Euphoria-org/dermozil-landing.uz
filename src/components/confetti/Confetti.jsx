import React from "react";
import { motion } from "framer-motion";

const Confetti = () => {
  const colors = [
    "#FFD700", // Gold
    "#FFC300", // Amber
    "#FF5733", // Red-Orange
    "#C70039", // Deep Red
    "#00BCD4", // Cyan
    "#4CAF50", // Green
    "#9C27B0", // Purple
    "#F48FB1", // Pink
    "#8BC34A", // Light Green
  ];
  const particlesCount = 300;

  const generateAnimationProps = () => {
    const duration = 2.5 + Math.random() * 2.0; // Animatsiya vaqti (2.5 - 4.5 sekund)
    const randomEndVX = Math.random() * 200 - 100; // Horizontal yakuniy chayqalish

    const initialX = `${Math.random() * 100}vw`;
    const initialY = Math.random() * -50 - 50; // Yuqoridan (viewport tashqarisidan)

    return {
      initial: {
        y: initialY,
        x: initialX,
        opacity: 1,
        rotate: Math.random() * 360,
      },
      animate: {
        y: [
          initialY,
          window.innerHeight + 100, // Ekran ostidan o'tib ketishi
        ],
        x: [
          initialX,
          `calc(${initialX} + ${randomEndVX}px)`,
        ],
        rotate: Math.random() * 1000 + 720,
        scale: [1, 0.8, 0],
        opacity: [1, 1, 0],
        transition: {
          duration: duration,
          ease: "linear",
          delay: Math.random() * 2.5, // Zarrachalarni birin-ketin tushirish
        },
      },
    };
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Foydalanuvchi interfeysini to'smaslik uchun
        zIndex: 9999, // Eng yuqori z-index
        overflow: "hidden", // Ekran tashqarisini yashirish
      }}
    >
      {[...Array(particlesCount)].map((_, index) => {
        const animationProps = generateAnimationProps();

        return (
          <motion.div
            key={index}
            initial={animationProps.initial}
            animate={animationProps.animate}
            transition={animationProps.animate.transition}
            style={{
              position: "absolute",
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              left: animationProps.initial.x,
              top: animationProps.initial.y,
            }}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
