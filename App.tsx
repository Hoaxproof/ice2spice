import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Twitter,
  ArrowRight,
  Star,
  Snowflake,
  Flame,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Heart,
  Eye,
} from "lucide-react";

/* ───────────────────────────── helpers ───────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ──────────────────────── placeholder helpers ───────────────────── */

/**
 * 🔔 IMAGE PLACEHOLDER GUIDE
 * Throughout this file you'll see comments marked with 📸
 * Replace the placeholder <div> / gradient boxes with your own <img> tags.
 * Example:
 *   <img src="/images/your-image.png" alt="description" className="..." />
 *
 * Required images you should prepare:
 *  1. Brand logo          → used in Navbar & Footer  (transparent PNG, ~200×60px recommended)
 *  2. Hero background     → large lifestyle / campaign photo  (min 1920×1080)
 *  3. Product images ×6   → square product shots  (800×800 or 1:1 ratio)
 *  4. Lookbook images ×3  → vertical lifestyle shots  (600×900 or 2:3 ratio)
 *  5. About / story image → brand story photo  (800×600 landscape)
 *  6. Ice Spice feature   → artist collaboration photo  (any aspect)
 *  7. Favicon             → update in index.html  (32×32 .ico or .png)
 */

/* ───────────────────────────── data ──────────────────────────────── */

const PRODUCTS = [
  { id: 1, name: "Frozen Flame Hoodie", price: "$120", tag: "BEST SELLER", colors: ["#0ea5e9", "#f97316", "#000"] },
  { id: 2, name: "Blizzard Cargo Pants", price: "$95", tag: "NEW", colors: ["#000", "#fff", "#7dd3fc"] },
  { id: 3, name: "Munch Crop Top", price: "$65", tag: null, colors: ["#f97316", "#fff", "#0ea5e9"] },
  { id: 4, name: "Icy Chain Tee", price: "$75", tag: "LIMITED", colors: ["#000", "#bae6fd"] },
  { id: 5, name: "Spice Bomber Jacket", price: "$185", tag: null, colors: ["#ea580c", "#000", "#fff"] },
  { id: 6, name: "Glacial Mesh Shorts", price: "$70", tag: "NEW", colors: ["#7dd3fc", "#000"] },
];

const MARQUEE_TEXT = "ICE TO SPICE ❄️ NEW DROP ❄️ FREE SHIPPING OVER $100 🔥 ICE TO SPICE ❄️ NEW DROP ❄️ FREE SHIPPING OVER $100 🔥 ";

/* ────────────────────────── components ───────────────────────────── */

