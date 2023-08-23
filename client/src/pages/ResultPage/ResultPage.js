import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuizService from "./../../services/quizService";

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import './ResultPage.css'
import ResultLoader from "../../components/ResultLoader/ResultLoader";

export default function ResultPage() {

    const [isloading, setIsLoading] = useState(false)

    const data = [
        { name: 'Total Marks', marks: 20, fill: '#8884d8' },
        { name: 'Your Marks', marks: 5, fill: '#82ca9d' },
    ];


    const urlParts = window.location.pathname.split("/");
    let quizId = urlParts[urlParts.length - 1];

    const [resultData, setResultData] = useState()
    let answers = useSelector(state => state.results.result)
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        setIsLoading(true)

        const fetchResult = async () => {
            let quizResultData = await QuizService.calculateResult(quizId, answers)

            setResultData(quizResultData)
            setIsLoading(false)

        }
        fetchResult()
    }, [])

    return (
        <>

            {isloading && <ResultLoader/>}


            {resultData &&
                <main>
                    <div className="section-heading">Summary</div>
                    <div className="result-overall-container">

                        <div className="result-card">
                            <div className="card-data-value">{resultData.totalQuestions}</div>
                            <div className="card-data-tag">Total Questions</div>
                        </div>

                        <div className="result-card">
                            <div className="card-data-value">{resultData.score}</div>
                            <div className="card-data-tag">Total Score</div>
                        </div>

                        <div className="result-card result-card-chart">
                            <div>
                                <div className="card-data-value">{resultData.score}</div>
                                <div className="card-data-tag">Your Score</div>
                            </div>
                        </div>
                    </div>

                    <div className="section-heading">Detail Analysis</div>
                    <div className="result-overall-container">
                        <div className="result-card">
                            <div className="card-data-value">{resultData.totalQuestions}</div>
                            <div className="card-data-tag">Correct Answer</div>
                        </div>

                        <div className="result-card">
                            <div className="card-data-value">{resultData.totalQuestions}</div>
                            <div className="card-data-tag">Incorrect Answer</div>
                        </div>

                        <div className="result-card">
                            <PieChart width={200} height={200}>
                                <Pie data={data} dataKey="marks" outerRadius={100} label={renderCustomizedLabel} labelLine={false} >
                                    <Cell key="total-marks" fill="#8884d8" />
                                    <Cell key="your-marks" fill="#82ca9d" />
                                </Pie>
                            </PieChart>
                        </div>
                    </div>



                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Question</TableCell>
                                    <TableCell align="center">Correct Answer</TableCell>
                                    <TableCell align="center">Your Answer</TableCell>
                                    <TableCell align="center">Status</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {resultData.quizArr.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell  align="center"> {row.question}</TableCell>
                                        <TableCell align="center">{row.correctAnswer}</TableCell>
                                        <TableCell align="center">{row.selectedAnswer}</TableCell>
                                        <TableCell align="center">{row.status}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </main>
            }


        </>
    )
}