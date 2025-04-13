import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const Branches = () => {
  const branches = ["القصيم", "حي غرناطة", "المدينة", "مكة المكرمة", "الرياض"];

  const branchColors = [
    "text-[#B12F53] fill-[#B12F53]",
    "text-[#47B881] fill-[#47B881]",
    "text-[#3B82F6] fill-[#3B82F6]",
    "text-[#D9534F] fill-[#D9534F]",
    "text-[#FFAD0D] fill-[#FFAD0D]",
  ];

  return (
    <section className="container mx-auto px-4 xl:px-8">
      <div className="">
        <h2 className="heading-3 text-secondary-burgundy">فروع الحضانة</h2>

        <div className="relative flex flex-wrap justify-center">
          {branches.map((branch, index) => (
            <div
              key={branch}
              className={`group relative flex flex-col items-center w-28 md:w-48 mb-8 ${branchColors[index]}`}
            >
              <div className="-z-50 w-full h-1 bg-light-gray absolute translate-y-[670%] top-1/2" />

              {/* Branch circle with color based on index */}
              <div
                className={
                  "rounded-full flex items-center justify-center origin-[50%_80%] group-odd:rotate-180"
                }
              >
                <Icons.location className="fill-inherit size-20" />
              </div>

              {/* Branch name */}
              <p className="absolute left-1/2 -translate-x-1/2 group-odd:top-[20%] group-even:top-[100%] text-2xl text-center font-bold text-nowrap">
                {branch}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