function Snowflakes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-white/10 animate-snowfall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            fontSize: `${8 + Math.random() * 14}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Collection", "Lookbook", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 📸 BRAND LOGO — Replace this div with your logo image:
            <img src="/images/logo.png" alt="Ice to Spice" className="h-8" /> */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-ice-400 to-spice-500 group-hover:animate-pulse-glow transition-all">
            <Snowflake className="w-5 h-5 text-white" />
          </div>
          <span className="font-[Playfair_Display] text-xl font-bold tracking-tight text-white">
            ICE<span className="bg-gradient-to-r from-ice-300 to-spice-400 bg-clip-text text-transparent"> to </span>SPICE
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-ice-400 after:to-spice-500 after:transition-all after:duration-300"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-white/70 hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-spice-500 text-[10px] font-bold text-white">
              0
            </span>
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl px-6 py-6 space-y-4 border-t border-white/5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block text-lg font-medium text-white/80 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── Marquee Banner ─── */
function MarqueeBanner() {
  return (
    <div className="bg-gradient-to-r from-ice-500 via-spice-500 to-ice-500 py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-xs font-bold tracking-[0.2em] text-white uppercase px-2">
          {MARQUEE_TEXT}{MARQUEE_TEXT}
        </span>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 📸 HERO BACKGROUND IMAGE — Replace this gradient div with your hero image:
          <img src="/images/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          Then keep the overlay div below for the dark tint. */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(14,165,233,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.12),transparent_60%)]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-ice-400/20 animate-float">
        <Snowflake className="w-16 h-16" />
      </div>
      <div className="absolute bottom-32 right-16 text-spice-500/20 animate-float" style={{ animationDelay: "3s" }}>
        <Flame className="w-20 h-20" />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="animate-fade-in-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-ice-300 backdrop-blur-sm">
            <Snowflake className="w-3 h-3" /> Season 1 Drop <Flame className="w-3 h-3 text-spice-400" />
          </p>
        </div>

        <h1
          className="mt-6 font-[Playfair_Display] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="text-white">ICE</span>
          <br />
          <span className="bg-gradient-to-r from-ice-300 via-white to-spice-400 bg-clip-text text-transparent">
            to
          </span>
          <br />
          <span className="text-white">SPICE</span>
        </h1>

        <p
          className="mx-auto mt-8 max-w-lg text-lg text-white/60 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Where frost meets fire. A clothing line inspired by duality — cool confidence and bold self-expression.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#collection"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-ice-500 to-spice-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-ice-500/20 hover:shadow-spice-500/30 transition-all duration-300 hover:scale-105"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#lookbook"
            className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white/80 hover:bg-white/5 transition-all duration-300"
          >
            View Lookbook
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <ChevronDown className="mx-auto w-6 h-6 text-white/30" />
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Collection ─── */
function Collection() {
  const { ref, visible } = useInView();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="collection" className="relative bg-black py-24 md:py-32" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-spice-400 mb-3">The Drop</p>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-white">
            Featured Collection
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-ice-400 to-spice-500" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              className={`group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden transition-all duration-700 hover:border-white/10 hover:bg-white/[0.05] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 📸 PRODUCT IMAGE — Replace this div with your product image:
                  <img src={`/images/product-${product.id}.png`} alt={product.name}
                       className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105" /> */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-6xl transition-transform duration-700 ${hoveredId === product.id ? "scale-110" : "scale-100"}`}>
                    {i % 2 === 0 ? "❄️" : "🔥"}
                  </div>
                </div>
                {/* Placeholder text */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white/20 text-xs tracking-widest uppercase">
                    📸 Add product image here
                  </p>
                </div>

                {product.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-ice-500 to-spice-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {product.tag}
                  </span>
                )}

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredId === product.id ? "opacity-100" : "opacity-0"}`}>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black hover:bg-ice-400 hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black hover:bg-spice-500 hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black hover:bg-gray-700 hover:text-white transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-white group-hover:text-ice-300 transition-colors">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold bg-gradient-to-r from-ice-300 to-spice-400 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <div className="flex gap-1.5">
                    {product.colors.map((c, ci) => (
                      <span
                        key={ci}
                        className="h-4 w-4 rounded-full border border-white/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Lookbook ─── */
function Lookbook() {
  const { ref, visible } = useInView();

  const looks = [
    { title: "Arctic Heat", subtitle: "Winter '25 Campaign" },
    { title: "Flame Walker", subtitle: "Street Editorial" },
    { title: "Dual Nature", subtitle: "Studio Session" },
  ];

  return (
    <section id="lookbook" className="relative bg-gradient-to-b from-black via-gray-950 to-black py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-ice-300 mb-3">Style Guide</p>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-white">
            Lookbook
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-ice-400 to-spice-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {looks.map((look, i) => (
            <div
              key={i}
              className={`group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* 📸 LOOKBOOK IMAGE — Replace this div with your lookbook image:
                  <img src={`/images/lookbook-${i + 1}.jpg`} alt={look.title}
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> */}
              <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 ${
                i === 0
                  ? "bg-gradient-to-br from-ice-500/30 via-gray-900 to-black"
                  : i === 1
                  ? "bg-gradient-to-br from-spice-500/30 via-gray-900 to-black"
                  : "bg-gradient-to-br from-ice-400/20 via-gray-900 to-spice-500/20"
              }`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="text-5xl mb-4">
                  {i === 0 ? "❄️" : i === 1 ? "🔥" : "✨"}
                </div>
                <p className="text-white/30 text-xs tracking-widest uppercase mb-2">
                  📸 Add lookbook image here
                </p>
              </div>

              {/* Info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-spice-400 mb-1">{look.subtitle}</p>
                <h3 className="font-[Playfair_Display] text-2xl font-bold text-white">{look.title}</h3>
                <div className="mt-3 flex items-center gap-2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Feature / Collab Banner ─── */
function FeatureBanner() {
  const { ref, visible } = useInView();

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 📸 ICE SPICE / COLLABORATION IMAGE — Replace this div:
              <img src="/images/collab-feature.jpg" alt="Ice Spice Collaboration"
                   className="w-full rounded-3xl object-cover aspect-[4/5]" /> */}
          <div
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-spice-500/20 via-gray-900 to-ice-500/20 rounded-3xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="text-7xl mb-6">🧊🔥</div>
              <p className="text-white/30 text-xs tracking-widest uppercase">
                📸 Add feature / collaboration image here
              </p>
            </div>
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5" />
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-ice-300 mb-4">The Inspiration</p>
            <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-white leading-tight">
              Born from the <span className="bg-gradient-to-r from-ice-300 to-spice-400 bg-clip-text text-transparent">contrast</span>
            </h2>
            <p className="mt-6 text-white/50 leading-relaxed text-lg">
              Ice to Spice is more than a brand — it's a movement. Inspired by the duality of cool and fire,
              we create streetwear that lets you switch between ice-cold confidence and blazing self-expression.
            </p>
            <p className="mt-4 text-white/50 leading-relaxed text-lg">
              Every piece is designed to make a statement. From icy blues to fiery oranges,
              our palette tells a story of transformation and unapologetic style.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-ice-300 to-spice-400 bg-clip-text text-transparent">50+</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Designs</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-ice-300 to-spice-400 bg-clip-text text-transparent">10K+</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Community</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-ice-300 to-spice-400 bg-clip-text text-transparent">100%</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Authentic</p>
              </div>
            </div>

            <a
              href="#about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-spice-400 hover:text-spice-500 transition-colors group"
            >
              Our Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const { ref, visible } = useInView();

  const reviews = [
    { name: "Aaliyah M.", text: "The Frozen Flame Hoodie is literally the softest thing I've ever worn. The gradient is insane in person 🔥", rating: 5 },
    { name: "Jayden K.", text: "Ice to Spice understands streetwear. Every piece feels premium. The compliments don't stop.", rating: 5 },
    { name: "Mia R.", text: "Ordered the full set and I'm obsessed. The quality is crazy for the price. Can't wait for the next drop!", rating: 5 },
  ];

  return (
    <section className="relative bg-gradient-to-b from-black to-gray-950 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-spice-400 mb-3">Community Love</p>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-white">
            What They're Saying
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-ice-400 to-spice-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-700 hover:border-white/10 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-spice-400 text-spice-400" />
                ))}
              </div>
              <p className="text-white/60 leading-relaxed italic">"{review.text}"</p>
              <p className="mt-6 text-sm font-semibold text-white">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="relative bg-gray-950 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-ice-300 mb-4">Our Story</p>
            <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-white leading-tight">
              From the <span className="text-ice-300">ice</span> to the <span className="text-spice-400">spice</span>
            </h2>
            <p className="mt-6 text-white/50 leading-relaxed text-lg">
              Ice to Spice was born from the idea that fashion should embody contrast.
              We believe in the power of duality — the calm and the chaos, the chill and the heat.
            </p>
            <p className="mt-4 text-white/50 leading-relaxed text-lg">
              Every collection is a journey from the frozen to the fiery, designed for those who
              refuse to be just one thing. We're not just a brand — we're a vibe, a lifestyle,
              a whole mood.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#" className="flex items-center gap-2 text-white/40 hover:text-ice-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center gap-2 text-white/40 hover:text-ice-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 📸 ABOUT / BRAND STORY IMAGE — Replace this div:
              <img src="/images/about-story.jpg" alt="Ice to Spice Story"
                   className="w-full rounded-3xl object-cover aspect-square" /> */}
          <div
            className={`relative aspect-square rounded-3xl overflow-hidden transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-ice-500/20 via-gray-900 to-spice-500/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="text-6xl mb-6">👕</div>
              <p className="text-white/30 text-xs tracking-widest uppercase">
                📸 Add brand story image here
              </p>
            </div>
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter ─── */
function Newsletter() {
  const { ref, visible } = useInView();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-ice-500/5 via-transparent to-spice-500/5" />

      <div
        className={`relative mx-auto max-w-2xl px-6 text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ice-400 to-spice-500 mb-8">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-white">
          Join the Movement
        </h2>
        <p className="mt-4 text-white/50 text-lg">
          Be the first to know about new drops, exclusive deals, and behind-the-scenes content.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-ice-500/20 bg-ice-500/5 p-6">
            <p className="text-ice-300 font-semibold">❄️ You're in! Welcome to the Ice to Spice fam 🔥</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white placeholder:text-white/30 focus:border-ice-400 focus:outline-none focus:ring-1 focus:ring-ice-400 backdrop-blur-sm"
            />
            <button
              onClick={() => { if (email) setSubmitted(true); }}
              className="rounded-full bg-gradient-to-r from-ice-500 to-spice-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:shadow-lg hover:shadow-ice-500/20 transition-all duration-300 hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const { ref, visible } = useInView();

  return (
    <section id="contact" className="relative bg-gray-950 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-ice-300 mb-3">Get in Touch</p>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-white">
            Contact Us
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-ice-400 to-spice-500" />
        </div>

        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {[
            { icon: <Mail className="w-6 h-6" />, label: "Email", value: "hello@icetospice.com" },
            { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+1 (555) 123-4567" },
            { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "New York, NY" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center hover:border-white/10 transition-colors"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-500/20 to-spice-500/20 text-white">
                {item.icon}
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            {/* 📸 BRAND LOGO (FOOTER) — Replace with your logo:
                <img src="/images/logo-white.png" alt="Ice to Spice" className="h-8 mb-4" /> */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-ice-400 to-spice-500">
                <Snowflake className="w-4 h-4 text-white" />
              </div>
              <span className="font-[Playfair_Display] text-lg font-bold text-white">
                ICE <span className="text-white/40">to</span> SPICE
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Where frost meets fire. Streetwear for the bold and unapologetic.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-white/30 hover:text-ice-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/30 hover:text-ice-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Shop", links: ["New Arrivals", "Best Sellers", "Hoodies", "Tees", "Bottoms", "Accessories"] },
            { title: "Info", links: ["About Us", "Size Guide", "Shipping", "Returns", "FAQ"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/30 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Ice to Spice. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Made with ❄️ & 🔥
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────── App ──────────────────────────────── */

export function App() {
  return (
    <div className="bg-black text-white font-[Inter] antialiased">
      <Snowflakes />
      <Navbar />
      <MarqueeBanner />
      <Hero />
      <Collection />
      <Lookbook />
      <FeatureBanner />
      <Testimonials />
      <About />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
}
