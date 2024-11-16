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
      <div className="mt-[46px] mb-[80px] ">
        <div className="container mx-auto px-[16px]">
          <h1 className=" uppercase  text-[56px] font-bold text-[#0C1C35] tracking-[-0.5px]">
            ПОГРУЖАЙСЯ В МИР IT-СОБЫТИЙ югры
          </h1>
          <span className="text-[#0C1C35]">
            Хакатоны, митапы и конкурсы ждут тебя. Сделай первый шаг к новым
            знаниям и знакомствам!
          </span>
        </div>
      </div>
      <div className="mb-[39px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex gap-[21px]">
            <Button className="italic">Все мероприятия</Button>
            <Button variant={"outline"} className="italic">
              Интенсивы
            </Button>
            <Button variant={"outline"} className="italic">
              Форумы
            </Button>
            <Button variant={"outline"} className="italic">
              Хакатоны
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full mb-[80px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[28px]">
            <div className="flex cards gap-[22px]">
              <div className="flex flex-1 flex-col gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template1} alt="template1" />
                <div className="flex flex-col">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>До начала осталось 7 дней 12 часов 46 минут</h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>Хакатон</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[30px] items-center">
                    <h1 className="text-[42px]">Хакатон 2024</h1>
                    <p className="text-center text-[22px]">
                      <span className="block">Дата: 30 ноября - 1 декабря</span>
                      <span className="block">Время: 10:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
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
              <div className="flex flex-1 flex-col gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template2} alt="template1" />
                <div className="flex flex-col">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>До начала осталось 7 дней 12 часов 46 минут</h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>Хакатон</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[30px] items-center">
                    <h1 className="text-[42px]">Хакатон 2024</h1>
                    <p className="text-center text-[22px]">
                      <span className="block">Дата: 30 ноября - 1 декабря</span>
                      <span className="block">Время: 10:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
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
            <div className="flex  gap-[31px] card bg-white border rounded-[45px] p-[13px]">
              <img src={Template3} alt="template1" />
              <div className="flex flex-col">
                <div className="flex gap-[20px]">
                  <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                    <h1>До начала осталось 7 дней 12 часов 46 минут</h1>
                  </div>
                  <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                    <h1>Хакатон</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-[30px] items-start">
                  <h1 className="text-[42px]">IT-форум</h1>
                  <p className=" text-left text-[22px]">
                    <span className="block">Дата: 30 ноября - 1 декабря</span>
                    <span className="block">Время: 10:00</span>
                    <span className="block">Место: г. Сургут, школа 21</span>
                  </p>
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
      <div className="bg-[#09147A] py-[85px]">
        <div className="container mx-auto px-[16px] text-white">
          <div className="flex flex-col w-full">
            <h1 className="uppercase text-[56px] mb-[65px] italic">
              Готовы узнать что-то новое?
            </h1>
            <h1 className="text-[64px] uppercase leading-3 font-bold">
              Записывайтесь
            </h1>
            <h1 className="text-[100px] uppercase font-bold self-center mr-[50px]">
              Прямо
            </h1>
            <h1 className="text-[70px] ml-[400px] uppercase font-bold self-center">
              Сейчас
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full mb-[80px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[28px]">
            <div className="flex mt-[22px] cards gap-[22px]">
              <div className="flex flex-1 flex-col gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template1} alt="template1" />
                <div className="flex flex-col">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>До начала осталось 7 дней 12 часов 46 минут</h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>Хакатон</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[30px] items-center">
                    <h1 className="text-[42px]">Хакатон 2024</h1>
                    <p className="text-center text-[22px]">
                      <span className="block">Дата: 30 ноября - 1 декабря</span>
                      <span className="block">Время: 10:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
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
              <div className="flex flex-1 flex-col gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template2} alt="template1" />
                <div className="flex flex-col">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>До начала осталось 7 дней 12 часов 46 минут</h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1>Хакатон</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[30px] items-center">
                    <h1 className="text-[42px]">Хакатон 2024</h1>
                    <p className="text-center text-[22px]">
                      <span className="block">Дата: 30 ноября - 1 декабря</span>
                      <span className="block">Время: 10:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
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
            <div className="flex  gap-[31px] card bg-white border rounded-[45px] p-[13px]">
              <img src={Template3} alt="template1" />
              <div className="flex flex-col">
                <div className="flex gap-[20px]">
                  <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                    <h1>До начала осталось 7 дней 12 часов 46 минут</h1>
                  </div>
                  <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                    <h1>Хакатон</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-[30px] items-start">
                  <h1 className="text-[42px]">IT-форум</h1>
                  <p className=" text-left text-[22px]">
                    <span className="block">Дата: 30 ноября - 1 декабря</span>
                    <span className="block">Время: 10:00</span>
                    <span className="block">Место: г. Сургут, школа 21</span>
                  </p>
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
