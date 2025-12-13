"use client";
import React, {
  useRef,
  useEffect,
  useState,
  memo,
  lazy,
  Suspense,
} from "react";
import {
  motion,
  useInView,
  useAnimation,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import "./swiper.scss";

const LazyOrderForm = lazy(() => import("../form/OrderForm"));

const videoUrl =
  "https://cdn.shopify.com/videos/c/o/v/b39d139978eb498fa1f52be8261cdfbb.mp4";

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

const cardData = [
  ...initialCardData.map((card) => ({ ...card, uniqueId: `c-${card.id}-1` })),
  ...initialCardData.map((card) => ({
    ...card,
    name: card.name.replace(/\d+ yosh/, "30 yosh"),
    uniqueId: `c-${card.id}-2`,
  })),
  ...initialCardData.map((card) => ({
    ...card,
    name: card.name.replace(/\d+ yosh/, "40 yosh"),
    uniqueId: `c-${card.id}-3`,
  })),
];

const mobileSwiperData = [
  {
    id: 1,
    name: "Dildora - 32 yosh",
    text: "Meni anchadan beri bu muammo qiynab kelar edi. Har xil vositalarni qo‘llab ko‘rdim biroq foyda bermadi. Bir tanishim “Dermozil” kremini taklif qildi. Yana bir bor oyoq zamburug‘idan xalos bo‘lishga urinib ko‘dim. Bir haftadan so‘ng tirnoqlarim avvalgi sog‘lom ko‘rinishiga qaytdi. Natijadan juda xursandman. Ushbu mahsulotni tavsiya qilaman.",
    img1: "/healt.svg",
    img2: "/worth.svg",
    img3: "/smile.svg",
    img4: "/collapse_dermo.svg",
    img5: "/flacon-dermo.svg",
  },
  {
    id: 2,
    name: "Sarvar - 28 yosh",
    text: "Zamburug' sababli yozda ochiq poyabzal kiyishga uyalardim. Bu muammo ko'pdan beri bor edi. Dermozil kremni ishlatganimdan so'ng, atigi 10 kun ichida katta natijani ko'rdim. Oldin qancha dorilarni ishlatdim, foydasi bo'lmagandi. Endi tirnoqlarim toza va sog'lom. Men kabi muammoingiz bo'lsa, albatta sinab ko'ring.",
    img1: "/healt.svg",
    img2: "/worth.svg",
    img3: "/smile.svg",
    img4: "/collapse_dermo.svg",
    img5: "/flacon-dermo.svg",
  },
  {
    id: 3,
    name: "Fotima - 45 yosh",
    text: "Uzoq yillar davomida kurashdim, har xil usullarni qo'lladim, lekin faqatgina vaqtincha yordam berardi. Dermozil boshqa sinab ko'rgan dorilarimdan mutlaqo farq qildi. Ta'siri tez va doimiy bo'ldi. Nihoyat, oyoqlarim yengillashdi va estetik ko'rinishi yaxshilandi. Doimiy samarasi uchun hammaga tavsiya qilaman.",
    img1: "/healt.svg",
    img2: "/worth.svg",
    img3: "/smile.svg",
    img4: "/collapse_dermo.svg",
    img5: "/flacon-dermo.svg",
  },
  {
    id: 4,
    name: "Jasur - 35 yosh",
    text: "Sport bilan shug'ullanganim uchun tez-tez bu muammoga duch kelardim. Oyoqlarimda qichishish va tirnoqlarimda o'zgarishlar sezilardi. Bu kremdan foydalanish oson va natijasi darhol seziladi. Avvalgilariga nisbatan ancha samarali ekan. Endi uni profilaktika uchun ham qo'llayman. Juda qoniqarli natija!",
    img1: "/healt.svg",
    img2: "/worth.svg",
    img3: "/smile.svg",
    img4: "/collapse_dermo.svg",
    img5: "/flacon-dermo.svg",
  },
];

const Swiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const containerRef = useRef(null);
  const swiperControls = useAnimation();
  const x = useMotionValue(0);

  const [totalScrollWidth, setTotalScrollWidth] = useState(0);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);
  const totalMobileSlides = mobileSwiperData.length;

  const handlePrev = () => {
    setMobileCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNext = () => {
    setMobileCurrentIndex((prevIndex) =>
      prevIndex < totalMobileSlides - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const calculateWidth = () => {
    if (containerRef.current) {
      const cards = Array.from(containerRef.current.children);
      if (cards.length > 0) {
        const cardCount = initialCardData.length;

        const rootStyle = getComputedStyle(document.documentElement);
        const gapValue =
          parseFloat(
            rootStyle.getPropertyValue("--card-gap").replace("px", "")
          ) || 120;

        const singleCardWidth = cards[0]?.offsetWidth || 571;

        const widthOfOneSet =
          singleCardWidth * cardCount + gapValue * (cardCount - 1);

        setTotalScrollWidth(widthOfOneSet);
      }
    }
  };

  useEffect(() => {
    calculateWidth();
    const resizeListener = () => {
      setTimeout(calculateWidth, 500);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    if (totalScrollWidth === 0) return;

    const startAnimation = async () => {
      setIsAnimationRunning(true);
      await swiperControls.start({
        x: -totalScrollWidth,
        transition: {
          x: {
            duration: 45,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      });
    };

    swiperControls.stop();
    startAnimation();

    return () => {
      swiperControls.stop();
      setIsAnimationRunning(false);
    };
  }, [totalScrollWidth, swiperControls]);

  return (
    <section className={`sale contain ${isModalOpen ? "modal-open" : ""}`}>
      <motion.h2
        className="what-brings__title swiper__title"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Ariza qoldiring va <span className="sale__span">50% chegirmaga</span>{" "}
        ega bo‘ling va tirnoqlaringizdagi zamburug‘dan butunlay xalos bo‘ling
      </motion.h2>

      <motion.div
        className="intro__form  swiper__form"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
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
        <p className="intro__bottom-form-text swiper__form__text">
          50% chegirma
        </p>
      </motion.div>

      <div className="sale__swiper-wrapper">
        <motion.div
          className="sale__cards"
          ref={containerRef}
          animate={swiperControls}
          style={{ x }}
        >
          {cardData.map((card) => (
            <motion.div key={card.uniqueId} className="sale__items">
              <img
                src="/comment.svg"
                alt="Foydalanuvchi fikri fon rasmi"
                className="sale__item-image"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mobile-swiper-container">
          <div className="swiper-wrapper">
            {mobileSwiperData.map((item, index) => (
              <AnimatePresence initial={false} key={item.id}>
                {index === mobileCurrentIndex && (
                  <motion.div
                    className="mobile__swiper"
                    initial={{
                      opacity: 0,
                      x:
                        mobileCurrentIndex > index
                          ? 100
                          : mobileCurrentIndex < index
                          ? -100
                          : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x:
                        mobileCurrentIndex > index
                          ? -100
                          : mobileCurrentIndex < index
                          ? 100
                          : 0,
                      position: "absolute",
                    }}
                    transition={{ type: "tween", duration: 0.4 }}
                  >
                    <div className="mobile__wrapper">
                      <div className="mobile__top">
                        <img src={item.img3} className="smile" alt="Icon" />
                        <div>
                          <img src={item.img1} alt="Rasm 1" />
                          <img src={item.img2} alt="Rasm 2" />
                        </div>
                      </div>
                      <div className="mobile__middle">
                        <h2 className="mobile__title">{item.name}</h2>
                        <p className="mobile__text">{item.text}</p>
                      </div>
                      <div className="mobile__bottom">
                        <img
                          className="collapse"
                          src={item.img4}
                          alt="Katta mahsulot"
                        />
                        <img className="flacon" src={item.img5} alt="Flakon" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          <div className="swiper-navigation">
            <button
              type="button"
              className="nav-btn prev-btn"
              onClick={handlePrev}
              disabled={mobileCurrentIndex === 0}
            >
              &larr;
            </button>
            <div className="pagination">
              {mobileSwiperData.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    index === mobileCurrentIndex ? "active" : ""
                  }`}
                ></span>
              ))}
            </div>
            <button
              type="button"
              className="nav-btn next-btn"
              onClick={handleNext}
              disabled={mobileCurrentIndex === totalMobileSlides - 1}
            >
              &rarr;
            </button>
          </div>
        </div>
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

              <Suspense fallback={<div>Yuklanmoqda...</div>}>
                <LazyOrderForm onCloseModal={closeModal} />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default memo(Swiper);
