import "./Layout.css";

import { ComponentType, ReactNode, useEffect, useState } from "react";
import ArtworkDetailOverlay from "../components/ArtworkDetailOverlay";
import GalleryA11y from "../components/GalleryA11y";
import GalleryLoadingShell from "../components/GalleryLoadingShell";
import { usePageContext } from "vike-react/usePageContext";

type GalleryCanvasComponent = ComponentType<{ children: ReactNode }>;

export default function Layout({ children }: { children: ReactNode }) {
  const { urlPathname } = usePageContext();

  // Load the 3D scene only after mount (not React.lazy/Suspense) so the server
  // and first client render always agree on the fallback shell — swapping
  // afterwards avoids the "Suspense boundary received an update before it
  // finished hydrating" (React error #419) that lazy-during-SSR caused.
  const [GalleryCanvas, setGalleryCanvas] = useState<GalleryCanvasComponent | null>(null);

  useEffect(() => {
    let active = true;
    import("../components/GalleryCanvas").then((mod) => {
      if (active) setGalleryCanvas(() => mod.default as GalleryCanvasComponent);
    });
    return () => {
      active = false;
    };
  }, []);

  if (urlPathname.startsWith("/purchase/success") || urlPathname.startsWith("/admin") || urlPathname.startsWith("/artwork/")) {
    return <>{children}</>;
  }

  return (
    <div
      role="region"
      aria-label="Art gallery — use arrow keys or scroll to browse artworks"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    >
      {GalleryCanvas ? <GalleryCanvas>{children}</GalleryCanvas> : <GalleryLoadingShell />}
      <GalleryA11y />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <ArtworkDetailOverlay />
      </div>
    </div>
  );
}
