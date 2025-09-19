import { Skeleton } from "./ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="bg-card h-40 p-2 sm:p-4">
          <div className="flex h-full items-center">
            <div className="flex flex-col items-start space-y-2">
              <Skeleton className="h-8 w-42" />
              <Skeleton className="h-8 w-42" />
            </div>
            <div className="ml-auto flex flex-col items-center gap-2 sm:flex-row">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  );
}
