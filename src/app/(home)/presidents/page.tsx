"use client";

import PresidentSkeleton from "@/components/PresidentSkeleton";
import PresidentCard from "@/components/shared/PresidentCard";
import { usePresidents } from "@/hooks";
import { President } from "@/lib/types";

export default function Presidents() {
  const { data, isLoading } = usePresidents();

  if (isLoading) return <PresidentSkeleton isDashboard={false} />;
  return (
    <main className="px-8 py-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((p: President) => (
          <PresidentCard key={p.id} president={p} />
        ))}
      </div>
    </main>
  );
}
