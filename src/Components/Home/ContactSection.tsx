
import ResponsiveBox from "../../Components/core/ResponsiveBox";
import ConstrainedBox from "../../Components/core/constrained-box";
import SectionTitle from "../../Components/common/SectionTitle";
import ContactForm from "../UI/ContactForm";
import { BsArrowRight } from "react-icons/bs";
import { SiLinkedin, SiGithub, SiUpwork } from "react-icons/si";
import Link from "next/link";
import Strings from "@/constants/strings";

const ContactSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-transparent items-center justify-center lg:px-40 lg:min-h-screen"
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
                href={Strings.linkedInLink}
                target="_blank"
                className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-6 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-[#0077b5]/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:flex-1 items-center gap-1.5 lg:gap-6 overflow-hidden">
                  <div className="p-2.5 md:p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl text-[#0077b5] shrink-0">
                    <SiLinkedin className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden text-center lg:text-left">
                    <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[#0077b5] mb-0.5 lg:mb-1 opacity-80">LinkedIn</p>
                    <p className="text-white font-semibold truncate hidden lg:block">{Strings.linkedInUsername}</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-end gap-3 text-xs font-bold uppercase tracking-tight text-[#0077b5] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap min-w-[100px]">
                  <span>Connect</span>
                  <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href={Strings.githubLink}
                target="_blank"
                className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-6 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-white/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:flex-1 items-center gap-1.5 lg:gap-6 overflow-hidden">
                  <div className="p-2.5 md:p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-900 dark:text-white shrink-0">
                    <SiGithub className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden text-center lg:text-left">
                    <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[#fff] mb-0.5 lg:mb-1 opacity-80">GitHub</p>
                    <p className="text-white font-semibold truncate hidden lg:block">{Strings.githubUsername}</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-end gap-3 text-xs font-bold uppercase tracking-tight text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap min-w-[100px]">
                  <span>View Code</span>
                  <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link
                href={Strings.upworkLink}
                target="_blank"
                className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 md:p-6 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-[#14a800]/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:flex-1 items-center gap-1.5 lg:gap-6 overflow-hidden">
                  <div className="p-2.5 md:p-4 bg-[#14a800]/10 dark:bg-[#14a800]/20 rounded-xl text-[#14a800] shrink-0">
                    <SiUpwork className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="overflow-hidden text-center lg:text-left">
                    <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[#14a800] mb-0.5 lg:mb-1 opacity-80">Upwork</p>
                    <p className="text-white font-semibold truncate hidden lg:block">{Strings.upworkUsername}</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-end gap-3 text-xs font-bold uppercase tracking-tight text-[#14a800] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap min-w-[100px]">
                  <span>Hire Me</span>
                  <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
