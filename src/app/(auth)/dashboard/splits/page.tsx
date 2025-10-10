"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import { CirclePlus, Pencil, Trash, UserStar } from "lucide-react";

import AddSplitsForm from "@/components/dashboard/splits/AddSplitsForm";

import { Split, SplitWithWinner } from "@/lib/types";

import SplitCard from "@/components/shared/SplitCard";

import SplitSkeleton from "@/components/SplitSkeleton";

import { useDeleteSplit, useSplits } from "@/hooks";

export default function DashboardSplits() {
  const [toggleSplitsForm, setToggleSplitsForm] = useState(false);
  const [selectedSplit, setSelectedSplit] = useState<Split | null>(null);

  const { data: splits, isLoading } = useSplits();

  const { deleteSplitMutation } = useDeleteSplit();

  const handleEditSplit = (split: Split) => {
    setSelectedSplit(split);
    setToggleSplitsForm(true);
  };

  return (
    <div className="space-y-2 px-8 py-10">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <h2 className="border-border bg-card flex w-full items-center gap-2 rounded-lg border px-4 py-2 sm:w-fit">
          <UserStar />
          Dashboard Splits KL
        </h2>
        <Button
          variant="default"
          className="ml-auto w-full sm:w-fit"
          onClick={() => {
            setSelectedSplit(null);
            setToggleSplitsForm(true);
          }}
        >
          <CirclePlus /> Split
        </Button>
      </div>
      {isLoading ? (
        <SplitSkeleton isDashboard={true} />
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {splits?.map((split: SplitWithWinner) => (
            <SplitCard key={split.id} split={split}>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleEditSplit({
                    ...split,
                    winner_team_id: split.winner_team_id?.id,
                  })
                }
              >
                <Pencil />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteSplitMutation(split.id!)}
              >
                <Trash />
              </Button>
            </SplitCard>
          ))}
        </div>
      )}
      {toggleSplitsForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddSplitsForm
            onToggleSplitsForm={setToggleSplitsForm}
            toggleSplitsForm={toggleSplitsForm}
            split={selectedSplit}
            setSelectedSplit={setSelectedSplit}
          />
        </div>
      )}
    </div>
  );
}
