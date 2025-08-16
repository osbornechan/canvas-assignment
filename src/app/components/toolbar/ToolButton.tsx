import { useState, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { ActiveToolType, canvasStore } from "@/app/store";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import ColorPicker from "./ColourPicker";
import { TOOL_BUTTONS, TOOLS, ToolType } from "../../constants";

export type MenuItemType = [
  ToolType,
  {
    title: string;
    icon: SvgIconComponent;
  }
];

type ToolButtonProps = {
  children: string | ReactNode;
  tool: keyof typeof TOOL_BUTTONS;
  tooltipTitle: string;
  menuItems: MenuItemType[];
  colorSelectable: boolean;
};

function toolMap(tool: ActiveToolType | keyof typeof TOOL_BUTTONS) {
  switch (tool) {
    case TOOLS.RECTANGLE:
    case TOOLS.CIRCLE:
    case TOOLS.TRIANGLE:
    case TOOLS.ARROW:
      return "SHAPE";
    case TOOLS.THIN_LINE:
    case TOOLS.MEDIUM_LINE:
    case TOOLS.THICK_LINE:
      return "LINE";
    case TOOLS.IMPORT:
    case TOOLS.EXPORT:
      return "IMAGE";
    default:
      return tool;
  }
}

export default observer(function ToolButton({
  children,
  tool,
  tooltipTitle,
  menuItems,
  colorSelectable = false,
}: ToolButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const colorKey = tool.toLowerCase() as keyof typeof canvasStore.color;
  const isSelected = toolMap(canvasStore.activeTool) === tool;

  return (
    <Box>
      <Tooltip title={tooltipTitle}>
        <Button
          sx={{
            fontWeight: 550,
            backgroundColor: isSelected
              ? canvasStore.color[colorKey]
              : "inherit",
          }}
          variant={isSelected ? "contained" : "outlined"}
          onClick={(e) => {
            if (tool === TOOLS.SELECT) {
              canvasStore.setActiveTool(TOOLS.SELECT as keyof typeof TOOLS);
            } else if (tool === TOOLS.FILL) {
              canvasStore.setActiveTool(TOOLS.FILL as keyof typeof TOOLS);
            }
            if (toolMap(canvasStore.activeTool) !== tool) {
              canvasStore.setActiveTool(null);
            }
            setAnchorEl(e.currentTarget);
          }}
        >
          {children}
        </Button>
      </Tooltip>
      {(menuItems.length > 0 || colorSelectable) && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null);
          }}
          sx={{ mt: 1 }}
        >
          <MenuList dense>
            {menuItems.map(([option, { title, icon }]) => {
              const Icon = icon;
              return (
                <MenuItem
                  key={title}
                  onClick={() => {
                    canvasStore.setActiveTool(option);
                    setAnchorEl(null);
                  }}
                  selected={canvasStore.activeTool === option}
                >
                  <ListItemIcon>
                    <Icon
                      fontSize="small"
                      sx={{ color: canvasStore.color[colorKey] }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="subtitle2" fontWeight={550}>
                      {title}
                    </Typography>
                  </ListItemText>
                </MenuItem>
              );
            })}
          </MenuList>
          {colorSelectable && (
            <Box>
              <Divider variant="middle" />
              <Box padding={1}>
                <ColorPicker
                  color={canvasStore.color[colorKey]}
                  onChange={(newColor) => {
                    canvasStore.setColor(colorKey, newColor);
                  }}
                />
              </Box>
            </Box>
          )}
        </Menu>
      )}
    </Box>
  );
});
