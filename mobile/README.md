# Mobile App - Build & Release Guide

This document explains how to build the installable APK and how to push Over-the-Air (OTA) updates to users.

## Prerequisites

- **EAS CLI**: Ensure you have the Expo Application Services CLI installed and logged in.
  ```bash
  npm install -g eas-cli
  eas login
  ```

## 1. Building the Android APK

You need to build a new APK when:
- It's the first time you are distributing the app.
- You have added new native libraries (packages that require linking).
- You have changed `app.json` (e.g., icon, splash screen, permissions).
- You have changed `eas.json`.

**Command:**
```bash
npx eas-cli build --platform android --profile preview
```

After the build finishes, download the APK from the link provided or from your [Expo Dashboard](https://expo.dev/accounts/rohitrathod/projects/mobile).

## 2. Pushing Updates (OTA)

You can push an update instantly WITHOUT building a new APK when:
- You have only modified JavaScript/TypeScript code.
- You have only modified assets (images, fonts) inside the project.

**Command:**
```bash
eas update --branch production --message "Description of your changes"
```

### How it works
1. You run the update command.
2. The tailored JavaScript bundle is uploaded to Expo's servers.
3. When users open the app next time, it will automatically download the new update and apply it.

## Troubleshooting

- **"Update not showing up?":** Close and reopen the app twice. The first launch downloads the update, the second launch applies it.
- **"Crash after update?":** If you changed native code but tried to push it via OTA, the app might crash. In this case, you must build a new APK.
