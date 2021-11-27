import React from "react";
import { runForceGraph } from "./GraphGenerator";
import styles from "./Graph.module.css";

export function ForceGraph({ linksData, nodesData, nodeHoverTooltip }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

<<<<<<< Updated upstream
  return <div ref={containerRef} className={styles.container} />;
}
=======
  return <div ref={containerRef} className={styles.container} style={{height:500}}/>;
}
>>>>>>> Stashed changes
