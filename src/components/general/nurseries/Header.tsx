import { Button } from "@/components/ui/button";

const Header = ({ name }: { name: string }) => {
  return (
    <div
      className="relative flex h-[37.5rem] px-4 bg-center bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="bg-white max-w-[37.5rem] rounded-5xl sm:rounded-[6.25rem] mx-auto mt-auto mb-12">
        <div className="space-y-6 text-center px-4 py-8 sm:pb-10 sm:pt-8 sm:px-20">
          <div className="space-y-1">
            <p className="heading-3 text-primary font-extrabold">{name}</p>
            <p className="heading-4 text-secondary-mint-green font-medium">
              هنا هيكون الشعار بتاع الحضانة أو أي جملة
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-mid-gray">
              نوفر للآباء تقارير يومية تفصيلية عن أداء أطفالهم داخل الحضانة،
              تشمل مستوى التفاعل، الأنشطة التي شاركوا فيها
            </p>
            <Button size={"sm"}>احجز لطفلك الآن</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
