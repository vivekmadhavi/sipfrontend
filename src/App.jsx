// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [investmentPeriodYears, setInvestmentPeriodYears] = useState('');
    const [inflationRate, setInflationRate] = useState('');
    const [stepUpPercentage, setStepUpPercentage] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = async (e) => {
        e.preventDefault();

        if (!monthlyInvestment || !annualInterestRate || !investmentPeriodYears || !inflationRate || !stepUpPercentage) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post('https://backendsip.vercel.app/calculate-sip', {
                monthlyInvestment: parseFloat(monthlyInvestment),
                annualInterestRate: parseFloat(annualInterestRate),
                investmentPeriodYears: parseFloat(investmentPeriodYears),
                inflationRate: parseFloat(inflationRate),
                stepUpPercentage: parseFloat(stepUpPercentage),
            });

            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while calculating. Please try again.");
        }
    };

    return (
        <div className="App">
            <h1>SIP Calculator with Inflation and Step-Up Adjustments</h1>
            <form onSubmit={handleCalculate}>
                <div>
                    <label>Monthly Investment (₹):</label>
                    <input
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Annual Interest Rate (%):</label>
                    <input
                        type="number"
                        value={annualInterestRate}
                        onChange={(e) => setAnnualInterestRate(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>

                <div>
                    <label>Investment Period (years):</label>
                    <input
                        type="number"
                        value={investmentPeriodYears}
                        onChange={(e) => setInvestmentPeriodYears(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Inflation Rate (%):</label>
                    <input
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>

                <div>
                    <label>Yearly Step-Up Percentage (%):</label>
                    <input
                        type="number"
                        value={stepUpPercentage}
                        onChange={(e) => setStepUpPercentage(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>

                <button type="submit">Calculate</button>
            </form>

            {result && (
                <div>
                    <h2>Future Value (Without Inflation): ₹{result.futureValue}</h2>
                    <h2>Inflation-Adjusted Future Value: ₹{result.inflationAdjustedFutureValue}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
