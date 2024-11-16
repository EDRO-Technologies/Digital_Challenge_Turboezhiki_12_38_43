import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUserStore from "@/store/useUserStore";
import { Checkbox } from "@/components/ui/checkbox";
import { axiosInstance } from "@/utils/api";
import { useMutation } from "react-query";
import { useShallow } from "zustand/shallow";
const programmerSchema = z.object({
  birthDate: z.string(),
  expYear: z.number(),
  eduStatus: z.string(),
  eduPlace: z.string().max(255),
});

const workerSchema = z.object({
  companyName: z.string(),
  staffNum: z.number(),
  isResident: z.boolean(),
  isInnovative: z.boolean(),
  inn: z.string(),
});
const fetchworker = async (dataWorker) => {
  const { data } = await axiosInstance.post("/data/company", dataWorker);
  return data;
};
const fetchProgrammer = async (dataProgrammer) => {
  const { data } = await axiosInstance.post("/data/programmer", dataProgrammer);
  return data;
};
const NextForm = () => {
  const { user, setNextPage } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setNextPage: state.setNextPage,
    }))
  );
  const isProgrammer = user.role === 0;
  const isWorker = user.role === 1;
  const navigate = useNavigate();
  const mutationProgrammer = useMutation(fetchProgrammer, {
    onSuccess: () => {
      setNextPage(false);
      navigate("/");
      console.log("Данные программиста успешно отправлены");
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных программиста:", error);
    },
  });
  const mutationCompany = useMutation(fetchworker, {
    onSuccess: () => {
      setNextPage(false);

      navigate("/");
      console.log("Данные работника успешно отправлены");
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных работника:", error);
    },
  });
  const formSchema = isProgrammer ? programmerSchema : workerSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isProgrammer
      ? {
          expYear: 0,
          eduStatus: "",
          eduPlace: "",
        }
      : {
          companyName: "",
          staffNum: 0,
          isResident: false,
          isInnovative: false,
          inn: "",
        },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (user.role === 0) mutationProgrammer.mutate(values);
    else mutationCompany.mutate(values);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 p-2 rounded-lg border max-w-[500px] w-full"
        >
          <h1 className="text-lg text-center">Персональные данные</h1>
          <span className="text-center">Заполните персональные данные</span>

          {isProgrammer && (
            <>
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата рождения</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Стаж работы</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Стаж работы"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eduStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваш уровень образования</FormLabel>
                    <FormControl>
                      <Input placeholder="Ваш уровень образования" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eduPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Место обучения</FormLabel>
                    <FormControl>
                      <Input placeholder="Место обучения" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {isWorker && (
            <>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название компании</FormLabel>
                    <FormControl>
                      <Input placeholder="Название компании" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="staffNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество сотрудников</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Количество сотрудников"
                        value={field.value} // Используем значение из поля
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isResident"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormLabel>Резидент</FormLabel>
                    <FormControl className="">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isInnovative"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormLabel>Инновационная компания</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ИНН</FormLabel>
                    <FormControl>
                      <Input placeholder="ИНН" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Link className="text-center" to="/signup">
            У меня нет аккаунта
          </Link>

          <Button className="self-center w-1/2" type="submit">
            Продолжить
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NextForm;
