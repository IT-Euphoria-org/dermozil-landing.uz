"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./header.scss";
import OrderForm from "../form/OrderForm";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const bottomRef = useRef(null);
  const isInView = useInView(bottomRef, { once: true, amount: 0.3 });

  // 1. Navbar animatsiyasini qisqartirish
  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }, // 0.5 dan 0.4 gacha qisqartirildi
  };

  // 2. Title animatsiyasini qisqartirish
  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }, // 0.7 dan 0.5 gacha, delay 0.3 dan 0.2 gacha qisqartirildi
  };

  // 3. Scroll In animatsiyasini qisqartirish
  const scrollInVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }, // 0.6 dan 0.4 gacha qisqartirildi
  };

  // 4. SVG aylanishini optimallashtirish (Endi u faqat isInView bo'lganda ishlaydi)
  const rotateSvgVariants = {
    hidden: { rotate: 0 }, // Yangi holat qo'shildi
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1.2, // Sekinroq aylanish (1.4 dan 1.2 gacha tezlashtirildi)
        ease: "linear",
      },
    },
  };

  const handleScrollToEffect = () => {
    const targetElement = document.getElementById("effect-section");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className={`wrapper ${isModalOpen ? "modal-open" : ""}`}>
      <motion.nav
        className="navbar contain"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <img className="navbar__logo" src="/images/logo.png" alt="logo" />
        <div className="navbar__right">
          <div
            className="navbar__box"
            onClick={handleScrollToEffect}
            style={{ cursor: "pointer" }}
          >
            <p className="navbar__title">Tabiiy tarkib</p>
          </div>
        </div>
      </motion.nav>

      <section className="intro contain">
        <motion.h2
          className="intro__title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="intro__title-span">Zamburug‘dan</span> atigi 2 hafta
          ichida xalos bo‘ling
        </motion.h2>

        <div className="intro__center" ref={bottomRef}>
          {/* Transition delaylari qisqartirildi */}
          <motion.img
            className="intro__img intro__img-1"
            width="80%"
            src="/images/header-left-img.png"
            alt="Chap rasm"
            variants={scrollInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <div className="intro__center-imgs">
            <motion.img
              className="intro__img1"
              src="/maz-dermozil.svg"
              alt="Markaziy rasm 1"
              variants={scrollInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.4, delay: 0.05 }} // Delay 0.1 dan 0.05 gacha
            />
            <motion.img
              className="intro__img2"
              src="/Dermozil-box.svg"
              alt="Markaziy rasm 2"
              variants={scrollInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.4, delay: 0.1 }} // Delay 0.2 dan 0.1 gacha
            />
            <motion.img
              className="intro__img3"
              src="/prize.dermozil.svg"
              alt="Markaziy rasm 3"
              variants={scrollInVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.4, delay: 0.15 }} // Delay 0.3 dan 0.15 gacha
            />
          </div>
          <motion.img
            className="intro__img intro__img-2"
            width="80%"
            src="/images/header-right.png"
            alt="O'ng rasm"
            variants={scrollInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </div>

        <motion.div
          className="intro__bottom"
          variants={scrollInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.4, delay: 0.2 }} // Delay 0.4 dan 0.2 gacha
        >
          <div className="intro__form">
            <motion.button
              className="intro__button"
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buyurtma berish
            </motion.button>
            <p className="intro__bottom-form-text">50% chegirma</p>
          </div>
          <div className="intro__bottom-box">
            <p className="intro__bottom-text">
              Yoqimsiz hidni bartaraf etadi 99% bakteriyalarni yo‘q qiladi va
              ildizning o‘zidan toza va sog‘lom tirnoqlarni tiklaydi
            </p>
            <motion.svg
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={rotateSvgVariants}
              initial="hidden" // Yangi initial holat
              animate={isInView ? "animate" : "hidden"} // Faqat ko'rinishda bo'lganda ishga tushirish
            >
              <path
                d="M32.5 19.5381C29.9364 19.5381 27.4303 20.2983 25.2988 21.7226C23.1672 23.1468 21.5058 25.1712 20.5248 27.5397C19.5437 29.9082 19.287 32.5144 19.7872 35.0287C20.2873 37.5431 21.5218 39.8527 23.3345 41.6655C25.1473 43.4782 27.4569 44.7127 29.9713 45.2129C32.4856 45.713 35.0918 45.4563 37.4603 44.4752C39.8288 43.4942 41.8532 41.8328 43.2774 39.7013C44.7017 37.5697 45.4619 35.0636 45.4619 32.5C45.4576 29.0636 44.0905 25.7693 41.6606 23.3394C39.2308 20.9095 35.9364 19.5425 32.5 19.5381Z"
                fill="black"
              />
              <path
                d="M51.1101 20.6896C54.3718 20.6896 57.0159 18.0454 57.0159 14.7837C57.0159 11.522 54.3718 8.87784 51.1101 8.87784C47.8484 8.87784 45.2042 11.522 45.2042 14.7837C45.2042 18.0454 47.8484 20.6896 51.1101 20.6896Z"
                fill="black"
              />
              <path
                d="M58.3807 20.7187L58.1331 20.1754L57.7383 20.6223C56.771 21.7207 55.5473 22.5633 54.176 23.075L53.7951 23.2146L53.95 23.5866C55.1303 26.4098 55.7363 29.44 55.7324 32.5C55.7324 45.3121 45.3096 55.7324 32.5 55.7324C19.6904 55.7324 9.26758 45.3121 9.26758 32.5C9.26758 19.6879 19.6879 9.26758 32.5 9.26758C35.9455 9.26038 39.3485 10.0284 42.4569 11.5146L42.8213 11.6797L42.98 11.309C43.5587 9.96505 44.4595 8.78432 45.6028 7.87109L46.0688 7.49912L45.5394 7.23633C41.5126 5.14206 37.0388 4.05314 32.5 4.0625C16.82 4.0625 4.0625 16.82 4.0625 32.5C4.0625 48.18 16.82 60.9375 32.5 60.9375C48.18 60.9375 60.9375 48.18 60.9375 32.5C60.9442 28.4345 60.072 24.4157 58.3807 20.7187Z"
                fill="black"
              />
            </motion.svg>
          </div>
        </motion.div>
      </section>

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
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <OrderForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
