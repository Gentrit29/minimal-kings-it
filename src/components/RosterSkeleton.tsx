import { Skeleton } from "./ui/skeleton";

export default function RosterSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-8 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton
          key={i}
          className="bg-card flex max-h-[450px] w-full flex-col items-center justify-evenly space-y-6 rounded-md p-4"
        >
          <Skeleton className="h-44 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-36" />
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-4 w-10 rounded-md" />
              <Skeleton className="h-4 w-10 rounded-md" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  );
}
