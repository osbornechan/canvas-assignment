import { Arrow } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ArrowType } from "./konvaType";

export default function KonvaArrow({
  arrow,
  onShapeClick,
  onShapeDragEnd,
  isDraggable = false,
}: {
  arrow: ArrowType;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
}) {
  const { id, points, color, fill } = arrow;
  return (
    <Arrow
      id={id}
      points={Array.from(points)}
      fill={fill}
      stroke={color}
      strokeWidth={3}
      onClick={onShapeClick}
      onDragEnd={onShapeDragEnd}
      draggable={isDraggable}
    />
  );
}
