type Props = {
  children: any;
  x: number;
  y: number;
  contentRef: any;
};

export default function TooltipContainer({
  children,
  x,
  y,
  contentRef,
}: Props) {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div ref={contentRef} className="bg-yellow-500 px-3 py-2 rounded mx-auto">
        {children}
      </div>
    </div>
  );
}
