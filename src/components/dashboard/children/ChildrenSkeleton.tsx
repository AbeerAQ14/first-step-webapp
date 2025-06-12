import { Skeleton } from "@/components/ui/skeleton";

const ChildrenSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-sidebar border-b border-light-gray p-6 flex flex-col lg:flex-row gap-8"
        >
          <div className="flex flex-col gap-y-6">
            <div className="flex items-start gap-4">
              <Skeleton className="w-[91.32px] h-[120px]" />
              <div className="flex flex-col gap-2 lg:gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-56" />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div>
              <Skeleton className="h-6 w-32 mb-1" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div>
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div>
              <Skeleton className="h-6 w-40 mb-1" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildrenSkeleton;
