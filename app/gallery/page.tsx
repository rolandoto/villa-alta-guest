import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Redirigiendo a galería",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GalleryRedirectPage() {
  redirect("/galeria");
}
