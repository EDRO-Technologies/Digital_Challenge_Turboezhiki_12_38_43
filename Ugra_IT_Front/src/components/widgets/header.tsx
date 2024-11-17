import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import useUserStore from "@/store/useUserStore";

const Header = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  const links = [
    { path: "/tests", label: "Тесты" },
    { path: "/event", label: "Мероприятия" },
    { path: "/toys", label: "Меры поддержки" },
    { path: "/grants", label: "Гранты" },
    { path: "/navzlet-ai", label: "На взлёт! AI" },
    { path: "/courses", label: "Курсы" },
  ];

  return (
    <header className="w-full py-[35px]">
      <div className="container mx-auto px-[16px] ">
        <div className="flex justify-between inner">
          <div className="logo">
            <Link to={"/"}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <ul className="flex items-center justify-center gap-[30px]">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  className={`cursor-pointer p-[15px] hover:bg-background hover:rounded-lg ${
                    location.pathname === link.path
                      ? "bg-background text-bold"
                      : ""
                  } ${
                    link.path === "/navzlet-ai"
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                      : ""
                  }`}
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user ? (
            <Button variant={"outline"}>Войти</Button>
          ) : (
            <Link to={"/account"} className="flex items-center gap-[20px]">
              <div className="w-[40px] h-[40px] rounded-full bg-gray-700" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
