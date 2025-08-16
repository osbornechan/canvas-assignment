import { KonvaEventObject } from "konva/lib/Node";
import {
  AllShapesType,
  ArrowType,
  CircleType,
  ImageType,
  LineType,
  RectangleType,
  TriangleType,
} from "./konvaType";
import KonvaRect from "./KonvaRect";
import KonvaCircle from "./KonvaCircle";
import KonvaTriangle from "./KonvaTriangle";
import KonvaArrow from "./KonvaArrow";
import KonvaLine from "./KonvaLine";
import KonvaImage from "./KonvaImage";
import { TOOLS } from "@/app/constants";

export default function ShapeSelector({
  shape,
  onShapeClick,
  onShapeDragEnd,
  isDraggable = false,
}: {
  shape: AllShapesType;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
}) {
  switch (shape.type) {
    case TOOLS.RECTANGLE:
      return (
        <KonvaRect
          rectangle={shape as RectangleType}
          onShapeClick={onShapeClick}
          onShapeDragEnd={onShapeDragEnd}
          isDraggable={isDraggable}
        />
      );
    case TOOLS.CIRCLE:
      return (
        <KonvaCircle
          circle={shape as CircleType}
          onShapeClick={onShapeClick}
          onShapeDragEnd={onShapeDragEnd}
          isDraggable={isDraggable}
        />
      );
    case TOOLS.TRIANGLE:
      return (
        <KonvaTriangle
          triangle={shape as TriangleType}
          onShapeClick={onShapeClick}
          onShapeDragEnd={onShapeDragEnd}
          isDraggable={isDraggable}
        />
      );
    case TOOLS.ARROW:
      return (
        <KonvaArrow
          arrow={shape as ArrowType}
          onShapeClick={onShapeClick}
          onShapeDragEnd={onShapeDragEnd}
          isDraggable={isDraggable}
        />
      );
    case TOOLS.THIN_LINE:
    case TOOLS.MEDIUM_LINE:
    case TOOLS.THICK_LINE:
      return <KonvaLine line={shape as LineType} />;
    case TOOLS.IMPORT:
      return (
        <KonvaImage
          image={shape as ImageType}
          onShapeClick={onShapeClick}
          onShapeDragEnd={onShapeDragEnd}
          isDraggable={isDraggable}
        />
      );
    default:
      return null;
  }
}
