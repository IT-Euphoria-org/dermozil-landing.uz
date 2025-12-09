"use client";
import React, {
  useState,
  useRef,
  memo, // ✅ memo import qilindi
  lazy, // ✅ lazy import qilindi
  Suspense, // ✅ Suspense import qilindi
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "./faq.scss";
// import OrderForm from "../form/OrderForm"; // To'g'ridan-to'g'ri import o'rniga lazy loading ishlatiladi

// 1. ✅ OrderForm komponentini dinamik import qilish
const LazyOrderForm = lazy(() => import("../form/OrderForm"));

// FAQ ma'lumotlari komponent tashqarisida qoldirildi (Yaxshi amaliyot)
const faqData = [
  {
    id: 1,
    question: "Tirnoq zamburug‘ini davolash uchun krem menga mos keladimi?",
    answer:
      "Ha, Dermozil kremi turli yoshdagi odamlar va oyoq/tirnoq zamburug'ining turli bosqichlari uchun mos keladi. Tarkibidagi tabiiy ingrediyentlar tufayli deyarli barcha teri turlariga moslashadi. Ammo allergiyaga moyilligingiz bo'lsa, avval kichik joyda sinab ko'rish tavsiya etiladi.",
  },
  {
    id: 2,
    question: "Tirnoq zamburug‘ini davolash uchun krem xavfsizmi?",
    answer:
      "Dermozil kremi faqat tabiiy o'simlik ekstraktlari va minerallardan tashkil topgan. Uning tarkibida agressiv kimyoviy moddalar, GML (Genetik Modifikatsiyalangan Organizmlar) yoki sun'iy bo'yoqlar yo'q. Shuning uchun u uzoq muddatli va xavfsiz foydalanish uchun juda mos keladi.",
  },
  {
    id: 3,
    question: "Nechta tuba buyurtma qilishim kerak?",
    answer:
      "Optimal va to'liq davolash kursi uchun odatda 3-4 hafta davomida kuniga 2 marta qo'llash tavsiya etiladi. Davolanish qanchalik tez boshlansa, shuncha kam krem kerak bo'ladi. Ko'pchilik mijozlarimiz to'liq kurs uchun kamida 2-3 ta tuba buyurtma qilishadi.",
  },
  {
    id: 4,
    question: "Ushbu mahsulotdan qanday qilib yaxshiroq foydalanish mumkin?",
    answer:
      "Ta'sirlangan joyni iliq suvda yuvib, quruq artish tavsiya etiladi. Keyin kremni yupqa qatlam qilib surting va butunlay singdiring. Eng yaxshi natijaga erishish uchun buni kuniga ikki marta - ertalab va kechqurun takrorlang. Oyoq kiyimlaringizni tez-tez dezinfeksiya qiling.",
  },
  {
    id: 5,
    question: "Agar to‘g‘ri kelmasa-chi?",
    answer:
      "Biz mahsulotimiz sifatiga va samaradorligiga kafolat beramiz. Agar mahsulot sizga mutlaqo mos kelmasa yoki kutilgan natijani bermasa, bizning qo'llab-quvvatlash xizmatimizga murojaat qiling. Biz vaziyatni ko'rib chiqamiz va pulni qaytarish yoki almashtirish bo'yicha yechim topamiz.",
  },
  {
    id: 6,
    question: "Asosiy tarkibiy qismlari nimalardan iborat?",
    answer:
      "Krem tarkibida choy daraxti yog'i, propolis ekstrakti, salitsil kislotasi va vitaminlar majmuasi mavjud. Bu tabiiy komponentlar zamburug'ga qarshi, yallig'lanishga qarshi va regenerativ xususiyatlarga ega bo'lib, tirnoqni tiklashga yordam beradi.",
  },
];

// Animatsiya variantlari (o'zgarishsiz)
const contentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    paddingTop: "15px",
    transition: {
      height: { duration: 0.4, ease: "easeInOut" },
      opacity: { duration: 0.25, delay: 0.1 },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    paddingTop: "0px",
    transition: {
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.25 },
    },
  },
};

const chevronVariants = {
  open: { rotate: 180, transition: { duration: 0.3 } },
  closed: { rotate: 0, transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Faq = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [openItemId, setOpenItemId] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const toggleItem = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div
      className={`wrapper often__wrapper ${isModalOpen ? "modal-open" : ""}`}
    >
      <motion.section
        className="often"
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 className="what-brings__title" variants={itemVariants}>
          Tez-tez beriladigan savollar
        </motion.h2>

        <motion.div className="often__center" variants={itemVariants}>
          <div className="often__left">
            <motion.h2 className="often__title" variants={itemVariants}>
              SAVOL-JAVOBLAR
            </motion.h2>
            <div className="often__cards">
              {faqData.map((item) => (
                <motion.div
                  key={item.id}
                  className={`often__item-container ${
                    openItemId === item.id ? "expanded" : ""
                  }`}
                  variants={itemVariants}
                >
                  <div
                    className="often__items"
                    onClick={() => toggleItem(item.id)}
                  >
                    <p className="often__items-text">{item.question}</p>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      variants={chevronVariants}
                      animate={openItemId === item.id ? "open" : "closed"}
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>

                  <AnimatePresence initial={false}>
                    {openItemId === item.id && (
                      <motion.div
                        className="often__answer"
                        key="content"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={contentVariants}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="often__answer-content">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="often__right"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="./images/often-questions-img.png"
              alt="Ayolning oyoqlarini davolash"
            />
            <div className="often__right-box">
              <p className="often__items-text">Savollar va javoblar</p>
              <h2 className="often__right-box-title">
                Yana savollaringiz bormi?
              </h2>
              <motion.button
                className="often__right-button"
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Biz bilan bog‘laning
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

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
            {/* Modal kontenti konteyneri */}
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

// 3. ✅ Komponentni memo bilan o'rash
export default memo(Faq);
