import React from 'react';
import { Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050B14] border-t border-white/10 pt-20 pb-10 px-6 font-sans text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            
            {/* Left Column: Brand & Links */}
            <div className="flex flex-col gap-6">
                <h3 className="text-white font-serif font-bold text-2xl tracking-tight">FatePlanner</h3>
                
                <nav className="flex flex-col gap-4 text-sm">
                    <a href="#" className="hover:text-zen-accent transition-colors w-fit">About Us</a>
                    <a href="#" className="hover:text-zen-accent transition-colors w-fit">Privacy Policy</a>
                    <a href="#" className="hover:text-zen-accent transition-colors w-fit">Terms of Service</a>
                </nav>
            </div>

            {/* Right Column: Contact */}
            <div className="flex flex-col gap-6 items-start md:items-end">
                 <h4 className="text-white font-bold text-sm tracking-widest uppercase">Contact Us</h4>
                 <a 
                    href="mailto:support@fateplanner.com" 
                    className="flex items-center gap-3 text-sm hover:text-zen-accent transition-colors group"
                 >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-mono">support@fateplanner.com</span>
                 </a>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40">
            <p>&copy; {new Date().getFullYear()} FatePlanner. All rights reserved.</p>
            <div className="flex items-center gap-6 font-mono">
                 <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> Global Node</span>
                 <span>v3.2.0 (Stable)</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;