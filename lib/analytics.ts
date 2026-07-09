declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
    jws?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function track(event: string, data?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined") {
    window.umami?.track(event, data);
    if (window.location.hostname !== "localhost") {
      window.jws?.track(event, data);
    }
  }
}
