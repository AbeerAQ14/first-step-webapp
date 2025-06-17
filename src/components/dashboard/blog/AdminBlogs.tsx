"use client";

import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/dashboardApi";
import { Button } from "@/components/ui/button";
import AdminBlogRequestForm from "@/components/forms/dashboard/adblog-request/AdminBlogRequest";
import { AdminBlogRequestFormData } from "@/lib/schemas";

const AdminBlogs = () => {
  const queryClient = useQueryClient();

  // Dummy data for now
  const dummyBlogs = [
    {
      id: "1",
      title: {
        ar: "تجربة ١",
        en: "Experience 1",
      },
      description: {
        ar: "هذا وصف لتجربة ١",
        en: "This is a description for experience 1",
      },
      content: {
        ar: "محتوى تجربة ١",
        en: "Content for experience 1",
      },
      mainImage:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardImage:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      title: {
        ar: "تجربة ٢",
        en: "Experience 2",
      },
      description: {
        ar: "هذا وصف لتجربة ٢",
        en: "This is a description for experience 2",
      },
      content: {
        ar: "محتوى تجربة ٢",
        en: "Content for experience 2",
      },
      mainImage:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardImage:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      title: {
        ar: "تجربة ٣",
        en: "Experience 3",
      },
      description: {
        ar: "هذا وصف لتجربة ٣",
        en: "This is a description for experience 3",
      },
      content: {
        ar: "محتوى تجربة ٣",
        en: "Content for experience 3",
      },
      mainImage:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cardImage:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // TODO: Replace with actual query
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminBlogs"],
    queryFn: () => Promise.resolve({ data: dummyBlogs }),
  });

  const deleteMutation = useMutation({
    mutationFn: (blogId: string) => {
      // TODO: Implement actual delete functionality
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success("تم حذف المدونة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف المدونة");
    },
  });

  // Add Blog button at the top
  const addButton = (
    <div className="mb-4 flex justify-end">
      <Button asChild size="sm">
        <Link href="/dashboard/admin/blog/add">إضافة مدونة جديدة</Link>
      </Button>
    </div>
  );

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error)
    return <div className="text-red-500">حدث خطأ أثناء جلب البيانات</div>;
  if (!data?.data?.length)
    return (
      <>
        {addButton}
        <div>لا توجد مدونات</div>
      </>
    );

  const buttons = (
    formData: AdminBlogRequestFormData,
    isValid: boolean,
    blogId: string
  ) => (
    <>
      <Button asChild size={"sm"}>
        <Link href={`blog/${blogId}/edit`}>تعديل المدونة</Link>
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          deleteMutation.mutate(blogId);
        }}
        size={"sm"}
        variant={"outline"}
        className="!border-destructive text-destructive"
      >
        حذف المدونة
      </Button>
    </>
  );

  return (
    <div className="flex flex-col gap-y-6">
      {addButton}
      {data.data.map((item: any) => (
        <AdminBlogRequestForm
          key={item.id}
          initialData={{
            title: item.title,
            description: item.description,
            content: item.content,
            mainImage: item.mainImage,
            cardImage: item.cardImage,
          }}
          mode="show"
        >
          {(formData, isValid) => buttons(formData, isValid, item.id)}
        </AdminBlogRequestForm>
      ))}
    </div>
  );
};

export default AdminBlogs;
