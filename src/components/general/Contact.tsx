"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLocale } from "next-intl";

// Define schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{8,15}$/, { message: "يرجى إدخال رقم هاتف صحيح" }),
  subject: z.string().min(1, { message: "يرجى اختيار موضوع" }),
  message: z
    .string()
    .min(10, { message: "الرسالة يجب أن تكون على الأقل 10 أحرف" }),
});

// Define type based on schema
type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const locale = useLocale();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input placeholder="محمد علي" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الإيميل</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="mohammedalrazi@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الجوال</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <span className="absolute ltr:left-3 rtl:right-3 text-gray-500">
                      +966
                    </span>
                    <Input
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      type="tel"
                      className="ltr:pr-0 ltr:pl-14 rtl:pl-0 rtl:pr-14"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>موضوع الرسالة</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر موضوع" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="استفسار">استفسار</SelectItem>
                    <SelectItem value="شكوى">شكوى</SelectItem>
                    <SelectItem value="اقتراح">اقتراح</SelectItem>
                    <SelectItem value="أخرى">أخرى</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الرسالة</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-44"
                    rows={5}
                    placeholder="ألرسالة"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={"lg"}
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
