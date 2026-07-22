import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 font-arabic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-500 rounded flex items-center justify-center text-white font-bold text-xl relative overflow-hidden">
              <span className="relative z-10">A</span>
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-300 opacity-50"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-300 opacity-50"></div>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Atla Hub Tech</span>
          </div>
          
          <div className="hidden md:flex space-x-8 space-x-reverse items-center">
            <Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Services</Link>
            <Link href="#portfolio" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Portfolio</Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold">About</Link>
            <Link href="#contact" className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-6 py-2.5 rounded-md hover:shadow-lg transition-all font-bold">Contact Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}