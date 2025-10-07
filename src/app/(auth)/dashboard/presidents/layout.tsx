import DashboardPresidents from "./page";

export const metadata = {
  title: "Dashboard Presidenti | Minimal Kings IT",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PresidentsDashboardLayout() {
  return <DashboardPresidents />;
}
