import { makeAutoObservable } from "mobx";
import { ToolType, TOOL_ACTIONS, TOOLS } from "./constants";
import { AllShapesType, ArrowType, LayerType, TriangleType } from "./components/canvas/konvaType";

export type ActiveToolType = ToolType | null;

class CanvasStore {
  color = {
    shape: '#000000',
    line: '#000000',
    fill: '#000000',
  };
  activeTool: ActiveToolType = null;
  shapes: AllShapesType[] = [];
  layers: LayerType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setColor(tool: keyof typeof this.color, newColor: string) {
    this.color[tool] = newColor;
  }
  
  setActiveTool(selectedTool: ActiveToolType) {
    this.activeTool = selectedTool;
  }

  addLayer(layer: LayerType) {
    this.layers.push(layer);
  }

  updateLayer(layerId: string, newProps: Partial<AllShapesType>) {
    this.layers = this.layers.map((layer) =>
      layer.layerId === layerId
        ? { ...layer, ...newProps } as LayerType
        : layer
    );
  }

  deleteLayer(layerId: string, id: string, action: keyof typeof TOOL_ACTIONS) {
    this.layers = this.layers.filter((layer) => layer.layerId !== layerId);

    switch (action) {
      case TOOL_ACTIONS.DRAW: {
        this.deleteShape(id);
        this.layers = this.layers.filter((layer) => layer.id !== id);
        break;
      }
      case TOOL_ACTIONS.FILL: {
        const lastShapeFill = this.layers.findLast((shape) => shape.id === id)?.fill;
        this.shapes = this.shapes.map((shape) => {
          if (shape.id === id) {
            shape.fill = lastShapeFill ?? '#FFFFFF';
          }
          return shape;
        });
        break;
      }
      case TOOL_ACTIONS.MOVE: {
        const lastShape = this.layers.findLast((shape) => shape.id === id);
        if (lastShape?.type === TOOLS.ARROW) {
          this.shapes = this.shapes.map((shape) => {
            return (shape.id === id
              ? ({
                  ...(shape as ArrowType),
                  points: [...(lastShape as ArrowType).points],
                }) : shape
              )
          });
        } else {
          const lastShapePos = { x: lastShape?.x, y: lastShape?.y };
          this.shapes = this.shapes.map((shape) =>
            shape.id === id
              ? { 
                  ...shape,
                  x: lastShapePos.x ?? 0, 
                  y: lastShapePos.y ?? 0,
                }
              : shape
          );
        }
      }
    }
  }

  addShape(newShape: AllShapesType) {
    this.shapes.push(newShape);
  }

  updateShape(id: string, newProps: Partial<AllShapesType>) {
    this.shapes = this.shapes.map((shape) =>
      shape.id === id
        ? { ...shape, ...newProps } as AllShapesType
        : shape
    );
  }

  deleteShape(id: string) {
    this.shapes = this.shapes.filter((shape) => shape.id !== id);
  }
}

export const canvasStore = new CanvasStore();
