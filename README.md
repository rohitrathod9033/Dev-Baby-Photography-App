# Dev Baby Photography App

Welcome to the **Dev Baby Photography** application! This project consists of a **NestJS Backend** and a **React Native (Expo) Frontend**.

Follow this guide to install and run the application on your physical device.

## Prerequisites

1.  **Node.js**: Install from [nodejs.org](https://nodejs.org/) (LTS version recommended).
2.  **MongoDB**: Make sure MongoDB is installed and running locally on default port `27017`.
3.  **Expo Go App**: Install "Expo Go" from the App Store (iOS) or Google Play Store (Android) on your physical device.

---

## 1. Backend Setup (NestJS)

The backend handles the API, database, and authentication.

1.  Open a terminal in the `backend` folder:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Ensure your `.env` file (already created) looks like this:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/dev-baby-photography
    JWT_SECRET=supersecretkey_change_me_in_prod
    JWT_EXPIRATION=3600s
    API_URL=http://<YOUR_PC_IP>:3000  <-- IMPORTANT: Replace localhost with your PC's IP if testing on mobile
    FRONTEND_URL=http://localhost:8081
    ```
    *To find your PC's IP, run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) and look for IPv4 Address (e.g., `192.168.1.5`).*

4.  Start the server:
    ```bash
    npm run start:dev
    ```
    The server should start on `http://localhost:3000`.

---

## 2. Mobile Setup (React Native / Expo)

The mobile app connects to the backend to book slots.

1.  Open a **new** terminal in the `mobile` folder:
    ```bash
    cd mobile
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Update `mobile/.env` to point to your computer's IP address so your phone can reach the backend.
    
    Open `mobile/.env` and change:
    ```env
    # CHANGE 'localhost' to your PC's Local IP Address (e.g., 192.168.1.5)
    EXPO_PUBLIC_API_URL=http://192.168.1.x:3000
    ```

4.  Start the Expo development server:
    ```bash
    npx expo start
    ```

---

## 3. Running on Your Device

1.  Ensure your **Phone** and **PC** are connected to the **SAME Wi-Fi network**.
2.  After running `npx expo start`, a QR code will appear in the terminal.
3.  **Android**: Open **Expo Go** app and scan the QR code.
4.  **iOS**: Open **Camera** app, scan the QR code, and tap to open in Expo Go.

### Troubleshooting
- **Network Request Failed / Connection Error**: 
  - Verify your phone and PC are on the same Wi-Fi.
  - Ensure `EXPO_PUBLIC_API_URL` in `mobile/.env` is set to your PC's IP address (not `localhost`).
  - Ensure Windows Firewall is allowing Node.js connections on port 3000.
- **Metro Bundler Issues**:
  - Press `r` in the mobile terminal to reload.
  - Run `npx expo start -c` to clear cache.

---

## Features to Test
- **User App**: Login/Register, Dashboard with Chatbot, View Packages (Parallax), Book a Slot.
- **Admin App**: Manage Packages (Upload Images), View Dashboard Analytics.
