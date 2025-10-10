"use client";

import SplitCard from "@/components/shared/SplitCard";

import SplitSkeleton from "@/components/SplitSkeleton";

import { useSplits } from "@/hooks";

import { SplitWithWinner } from "@/lib/types";

export default function Splits() {
  const { data, isLoading } = useSplits();

  if (isLoading) return <SplitSkeleton isDashboard={false} />;

  return (
    <main className="px-8 py-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {data?.map((split: SplitWithWinner) => (
          <SplitCard key={split.id} split={split} />
        ))}
      </div>
    </main>
  );
}
