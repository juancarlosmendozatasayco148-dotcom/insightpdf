import Link from "next/link";
import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Divider />
        <UploadSection />
        <Divider />
        <HowItWorksSection />
        <Divider />
        <FeaturesSection />
        <Divider />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <hr className="border-stone-200" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="bg-white animate-fade-in-down">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>InsightPDF</span>
        </Link>
        <nav className="flex items-center gap-8">
          <a href="#how-it-works" className="relative text-xs text-stone-500 hover:text-black transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Cómo funciona
          </a>
          <a href="#features" className="relative text-xs text-stone-500 hover:text-black transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Características
          </a>
          <a
            href="#upload"
            className="text-xs text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300"
          >
            Subir PDF
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-center">
      <div className="animate-fade-in-up">
        <span className="inline-block text-xs text-stone-400 uppercase tracking-[0.2em] mb-6">Document Intelligence</span>
      </div>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight animate-fade-in-up stagger-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Analiza documentos con
        <br />
        <span className="italic">inteligencia artificial</span>
      </h1>
      <p className="mt-6 text-base sm:text-lg text-stone-500 max-w-lg mx-auto leading-relaxed animate-fade-in-up stagger-2">
        Sube tu PDF. Obtén resúmenes inteligentes, extracción de insights
        y un chat contextual para hacer preguntas sobre el documento.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
        <a
          href="#upload"
          className="px-8 py-3 text-sm bg-black text-white hover:bg-stone-800 transition-all duration-300 active:scale-[0.97]"
        >
          Subir PDF ahora
        </a>
        <a
          href="#how-it-works"
          className="px-8 py-3 text-sm text-black border border-black hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.97]"
        >
          Ver cómo funciona
        </a>
      </div>
    </section>
  );
}

function UploadSection() {
  return (
    <section id="upload" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="text-center mb-12">
        <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-3 animate-fade-in-up">Sube tu documento</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black animate-fade-in-up stagger-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Arrastra o selecciona tu PDF
        </h2>
        <p className="mt-3 text-sm text-stone-500 animate-fade-in-up stagger-2">
          Empieza a analizarlo en segundos
        </p>
      </div>
      <div className="animate-fade-in-up stagger-3">
        <FileUpload />
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Sube tu PDF",
      desc: "Arrastra o selecciona cualquier documento PDF de hasta 10MB. Sin registro ni complicaciones.",
    },
    {
      title: "Procesamiento con IA",
      desc: "Extraemos el texto y lo analizamos con Google Gemini, el modelo de lenguaje más avanzado de Google.",
    },
    {
      title: "Obtén resultados",
      desc: "Chat contextual, resúmenes en 3 niveles y extracción automática de insights y conceptos clave.",
    },
  ];

  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="text-center mb-16">
        <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-3 animate-fade-in-up">Paso a paso</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black animate-fade-in-up stagger-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Cómo funciona
        </h2>
        <p className="mt-3 text-sm text-stone-500 animate-fade-in-up stagger-2">
          Tres pasos simples para analizar cualquier documento
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((item, i) => (
          <div key={i} className="group animate-fade-in-up" style={{ animationDelay: `${0.12 * (i + 1)}s` }}>
            <p className="text-5xl font-bold text-stone-200 group-hover:text-black transition-colors duration-500 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {(i + 1).toString().padStart(2, '0')}
            </p>
            <h3 className="text-base font-semibold text-black mb-2">{item.title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Chat contextual",
      desc: "Conversación inteligente sobre el contenido del documento con respuestas precisas y citas contextuales.",
    },
    {
      title: "Resúmenes inteligentes",
      desc: "Tres niveles de resumen: corto, medio y detallado. Elige el que mejor se adapte a tus necesidades.",
    },
    {
      title: "Extracción de insights",
      desc: "Conceptos clave, conexiones entre ideas, datos relevantes y preguntas frecuentes extraídos automáticamente.",
    },
    {
      title: "Resultados formateados",
      desc: "Todo el contenido se genera en markdown estructurado, listo para copiar, compartir o exportar.",
    },
  ];

  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="text-center mb-16">
        <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-3 animate-fade-in-up">Características</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black animate-fade-in-up stagger-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Todo lo que necesitas
        </h2>
        <p className="mt-3 text-sm text-stone-500 animate-fade-in-up stagger-2">
          Herramientas potentes para analizar documentos
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="border border-stone-200 p-6 hover:border-black transition-all duration-300 hover:-translate-y-0.5 animate-fade-in-up"
            style={{ animationDelay: `${0.12 * (i + 1)}s` }}
          >
            <h3 className="text-sm font-semibold text-black mb-2">{feature.title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { number: "100%", label: "Gratuito" },
    { number: "0", label: "Sin registro" },
    { number: "10MB", label: "Límite por archivo" },
    { number: "<2s", label: "Procesamiento" },
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs text-stone-500 uppercase tracking-[0.2em] mb-3 animate-fade-in-up">Por qué elegir InsightPDF</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white animate-fade-in-up stagger-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Simple, rápido y sin complicaciones
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="border border-stone-800 p-8 text-center group hover:bg-stone-900 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.12 * (i + 1)}s` }}
            >
              <p className="text-4xl sm:text-5xl font-bold text-white group-hover:scale-105 transition-transform duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.number}
              </p>
              <p className="mt-2 text-sm text-stone-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-3 animate-fade-in-up">Comienza ahora</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 animate-fade-in-up stagger-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Listo para probarlo?
      </h2>
      <p className="text-sm text-stone-500 mb-8 max-w-md mx-auto animate-fade-in-up stagger-2">
        Sube tu primer PDF y descubre lo que la IA puede hacer por ti.
        Sin registro, sin complicaciones, completamente gratis.
      </p>
      <div className="animate-fade-in-up stagger-3">
        <a
          href="#upload"
          className="inline-block px-8 py-3 text-sm bg-black text-white hover:bg-stone-800 transition-all duration-300 active:scale-[0.97]"
        >
          Subir un PDF ahora
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>InsightPDF</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
              Analiza documentos PDF con inteligencia artificial. Obtén resúmenes, insights y chatea con tus documentos.
            </p>
          </div>
          <div>
            <h4 className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-4">Producto</h4>
            <ul className="space-y-3">
              <li><a href="#upload" className="text-sm text-stone-500 hover:text-black transition-colors duration-300">Subir PDF</a></li>
              <li><a href="#how-it-works" className="text-sm text-stone-500 hover:text-black transition-colors duration-300">Cómo funciona</a></li>
              <li><a href="#features" className="text-sm text-stone-500 hover:text-black transition-colors duration-300">Características</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-stone-400">Privacidad</span></li>
              <li><span className="text-sm text-stone-400">Términos</span></li>
              <li><span className="text-sm text-stone-400">Contacto</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-200 pt-8 text-center">
          <p className="text-xs text-stone-400">
            InsightPDF &mdash; Proyecto construido con Next.js + Google Gemini API
          </p>
        </div>
      </div>
    </footer>
  );
}
