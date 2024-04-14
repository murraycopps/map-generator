import { useEffect, useRef } from "react";

export default function Land({
  island,
  vector,
}: Readonly<Land>) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // get the svg width and height and use that to set the path
    const svg = ref.current;
    if (svg) {
      const { width, height } = svg.getBoundingClientRect();
      if (vector.length < 2) return;
      const path = [...vector
        .map(
          ([x,y], i) =>
            `${i === 0 ? "M" : "L"} ${(x * width) / 100} ${(y * height) / 100}`
        ), vector[0][0] * width / 100 , vector[0][1] * height / 100]
        .join(" ");
      svg.querySelector("path")!.setAttribute("d", path);
    }
  }, [vector]);

  return (
    <svg className="w-full h-full absolute top-0 left-0" ref={ref}>
      <path fill={island ? "green" : "blue"} strokeWidth={1} stroke="black" />
    </svg>
  );
}
