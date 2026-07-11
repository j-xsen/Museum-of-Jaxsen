interface ArtworkPlaceholderProps {
  position: [number, number, number];
  width: number;
  height: number;
}

export default function ArtworkPlaceholder({ position, width, height }: ArtworkPlaceholderProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[width, height, 0.15]} />
      <meshStandardMaterial color="#f2ead9" roughness={0.9} metalness={0} />
    </mesh>
  );
}
