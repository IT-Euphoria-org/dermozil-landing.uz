// src/components/Effect/Effect.jsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image"; // Next.js Image komponentini import qildik
import "./effect.scss";

const Effect = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  // Sarlavha variantlari
  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  // Kartochkalar konteyneri variantlari (Staggered)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Kartochka kirish animatsiyasi (Pastdan ko'tarilish)
  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Hover/Active variantlari (Yuqoriga ko'tarilish va silliq soya/chegara)
  const cardInteractive = {
    // 1. Hover: Yuqoriga ko'tarilish va silliq soya
    whileHover: {
      y: -5,
      boxShadow:
        "0 15px 30px rgba(255, 105, 180, 0.4), 0 0 0 2px rgba(255, 105, 180, 0.5)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    // 2. Active (bosilganda): Ichkariga bosilish effekti
    whileTap: {
      scale: 0.98,
      y: 0,
      boxShadow: "0 5px 15px rgba(255, 105, 180, 0.3)",
    },
  };

  return (
    <div className="wrapper" id="effect-section">
      <motion.section
        className="contain effect"
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 className="what-brings__title" variants={titleVariants}>
          Zamburug‘ yuqtirganingizda quyidagi alomatlar sizga o‘z ta’sirini
          ko‘rsatadi:
        </motion.h2>

        <motion.div className="effect__cards" variants={containerVariants}>
          {/* 1-kartochka */}
          <motion.div
            className="effect__items"
            variants={itemVariants}
            style={{ borderRadius: "20px" }} // Border radius 20px
            {...cardInteractive}
          >
            {/* effect__items-box rasmni joylashtirish uchun konteyner bo'lsin (position: relative) */}
            <div
              className="effect__items-box effect__items-box-1"
              style={{ position: "relative", height: "150px" }}
            >
              {" "}
              {/* TAXMINIY HEIGHT QO'SHILDI */}
              {/* Image komponenti bilan rasm to'liq egallaydi */}
              <Image
                src="/images/effect-1.png"
                alt="Yoqimsiz hid"
                fill // Ota-elementni to'liq egallaydi
                style={{ objectFit: "contain" }} // Rasm o'lchamga moslashtiriladi, lekin buzilmaydi
                unoptimized
              />
            </div>
            <p className="effect__items-text">
              Oyoq sohasida noqulaylik, yoqimsiz hid
            </p>
          </motion.div>

          {/* 2-kartochka */}
          <motion.div
            className="effect__items"
            variants={itemVariants}
            style={{ borderRadius: "20px" }}
            {...cardInteractive}
          >
            <div
              className="effect__items-box"
              style={{ position: "relative", height: "150px" }}
            >
              {" "}
              {/* TAXMINIY HEIGHT QO'SHILDI */}
              <Image
                src="/images/effect-2.png"
                alt="Tirnoq og‘rig‘i va quruqlik"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
            <p className="effect__items-text">
              Poyabzaldagi tirnoq og‘rig‘i va quruqlik, ta’sirlanish
            </p>
          </motion.div>

          {/* 3-kartochka */}
          <motion.div
            className="effect__items"
            variants={itemVariants}
            style={{ borderRadius: "20px" }}
            {...cardInteractive}
          >
            <div
              className="effect__items-box effect__items-box-2"
              style={{ position: "relative", height: "150px" }}
            >
              {" "}
              {/* TAXMINIY HEIGHT QO'SHILDI */}
              <Image
                src="/images/effect-3.png"
                alt="Tirnoq plastinkalarining qorayishi"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
            <p className="effect__items-text">
              Tirnoq plastinkalarining qorayishi va terini zichlashi
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Effect;
