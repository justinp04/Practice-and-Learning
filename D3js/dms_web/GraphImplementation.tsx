import { fileObject } from './graph.ts';
import React, { Component } from 'react';


// const d3 = require("https://cdn.jsdelivr.net/npm/d3@7");

// In React TypeScript, we need to define an interface for what the props and state will look like
interface IGraphImplementationProps {
    documentTree: Object[];
}

interface IGraphImplementationState {
    tree: Object[];
}

// Main code
class GraphImplementation extends Component<IGraphImplementationProps, IGraphImplementationState> {
    constructor(props: IGraphImplementationProps) {
        super(props);

        this.state = {
            tree: this.props.documentTree
        }
    }

    makeTree(data: any) {

        const width = 928;

        // Compute tree height allowing the height of the SVG to scale according to the breadth.
        const root = d3.hierarchy(data);
        const dx = 10;
        const dy = width / (root.height + 1);

        // Create the tree layout
        const tree = d3.tree().nodeSize([dx, dy]);

        // Sort the tree and apply the layout.
        root.sort((a: { data: { name: any; }; }, b: { data: { name: any; }; }) => d3.ascending(a.data.name, b.data.name));
        tree(root);

        // Compute extent of the tree and swap x and y, as the tree is displayed horzontally not vertically.
        let x0 = Infinity;
        let x1 = -x0;
        root.each((d: { x: number; }) => {
            if(d.x > x1)
            {
                x1 = d.x;
            }
            if(d.x < x0)
            {
                x0 = d.x;
            }
        });

        // Compute the adjusted height of the tree
        const height = x1 - x0 + dx * 2;

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewbox", [-dy / 3, x0 - dx, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 10px Tahoma;");
        
            const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
        .selectAll()
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x((d: { y: any; }) => d.y)
                .y((d: { x: any; }) => d.x));
        
        const node = svg.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
        .selectAll()
        .data(root.descendants())
        .join("g")
            .attr("transform", (d: { y: any; x: any; }) => `translate(${d.y},${d.x})`);
    
        node.append("circle")
            .attr("fill", (d: { children: any; }) => d.children ? "#555" : "#999")
            .attr("r", 2.5);
    
        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", (d: { children: any; }) => d.children ? -6 : 6)
            .attr("text-anchor", (d: { children: any; }) => d.children ? "end" : "start")
            .text((d: { data: { name: any; }; }) => d.data.name)
            .attr("stroke", "white")
            .attr("paint-order", "stroke");
        
        return svg.node();
    }

    render() {
        let testFRM1: fileObject = new fileObject("testFRM1", []);
        let testFRM2 = new fileObject("testFRM2", []);

        let testPRO1 = new fileObject("testPRO1", [testFRM1]);
        let testPRO2 = new fileObject("testPRO2", [testFRM2]);

        let testMGP = new fileObject("testMGP", [testPRO1, testPRO2]);
    }
} 