import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { President } from "@/lib/types";

import {
  useInsertPresident,
  useUpdatePresident,
  useUploadPresidentPhoto,
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

import { Button } from "@/components/ui/Button";

import { CircleX } from "lucide-react";

import { useLockBodyOverflow } from "@/hooks/ui";

interface AddPresidentFormProps {
  onTogglePresidentForm: (value: boolean) => void;
  togglePresidentForm: boolean;
  president: President | null;
  setSelectedPresident: (president: President | null) => void;
}

const formPresident = z.object({
  name: z.string().min(2, {
    message: "Nome è richiesto",
  }),
  photo: z
    .union([z.instanceof(File), z.string()])
    .refine((val) => !!val, { message: "Foto è richiesta" }),
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
}: AddPresidentFormProps) {
  const form = useForm<FormPresidentType>({
    resolver: zodResolver(formPresident),
    defaultValues: president ?? {
      name: "",
      photo: "",
      social_links: {
        twitch: "",
        instagram: "",
        youtube: "",
      },
    },
  });
  const { insertPresidentMutation } = useInsertPresident();
  const { updatePresidentMutation } = useUpdatePresident();
  const { uploadPresidentPhotoMutation } = useUploadPresidentPhoto();

  const onSubmit: SubmitHandler<FormPresidentType> = async (data) => {
    let photoUrl: string;

    // insert new president with empty photo
    if (!president) {
      const newPresident = await insertPresidentMutation({
        ...data,
        photo: "",
      });

      // check for the photo type and if the president has been created
      if (data.photo instanceof File && newPresident.id != null) {
        // upload the photo to the bucket with the id of the new president
        photoUrl = await uploadPresidentPhotoMutation({
          file: data.photo,
          presidentId: newPresident.id,
        });
      } else {
        photoUrl = typeof data.photo === "string" ? data.photo : "";
      }

      // update the new president with the uploaded photo URL
      await updatePresidentMutation({
        ...data,
        id: newPresident.id,
        photo: photoUrl,
      });
    } else {
      //edit mode: update president fields, replace photo if a new file is uploaded
      if (data.photo instanceof File && president.id) {
        photoUrl = await uploadPresidentPhotoMutation({
          file: data.photo,
          presidentId: president.id,
        });
      } else {
        photoUrl = typeof data.photo === "string" ? data.photo : "";
      }
      // update existing president with new data
      await updatePresidentMutation({
        ...data,
        id: president.id,
        photo: photoUrl,
      });
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
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                />
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
