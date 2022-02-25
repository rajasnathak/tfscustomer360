import * as d3 from "d3";
import styles from "../../assets/css/graph-generator.css";
import { v4 as uuidv4 } from "uuid";
// import close from "../../assets/img/icons/close.png";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export function runForceGraph(
  container,
  graphData,
  searchParams,
  nodeHoverTooltip
) {
  console.log(searchParams);
  // Apply UIDs to nodes
  let uniqueSubjectUuids = new Map();
  let uniqueObjectUuids = new Map();
  const setuids = (graphData) => {
    graphData = graphData.map((d) => {
      let subjectUuid = "";
      let objectUuid = "";
      // If map doesn't have this subject value, set new UUID
      if (!uniqueSubjectUuids.has(d.subject.value))
        uniqueSubjectUuids.set(d.subject.value, uuidv4());
      // If map DOES have it, we set the subject UID to be the same
      subjectUuid = uniqueSubjectUuids.get(d.subject.value);
      // We want to connect on the search paramater, so make them have the same UID
      // If the predicate is a search parameter
      if (searchParams.includes(d.predicate.value)) {
        // If the object map
        if (!uniqueObjectUuids.has(d.object.value))
          uniqueObjectUuids.set(d.object.value, uuidv4());
        // If map DOES have this object, apply the same UUID
        objectUuid = uniqueObjectUuids.get(d.object.value);
      }
      // If not a search parameter, provide a unique identifer to the object node
      else objectUuid = uuidv4();

      return Object.assign(
        {},
        {
          subject: {
            type: d.subject.type,
            value: d.subject.value,
            id: subjectUuid,
          },
          predicate: {
            type: d.predicate.type,
            value: d.predicate.value,
            id: uuidv4(),
          },
          object: {
            type: d.object.type,
            value: d.object.value,
            id: objectUuid,
          },
        }
      );
    });
    // console.log(uniqueSubjectUuids);
    return graphData;
  };

  const removeDuplicates = (nodes, type) => {
    /* Each triple returns an additional subject, but we only need one subject
    connected to each object node*/
    const uniqueValuesSet = new Set();
    const unique_subject_nodes = nodes.filter((obj) => {
      const isPresentInSet = uniqueValuesSet.has(obj.name);
      uniqueValuesSet.add(obj.name);

      if (type == "object")
        return !(isPresentInSet && uniqueObjectUuids.has(obj.name));
      else return !isPresentInSet;
    });
    return unique_subject_nodes;
  };
  graphData = setuids(graphData);
  // copy the data and get the container's width and height
  const links = graphData.map((d) =>
    Object.assign(
      {},
      {
        source: d.subject.id,
        target: d.object.id,
        name: d.predicate.value,
      }
    )
  );
  // console.log(links);
  let subject_nodes = graphData.map((d) =>
    Object.assign({}, { id: d.subject.id, name: d.subject.value })
  );

  /* remove duplicate subject nodes */
  subject_nodes = removeDuplicates(subject_nodes, "subject");

  let object_nodes = graphData.map((d) =>
    Object.assign(
      {},
      { id: d.object.id, name: d.object.value, predicate: d.predicate.value }
    )
  );
  /* remove duplicate subject nodes */
  object_nodes = removeDuplicates(object_nodes, "object");

  const nodes = subject_nodes.concat(object_nodes);

  const linkDistance = 200;
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
    // Apply to all nodes. Negative value is repulsion, positive is attraction
    .force("charge", d3.forceManyBody().strength(-900))
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

  // Movie panel: the div into which the movie details info will be written
  var nodeInfoDiv = d3.select("#nodeInfo");
  var nodeInfoDivVanilla = document.getElementById("nodeInfo");

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
    // .attr("stroke", "#fff")
    // .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("class", "node")
    .attr("r", radius)
    .attr("fill", color)
    .style("cursor", "pointer")
    .call(drag(simulation))
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", function (d) {
      showNodePanel(d);
    });

  const node_label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text.label")
    .data(nodes)
    .enter()
    .append("text")
    .style("text-anchor", "middle")
    .attr("class", "node-label")
    .style("cursor", "default")
    .attr("dominant-baseline", "middle")
    .call(drag(simulation))
    .text(function (d) {
      return d.name;
    })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", function (d) {
      showNodePanel(d);
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
    .call(drag(simulation))
    .text(function (d) {
      return d.name;
    });

  //////////////
  // Event handlers //
  //////////////
  /* Change status of a panel from visible to hidden or viceversa
     id: identifier of the div to change
     status: 'on' or 'off'. If not specified, the panel will toggle status
  */

  /* Compose the content for the panel with movie details.
     Parameters: the node data, and the array containing all nodes
  */
  function getNodeInfo(n, nodes) {
    console.log(n);
    console.log(nodes);
    let info = '<div id="cover">';
    info += "<React.Fragment><CloseIcon/></React.Fragment>";
    info +=
      "<img src=\"../../assets/img/icons/close.png\" className=\"action\" style=\"top: 0px;\" onClick=\"(function(){let status = document.getElementById('nodeInfo').className == 'panel_on' ? 'off' : 'on'; document.getElementById('nodeInfo').className = 'panel_' + status;})();\"/>";
    // Add script for toggleDiv
    info +=
      '<script>function toggleDiv() { let status = nodeInfoDiv.attr("class") == "panel_on" ? "off" : "on"; nodeInfoDiv.attr("class", "panel_" + status);};</script>';
    info += '<br/><div id="node-info-container" style="clear: both;">';
    if (n.name)
      info +=
        "<div class='node-info-entry'><span class=node-info-attrib>Name</span>: <span class=node-info-value>" +
        n.name +
        "</span></div>";
    if (n.id)
      info +=
        "<div class='node-info-entry'><span class=node-info-attrib>Id</span>: <span class=node-info-value>" +
        n.id +
        "</span></div>";
    if (n.predicate)
      info +=
        "<div class='node-info-entry'><span class=node-info-attrib>Relationship</span>: <span class=node-info-value>" +
        n.predicate +
        "</span></div></div>";

    return info;
  }

  const validSearchParams = new Map();
  validSearchParams.set("upid", "upid");
  validSearchParams.set("Customer Name", "name");
  validSearchParams.set("Account number", "acctNum");
  validSearchParams.set("vin", "vin");

  async function newSearch(event, newSearchParam, newValue) {
    event.preventDefault();
    // If search parameter isn't valid, return null
    if (!validSearchParams.has(newSearchParam)) return null;
    else {
      console.log(newSearchParam);
      console.log(newValue);
    }
    // event.preventDefault();
    const headers = {
      method: "GET",
    };
    let response = await axios.get(
      "https://8enlt8jyo0.execute-api.us-east-1.amazonaws.com/prod/sparqlQuery",
      {
        headers: headers,
        params: {
          query_type: "sparql",
          search_param: validSearchParams.get(newSearchParam),
          value: newValue,
        },
      }
    );
    console.log(response);
  }
  // Click node
  function showNodePanel(node) {
    console.log(node);
    console.log(nodeInfoDiv.innerHTML);
    // Create button
    var button = document.createElement("button");
    button.innerHTML = "New Search";
    button.id = "drilldown";
    button.onclick = (e) =>
      newSearch(e, node.target.__data__.predicate, node.target.__data__.name);
    // Fill the div with contnent and display the panel
    nodeInfoDivVanilla.innerHTML = getNodeInfo(node.target.__data__, nodes);
    nodeInfoDivVanilla.appendChild(button);
    nodeInfoDiv.attr("class", "panel_on");
  }

  function hideNodePanel() {
    nodeInfoDiv.attr("class", "panel_off");
  }
  // var tip;
  // svg.on("click", function () {
  //   if (tip) tip.remove();
  // });
  // node.on("click", function (event, d) {
  //   event.stopPropagation();

  //   if (tip) tip.remove();

  //   tip = svg
  //     .append("g")
  //     .attr("transform", "translate(" + d.x + "," + d.y + ")");

  //   var rect = tip
  //     .append("rect")
  //     .style("fill", "white")
  //     .style("stroke", "steelblue");

  //   tip
  //     .append("text")
  //     .text("Name: " + d.name)
  //     .attr("dy", "1em")
  //     .attr("x", 5);

  //   tip
  //     .append("text")
  //     .text("Info: " + d.info)
  //     .attr("dy", "2em")
  //     .attr("x", 5);

  //   var bbox = tip.node().getBBox();
  //   rect.attr("width", bbox.width + 10).attr("height", bbox.height + 10);
  // });

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
  console.log(links);
  links.forEach(function (d) {
    adjlist[d.source.index + "-" + d.target.index] = true;
    adjlist[d.target.index + "-" + d.source.index] = true;
  });
  // console.log(adjlist);

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
    // console.log(d.name);
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

  function neighboring(a, b) {
    // console.log(a.index);
    // console.log(b.index);
    return a == b || adjlist[a.index + "-" + b.index];
  }

  function mouseover(d) {
    // console.log(d.target.__data__);
    d3.selectAll(".node").style("stroke", "black");
    d3.selectAll(".link").style("stroke", "black").style("stroke-width", 4);
    d3.selectAll(".link")
      .transition()
      .duration(500)
      .style("opacity", function (o) {
        return o.source === d || o.target === d ? 1 : 0.1;
      });

    d3.selectAll(".node")
      .transition()
      .duration(500)
      .style("opacity", function (o) {
        // console.log(o);
        return neighboring(d.target.__data__, o) ? 1 : 0.1;
      });
  }

  function mouseout() {
    d3.selectAll(".node").style("stroke", "white");
    d3.selectAll(".link").style("stroke", "grey").style("stroke-width", 1);
    d3.selectAll(".link").transition().duration(500).style("opacity", 1);
    d3.selectAll(".node").transition().duration(500).style("opacity", 1);
  }
}
