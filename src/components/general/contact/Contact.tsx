import Image from "next/image";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-8 py-16 md:flex-row md:gap-8 lg:gap-16">
        <div className="order-2 grow w-full max-w-[41.25rem] space-y-6">
          <div className="space-y-6">
            <h2 className="!font-bold !text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl text-primary">
              سعداء دائمًا لمساعدتك
            </h2>
            <p className="text-mid-gray">
              إذا كان لديك استفسار او مشكلة لا تتردد بالتواصل معنا
            </p>
          </div>
          <ContactForm />
        </div>

        <div className="max-w-xs md:max-w-max md:order-2 grow w-full flex justify-end pointer-events-none select-none">
          <Image
            src="/contact-logo.png"
            alt="First Step"
            width={561}
            height={708}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
