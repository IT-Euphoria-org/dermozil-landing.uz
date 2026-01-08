"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./orderform.scss";
import Confetti from "../confetti/Confetti";
import { Snackbar } from "../ui/Snackbar";

const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
      fill="currentColor"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 15.5C18.71 15.5 17.43 15.26 16.24 14.77C15.86 14.62 15.42 14.71 15.13 15.01L13.12 17.02C10.7 15.74 8.26 13.3 6.98 10.88L8.99 8.87C9.29 8.58 9.38 8.14 9.23 7.76C8.74 6.57 8.5 5.29 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 12.35 10.65 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z"
      fill="currentColor"
    />
  </svg>
);

const OrderForm = ({ onCloseModal }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Snackbar holati
  const [snackbar, setSnackbar] = useState({ isVisible: false, message: "" });

  const showNotice = (msg) => {
    setSnackbar({ isVisible: true, message: msg });
  };

  useEffect(() => {
    if (snackbar.isVisible) {
      const timer = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, isVisible: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.isVisible]);

  const formatPhoneNumber = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    let formatted = "+998";

    if (cleaned.length < 4) return formatted;
    formatted += " " + cleaned.substring(3, 5);
    if (cleaned.length >= 6) formatted += " " + cleaned.substring(5, 8);
    if (cleaned.length >= 9) formatted += " " + cleaned.substring(8, 10);
    if (cleaned.length >= 11) formatted += " " + cleaned.substring(10, 12);

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const cleanedValue = e.target.value.replace(/\D/g, "");
    if (cleanedValue.length > 12) return;
    setPhone(formatPhoneNumber(cleanedValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const digitsOnly = phone.replace(/\D/g, "");

    if (!name.trim()) {
      showNotice("Iltimos, ismingizni kiriting.");
      return;
    }

    if (digitsOnly.length !== 12) {
      showNotice("Telefon raqamini to'liq kiriting.");
      return;
    }

    setIsLoading(true);

    const payload = {
      full_name: name,
      phone_number: `+${digitsOnly}`,
      product_name: "Dermozil",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DERMOZIL}/leads/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        setName("");
        setPhone("");

        setTimeout(() => {
          setIsSuccess(false);
          if (onCloseModal) onCloseModal();
        }, 5000);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      showNotice("Xatolik yuz berdi! Server bilan bog'lanib bo'lmadi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        isVisible={snackbar.isVisible}
        message={snackbar.message}
        onClose={() => setSnackbar((prev) => ({ ...prev, isVisible: false }))}
      />

      {isSuccess && <Confetti key="confetti" />}

      <motion.section
        className="order-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="order-header">
          <h1>
            ARIZA QOLDIRING VA 50% CHEGIRMAGA EGA BO'LING VA TIRNOQLARINGIZDAGI
            ZAMBURUG'DAN BUTUNLAY XALOS BO'LING
          </h1>
        </div>

        <div className="order-content">
          <div className="products-image">
            <motion.img
              className="order-images"
              width="400"
              src="/introcrem.png"
              alt="Dermozil"
            />
            <motion.img width="400" src="/introcard.png" alt="Dermozil card" />
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            <label htmlFor="name">Ismingizni kiriting:</label>
            <motion.div className="input-group" whileHover={{ scale: 1.01 }}>
              <i className="icon-user">
                <UserIcon />
              </i>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                required
              />
            </motion.div>

            <label htmlFor="phone">Telefon raqamingizni kiriting:</label>
            <motion.div className="input-group" whileHover={{ scale: 1.01 }}>
              <i className="icon-phone">
                <PhoneIcon />
              </i>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 90 123 45 67"
                required
              />
            </motion.div>

            <div className="intro__form often__form">
              <motion.button
                type="submit"
                className="intro__button often__form-button"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? "Yuborilmoqda..." : "Buyurtma berish"}
              </motion.button>
              <p className="intro__bottom-form-text often__form-text">
                50% chegirma
              </p>
            </div>
          </form>

          <div className="gift-box">
            <div className="tag">SOV'G'A</div>
            <img width="200" src="/introflacon.png" alt="Sovg'a" />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default OrderForm;
