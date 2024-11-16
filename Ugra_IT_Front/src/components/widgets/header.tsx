import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useUserStore from "@/store/useUserStore";
const Header = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <header className="w-full py-[35px]">
      <div className="container mx-auto px-[16px] ">
        <div className="flex justify-between inner">
          <div className="logo">
            <Link to={"/event"}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <ul className="flex items-center justify-center gap-[30px]">
            <li>
              <Link to={"/tests"}>Тесты</Link>
            </li>
            <li>
              <Link to={"/event"}>Мероприятия</Link>
            </li>
            <li>
              <Link to={"/toys"}>Плюшки</Link>
            </li>
            <li>
              <Link to={"/grants"}>Гранты</Link>
            </li>
            <li>
              <Link
                className="cursor-pointer hover:bg-background p-[15px] hover:rounded-lg"
                to={"/navzlet-ai"}
              >
                На взлёт! AI
              </Link>
            </li>
            <li>
              <Link to={"/courses"}>Курсы</Link>
            </li>
          </ul>
          {!user ? (
            <Button variant={"outline"}>Войти</Button>
          ) : (
            <Link to={"/account"} className="flex items-center gap-[20px]">
              <div className="w-[40px] h-[40px] rounded-full bg-gray-700" />
              <span>{` ${user.surname}  ${user.name} ${user.middleName}`}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
