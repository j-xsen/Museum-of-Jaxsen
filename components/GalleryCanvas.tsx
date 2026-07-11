import { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Fullscreen } from "@react-three/uikit";
import Structure from "./Structure";

export default function GalleryCanvas({ children }: { children: ReactNode }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false, localClippingEnabled: true }}
      shadows="percentage"
      camera={{ fov: 80, near: 0.1, far: 100, position: [0, 1.3, 4] }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <Structure />
      <Fullscreen>{children}</Fullscreen>
    </Canvas>
  );
}
