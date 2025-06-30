import BlogCard from "@/components/general/blog/BlogCard";
import Header from "@/components/general/blog/Header";
import Contact from "@/components/general/contact/Contact";
import { Blog } from "@/types";
import Image from "next/image";

export const revalidate = 86400;

const blogs: Blog[] = [
  {
    id: 1,
    title: "The Importance of Outdoor Play for Children",
    description:
      "Exploring the benefits of outdoor activities in early childhood development and how they contribute to physical and mental growth.",
    image:
      "https://images.unsplash.com/photo-1750801321932-3d3e3fcdfdcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Sarah Johnson",
    created_at: "2025-06-01",
    published_at: "2025-06-02",
  },
  {
    id: 2,
    title: "Top 5 Nutritious Snacks for Kids at School",
    description:
      "Discover healthy and easy-to-make snacks that will keep your child energized and focused during school hours.",
    image:
      "https://images.unsplash.com/photo-1750801321932-3d3e3fcdfdcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "James Lee",
    created_at: "2025-06-05",
    published_at: "2025-06-06",
  },
  {
    id: 3,
    title: "Creating a Safe Learning Environment at Home",
    description:
      "Tips and strategies for parents to turn their home into a stimulating and secure space for early learning.",
    image:
      "https://images.unsplash.com/photo-1750801321932-3d3e3fcdfdcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Emily Davis",
    created_at: "2025-06-10",
    published_at: "2025-06-11",
  },
  {
    id: 4,
    title: "Fun Craft Ideas for Preschoolers",
    description:
      "Keep your little ones engaged with these simple and creative DIY craft projects perfect for preschool-age children.",
    image:
      "https://images.unsplash.com/photo-1750801321932-3d3e3fcdfdcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Michael Thompson",
    created_at: "2025-06-15",
    published_at: "2025-06-16",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string; blogId: string }>;
}) {
  const { locale, blogId } = await params;

  return (
    <div className="mb-9">
      <div className="relative w-full aspect-[1440/610]">
        <Image
          className="object-cover object-center"
          src="https://images.unsplash.com/photo-1750801321932-3d3e3fcdfdcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="blog title"
          fill
        />
      </div>

      <div className="mt-9 container px-4 mx-auto flex flex-col gap-6 lg:flex-row xl:gap-12 2xl:gap-14.5">
        <div className="flex-[3]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nisi,
          eligendi expedita nam libero nostrum? Nam, illo sequi? Sit laborum
          eius earum similique, facilis ratione ut. Beatae modi aut quaerat,
          debitis dicta temporibus alias voluptas, voluptate aspernatur deserunt
          cum magni. Quidem, officia suscipit. Ducimus eos, veniam illum quos
          ipsam explicabo ab hic, inventore vero harum ex distinctio corporis
          porro error asperiores amet! Est, fugiat animi ad porro recusandae
          commodi eum libero sunt sint praesentium, officiis aut natus ducimus
          architecto unde non facere quidem doloribus delectus. Reiciendis quae,
          aliquam eligendi eius hic nobis ipsum cumque quaerat est. Non, quod
          laudantium. A.
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h4 className="text-primary">مدونة ذات صلة</h4>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 items-center gap-5">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
