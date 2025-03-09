import React from 'react';
import * as d3 from 'd3';

const Visualization = ({ data }) => {
    React.useEffect(() => {
        if (data && data.length > 0) {
            drawVisualization(data);
        }
    }, [data]);

    const drawVisualization = (data) => {
        // Clear previous visualization
        d3.select('#visualization').selectAll('*').remove();

        // Set dimensions and margins for the SVG
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select('#visualization')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Example of drawing a simple line chart (customize as needed)
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)) // Assuming data has 'x' property
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)]) // Assuming data has 'y' property
            .range([height, 0]);

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => x(d.x))
                .y(d => y(d.y))
            );
    };

    return (
        <div>
            <h2>Seismic Network Visualization</h2>
            <div id="visualization"></div>
        </div>
    );
};

export default Visualization;