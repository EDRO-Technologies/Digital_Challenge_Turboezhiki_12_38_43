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
  console.log(data)
  return data.reverse()
};
const Ai = () => {
  const [response, setResponse] = useState("")
  const [goal, setGoal] = useState("")
  const [history, setHistory] = useState([])
  useEffect(() => {
    (async () => {
      getHistoryAxios()
    })();
  }, []);

  async function getChecklist() {
    setResponse(await fetchAxios(goal))
  }

  async function getHistoryAxios() {
    setHistory(await getHistory())
  }

  const handleClick = (index: number) => {
    setResponse((history[index] as any).text.replace(/\n/g, "<br>"))
  }

  const clearResponse = () => {
    setResponse("")
    setGoal("")
  }

  return (
    <div>
      <Header />
      <div className="">
        <div className="container mx-auto px-[16px]">
          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col  min-w-[300px] px-[10px] gap-[10px] py-[10px] items-center bg-[#E8E8F5] rounded-lg">
              <Button className=" w-[200px]" onClick={clearResponse}>Новая цель</Button>
              <div className="flex self-start gap-[10px] w-full text-left  flex-col">
              {history?.length ? (
                history.map((item: { goal: string }, index: number) => (
                  <Button key={item.goal || index} className="self-start" variant="ghost" onClick={() => handleClick(index)}>
                    {item.goal}
                  </Button>
                ))
              ) : (
                <div>{JSON.stringify(history)}</div>
              )}
              </div>
            </div>
            <div className="flex flex-1 flex-col bg-white p-[10px]">
              <p>
                <div dangerouslySetInnerHTML={{ __html: response }}/>
              </p>
              <div className="flex flex-row gap-5">
                <Input placeholder="Введите сообщение" className="mt-2" onChange={(e) => setGoal(e.target.value)} value={goal}/>
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
