import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <UploadSection />
        <HowItWorksSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <header className="border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-900">InsightPDF</span>
        </a>
        <nav className="flex items-center gap-6">
          <a href="#how-it-works" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
            Cómo funciona
          </a>
          <a href="#features" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
            Características
          </a>
          <a
            href="#upload"
            className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-indigo-200/50"
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
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white pointer-events-none"
      />
      <div
        className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl animate-gradient-shift"
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[40%] bg-gradient-to-br from-indigo-300/20 to-purple-300/15 rounded-full blur-3xl animate-gradient-shift"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-600 mb-8 animate-fade-in-down">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Potenciado por Google Gemini AI
        </div>

        <div className="relative">
          <div className="absolute -top-8 -left-12 w-20 h-20 bg-indigo-400/10 rounded-full blur-sm animate-float" />
          <div className="absolute -bottom-4 -right-8 w-16 h-16 bg-purple-400/10 rounded-full blur-sm animate-float-delayed" />

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1] animate-fade-in-up">
            Analiza documentos con
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              inteligencia artificial
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            Sube tu PDF y obtén resúmenes inteligentes, extracción de insights
            y un chat contextual para hacer preguntas sobre el documento.
            <span className="block mt-2 text-indigo-500 font-medium">
              Gratis · Sin registro · En segundos
            </span>
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
          <a
            href="#upload"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-[0.97]"
          >
            Subir PDF ahora
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-zinc-700 font-medium rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md active:scale-[0.97]"
          >
            Ver cómo funciona
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function UploadSection() {
  return (
    <section id="upload" className="max-w-5xl mx-auto px-6 pb-24 scroll-mt-20">
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          Sube tu documento
        </h2>
        <p className="mt-2 text-zinc-500">
          Arrastra o selecciona tu PDF y empieza a analizarlo
        </p>
      </div>
      <div className="animate-fade-in-up stagger-1">
        <FileUpload />
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Sube tu PDF",
      desc: "Arrastra o selecciona cualquier documento PDF de hasta 10MB. Sin registro ni complicaciones.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      ),
    },
    {
      step: "02",
      title: "Procesamiento con IA",
      desc: "Extraemos el texto y lo analizamos con Google Gemini, el modelo de lenguaje más avanzado de Google.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      ),
    },
    {
      step: "03",
      title: "Obtén resultados",
      desc: "Chat contextual, resúmenes en 3 niveles y extracción automática de insights y conceptos clave.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-zinc-50 border-y border-zinc-100 py-20 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-600 mb-4">
            Paso a paso
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Cómo funciona
          </h2>
          <p className="mt-2 text-zinc-500">
            Tres pasos simples para analizar cualquier documento
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200" />
          {steps.map((item, i) => (
            <div key={item.step} className="text-center group relative animate-fade-in-up stagger-{i + 1}">
              <div className="w-16 h-16 bg-white shadow-md border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all group-hover:shadow-lg group-hover:border-indigo-200 group-hover:bg-indigo-50/50 group-hover:scale-110">
                <svg
                  className="w-7 h-7 text-indigo-500 transition-colors group-hover:text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {item.icon}
                </svg>
              </div>
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold shadow-sm">
                {item.step}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      ),
      title: "Chat contextual",
      desc: "Conversación inteligente sobre el contenido del documento con respuestas precisas y citas contextuales.",
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
      ),
      title: "Resúmenes inteligentes",
      desc: "Tres niveles de resumen: corto, medio y detallado. Elige el que mejor se adapte a tus necesidades.",
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      ),
      title: "Extracción de insights",
      desc: "Conceptos clave, conexiones entre ideas, datos relevantes y preguntas frecuentes extraídos automáticamente.",
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      ),
      title: "Resultados formateados",
      desc: "Todo el contenido se genera en markdown estructurado, listo para copiar, compartir o exportar.",
    },
  ];

  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-600 mb-4">
          Características
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          Todo lo que necesitas
        </h2>
        <p className="mt-2 text-zinc-500">
          Herramientas potentes para analizar documentos
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex gap-4 p-5 bg-white rounded-xl border border-zinc-200 hover:border-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-100/30 group animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:from-indigo-100 group-hover:to-indigo-200 group-hover:scale-110">
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {feature.icon}
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    {
      number: "100%",
      label: "Gratuito",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    {
      number: "0",
      label: "Sin registro",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      ),
    },
    {
      number: "10MB",
      label: "Límite por archivo",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
      ),
    },
    {
      number: "<2s",
      label: "Procesamiento",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 py-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-indigo-200 mb-4 backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Por qué elegir InsightPDF
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Simple, rápido y sin complicaciones
          </h2>
          <p className="mt-2 text-indigo-200/80">
            Todo lo que necesitas para analizar documentos al instante
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {stat.icon}
                </svg>
              </div>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {stat.number}
              </p>
              <p className="mt-1.5 text-sm text-indigo-200 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-zinc-50 border-y border-zinc-100 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-600 mb-6">
          Comienza ahora
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
          Listo para probarlo?
        </h2>
        <p className="text-zinc-500 mb-8 max-w-lg mx-auto">
          Sube tu primer PDF y descubre lo que la IA puede hacer por ti.
          Sin registro, sin complicaciones, completamente gratis.
        </p>
        <a
          href="#upload"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-[0.97]"
        >
          Subir un PDF ahora
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-indigo-400 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">InsightPDF</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Analiza documentos PDF con inteligencia artificial. Obtén resúmenes, insights y chatea con tus documentos.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li><a href="#upload" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Subir PDF</a></li>
              <li><a href="#how-it-works" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Cómo funciona</a></li>
              <li><a href="#features" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Características</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-zinc-500">Privacidad</span></li>
              <li><span className="text-sm text-zinc-500">Términos</span></li>
              <li><span className="text-sm text-zinc-500">Contacto</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-500">
            InsightPDF &mdash; Proyecto construido con Next.js + Google Gemini API
          </p>
        </div>
      </div>
    </footer>
  );
}
