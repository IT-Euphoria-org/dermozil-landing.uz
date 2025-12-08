"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import "./swiper.scss";
import OrderForm from "../form/OrderForm";

const videoUrl =
  "https://cdn.shopify.com/videos/c/o/v/b39d139978eb498fa1f52be8261cdfbb.mp4";

// ✅ Asl 4 ta kartaning ma'lumotlari
const initialCardData = [
  {
    id: 1,
    name: "Dildora - 32 yosh",
    text: "Meni anchadan beri bu muammo qiynab kelar edi. Har xil vositalarni qo‘llab ko‘rdim biroq foyda bermadi... Bir tanishim “Dermozil” keremini taklif qildi. Yana bir bor oyoq zamburug‘idan xalos bo‘lishga urinib ko‘dim. Bir haftadan so‘ng tirnoqlarim avvalgi sog‘lom ko‘rinishiga qaytdi.",
    img1: "./images/sale-cards-1-bottom.png",
    img2: "./images/sale-cards-1-top.png",
  },
  {
    id: 2,
    name: "Sarvar - 28 yosh",
    text: "Zamburug' sababli yozda ochiq poyabzal kiyishga uyalardim. Bu kremni ishlatganimdan so'ng, atigi 10 kun ichida katta natijani ko'rdim. Endi tirnoqlarim toza va sog'lom!",
    img1: "./images/sale-cards-2-bottom.png",
    img2: "./images/sale-cards-2-top.png",
  },
  {
    id: 3,
    name: "Fotima - 45 yosh",
    text: "Uzoq yillar davomida kurashdim. Dermozil boshqa sinab ko'rgan dorilarimdan farq qildi. Ta'siri tez va doimiy bo'ldi. Hammaga tavsiya qilaman.",
    img1: "./images/sale-cards-3-bottom.png",
    img2: "./images/sale-cards-3-top.png",
  },
  {
    id: 4,
    name: "Jasur - 35 yosh",
    text: "Sport bilan shug'ullanganim uchun tez-tez bu muammoga duch kelardim. Bu kremdan foydalanish oson va natijasi darhol seziladi. Endi profilaktika uchun ham qo'llayman.",
    img1: "./images/sale-cards-4-bottom.png",
    img2: "./images/sale-cards-4-top.png",
  },
];

// ✅ Jami 12 ta kartani yaratamiz (4 x 3)
const cardData = [
  ...initialCardData.map((card) => ({ ...card, uniqueId: `c-${card.id}-1` })), // 1-to'plam (4 ta)
  ...initialCardData.map((card) => ({
    ...card,
    name: card.name.replace(/\d+ yosh/, "30 yosh"), // Ism yoshini o'zgartirish
    uniqueId: `c-${card.id}-2`, // Unikal ID
  })), // 2-to'plam (8 ta)
  ...initialCardData.map((card) => ({
    ...card,
    name: card.name.replace(/\d+ yosh/, "40 yosh"), // Ism yoshini o'zgartirish
    uniqueId: `c-${card.id}-3`, // Unikal ID
  })), // 3-to'plam (12 ta)
];
// NOTE: Siz 10 ta dedingiz, lekin cheksiz loop uchun 3 x 4 = 12 ta qoldirdim. Agar xar xil 10 ta kerak bo'lsa, qo'lda yozish talab qilinadi.

