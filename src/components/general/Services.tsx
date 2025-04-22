import { Service } from "@/types";
import { CircleDotDashed } from "lucide-react";

const Services = ({ services }: { services: Service[] }) => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap gap-x-6 lg:gap-x-12 2xl:gap-x-[8.75rem] justify-center items-start content-start gap-y-12">
        {Array(5)
          .fill(1)
          .map((service, idx) => (
            <ServiceCard key={idx} service={service} />
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
          backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.36), rgba(34, 34, 34, 0.36)), url(${"https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
        }}
      >
        <p className="font-bold text-white">
          {"تقارير شاملة لمتابعة تطور الأطفال"}
        </p>
      </div>

      <div className="relative px-9 pt-10 pb-6">
        <div className="bg-white p-3 rounded-full shadow-icon w-fit absolute left-1/2 top-0 -translate-1/2">
          <CircleDotDashed
            className="stroke-secondary-mint-green"
            width={36}
            height={36}
          />
        </div>
        <p className="font-medium text-gray">
          {
            "نوفر للآباء تقارير يومية تفصيلية عن أداء أطفالهم داخل الحضانة، تشمل مستوى التفاعل، الأنشطة التي شاركوا فيها، والتطور في مهاراتهم المختلفة. هذه التقارير تعزز التواصل بين العائلات والمعلمين، مما يساعد على متابعة نمو الصل ودعمه بشكل أفضل."
          }
        </p>
      </div>
    </div>
  );
};
