"use client";

import { cn } from "@/utils/cn";
import { IServiceItem } from "@/interfaces";
import Image from "next/image";
import { validateAltText, getSkillAltText } from "@/utils/imageValidation";

export function ServiceCard({
  item,
}: Readonly<{ item: IServiceItem }>) {
  return (
    <Card className="z-20">
      <CardSkeletonContainer>
        <IconSkeleton item={item} />
      </CardSkeletonContainer>
      <CardTitle className="text-center">{item.title}</CardTitle>
      <CardDescription className="text-justify">{item.description}</CardDescription>
    </Card>
  );
}

const IconSkeleton = ({ item }: Readonly<{ item: IServiceItem }>) => {
  return (
    <div className="overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <IconContainer className="h-8 w-8 circle-1">
          <Image
            src={item.icons[0]}
            alt={validateAltText(item.icons[0], getSkillAltText(`${item.title} service icon 1`), 'Service icon')}
            width={144}
            height={144}
            sizes="100%"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp"
            className="h-4 w-4 aspect-square"
          />
        </IconContainer>
        <IconContainer className="h-12 w-12 circle-2">
          <Image
            src={item.icons[1]}
            alt={validateAltText(item.icons[1], getSkillAltText(`${item.title} service icon 2`), 'Service icon')}
            width={144}
            height={144}
            sizes="100%"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp"
            className="h-6 w-6 aspect-square"
          />
        </IconContainer>
        <IconContainer className="circle-3">
          <Image
            src={item.icons[2]}
            alt={validateAltText(item.icons[2], getSkillAltText(`${item.title} service icon 3`), 'Service icon')}
            width={144}
            height={144}
            sizes="100%"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp"
            className="h-8 w-8 aspect-square"
          />
        </IconContainer>
        <IconContainer className="h-12 w-12 circle-4">
          <Image
            src={item.icons[3]}
            alt={validateAltText(item.icons[3], getSkillAltText(`${item.title} service icon 4`), 'Service icon')}
            width={144}
            height={144}
            sizes="100%"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp"
            className="h-6 w-6 aspect-square"
          />
        </IconContainer>
        <IconContainer className="h-8 w-8 circle-5">
          <Image
            src={item.icons[4]}
            alt={validateAltText(item.icons[4], getSkillAltText(`${item.title} service icon 5`), 'Service icon')}
            width={144}
            height={144}
            sizes="100%"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp"
            className="h-4 w-4 aspect-square"
          />
        </IconContainer>
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full mx-auto overflow-hidden rounded-[var(--borderRadius)] border border-zinc-500 dark:bg-[var(--primaryColor5)] bg-[var(--primaryColor5)] shadow-[2px_4px_16px_0px_rgba(100,100,100,0.06)_inset] group hover:bg-white/10 transition duration-300",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
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
        "text-lg lg:text-xl xl:text-2xl font-semibold text-[var(--primaryColor)] dark:text-[var(--primaryColor)] py-2 tracking-wide",
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
        "text-sm/6 lg:text-base/6 font-normal tracking-wide",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-[var(--borderRadius)] z-40 mb-2",
        className,
        showGradient &&
          "bg-bg-[rgba(40,40,40,0.70)] dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const IconContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};
