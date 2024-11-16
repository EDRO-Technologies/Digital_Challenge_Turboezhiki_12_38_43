import Header from "@/components/widgets/header";
import React from "react";
import Template1 from "../assets/Template1.jpg";
import Template2 from "../assets/Template2.jpg";
import Template3 from "../assets/Template3.jpg";
import Arrow from "../assets/Arrow.svg";
import { Button } from "@/components/ui/button";

const Event = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className=" bg-custom-gradient min-h-[80vh]">
        <div className="container mx-auto px-[16px]">
          <h1 className=" uppercase mt-[140px] text-[56px] font-bold text-white tracking-[-0.5px]">
            Твоя траектория успеха начинается здесь
          </h1>
        </div>
      </div>
      <div className="w-full">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[18px]">
            <h1 className="uppercase text-[80px]">Мероприятия</h1>
            <div className="cards flex flex-col gap-[20px]">
              <div className="flex gap-[43px] bg-white rounded-[45px] p-[20px]">
                <div className="flex gap-[43px]  rounded-[45px]">
                  <img src={Template1} alt="template1" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <div className="flex flex-col flex-1 text">
                    <div className="flex gap-[19px]">
                      <div className="bg-[#F4F5FF] text-[18px] px-[20px] rounded-[30px] py-[10px]">
                        До начала осталось
                      </div>
                      <div className="bg-[#F4F5FF] text-[18px] px-[20px] rounded-[30px] py-[10px]">
                        Хакатон
                      </div>
                    </div>

                    <h1 className="text-[42px]"> Digital challenge</h1>
                    <span className="text-[22px]"> Дата: 16-17 ноября</span>
                    <span className="text-[22px]"> Время: 10:00</span>
                    <span className="text-[22px]">
                      Место: г. Сургут, школа 21
                    </span>
                  </div>
                  <Button
                    variant={"outline"}
                    size={"default"}
                    className="self-end text-[20px]"
                  >
                    Участвовать
                    <img src={Arrow} alt="#" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-[43px] bg-white rounded-[45px] p-[20px]">
                <div className="flex gap-[43px]  rounded-[45px]">
                  <img src={Template2} alt="template1" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <div className="flex flex-col flex-1 text">
                    <div className="flex gap-[19px]">
                      <div className="bg-[#F4F5FF] text-[18px] px-[20px] rounded-[30px] py-[10px]">
                        До начала осталось
                      </div>
                      <div className="bg-[#F4F5FF] text-[18px] px-[20px] rounded-[30px] py-[10px]">
                        Хантатон 2024
                      </div>
                    </div>

                    <h1 className="text-[42px]"> Digital challenge</h1>
                    <span className="text-[22px]"> Дата: 16-17 ноября</span>
                    <span className="text-[22px]"> Время: 10:00</span>
                    <span className="text-[22px]">
                      Место: г. Сургут, школа 21
                    </span>
                  </div>
                  <Button
                    variant={"outline"}
                    size={"default"}
                    className="self-end text-[20px]"
                  >
                    Участвовать
                    <img src={Arrow} alt="#" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
