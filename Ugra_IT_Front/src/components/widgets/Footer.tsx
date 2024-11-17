import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex bg-main-gradient py-[71px]">
      <div className="container mx-auto px-[16px]">
        <div className="flex items-center gap-[87px]">
          <div className="flex flex-col text-white gap-[30px]">
            <Link to={"/account"} className="flex flex-col">
              Личный кабинет
            </Link>
            <Link to={"/signup"} className="flex flex-col">
              Регистрация
            </Link>
          </div>
          <div className="flex flex-col text-white gap-[30px]">
            <div className="flex flex-col">Гранты</div>
            <div className="flex flex-col">Курсы</div>
          </div>
          <div className="flex flex-col text-white gap-[30px]">
            <div className="flex flex-col">Меры поддержки</div>
            <div className="flex flex-col">Тесты</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
