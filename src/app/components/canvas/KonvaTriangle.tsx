import { Shape } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { TriangleType } from "./konvaType";

export default function KonvaTriangle({
  triangle,
  onShapeClick,
  onShapeDragEnd,
  isDraggable = false,
}: {
  triangle: TriangleType;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
}) {
  const { id, x, y, width, height, color, fill } = triangle;
  return (
    <Shape
      id={id}
      x={x}
      y={y}
      sceneFunc={(ctx, shape) => {
        ctx.beginPath();
        ctx.moveTo(-width / 2, height / 2);
        ctx.lineTo(width / 2, height / 2);
        ctx.lineTo(0, -height / 2);
        ctx.closePath();
        ctx.fillStrokeShape(shape);
      }}
      fill={fill}
      stroke={color}
      strokeWidth={3}
      onClick={onShapeClick}
      onDragEnd={onShapeDragEnd}
      draggable={isDraggable}
    />
  );
}
