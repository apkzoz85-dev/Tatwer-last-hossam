import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "شكراً لتسجيلك | Scenes — تطوير مصر",
  robots: { index: false, follow: false },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children
}
