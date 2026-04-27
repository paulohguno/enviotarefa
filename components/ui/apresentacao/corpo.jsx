import ThreeDCarousel from "@/components/ui/apresentacao/carossel";

export default function NetflixHero() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-[#E50914] selection:text-white">

      
      <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">

        
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/fundo.png')"
          }}
        />

        
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black z-10" />

        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
            Filmes, séries e muito mais, sem limites
          </h1>

          <p className="text-lg md:text-2xl text-white mb-8 font-medium">
            Assista onde quiser. Cancele quando quiser.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full md:w-96 px-4 py-4 bg-black/40 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button className="w-full md:w-auto px-8 py-4 bg-[#E50914] hover:bg-[#C11119] text-white text-xl font-bold rounded transition-colors duration-200">
              Vamos lá
            </button>
          </div>
        </div>


        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[120px]"
            preserveAspectRatio="none"
          >
            <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
  <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="black" stopOpacity="0.7" />
    <stop offset="100%" stopColor="black" stopOpacity="0" />
  </linearGradient>
</defs>
              <path
                d="M0,120 C400,0 1040,0 1440,120 L1440,120 L0,120 Z"
                fill="url(#fadeGradient)"
              />
            </svg>
          </svg>
        </div>
      </div>
      <section className="bg-[#000000] pt-32 pb-20 px-8">
        <div style={{
        width: '100%',
        height: '150px',
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div>
            <h2>
              A Netflix que você adora por apenas R$ 20,90.
            </h2>
            <p >
              Aproveite nossa opção mais acessível, o plano com anúncios.
            </p>
          </div>
      
      </div>
        <ThreeDCarousel />
      </section>

    </div>

  );
}