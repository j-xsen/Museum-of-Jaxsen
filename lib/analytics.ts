declare global {
  interface Window {
    jws?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function track(event: string, data?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    window.jws?.track(event, data);
  }
}
