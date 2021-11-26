import * as d3 from "d3";
import styles from "../../assets/css/graph-generator.css";

export function runForceGraph(
  container,
  linksData,
  nodesData,
  nodeHoverTooltip
) {
  // copy the data and get the container's width and height
  const links = linksData.map((d) => Object.assign({}, d));
  const nodes = nodesData.map((d) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  // helper functions
  // retrieve color for given node
  const color = () => {
    return "#EB0A1E";
  };

  const icon = (d) => {
    return d.gender === "male" ? "\uf222" : "\uf221";
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
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody().strength(-150))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .call(
      d3.zoom().on("zoom", function (event) {
        svg.attr("transform", event.transform);
      })
    );

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 12)
    .attr("fill", color)
    .call(drag(simulation));

  const node_label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text.label")
    .data(nodes)
    .enter()
    .append("text")
    .attr("dominant-baseline", "auto")
    .attr("class", (d) => `fa ${getClass(d)}`)
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
    .attr("class", (d) => `fa ${getClass(d)}`)
    .call(drag(simulation))
    .text(function (d) {
      return d.name;
    });

  //////////////
  // Event handlers //
  //////////////

  node_label
    .on("mouseover", (event, d) => {
      addTooltip(nodeHoverTooltip, d, event.pageX, event.pageY);
    })
    .on("mouseout", () => {
      removeTooltip();
    });

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", (d) => d.source.x * 2)
      .attr("y1", (d) => d.source.y * 2)
      .attr("x2", (d) => d.target.x * 2)
      .attr("y2", (d) => d.target.y * 2);

    // update node positions
    node.attr("cx", (d) => d.x * 2).attr("cy", (d) => d.y * 2);

    // update label positions
    node_label
      .attr("x", (d) => {
        return d.x * 2;
      })
      .attr("y", (d) => {
        return d.y * 2;
      });

    link_label
      .attr("x", (d) => {
        return d.x;
      })
      .attr("y", (d) => {
        return d.y;
      });
  });

  // focus on subset
  function focus(event, d) {
    var index = d3.select(event.target).datum().index;
    node.style("opacity", function (o) {
      return neigh(index, o.index) ? 1 : 0.1;
    });
    node_label.attr("display", function (o) {
      return neigh(index, o.node.index) ? "block" : "none";
    });
    link.style("opacity", function (o) {
      return o.source.index == index || o.target.index == index ? 1 : 0.1;
    });
  }

  function unfocus() {
    node_label.attr("display", "block");
    node.style("opacity", 1);
    link.style("opacity", 1);
  }

  var adjlist = [];

  links.forEach(function (d) {
    adjlist[d.source.index + "-" + d.target.index] = true;
    adjlist[d.target.index + "-" + d.source.index] = true;
  });
  function neigh(a, b) {
    return a == b || adjlist[a + "-" + b];
  }

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
