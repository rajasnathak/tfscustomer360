import React from "react";
import { runForceGraph } from "./GraphGenerator";
import styles from "./Graph.module.css";

// eslint-disable-next-line react/prop-types
export default function ForceGraph({
  graphData,
  searchParams,
  nodeHoverTooltip,
}) {
  const containerRef = React.useRef(null);
  console.log(graphData);
  console.log(searchParams);
  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(
        containerRef.current,
        graphData,
        searchParams,
        nodeHoverTooltip
      );
      destroyFn = destroy;
    }

    return destroyFn;
  }, [graphData, nodeHoverTooltip]);

  return <div ref={containerRef} className={styles.container} />;
}
