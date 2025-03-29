"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema, FormData } from "./SendEmail";

const SendEmailForm = ({
  onSubmit,
}: {
  onSubmit: (data: FormData) => void;
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
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
  );
};

export default SendEmailForm;
