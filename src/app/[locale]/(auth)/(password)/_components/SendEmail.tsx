"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
});

// Define type based on schema
type FormData = z.infer<typeof formSchema>;

const SendEmail = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="px-5 sm:px-10 py-20">
      <div className="flex flex-col items-center gap-y-12">
        <Image
          src="/logo.svg"
          alt="First Step Logo"
          width={64.09}
          height={80}
        />

        <div className="flex flex-col w-full max-w-[41.25rem]">
          <h1 className="heading-3 text-center text-primary">
            إعادة تعيين كلمة السر
          </h1>

          <div className="mt-9 flex flex-col gap-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        البريد الإلكتروني
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-12 flex flex-col items-center gap-y-4">
                  <Button
                    size={"long"}
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    إرسال الكود
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"long"}
                    type="button"
                    className="text-mid-gray !border-light-gray"
                    disabled={form.formState.isSubmitting}
                  >
                    <span>سجل دخولك عن طريق جوجل</span>
                    <Image
                      src="/google_icon.svg"
                      alt="Google Logo"
                      width={36}
                      height={36}
                    />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
