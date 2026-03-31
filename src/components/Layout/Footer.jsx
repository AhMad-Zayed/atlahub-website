import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/AtlaHub_Tech_Logo.png';

export default function Footer({ lang = 'en', navData, brandData, footerData }) {
	const homePath = `/${lang}`;

	return (
		<footer className="bg-gray-900 text-white font-cairo border-t-4 border-brand-blue">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-2">
						<Link
							href={homePath}
							className="group flex items-center transition-all duration-300 hover:opacity-90"
						>
							<div className="relative h-10 w-40 md:h-14 md:w-56 flex items-center">
								<Image
									src={logo}
									alt={`${brandData?.part1 || ''}${brandData?.part2 || ''} Logo`}
									fill
									className="object-contain object-left rtl:object-right"
								/>
							</div>
						</Link>
						<p className="text-gray-400 mt-4 max-w-sm leading-relaxed">
							{footerData?.description}
						</p>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4 text-brand-blue-light">{footerData?.quickLinksTitle}</h3>
						<ul className="space-y-2">
							<li><Link href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">{navData?.services}</Link></li>
							<li><Link href={`/${lang}/portfolio`} className="text-gray-400 hover:text-white transition-colors duration-300">{navData?.portfolio}</Link></li>
							<li><Link href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">{navData?.about}</Link></li>
							<li><Link href={`/${lang}/admin/login`} className="text-gray-400 hover:text-brand-blue-light transition-colors duration-300">{footerData?.adminPortal}</Link></li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-4 text-brand-blue-light">{footerData?.contactTitle}</h3>
						<ul className="space-y-2 text-gray-400">
							<li>contact@atlahub.com</li>
							<li className="font-semibold text-white mt-2">{footerData?.emergency}</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
					<p>&copy; {new Date().getFullYear()} {brandData?.part1}{brandData?.part2}. {footerData?.copyright} {footerData?.founder}</p>
				</div>
			</div>
		</footer>
	);
}
