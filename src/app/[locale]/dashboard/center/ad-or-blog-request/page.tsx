import { Button } from "@/components/ui/button";
import Ads from "@/components/dashboard/ad-or-blog-request/Ads";
import BlogCard from "@/components/general/blog/BlogCard";
import { Blog } from "@/types";
import { Link } from "@/i18n/navigation";

const staticBlogs: Blog[] = [
  {
    id: 1,
    title: "How Do We Prepare Children for School?",
    description:
      "The transition from nursery to school is a key stage in a child’s life. Through our educational programs, we aim to develop school-readiness skills, build confidence, and foster a love of early learning in a smooth and engaging way.",
    image:
      "https://images.unsplash.com/photo-1745276235358-8771fa7eafc5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-03-12T09:25:49.000000Z",
    published_at: "2025-03-12",
  },
  {
    id: 2,
    title: "The Importance of Play in Child Development",
    description:
      "We believe play is a child’s natural way to express themselves and explore the world. In our nursery, we provide a rich environment full of interactive activities that boost cognitive skills and support motor and social development.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-04-13T13:23:30.000000Z",
    published_at: "2025-04-13",
  },
  {
    id: 3,
    title: "How Do We Prepare Children for School?",
    description:
      "The transition from nursery to school is a key stage in a child’s life. Through our educational programs, we aim to develop school-readiness skills, build confidence, and foster a love of early learning in a smooth and engaging way.",
    image:
      "https://images.unsplash.com/photo-1460788150444-d9dc07fa9dba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_at: "2025-04-13T13:24:47.000000Z",
    published_at: "2025-04-13",
  },
];

export default function CenterDashboardRequest() {
  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h1 className="heading-4 font-medium text-primary">الإعلانات</h1>

          <Button asChild size={"sm"} variant={"outline"}>
            <Link href="ad-or-blog-request/ad-request">طلب إعلان</Link>
          </Button>
        </div>

        <div className="mt-6">
          <Ads />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h1 className="heading-4 font-medium text-primary">المدونات</h1>

          <Button asChild size={"sm"} variant={"outline"}>
            <Link href="ad-or-blog-request/blog-request">طلب مدونة</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 items-start gap-10">
          {staticBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
