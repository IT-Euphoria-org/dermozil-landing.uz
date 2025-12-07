import Brings from "@/components/bring/Brings";
import Header from "@/components/header/Header";
import React from "react";
import "../styles/fonts.css";
import Effect from "@/components/effect-symp/Effect";
import Best from "@/components/best/Best";
import SaleSection from "@/components/swiper/Swiper";
import Faq from "@/components/faq/Faq";
import OrderForm from "@/components/form/OrderForm";
const page = () => {
  return (
    <div>
      <Header />
      <Brings />
      <Effect />
      <Best />
      <SaleSection />
      <Faq />
    </div>
  );
};

export default page;
