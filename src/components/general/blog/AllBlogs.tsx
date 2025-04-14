import { Blog } from "@/types";
import BlogCard from "./BlogCard";

const AllBlogs = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <section className="container mx-auto px-4">
      <div className="space-y-6 max-w-[77.5rem] mx-auto">
        {/* header */}
        <div className="space-y-4 text-center">
          <h2 className="heading-3 text-primary text-center">
            <span>مدونة</span>
            <span className="block">First Step</span>
          </h2>

          <p className="text-sm md:text-base text-gray">
            مقالات وموارد حول رعاية الأطفال وتحقيق التوازن بين العمل والحياة
            الأسرية
          </p>
        </div>

        {/* blogs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 items-center gap-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
