"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
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
import { ContactFormData, createContactSchema } from "@/lib/schemas";

const ContactForm: React.FC = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const formSchema = createContactSchema(locale as "ar" | "en");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
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
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.name.placeholder")} {...field} />
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
                <FormLabel>{t("form.email.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("form.email.placeholder")}
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
                <FormLabel>{t("form.phone.label")}</FormLabel>
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
                <FormLabel>{t("form.subject.label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("form.subject.placeholder")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="استفسار">
                      {t("form.subject.options.inquiry")}
                    </SelectItem>
                    <SelectItem value="شكوى">
                      {t("form.subject.options.complaint")}
                    </SelectItem>
                    <SelectItem value="اقتراح">
                      {t("form.subject.options.suggestion")}
                    </SelectItem>
                    <SelectItem value="أخرى">
                      {t("form.subject.options.other")}
                    </SelectItem>
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
                <FormLabel>{t("form.message.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-44"
                    rows={5}
                    placeholder={t("form.message.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={"sm"}
            type="submit"
            className="w-fit justify-self-end"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? t("form.button.loading")
              : t("form.button.label")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
