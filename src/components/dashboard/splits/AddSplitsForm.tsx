import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";

import { useLockBodyOverflow } from "@/hooks/ui";

import { useInsertSplit, useTeamsWithRosters, useUpdateSplit } from "@/hooks";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/Button";

import { CircleX } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { Split } from "@/lib/types";

interface AddSplitsFormProps {
  onToggleSplitsForm: (value: boolean) => void;
  toggleSplitsForm: boolean;
  split: Split | null;
  setSelectedSplit: (split: Split | null) => void;
}

const formSplits = z.object({
  name: z.string().min(2, {
    message: "Nome è richiesto",
  }),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  winner_team_id: z.number().optional(),
});

type FormSplitsType = z.infer<typeof formSplits>;

export default function AddSplitsForm({
  onToggleSplitsForm,
  toggleSplitsForm,
  split,
  setSelectedSplit,
}: AddSplitsFormProps) {
  const form = useForm<FormSplitsType>({
    resolver: zodResolver(formSplits),
    defaultValues: split
      ? {
          name: split.name,
          start_date: split.start_date ? new Date(split.start_date) : undefined,
          end_date: split.end_date ? new Date(split.end_date) : undefined,
          winner_team_id: split.winner_team_id,
        }
      : {
          name: "",
          start_date: undefined,
          end_date: undefined,
          winner_team_id: undefined,
        },
  });

  const { data } = useTeamsWithRosters();
  const { insertSplitMutation } = useInsertSplit();
  const { updateSplitMutation } = useUpdateSplit();

  const onSubmit: SubmitHandler<FormSplitsType> = (data) => {
    // start_date and end_date are type timestampz in my db so it expects string in format ISO
    const payload = {
      ...data,
      start_date: data.start_date?.toISOString(),
      end_date: data.end_date?.toISOString(),
    };

    if (split) {
      updateSplitMutation({ ...payload, id: split.id });
    } else {
      insertSplitMutation(payload);
    }

    form.reset();
    onToggleSplitsForm(false);
  };

  useLockBodyOverflow(toggleSplitsForm);

  return (
    <Form {...form}>
      <form
        className="border-border bg-card mx-5 flex w-full max-w-md flex-col gap-3 rounded-lg border p-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Button
          variant="destructive"
          className="ml-auto"
          onClick={() => {
            form.reset();
            setSelectedSplit(null);
            onToggleSplitsForm(false);
          }}
        >
          <CircleX />
        </Button>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="winner_team_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((team) => (
                      <SelectItem key={team.id} value={String(team.id)}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data di inizio</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data di fine</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button role="submit" variant="default">
          Invia
        </Button>
      </form>
    </Form>
  );
}
