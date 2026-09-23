import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Scenes Mostakbal City | سينز مدينة المستقبل — تطوير مصر | New Launch",
  description: "كمبوند Scenes سينز من تطوير مصر في قلب مدينة المستقبل — إطلاق جديد لفيلات مستقلة وتوين هاوس وتاون هاوس. تاون هاوس من 9.8 مليون، جدية حجز 200 ألف، استلام خلال سنتين، تقسيط حتى 10 سنوات وخصم حتى 35%.",
  keywords: "Scenes,سينز,Scenes Mostakbal City,سينز مدينة المستقبل,تطوير مصر,Tatweer Misr,مدينة المستقبل,فيلات مدينة المستقبل,تاون هاوس مدينة المستقبل,توين هاوس القاهرة الجديدة",
  openGraph: {
    title: "Scenes Mostakbal City | سينز مدينة المستقبل — تطوير مصر",
    description: "إطلاق جديد في Scenes — فيلات وتوين هاوس وتاون هاوس في مدينة المستقبل. جدية حجز 200 ألف، استلام سنتين، تقسيط حتى 10 سنوات.",
    locale: "ar_EG",
    type: "website",
    images: ["/images/hero.webp"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Ads gtag — replace AW-XXXXXXXXXX with your tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17039137293" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17039137293');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
