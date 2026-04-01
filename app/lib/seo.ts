import type { Metadata } from "next";

export const SITE_URL = "https://www.villaaltaguesthouse.com";
export const SITE_NAME = "Villa Alta Casa de Huéspedes";
export const DEFAULT_OG_IMAGE = "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/FACHADA.jpg";

function getCanonical(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
}: SeoInput): Metadata {
  const canonical = getCanonical(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        es: canonical,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      locale: "es_CO",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
