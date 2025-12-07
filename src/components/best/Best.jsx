"use client";
import React from "react";
import { motion } from "framer-motion";
import "./best.scss";

// --- ANIMATSIYA VARIANTLARI ---

// 1. Umumiy Konteyner (Ro'yxat elementlari uchun Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // Konteyner kirgandan so'ng 0.3s kechikish
      staggerChildren: 0.1, // Har bir bola elementi 0.1s kechikish bilan chiqadi
    },
  },
};

// 2. Ro'yxatdagi alohida elementlar
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Silliq harakat uchun 'spring'
      stiffness: 100,
    },
  },
};

// 3. Rasm va SVG uchun Animatsiya (Chap qism)
const leftSideVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Best = () => {
  return (
    // motion.section yordamida butun seksiyaga Scroll Reveal effekti beramiz
    <motion.section
      className="best"
      initial="hidden" // Boshlang'ich holat
      whileInView="visible" // Ekranga kirganda boshlash
      viewport={{ once: true, amount: 0.2 }} // Bir marta animatsiya qilish, 20% ko'ringanda boshlash
    >
      <h2 className="what-brings__title">
        Dermozil - Tirnoq zamburug‘iga qarshi eng yaxshi vosita, tarkibida:
      </h2>
      <div className="best__bottom">
        {/* CHAP QISM (Rasm va SVG) */}
        <motion.div className="best__left" variants={leftSideVariants}>
          <img
            className="best__img"
            src="./images/best-main-img.png"
            alt="Dermozil mahsuloti"
          />

          <svg
            className="best__svg"
            width="446"
            height="571"
            viewBox="0 0 446 571"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink" <- Ushbu xato beruvchi qator olib tashlandi
          >
            <rect
              opacity="0.14"
              x="446.006"
              y="164.496"
              width="205"
              height="131"
              rx="20"
              transform="rotate(164.933 446.006 164.496)"
              fill="#ccc"
            />
            <rect
              opacity="0.14"
              x="-69"
              y="440.505"
              width="205"
              height="131"
              transform="rotate(-7.14688 -69 440.505)"
              fill="#ccc"
            />
            <rect
              opacity="0.14"
              x="96.0648"
              width="144"
              height="275"
              transform="rotate(38.4663 96.0648 0)"
              fill="#ccc"
            />
            <rect
              opacity="0.14"
              x="151.352"
              y="169"
              width="164"
              height="272"
              transform="rotate(51.3253 151.352 169)"
              fill="#ccc"
            />
            <rect
              opacity="0.14"
              width="164"
              height="272"
              transform="matrix(0.108036 -0.994147 -0.994147 -0.108036 366.763 554.217)"
              fill="#ccc"
            />
            <rect
              opacity="0.14"
              x="320.485"
              y="193"
              width="143.7"
              height="179.358"
              transform="rotate(41.3459 320.485 193)"
              fill="#ccc"
            />
          </svg>
        </motion.div>

        {/* O'NG QISM (Tarkib elementlari) */}
        <motion.div className="best__right" variants={containerVariants}>
          {/* Har bir item uchun alohida motion.div ishlatiladi */}
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

export default Best;
