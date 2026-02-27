# CarePulse — Healthcare Patient Management System

A full-stack healthcare management web application that streamlines the entire patient journey — from registration and appointment booking to admin scheduling and SMS notifications — built with Next.js 16 and Appwrite.

**Live Demo:** [https://careconnect-patient-system.vercel.app](https://careconnect-patient-system.vercel.app)
**Admin Dashboard:** [https://careconnect-patient-system.vercel.app/admin](https://careconnect-patient-system.vercel.app/admin)

---

## What This App Does

CarePulse has two separate flows:

**Patient Flow**
1. Patient enters their name, email, and phone number on the home page
2. They are redirected to a full medical registration form (insurance, allergies, medications, emergency contacts, ID upload, consents)
3. After registration, they can book an appointment by selecting a doctor, date, and reason
4. A success page confirms their appointment details

**Admin Flow**
1. Admin clicks the "Admin" link and enters a 6-digit passkey
2. The admin dashboard shows all appointments in a data table with counts for scheduled, pending, and cancelled
3. Admin can schedule or cancel any appointment
4. Patient receives an automatic SMS notification when their appointment status changes

---

## Features

- Patient registration with full medical history and ID document upload
- Appointment booking with doctor selection and date/time picker
- Admin dashboard protected by a 6-digit passkey
- Real-time appointment status management (scheduled / pending / cancelled)
- SMS notifications to patients via Appwrite Messaging
- Error monitoring and page-view metrics via Sentry
- Fully responsive UI with dark mode support

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | TailwindCSS, Shadcn/ui, Radix UI |
| Forms | React Hook Form + Zod |
| Database & Backend | Appwrite (Database, Storage, Users, Messaging) |
| Data Table | TanStack React Table |
| Date Picker | react-datepicker |
| Phone Input | react-phone-number-input |
| OTP Input | input-otp |
| File Upload | react-dropzone |
| Monitoring | Sentry (@sentry/nextjs) |
| Icons | Lucide React |
| Theme | next-themes |
| Deployment | Vercel |

---

## Project Structure

```
careconnect-patient-system/
├── app/
│   ├── page.tsx                              # Home page — patient login form
│   ├── admin/
│   │   └── page.tsx                          # Admin dashboard
│   └── patients/[userId]/
│       ├── register/page.tsx                 # Patient medical registration
│       └── new-appointment/
│           ├── page.tsx                      # Appointment booking
│           └── success/page.tsx              # Booking confirmation
├── components/
│   ├── forms/
│   │   ├── PatientForm.tsx                   # Home login form
│   │   ├── RegisterForm.tsx                  # Full medical registration form
│   │   └── Appointment.tsx                   # Appointment booking form
│   ├── table/
│   │   └── DataTable.tsx                     # Admin appointments table
│   ├── PasskeyModal.tsx                      # Admin passkey dialog
│   ├── AppointmentModal.tsx                  # Schedule/cancel dialog
│   └── ui/                                   # Shadcn/ui components
├── lib/
│   ├── appwrite.config.ts                    # Appwrite client setup
│   ├── utils.ts                              # Utility functions
│   ├── validation.ts                         # Zod schemas
│   └── actions/
│       ├── patient.action.ts                 # Patient server actions
│       └── appointment.actions.tsx           # Appointment server actions
├── types/
│   └── appwrite.types.ts                     # TypeScript types
├── constants/
│   └── index.ts                              # Doctors list, status types, etc.
├── public/
│   └── assets/                               # Images, icons, gifs
├── sentry.server.config.ts                   # Sentry server config
├── sentry.edge.config.ts                     # Sentry edge config
├── instrumentation.ts                        # Sentry instrumentation
├── instrumentation-client.ts                 # Sentry client-side init
└── next.config.ts                            # Next.js + Sentry config
```

---

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) v18 or higher
- An [Appwrite](https://appwrite.io/) account (free tier works)
- A [Sentry](https://sentry.io/) account (optional — for error monitoring)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RobertBhanuPrasad/careconnect-patient-system.git
cd careconnect-patient-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Appwrite

Log in to your [Appwrite Console](https://cloud.appwrite.io/) and do the following:

1. **Create a project** — copy the Project ID
2. **Create a database** — copy the Database ID
3. **Create two collections** inside the database:
   - `patients` — copy the Collection ID
   - `appointments` — copy the Collection ID
4. **Create a storage bucket** — copy the Bucket ID
5. **Generate an API key** with full permissions — copy the key
6. **Enable Messaging** (for SMS) — configure your SMS provider in Appwrite

### 4. Create your environment file

Create a `.env.local` file in the root of the project:

```env
# Appwrite
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=your_appwrite_project_id
API_KEY=your_appwrite_api_key
DATABASE_ID=your_database_id
PATIENT_COLLECTION_ID=your_patient_collection_id
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
NEXT_PUBLIC_BUCKET_ID=your_storage_bucket_id

# Admin
NEXT_PUBLIC_ADMIN_PASSKEY=123456

# Sentry (optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

> **Note:** Never commit your `.env.local` file. It is already listed in `.gitignore`.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_ENDPOINT` | Yes | Appwrite API endpoint URL |
| `PROJECT_ID` | Yes | Your Appwrite project ID |
| `API_KEY` | Yes | Appwrite API key (server-side only) |
| `DATABASE_ID` | Yes | Appwrite database ID |
| `PATIENT_COLLECTION_ID` | Yes | Appwrite patients collection ID |
| `APPOINTMENT_COLLECTION_ID` | Yes | Appwrite appointments collection ID |
| `NEXT_PUBLIC_BUCKET_ID` | Yes | Appwrite storage bucket ID for ID documents |
| `NEXT_PUBLIC_ADMIN_PASSKEY` | Yes | 6-digit passkey to access the admin dashboard |
| `SENTRY_AUTH_TOKEN` | No | Sentry auth token for source map uploads |

---

## How to Access the Admin Dashboard

1. Go to the home page
2. Click the **Admin** link in the bottom right corner
3. Enter the 6-digit passkey you set in `NEXT_PUBLIC_ADMIN_PASSKEY`
4. You will be redirected to `/admin`

---

## Deployment (Vercel)

This project is configured for deployment on [Vercel](https://vercel.com/).

**Deployed URL:** https://careconnect-patient-system.vercel.app

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add all environment variables from the table above in **Vercel → Settings → Environment Variables**
4. Also add `DISABLE_ESLINT_PLUGIN=true` to skip ESLint during Vercel builds
5. Deploy

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server at localhost:3000 |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Key Doctors Available

The app comes with 9 pre-configured doctors:

John Green, Leila Cameron, David Livingston, Evan Peter, Jane Powell, Alex Ramirez, Jasmine Lee, Alyana Cruz, Hardik Sharma

---

## License

This project is for educational purposes. Feel free to use and modify it.
