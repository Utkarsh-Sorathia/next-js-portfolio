import type { CoreComponentsProps } from "@/interfaces";

const Column = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative flex flex-col transition duration-300 ease-in-out ${classNames}`}
      id={id}
      ref={elementRef}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Column;
