import type { CoreComponentsProps } from "@/interfaces";

const ResponsiveBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, id, elementRef, onClick } = props;

  return (
    <div
      className={`relative flex flex-col w-full h-auto p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out scroll-mt-8 md:py-6 ${classNames}`}
      id={id}
      ref={elementRef}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ResponsiveBox;
