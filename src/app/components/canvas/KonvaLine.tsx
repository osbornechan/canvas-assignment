import { Line } from "react-konva";
import { LineType } from "./konvaType";

export default function KonvaLine({ line }: { line: LineType }) {
  const { id, points, color, strokeWidth } = line;
  return (
    <Line
      id={id}
      points={points}
      lineCap="round"
      lineJoin="round"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
}
