# @increase/react-native-overlay

React Native module for Android overlay permission, screen wake, and lock screen UI management.

> **Platform support:** All APIs are Android-only. Every method is a no-op (or returns `false`) on iOS so you can safely import the package in cross-platform projects without extra guards.

---

## Installation

```sh
npm install @increase/react-native-overlay
# or
yarn add @increase/react-native-overlay
```

### Android setup

The package is **automatically linked** on React Native 0.60+. No manual registration in `MainApplication` is needed.

Add the required permissions to your app's `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

Then rebuild:

```sh
npx react-native run-android
```

### iOS setup

Run `pod install` inside the `ios/` directory — autolinking handles the rest. All methods are no-ops on iOS, so no further configuration is needed.

---

## API

All functions are exported as named exports and are also available on the default export object.

```ts
import RNOverlay, {
  canDrawOverlays,
  requestOverlayPermission,
  bringAppToForeground,
  wakeScreen,
  enableLockScreenUI,
} from '@increase/react-native-overlay';
```

### `canDrawOverlays(): Promise<boolean>`

Returns `true` when the app has been granted the `SYSTEM_ALERT_WINDOW` permission (required to draw overlays on Android 6.0+). Always resolves to `false` on iOS.

```ts
const hasPermission = await canDrawOverlays();
```

### `requestOverlayPermission(): void`

Opens the Android system settings screen so the user can grant the **Draw over other apps** permission. No-op when the permission is already granted or on iOS.

```ts
requestOverlayPermission();
```

### `bringAppToForeground(): void`

Brings the host application to the foreground. No-op on iOS.

```ts
bringAppToForeground();
```

### `wakeScreen(): void`

Acquires a 3-second `SCREEN_BRIGHT` wake lock to turn the device screen on. Requires the `WAKE_LOCK` permission. No-op on iOS.

```ts
wakeScreen();
```

### `enableLockScreenUI(): void`

Allows the app's activity to be shown on top of the lock screen and turns the screen on when the activity comes to the foreground.

- Android 8.1+ (`API 27`): uses `setShowWhenLocked` / `setTurnScreenOn`.
- Older Android: uses the deprecated `FLAG_SHOW_WHEN_LOCKED` / `FLAG_TURN_SCREEN_ON` window flags.
- No-op on iOS.

```ts
enableLockScreenUI();
```

---

## Usage example

```tsx
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import {
  canDrawOverlays,
  requestOverlayPermission,
  wakeScreen,
  enableLockScreenUI,
} from "@increase/react-native-overlay";

export default function App() {
  useEffect(() => {
    // Show UI on lock screen and wake the display when app opens
    enableLockScreenUI();
    wakeScreen();
  }, []);

  const handleRequestPermission = async () => {
    const allowed = await canDrawOverlays();
    if (!allowed) {
      requestOverlayPermission();
    }
  };

  return (
    <View>
      <Button title="Request overlay permission" onPress={handleRequestPermission} />
    </View>
  );
}
```

---

## Requirements

| Requirement        | Version          |
| ------------------ | ---------------- |
| React Native       | ≥ 0.68           |
| Android minSdk     | 21 (Android 5.0) |
| Android compileSdk | 33+              |
| iOS                | 12.4+            |
| Kotlin             | 1.8+             |

---

## License

MIT
