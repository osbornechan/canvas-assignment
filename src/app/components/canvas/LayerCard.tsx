import { observer } from "mobx-react-lite";
import { canvasStore } from "@/app/store";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TOOL_ICON } from "@/app/constants";

export default observer(function LayerCard() {
  return (
    <Box
      border="1px solid #000000"
      borderRadius={1}
      padding={2}
      color={"#000000"}
      minHeight={"52vh"}
      maxHeight={"52vh"}
      overflow="scroll"
    >
      <Typography variant="subtitle2" fontWeight={550}>
        Layers
      </Typography>

      <List dense>
        {canvasStore.layers.map(
          ({ layerId, id, type, action, color, fill }) => {
            const ToolIcon = TOOL_ICON[type];
            return (
              <ListItem
                key={layerId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => canvasStore.deleteLayer(layerId, id, action)}
                  >
                    <Delete />
                  </IconButton>
                }
                sx={{ paddingBlock: 0.5, paddingInline: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: fill ?? "inherit",
                      border: "1px solid #757575",
                    }}
                  >
                    <ToolIcon sx={{ color: color ?? "#000000" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={type} secondary={action} />
              </ListItem>
            );
          }
        )}
      </List>
    </Box>
  );
});
