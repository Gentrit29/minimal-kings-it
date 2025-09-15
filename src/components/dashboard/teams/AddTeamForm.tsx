import { IoIosCloseCircleOutline } from "react-icons/io";

import { SubmitHandler, useForm } from "react-hook-form";

import { President, Team } from "@/lib/types";

import { useInsertTeam, usePresidents, useUpdateTeam } from "@/hooks";
import { useEffect } from "react";

interface AddTeamFormProps {
  onToggleTeamForm: (value: boolean) => void;
  toggleTeamForm: boolean;
  team: Team | null;
  setSelectedTeam: (team: Team | null) => void;
}

export default function AddTeamForm({
  onToggleTeamForm,
  toggleTeamForm,
  team,
  setSelectedTeam,
}: AddTeamFormProps) {
  const { register, handleSubmit, reset } = useForm<Team>({
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

  const onSubmit: SubmitHandler<Team> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { president, roster, ...payload } = data;

    if (team) {
      updateTeamMutation(payload);
    } else {
      insertTeamMutation(payload);
    }

    reset();
    onToggleTeamForm(false);
  };

  useEffect(() => {
    if (toggleTeamForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleTeamForm]);

  return (
    <form
      className="mx-5 flex w-full max-w-md flex-col gap-6 rounded-lg border border-neutral-700 bg-neutral-900 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 rounded-lg border border-neutral-600 px-2 py-1 text-lg">
          Team Form
        </h2>
        <button
          className="cursor-pointer rounded-lg transition-all hover:bg-neutral-800 hover:p-0.5"
          onClick={() => {
            reset();
            setSelectedTeam(null);
            onToggleTeamForm(false);
          }}
        >
          <IoIosCloseCircleOutline className="h-8 w-8 text-red-500" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Team name..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("name", { required: true })}
        />
        <select
          className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("president_id", { required: true })}
        >
          {data?.map((president: President) => (
            <option key={president.id} value={president.id}>
              {president.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Logo link..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition-all outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("logo", { required: true })}
        />
        <input
          type="text"
          placeholder="External link..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition-all outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("kl_link", { required: true })}
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
