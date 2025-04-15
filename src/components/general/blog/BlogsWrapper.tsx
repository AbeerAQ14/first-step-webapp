import { blogService } from "@/services/api";
import Blogs from "./Blogs";

const BlogsWrapper = async ({
  locale,
  number,
}: {
  locale: string;
  number?: number;
}) => {
  const blogs = await blogService.getBlogs(locale);
  const latestBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, number);

  return <Blogs blogs={number ? latestBlogs : blogs} />;
};

export default BlogsWrapper;
