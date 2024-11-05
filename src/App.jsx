// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import InvestmentGraph from './components/InvestmentGraph';

function App() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [annualInterestRate, setAnnualInterestRate] = useState(8);
    const [investmentPeriodYears, setInvestmentPeriodYears] = useState(10);
    const [inflationRate, setInflationRate] = useState(5);
    const [stepUpPercentage, setStepUpPercentage] = useState(5);
    const [result, setResult] = useState({ futureValue: 0, inflationAdjustedFutureValue: 0 });
    const [investmentData, setInvestmentData] = useState([]);

    const handleCalculate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://backendsip.vercel.app/calculate-sip', {
                monthlyInvestment: parseFloat(monthlyInvestment),
                annualInterestRate: parseFloat(annualInterestRate),
                investmentPeriodYears: parseFloat(investmentPeriodYears),
                inflationRate: parseFloat(inflationRate),
                stepUpPercentage: parseFloat(stepUpPercentage),
            });
            setResult(response.data);

            // Generate investment data for the chart
            const years = Array.from({ length: investmentPeriodYears }, (_, i) => i + 1);
            const futureValues = years.map((year) => {
                return calculateFutureValue(monthlyInvestment, annualInterestRate, year, stepUpPercentage);
            });
            setInvestmentData(futureValues);
        } catch (error) {
            console.error("Error:", error);
            // Set default results on error
            setResult({ futureValue: 0, inflationAdjustedFutureValue: 0 });
            setInvestmentData([]); // Clear investment data on error
            alert("An error occurred while calculating. Please try again.");
        }
    };

    // Helper function to calculate future value
    const calculateFutureValue = (monthlyInvestment, interestRate, years, stepUp) => {
        let totalInvestment = 0;
        const monthlyRate = interestRate / 100 / 12;

        for (let year = 1; year <= years; year++) {
            totalInvestment += monthlyInvestment * 12; // Total investment each year
            totalInvestment *= (1 + monthlyRate * 12); // Apply annual interest
            monthlyInvestment += (monthlyInvestment * stepUp / 100); // Apply step-up
        }

        return totalInvestment;
    };

    return (
        <div>
            <Header />
            <div className="App bg-gray-50 min-h-screen p-6">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column - Form */}
                    <form onSubmit={handleCalculate} className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2 space-y-4">
                        <div className="flex flex-col">
                            <div className='flex justify-between'>
                                <label className="text-gray-600 font-medium">Monthly Investment (₹):</label>
                                <input
                                    type="number"
                                    value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                                    className="border rounded-md p-2 mt-1 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                                />
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="100000"
                                step="100"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className='flex justify-between'>
                                <label className="text-gray-600 font-medium">Annual Interest Rate (%):</label>
                                <input
                                    type="number"
                                    value={annualInterestRate}
                                    onChange={(e) => setAnnualInterestRate(e.target.value)}
                                    step="0.1"
                                    className="border rounded-md p-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                    
                            <input
                                type="range"
                                min="0"
                                max="25"
                                step="0.1"
                                value={annualInterestRate}
                                onChange={(e) => setAnnualInterestRate(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className='flex justify-between'>
                            <label className="text-gray-600 font-medium">Investment Period (years):</label>
                            <input
                                type="number"
                                value={investmentPeriodYears}
                                onChange={(e) => setInvestmentPeriodYears(e.target.value)}
                                className="border rounded-md p-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="35"
                                step="1"
                                value={investmentPeriodYears}
                                onChange={(e) => setInvestmentPeriodYears(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className='flex justify-between'>
                            <label className="text-gray-600 font-medium">Inflation Rate (%):</label>
                            <input
                                type="number"
                                value={inflationRate}
                                onChange={(e) => setInflationRate(e.target.value)}
                                step="0.1"
                                className="border rounded-md p-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={inflationRate}
                                onChange={(e) => setInflationRate(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className='flex justify-between'>
                            <label className="text-gray-600 font-medium">Yearly Step-Up Percentage (%):</label>
                            <input
                                type="number"
                                value={stepUpPercentage}
                                onChange={(e) => setStepUpPercentage(e.target.value)}
                                step="0.1"
                                className="border rounded-md p-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="0.1"
                                value={stepUpPercentage}
                                onChange={(e) => setStepUpPercentage(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <button type="submit" className="bg-indigo-500 text-white font-semibold p-2 rounded-md hover:bg-indigo-600 transition">
                            Calculate
                        </button>
                    </form>

                    {/* Right Column - Results */}
                    {result && (
                        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2 space-y-4">
                            <div className="text-center">
                                <h2 className="text-lg font-semibold text-gray-700">Future Value (Without Inflation): ₹{result.futureValue || 0}</h2>
                                <h2 className="text-lg font-semibold text-gray-700 mt-2">Inflation-Adjusted Future Value: ₹{result.inflationAdjustedFutureValue || 0}</h2>
                            </div>
                            {/* Investment Graph */}
                            <InvestmentGraph investmentData={investmentData} investmentPeriodYears={investmentPeriodYears} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
