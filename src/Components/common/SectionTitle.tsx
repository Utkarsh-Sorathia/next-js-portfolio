import { ReactNode } from 'react';

const SectionTitle = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex flex-col items-center mb-8 md:mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--textColor)] tracking-tight">
        {children}
      </h2>
      <div className="mt-4 w-16 h-1.5 bg-[var(--primaryColor)] rounded-full shadow-[0_2px_10px_var(--primaryColor)]/30" />
    </div>
  );
};

export default SectionTitle;
