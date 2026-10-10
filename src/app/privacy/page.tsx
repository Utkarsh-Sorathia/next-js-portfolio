import { Metadata } from "next";
import Link from "next/link";
import PageBox from "@/Components/core/PageBox";
import ResponsiveBox from "@/Components/core/ResponsiveBox";
import ConstrainedBox from "@/Components/core/constrained-box";
import SectionTitle from "@/Components/common/SectionTitle";
import { baseURL } from "@/utils/api";

export const metadata: Metadata = {
  title: "Privacy Policy | Utkarsh Sorathia",
  description: "What data utkarshsorathia.in collects, why, and how to get it removed.",
  alternates: { canonical: `${baseURL}/privacy` },
};

const LAST_UPDATED = "30 September 2026";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Visiting the site",
    body: (
      <>
        When you load a page, your IP address and the approximate location derived from it
        (city, region, country) are logged, along with the time of the visit. Anonymous usage
        and performance statistics are also collected through Vercel Analytics, Vercel Speed
        Insights, NavigationPulse and, where enabled, Google Analytics.
      </>
    ),
  },
  {
    heading: "AI chat assistant",
    body: (
      <>
        Messages you send to the chat assistant are processed by Groq to generate a reply. The
        message, the reply, your IP address and your browser&apos;s user agent are stored so I can
        review conversations and improve the assistant. Please don&apos;t share sensitive personal
        information in the chat.
      </>
    ),
  },
  {
    heading: "Contact form",
    body: (
      <>
        When you send a message through the contact form, your name, email, subject and message
        are stored and forwarded to my inbox by email (sent through Resend), so I can reply to you.
      </>
    ),
  },
  {
    heading: "Newsletter",
    body: (
      <>
        If you subscribe, your email address is stored and used only to send you new blog posts,
        through Resend. Every email has an unsubscribe link, which deletes your address
        immediately.
      </>
    ),
  },
  {
    heading: "Spam protection",
    body: (
      <>
        The contact form, newsletter sign-up and chat are protected by Google reCAPTCHA, which is
        subject to Google&apos;s{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline text-(--primaryColor)">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline text-(--primaryColor)">
          Terms of Service
        </a>
        .
      </>
    ),
  },
  {
    heading: "What I don't do",
    body: <>I don&apos;t sell your data or use it for advertising.</>,
  },
  {
    heading: "Your data",
    body: (
      <>
        To ask what data I hold about you, or to have it deleted, email{" "}
        <a href="mailto:utkarshsor03@gmail.com" className="underline text-(--primaryColor)">
          utkarshsor03@gmail.com
        </a>
        .
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageBox>
      <ResponsiveBox classNames="min-h-screen bg-[var(--bgColor)] lg:px-12 xl:px-40">
        <ConstrainedBox classNames="px-4 pt-24 pb-16">
          <h1 className="sr-only">Privacy Policy</h1>
          <SectionTitle>
            Privacy <span className="text-(--primaryColor)">Policy</span>
          </SectionTitle>
          <p className="text-center text-sm text-(--textColorLight) mt-4">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="max-w-3xl mx-auto mt-10 space-y-8">
            <p className="text-(--textColorLight) leading-relaxed">
              This page explains what data{" "}
              <Link href="/" className="underline text-(--primaryColor)">utkarshsorathia.in</Link>{" "}
              collects and why.
            </p>
            {sections.map(({ heading, body }) => (
              <section key={heading}>
                <h2 className="text-xl font-semibold text-(--textColor) mb-2">{heading}</h2>
                <p className="text-(--textColorLight) leading-relaxed">{body}</p>
              </section>
            ))}
          </div>
        </ConstrainedBox>
      </ResponsiveBox>
    </PageBox>
  );
}
