import React from "react";
// core components

import { Box, CardContent } from "@material-ui/core";

import { Card } from "@material-ui/core";
// Import Graph
import { ForceGraph } from "../Graph/Graph";

// Import data
import data from "../../data/data.json";

export default function Home() {
  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  }, []);
  return (
    <div className="container" style={{ height: "auto" }}>
      {
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ width: 600, height: "auto", marginTop: 80 }}>
            <CardContent>
              <ForceGraph
                linksData={data.links}
                nodesData={data.nodes}
                nodeHoverTooltip={nodeHoverTooltip}
              />
            </CardContent>
          </Card>
        </Box>
      }
    </div>
  );
}
