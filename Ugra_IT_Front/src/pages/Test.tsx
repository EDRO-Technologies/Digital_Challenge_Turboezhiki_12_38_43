import { Button } from "@/components/ui/button";
import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/header";
import { Link } from "react-router-dom";

const Test = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col">
        <div className="w-full mt-[84px] mb-[61px]">
          <div className="container px-[16px] mx-auto">
            <div className="flex flex-col gap-[20px]">
              <h1 className="text-[70px] text-[#273145] font-bold">
                Учись сегодня — создавай завтра!
              </h1>
              <div className="flex flex-col self-end">
                <span>
                  Онлайн и офлайн курсы для программистов всех уровней.{" "}
                </span>
                <span>Выбирай направление и развивай навыки!</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#E9EEFF]">
          <div className="container px-[16px] mx-auto">
            <div className="flex flex-wrap gap-[10px] justify-between p-[10px] mb-[120px] border border-[#0C1C35] rounded-lg mt-[60px]">
              <Button className="text-[28px] p-[20px]" variant={"ghost"}>
                Программирование
              </Button>
              <Button className="text-[28px]" size={"lg"}>
                Дизайн
              </Button>
              <Button className="text-[28px]" variant={"ghost"} size={"lg"}>
                Маркетинг
              </Button>
              <Button className="text-[28px]" variant={"ghost"}>
                Аналитика
              </Button>
            </div>
            <div className="flex gap-[25px]">
              <div className="flex flex-col bg-background p-[23px] rounded-[45px]">
                <Button className="mb-[60px] self-end" variant={"outline"}>
                  Учиться
                </Button>

                <h1 className="mb-[90px] text-[#0C1C35] text-[28px]">
                  Аналитик
                </h1>
                <span>Срок обучения 12 месяцев</span>
              </div>
              <div className="flex flex-col bg-background p-[23px] rounded-[45px]">
                <Button className="mb-[60px] self-end" variant={"outline"}>
                  Учиться
                </Button>

                <h1 className="mb-[90px] text-[#0C1C35] text-[28px]">
                  Веб-дизайнер
                </h1>
                <span>Срок обучения 12 месяцев</span>
              </div>
              <div className="flex flex-col bg-background p-[23px] rounded-[45px]">
                <Button className="mb-[60px] self-end" variant={"outline"}>
                  Учиться
                </Button>

                <h1 className="mb-[90px] text-[#0C1C35] text-[28px]">
                  Графический-дизайнер
                </h1>
                <span>Срок обучения 12 месяцев</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Test;
