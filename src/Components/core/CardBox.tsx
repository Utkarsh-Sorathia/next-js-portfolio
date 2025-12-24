"use client";

import type { CoreComponentsProps } from "@/interfaces";

const CardBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, onClick, id, elementRef } = props;

  return (
    <div
      id={id}
      onClick={onClick}
      ref={elementRef}
      className={`relative w-full flex flex-col overflow-hidden group ${classNames}`}
    >
      {children}
    </div>
  );
};

export default CardBox;
