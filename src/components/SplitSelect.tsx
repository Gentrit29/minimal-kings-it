"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { SplitWithWinner } from "@/lib/types";

interface SplitSelectProps {
  value?: number;
  onChange: (val: number) => void;
  splits: SplitWithWinner[];
  className?: string;
}

export default function SplitSelect({
  value,
  onChange,
  splits,
  className,
}: SplitSelectProps) {
  return (
    <div className={className}>
      <Select
        value={value?.toString()}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleziona Split" />
        </SelectTrigger>
        <SelectContent>
          {splits.map((split) => (
            <SelectItem key={split.id} value={split.id!.toString()}>
              {split.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
