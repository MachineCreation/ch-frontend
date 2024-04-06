import { useEffect, useRef} from 'react';
import * as d3 from 'd3';
import { User } from '../pages/types';
import axios from 'axios';

interface MultiLineGraphProps {
  width: number;
  height: number;
  user: User;
}

const MultiLineGraph = (props: MultiLineGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const svgRef1 = useRef<SVGSVGElement>(null);
  const svgRef2 = useRef<SVGSVGElement>(null);
  const svgRef3 = useRef<SVGSVGElement>(null);


  // Fetch data for each dataset
  const fetchData = async (coin: string) => {
    try {
      const currentDate = new Date();
      const historicMark = new Date();
      historicMark.setDate(currentDate.getDate() - 180);
      const historicMarkiso = historicMark.toISOString();
      const currentDateiso = currentDate.toISOString();
      
      const response = await axios.get(`https://api.pro.coinbase.com/products/${coin}-USD/candles?start=${historicMarkiso}&end=${currentDateiso}&granularity=86400`);
      const data = response.data;
      
      // Extract prices from the data
      const prices = data.map((item: any) => item[4]);
      return prices;
    } catch (error) {
      console.error('Error fetching price history:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Fetch data for each dataset
    const fetchDataForAll = async () => {
      const colors = ['red', 'blue', 'green', 'yellow'];
      const fetchedData = await fetchData(props.user.red);
      const fetchedData1 = await fetchData(props.user.blue);
      const fetchedData2 = await fetchData(props.user.green);
      const fetchedData3 = await fetchData(props.user.yellow);
      
      // Render line graphs with fetched data
      renderLineGraph(fetchedData);
      renderLineGraphs(fetchedData1, svgRef1, colors[1]);
      renderLineGraphs(fetchedData2, svgRef2, colors[2]);
      renderLineGraphs(fetchedData3, svgRef3, colors[3]);
    };
    
    fetchDataForAll();
  }, [props.width, props.height]);

  const renderLineGraph = (data: number[]) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = props.width - margin.left - margin.right;
    const innerHeight = props.height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([data.length, 0 - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([innerHeight, 0]);

    const lineGenerator = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d));

    svg.selectAll('*').remove();

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10))

    svg.select('.domain')
      .style('stroke', 'blue');

    svg.selectAll('.tick text')
      .style('fill', 'white');

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale).tickSize(0).tickPadding(0))
      .selectAll("text")
      .remove();
  };

  const renderLineGraphs = (data: number[], ref: React.RefObject<SVGSVGElement>, color: string) => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = props.width - margin.left - margin.right;
    const innerHeight = props.height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([data.length, 0 - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([innerHeight, 0]);

    const lineGenerator = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d));

    svg.selectAll('*').remove();

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10))
      .selectAll('line, path, text')
      .remove()


    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale).tickSize(0).tickPadding(0))
      .selectAll("line, path, text")
      .remove();
  };

  return (

    <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <svg ref={svgRef} width={props.width} height={props.height}></svg>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <svg ref={svgRef1} width={props.width} height={props.height}></svg>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <svg ref={svgRef2} width={props.width} height={props.height}></svg>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <svg ref={svgRef3} width={props.width} height={props.height}></svg>
        </div>
    </div>
    
  ); 
}

export default MultiLineGraph;
