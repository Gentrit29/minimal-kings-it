import { Skeleton } from "./ui/skeleton";

export default function SplitSkeleton({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 px-8 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-card border-border text-card-foreground flex flex-col gap-2 rounded-md p-4"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="bg-border h-4 w-0.5 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
          {isDashboard && (
            <div className="mt-4 flex items-center justify-end gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
