import DashboardTeams from "./page";

export const metadata = {
  title: "Dashboard Squadre | Minimal Kings IT",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeamsDashboardLayout() {
  return <DashboardTeams />;
}
