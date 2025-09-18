import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { President } from "@/lib/types";

import { useInsertPresident, useUpdatePresident } from "@/hooks";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/Button";

import { CircleX } from "lucide-react";

import { useLockBodyOverflow } from "@/hooks/ui";

interface AddTeamFormProps {
  onTogglePresidentForm: (value: boolean) => void;
  togglePresidentForm: boolean;
  president: President | null;
  setSelectedPresident: (president: President | null) => void;
}

const formPresident = z.object({
  name: z.string().min(2, {
    message: "Nome è richiesto",
  }),
  photo: z.string({ message: "Foto è richiesta" }),
  social_links: z.object({
    twitch: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
  }),
});

type FormPresidentType = z.infer<typeof formPresident>;

export default function AddPresidentForm({
  onTogglePresidentForm,
  togglePresidentForm,
  president,
  setSelectedPresident,
}: AddTeamFormProps) {
  const form = useForm<FormPresidentType>({
    resolver: zodResolver(formPresident),
    defaultValues: president ?? {
      name: "",
      photo: undefined,
      social_links: {
        twitch: "",
        instagram: "",
        youtube: "",
      },
    },
  });
  const { insertPresidentMutation } = useInsertPresident();
  const { updatePresidentMutation } = useUpdatePresident();

  const onSubmit: SubmitHandler<FormPresidentType> = (data) => {
    if (president) {
      updatePresidentMutation(data);
    } else {
      insertPresidentMutation(data);
    }

    form.reset();
    onTogglePresidentForm(false);
  };

  useLockBodyOverflow(togglePresidentForm);

  return (
    <Form {...form}>
      <form
        className="border-border bg-card mx-5 flex w-full max-w-lg flex-col gap-3 rounded-lg border p-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Button
          variant="destructive"
          className="ml-auto"
          onClick={() => {
            form.reset();
            setSelectedPresident(null);
            onTogglePresidentForm(false);
          }}
        >
          <CircleX />
        </Button>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Presidente</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Presidente</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_links.twitch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Twitch</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_links.instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Instagram</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_links.youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Youtube</FormLabel>
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
