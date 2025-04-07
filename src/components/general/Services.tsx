import { CircleDotDashed } from "lucide-react";

const Services = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap gap-x-6 lg:gap-x-12 2xl:gap-x-[8.75rem] justify-center items-start content-start gap-y-12">
        {Array(8)
          .fill(1)
          .map((item, idx) => (
            <ServiceCard key={idx} />
          ))}
      </div>
    </section>
  );
};

export default Services;

const ServiceCard = () => {
  return (
    <div className="text-center shrink md:max-w-[20.875rem] rounded-2xl overflow-hidden border border-light-gray">
      <div
        className="h-[12.5rem] px-8 pt-[7.625rem] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34, 34, 34, 0.36), rgba(34, 34, 34, 0.36)), url(https://images.unsplash.com/photo-1716908932235-d865878b12a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <p className="font-bold text-white">نظام حجوزات سهل وفعال</p>
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
          تتيح First Step للآباء البحث عن الحضانات المناسبة لأطفالهم بسهولة، حيث
          يمكنهم مقارنة الحضانات بناءً على الموقع، الخدمات، الأنشطة التعليمية،
          والتقييمات، مما يساعدهم على إتخاذ القرار الأفضل والتسجيل مباشرة عبر
          المنصة.
        </p>
      </div>
    </div>
  );
};
