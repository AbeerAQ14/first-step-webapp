import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import StarRatingView from "../StarRating";
import { Button } from "@/components/ui/button";
import { CenterRegisterPayload } from "@/types";
import Link from "next/link";
import { createSlug } from "@/lib/utils";

const NurseryCard = ({ nursery }: { nursery: CenterRegisterPayload }) => {
  const slug = createSlug(nursery.nursery_name, "ar");
  return (
    // <Link href={`/nurseries/${slug}`} className="block">
      <div className="px-2 py-1 shadow-[0px_4px_36px_rgba(0,0,0,0.08)] rounded-2xl">
        <div className="flex flex-col gap-4 lg:flex-row rtl:lg:flex-row-reverse lg:justify-between lg:h-full">
          <div className="relative flex-1 grow lg:max-w-[18.75rem] aspect-[300/200] rounded-[.75rem] overflow-hidden">
            <Button
              variant="ghost"
              size={"icon"}
              className="absolute top-2 left-2 p-5 z-10"
            >
              <Heart className="size-6 stroke-white" />
            </Button>

            <Image
              className="object-center object-cover"
              src={
                "https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={nursery.nursery_name}
              fill
              unoptimized
            />
          </div>

          <div className="flex-1 py-8 lg:py-14 flex flex-col gap-y-1 items-start lg:justify-center">
            <span className="heading-4 font-bold text-gray">
              {nursery.nursery_name}
            </span>
            <span className="text-mid-gray">فروع السنتر</span>
            <div className="flex items-center gap-1">
              <MapPin size={16} className="stroke-info" />
              <span className="text-sm text-mid-gray">
                {nursery.city} - {nursery.neighborhood}
              </span>
            </div>

            <div>
              <StarRatingView maxStars={5} value={4} />
            </div>
          </div>
        </div>
      </div>
    // </Link>
  );
};

export default NurseryCard;
