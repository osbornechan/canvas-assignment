import { observer } from "mobx-react-lite";
import { ButtonGroup, Stack, Typography } from "@mui/material";
import ToolButton, { MenuItemType } from "./ToolButton";
import { TOOL_BUTTONS, ToolType } from "../../constants";

export default observer(function ToolBar() {
  return (
    <Stack>
      <Typography variant="caption" color="primary" fontWeight={600}>
        Tools
      </Typography>

      <ButtonGroup>
        {Object.keys(TOOL_BUTTONS).map((tool) => {
          const { title, icon, options, colorSelectable } =
            TOOL_BUTTONS[tool as keyof typeof TOOL_BUTTONS];
          const ToolIcon = icon;
          return (
            <ToolButton
              key={title}
              tool={tool as keyof typeof TOOL_BUTTONS}
              tooltipTitle={title}
              menuItems={Object.entries(options).map(
                ([k, v]) => [k as ToolType, v] as MenuItemType
              )}
              colorSelectable={colorSelectable}
            >
              <ToolIcon />
            </ToolButton>
          );
        })}
      </ButtonGroup>
    </Stack>
  );
});
