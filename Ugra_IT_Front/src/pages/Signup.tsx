import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { useShallow } from "zustand/shallow";
import { useMutation } from "react-query";
import { axiosInstance } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    `http://localhost:3001/auth/signup`,
    userData
  );
  return response.data;
};
const formSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    name: z.string().min(2, {
      message: "Имя должно быть не меньше 2 символов",
    }),
    surname: z.string().min(2, {
      message: "Фамилия должна быть не меньше 2 символов.",
    }),
    middleName: z.string().min(2, {
      message: "Отчество должно быть не меньше 2 символов.",
    }),
    role: z.number(),
    age: z
      .number()
      .min(1, {
        message: "Поле обязательно к заполению.",
      })
      .optional(),
    company: z.string().optional(),
    password: z.string().min(6, {
      message: "Пароль должен быть не меньше 9 символов.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Пароль должен быть не меньше 9 символов.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать.",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const { toast } = useToast();
  const { setUser, setNextPage } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setNextPage: state.setNextPage,
    }))
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      middleName: "",
      role: 0,
      company: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isHr = form.watch("role");

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      setUser(data);
      setNextPage(true);
    },
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Called when mutation encounters an error.
     *
     * @param {Error} error - Error that occurred during mutation.
     */
    /******  6e393e0f-9449-43c2-aed3-14130ca01ab0  *******/
    onError: (error) => {
      toast({
        title: "Ошибка регистрации",
        description: error.response.data,
      });
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let dataToSubmit;

    if (isHr) {
      // Если isHr равно true, создаем объект без поля age
      dataToSubmit = {
        email: values.email,
        name: values.name,
        surname: values.surname,
        middleName: values.middleName,
        role: values.role,
        company: values.company,
        password: values.password,
      };
    } else {
      dataToSubmit = {
        email: values.email,
        name: values.name,
        surname: values.surname,
        middleName: values.middleName,
        role: values.role,
        age: values.age,
        password: values.password,
      };
    }
    mutation.mutate(dataToSubmit);
  };
  return (
    <div className="flex flex-col py-4 justify-center items-center w-full  h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  space-y-8 p-2 overflow-auto rounded-lg border max-w-[500px] w-full "
        >
          <h1 className="text-lg  text-center">Регистрация</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Электронная почта</FormLabel>
                <FormControl>
                  <Input autocomplete="off" placeholder="Электронная почта" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input autocomplete="off" placeholder="Имя" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input autocomplete="off" placeholder="Фамилия" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input autocomplete="off" placeholder="Фамилия" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Пароль" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтверждение пароля</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Подтверждени пароля"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value === 1} // Проверяем, равно ли значение 1
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? 1 : 0)
                    } //
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Я Работодатель</FormLabel>
                </div>
              </FormItem>
            )}
          />
          {/* {!isHr && (
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Возраст</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Возраст"
                      value={+field.value}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {isHr && (
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Компания</FormLabel>
                  <FormControl>
                    <Input placeholder="Название компании" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
          <Link className="text-center" to="/signin">
            У меня уже есть аккаунт
          </Link>
          <Button className="w-1/2 self-center" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
