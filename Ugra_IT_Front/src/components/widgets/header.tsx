import React from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const Header = () => {
  return (
    <header className="w-full py-[35px]">
      <div className="container mx-auto px-[16px] ">
        <div className="flex justify-between inner">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>

          <ul className="flex items-center justify-center gap-[30px]">
            <li>
              <Link to={"/tests"}>Тесты</Link>
            </li>
            <li>
              <Link to={"/events"}>Мероприятия</Link>
            </li>
            <li>
              <Link to={"/toys"}>Плюшки</Link>
            </li>
            <li>
              <Link to={"/grants"}>Гранты</Link>
            </li>
            <li>
              <Link to={"/courses"}>Курсы</Link>
            </li>
          </ul>
          <Button variant={"outline"}>Войти</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
