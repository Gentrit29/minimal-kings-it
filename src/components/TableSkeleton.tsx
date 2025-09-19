import { Skeleton } from "./ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 px-8 py-10 sm:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-card flex flex-col rounded-md border"
        >
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Skeleton className="hidden h-12 w-12 rounded-md sm:flex" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-border border-t">
                <tr>
                  {["Nome", "Posizione", "Stato", "Ruolo"].map((_, idx) => (
                    <th key={idx} className="border-border border-b px-3 py-2">
                      <Skeleton className="h-4 w-20" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, rowIdx) => (
                  <tr key={rowIdx} className="border-border border-b">
                    {Array.from({ length: 4 }).map((__, colIdx) => (
                      <td key={colIdx} className="px-3 py-2">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
