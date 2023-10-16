import { useState, useRef } from "react";
import Tooltip from "./Tooltip";

type Props = {
  tooltipContent: any;
  rest: any;
};
export default function PhoneHover({ tooltipContent, ...rest }: Props) {
  const [targetRect, setTargetRect]: any = useState(null);
  const textRef: any = useRef(null);
  return (
    <>
      <p
        {...rest}
        ref={textRef}
        onPointerEnter={() => {
          const rect = textRef.current?.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
      )}
    </>
  );
}
