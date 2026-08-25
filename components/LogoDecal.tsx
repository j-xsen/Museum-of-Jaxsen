import { useTexture } from "@react-three/drei";

export default function LogoDecal() {
  const texture = useTexture("/textures/logo.png");

  return (
    <mesh position={[0, 4, 0.01]}>
      <planeGeometry args={[1.8, 1.8 * (218 / 512)]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
