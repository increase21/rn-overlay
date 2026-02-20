import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@increase/react-native-overlay' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const OverlayManager = NativeModules.OverlayManager
  ? NativeModules.OverlayManager
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

/**
 * Checks whether the app has been granted the SYSTEM_ALERT_WINDOW permission
 * (required to draw overlays on Android 6.0+).
 *
 * Always resolves to `false` on iOS.
 */
export function canDrawOverlays(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return Promise.resolve(false);
  }
  return OverlayManager.canDrawOverlays();
}

/**
 * Opens the Android system settings screen that lets the user grant the
 * SYSTEM_ALERT_WINDOW ("Draw over other apps") permission to this app.
 *
 * No-op on iOS or when the permission is already granted.
 */
export function requestOverlayPermission(): void {
  if (Platform.OS === 'android') {
    OverlayManager.requestOverlayPermission();
  }
}

/**
 * Brings the host app to the foreground.
 *
 * No-op on iOS.
 */
export function bringAppToForeground(): void {
  if (Platform.OS === 'android') {
    OverlayManager.bringAppToForeground();
  }
}

/**
 * Acquires a 3-second SCREEN_BRIGHT wake lock to turn the device screen on.
 *
 * Requires the WAKE_LOCK permission declared in your app's AndroidManifest.xml.
 * No-op on iOS.
 */
export function wakeScreen(): void {
  if (Platform.OS === 'android') {
    OverlayManager.wakeScreen();
  }
}

/**
 * Allows the activity to be shown on top of the lock screen and turns the
 * screen on when the activity is brought to the foreground.
 *
 * Uses `setShowWhenLocked` / `setTurnScreenOn` on Android 8.1+ and the
 * deprecated window flags on older devices.
 *
 * No-op on iOS.
 */
export function enableLockScreenUI(): void {
  if (Platform.OS === 'android') {
    OverlayManager.enableLockScreenUI();
  }
}

export default {
  canDrawOverlays,
  requestOverlayPermission,
  bringAppToForeground,
  wakeScreen,
  enableLockScreenUI,
};
