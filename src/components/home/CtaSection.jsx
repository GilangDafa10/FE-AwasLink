const CTABanner = () => {
  const handleClick = () => {
    window.dispatchEvent(new Event("scrollToHeroTextarea"));
  };

  return (
    <section className="px-6 md:px-14 py-8 md:py-12 max-w-7xl mx-auto w-full">
      <div className="bg-slate-950 rounded-3xl md:rounded-[40px] py-12 md:py-16 px-6 md:px-10 text-center text-white border border-slate-900 shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight relative z-10">
          Lindungi Privasi Anda Mulai Hari Ini
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-4 mb-8 max-w-xl mx-auto relative z-10 leading-relaxed">
          Bergabunglah dengan komunitas yang sadar keamanan digital.
        </p>
        <button
          onClick={handleClick}
          className="relative z-10 w-full sm:w-auto bg-cyan-400 text-slate-950 hover:bg-cyan-300 px-8 py-3.5 rounded-xl font-bold transition-all active:scale-98 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 cursor-pointer"
        >
          Analisis Pesan Sekarang
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
