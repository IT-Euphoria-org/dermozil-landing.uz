import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Dermozil | Oyoq va Tirnoq Zamburug'idan Halos Bo'lish", // Asosiy/Asosiy sahifa sarlavhasi
    template: "%s | Dermozil", // Boshqa sahifalar uchun shablon (Masalan: 'Narxlar | Dermozil')
  },
  description:
    "Dermozil - bu tabiiy va samarali krem bo'lib, oyoq va tirnoq zamburug'ini tez va xavfsiz davolashga yordam beradi. Sog'lom va chiroyli tirnoqlarga ega bo'ling. 50% chegirma!",
  keywords: [
    "Dermozil",
    "tirnoq zamburug'ini davolash",
    "oyoq zamburug'i kremi",
    "mikozga qarshi krem",
    "zamburug'ga qarshi vosita",
    "tirnoqni tiklash",
    "antifungal krem O'zbekiston",
  ],
  authors: [{ name: "Your Company Name", url: "https://yourwebsite.com" }],

  openGraph: {
    title: "Dermozil | Oyoq va Tirnoq Zamburug'idan Halos Bo'lish",
    description:
      "Tabiiy Dermozil kremi bilan oyoq va tirnoq zamburug'ini tezda davolang. Sog'lom oyoqlar uchun #1 vosita.",
    url: "https://yourwebsite.com", // O'zingizning domeningizni kiriting
    siteName: "Dermozil",
    images: [
      {
        url: "/images/og-image.jpg", // ✅ Ijtimoiy tarmoqda ko'rsatiladigan rasm
        width: 1200,
        height: 630,
        alt: "Dermozil kremi mahsuloti",
      },
    ],
    locale: "uz_UZ", // Tilni belgilash
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@yourhandle", // Agar Twitter profilingiz bo'lsa
    creator: "@yourhandle",
    title: "Dermozil | Tirnoq Zamburug'iga Qarshi Tez Yechim",
    description:
      "50% chegirma bilan Dermozil kremini buyurtma qiling va zamburug'dan qutuling.",
    images: ["/images/og-image.jpg"],
  },

  viewport: "width=device-width, initial-scale=1.0",

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
