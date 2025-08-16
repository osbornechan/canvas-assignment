import {
  CategoryOutlined,
  Mode,
  FileUploadOutlined,
  FileDownloadOutlined,
  SquareOutlined,
  CircleOutlined,
  ChangeHistoryOutlined,
  NorthWestOutlined,
  HorizontalRule,
  DragHandle,
  Menu,
  ImageOutlined,
  PanToolOutlined,
  FormatColorFillOutlined,
  EditSquare,
} from "@mui/icons-material";

type ToolType = keyof typeof TOOLS;

const TOOL_ACTIONS = {
  DRAW: 'DRAW',
  FILL: 'FILL',
  MOVE: 'MOVE',
};

const TOOLS = {
  STAGE: "STAGE",
  SELECT: "SELECT",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  TRIANGLE: "TRIANGLE",
  ARROW: "ARROW",
  THIN_LINE: "THIN_LINE",
  MEDIUM_LINE: "MEDIUM_LINE",
  THICK_LINE: "THICK_LINE",
  FILL: "FILL",
  IMPORT: "IMPORT",
  EXPORT: "EXPORT",
};

const TOOL_ICON = {
  STAGE: EditSquare,
  SELECT: PanToolOutlined,
  SHAPE: CategoryOutlined,
  RECTANGLE: SquareOutlined,
  CIRCLE: CircleOutlined,
  TRIANGLE: ChangeHistoryOutlined,
  ARROW: NorthWestOutlined,
  LINE: Mode,
  THIN_LINE: HorizontalRule,
  MEDIUM_LINE: DragHandle,
  THICK_LINE: Menu,
  FILL: FormatColorFillOutlined,
  IMAGE: ImageOutlined,
  IMPORT: FileUploadOutlined,
  EXPORT: FileDownloadOutlined,
};

const TOOL_BUTTONS = {
  SELECT: {
    title: 'Select',
    icon: TOOL_ICON.SELECT,
    colorSelectable: false,
    options: [],
  },
  SHAPE: {
    title: 'Shape',
    icon: TOOL_ICON.SHAPE,
    colorSelectable: true,
    options: {
      [TOOLS.RECTANGLE]: {
        title: 'Rectangle',
        icon: TOOL_ICON.RECTANGLE,
      },
      [TOOLS.CIRCLE]: {
        title: 'Circle',
        icon: TOOL_ICON.CIRCLE,
      },
      [TOOLS.TRIANGLE]: {
        title: 'Triange',
        icon: TOOL_ICON.TRIANGLE,
      },
      [TOOLS.ARROW]: {
        title: 'Arrow',
        icon: TOOL_ICON.ARROW,
      },
    },
  },
  LINE: {
    title: 'Line',
    icon: TOOL_ICON.LINE,
    colorSelectable: true,
    options: {
      [TOOLS.THIN_LINE]: {
        title: 'Thin',
        icon: TOOL_ICON.THIN_LINE,
      },
      [TOOLS.MEDIUM_LINE]: {
        title: 'Medium',
        icon: TOOL_ICON.MEDIUM_LINE,
      },
      [TOOLS.THICK_LINE]: {
        title: 'Thick',
        icon: TOOL_ICON.THICK_LINE,
      },
    },
  },
  FILL: {
    title: 'Background Fill',
    icon: TOOL_ICON.FILL,
    colorSelectable: true,
    options: [],
  },
  IMAGE: {
    title: 'Image',
    icon: TOOL_ICON.IMAGE,
    colorSelectable: false,
    options: {
      [TOOLS.IMPORT]: {
        title: 'Import',
        icon: TOOL_ICON.IMPORT,
      },
      [TOOLS.EXPORT]: {
        title: 'Export',
        icon: TOOL_ICON.EXPORT,
      },
    },
  }
} as const;

export { TOOL_BUTTONS, TOOLS, TOOL_ACTIONS, TOOL_ICON };
export type { ToolType };
