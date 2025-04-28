import { Button } from "@/components/ui/button";
import Ads from "@/components/dashboard/ad-or-blog-request/Ads";
import BlogCard from "@/components/general/blog/BlogCard";
import { Blog } from "@/types";

const staticBlogs: Blog[] = [
  {
    id: 1,
    title: "this is the title",
    description: "this is the title",
    image:
      "http://ef7a-196-128-72-243.ngrok-free.app/storage/Blog-images/530062108.jpg",
    created_at: "2025-03-12T09:25:49.000000Z",
    published_at: "2025-03-12",
  },
  {
    id: 2,
    title: "The Importance of Play in Child Development",
    description:
      "We believe play is a child’s natural way to express themselves and explore the world. In our nursery, we provide a rich environment full of interactive activities that boost cognitive skills and support motor and social development.",
    image:
      "http://ef7a-196-128-72-243.ngrok-free.app/storage/Blog-images/796728587.jpg",
    created_at: "2025-04-13T13:23:30.000000Z",
    published_at: "2025-04-13",
  },
  {
    id: 3,
    title: "How Do We Prepare Children for School?",
    description:
      "The transition from nursery to school is a key stage in a child’s life. Through our educational programs, we aim to develop school-readiness skills, build confidence, and foster a love of early learning in a smooth and engaging way.",
    image:
      "http://ef7a-196-128-72-243.ngrok-free.app/storage/Blog-images/896211076.jpg",
    created_at: "2025-04-13T13:24:47.000000Z",
    published_at: "2025-04-13",
  },
];

export default function CenterDashboardRequest() {
  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h1 className="heading-4 font-medium text-primary">الفروع</h1>

          <Button size={"sm"} variant={"outline"}>
            طلب إعلان
          </Button>
        </div>

        <div className="mt-6">
          <Ads />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h1 className="heading-4 font-medium text-primary">المدونات</h1>

          <Button size={"sm"} variant={"outline"}>
            طلب مدونة
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
