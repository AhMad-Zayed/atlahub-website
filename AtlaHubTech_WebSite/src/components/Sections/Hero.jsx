import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full bg-gray-50 pt-20 pb-32 overflow-hidden font-arabic">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1e3a8a 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-start text-right">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-900 text-sm font-bold mb-6">
            Expert Tech & Media Solutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Transforming Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500">Digital Reality</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
            Led by Ahmed Zayed and a team of 6 specialists. We build high-converting systems, bulletproof cybersecurity, and impactful digital marketing that delivers real business results.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#contact" className="px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-600 text-white font-bold rounded-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Start Your Project
            </Link>
            <Link href="#portfolio" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-md border-2 border-gray-200 hover:border-blue-400 hover:bg-gray-50 transition-all">
              View Our Work
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-blue-400 rounded-2xl transform rotate-3 opacity-20"></div>
            <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col items-center justify-center p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-700 text-3xl font-extrabold shadow-inner">AZ</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Ahmed Zayed</h3>
              <p className="text-blue-600 font-semibold text-lg">Founder & Lead Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}