
import { cn } from "@/utils/cn";
import { IServiceItem } from "@/interfaces";
import Image from "next/image";
import { validateAltText, getSkillAltText } from "@/utils/imageValidation";
import CardBox from "../core/CardBox";

export function ServiceCard({
  item,
}: Readonly<{ item: IServiceItem }>) {
  return (
    <Card className="z-20">
      <div className="flex flex-row items-center justify-center gap-4 mb-8">
        {item.icons.map((icon, index) => (
          <div key={index} className="relative group/icon flex-shrink-0">
            <div className="absolute -inset-2 bg-[var(--primaryColor)]/10 rounded-xl blur-md opacity-0 transition-opacity" />
            <div className="relative w-12 h-12 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Image
                src={icon}
                alt={`${item.title} icon ${index}`}
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      <CardTitle className="text-center">{item.title}</CardTitle>
      <CardDescription className="text-center">{item.description}</CardDescription>
    </Card>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <CardBox classNames={cn("h-full", className)}>
      <div className="p-4 md:p-6 h-full flex flex-col">{children}</div>
    </CardBox>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg lg:text-xl xl:text-2xl font-semibold text-[var(--primaryColor)] py-2 tracking-wide",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm/6 lg:text-base/6 text-[var(--textColorLight)] font-normal tracking-wide",
        className
      )}
    >
      {children}
    </p>
  );
};
