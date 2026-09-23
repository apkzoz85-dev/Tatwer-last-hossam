"use client"
import React, { useState, useEffect, useRef } from "react"

/* ── CONSTANTS (lines 5–9) ── */
const P = "+201038489754"
const PD = "0103 848 9754"
const PI = "01038489754"
const WN = "201038489754"
const WK = "c6ab92b0-272a-4bd5-873c-35d5762fc76c"

const PHONE = P
const WA = `https://wa.me/${WN}`
const WEB3_KEY = WK
const CC_EMAIL = "apkzoz85@gmail.com"

const STATS = [
  { val: "مدينة المستقبل", label: "القاهرة الجديدة" },
  { val: "200,000", label: "جدية حجز (EOI)" },
  { val: "سنتين", label: "موعد الاستلام" },
  { val: "35%", label: "خصم حتى — نظام 5 سنوات" },
]

const FEATURES = [
  "Culture Hub", "مسار دراجات وجري", "حدائق مشتركة", "مناطق ألعاب أطفال",
  "مطاعم وكافيهات F&B", "خدمات ذكية Smart", "اتصال مباشر بالمنطقة التجارية", "مسجد",
  "بحيرات ومسطحات مائية", "مناطق STEM تعليمية للأطفال", "مسارات مشي خضراء", "كمبوند مغلق وأمن 24/7",
]

const UNITS = [
  { type: "تاون هاوس ميدل — 3 غرف", area: "158 م²", price: "9,800,000 ج", img: "/images/townhouse-middle.webp", plan: "/images/plan-townhouse-middle.webp" },
  { type: "تاون هاوس كورنر — 3 غرف + فاميلي روم", area: "168 م²", price: "10,900,000 ج", img: "/images/townhouse-corner.webp", plan: "/images/plan-townhouse-corner.webp" },
  { type: "توين هاوس — 3 غرف + فاميلي روم", area: "175 م²", price: "11,900,000 ج", img: "/images/twin-house.webp", plan: "/images/plan-twin-house.webp" },
  { type: "فيلا مستقلة — 3 ماستر", area: "195 م²", price: "16,200,000 ج", img: "/images/villa.webp", plan: "/images/plan-villa.webp" },
]

const LOCATION_ITEMS = [
  { dist: "قلب", place: "مدينة المستقبل" },
  { dist: "بجوار", place: "كمبوند Bloomfields" },
  { dist: "قريب من", place: "الجامعة الأمريكية وشارع 90" },
  { dist: "قريب من", place: "محطة القطار السريع ومطار العاصمة" },
  { dist: "مباشر", place: "الدائري الأوسطي والإقليمي" },
  { dist: "45 دقيقة", place: "العين السخنة" },
]

const GALLERY = [
  { src: "/images/r-lake.webp", alt: "Scenes — البحيرات" },
  { src: "/images/r-day.webp", alt: "Scenes — المساحات الخضراء" },
  { src: "/images/r-lounge.webp", alt: "Scenes — لاونج خارجي" },
  { src: "/images/r-walk.webp", alt: "Scenes — ممشى" },
  { src: "/images/r-pools.webp", alt: "Scenes — حمامات سباحة خاصة" },
  { src: "/images/aerial-night.webp", alt: "Scenes — منظر جوي" },
]

const WA_MSG = "مرحباً، أنا مهتم بمشروع Scenes سينز من تطوير مصر في مدينة المستقبل وأريد معرفة المزيد عن الإطلاق الجديد والأسعار وأنظمة السداد."

/* ── Tracking helpers ── */
function trackLead(label: string) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", { send_to: "AW-17039137293/1nOoCPCP8M4cEI208rw_", value: 1.0, currency: "USD" })
    }
  } catch { }
}

function trackWhatsApp() {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", { send_to: "AW-17039137293/BXZCCMys884cEI208rw_", value: 1.0, currency: "USD" })
    }
  } catch { }
}

function trackCall() {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", { send_to: "AW-17039137293/i2fxCMms884cEI208rw_", value: 1.0, currency: "USD" })
    }
  } catch { }
}

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } }, { threshold })
    ob.observe(el); return () => ob.disconnect()
  }, [threshold])
  return { ref, vis }
}
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView()
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>
}

