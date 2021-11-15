import React, { Component } from "react";
import * as d3 from "d3";
import { runForceGraph } from "./GraphGenerator";
import styles from "../../assets/css/graph-generator.css";

// eslint-disable-next-line react/prop-types
export function ForceGraph({ linksData, nodesData, nodeHoverTooltip }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(
        containerRef.current,
        linksData,
        nodesData,
        nodeHoverTooltip
      );
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
