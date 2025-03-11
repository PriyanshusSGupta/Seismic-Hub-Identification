import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ graphData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!graphData) return;

    const width = 600, height = 400;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid #ccc")
      .call(d3.zoom().scaleExtent([0.1, 2]).on("zoom", (event) => {
        container.attr("transform", event.transform);
      }));

    const container = svg.append("g");

    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.edges).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-20))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = container.append("g")
      .selectAll("line")
      .data(graphData.edges)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5);

    // Draw nodes
    const node = container.append("g")
      .selectAll("circle")
      .data(graphData.nodes)
      .enter().append("circle")
      .attr("r", 6)
      .attr("fill", d => (d.id === graphData.hub ? "red" : "blue"))
      .style("cursor", "pointer")
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }))
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").text(`Node: ${d.id}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("top", `${event.pageY - 10}px`).style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      })
      .on("click", (event, clickedNode) => {
        node.attr("fill", d => d.id === clickedNode.id ? "orange" : "blue");
        link.attr("stroke", d => (d.source.id === clickedNode.id || d.target.id === clickedNode.id) ? "orange" : "#999");
      });

    // Tooltip
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("box-shadow", "0px 0px 5px rgba(0,0,0,0.3)")
      .style("visibility", "hidden");

    node.append("title").text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

  }, [graphData]);

  return <svg ref={svgRef}></svg>;
};

export default GraphVisualization;
