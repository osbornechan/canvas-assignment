import { Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { CircleType } from "./konvaType";

export default function KonvaCircle({
  circle,
  onShapeClick,
  onShapeDragEnd,
  isDraggable = false,
}: {
  circle: CircleType;
  onShapeDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
}) {
  const { id, x, y, radius, color, fill } = circle;
  return (
    <Circle
      id={id}
      x={x}
      y={y}
      radius={radius}
      stroke={color}
      strokeWidth={3}
      fill={fill}
      onClick={onShapeClick}
      onDragEnd={onShapeDragEnd}
      draggable={isDraggable}
    />
  );
}
