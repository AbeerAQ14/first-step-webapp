import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";

export default function CenterAdRequest() {
  return (
    <div>
      <div className="py-2.5 text-center bg-secondary-mint-green rounded-t-full font-medium">
        الإعلان الأول لحضانتك/ مركزك مجاني 100% في الصفحة الرئيسية لمدة يوم واحد
      </div>

      <div className="p-10 flex flex-col gap-y-4">
        <div className="space-y-2">
          <p className="heading-4 font-medium text-primary">طلب إعلان</p>
          <p className="text-mid-gray">
            اجذب أولياء الأمور بإعلان يظهر في بداية الصفحة الرئيسية، يمكنك تحديد
            عدد أيام ظهور الإعلان
          </p>
        </div>

        <AdRequestForm />
      </div>
    </div>
  );
}
