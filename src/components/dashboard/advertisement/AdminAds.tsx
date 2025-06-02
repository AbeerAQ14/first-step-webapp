import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import AdRequestForm from "@/components/forms/dashboard/adblog-request/AdRequestForm";
import { AdRequestFormData } from "@/lib/schemas";

const AdminAds = () => {
  const advertisements = [
    {
      id: "1",
      title: "تجربة ١",
      description: "هذا وصف لتجربة ١",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
    },
    {
      id: "2",
      title: "تجربة ٢",
      description: "هذا وصف لتجربة ٢",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
    },
    {
      id: "3",
      title: "تجربة ٣",
      description: "هذا وصف لتجربة ٣",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
    },
    {
      id: "4",
      title: "تجربة ٤",
      description: "هذا وصف لتجربة ٤",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
    },
    {
      id: "5",
      title: "تجربة ٥",
      description: "هذا وصف لتجربة ٥",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
    },
  ];

  const buttons = (data: AdRequestFormData, isValid: boolean, adId: string) => (
    <>
      <Button asChild size={"sm"}>
        <Link href={`advertisement/${adId}/edit`}>تعديل الإعلان</Link>
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          console.log(data, isValid);
        }}
        size={"sm"}
        variant={"outline"}
        className="!border-destructive text-destructive"
      >
        حذف الإعلان
      </Button>
    </>
  );

  return (
    <div className="flex flex-col gap-y-6">
      {advertisements.map((item) => (
        <AdRequestForm
          key={item.id}
          initialData={{
            title: item.title,
            description: item.description,
            image: item.image,
            start_date: item.start_date,
            end_date: item.end_date,
          }}
          mode="show"
        >
          {(data, isValid) => buttons(data, isValid, item.id)}
        </AdRequestForm>
      ))}
    </div>
  );
};

export default AdminAds;
