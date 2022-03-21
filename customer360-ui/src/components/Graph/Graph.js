import React from "react";
import { runForceGraph } from "./GraphGenerator";
import styles from "./Graph.module.css";
import CloseIcon from "@mui/icons-material/Close";

// eslint-disable-next-line react/prop-types
export default function ForceGraph({
  graphData,
  filters,
  searchParams,
  nodeHoverTooltip,
}) {
  const containerRef = React.useRef(null);
  console.log(graphData);
  console.log(searchParams);
  console.log(filters);
  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(
        containerRef.current,
        graphData,
        filters,
        searchParams,
        nodeHoverTooltip
      );
      destroyFn = destroy;
    }

    return destroyFn;
  }, [graphData, filters, nodeHoverTooltip]);

  return <div ref={containerRef} className={styles.container} />;
}