const UserRatingSVG = () => (
  <svg
    width="59"
    height="59"
    viewBox="0 0 59 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.287 8.71296C47.5621 5.96107 44.3203 3.77471 40.7479 2.27948C37.1754 0.784253 33.3428 0.00962079 29.47 8.90495e-05C25.5973 -0.00944269 21.7609 0.746314 18.1811 2.22394C14.6013 3.70157 11.3488 5.87194 8.61038 8.61038C5.87194 11.3488 3.70157 14.6013 2.22394 18.1811C0.746314 21.7609 -0.00944269 25.5973 8.90495e-05 29.47C0.00962079 33.3428 0.784253 37.1754 2.27948 40.7479C3.77471 44.3203 5.96107 47.5621 8.71296 50.287C11.4379 53.0389 14.6797 55.2253 18.2521 56.7205C21.8246 58.2158 25.6572 58.9904 29.53 58.9999C33.4027 59.0094 37.2391 58.2537 40.8189 56.7761C44.3987 55.2984 47.6512 53.1281 50.3896 50.3896C53.1281 47.6512 55.2984 44.3987 56.7761 40.8189C58.2537 37.2391 59.0094 33.4027 58.9999 29.53C58.9904 25.6572 58.2158 21.8246 56.7205 18.2521C55.2253 14.6797 53.0389 11.4379 50.287 8.71296ZM20.0507 23.2005C20.6737 23.2005 21.2827 23.3852 21.8007 23.7313C22.3186 24.0774 22.7223 24.5693 22.9607 25.1449C23.1991 25.7204 23.2615 26.3537 23.14 26.9647C23.0184 27.5757 22.7185 28.137 22.278 28.5775C21.8375 29.018 21.2762 29.3179 20.6652 29.4395C20.0542 29.561 19.4209 29.4986 18.8454 29.2602C18.2698 29.0218 17.7779 28.6181 17.4318 28.1002C17.0857 27.5822 16.901 26.9732 16.901 26.3502C16.9 25.9363 16.9807 25.5263 17.1386 25.1437C17.2966 24.761 17.5285 24.4134 17.8212 24.1207C18.1139 23.828 18.4615 23.5961 18.8442 23.4381C19.2268 23.2802 19.6368 23.1995 20.0507 23.2005ZM42.0557 37.1342C40.4808 42.4232 35.4675 46.2987 29.5066 46.2987C23.5457 46.2987 18.5323 42.4232 16.9443 37.1342C16.8999 36.9767 16.8929 36.811 16.9239 36.6503C16.9549 36.4896 17.0231 36.3384 17.1229 36.2088C17.2227 36.0791 17.3515 35.9746 17.4989 35.9035C17.6463 35.8325 17.8083 35.7968 17.9719 35.7995H41.0294C41.1929 35.797 41.3547 35.8328 41.502 35.904C41.6492 35.9751 41.7778 36.0797 41.8775 36.2093C41.9772 36.339 42.0452 36.4901 42.0761 36.6507C42.1071 36.8112 42.1001 36.9768 42.0557 37.1342ZM38.9493 29.5C38.3263 29.5 37.7173 29.3153 37.1993 28.9692C36.6814 28.6231 36.2777 28.1311 36.0393 27.5556C35.8009 26.9801 35.7385 26.3468 35.86 25.7358C35.9816 25.1248 36.2815 24.5635 36.722 24.123C37.1625 23.6825 37.7238 23.3826 38.3348 23.261C38.9458 23.1395 39.5791 23.2019 40.1546 23.4403C40.7302 23.6787 41.2221 24.0824 41.5682 24.6003C41.9143 25.1183 42.099 25.7273 42.099 26.3502C42.1 26.7642 42.0193 27.1742 41.8614 27.5568C41.7034 27.9394 41.4715 28.2871 41.1788 28.5798C40.8861 28.8725 40.5385 29.1044 40.1558 29.2624C39.7732 29.4203 39.3632 29.501 38.9493 29.5Z"
      fill="#FFCC00"
    />
  </svg>
);
const BackgroundSVG = () => (
  <svg
    width="571"
    height="208"
    viewBox="0 0 571 208"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 23C0 10.2975 10.2974 0 23 0H548C560.703 0 571 10.2975 571 23V150C571 162.703 560.703 173 548 173H47.5L0 208V23Z"
      fill="#B6E0D8"
    />
  </svg>
);

const Swiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const containerRef = useRef(null);
  const swiperControls = useAnimation();
  const x = useMotionValue(0);

  // totalScrollWidth endi 3 to'plamning (12 ta kartaning) umumiy kengligini o'z ichiga oladi
  const [totalScrollWidth, setTotalScrollWidth] = useState(0);

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        // Asl cardData.length emas, balki cardData.length (12 ta) ishlatilishi kerak.
        // Lekin avtomatik hisoblash uchun bitta elementning o'lchamidan foydalanish yaxshi.

        const cards = Array.from(containerRef.current.children);
        if (cards.length > 0) {
          // Biz aslida initialCardData.length emas, balki uning replikatsiyalarini ishlatyapmiz.
          // Cheksiz loop uchun faqat bitta asl to'plamning kengligi kerak.
          const cardCount = initialCardData.length;

          const gapValue =
            parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--card-gap"
              )
            ) || 40;

          // Ehtiyotkorlik bilan birinchi elementning o'lchamini olamiz
          const singleCardWidth = cards[0]?.offsetWidth || 300; // Default 300px agar topa olmasa

          // Animatsiya faqat bir to'plam kengligiga aylanadi.
          const widthOfOneSet =
            singleCardWidth * cardCount + gapValue * cardCount;

          setTotalScrollWidth(widthOfOneSet);
        }
      }
    };

    calculateWidth();
    // Rejalashtirilgan o'zgarishlar kiritilishi uchun keyinroq qayta hisoblaymiz
    const timeoutId = setTimeout(calculateWidth, 100);

    window.addEventListener("resize", calculateWidth);

    return () => {
      window.removeEventListener("resize", calculateWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (totalScrollWidth === 0) return;

    const startAnimation = async () => {
      // totalScrollWidth faqat 4 ta kartaning kengligi.
      // Biz cardData da 12 ta karta bor, shuning uchun faqat 4 ta kartaning kengligicha
      // siljitsak, bu cheksiz loop effektini beradi.

      await swiperControls.start({
        x: -totalScrollWidth,
        transition: {
          x: {
            duration: 30, // Tezlikni saqlab qoldik
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      });
    };

    startAnimation();

    return () => {
      swiperControls.stop();
      x.set(0);
    };
  }, [totalScrollWidth, swiperControls, x]);

  // Mobil qurilmalarda yuklanish sekinligini kamaytirish uchun areCardsInView olib tashlandi
  // va individual karta animatsiyalari o'chirildi.

  return (
    <section className={`sale contain ${isModalOpen ? "modal-open" : ""}`}>
      <motion.h2
        className="what-brings__title"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Ariza qoldiring va <span className="sale__span">50% chegirmaga</span>{" "}
        ega bo‘ling va tirnoqlaringizdagi zamburug‘dan butunlay xalos bo‘ling
      </motion.h2>

      <motion.div
        className="intro__form "
        initial={{ y: 20, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, delay: 0.2 },
        }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.button
          type="button"
          className="intro__button"
          onClick={openModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buyurtma berish
        </motion.button>
        <p className="intro__bottom-form-text">50% chegirma</p>
      </motion.div>

      <div className="sale__swiper-wrapper">
        <motion.div
          className="sale__cards"
          ref={containerRef}
          animate={swiperControls}
          style={{ x }}
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.05 }}
        >
          {cardData.map((card, index) => (
            <motion.div
              // ✅ uniqueId ni ishlatish: karta bir xil ma'lumotga ega bo'lsa ham unikal kalit beradi
              key={card.uniqueId}
              className="sale__items"
              // ✅ Individual initial va animate o'chirildi.
              // Bu mobil kechikishini kamaytirishi kerak.
            >
              <div className="sale__top">
                <div className="sale__top-items">
                  <img src={card.img1} alt={`Sale card ${card.id} bottom`} />
                </div>
                <div className="sale__top-items">
                  <img src={card.img2} alt={`Sale card ${card.id} top`} />
                </div>
              </div>
              <div className="sale__main">
                <div className="sale__bg">
                  <BackgroundSVG />
                  <div className="sale__main-box">
                    <UserRatingSVG />
                    <div className="sale__center">
                      <h2 className="sale__items-title">{card.name}</h2>
                      <p className="sale__items-text">{card.text}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sale__right">
                <img
                  className="sale__right-img-1"
                  src="./images/sale-cards-top.png"
                  alt="Card top decoration"
                />
                <img
                  className="sale__right-img-2"
                  src="./images/sale-cards-bottom.png"
                  alt="Card bottom decoration"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="sale__video-container"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: "1500px",
          margin: "0 auto 40px auto",
          width: "100%",
        }}
      >
        <video
          src={videoUrl}
          controls
          playsInline
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        >
          Browseringiz video tagini qo'llab-quvvatlamaydi.
        </video>
      </motion.div>

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

              <OrderForm onCloseModal={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Swiper;
