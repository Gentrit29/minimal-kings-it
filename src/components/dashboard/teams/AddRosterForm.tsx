import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Roster, Team } from "@/lib/types";

import { useInsertRoster, useTeamsWithRosters, useUpdateRoster } from "@/hooks";

import { IoIosCloseCircleOutline } from "react-icons/io";

interface AddRosterFormProps {
  onToggleRosterForm: (value: boolean) => void;
  toggleRosterForm: boolean;
  roster: Roster | null;
  setSelectedRoster: (roster: Roster | null) => void;
}

export default function AddRosterForm({
  onToggleRosterForm,
  toggleRosterForm,
  roster,
  setSelectedRoster,
}: AddRosterFormProps) {
  const { register, handleSubmit, watch, reset } = useForm<Roster>({
    defaultValues: roster ?? {
      name: "",
      team_id: undefined,
      role: "player",
      status: "wildcard",
    },
  });

  const { data } = useTeamsWithRosters();

  const { insertRosterMutation } = useInsertRoster();
  const { updateRosterMutation } = useUpdateRoster();

  const onSubmit: SubmitHandler<Roster> = (data) => {
    if (roster) {
      updateRosterMutation(data);
    } else {
      insertRosterMutation(data);
    }

    reset();
    onToggleRosterForm(false);
  };

  useEffect(() => {
    if (toggleRosterForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleRosterForm]);

  return (
    <form
      className="mx-5 flex w-full max-w-md flex-col gap-6 rounded-lg border border-neutral-700 bg-neutral-900 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 rounded-lg border border-neutral-600 px-2 py-1 text-lg">
          Roster Form
        </h2>
        <button
          className="cursor-pointer rounded-lg transition-all hover:bg-neutral-800 hover:p-0.5"
          onClick={() => {
            reset();
            setSelectedRoster(null);
            onToggleRosterForm(false);
          }}
        >
          <IoIosCloseCircleOutline className="h-8 w-8 text-red-500" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name..."
          className="w-full rounded-md border border-neutral-600 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("name", { required: true })}
        />
        <select
          className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("team_id", { required: true })}
        >
          {data?.map((team: Team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <select
          className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
          {...register("role", { required: true })}
        >
          <option value="player">Player</option>
          <option value="coach">Coach</option>
          <option value="staff">Staff</option>
        </select>
        {watch("role") === "player" && (
          <select
            className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
            {...register("status", { required: true })}
          >
            <option value="draft">Draft</option>
            <option value="wildcard">Wildcard</option>
            <option value="transfer">Transfer</option>
          </select>
        )}
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
