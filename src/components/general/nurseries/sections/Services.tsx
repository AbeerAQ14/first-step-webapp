interface Service {
  title: string;
  description: string;
  image: string;
}

interface ServicesProps {
  services: Service[];
}

const Services = ({ services }: ServicesProps) => (
  <section className="mt-20 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#B12F53] mb-12">
      خدمات الحضانة
    </h2>
    <div className="flex flex-col gap-16">
      {services.map((service, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row items-center gap-8 ${
            idx % 2 === 1 ? "" : ""
          }`}
        >
          {/* Alternate image/text sides */}
          {idx % 2 === 1 ? (
            <>
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-lg h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-contain w-full h-full opacity-60"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#22336C] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-base mb-2">
                  {service.description}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 order-2 md:order-1">
                <h3 className="text-xl font-bold text-[#22336C] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-base mb-2">
                  {service.description}
                </p>
              </div>
              <div className="flex-1 order-1 md:order-2 flex justify-center">
                <div className="w-full max-w-lg h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-contain w-full h-full opacity-60"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default Services;
