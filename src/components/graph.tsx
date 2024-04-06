import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { User } from '../pages/types';
import axios from 'axios';

interface LineGraphProps {
  width: number;
  height: number;
  user: User;
}


const LineGraph= (props: LineGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<number[][]>([]);
  const colors = ['red', 'blue', 'green', 'yellow'];
  

  useEffect(() => {
    const fetchData = async () => {
    //  const fetchedData1 = await fetchDataFunction1();
    //  const fetchedData2 = await fetchDataFunction2();
    //  const fetchedData3 = await fetchDataFunction3();
    //  const fetchedData4 = await fetchDataFunction4();
      const fetchedData1 = await fetchPriceHistory(props.user.red)
      const fetchedData2 = await fetchPriceHistory(props.user.blue)
      const fetchedData3 = await fetchPriceHistory(props.user.green)
      const fetchedData4 = await fetchPriceHistory(props.user.yellow)
      
      setData([fetchedData1, fetchedData2, fetchedData3, fetchedData4]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;
  
    const svg = d3.select(svgRef.current);
  
                                                                // Clear previous content
    svg.selectAll('*').remove();
  
                                                                // Set margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = props.width - margin.left - margin.right;
    const innerHeight = props.height - margin.top - margin.bottom;
  
                                                                // Create scales
    const maxValue = Math.max(...data.flat());
    const maxYValue = maxValue * 1.05;
    const xScale = d3.scaleLinear().domain([0, data[0].length - 1]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, maxYValue]).range([innerHeight, 0]);
  
                                                                // Create line generators
    const lineGenerator = d3.line<number>().x((_, i) => xScale(i)).y(d => yScale(d));
  
                                                                // Add lines to the graph
    for (let i = 0; i < data.length; i++) {
      svg
        .append('path')
        .datum(data[i])
        .attr('fill', 'none')
        .attr('stroke', colors[i])
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator)
        .attr('transform', `translate(${margin.left},${margin.top})`);
    }
  
                                                                // Add axes
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(d3.axisBottom(xScale));
  
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale));
  }, [data, props.width, props.height]); 
  
  return <svg ref={svgRef} width={props.width} height={props.height}></svg>;
};


                                                                // Example async data fetching functions
// const fetchDataFunction1 = async () => {
//  const res = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
//  console.log(res)
//  return res
// };

// const fetchDataFunction2 = async () => {
//  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
// };

// const fetchDataFunction3 = async () => {
//  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
// };

// const fetchDataFunction4 = async () => {
//  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
// };


                                                                // the real deal api calls


const fetchPriceHistory = async (coin: string): Promise<number[]> => {
  try {
    const currentDate = new Date();
    const historicMark = new Date();
    historicMark.setDate(currentDate.getDate() - 180);
    const historicMarkiso = historicMark.toISOString();
    const currentDateiso = currentDate.toISOString();

    const prices: number[] = [];

    const response = await axios.get(`https://api.pro.coinbase.com/products/${coin}-USD/candles?start=${historicMarkiso}&end=${currentDateiso}&granularity=86400`);
    
    const data = response.data;

    // Extract prices from the data and add to the prices array
    data.forEach((item: any) => {
      const price = item[4]; // Assuming the price is at index 4
      prices.push(price);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching price history:', error);
    throw error;
  }
};

export default LineGraph;
