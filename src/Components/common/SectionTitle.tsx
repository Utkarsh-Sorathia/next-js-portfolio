import { ReactNode } from 'react';

const SectionTitle = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <h2 className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-bold mb-8 md:mb-10">
      {children}
    </h2>
  );
};

export default SectionTitle;
