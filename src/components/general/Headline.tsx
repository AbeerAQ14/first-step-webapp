import Image from "next/image";

const Headline = () => {
  return (
    <section className="flex items-center justify-center gap-x-2 md:gap-x-14">
      <Image
        className="ltr:order-3 rotate-180 rotate-y-180 rotate-z-180"
        src="/logo.svg"
        alt="First Step Logo"
        width={96.13}
        height={120}
      />

      <p className="ltr:order-2 font-medium text-lg md:text-2xl lg:text-3xl xl:text-4xl text-secondary-orange text-center">
        <span>"لأن أول خطوة لطفلك.. أهم قرار لك!</span>
        <span className="block">
          اختارنا{" "}
          <span className="font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            First Step
          </span>{" "}
          اسمًا لنا"
        </span>
      </p>

      <Image
        className="ltr:order-1"
        src="/logo.svg"
        alt="First Step Logo"
        width={96.13}
        height={120}
      />
    </section>
  );
};

export default Headline;
