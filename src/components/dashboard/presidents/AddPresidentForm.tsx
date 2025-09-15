import { IoIosCloseCircleOutline } from "react-icons/io";

import { SubmitHandler, useForm } from "react-hook-form";

import { President } from "@/lib/types";

import { useInsertPresident, useUpdatePresident } from "@/hooks";
import { useEffect } from "react";

interface AddTeamFormProps {
  onTogglePresidentForm: (value: boolean) => void;
  togglePresidentForm: boolean;
  president: President | null;
  setSelectedPresident: (president: President | null) => void;
}

export default function AddPresidentForm({
  onTogglePresidentForm,
  togglePresidentForm,
  president,
  setSelectedPresident,
}: AddTeamFormProps) {
  const { register, handleSubmit, reset } = useForm<President>({
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

  const onSubmit: SubmitHandler<President> = (data) => {
    if (president) {
      updatePresidentMutation(data);
    } else {
      insertPresidentMutation(data);
    }

    reset();
    onTogglePresidentForm(false);
  };

  useEffect(() => {
    if (togglePresidentForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [togglePresidentForm]);

  return (
    <form
      className="mx-5 flex w-full max-w-md flex-col gap-6 rounded-lg border border-neutral-700 bg-neutral-900 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 rounded-lg border border-neutral-600 px-2 py-1 text-lg">
          President Form
        </h2>
        <button
          className="cursor-pointer rounded-lg transition-all hover:bg-neutral-800 hover:p-0.5"
          onClick={() => {
            reset();
            setSelectedPresident(null);
            onTogglePresidentForm(false);
          }}
        >
          <IoIosCloseCircleOutline className="h-8 w-8 text-red-500" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="President name..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("name", { required: true })}
        />
        <input
          type="text"
          placeholder="Photo link..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition-all outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("photo", { required: true })}
        />
        <input
          type="text"
          placeholder="Twitch URL..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition-all outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("social_links.twitch")}
        />
        <input
          type="text"
          placeholder="Instagram URL..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition-all outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("social_links.instagram")}
        />
        <input
          type="text"
          placeholder="Youtube URL..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition-all outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("social_links.youtube")}
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full cursor-pointer rounded-lg bg-yellow-500 py-1.5 text-white transition-transform duration-300 hover:scale-105 hover:bg-yellow-600 focus:ring-2 focus:ring-neutral-500 focus:outline-none"
      >
        Invia
      </button>
    </form>
  );
}
