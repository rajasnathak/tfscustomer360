import React from "react";
import { runForceGraph } from "./GraphGenerator";
import styles from "./Graph.module.css";

export function ForceGraph({ data, nodeHoverTooltip }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    console.log(data);
    let destroyFn;
    if (containerRef.current) {
      const { destroy } = runForceGraph(
        containerRef.current,
        data,
        nodeHoverTooltip
      );
      destroyFn = destroy;
    }

    return destroyFn;
  }, [data, nodeHoverTooltip]);

  return <div ref={containerRef} className={styles.container} />;
}
