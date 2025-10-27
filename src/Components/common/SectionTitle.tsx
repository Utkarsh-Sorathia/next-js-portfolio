import { ReactNode } from 'react';

const SectionTitle = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-bold">
      {children}
    </p>
  );
};

export default SectionTitle;
