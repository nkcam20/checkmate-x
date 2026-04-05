# Checkmate X ♟️ - Next-Gen AI Chess

Checkmate X is a production-grade, high-performance AI-powered chess application built with React Native (Expo) and Stockfish WASM. Experience zero-lag gameplay, premium UI/UX, and professional-grade game analysis.

## ⚡ Key Features

- **Advanced AI**: Integrated Stockfish 10 WASM engine running locally on-device.
- **Real-time Multiplayer**: Powered by Firebase Firestore and Realtime DB.
- **Premium UI**: Modern deep-purple and neon design system with glassmorphism and 60FPS animations.
- **Offline Mode**: Play vs AI anytime, anywhere.
- **Game Analysis**: Post-game accuracy scores and move evaluations.
- **Cross-Platform**: Optimized for both Android and iOS.

## 🛠️ Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind CSS)
- **Animations**: React Native Reanimated
- **Database**: Firebase (Auth, Firestore, RTDB)
- **Chess Engine**: Stockfish (WASM) via custom WebView Worker

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/checkmate-x.git
cd checkmate-x
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_id
...
```

### 4. Run the app
```bash
npx expo start
```

## 📦 Android Build (APK)

We use Expo Application Services (EAS) for production-grade builds.

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure Project
```bash
eas build:configure
```

### 4. Build APK (Local or Cloud)
**Cloud Build (Recommended):**
```bash
eas build --platform android --profile preview
```
*Note: The `preview` profile usually generates an APK for testing.*

**Local Build (Requires Android Studio/JDK):**
```bash
eas build --platform android --profile preview --local
```

### 5. Generate Signed Release APK
```bash
eas build --platform android --profile production
```
This will generate an AAB by default for Play Store. To force APK, modify `eas.json`.

## 🏗️ Architecture

- `app/`: Expo Router screens and layouts.
- `components/`: Reusable UI elements (ChessBoard, UI kits).
- `services/`: AI Engine (Stockfish), Firebase, and API layers.
- `store/`: Zustand global state management.
- `utils/`: Game logic helpers and move evaluators.

## 🛡️ Security

- Server-side move validation (Multiplayer).
- Secure token storage via `expo-secure-store`.
- Firebase Security Rules for user data protection.

---
Built with ❤️ by Antigravity (Advanced Agentic Coding)
