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
import { useMutation } from "react-query";
import { axiosInstance } from "@/utils/api";
import useUserStore from "@/store/useUserStore";
import { useShallow } from "zustand/shallow";
import { useToast } from "@/hooks/use-toast";
const formSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(9, "Пароль должен быть не меньше 9 символов"),
});
const loginUser = async (values) => {
  const response = await axiosInstance.post("/auth/signin", values);
  return response.data;
};
const Signin = () => {
  const { toast } = useToast();
  const { setUser, setNextPage } = useUserStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setNextPage: state.setNextPage,
    }))
  );
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("isAuth", "true");
      navigate("/event");
    },
    onError: (error) => {
      toast({
        title: "Ошибка авторизации",
        description: error.response.data,
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full  h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  space-y-8 p-2 rounded-lg border max-w-[500px] w-full "
        >
          <h1 className="text-lg text-center">Войти в аккаунт</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Электронная почта</FormLabel>
                <FormControl>
                  <Input placeholder="Электронная почта" {...field} />
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
          <Link className="text-center" to="/signup">
            У меня нет аккаунта
          </Link>
          <Button className="self-center w-1/2" type="submit">
            Войти
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signin;
