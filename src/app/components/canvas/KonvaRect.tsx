import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RectangleType } from "./konvaType";

export default function KonvaRect({
  rectangle,
  onShapeClick,
  onShapeDragEnd,
  isDraggable = false,
}: {
  rectangle: RectangleType;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
}) {
  const { id, x, y, width, height, color, fill } = rectangle;
  return (
    <Rect
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      stroke={color}
      strokeWidth={3}
      fill={fill}
      onClick={onShapeClick}
      onDragEnd={onShapeDragEnd}
      draggable={isDraggable}
    />
  );
}
