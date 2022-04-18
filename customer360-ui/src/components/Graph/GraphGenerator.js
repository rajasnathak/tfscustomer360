import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";
// import close from "../../assets/img/icons/close.png";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { withRouter } from "react-router";
import { useState } from "react";
import DrillDownModal from "components/PopUps/DrillDownModal";

import closeIcon from "../../assets/img/icons/close.png";

import categories from "../../data/node-categories";
import colors from "../../data/category-colors";
import "../../assets/css/graph-generator.css";

export function runForceGraph(
  // const runForceGraph = (
  container,
  graphData,
  filters,
  searchParams,
  nodeHoverTooltip
) {
  // Apply UIDs to nodes
  console.log(searchParams);
  let uniqueSubjectUuids = new Map();
  let uniqueObjectUuids = new Map();
  var drillDownIds = [];
  /* Function to conditionally set unique identifers for nodes */
  const setuids = (data) => {
    data = data.map((d) => {
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
        // If the object map doesn't have this object, set as a new random UUID
        if (!uniqueObjectUuids.has(d.object.value))
          uniqueObjectUuids.set(d.object.value, uuidv4());
        // If map DOES have this object, apply the same UUID
        objectUuid = uniqueObjectUuids.get(d.object.value);
      }
      // If not a search parameter, provide a unique identifer to the object node
      else objectUuid = uuidv4();

      // If relationship is "type", don't return. This is metadata
      if (d.predicate.value == "type") return {};

      // If object node is URI (can drill down) remove its literal counterpart
      if (d.object.type == "uri") {
        var test_value = d.object.value;
        var test_root = d.subject.value;
        if (
          data.some(
            (t) =>
              t.object.value == test_value &&
              t.object.type == "literal" &&
              t.subject.value == test_root
          )
        ) {
          // console.log(duplicate.object);
          data.splice(
            data.findIndex(
              (t) => t.object.value == test_value && t.object.type == "literal"
            ),
            1
          );
        }
        // console.log(duplicate.object);
      }
      return Object.assign(
        {},
        {
          subject: {
            type: d.subject.type,
            value: d.subject.value,
            id: subjectUuid,
            category: categories["00"],
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
            category: d.object.category
              ? categories[d.object.category]
              : categories["09"],
          },
        }
      );
    });
    data = data.filter((value) => Object.keys(value).length !== 0);
    console.log(data);
    return data;
  };
  const setNewUids = (data) => {
    data = data.map((d) => {
      // console.log(d.object);
      let subjectUuid = "";
      let objectUuid = "";
      // If both the subject and object IDs are set in this triple, maintain
      if (d.subject.id && d.object.id) {
        subjectUuid = d.subject.id;
        objectUuid = d.object.id;
      }
      // Otherwise,
      else {
        subjectUuid = drillDownIds[drillDownIds.length - 1];
        objectUuid = uuidv4();
        // console.log(d.object);
      }
      // If relationship is "type", don't return. This is metadata
      if (d.predicate.value == "type") return {};
      // If not a search parameter, provide a unique identifer to the object node
      // else objectUuid = uuidv4();
      return Object.assign(
        {},
        {
          subject: {
            type: d.subject.type,
            value: d.subject.value,
            id: subjectUuid,
            category: categories["00"],
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
            category: d.object.category ? d.object.category : "Party",
          },
        }
      );
    });
    // console.log(uniqueSubjectUuids);
    data = data.filter((value) => Object.keys(value).length !== 0);
    // console.log(data);
    return data;
  };

  const removeDuplicates = (nodes, type) => {
    /* Each triple returns an additional subject, but we only need one subject
    connected to each object node*/
    const uniqueValuesSet = new Set();
    const unique_nodes = nodes.filter((obj) => {
      const isPresentInSet = uniqueValuesSet.has(obj.name);
      uniqueValuesSet.add(obj.name);
      if (type == "object")
        return !(isPresentInSet && uniqueObjectUuids.has(obj.name));
      else {
        if (drillDownIds.includes(obj.id)) {
          console.log("false for subject");
          return false; // remove the extra subject node
        }
        return !isPresentInSet;
      }
    });
    return unique_nodes;
  };

  // Set unqiue identifers for the data
  var links, subject_nodes, object_nodes, nodes;
  function createNodesAndLinks(data, isDrillDown) {
    isDrillDown ? (graphData = setNewUids(data)) : (graphData = setuids(data));
    console.log(graphData);
    // Define the links between nodes
    links = graphData.map((d) =>
      Object.assign(
        {},
        {
          source: d.subject.id,
          target: d.object.id,
          name: d.predicate.value,
        }
      )
    );

    // Define the subject nodes
    subject_nodes = graphData.map((d) =>
      Object.assign(
        {},
        {
          id: d.subject.id,
          name: d.subject.value,
          type: d.subject.type,
          category: d.subject.category,
        }
      )
    );
    //////////////////////////////////
    /* remove duplicate subject nodes */
    //////////////////////////////////
    subject_nodes = removeDuplicates(subject_nodes, "subject");
    console.log(subject_nodes);
    // Define the object nodes
    object_nodes = graphData.map((d) =>
      Object.assign(
        {},
        {
          id: d.object.id,
          name: d.object.value,
          type: d.object.type,
          predicate: d.predicate.value,
          subject: d.subject.value,
          category: d.object.category,
        }
      )
    );
    /* remove duplicate subject nodes */
    object_nodes = removeDuplicates(object_nodes, "object");

    nodes = subject_nodes.concat(object_nodes);
  }

  createNodesAndLinks(graphData, false);

  let nodeCount = nodes.length;
  let subjectCount = subject_nodes.length;
  console.log(subjectCount);
  const linkDistance = 250;
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height * 2;
  const width = containerRect.width * 2;
  const radius = 32;
  let scale;
  subjectCount > 5 ? (scale = 1.5) : (scale = 1.5);

  // helper functions
  // retrieve color for given node
  const fillColors = (d) => {
    return colors[d.category];
  };
  const defaultStroke = () => {
    return "#FFFFFF";
  };
  const drillDownStroke = () => {
    return "#70e2ff";
  };

  const getClass = (d) => {
    return d.gender === "male" ? styles.male : styles.female;
  };
  // Adds the option to drag the force graph nodes
  const drag = (simulation) => {
    const dragstarted = (event, d) => {
      // console.log(event);
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (event, d) => {
      // console.log(event);
      d.fx = event.x;
      d.fy = event.y;
    };

    const dragended = (event, d) => {
      // console.log(event);
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

  var simulation,
    svg,
    link,
    nodeInfoDiv,
    nodeInfoDivVanilla,
    node,
    node_label,
    link_label;

  let setupD3 = function () {
    simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(linkDistance)
      )
      // Apply to all nodes. Negative value is repulsion, positive is attraction
      .force(
        "charge",
        d3.forceManyBody().strength(function (d) {
          var charge = -500;
          // console.log(d);
          if (d.category == "Root") charge = 10 * charge;
          console.log(charge);
          return charge;
        })
      )
      .force("x", d3.forceX(width / 2))
      .force("y", d3.forceY(height / 2))
      .on("tick", onTick);

    svg = d3
      .select(container)
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);
    // .call(zoomer);
    var zoom_container = svg
      .append("svg:g")
      .attr("class", "plotting-area")
      .attr("width", width)
      .attr("height", height);
    var zoom;
    svg
      .call(
        (zoom = d3.zoom().on("zoom", function (event) {
          zoom_container.attr("transform", event.transform);
        }))
      )
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(-width / 4, -height / 4).scale(scale)
      );
    svg.selectAll("line").remove(); //add this to remove the links
    svg.selectAll("circle").remove(); //add this to remove the nodes
    svg.selectAll("text.label").remove(); //add this to remove the nodes

    nodeInfoDiv = d3.select("#nodeInfo");
    nodeInfoDivVanilla = document.getElementById("nodeInfo");

    link = zoom_container
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", function (d) {
        return filterCategories(d, "link");
      })
      .attr("stroke-width", "1px")
      .attr("stroke", "#58595B")
      .attr("marker-end", "url(#arrowhead)");
    // .attr("display", function(d) {
    //   return hideElement(d, "link");
    // });

    node = zoom_container
      .append("g")
      // .attr("stroke", "#fff")
      // .attr("stroke-width", 2)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      // .attr("class", "node")
      .attr("class", function (d) {
        if (
          d.type == "uri" &&
          d.category != "Root" &&
          !drillDownIds.includes(d.id)
        )
          return "node drillDown " + filterCategories(d, "node");
        else return "node " + filterCategories(d, "node");
      })
      .attr("r", radius)
      .attr("fill", function (d) {
        if (d.category == undefined) return colors["Party"];
        return colors[d.category];
      })
      // .attr("display", function(d) {
      //   return hideElement(d, "node");
      // })
      .style("cursor", "pointer")
      .call(drag(simulation))
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", function (d) {
        showNodePanel(d);
      });

    node_label = zoom_container
      .append("g")
      .attr("class", "labels")
      .selectAll("text.label")
      .data(nodes)
      .enter()
      .append("text")
      .style("text-anchor", "middle")
      .attr("class", function (d) {
        if (d.type == "uri")
          return "node-label label-drillDown " + filterCategories(d, "node");
        else return "node-label " + filterCategories(d, "node");
      })
      .style("cursor", "default")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#ffffff")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1px")
      // .attr("display", function(d) {
      //   return hideElement(d, "node");
      // })
      .call(drag(simulation))
      .text(function (d) {
        return d.name;
        // return d.name.replace(/.{5}/g, '$&\n');
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", function (d) {
        showNodePanel(d);
      });

    link_label = zoom_container
      .append("g")
      .attr("class", "labels")
      .selectAll("text.label")
      .data(links)
      .enter()
      .append("text")
      .attr("class", function (d) {
        // console.log(d);
        return "link-label " + filterCategories(d, "link");
      })
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "auto")
      .attr("fill", "#58595B")
      // .attr("display", function(d) {
      //   return hideElement(d, "link");
      // })
      .call(drag(simulation))
      .text(function (d) {
        return d.name;
      });
  };

  setupD3();

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
    // console.log(nodes);
    let info = '<div id="cover">';
    info +=
      "<img height=17 width=17 img src=\"https://cdn-icons-png.flaticon.com/512/1828/1828778.png\" class=\"action\" style=\"top: 0px;\" onClick=\"(function(){let status = document.getElementById('nodeInfo').className == 'panel_on' ? 'off' : 'on'; document.getElementById('nodeInfo').className = 'panel_' + status;})();\"/>";
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
    if (n.type)
      info +=
        "<div class='node-info-entry'><span class=node-info-attrib>Type</span>: <span class=node-info-value>" +
        n.type +
        "</span></div>";
    if (n.category)
      info +=
        "<div class='node-info-entry'><span class=node-info-attrib>Category</span>: <span class=node-info-value>" +
        n.category +
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

  // var showModal = true;
  // function getComponent() {
  //   if (showModal) {  // show the modal if state showModal is true
  //     console.log("Show Modal");
  //     return <DrillDownModal/>;
  //   } else {
  //     return null;
  //   }
  // }

  function removeDrillDownClass(node) {
    // Remove drill down class once node has been drilled down on
    console.log(node.target.classList);
    node.target.classList.remove("label-drillDown");
    node.target.classList.remove("drillDown");
    console.log(node.target.classList);
  }

  async function drillDown(event, root, node) {
    event.preventDefault();
    // button -> node panel -> cover -> node info cover -> node entry relationship -> node info value
    var param_value =
      event.path[1].children[0].children[3].children[0].children[1].innerText;
    var relationship =
      event.path[1].children[0].children[3].children[4].children[1].innerText;
    // var relationship = event.target.path;
    console.log(event);
    console.log(relationship);
    console.log(root);
    var search_value = param_value + "/" + root;
    console.log(search_value);

    // event.preventDefault();
    const headers = {
      method: "GET",
    };
    let response = await axios
      .get(
        "https://8enlt8jyo0.execute-api.us-east-1.amazonaws.com/prod/sparqlQuery",
        {
          headers: headers,
          params: {
            query_type: "drillDown",
            search_param: relationship,
            value: search_value,
          },
        }
      )
      .catch(function (error) {
        console.log(error.toJSON());
        console.log(error.toJSON().status);
      });

    console.log(graphData);
    let drillDownData = response.data.results.bindings;
    console.log(drillDownData);
    // If no data returned, notify user
    // if(drillDownData.length == 0) getComponent();
    let newGraphData = graphData.concat(drillDownData);
    // RERENDER GRAPH
    createNodesAndLinks(newGraphData, true);
    setupD3();
    removeDrillDownClass(node);
  }

  // Event handler for clickinga node
  // Opens the node panel with more information on the node that was clicked
  function showNodePanel(node) {
    console.log(node);
    console.log(nodeInfoDiv.innerHTML);
    // Create button
    // var button = document.createElement("button");
    // button.innerHTML = "New Search";
    // button.id = "newSearch";
    // button.onclick = (e) =>
    //   newSearch(e, node.target.__data__.predicate, node.target.__data__.name);
    // Fill the div with contnent and display the panel
    nodeInfoDivVanilla.innerHTML = getNodeInfo(node.target.__data__, nodes);

    // If Node can drill down, add the drill down button
    // Note: If ndoe has been drilled down already, don't add the drill down button
    if (
      !drillDownIds.includes(node.target.__data__.id) &&
      (node.target.classList.contains("drillDown") ||
        node.target.classList.contains("label-drillDown"))
    ) {
      var root = node.target.__data__.subject;
      drillDownIds.push(node.target.__data__.id);
      console.log(drillDownIds[drillDownIds.length - 1]);
      addDrillDownButton(nodeInfoDivVanilla, root, node);
    }

    nodeInfoDiv.attr("class", "panel_on");
  }

  function addDrillDownButton(nodeInfoDivVanilla, root, node) {
    // Create button
    var button = document.createElement("button");
    button.innerHTML = "Drill Down";
    button.id = "drillDownButton";
    button.className = "btn btn-light";
    // Set on click evennt listener
    console.log(root);
    button.onclick = (e) => {
      drillDown(e, root, node);
    };
    // button.onclick = (e) =>
    //   newSearch(e, node.target.__data__.predicate, node.target.__data__.name);
    nodeInfoDivVanilla.appendChild(button);
  }

  function hideNodePanel() {
    nodeInfoDiv.attr("class", "panel_off");
  }

  ///////////////////////////////////////////////////
  // Event handler for hiding/unhiding categories
  ///////////////////////////////////////////////////

  function filterCategories(d, type) {
    // console.log(d);
    if (type == "link") {
      if (!filters.some((e) => e.value == d.target.category)) {
        return "hidden";
      } else return "active-category";
    } else if (type == "node") {
      if (d.category == "Root") return "active-category";
      else if (!filters.some((e) => e.value == d.category)) {
        return "hidden";
      } else return "active-category";
    }
  }

  function hideElement(d, type) {
    // console.log(d);
    if (type == "link") {
      if (!filters.some((e) => e.value == d.target.category)) {
        return "none";
      } else return "unset";
    } else if (type == "node") {
      if (d.category == "Root") return "unset";
      else if (!filters.some((e) => e.value == d.category)) {
        return "none";
      } else return "unset";
    }
  }

  function onTick() {
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
  }

  var adjlist = [];
  console.log(links);
  links.forEach(function (d) {
    adjlist[d.source.index + "-" + d.target.index] = true;
    adjlist[d.target.index + "-" + d.source.index] = true;
  });

  // Add the tooltip element to the graph
  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    // tooltipDiv.classList.add(styles.tooltip);
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
      return zoom_container.node();
    },
  };

  function neighboring(a, b) {
    // console.log(a.index);
    // console.log(b.index);
    return a == b || adjlist[a.index + "-" + b.index];
  }

  function mouseover(d) {
    // console.log(d3.selectAll(".node"));
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
    d3.selectAll(".drillDown")
      .style("stroke", "#334F7C")
      .style("stroke-width", 4)
      .style("stroke-dasharray", 8);
    d3.selectAll(".link").style("stroke", "grey").style("stroke-width", 1);
    d3.selectAll(".link").transition().duration(500).style("opacity", 1);
    d3.selectAll(".node").transition().duration(500).style("opacity", 1);
  }
}
export default withRouter(runForceGraph);
