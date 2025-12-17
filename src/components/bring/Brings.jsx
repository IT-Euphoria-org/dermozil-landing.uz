"use client";

import React, { useRef, useState, memo, lazy, Suspense } from "react";
// Framer Motion faqat Modal uchun qoldirildi, qolgan joydan olib tashlandi
import { AnimatePresence, motion } from "framer-motion";
import "./brings.scss";

const LazyOrderForm = lazy(() => import("../form/OrderForm"));

const VIDEO_URL_BRINGS_LEFT =
  "https://cdn.shopify.com/videos/c/o/v/6e60b4bc6a804972b4352d901421e8ff.mp4";

const Brings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // Wrapper ichidagi modal-open klassi orqali animatsiyani CSS-da boshqaramiz
    <div className={`wrapper ${isModalOpen ? "modal-open" : ""}`}>
      <section className="what-brings">
        <h2 className="what-brings__title">
          TIRNOQ ZAMBURUG‘INI NIMA KELTIRIB CHIQARADI?
        </h2>

        <div className="what-brings__bottom">
          <div className="what-brings__left">
            <video
              // 1. ✅ preload="none" - Sayt yuklanganda videoni yuklamaydi (Tezlik uchun)
              preload="none"
              // 2. ✅ poster - Video yuklanguncha rasm ko'rsatadi (LCP uchun)
              poster="/images/video-poster.webp"
              controls
              playsInline
              muted
              loop
              autoPlay
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "350px",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block", // Layout shift oldini oladi
              }}
            >
              <source src={VIDEO_URL_BRINGS_LEFT} type="video/mp4" />
              Browseringiz video tagini qo'llab-quvvatlamaydi.
            </video>
          </div>

          <div className="what-brings__right">
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
              <button
                type="button"
                className="intro__button"
                onClick={openModal}
              >
                Buyurtma berish
              </button>
              <p className="intro__bottom-form-text">50% chegirma</p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>
              <Suspense fallback={<div className="loader">Yuklanmoqda...</div>}>
                <LazyOrderForm onCloseModal={closeModal} />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brings;
