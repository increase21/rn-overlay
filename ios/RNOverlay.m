#import "RNOverlay.h"
#import <React/RCTLog.h>

// iOS stub — all overlay/wake/lock-screen APIs are Android-only.
// The JavaScript layer already guards every call with Platform.OS checks,
// so these methods are never invoked on iOS.  They are registered so that
// Metro bundler does not emit a "module not found" warning on iOS builds.

@implementation RNOverlay

RCT_EXPORT_MODULE(OverlayManager)

RCT_EXPORT_METHOD(canDrawOverlays:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  resolve(@NO);
}

RCT_EXPORT_METHOD(requestOverlayPermission)
{
  // no-op on iOS
}

RCT_EXPORT_METHOD(bringAppToForeground)
{
  // no-op on iOS
}

RCT_EXPORT_METHOD(wakeScreen)
{
  // no-op on iOS
}

RCT_EXPORT_METHOD(enableLockScreenUI)
{
  // no-op on iOS
}

@end
