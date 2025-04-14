import { Service } from "@/types";
import { CircleDotDashed } from "lucide-react";

const Services = ({ services }: { services: Service[] }) => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap gap-x-6 lg:gap-x-12 2xl:gap-x-[8.75rem] justify-center items-start content-start gap-y-12">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="text-center shrink md:max-w-[20.875rem] rounded-2xl overflow-hidden border border-light-gray">
      <div
        className="h-[12.5rem] px-8 pt-[7.625rem] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.36), rgba(34, 34, 34, 0.36)), url(${service.image})`,
        }}
      >
        <p className="font-bold text-white">{service.title}</p>
      </div>

      <div className="relative px-9 pt-10 pb-6">
        <div className="bg-white p-3 rounded-full shadow-icon w-fit absolute left-1/2 top-0 -translate-1/2">
          <CircleDotDashed
            className="stroke-secondary-mint-green"
            width={36}
            height={36}
          />
        </div>
        <p className="font-medium text-gray">{service.description}</p>
      </div>
    </div>
  );
};
