import Link from "next/link";

const ContactButton = ({ text, icon, url, className }: any) => {
  return (
    <Link
      className={className}
      href={url}
      target="_blank"
    >
      <span className="flex justify-content-center gap-2" style={{ justifyContent: "center" }}><i className={icon} />
        <p className="text-lg/6 font-semibold text-[var(--textColor)]">{text}</p></span>
    </Link>
  );
};

export default ContactButton;
