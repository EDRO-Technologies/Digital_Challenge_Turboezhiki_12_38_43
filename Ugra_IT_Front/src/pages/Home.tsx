import Header from "@/components/widgets/header";
import React from "react";
import { Button } from "@/components/ui/button";
import Arrow from "../assets/Arrow.svg";
import Template1 from "../assets/Template1.jpg";
import Template2 from "../assets/Template2.jpg";
import Template3 from "../assets/Template3.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Footer from "@/components/widgets/Footer";

const Home = () => {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center bg-main-gradient min-h-[646px]">
        <div className="container mx-auto px-[16px] h-full">
          <div className="flex relative h-full items-center ">
            <h1 className="relative text-[70px] uppercase text-white font-bold ">
              Твоя траектория <br /> успеха начинается <br /> здесь
              <span className="absolute bottom-[50px] right-[-300px] text-[28px] text-white">
                Единая система для профисионального роста
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex mt-[156px] mb-[100px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[68px]">
            <h1 className="uppercase text-[80px] font-bold">мы поможем</h1>
            <div className="flex items-start gap-[16px]">
              <div
                className="border flex-grow-[1] flex-shrink-0 basis-[33.333%] p-[30px]"
                style={{
                  borderImageSource:
                    "linear-gradient(121.72deg, #1CBCEC 8%, #09147A 76.01%)",
                  borderImageSlice: 1,
                  borderRadius: "35px",
                }}
              >
                Выстроить карьерный рост
              </div>
              <div
                className="border flex-grow-[1] flex-shrink-0 basis-[33.333%] p-[30px]"
                style={{
                  borderImageSource:
                    "linear-gradient(121.72deg, #1CBCEC 8%, #09147A 76.01%)",
                  borderImageSlice: 1,
                  borderRadius: "35px",
                }}
              >
                Получить поддержку, экспертную оценку и доступ к мероприятиям
              </div>
              <div
                className="border flex-grow-[1] flex-shrink-0 basis-[33.333%] p-[30px]"
                style={{
                  borderImageSource:
                    "linear-gradient(121.72deg, #1CBCEC 8%, #09147A 76.01%)",
                  borderImageSlice: 1,
                  borderRadius: "35px",
                }}
              >
                Запустить стартап с инновационным потенциалом и стать резидентом
                Технопарка Югры
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-[350px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[76px]">
            <div className="text flex-col flex-1">
              <h1 className="uppercase text-[80px]">Что такое</h1>
              <h1 className="uppercase text-[80px] text-right">«На взлёт!»?</h1>
            </div>
            <div className="flex self-center items-start justify-center flex-col gap-[15px] max-[834px]">
              <span>«На взлёт!» – это ваш личный ИИ-навигатор в мире ИТ.</span>
              <span>
                Он знает, какие навыки сейчас ценятся, какие знания помогут
                стать востребованным, и как быстрее достичь цели.
              </span>
              <span>
                Создайте свою уникальную траекторию успеха – от первых шагов до
                громких побед!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-[242px]">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col">
            <h1 className="text-[70px]"> Мероприятия</h1>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-1 gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template1} alt="template1" />
                <div className="flex flex-col w-full">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF]  rounded-[30px] p-[10px]">
                      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
                        До начала осталось 3 дня 12 часов 45 минут
                      </h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
                        Хакатон
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-[30px]  items-start">
                    <h1 className="text-[42px] ">Digital challenge</h1>
                    <p className="text-left text-[22px]">
                      <span className="block ">Дата: 16-17 ноября</span>
                      <span className="block">Время: 10:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
                    <Button
                      variant={"outline"}
                      size={"default"}
                      className="self-end text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                    >
                      Участвовать
                      <img src={Arrow} alt="#" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template2} alt="template1" />
                <div className="flex flex-col w-full">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF]  rounded-[30px] p-[10px]">
                      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
                        До начала осталось 7 дней 12 часов 45 минут
                      </h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
                        Хакатон
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-[30px]  items-start">
                    <h1 className="text-[42px] ">Хакатон 2024</h1>
                    <p className="text-left text-[22px]">
                      <span className="block">Дата: 30 ноября - 1 декабря</span>
                      <span className="block">Время: 10:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
                    <Button
                      variant={"outline"}
                      size={"default"}
                      className="self-end text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                    >
                      Участвовать
                      <img src={Arrow} alt="#" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 gap-[31px] card bg-white border rounded-[45px] p-[13px]">
                <img src={Template3} alt="template1" />
                <div className="flex flex-col w-full">
                  <div className="flex gap-[20px]">
                    <div className="bg-[#F4F5FF]  rounded-[30px] p-[10px]">
                      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
                        До начала осталось 12 дней 12 часов 30 минут
                      </h1>
                    </div>
                    <div className="bg-[#F4F5FF] rounded-[30px] p-[10px]">
                      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
                        Форум
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-[30px]  items-start">
                    <h1 className="text-[42px] ">IT-форум</h1>
                    <p className="text-left text-[22px]">
                      <span className="block">Дата: 11 декабря</span>
                      <span className="block">Время: 12:00</span>
                      <span className="block">Место: г. Сургут, школа 21</span>
                    </p>
                    <Button
                      variant={"outline"}
                      size={"default"}
                      className="self-end text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                    >
                      Участвовать
                      <img src={Arrow} alt="#" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-[22px] text-center cursor-pointer mt-[62px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
              Смотреть больше
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[40px]">
            <h1 className="uppercase text-[80px] font-bold">тесты</h1>
            <div className="flex gap-[20px]">
              <div className="flex flex-col flex-1 p-[30px] gap-[10px] bg-white rounded-[45px]">
                <span className="text-right">20 вопросов</span>
                <h1 className="text-[26px]">
                  Введение в аналитическое мышление
                </h1>
                <span className="text-[16px]">
                  Тест на базовые принципы и подходы в аналитике
                </span>
                <Button
                  variant={"outline"}
                  size={"default"}
                  className="self-end mt-[30px] text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                >
                  Пройти тестирование
                  <img src={Arrow} alt="#" />
                </Button>
              </div>
              <div className="flex flex-col flex-1 p-[30px] gap-[10px] bg-white rounded-[45px]">
                <span className="text-right">15 вопросов</span>
                <h1 className="text-[26px]">Основы анализа данных</h1>
                <span className="text-[16px]">
                  Проверка начальных навыков работы с данными
                </span>
                <Button
                  variant={"outline"}
                  size={"default"}
                  className="self-end mt-[30px] text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                >
                  Пройти тестирование
                  <img src={Arrow} alt="#" />
                </Button>
              </div>
            </div>
            <h1 className="text-[22px] text-center cursor-pointer mt-[62px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
              Смотреть больше
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col gap-[40px]">
            <h1 className="uppercase text-[80px] font-bold">курсы</h1>
            <div className="flex gap-[40px]">
              <div className="flex flex-col flex-1  p-[30px] gap-[40px] bg-white rounded-[45px]">
                <Button
                  variant={"outline"}
                  size={"default"}
                  className="self-end mt-[30px] text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                >
                  Учиться
                  <img src={Arrow} alt="#" />
                </Button>
                <div className="flex flex-col gap-[57px]">
                  <h1 className="text-[34px]">Программирование с нуля</h1>
                  <ul className="flex flex-col gap-[20px] pl-[20px] list-disc ">
                    <li>
                      Изучите основы программирования и создайте свои первые
                      приложения
                    </li>
                    <li>
                      Практические задания помогут закрепить знания с первых
                      занятий
                    </li>
                    <li>Идеально подходит для новичков без опыта в IT</li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <div className=" bg-[#F4F5FF] p-[15px] rounded-[30px] ">
                    Срок обучения: 12 месяцев
                  </div>
                  <h1>Старт 3 декабря</h1>
                </div>
              </div>
              <div className="flex flex-col flex-1  p-[30px] gap-[40px] bg-white rounded-[45px]">
                <Button
                  variant={"outline"}
                  size={"default"}
                  className="self-end mt-[30px] text-[20px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]"
                >
                  Учиться
                  <img src={Arrow} alt="#" />
                </Button>
                <div className="flex flex-col gap-[57px]">
                  <h1 className="text-[34px]">Веб-разработка</h1>
                  <ul className="flex flex-col gap-[20px] pl-[20px] list-disc ">
                    <li>
                      Научитесь создавать современные сайты и веб-приложения
                    </li>
                    <li>
                      Освойте HTML, CSS, JavaScript и получите навыки
                      фронтенд-разработки
                    </li>
                    <li>Портфолио проектов уже во время обучения</li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <div className=" bg-[#F4F5FF] p-[15px] rounded-[30px] ">
                    Срок обучения: 12 месяцев
                  </div>
                  <h1>Старт 3 декабря</h1>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-[22px] text-center cursor-pointer mt-[62px] bg-clip-text text-transparent bg-gradient-to-r from-[#1CBCEC] to-[#09147A]">
            Смотреть больше
          </h1>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-[16px]">
          <div className="flex py-[109px] px-[81px] bg-white rounded-[40px]">
            <div className="flex flex-1 flex-col">
              <h1 className="text-[36px]">Остались вопросы?</h1>
              <span className="">
                Если у вас остались вопросы, оставьте заявку - мы перезвоним
              </span>
            </div>
            <div className="flex flex-1 flex-col space-y-3 gap-[26px]">
              <Label>Имя</Label>
              <Input placeholder="Введите имя" />
              <div className="flex gap-[14px]">
                <div className="flex flex-1 flex-col space-y-3">
                  <Label>Телефон</Label>
                  <Input placeholder="+7 |" />
                </div>
                <div className="flex flex-1 flex-col space-y-3">
                  <Label>Электронная почта</Label>
                  <Input type="email" placeholder="Введите email" />
                </div>
              </div>
              <h1 className="self-center">
                Нажимая на кнопку, я соглашаюсь на обработку персональных данных
              </h1>
              <Button className="self-center w-1/2" variant={"outline"}>
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
