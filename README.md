# AppointEase 📅

A React Native mobile application for booking appointments with service providers. Built with Expo (SDK 54) and file-based routing via Expo Router.

---

## Features

### User Authentication
- Register a new account with name, email, phone, and password
- Log in and log out securely
- Session persisted across app restarts using `expo-file-system`

### Service Provider Listing
- Browse 8 mock service providers across 4 categories: Healthcare, Fitness, Wellness, Beauty
- Search providers by name or specialty
- Filter by category using chip buttons
- View provider details: rating, reviews, experience, fee, location, and about section

### Appointment Scheduling
- Select a provider and tap **Book Appointment**
- Pick a date from the next 14 days
- Choose from available time slots (unavailable slots are greyed out)
- Review a booking summary before confirming
- Booked appointments immediately appear in the Appointments tab

### Appointment Management
- View all **Upcoming** appointments with date, time, provider, and fee
- Switch to **Cancelled** tab to see cancelled bookings
- Cancel any upcoming appointment with a confirmation dialog

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.81 |
| Platform | Expo SDK 54 |
| Routing | Expo Router v6 (file-based) |
| Storage | expo-file-system/legacy |
| Styling | React Native StyleSheet |
| Gradients | expo-linear-gradient |
| Icons | @expo/vector-icons (MaterialCommunityIcons) |
| Date handling | date-fns v4 |
| Language | TypeScript |

---

## Project Structure

```
app/
├── _layout.tsx              # Root layout — AuthProvider + navigation guard
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx            # Login screen
│   └── register.tsx         # Registration screen
├── (tabs)/
│   ├── _layout.tsx          # Bottom tab navigator
│   ├── home.tsx             # Provider listing with search & filter
│   ├── appointments.tsx     # Upcoming & cancelled appointments
│   └── profile.tsx          # User profile, stats, logout
├── provider/
│   └── [id].tsx             # Provider detail screen
└── book/
    └── [id].tsx             # Date & time slot booking screen

components/
├── Button.tsx               # Gradient / outline / ghost button
├── Input.tsx                # Labelled input with icon & password toggle
├── ProviderCard.tsx         # Card used in the provider list
└── AppointmentCard.tsx      # Card used in the appointments list

context/
└── AuthContext.tsx          # Global auth + appointment state

data/
├── providers.ts             # Mock provider data & time slots
└── theme.ts                 # Colors and border radius constants
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/go) installed on your Android device
- PC and phone on the **same Wi-Fi network**

### Installation

```bash
# Clone or download the project
cd 4n

# Install dependencies
npm install
```

### Running the App

```bash
# Start the dev server (LAN mode)
npx expo start --clear

# Or explicitly on Android
npx expo start --android
```

Scan the QR code shown in the terminal using the **Expo Go** app on your Android device.

> **Tip:** If the QR code doesn't connect, open Expo Go and manually enter:
> `exp://<YOUR_PC_IP>:8081`
> The app scheme is `appointease://`
> Your PC IP is shown in the terminal output.

### Windows Firewall (if connection fails)

Run this in an **Administrator** terminal to allow Expo through the firewall:

```bash
netsh advfirewall firewall add rule name="Expo Metro" dir=in action=allow protocol=TCP localport=8081
```

---

## Screens Overview

| Screen | Route | Description |
|---|---|---|
| Login | `/(auth)/login` | Email + password sign in |
| Register | `/(auth)/register` | New account creation |
| Discover | `/(tabs)/home` | Provider list, search, category filter |
| Appointments | `/(tabs)/appointments` | Upcoming & cancelled bookings |
| Profile | `/(tabs)/profile` | Account info, stats, sign out |
| Provider Detail | `/provider/[id]` | Full provider profile + book button |
| Book | `/book/[id]` | Date picker + time slot selection |

---

## Data Persistence

All data is stored locally on the device using `expo-file-system/legacy`:

| File | Contents |
|---|---|
| `ae_users.json` | All registered user accounts |
| `ae_session.json` | Currently logged-in user |
| `ae_appts_<userId>.json` | Appointments per user |

No backend or internet connection is required (provider images load from `randomuser.me`).

---

## Mock Providers

| Name | Category | Specialty |
|---|---|---|
| Dr. Sarah Mitchell | Healthcare | General Physician |
| James Thornton | Fitness | Personal Trainer |
| Dr. Priya Sharma | Wellness | Therapist & Counselor |
| Marcus Lee | Beauty | Hair Stylist |
| Dr. Elena Vasquez | Healthcare | Dentist |
| Ryan Patel | Fitness | Yoga Instructor |
| Dr. Aisha Okonkwo | Healthcare | Dermatologist |
| Sophie Laurent | Beauty | Makeup Artist |

---

## Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Start and open on Android
npm run lint       # Run ESLint
```

---

## Known Limitations

- Provider data is static mock data (no real backend)
- No real payment processing — fees are display only
- Profile editing is not implemented
- Push notifications for appointment reminders are not implemented
