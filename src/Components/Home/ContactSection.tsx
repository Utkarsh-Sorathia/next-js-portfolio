'use client';

import ResponsiveBox from "../../Components/core/ResponsiveBox";
import ConstrainedBox from "../../Components/core/constrained-box";
import SectionTitle from "../../Components/common/SectionTitle";
import ContactForm from "../UI/ContactForm";
import { ArrowRight } from "lucide-react";
import { SiWhatsapp, SiGmail, SiLinkedin } from "react-icons/si";
import Link from "next/link";

const ContactSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] items-center justify-center dark:bg-dot-white/[0.15] bg-dot-white/[0.15] lg:px-40 lg:min-h-screen"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 sm:py-16 lg:py-16">
        <SectionTitle>Get in Touch</SectionTitle>
        <p className="text-center text-zinc-400 mb-8 lg:mb-16 max-w-2xl mx-auto italic font-medium">
          Let&apos;s work together on your next project. Whether you have a specific project in mind or just want to say hi, feel free to reach out!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-start">
          {/* Left Column: Let's Talk */}
          <div className="flex flex-col gap-4 lg:gap-8 w-full">
            <div className="hidden lg:block pt-8 bg-transparent">
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Let&apos;s Talk</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              </p>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4 lg:space-y-4">
              {/* Contact Cards */}
              <Link 
                href="https://www.linkedin.com/in/utkarsh-sorathia-a9292b22a"
                target="_blank"
                className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-6 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-[#0077b5]/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-6 overflow-hidden w-full">
                  <div className="p-2.5 md:p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl text-[#0077b5] shrink-0">
                    <SiLinkedin className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden text-center lg:text-left">
                    <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[#0077b5] mb-0.5 lg:mb-1 opacity-80">LinkedIn</p>
                    <p className="text-white font-semibold truncate hidden lg:block">utkarsh-sorathia</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-[#0077b5] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  Connect <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link 
                href="mailto:utkarshsor03@gmail.com"
                className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-6 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-[#EA4335]/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-6 overflow-hidden w-full">
                  <div className="p-2.5 md:p-4 bg-red-100 dark:bg-red-900/20 rounded-xl text-[#EA4335] shrink-0">
                    <SiGmail className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden text-center lg:text-left">
                    <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[#EA4335] mb-0.5 lg:mb-1 opacity-80">Email</p>
                    <p className="text-white font-semibold truncate hidden lg:block">utkarshsor03@gmail.com</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-[#EA4335] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  Email Me <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link 
                href="https://wa.me/918758453292" 
                target="_blank"
                className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-6 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-[#25D366]/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-6 overflow-hidden w-full">
                  <div className="p-2.5 md:p-4 bg-green-100 dark:bg-green-900/20 rounded-xl text-[#25D366] shrink-0">
                    <SiWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden text-center lg:text-left">
                    <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[#25D366] mb-0.5 lg:mb-1 opacity-80">WhatsApp</p>
                    <p className="text-white font-semibold truncate hidden lg:block">Utkarsh Sorathia</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-[#25D366] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  Chat Now <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default ContactSection;
