import * as d3 from "d3";
import styles from "../../assets/css/graph-generator.css";

export function runForceGraph(container, graphData, nodeHoverTooltip) {
  // copy the data and get the container's width and height
  const links = graphData.map((d) =>
    Object.assign(
      {},
      {
        source: d.subject.value,
        target: d.object.value,
        name: d.predicate.value,
      }
    )
  );
  const subject_nodes = graphData.map((d) =>
    Object.assign({}, { id: d.subject.value, name: d.subject.value })
  );

  // remove duplicates
  const uniqueValuesSet = new Set();
  const unique_subject_nodes = subject_nodes.filter((obj) => {
    const isPresentInSet = uniqueValuesSet.has(obj.name);

    uniqueValuesSet.add(obj.name);

    return !isPresentInSet;
  });
  console.log(unique_subject_nodes);

  const object_nodes = graphData.map((d) =>
    Object.assign({}, { id: d.object.value, name: d.object.value })
  );
  const nodes = unique_subject_nodes.concat(object_nodes);
  // console.log(nodes);
  var linkDistance = 200;

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const radius = 24;

  // helper functions
  // retrieve color for given node
  const color = () => {
    return "#EB0A1E";
  };

  const getClass = (d) => {
    return d.gender === "male" ? styles.male : styles.female;
  };
  // Adds the option to drag the force graph nodes
  const drag = (simulation) => {
    const dragstarted = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };

    const dragended = (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };
  ///////
  // D3 Code //
  /////////////
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(linkDistance)
    )
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2));

  var zoom;
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  // svg
  //   .call(
  //     (zoom = d3.zoom().on("zoom", function (event) {
  //       svg.attr("transform", event.transform);
  //     }))
  //   )
  //   .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(3));

  const link = svg
    .append("g")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", "1px")
    .attr("stroke", "#58595B")
    .attr("marker-end", "url(#arrowhead)");

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", radius)
    .attr("fill", color)
    .call(drag(simulation));

  const node_label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text.label")
    .data(nodes)
    .enter()
    .append("text")
    .style("text-anchor", "middle")
    .style("cursor", "pointer")
    .attr("class", "node-label")
    .attr("dominant-baseline", "middle")
    .call(drag(simulation))
    .text(function (d) {
      return d.name;
    });

  const link_label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text.label")
    .data(links)
    .enter()
    .append("text")
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "auto")
    .attr("fill", "#58595B")
    .attr("class", (d) => `fa ${getClass(d)}`)
    .call(drag(simulation))
    .text(function (d) {
      return d.name;
    });

  //////////////
  // Event handlers //
  //////////////

  node
    .on("mouseover", (event, d) => {
      addTooltip(nodeHoverTooltip, d, d.x, d.y);
    })
    .on("mouseout", () => {
      removeTooltip();
    });

  simulation.on("tick", () => {
    // update node positions
    // node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    node
      .attr("cx", function (d) {
        return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
      })
      .attr("cy", function (d) {
        return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
      });
    //update link positions
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // update label positions
    node_label
      .attr("x", (d) => {
        return d.x;
      })
      .attr("y", (d) => {
        return d.y;
      });

    link_label
      .attr("x", function (d) {
        if (d.target.x > d.source.x) {
          return d.source.x + (d.target.x - d.source.x) / 2;
        } else {
          return d.target.x + (d.source.x - d.target.x) / 2;
        }
      })
      .attr("y", function (d) {
        if (d.target.y > d.source.y) {
          return d.source.y + (d.target.y - d.source.y) / 2;
        } else {
          return d.target.y + (d.source.y - d.target.y) / 2;
        }
      });
  });

  // focus on subset of nodes and relationships
  // function focus(event, d) {
  //   var index = d3.select(event.target).datum().index;
  //   node.style("opacity", function (o) {
  //     return neigh(index, o.index) ? 1 : 0.1;
  //   });
  //   node_label.attr("display", function (o) {
  //     return neigh(index, o.node.index) ? "block" : "none";
  //   });
  //   link.style("opacity", function (o) {
  //     return o.source.index == index || o.target.index == index ? 1 : 0.1;
  //   });
  // }

  // function unfocus() {
  //   node_label.attr("display", "block");
  //   node.style("opacity", 1);
  //   link.style("opacity", 1);
  // }

  var adjlist = [];

  links.forEach(function (d) {
    adjlist[d.source.index + "-" + d.target.index] = true;
    adjlist[d.target.index + "-" + d.source.index] = true;
  });
  // function neigh(a, b) {
  //   return a == b || adjlist[a + "-" + b];
  // }

  // Add the tooltip element to the graph
  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    console.log(d.name);
    div.transition().duration(200).style("opacity", 0.9);
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div.transition().duration(200).style("opacity", 0);
  };

  // return the destroy function that the graph container is going to use
  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
}
