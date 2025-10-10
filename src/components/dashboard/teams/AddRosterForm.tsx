import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { useLockBodyOverflow } from "@/hooks/ui";

import { Roster } from "@/lib/types";

import {
  useInsertRoster,
  useSplits,
  useTeamsWithRosters,
  useUpdateRoster,
} from "@/hooks";

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

interface AddRosterFormProps {
  onToggleRosterForm: (value: boolean) => void;
  toggleRosterForm: boolean;
  roster: Roster | null;
  setSelectedRoster: (roster: Roster | null) => void;
}

const formRoster = z
  .object({
    name: z.string().min(2, {
      message: "Nome è richiesto",
    }),
    team_id: z.number({ message: "Squadra richiesta" }),
    split_id: z.number({ message: "Split richiesto" }),
    role: z.enum(["coach", "staff", "player"], {
      message: "Posizione richiesta",
    }),
    status: z.enum(["draft", "wildcard", "transfer"]).optional(),
    role_field: z.enum(["ATT", "CC", "DIF", "POR"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "player") {
      if (!data.status) {
        ctx.addIssue({
          path: ["status"],
          message: "Status richiesto",
          code: "custom",
        });
      }
      if (!data.role_field) {
        ctx.addIssue({
          path: ["role_field"],
          message: "Ruolo richiesto",
          code: "custom",
        });
      }
    }
  });

type FormRosterType = z.infer<typeof formRoster>;

export default function AddRosterForm({
  onToggleRosterForm,
  toggleRosterForm,
  roster,
  setSelectedRoster,
}: AddRosterFormProps) {
  const form = useForm<FormRosterType>({
    resolver: zodResolver(formRoster),
    defaultValues: roster
      ? {
          ...roster,
          status: roster.status ?? undefined,
          role_field: roster.role_field ?? undefined,
        }
      : {
          name: "",
          team_id: undefined,
          split_id: undefined,
          role: "staff",
          status: undefined,
          role_field: undefined,
        },
  });

  const { data } = useTeamsWithRosters();
  const { data: splits } = useSplits();

  const { insertRosterMutation } = useInsertRoster();
  const { updateRosterMutation } = useUpdateRoster();

  const onSubmit: SubmitHandler<FormRosterType> = (data) => {
    if (roster) {
      updateRosterMutation({ ...data, id: roster.id });
    } else {
      insertRosterMutation(data);
    }

    form.reset();
    onToggleRosterForm(false);
  };

  useLockBodyOverflow(toggleRosterForm);

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
            setSelectedRoster(null);
            onToggleRosterForm(false);
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
          name="split_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Split</FormLabel>
              <FormControl>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona Split" />
                  </SelectTrigger>
                  <SelectContent>
                    {splits?.map((split) => (
                      <SelectItem key={split.id} value={String(split.id)}>
                        {split.name}
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
          name="team_id"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posizione</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona Posizione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("role") === "player" && (
          <>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stato</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(v) =>
                        field.onChange(v === "" ? undefined : v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleziona Stato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wildcard">Wildcard</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role_field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruolo</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(v) =>
                        field.onChange(v === "" ? undefined : v)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleziona Ruolo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ATT">ATT</SelectItem>
                        <SelectItem value="CC">CC</SelectItem>
                        <SelectItem value="DIF">DIF</SelectItem>
                        <SelectItem value="POR">POR</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button role="submit" variant="default">
          Invia
        </Button>
      </form>
    </Form>
  );
}
