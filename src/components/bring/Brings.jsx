// src/components/Brings/Brings.jsx
"use client";

import React, { useRef, useState } from "react"; // useState va AnimatePresence qo'shildi
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./brings.scss";
import OrderForm from "../form/OrderForm";
// Modal va OrderForm komponentini import qilish

const Brings = () => {
  // ✅ MODAL HOLATI
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modalni ochish/yopish funksiyalari
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Ko'rinishni kuzatish uchun useRef hooki
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  // Asosiy konteyner variantlari (staggering uchun)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  // Chap (SVG) va O'ng (Matn) bo'limlar uchun umumiy slideIn animatsiyasi
  const slideInVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  // Sarlavha uchun alohida animatsiya
  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, delay: 0.1 } },
  };

  // SVG uchun maxsus animatsiya variantlari (aylanish bilan)
  const svgVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -45 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        delay: 0.4,
      },
    },
  };

  return (
    // Modal ochiq bo'lsa, 'modal-open' sinfini qo'shamiz (scrollni o'chirish uchun)
    <div className={`wrapper ${isModalOpen ? "modal-open" : ""}`}>
      {/* -----------------------------------------------------------
      // ASOSIY BO'LIM KONTENTI
      // ----------------------------------------------------------- */}
      <motion.section
        className="what-brings"
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 className="what-brings__title" variants={titleVariants}>
          TIRNOQ ZAMBURUG‘INI NIMA KELTIRIB CHIQARADI?
        </motion.h2>

        <motion.div className="what-brings__bottom">
          {/* Chap bo'lim - SVG Ikonka */}
          <motion.div className="what-brings__left" variants={svgVariants}>
            <svg
              width="104"
              height="104"
              viewBox="0 0 104 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52 0C23.3275 0 0 23.3275 0 52C0 80.6725 23.3275 104 52 104C80.6725 104 104 80.6725 104 52C104 23.3275 80.6725 0 52 0ZM70.6925 54.325L42.08 71.61C41.6699 71.8557 41.2018 71.9879 40.7237 71.993C40.2456 71.9981 39.7748 71.8759 39.3596 71.639C38.9443 71.4021 38.5995 71.059 38.3606 70.6449C38.1217 70.2308 37.9972 69.7606 38 69.2825V34.7175C37.9972 34.2394 38.1217 33.7692 38.3606 33.3551C38.5995 32.941 38.9443 32.5979 39.3596 32.361C39.7748 32.1241 40.2456 32.0019 40.7237 32.007C41.2018 32.0121 41.6699 32.1443 42.08 32.39L70.6925 49.675C71.0913 49.918 71.421 50.2595 71.6497 50.6666C71.8784 51.0738 71.9985 51.533 71.9985 52C71.9985 52.467 71.8784 52.9262 71.6497 53.3334C71.421 53.7405 71.0913 54.082 70.6925 54.325Z"
                fill="black"
              />
            </svg>
          </motion.div>

          {/* O'ng bo'lim - Matn va Tugma */}
          <motion.div
            className="what-brings__right"
            variants={slideInVariants}
            custom={"right"}
          >
            <p className="what-brings__text">
              Mikroblar tirnoqlarga tushib, o‘zlari uchun ideal sharoitlarni -
              nam poyabzal, umumiy dush xonalari, basseyn, sport zali yoki
              hammom polini topganda **zamburug‘ rivojlanadi.**
              <br />
              <br />
              Teridagi har qanday yoriq infeksiya uchun **kirish yo‘lidir.**
              <br />
              <br />
              Agar oyoq gigiyenasi yomon bo‘lsa, yanada yomonroq: paypoqlarni
              kamdan-kam almashtirish, quritilmagan poyabzal, umumiy
              sochiqlardan foydalanish. Bunda **zamburug‘ tezroq tarqaladi.**
              <br />
              <br />U o‘z-o‘zidan yo‘qolmaydi - tirnoqni asta-sekin yo‘q
              qilishga, teriga o‘tishga va oilaning boshqa a’zolariga
              yuqtirishga qodir.
            </p>
            <div className="intro__form what-brings__form">
              <motion.button
                className="intro__button"
                onClick={openModal} // ✅ MODALNI OCHISH
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Buyurtma berish
              </motion.button>
              <p className="intro__bottom-form-text">50% chegirma</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* -----------------------------------------------------------
      // ✅ MODAL KOMPONENTI (AnimatePresence yordamida)
      // ----------------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Yopish tugmasi */}
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>

              {/* OrderForm Komponenti */}
              <OrderForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brings;
