import { Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ImageType } from "./konvaType";

export default function KonvaImage({
  image,
  onShapeClick,
  onShapeDragEnd,
  isDraggable = false,
}: {
  image: ImageType;
  onShapeClick: (e: KonvaEventObject<MouseEvent>) => void;
  onShapeDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  isDraggable: boolean;
}) {
  return (
    <Image
      id={image["id"]}
      image={image["img"]}
      alt={image["img"]}
      x={image["x"]}
      y={image["y"]}
      height={250}
      width={250}
      onClick={onShapeClick}
      onDragEnd={onShapeDragEnd}
      draggable={isDraggable}
    />
  );
}
