import { Skeleton } from "./ui/skeleton";

export default function PresidentSkeleton({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 px-8 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={i}
          className="bg-card flex max-h-[450px] w-full flex-col items-center justify-evenly space-y-6 rounded-md p-4"
        >
          <Skeleton className="h-52 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-60" />
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          {isDashboard && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          )}
        </Skeleton>
      ))}
    </div>
  );
}
