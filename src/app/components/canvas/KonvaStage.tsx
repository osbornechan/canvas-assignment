import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
} from "react";
import { observer } from "mobx-react-lite";
import { canvasStore } from "@/app/store";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowType,
  CircleType,
  RectangleType,
  LineType,
  TriangleType,
  AllShapesType,
  LayerType,
} from "./konvaType";
import { Box } from "@mui/material";
import ShapeSelector from "./ShapeSelector";
import { TOOL_ACTIONS, TOOLS } from "../../constants";

const downloadURI = (uri: string | undefined, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri || "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default observer(function KonvaStage() {
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isPaintRef = useRef(false);
  const currentShapeRef = useRef<string>("");
  const transformerRef = useRef<Konva.Transformer>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const isDraggable = canvasStore.activeTool === TOOLS.SELECT;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const backgroundId = useMemo(() => uuidv4(), []);

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const { offsetWidth, offsetHeight } = canvasRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    switch (canvasStore.activeTool) {
      case TOOLS.IMPORT: {
        fileRef.current?.click();
        break;
      }
      case TOOLS.EXPORT: {
        const dataUri = stageRef?.current?.toDataURL({ pixelRatio: 3 });
        downloadURI(dataUri, "image.png");
        canvasStore.setActiveTool(null);
        break;
      }
    }
  });

  const onStageMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (isPaintRef.current) return;

      isPaintRef.current = true;
      const stage = stageRef?.current;
      const pos = stage?.getPointerPosition();
      const x = pos?.x || 0;
      const y = pos?.y || 0;
      const id = uuidv4();
      currentShapeRef.current = id;

      switch (canvasStore.activeTool) {
        case TOOLS.RECTANGLE: {
          const newRectangle = {
            id,
            type: canvasStore.activeTool,
            x,
            y,
            width: 1,
            height: 1,
            color: canvasStore.color.shape,
          };
          canvasStore.addShape(newRectangle);
          canvasStore.addLayer({
            ...newRectangle,
            layerId: uuidv4(),
            action: TOOL_ACTIONS.DRAW as keyof typeof TOOL_ACTIONS,
          });
          break;
        }
        case TOOLS.CIRCLE: {
          const newCircle = {
            id,
            type: canvasStore.activeTool,
            x,
            y,
            radius: 0,
            color: canvasStore.color.shape,
          };
          canvasStore.addShape(newCircle);
          canvasStore.addLayer({
            ...newCircle,
            layerId: uuidv4(),
            action: TOOL_ACTIONS.DRAW as keyof typeof TOOL_ACTIONS,
          });
          break;
        }
        case TOOLS.TRIANGLE: {
          const newTriangle = {
            id,
            type: canvasStore.activeTool,
            x,
            y,
            width: 1,
            height: 1,
            color: canvasStore.color.shape,
          };
          canvasStore.addShape(newTriangle);
          canvasStore.addLayer({
            ...newTriangle,
            layerId: uuidv4(),
            action: TOOL_ACTIONS.DRAW as keyof typeof TOOL_ACTIONS,
          });
          break;
        }
        case TOOLS.ARROW: {
          const newArrow = {
            id,
            type: canvasStore.activeTool,
            points: [x, y, x, y],
            color: canvasStore.color.shape,
          } as ArrowType;
          canvasStore.addShape(newArrow);
          canvasStore.addLayer({
            ...newArrow,
            layerId: uuidv4(),
            action: TOOL_ACTIONS.DRAW as keyof typeof TOOL_ACTIONS,
          });
          break;
        }
        case TOOLS.THIN_LINE:
        case TOOLS.MEDIUM_LINE:
        case TOOLS.THICK_LINE: {
          let strokeWidth = 3;
          switch (canvasStore.activeTool) {
            case TOOLS.THIN_LINE:
              strokeWidth = 1;
              break;
            case TOOLS.THICK_LINE:
              strokeWidth = 5;
              break;
            case TOOLS.MEDIUM_LINE:
            default:
              strokeWidth = 3;
              break;
          }
          const newLine = {
            id,
            type: canvasStore.activeTool,
            points: [x, y],
            color: canvasStore.color.line,
            strokeWidth,
          };
          canvasStore.addShape(newLine);
          canvasStore.addLayer({
            ...newLine,
            layerId: uuidv4(),
            action: TOOL_ACTIONS.DRAW as keyof typeof TOOL_ACTIONS,
          });
          break;
        }
        case TOOLS.FILL: {
          const matchedShape = canvasStore.shapes.find(
            (shape) => shape.id === e.target.attrs.id
          ) as AllShapesType;

          if (matchedShape && matchedShape.fill !== canvasStore.color.fill) {
            canvasStore.addLayer({
              ...matchedShape,
              layerId: uuidv4(),
              fill: canvasStore.color.fill,
              action: TOOL_ACTIONS.FILL as keyof typeof TOOL_ACTIONS,
            });
          }
          canvasStore.updateShape(e.target.attrs.id, {
            fill: canvasStore.color.fill,
          });
        }
      }
    },
    [stageRef]
  );

  const onStageMouseUp = useCallback(() => {
    isPaintRef.current = false;
    currentShapeRef.current = "";
  }, []);

  const onStageMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!isPaintRef.current) return;

      const stage = stageRef?.current;
      const id = currentShapeRef.current;
      const pos = stage?.getPointerPosition();
      const x = pos?.x || 0;
      const y = pos?.y || 0;

      switch (canvasStore.activeTool) {
        case TOOLS.RECTANGLE: {
          const matchedRect = canvasStore.shapes.find(
            (shape) => shape.id === id
          ) as RectangleType;

          canvasStore.updateShape(id, {
            width: x - matchedRect.x,
            height: y - matchedRect.y,
          });
          break;
        }
        case TOOLS.CIRCLE: {
          const matchedCircle = canvasStore.shapes.find(
            (shape) => shape.id === id
          ) as CircleType;

          canvasStore.updateShape(id, {
            radius: Math.sqrt(
              (x - matchedCircle.x) ** 2 + (y - matchedCircle.y) ** 2
            ),
          });
          break;
        }
        case TOOLS.TRIANGLE: {
          const matchedTriangle = canvasStore.shapes.find(
            (shape) => shape.id === id
          ) as TriangleType;

          canvasStore.updateShape(id, {
            width: x - matchedTriangle.x,
            height: y - matchedTriangle.y,
          });
          break;
        }
        case TOOLS.ARROW: {
          const matchedArrow = canvasStore.shapes.find(
            (shape) => shape.id === id
          ) as ArrowType;

          const updatedPoints = {
            points: [matchedArrow.points[0], matchedArrow.points[1], x, y],
          };
          canvasStore.updateShape(id, updatedPoints);
          const layer = canvasStore.layers.find((layer) => layer.id === id);
          canvasStore.updateLayer(layer?.layerId ?? "", updatedPoints);
          break;
        }
        case TOOLS.THIN_LINE:
        case TOOLS.MEDIUM_LINE:
        case TOOLS.THICK_LINE: {
          const matchedLine = canvasStore.shapes.find(
            (shape) => shape.id === id
          ) as LineType;

          canvasStore.updateShape(id, {
            points: [...matchedLine.points, x, y],
          });
          break;
        }
      }
    },
    [stageRef]
  );

  const onShapeClick = useCallback((e: KonvaEventObject<MouseEvent>) => {
    if (canvasStore.activeTool !== TOOLS.SELECT) return;
    transformerRef?.current?.nodes([e.target]);
  }, []);

  const onShapeDragEnd = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const matchedShape = canvasStore.shapes.find(
      (shape) => shape.id === e.target.attrs.id
    ) as AllShapesType;

    const updatedPos =
      matchedShape.type === TOOLS.ARROW
        ? ({
            points: (matchedShape as ArrowType).points.map(
              (point, index) =>
                point + (index % 2 === 0 ? e.target.attrs.x : e.target.attrs.y)
            ),
          } as ArrowType)
        : { x: e.target.attrs.x, y: e.target.attrs.y };

    canvasStore.updateShape(matchedShape.id, updatedPos);
    canvasStore.addLayer({
      ...matchedShape,
      ...updatedPos,
      layerId: uuidv4(),
      action: TOOL_ACTIONS.MOVE as keyof typeof TOOL_ACTIONS,
    });

    if (matchedShape.type === TOOLS.ARROW) {
      e.target.position({ x: 0, y: 0 });
    }
  }, []);

  const onImportImageSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const image = {
          id: uuidv4(),
          type: canvasStore.activeTool as keyof typeof TOOLS,
          img: Object.assign(new Image(250, 250), {
            src: URL.createObjectURL(e.target.files?.[0]),
          }),
          x: 0,
          y: 0,
        };
        canvasStore.addShape(image);
        canvasStore.addLayer({
          ...image,
          layerId: uuidv4(),
          action: TOOL_ACTIONS.DRAW as keyof typeof TOOL_ACTIONS,
        });
        canvasStore.setActiveTool(TOOLS.SELECT as keyof typeof TOOLS);
      }
      e.target.value = "";
    },
    []
  );

  const onBgClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      transformerRef?.current?.nodes([]);
      if (canvasStore.activeTool === TOOLS.FILL) {
        const matchedBackground = canvasStore.layers.findLast(
          (layer) => layer.id === backgroundId
        );

        if (
          !matchedBackground ||
          matchedBackground.fill !== canvasStore.color.fill
        ) {
          canvasStore.addLayer({
            id: e.target.attrs.id,
            layerId: uuidv4(),
            type: TOOLS.STAGE,
            color: canvasStore.color.shape,
            fill: canvasStore.color.fill,
            action: TOOL_ACTIONS.FILL as keyof typeof TOOL_ACTIONS,
          } as LayerType);
        }
      }
    },
    [backgroundId]
  );

  return (
    <Box
      ref={canvasRef}
      border="1px solid #000000"
      minHeight="89vh"
      overflow="hidden"
    >
      <input
        type="file"
        ref={fileRef}
        onChange={onImportImageSelect}
        style={{ display: "none" }}
        accept="image/*"
      />

      <Stage
        height={dimensions.height}
        width={dimensions.width}
        ref={stageRef}
        onMouseUp={onStageMouseUp}
        onMouseDown={(e) => onStageMouseDown(e)}
        onMouseMove={(e) => onStageMouseMove(e)}
      >
        <Layer>
          <Rect
            id={backgroundId}
            x={0}
            y={0}
            width={dimensions.width}
            height={dimensions.height}
            fill={
              canvasStore.layers.findLast(({ id }) => id === backgroundId)
                ?.fill ?? "#FFFFFF"
            }
            onClick={(e) => onBgClick(e)}
          />
          <Transformer ref={transformerRef} />
        </Layer>

        <Layer>
          {canvasStore.shapes.map((shape) => (
            <ShapeSelector
              key={shape.id}
              shape={shape}
              onShapeClick={onShapeClick}
              onShapeDragEnd={onShapeDragEnd}
              isDraggable={isDraggable}
            />
          ))}
        </Layer>
      </Stage>
    </Box>
  );
});
