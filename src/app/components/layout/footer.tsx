'use client'
import { usePathname } from "next/navigation"

export default function Footer() {

    const pathname = usePathname();

    if(pathname === "/dashboard") return null;

    const footerSections = [
        {
          title: "Shop",
          links: [
            { name: "All Products", href: "#" },
            { name: "New Arrivals", href: "#" },
            { name: "Best Sellers", href: "#" },
            { name: "Sale", href: "#" },
          ],
        },
        {
          title: "Support",
          links: [
            { name: "Contact Us", href: "#" },
            { name: "Size Guide", href: "#" },
            { name: "Shipping & Returns", href: "#" },
            { name: "FAQ", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { name: "About", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
          ],
        },
      ];

    return (
        <>
            <footer className="bg-[hsl(220,13%,98%)] font-inter border-t border-[hsl(220,13%,91%)]">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold text-gray-700 mb-3">Minimal</h3>
                            <p className="text-gray-500 mb-6 max-w-md">
                              Crafted with attention to detail and designed for the modern lifestyle. 
                              Discover our curated collection of minimalist essentials.
                            </p>
                        </div>
                        {/* Footer Links */}
                        {footerSections.map((section) => (
                          <div key={section.title}>
                            <h4 className="font-semibold text-gray-700 mb-3">{section.title}</h4>
                            <ul className="space-y-2">
                              {section.links.map((link) => (
                                <li key={link.name}>
                                  <a
                                    href={link.href}
                                    className="text-gray-500 hover:text-gray-800 transition-colors text-sm"
                                  >
                                    {link.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                    
                </div>
                <div className="py-4 border-t border-[hsl(220,13%,91%)]">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Minimal Store. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm text-center">
                        Developed by <a className="text-gray-600 hover:text-blue-600 hover:underline font-medium" href="https://thureinphyoko.com/" target="_blank" rel="noopener noreferrer">Thu Rein Phyo Ko (Ryan)</a>
                    </p>
                </div>
            </footer>
        </>
    )
}