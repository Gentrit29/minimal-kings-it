# Minimal Kings

A web app providing a minimal overview of Italian teams, rosters, and presidents in the Kings League IT.  
This project aims to deliver fast discovery of Italian teams and newly added players, categorized by roles, staff, coaches, and presidents.

**Disclaimer:** This is a personal project and is not affiliated with Kings League. All trademarks, logos, and names mentioned belong to their respective owners. All rights reserved.

![App](/public/minimal_kings_it-screenshot.png)

## Features

- Sections for teams, rosters, and presidents
- Teams page: quick overview of all teams with presidents, logos, and rosters
- Presidents page: all social links included
- Rosters page: detailed information for players, coaches, and staff
- Dark and light themes
- Responsive design: desktop, tablet, and mobile
- Admin login: access the dashboard to manage teams, presidents, and rosters
- Newly added players are marked with a "New" label

## Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript
- **Database & Authentication:** Supabase
- **Styling:** Tailwind CSS with custom components
- **Deployment:** Vercel

## Dashboard Screenshot

|                             Teams & Rosters                             |                            Presidents                            |
| :---------------------------------------------------------------------: | :--------------------------------------------------------------: |
| ![Team & Rosters](/public/dashboard-images/dashboard-teams-rosters.png) | ![Presidents](/public/dashboard-images/dashboard-presidents.png) |

## Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=<URL>
NEXT_PUBLIC_SUPABASE_KEY=<KEY>
NEXT_PUBLIC_SUPABASE_HOSTNAME=<URL>
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Gentrit29/minimal-kings-it.git
  cd minimal-kings-it
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Open http://localhost:3000 to view your app.

## Used By

This is a personal project. Feel free to explore the code.

If you have any feedback or run into issues, you're welcome to open an issue on the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
