import Link from 'next/link';

/**
 * Main Footer Component
 * Exported as default to correctly resolve the module import in layout.jsx
 */
export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white font-cairo border-t-4 border-brand-blue">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-2">
						<Link href="/" className="text-3xl font-bold tracking-tight text-white mb-4 block">
							Atla Hub <span className="text-brand-blue-light">Tech</span>
						</Link>
						<p className="text-gray-400 mt-4 max-w-sm leading-relaxed">
							High-conversion, result-driven enterprise solutions. Specializing in Emergency Cybersecurity Response and Field Interactive Production.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4 text-brand-blue-light">Quick Links</h3>
						<ul className="space-y-2">
							<li><Link href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</Link></li>
							<li><Link href="#portfolio" className="text-gray-400 hover:text-white transition-colors duration-300">Portfolio</Link></li>
							<li><Link href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
							<li><Link href="/admin/login" className="text-gray-400 hover:text-brand-blue-light transition-colors duration-300">Admin Portal</Link></li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4 text-brand-blue-light">Contact</h3>
						<ul className="space-y-2 text-gray-400">
							<li>contact@atlahub.com</li>
							<li className="font-semibold text-white mt-2">Global Emergency Response available 24/7.</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
					<p>&copy; {new Date().getFullYear()} Atla Hub Tech. All rights reserved. Founder: Ahmed Zayed.</p>
				</div>
			</div>
		</footer>
	);
}