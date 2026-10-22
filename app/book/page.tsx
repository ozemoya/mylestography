import BookingContent from "./BookingContent";

export default function BookPage() {
  const configuredUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/myleskmiller/photo-video-session";
  let calendlyUrl = "";
  try {
    const url = new URL(configuredUrl);
    if (url.protocol === "https:" && url.hostname === "calendly.com" && url.pathname !== "/") calendlyUrl = url.toString();
  } catch { /* Keep the inquiry flow available until scheduling is configured. */ }
  return <BookingContent calendlyUrl={calendlyUrl} />;
}
