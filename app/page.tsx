import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <>
      <header className="border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3 3m0 0l3-3m-3 3v-6m1.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900">InsightPDF</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            Analiza documentos con
            <span className="text-indigo-600"> inteligencia artificial</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
            Sube tu PDF y obtén resúmenes inteligentes, extracción de insights y
            un chat contextual para hacer preguntas sobre el documento.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-20">
          <FileUpload />
        </section>

        <section className="bg-zinc-50 border-y border-zinc-200 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-zinc-900 mb-12">
              Cómo funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Sube tu PDF",
                  desc: "Arrastra o selecciona cualquier documento PDF de hasta 10MB.",
                },
                {
                  step: "2",
                  title: "Procesamiento con IA",
                  desc: "Extraemos el texto y lo analizamos con Google Gemini.",
                },
                {
                  step: "3",
                  title: "Obtén resultados",
                  desc: "Chat contextual, resúmenes en 3 niveles y extracción de insights.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-indigo-600">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center text-zinc-900 mb-12">
            Características
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                ),
                title: "Chat contextual",
                desc: "Conversación inteligente sobre el contenido del documento con respuestas precisas.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                ),
                title: "Resúmenes inteligentes",
                desc: "Tres niveles de resumen: corto, medio y detallado. Elige el que necesites.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                ),
                title: "Extracción de insights",
                desc: "Conceptos clave, conexiones entre ideas, datos relevantes y preguntas frecuentes.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                ),
                title: "Exportación fácil",
                desc: "Resultados formateados en markdown listos para copiar o exportar.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-white rounded-xl border border-zinc-200"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {feature.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-zinc-400">
          InsightPDF — Proyecto creado con Next.js + Google Gemini API
        </div>
      </footer>
    </>
  );
}
