import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/widgets/header";
import { axiosInstance } from "@/utils/api";
import { useEffect } from "react";
const fetchAxios = async () => {
  const { data } = await axiosInstance.get(
    `/checklist?goal=${"Напиши мне что-нибудь"}`
  );
  console.log(data);
};
const Ai = () => {
  useEffect(() => {
    console.log("fsf");
    (async () => {
      await fetchAxios();
    })();
  }, []);
  return (
    <div>
      <Header />
      <div className="">
        <div className="container mx-auto px-[16px]">
          <div className="flex ">
            <div className="flex flex-col  min-w-[300px] px-[10px] gap-[10px] py-[10px] items-center bg-[#E8E8F5] rounded-lg">
              <Button className=" w-[200px]">Новый чат</Button>
              <div className="flex self-start gap-[10px] w-full text-left  flex-col">
                <h1>Сегодня</h1>
                <Button className="self-start" variant={"ghost"}>
                  Изучить git
                </Button>
                <Button className="self-start" variant={"ghost"}>
                  Изучить C++
                </Button>
              </div>
              <div className="flex self-start gap-[10px] flex-col">
                <h1>Вчера</h1>
                <Button className="self-start" variant={"ghost"}>
                  Изучить git
                </Button>
                <Button className="self-start" variant={"ghost"}>
                  Изучить C++
                </Button>
              </div>
            </div>
            <div className="flex flex-1 flex-col bg-white p-[10px]">
              <p>
                Чек-лист для повышения квалификации по Git:
                <br />
                <br />
                1. Изучение продвинутых команд: - Ознакомление с командами git
                checkout, git rebase, git merge --no-ff, git stash, git revert.
                - Понимание различий между этими командами и их использование в
                разных ситуациях.
                <br />
                <br />
                2. Управление ветками: - Создание и переключение между
                локальными ветками. - Выполнение слияния веток и разрешение
                конфликтов. - Использование веток для работы над разными
                функциональными возможностями проекта.
                <br />
                <br />
                3. Работа с удалённым репозиторием: - Настройка доступа к
                удалённому репозиторию. - Отправка изменений в удалённый
                репозиторий с использованием команды git push. - Работа с
                ветками в удалённом репозитории.
                <br />
                <br />
                4. Воспроизведение изменений: - Воспроизведение изменений из
                удалённого репозитория на локальную машину с помощью команды git
                fetch. - Изучение работы с командами git pull и git rebase для
                обновления локального репозитория.
                <br />
                <br />
                5. Тестирование и развёртывание: - Написание тестовых сценариев
                для проверки изменений. - Деплой кода на сервер с использованием
                Git и инструментов вроде GitHub Actions или GitLab CI/CD.
                <br />
                <br />
                6. Безопасность: - Аутентификация и авторизация в Git с
                использованием ключей SSH. - Защита репозиториев с помощью
                Gitolite или других инструментов.
                <br />
                <br />
                7. Обучение коллег: - Обучение других разработчиков работе с
                Git. - Организация внутренних встреч или курсов для обмена
                опытом.
              </p>

              <Input placeholder="Введите сообщение" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