/* ── Lead Form ── */
function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [form, setForm] = useState({ name: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, botcheck: "", name: form.name, phone: form.phone, project: "Scenes — تطوير مصر — مدينة المستقبل", subject: "Lead — Scenes سينز مدينة المستقبل (New Launch)", cc: CC_EMAIL }),
      })
      if (res.ok) { trackLead("form"); window.location.href = "/thank-you" } else setLoading(false)
    } catch { setLoading(false) }
  }
  if (sent) return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>✅</div>
      <p style={{ fontWeight: 700, color: variant === "dark" ? "#fff" : "#1a1a1a" }}>تم الإرسال بنجاح</p>
      <p style={{ fontSize: ".78rem", color: variant === "dark" ? "rgba(255,255,255,.4)" : "#8B7355", marginTop: 6 }}>هنتواصل معاك خلال 24 ساعة</p>
    </div>
  )
  const isDark = variant === "dark"
  const iBg = isDark ? "rgba(255,255,255,.06)" : "#FAF6F2"
  const iBorder = isDark ? "rgba(255,255,255,.1)" : "rgba(92,15,48,.14)"
  const iColor = isDark ? "#fff" : "#1a1a1a"
  const iPh = isDark ? "rgba(255,255,255,.3)" : "#8B7355"
  return (
    <form onSubmit={submit}>
      <style>{`.fi${variant}::placeholder{color:${iPh}}.fi${variant}:focus{border-color:#5C0F30!important;box-shadow:0 0 0 3px rgba(92,15,48,.08)!important}`}</style>
      {[{ p: "الاسم الكريم *", k: "name", t: "text" }, { p: "رقم الهاتف *", k: "phone", t: "tel" }].map(f => (
        <input key={f.k} className={`fi${variant}`} type={f.t} placeholder={f.p} value={(form as any)[f.k]}
          onChange={e => setForm({ ...form, [f.k]: e.target.value })} required
          style={{ width: "100%", padding: "14px 16px", marginBottom: 10, background: iBg, border: `1px solid ${iBorder}`, borderRadius: 8, color: iColor, fontSize: ".85rem", outline: "none", fontFamily: "'Almarai',sans-serif", transition: "all .2s", direction: f.k === "phone" ? "ltr" : "rtl" }} />
      ))}
      <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: "#5C0F30", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", opacity: loading ? .7 : 1, transition: "all .2s" }}>
        {loading ? "جاري الإرسال..." : "سجّل الآن — احصل على الأسعار والبروشور"}
      </button>
    </form>
  )
}

