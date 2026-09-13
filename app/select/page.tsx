import { notFound } from "next/navigation";
import PhotoPicker from "./PhotoPicker";

export default function SelectPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <PhotoPicker />;
}
