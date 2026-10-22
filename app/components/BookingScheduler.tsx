"use client";

export default function BookingScheduler({ url, packageName }: { url: string; packageName: string }) {
  const bookingUrl = new URL(url);
  bookingUrl.searchParams.set("a1", packageName);
  bookingUrl.searchParams.set("utm_source", "mylestography");
  bookingUrl.searchParams.set("utm_medium", "website");
  bookingUrl.searchParams.set("utm_content", packageName);
  return <div className="booking-widget booking-launch">
    <h3>Choose your date and time.</h3>
    <p>Your selected package is carried into Calendly. Pick an available session time, share your shoot details and acknowledge the mandatory deposit.</p>
    <a className="booking-launch-button" href={bookingUrl.toString()} target="_blank" rel="noopener noreferrer">Book this session on Calendly ↗</a>
    <p className="booking-fallback">Opens Calendly in a new tab. Payment is arranged directly after your final quote.</p>
  </div>;
}
