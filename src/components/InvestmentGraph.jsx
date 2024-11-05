// src/components/InvestmentGraph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InvestmentGraph = ({ investmentData, investmentPeriodYears }) => {
    // Prepare chart data
    const chartData = investmentData.length > 0
        ? {
            labels: Array.from({ length: investmentPeriodYears }, (_, i) => `Year ${i + 1}`),
            datasets: [
                {
                    label: 'Future Value (₹)',
                    data: investmentData,
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                },
            ],
        }
        : {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'], // Dummy labels
            datasets: [
                {
                    label: 'Future Value (₹)',
                    data: [0, 0, 0, 0, 0], // Dummy data
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    tension: 0.1,
                },
            ],
        };

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Investment Growth Over Time</h3>
            <Line data={chartData} />
        </div>
    );
};

export default InvestmentGraph;
