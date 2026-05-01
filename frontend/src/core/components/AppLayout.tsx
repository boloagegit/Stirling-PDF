import { ReactNode } from "react";
import { useBanner } from "@app/contexts/BannerContext";
import { useAppConfig } from "@app/contexts/AppConfigContext";
import NavigationWarningModal from "@app/components/shared/NavigationWarningModal";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * App layout wrapper that handles banner rendering and viewport sizing
 * Automatically adjusts child components to fit remaining space after banner
 */
export function AppLayout({ children }: AppLayoutProps) {
  const { banner } = useBanner();
  const { config } = useAppConfig();

  // When login is disabled (desktop local-only mode), hide promotional banners
  // like "Set as default PDF app" that are injected by the desktop layer.
  // We can't modify the desktop layer (commercial license), so we suppress the
  // banner slot entirely when login is off — the only banners set by the desktop
  // layer are sign-in and default-app prompts, neither of which applies.
  const showBanner = config?.enableLogin !== false;

  return (
    <>
      <style>{`
        .h-screen,
        .right-rail {
          height: 100% !important;
        }
      `}</style>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        {showBanner && banner}
        <div style={{ flex: 1, minHeight: 0, height: 0 }}>{children}</div>
      </div>
      <NavigationWarningModal />
    </>
  );
}
