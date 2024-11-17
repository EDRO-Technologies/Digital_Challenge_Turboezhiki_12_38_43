import Header from "@/components/widgets/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/store/useUserStore";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "@/utils/api";
import AvatarUpload from "@/components/widgets/AvatarUploader";
import { Avatar } from "@files-ui/react";
import Template from "../assets/Template1.jpg";
function formatDate(inputDate) {
  // Преобразуем строку в объект Date
  const date = new Date(inputDate);

  // Проверяем, корректна ли дата
  if (isNaN(date.getTime())) {
    throw new Error("Некорректная дата");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

const fetchUserById = async (id) => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response.data;
};
const Account = () => {
  const user = useUserStore((state) => state.user);
  const [choose, setChoose] = useState("main");
  const { data } = useQuery(["user", user?.id], () => fetchUserById(user?.id), {
    enabled: !!user?.id,
  });
  const [imageSource, setImageSource] = useState(
    "https://i.pinimg.com/originals/b6/1d/6a/b61d6a1079d8e54932dcde9dc260dd2e.gif"
  );
  const handleChangeSource = (selectedFile) => {
    setImageSource(selectedFile);
  };
  return (
    <div className="">
      <Header />
      <div className="container mx-auto rounded-lg border">
        <div className="bg-custom-gradient relative h-[170px] rounded-t-lg">
          <div className="w-[120px] absolute bottom-[-50px] ml-[20px] aspect-square bg-gray-800 rounded-full"></div>
        </div>

        <div className="flex  py-[15px] mt-[50px] px-[15px] gap-[10px]">
          <aside className="flex flex-col gap-[10px]">
            <Button
              variant={choose === "main" ? "default" : "ghost"}
              onClick={() => setChoose("main")}
              className="mt-[5px]"
            >
              Основная информация
            </Button>

            <Button
              variant={choose !== "main" ? "default" : "ghost"}
              onClick={() => setChoose("info")}
              className="mt-[5px]"
            >
              Дополнительная информация
            </Button>
          </aside>
          <div className="flex flex-col gap-[30px]  w-full ">
            <div className="top border-b ">
              <h1 className="text-[24px] font-bold">
                {choose === "main"
                  ? "Основная информация"
                  : "Дополнительная информация"}
              </h1>
              <span className="font-normal">
                {choose === "main"
                  ? "Управляйте основными настройками своей учетной записи."
                  : "Дополнительные настройки"}
              </span>
            </div>
            <div>
              {choose === "main" ? (
                <>
                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Имя
                    </Label>
                    <Input
                      id="username"
                      placeholder={user?.name}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">
                      Ваше отображаемое имя
                    </p>
                  </div>
                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="surname"
                    >
                      Фамилия
                    </Label>
                    <Input
                      id="surname"
                      placeholder={user?.surname}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Ваша фамилия</p>
                  </div>
                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Отчество
                    </Label>
                    <Input
                      id="expYear"
                      placeholder={user?.middleName}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Ваше отчество</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Стаж работы
                    </Label>
                    <Input
                      id="expYear"
                      placeholder={data?.expYear}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Ваш стаж работы</p>
                  </div>
                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Должность
                    </Label>
                    <Input
                      id="role"
                      placeholder={data?.role === 0 ? "Программист" : "HR"}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Ваша должность</p>
                  </div>

                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Дата рождения
                    </Label>
                    <Input
                      id="birthDate"
                      placeholder={formatDate(data?.birthDate)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Ваша дата рождения</p>
                  </div>

                  <div className="flex flex-col items-start mb-4 space-y-3">
                    <Label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Место учебы
                    </Label>
                    <Input
                      id="eduPlace"
                      placeholder={data?.eduPlace}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Ваше место учебы</p>
                  </div>
                </>
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Account;
