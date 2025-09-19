import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Team } from "@/lib/types";

import { useInsertTeam, usePresidents, useUpdateTeam } from "@/hooks";

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

import { useLockBodyOverflow } from "@/hooks/ui";

interface AddTeamFormProps {
  onToggleTeamForm: (value: boolean) => void;
  toggleTeamForm: boolean;
  team: Team | null;
  setSelectedTeam: (team: Team | null) => void;
}

const formTeam = z.object({
  name: z.string().min(2, {
    message: "Nome è richiesto",
  }),
  president_id: z.number({ message: "Presidente è richiesto" }),
  logo: z.string().min(2, { message: "Foto richiesta" }),
  kl_link: z.url({ message: "URL richiesto" }),
});

type FormTeamType = z.infer<typeof formTeam>;

export default function AddTeamForm({
  onToggleTeamForm,
  toggleTeamForm,
  team,
  setSelectedTeam,
}: AddTeamFormProps) {
  const form = useForm<FormTeamType>({
    resolver: zodResolver(formTeam),
    defaultValues: team ?? {
      name: "",
      logo: "",
      kl_link: "",
      president_id: undefined,
    },
  });
  const { insertTeamMutation } = useInsertTeam();
  const { updateTeamMutation } = useUpdateTeam();
  const { data } = usePresidents();

  const onSubmit: SubmitHandler<FormTeamType> = (data) => {
    if (team) {
      updateTeamMutation({ ...data, id: team.id });
    } else {
      insertTeamMutation(data);
    }

    form.reset();
    onToggleTeamForm(false);
  };

  useLockBodyOverflow(toggleTeamForm);

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
            setSelectedTeam(null);
            onToggleTeamForm(false);
          }}
        >
          <CircleX />
        </Button>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Squadra</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="president_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presidente</FormLabel>
              <FormControl>
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona Presidente" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((president) => (
                      <SelectItem
                        key={president.id}
                        value={String(president.id)}
                      >
                        {president.name}
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
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Logo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kl_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Squadra</FormLabel>
              <FormControl>
                <Input {...field} />
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
