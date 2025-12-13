"use client";

import React, { useRef, useState, memo, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./brings.scss";

// 1. ✅ OrderForm komponentini React.lazy orqali dinamik import qilish
const LazyOrderForm = lazy(() => import("../form/OrderForm"));

const VIDEO_URL_BRINGS_LEFT =
  "https://cdn.shopify.com/videos/c/o/v/6e60b4bc6a804972b4352d901421e8ff.mp4";

const Brings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  // Animatsiya variantlari (o'zgarishsiz, chunki ular allaqachon yaxshi optimallashtirilgan)
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

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, delay: 0.1 } },
  };

  const videoLeftVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        delay: 0.4,
      },
    },
  };



  return (
    <div className={`wrapper ${isModalOpen ? "modal-open" : ""}`}>
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
          <motion.div
            className="what-brings__left"
            variants={videoLeftVariants}
          >
            <video
              src={VIDEO_URL_BRINGS_LEFT}
              controls
              playsInline
              autoPlay
              loop
              muted
              // Videoni qulaylik uchun style obyektida qoldirdim
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "350px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            >
              Browseringiz video tagini qo'llab-quvvatlamaydi.
            </video>
          </motion.div>

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
                onClick={openModal}
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
              {/* 2. ✅ LazyOrderForm va Suspense ishlatildi */}
              <Suspense fallback={<div>Yuklanmoqda...</div>}>
                <LazyOrderForm onCloseModal={closeModal} />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 3. ✅ Komponentni React.memo bilan o'rash
export default memo(Brings);
