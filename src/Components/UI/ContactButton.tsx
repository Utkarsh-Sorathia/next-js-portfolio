import Link from "next/link";

const ContactButton = ({ text, icon, url, className }: any) => {
  return (
    <Link
      className={className}
      href={url}
      target="_blank"
    >
      {/* <span className="text-xl/6 text-[var(--textColor)]">
        {typeof icon === "string" ? (
          <Image
            src={icon}
            alt={`social-${text}`}
            width={100}
            height={100}
            className="w-[1.5rem] h-auto aspect-square"
          />
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
      </span> */}
        <i className={icon} />
      <p className="text-lg/6 font-semibold text-[var(--textColor)]">{text}</p>
    </Link>
  );
};

export default ContactButton;
