"use client";

import dynamic from "next/dynamic";
import { Box, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToolBar from "./components/toolbar/ToolBar";
import LayerCard from "./components/canvas/LayerCard";

const KonvaStage = dynamic(() => import("./components/canvas/KonvaStage"), {
  ssr: false,
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box padding={1}>
        <ToolBar />
        <Box paddingBlock={1}>
          <Grid container spacing={1}>
            <Grid size={8}>
              <KonvaStage />
            </Grid>
            <Grid size={4}>
              <LayerCard />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
