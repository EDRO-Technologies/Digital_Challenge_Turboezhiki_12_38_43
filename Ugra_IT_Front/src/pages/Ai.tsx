import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/widgets/header";
import { axiosInstance } from "@/utils/api";
import { useEffect, useState } from "react";
const fetchAxios = async (goal: string) => {
  const { data } = await axiosInstance.get(
    `/checklist?goal=${goal}`
  );
  console.log(data.response)
  return data.response.replace(/\n/g, "<br>");
};
const getHistory = async () => {
  const { data } = await axiosInstance.get(
    `/checklist/history`
  );
  console.log(data.response)
  return data.response
};
const Ai = () => {
  const [response, setResponse] = useState("")
  const [goal, setGoal] = useState("")
  const [history, getHistory] = useState([])
  useEffect(() => {
    (async () => {
      // await fetchAxios("Выучить гит");
    })();
  }, []);

  async function getChecklist() {
    setResponse(await fetchAxios(goal))
  }

  async function setHistory(params:type) {
    
  }

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
                <div dangerouslySetInnerHTML={{ __html: response }}/>
              </p>
              <div className="flex flex-row gap-5">
                <Input placeholder="Введите сообщение" className="mt-2" onChange={(e) => setGoal(e.target.value)}/>
                <Button onClick={getChecklist}>Создать</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
