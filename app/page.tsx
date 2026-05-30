import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <>
      <header className="border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900">InsightPDF</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-medium text-indigo-600 mb-8">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Potenciado por Google Gemini AI
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
              Analiza documentos con
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                inteligencia artificial
              </span>
            </h1>
            <p className="mt-5 text-lg text-zinc-500 max-w-lg mx-auto leading-relaxed">
              Sube tu PDF y obtén resúmenes inteligentes, extracción de insights
              y un chat contextual para hacer preguntas sobre el documento.
            </p>
          </div>
        </section>

        <section id="upload" className="max-w-5xl mx-auto px-6 pb-24">
          <FileUpload />
        </section>

        <section className="bg-zinc-50 border-y border-zinc-100 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Cómo funciona
              </h2>
              <p className="mt-2 text-zinc-500">
                Tres pasos simples para analizar cualquier documento
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
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
              ].map((item) => (
                <div key={item.step} className="text-center group">
                  <div className="w-14 h-14 bg-white shadow-sm border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all group-hover:shadow-md group-hover:border-indigo-200 group-hover:bg-indigo-50/50">
                    <svg
                      className="w-6 h-6 text-indigo-500 transition-colors group-hover:text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <p className="text-xs font-mono font-medium text-indigo-500 mb-2">
                    {item.step}
                  </p>
                  <h3 className="text-base font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Todo lo que necesitas
            </h2>
            <p className="mt-2 text-zinc-500">
              Herramientas potentes para analizar documentos
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
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
            ].map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md hover:shadow-zinc-100/50 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:from-indigo-100 group-hover:to-indigo-200">
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

        <section className="bg-zinc-50 border-y border-zinc-100 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Listo para probarlo?
            </h2>
            <p className="text-zinc-500 mb-8">
              Sube tu primer PDF y descubre lo que la IA puede hacer por ti.
              Sin registro, sin complicaciones.
            </p>
            <a
              href="#upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-indigo-200/50 active:scale-95"
            >
              Subir un PDF ahora
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <footer className="py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-zinc-400">
          <p>
            InsightPDF &mdash; Proyecto construido con Next.js + Google Gemini API
          </p>
        </div>
      </footer>
    </>
  );
}