/* ══════════════ MAIN ══════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupForm, setPopupForm] = useState({ name: "", phone: "" })
  const [popupSent, setPopupSent] = useState(false)
  const [popupLoading, setPopupLoading] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showCookie, setShowCookie] = useState(false)
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => { setMounted(true); const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])

  /* Popup: 55% scroll OR 16 seconds */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("scenes_p")) return
      const timer = setTimeout(() => { setShowPopup(true); sessionStorage.setItem("scenes_p", "1") }, 16000)
      const scrollHandler = () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        if (pct > 0.55 && !sessionStorage.getItem("scenes_p")) { setShowPopup(true); sessionStorage.setItem("scenes_p", "1") }
      }
      window.addEventListener("scroll", scrollHandler)
      return () => { clearTimeout(timer); window.removeEventListener("scroll", scrollHandler) }
    } catch { }
  }, [])

  /* Cookie consent */
  useEffect(() => {
    try { if (!localStorage.getItem("scenes_cookie")) setShowCookie(true) } catch { }
  }, [])

  const submitPopup = async (e: React.FormEvent) => {
    e.preventDefault(); setPopupLoading(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, botcheck: "", name: popupForm.name, phone: popupForm.phone, project: "Scenes — تطوير مصر — مدينة المستقبل", subject: "Lead — Scenes سينز مدينة المستقبل (Popup)", cc: CC_EMAIL }),
      })
      if (res.ok) { trackLead("popup"); window.location.href = "/thank-you" } else setPopupLoading(false)
    } catch { setPopupLoading(false) }
  }

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#FAF8F5;color:#1a1a1a;font-family:'Almarai',sans-serif;font-size:16px;direction:rtl}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes kenBurns{0%{transform:scale(1)}100%{transform:scale(1.06)}}

        @media(max-width:768px){
          .nav{padding:0 16px!important;height:56px!important}
          .nav-links{display:none!important}
          .hero-inner{padding:0 20px 48px!important}
          .hero-inner h1{font-size:2.6rem!important}
          .stats-bar{flex-wrap:wrap!important;padding:20px 16px!important;gap:0!important}
          .stats-bar>div{flex:1 1 50%!important;padding:14px 0!important}
          .s-pad{padding:48px 16px!important}
          .features-grid{grid-template-columns:repeat(2,1fr)!important}
          .mp-grid{grid-template-columns:1fr!important}
          .mp-img{min-height:250px!important}
          .mp-text{padding:32px 20px!important}
          .loc-grid{grid-template-columns:1fr 1fr!important}
          .units-list>div{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}
          .units-list .u-cta{width:100%!important}
          .u-row{flex-direction:column!important;align-items:stretch!important;gap:12px!important;padding:14px!important}
          .contact-grid{grid-template-columns:1fr!important}
          .c-left{padding:40px 20px!important}
          .c-right{padding:40px 20px!important}
          .footer-inner{flex-direction:column!important;gap:12px!important;text-align:center!important;padding-bottom:80px!important}
          .float-btns{display:none!important}
          .payment-grid{grid-template-columns:1fr!important}
          .gallery-grid{grid-template-columns:1fr 1fr!important}
          .u-img{width:100%!important;height:160px!important;margin:0!important}
          .u-cta{flex-wrap:wrap!important}
          .u-cta>*{flex:1 1 auto!important;text-align:center!important}
          .hero-inner h1{line-height:1.05!important}
          .hero-sub{font-size:.42em!important}
          .loc-grid>div{min-width:0!important}
          html,body{overflow-x:hidden}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64, transition: "all .3s",
        background: scrolled ? "rgba(250,250,247,.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,.06)" : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, background: "#5C0F30", borderRadius: 4, transform: "rotate(45deg)" }} />
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 600, letterSpacing: ".15em", color: scrolled ? "#1a1a1a" : "#fff" }}>SCENES <span style={{ opacity: .55, fontSize: ".7em" }}>| TATWEER MISR</span></span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["المشروع", "about"], ["الماستر بلان", "masterplan"], ["الموقع", "location"], ["الأسعار", "prices"], ["تواصل", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => scroll(id)} style={{
              background: "none", border: "none", cursor: "pointer", fontSize: ".75rem", fontWeight: 600,
              color: scrolled ? "#8B7355" : "rgba(255,255,255,.6)", letterSpacing: ".06em", transition: "color .2s",
              fontFamily: "'Almarai',sans-serif",
            }}>{l}</button>
          ))}
          <a href={`tel:${PHONE}`} onClick={trackCall} dir="ltr" style={{ fontSize: ".82rem", fontWeight: 700, color: scrolled ? "#1a1a1a" : "#fff", textDecoration: "none" }}>{PD}</a>
          <button onClick={() => scroll("contact")} style={{
            background: "#5C0F30", color: "#fff", border: "none", padding: "10px 20px",
            fontWeight: 700, fontSize: ".72rem", letterSpacing: ".06em", cursor: "pointer",
            fontFamily: "'Almarai',sans-serif", borderRadius: 6,
          }}>سجّل الآن</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {mounted && <img src="/images/hero.webp" alt="Scenes Mostakbal City — Tatweer Misr" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 20s ease infinite alternate" }} />}
        {!mounted && <div style={{ position: "absolute", inset: 0, background: "#2B0513" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(43,5,19,.95) 0%, rgba(43,5,19,.5) 42%, rgba(43,5,19,.25) 100%)" }} />

        <div className="hero-inner" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 48px 72px", maxWidth: 800 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "7px 16px", background: "rgba(92,15,48,.85)", borderRadius: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#fff" }}>🔥 NEW LAUNCH — إطلاق جديد في Scenes | تطوير مصر</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 400, color: "#fff", lineHeight: .95, marginBottom: 20 }}>
            scenes
            <span dir="ltr" className="hero-sub" style={{ display: "block", fontSize: ".36em", lineHeight: 1.3, marginTop: 14, textAlign: "right" }}>
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,.55)", fontWeight: 300 }}>Historic Elegance in a</span>{" "}
              <span style={{ color: "#D8C4A8" }}>Contemporary Embrace</span>
            </span>
          </h1>

          <p style={{ fontSize: ".92rem", color: "rgba(255,255,255,.4)", lineHeight: 1.9, maxWidth: 480, marginBottom: 28 }}>
            إطلاق جديد لوحدات Single Family في قلب مدينة المستقبل — فيلات مستقلة · توين هاوس · تاون هاوس. جدية حجز 200,000 ج · استلام خلال سنتين · تقسيط حتى 10 سنوات.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => scroll("contact")} style={{ padding: "15px 32px", background: "#5C0F30", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>سجّل الآن</button>
            <a href={`${WA}?text=${encodeURIComponent(WA_MSG)}`} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}
              style={{ padding: "15px 32px", background: "#25D366", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", textDecoration: "none" }}>💬 واتساب</a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar" style={{ display: "flex", background: "#2B0513" }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "24px 16px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 500, color: "#D8C4A8" }}>{s.val}</div>
            <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.3)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="s-pad" style={{ padding: "64px 40px", background: "#FAF8F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#5C0F30", marginBottom: 8 }}>WELCOME TO SCENES</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 500, marginBottom: 12 }}>كمبوند Scenes في مدينة المستقبل</h2>
              <p style={{ fontSize: ".9rem", color: "#8B7355", maxWidth: 650, margin: "0 auto", lineHeight: 1.9 }}>
                Scenes سينز أحدث مشاريع تطوير مصر في قلب مدينة المستقبل، بجوار Bloomfields — مجتمع سكني مصمم للعائلات الشابة يجمع بين أناقة العمارة الكلاسيكية وروح الحياة المعاصرة. بحيرات ومسطحات خضراء ممتدة، مسارات للمشي والدراجات، حدائق مشتركة، ومناطق تعليمية تفاعلية للأطفال، مع وحدات Single Family فقط: فيلات مستقلة وتوين هاوس وتاون هاوس.
              </p>
            </div>
          </Reveal>

          {/* Features */}
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * .04}>
                <div style={{
                  background: "#fff", borderRadius: 10, padding: "16px", textAlign: "center",
                  border: "1px solid rgba(0,0,0,.04)", transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.05)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>
                  <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#1a1a1a" }}>{f}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MASTERPLAN ── */}
      <section id="masterplan" style={{ background: "#2B0513" }}>
        <div className="mp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "55vh" }}>
          <div className="mp-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#D8C4A8", marginBottom: 12 }}>MASTERPLAN</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              الماستر بلان<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)" }}>A New Chapter of Modern Living</span>
            </h2>
            <div style={{ width: 32, height: 2, background: "#D8C4A8", borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.9, marginBottom: 24 }}>
              مجتمع متكامل يجمع بين الوعي البيئي وراحة الحياة العصرية — أطفالك يكبروا وسط الطبيعة، وأنت قريب من كل الخدمات. ممر أخضر مركزي يربط كل المراحل بالـ Culture Hub والحدائق المشتركة ومسار الدراجات والجري.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => setPlan("/images/masterplan.webp")} style={{ padding: "12px 22px", background: "#D8C4A8", color: "#2B0513", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".8rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>عرض الماستر بلان</button>
              <button onClick={() => setPlan("/images/amenities.webp")} style={{ padding: "12px 22px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.25)", borderRadius: 8, fontWeight: 700, fontSize: ".8rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>خريطة الخدمات</button>
            </div>
          </div>
          <div className="mp-img" style={{ position: "relative", overflow: "hidden", minHeight: "40vw", background: "#fff", cursor: "zoom-in" }} onClick={() => setPlan("/images/masterplan.webp")}>
            <img src="/images/masterplan.webp" alt="ماستر بلان Scenes" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute", inset: 0 }} />
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="s-pad" style={{ padding: "56px 40px", background: "#FAF8F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#5C0F30", marginBottom: 8 }}>RENDERS</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500 }}>صور المشروع</h2>
            </div>
          </Reveal>
          <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {GALLERY.map((g, i) => (
              <div key={i} onClick={() => setPlan(g.src)} style={{ position: "relative", aspectRatio: "3/2", borderRadius: 10, overflow: "hidden", cursor: "zoom-in", background: "#E6DDD2" }}>
                <img src={g.src} alt={g.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" style={{ background: "#2B0513" }}>
        <div className="mp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "55vh" }}>
          <div className="mp-img" style={{ position: "relative", overflow: "hidden", minHeight: "40vw" }}>
            <img src="/images/location-map.webp" alt="موقع Scenes في مدينة المستقبل" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#C9BBA8", position: "absolute", inset: 0 }} />
          </div>
          <div className="mp-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#D8C4A8", marginBottom: 12 }}>STRATEGIC LOCATION</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              الموقع الاستراتيجي<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)" }}>قلب مدينة المستقبل</span>
            </h2>
            <div style={{ width: 32, height: 2, background: "#D8C4A8", borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.9, marginBottom: 28 }}>
              يقع Scenes في قلب مدينة المستقبل بين المربع الذهبي في القاهرة الجديدة والعاصمة الإدارية الجديدة، بجوار Bloomfields وعلى مقربة من الجامعة الأمريكية وشارع 90، مع وصول سريع عبر الدائري الأوسطي والطريق الإقليمي.
            </p>

            <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {LOCATION_ITEMS.map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,.06)", borderRight: "3px solid #D8C4A8" }}>
                  <div style={{ fontSize: ".75rem", fontWeight: 700, color: "#D8C4A8", marginBottom: 4 }}>{item.dist}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>{item.place}</div>
                </div>
              ))}
            </div>

            <button onClick={() => scroll("contact")} style={{
              marginTop: 24, padding: "14px 28px", background: "#D8C4A8", color: "#2B0513", border: "none",
              borderRadius: 8, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", alignSelf: "flex-start",
            }}>سجّل واحصل على الماستر بلان</button>
          </div>
        </div>
      </section>

      {/* ── PRICES + CTA ── */}
      <section id="prices" className="s-pad" style={{ padding: "64px 40px", background: "#EFE9E1" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#5C0F30", marginBottom: 8 }}>الأسعار</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500 }}>الوحدات والأسعار</h2>
            </div>
          </Reveal>

          {/* أسعار استرشادية disclaimer */}
          <Reveal>
            <p style={{ textAlign: "center", fontSize: ".8rem", color: "#5C0F30", fontWeight: 700, marginBottom: 6 }}>الأسعار على نظام 5 سنوات بعد الخصم 🔥</p>
            <p style={{ textAlign: "center", fontSize: ".72rem", color: "#999", marginBottom: 24, fontStyle: "italic" }}>* الأسعار استرشادية وقابلة للتغيير — تواصل معنا لمعرفة أحدث الأسعار والوحدات المتاحة</p>
          </Reveal>

          <div className="units-list" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {UNITS.map((u, i) => (
              <Reveal key={i} delay={i * .04}>
                <div className="u-row" style={{
                  background: "#fff", borderRadius: 10, padding: "20px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: "1px solid rgba(0,0,0,.04)", transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(92,15,48,.14)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,.04)" }}>
                  <img src={u.img} alt={u.type} loading="lazy" className="u-img" style={{ width: 120, height: 84, objectFit: "cover", borderRadius: 8, marginLeft: 18, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{u.type}</div>
                    <div style={{ fontSize: ".75rem", color: "#8B7355", marginBottom: 2 }}>{u.area}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "#5C0F30", fontWeight: 600 }}>{u.price}</div>
                  </div>
                  <div className="u-cta" style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setPlan(u.plan)} style={{
                      padding: "10px 16px", background: "transparent", color: "#5C0F30", border: "1px solid rgba(92,15,48,.3)",
                      fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", borderRadius: 6, whiteSpace: "nowrap",
                    }}>المسقط الأفقي</button>
                    <a href={`${WA}?text=${encodeURIComponent(`مرحباً، أنا مهتم بـ ${u.type} (${u.area}) في مشروع Scenes من تطوير مصر — مدينة المستقبل`)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ padding: "10px 16px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".72rem", textDecoration: "none", borderRadius: 6, whiteSpace: "nowrap" }}>
                      💬 واتساب
                    </a>
                    <button onClick={() => scroll("contact")} style={{
                      padding: "10px 16px", background: "#5C0F30", color: "#fff", border: "none",
                      fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", borderRadius: 6, whiteSpace: "nowrap",
                    }}>سجّل الآن</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Payment Plans */}
          <Reveal delay={.15}>
            <div className="payment-grid" style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { t: "نظام 5 سنوات", d: "خصم حتى 35%", d2: "الأسعار المعروضة على هذا النظام", badge: "الأكثر طلباً" },
                { t: "النظام الممتد", d: "تقسيط حتى 10 سنوات", d2: "أنظمة سداد مرنة حسب الوحدة", badge: "" },
              ].map((p, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "20px", textAlign: "center", border: "1px solid rgba(0,0,0,.04)", position: "relative" }}>
                  {p.badge && <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#5C0F30", color: "#fff", fontSize: ".6rem", fontWeight: 700, padding: "3px 12px", borderRadius: 10 }}>{p.badge}</span>}
                  <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", color: "#5C0F30", marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontSize: ".88rem", fontWeight: 700, marginBottom: 2 }}>{p.d}</div>
                  <div style={{ fontSize: ".78rem", color: "#8B7355" }}>{p.d2}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={.2}>
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <p style={{ fontSize: ".78rem", color: "#8B7355" }}>جدية حجز (EOI): 200,000 جنيه · الاستلام خلال سنتين</p>
            </div>
          </Reveal>

          <Reveal delay={.25}>
            <div style={{ marginTop: 16, background: "rgba(92,15,48,.04)", borderRadius: 8, padding: "14px 20px", border: "1px solid rgba(92,15,48,.08)", textAlign: "center" }}>
              <span style={{ fontSize: ".82rem", color: "#5C0F30", fontWeight: 700 }}>NEW LAUNCH | الوحدات محدودة — احجز وحدتك الآن 🚀</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT DEVELOPER ── */}
      <section style={{ background: "#2B0513" }}>
        <div className="mp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "50vh" }}>
          <div className="mp-img" style={{ position: "relative", overflow: "hidden", minHeight: "35vw" }}>
            <img src="/images/aerial-day.webp" alt="Tatweer Misr — Scenes" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="mp-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#D8C4A8", marginBottom: 12 }}>TATWEER MISR DEVELOPMENTS</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              عن تطوير مصر<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)" }}>منذ 2014</span>
            </h2>
            <div style={{ width: 32, height: 2, background: "#D8C4A8", borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.9, marginBottom: 28 }}>
              منذ تأسيسها عام 2014، رسخت تطوير مصر مكانتها كواحدة من أبرز شركات التطوير العقاري في مصر، بشراكات مع متخصصين عالميين. من أول مشاريعها السكنية Bloomfields في مدينة المستقبل، إلى IL Monte Galala و Fouka Bay الحائزين على جوائز، و D-Bay و Rivers و SALT — والآن Scenes.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[{ v: "2014", l: "سنة التأسيس" }, { v: "6+", l: "مشاريع أيقونية" }, { v: "Bloomfields", l: "جار Scenes في مدينة المستقبل" }, { v: "جوائز", l: "IL Monte Galala و Fouka Bay" }].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: "rgba(255,255,255,.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 600, color: "#D8C4A8" }}>{s.v}</div>
                  <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.25)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "60vh" }}>
          <div className="c-left" style={{ background: "#5C0F30", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "rgba(255,255,255,.5)", marginBottom: 12 }}>تواصل معنا</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              بيتك في Scenes<br />مدينة المستقبل
            </h2>
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.9, marginBottom: 32 }}>
              سجّل بياناتك واحصل على أسعار الإطلاق الجديد والبروشور وخطط السداد حتى 10 سنوات. فريقنا هيتواصل معاك خلال 24 ساعة.
            </p>
            <a href={`tel:${PHONE}`} onClick={trackCall} dir="ltr" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 600, color: "#fff", textDecoration: "none", marginBottom: 20 }}>{PD}</a>
            <div style={{ display: "flex", gap: 12 }}>
              <a href={`${WA}?text=${encodeURIComponent(WA_MSG)}`} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}
                style={{ padding: "12px 24px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>💬 واتساب</a>
              <a href={`tel:${PHONE}`} onClick={trackCall} style={{ padding: "12px 24px", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>📞 اتصل الآن</a>
            </div>
          </div>
          <div className="c-right" style={{ background: "#EFE9E1", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", color: "#5C0F30", marginBottom: 8 }}>سجّل بياناتك</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 500, marginBottom: 6 }}>احصل على البروشور والأسعار</h3>
            <p style={{ fontSize: ".78rem", color: "#8B7355", marginBottom: 24 }}>فريقنا المتخصص في خدمتك</p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── AGENT DISCLOSURE ── */}
      <div style={{ background: "#E6DDD2", padding: "16px 40px", textAlign: "center" }}>
        <p style={{ fontSize: ".7rem", color: "#999", lineHeight: 1.8 }}>
          هذا الموقع مُدار بواسطة وكيل عقاري معتمد وليس بواسطة شركة تطوير مصر مباشرة. جميع المعلومات المعروضة للأغراض التسويقية فقط والأسعار استرشادية وقابلة للتغيير.
        </p>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#2B0513", padding: "20px 40px 80px" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, background: "#5C0F30", borderRadius: 3, transform: "rotate(45deg)" }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: ".85rem", letterSpacing: ".15em", color: "#D8C4A8" }}>SCENES | TATWEER MISR</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={() => setShowPrivacy(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", fontSize: ".6rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>سياسة الخصوصية</button>
            <span style={{ fontSize: ".65rem", color: "rgba(255,255,255,.2)" }}>© 2026 Scenes — تطوير مصر | وكيل معتمد</span>
          </div>
        </div>
      </footer>

      {/* ── POPUP ── */}
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)" }}>
          <div style={{ background: "#fff", maxWidth: 400, width: "100%", borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,.3)" }}>
            <div style={{ background: "#5C0F30", padding: "24px 28px", color: "#fff", position: "relative" }}>
              <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: 12, left: 16, background: "none", border: "none", color: "rgba(255,255,255,.5)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
              <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", color: "rgba(255,255,255,.6)", display: "block", marginBottom: 8 }}>SCENES — NEW LAUNCH</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.25 }}>خصم حتى 35%<br /><span style={{ fontWeight: 700 }}>احجز مكانك الآن</span></h2>
            </div>
            <div style={{ padding: "24px 28px" }}>
              {popupSent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>✅</div>
                  <p style={{ fontWeight: 700 }}>تم التسجيل!</p>
                  <p style={{ fontSize: ".78rem", color: "#8B7355", marginTop: 6 }}>هنتواصل معاك قريباً</p>
                  <button onClick={() => setShowPopup(false)} style={{ marginTop: 14, padding: "10px 28px", background: "#5C0F30", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", borderRadius: 8, fontFamily: "'Almarai',sans-serif" }}>إغلاق</button>
                </div>
              ) : (
                <form onSubmit={submitPopup}>
                  <style>{`.pp-i::placeholder{color:#8B7355}.pp-i:focus{border-color:#5C0F30!important}`}</style>
                  <p style={{ fontSize: ".78rem", color: "#8B7355", marginBottom: 14, lineHeight: 1.7 }}>سجّل بياناتك واحصل على أسعار الإطلاق الجديد — جدية حجز 200,000 ج</p>
                  {[{ p: "الاسم الكريم *", k: "name" }, { p: "رقم الهاتف *", k: "phone" }].map(f => (
                    <input key={f.k} className="pp-i" placeholder={f.p} value={(popupForm as any)[f.k]}
                      onChange={e => setPopupForm({ ...popupForm, [f.k]: e.target.value })} required
                      type={f.k === "phone" ? "tel" : "text"}
                      style={{ width: "100%", padding: "13px 16px", marginBottom: 10, background: "#FAF6F2", border: "1px solid rgba(92,15,48,.15)", borderRadius: 8, fontSize: ".85rem", outline: "none", fontFamily: "'Almarai',sans-serif", direction: f.k === "phone" ? "ltr" : "rtl", color: "#1a1a1a" }} />
                  ))}
                  <button type="submit" disabled={popupLoading} style={{ width: "100%", padding: "14px", background: "#5C0F30", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".82rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", opacity: popupLoading ? .7 : 1 }}>
                    {popupLoading ? "..." : "🏡 سجّل الآن"}
                  </button>
                  <a href={`${WA}?text=${encodeURIComponent(WA_MSG)}`} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}
                    style={{ display: "block", marginTop: 8, padding: "12px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".75rem", textAlign: "center", textDecoration: "none", borderRadius: 8 }}>💬 واتساب مباشرة</a>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX (floor plans / masterplan / gallery) ── */}
      {plan && (
        <div onClick={() => setPlan(null)} style={{ position: "fixed", inset: 0, zIndex: 250, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(20,2,9,.88)", backdropFilter: "blur(6px)", cursor: "zoom-out" }}>
          <button onClick={() => setPlan(null)} aria-label="إغلاق" style={{ position: "absolute", top: 16, left: 20, background: "none", border: "none", color: "#fff", fontSize: "1.6rem", cursor: "pointer" }}>✕</button>
          <img src={plan} alt="Scenes" onClick={e => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "86vh", objectFit: "contain", background: "#fff", borderRadius: 8, cursor: "default" }} />
        </div>
      )}

      {/* ── PRIVACY POLICY MODAL ── */}
      {showPrivacy && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowPrivacy(false)}>
          <div style={{ background: "#fff", maxWidth: 500, width: "100%", borderRadius: 16, overflow: "hidden", maxHeight: "80vh", display: "flex", flexDirection: "column" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ background: "#5C0F30", padding: "20px 28px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 500 }}>سياسة الخصوصية</h3>
              <button onClick={() => setShowPrivacy(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.5)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "24px 28px", overflowY: "auto", fontSize: ".82rem", color: "#555", lineHeight: 1.9 }}>
              <p style={{ marginBottom: 12 }}>نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية المعلومات التي تقدمها عبر هذا الموقع.</p>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>البيانات التي نجمعها:</p>
              <p style={{ marginBottom: 12 }}>الاسم ورقم الهاتف الذي تقدمه من خلال نماذج التواصل لغرض التواصل معك بخصوص المشاريع العقارية المعروضة.</p>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>كيف نستخدم بياناتك:</p>
              <p style={{ marginBottom: 12 }}>نستخدم بياناتك فقط للتواصل معك بخصوص استفسارك عن المشاريع العقارية. لن نشارك بياناتك مع أطراف ثالثة دون موافقتك.</p>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>حقوقك:</p>
              <p>يمكنك طلب حذف بياناتك في أي وقت عن طريق التواصل معنا.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── COOKIE CONSENT ── */}
      {showCookie && (
        <div style={{ position: "fixed", bottom: 60, left: 16, right: 16, zIndex: 150, background: "#2B0513", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, boxShadow: "0 10px 40px rgba(0,0,0,.3)" }}>
          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)", flex: 1 }}>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بالاستمرار في التصفح فإنك توافق على استخدامنا لها.</p>
          <button onClick={() => { setShowCookie(false); try { localStorage.setItem("scenes_cookie", "1") } catch { } }}
            style={{ padding: "8px 20px", background: "#5C0F30", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", whiteSpace: "nowrap" }}>موافق</button>
        </div>
      )}

      {/* FLOAT BUTTONS */}
      <div className="float-btns" style={{ position: "fixed", bottom: 80, left: 24, zIndex: 50, display: "flex", flexDirection: "column", gap: 10 }}>
        <a href={`tel:${PHONE}`} onClick={trackCall} style={{ width: 48, height: 48, borderRadius: 12, background: "#5C0F30", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(92,15,48,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </a>
        <a href={`${WA}?text=${encodeURIComponent(WA_MSG)}`} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}
          style={{ width: 48, height: 48, borderRadius: 12, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </div>

      {/* MOBILE BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <a href={`tel:${PHONE}`} onClick={trackCall} style={{ padding: "16px", background: "#5C0F30", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>📞 اتصل الآن</a>
        <a href={`${WA}?text=${encodeURIComponent(WA_MSG)}`} target="_blank" rel="noopener noreferrer" onClick={trackWhatsApp}
          style={{ padding: "16px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>💬 واتساب</a>
      </div>
    </div>
  )
}
