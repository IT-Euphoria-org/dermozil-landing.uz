"use client";
import React, { memo } from "react"; // ✅ memo import qilindi
import { motion } from "framer-motion";
import "./best.scss";

// --- ANIMATSIYA VARIANTLARI ---

/**
 * Umumiy Konteyner (Ro'yxat elementlari uchun Stagger)
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, // 0.3 dan 0.2 gacha qisqartirildi
      staggerChildren: 0.1,
    },
  },
};

/**
 * Ro'yxatdagi alohida elementlar uchun animatsiya
 */
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80, // 100 dan 80 gacha kamaytirildi, tezroq yakunlash uchun
      damping: 15, // Damping qo'shildi, silliqlikni ta'minlaydi
    },
  },
};

/**
 * Rasm va SVG uchun Animatsiya (Chap qism)
 */
const leftSideVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }, // 0.8 dan 0.6 gacha qisqartirildi
  },
};

/**
 * Rasmni cheksiz aylantirish variantlari (Cheksiz aylanishni sekinlashtirish)
 */
const rotateVariants = (direction) => ({
  rotate: direction === "right" ? 360 : -360,
  transition: {
    duration: 45, // ✅ 30 dan 45 gacha oshirildi (tezlikni pasaytirish)
    ease: "linear",
    repeat: Infinity,
    // delay olib tashlandi, chunki u keraksiz va resurs talab qiladi
  },
});

// ✅ Komponentni memo bilan o'rash
const Best = () => {
  return (
    <motion.section
      className="best"
      initial="hidden"
      // whileInView, Framer Motion ning eng samarali usullaridan biri.
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="what-brings__title">
        Dermozil - Tirnoq zamburug‘iga qarshi eng yaxshi vosita, tarkibida:
      </h2>
      <div className="best__bottom">
        {/* CHAP QISM (Rasm va Aylanuvchi fon) */}
        <motion.div className="best__left" variants={leftSideVariants}>
          <img
            className="best__img"
            src="./images/best-main-img.png"
            alt="Dermozil mahsuloti"
          />

          <motion.img
            className="best__svg"
            src="/tree.svg"
            alt="Dekorativ fon rasmi"
            initial={{ rotate: 0 }}
            animate={rotateVariants("left")}
          />
        </motion.div>

        {/* O'NG QISM (Tarkib elementlari) */}
        <motion.div className="best__right" variants={containerVariants}>
          {/* Itemlarni takroriy yozish o'rniga massivdan foydalanish eng yaxshi yo'l, 
             lekin mavjud format saqlandi. */}

          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-1.png" alt="Triklozan tarkibi" />
            <p className="best__items-text">
              **Triklozan**: Yallig‘lanishga qarshi, antibakterial va
              zamburug‘larga qarshi xususiyatlarga ega
            </p>
          </motion.div>

          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-2.png" alt="D-pantenol tarkibi" />
            <p className="best__items-text">
              **D - pantenol**: Tirnoq plastinkasini namlaydi va yumshatadi,
              tirnoq atrofidagi terining ta’sirlanishi va quruqligini bartaraf
              etadi
            </p>
          </motion.div>

          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-3.png" alt="Mentol tarkibi" />
            <p className="best__items-text">
              **Mentol**: Oyoqlardagi og‘irlik va charchoq hissini yo‘qotadi,
              tinchlantiruvchi ta’sirga ega
            </p>
          </motion.div>

          <motion.div className="best__items" variants={itemVariants}>
            <img
              src="./images/best-imgs-4.png"
              alt="Moychechak ekstrakti tarkibi"
            />
            <p className="best__items-text">
              **Moychechak ekstrakti**: Teri qon aylanishini yaxshilaydi va
              yallig‘lanishga qarshi ta’sirga ega
            </p>
          </motion.div>

          <motion.div className="best__items" variants={itemVariants}>
            <img
              src="./images/best-imgs-5.png"
              alt="Shalfey ekstrakti tarkibi"
            />
            <p className="best__items-text">
              **Shalfey ekstrakti**: Ter bezlariga ta’sir qiladi, terlash
              jarayonini sekinlashtiradi
            </p>
          </motion.div>

          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-6.png" alt="A vitamini tarkibi" />
            <p className="best__items-text">
              **A vitamini**: Quruqlik belgilari paydo bo‘lishining oldini oladi
            </p>
          </motion.div>

          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-7.png" alt="E vitamini tarkibi" />
            <p className="best__items-text">
              **E vitamini**: Terining dag‘allashgan joylarini yumshatadi,
              tirnoqlarni oziqlantiradi va tiklaydi
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(Best);
