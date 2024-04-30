import axios from "axios";
import  * as d3 from "d3";
import { useEffect, useRef, useState } from "react";


interface dayGraphProps {
    crypto: string;
    color: string;
}

interface Candlestick {
    date: Date;
    low: number;
    high: number;
    open: number;
    close: number;
    volume: number;
} 

const DailyGraph = (props: dayGraphProps) => {

    const [candleData, setCandleData] = useState<Candlestick[]>([]);
    const svgRef = useRef(null);
    const width = 350;
    const height = 140;

    // Fetch data from Coinbase API
    useEffect(() => {
        const fetchDailyData = async ( coin: string) => {
            try {
                const currentDate = new Date();
                const historicMark = new Date(currentDate.getTime() - 86400000);
                const historicMarkiso = historicMark.toISOString();
                const currentDateiso = currentDate.toISOString();
                
                const response = await axios.get(`https://api.pro.coinbase.com/products/${coin}-USD/candles?start=${historicMarkiso}&end=${currentDateiso}&granularity=3600`);
                const rawData = response.data;

                // Extract and set prices in the state
                setCandleData(rawData.map((d: any) => ({
                    date: new Date(d[0] * 1000),
                    low: d[1],
                    high: d[2],
                    open: d[3],
                    close: d[4],
                    volume: d[5]
                })));
            } catch (error) {
                console.error('Error fetching price history:', error);
            }
        };

        fetchDailyData(props.crypto);
    }, [props.crypto]);

    useEffect(() => {
        if (candleData.length > 0) {
            drawChart();
        }
    }, [candleData]); // Redraw the chart when data changes

    const drawChart = () => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear the previous chart
        const lows = candleData.map(d => d.low).filter(low => low !== undefined) as number[];
        const highs = candleData.map(d => d.high).filter(high => high !== undefined) as number[];


        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, chartWidth])
            .domain(candleData.map(d => d.date.toString()))
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([
                Math.min(...lows),
                Math.max(...highs)
            ])
            .range([chartHeight, 0]);

        const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d") as any);
        const yAxis = d3.axisLeft(y);

        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        chart.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(xAxis)
            .selectAll("text, line, path")
            .remove();

        chart.append("g")
            .call(yAxis)
            svg.select('.domain')
            .style('stroke', 'blue');
      
            svg.selectAll('.tick text')
            .style('fill', 'white');

        // Draw the candles
        chart.selectAll(".candle")
            .data(candleData)
            .enter()
            .append("rect")
            .attr("x", d => x(d.date.toString())!)
            .attr("y", d => y(Math.max(d.open, d.close)))
            .attr("width", x.bandwidth())
            .attr("height", d => Math.abs(y(d.open) - y(d.close)))
            .attr("fill", d => d.open > d.close ? "red" : "green");
    };

    return (
        <div className="day-chart">
            <h4 className="day-chart-title inter-font t-white">{props.crypto} history last 24 hr</h4>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
}

export default DailyGraph;