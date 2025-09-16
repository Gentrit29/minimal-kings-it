import { differenceInDays } from "date-fns";

//helper function for "New" label
//display label if the difference in days between created_at (from DB)
//and the current day is 3 days or less
export function isNew(createdAt: string) {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffDays = differenceInDays(now, createdDate);
  console.log(diffDays);
  return diffDays <= 3;
}
