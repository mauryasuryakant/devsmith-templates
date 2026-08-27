import { storeConfig } from "../../../devsmith.config";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-bold text-2xl tracking-tight mb-4">
              {storeConfig.storeInfo.logo}
            </h3>
            <p className="text-slate-500 max-w-sm mb-6">
              {storeConfig.hero.subheadline}
            </p>
            <div className="flex gap-4">
              {storeConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-3">
              {storeConfig.navigation.mainNav.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 tracking-wide">Customer Service</h4>
            <ul className="flex flex-col gap-3">
              {storeConfig.navigation.footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {storeConfig.storeInfo.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <p>Email: {storeConfig.storeInfo.contactEmail}</p>
            <p>Phone: {storeConfig.storeInfo.contactPhone}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
