import { TOOLS, TOOL_ACTIONS } from "../../constants";

type ShapeType = {
  id: string;
  type: keyof typeof TOOLS;
  color: string;
  x?: number;
  y?: number;
  fill?: string;
};

type RectangleType = ShapeType & {
  width: number;
  height: number;
  x: number;
  y: number;
};

type CircleType = ShapeType & {
  radius: number;
  x: number;
  y: number;
};

type TriangleType = ShapeType & {
  width: number;
  height: number;
  x: number;
  y: number;
};

type ArrowType = ShapeType & {
  points: [number, number, number, number];
};

type LineType = ShapeType & {
  points: number[];
  strokeWidth: number;
};

type ImageType = {
  id: string;
  type: keyof typeof TOOLS;
  img: HTMLImageElement;
  color?: string;
  fill?: string;
  x?: number;
  y?: number;
};

type FillType = {
  id: string;
  type: keyof typeof TOOLS;
  width: number;
  height: number;
  color: string;
  fill?: string;
  x?: number;
  y?: number;
};

type ToolActionType = {
  action: keyof typeof TOOL_ACTIONS;
};

type AllShapesType = (RectangleType | CircleType | TriangleType | ArrowType | LineType | ImageType) & {  width?: number, height?: number }; 

type LayerType = ToolActionType & (AllShapesType | FillType) & { layerId: string };

export type {
  LineType,
  ShapeType,
  RectangleType,
  TriangleType,
  CircleType,
  ArrowType,
  ImageType,
  FillType,
  AllShapesType,
  LayerType,
};