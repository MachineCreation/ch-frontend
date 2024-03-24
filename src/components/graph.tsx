import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { User } from '../pages/types';

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
//      const fetchedData1 = await fetchDataFunction1();
//      const fetchedData2 = await fetchDataFunction2();
//      const fetchedData3 = await fetchDataFunction3();
//      const fetchedData4 = await fetchDataFunction4();
      const fetchedData1 = await fetchBTCPriceOverLast6Months(props.user.red);
      const fetchedData2 = await fetchBTCPriceOverLast6Months(props.user.blue);
      const fetchedData3 = await fetchBTCPriceOverLast6Months(props.user.green);
      const fetchedData4 = await fetchBTCPriceOverLast6Months(props.user.yellow);
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
//const fetchDataFunction1 = async () => {
//  const res = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
//  console.log(res)
//  return res
//};

//const fetchDataFunction2 = async () => {
//  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
//};

//const fetchDataFunction3 = async () => {
//  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
//};

//const fetchDataFunction4 = async () => {
//  return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
//};


                                                                // the real deal api calls

const fetchBTCPriceOverLast6Months = async (coin:string): Promise<number[]> => {
  try {
    const currentDate = new Date();
    const sixMonthsAgoDate = new Date();
    sixMonthsAgoDate.setMonth(sixMonthsAgoDate.getMonth() - 6);

    const prices: number[] = [];

    let currentDateCopy = new Date(sixMonthsAgoDate);

    while (currentDateCopy <= currentDate) {
      const dateString = currentDateCopy.toISOString().split('T')[0];

      const response = await fetch(`https://api.coinbase.com/v2/prices/${coin}-USD/spot?date=${dateString}`);
      const data = await response.json();

      if (!data.data || !data.data.amount) {
        throw new Error('Invalid response format');
      }

      const price: number = parseFloat(data.data.amount);
      prices.push(price);

     
      currentDateCopy.setDate(currentDateCopy.getDate() + 1);
    }

    return prices;
  } catch (error) {
    console.error('Error fetching BTC prices:', error);
    throw error;
  }
};

export default LineGraph;
