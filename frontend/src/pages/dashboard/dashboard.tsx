import { useState, useRef, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Chart, ChartData, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const Dashboard = () => {
    const chartRef = useRef<Chart<"pie"> | null>(null);

    const [data] = useState({
        employees: 100,
        newEmployeesThisMonth: 10,
        totalIdeas: 50,
        approvedIdeas: 30,
        rejectedIdeas: 20,
        voteCount: 200,
        topIdeas: [
            { title: "Idea 1", votes: 15 },
            { title: "Idea 2", votes: 12 },
            { title: "Idea 3", votes: 10 },
            { title: "Idea 4", votes: 8 },
            { title: "Idea 5", votes: 6 },
        ],
        trendingIdeas: [
            { title: "Trending Idea 1", votes: 20 },
            { title: "Trending Idea 2", votes: 18 },
            { title: "Trending Idea 3", votes: 17 },
        ],
    });

    const pieData: ChartData<"pie"> = {
        labels: ["Approved Ideas", "Rejected Ideas"],
        datasets: [
            {
                data: [data.approvedIdeas, data.rejectedIdeas],
                backgroundColor: ["#4CAF50", "#F44336"],
            },
        ],
    };

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            {/* Summary Cards */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "space-between" }}>
                {/* Employee Summary */}
                <Box sx={{ flex: 1, minWidth: "280px" }}>
                    <Card>
                        <CardContent sx={{ height: 280}}>
                            <Typography variant="h6">Employees</Typography>
                            <Typography variant="h4">{data.employees}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                New this month: {data.newEmployeesThisMonth}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Idea Summary */}
                <Box sx={{ flex: 1, minWidth: "280px" }}>
                    <Card>
                        <CardContent sx={{ height: 280 }}>
                            <Typography variant="h6">Ideas</Typography>
                            <Typography variant="h4">{data.totalIdeas}</Typography>
                            <Typography variant="body2">Approved: {data.approvedIdeas}</Typography>
                            <Typography variant="body2">Rejected: {data.rejectedIdeas}</Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Vote Summary */}
                <Box sx={{ flex: 1, minWidth: "280px" }}>
                    <Card>
                        <CardContent sx={{ height: 280}}>
                            <Typography variant="h6">Votes</Typography>
                            <Typography variant="h4">{data.voteCount}</Typography>
                            <Typography variant="body2">Top 5 Ideas</Typography>
                            {data.topIdeas.map((idea, index) => (
                                <Typography key={index} variant="body2">
                                    {idea.title}: {idea.votes} votes
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4}}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">Idea Approval Status</Typography>
                    <Box sx={{ width: 300, margin: "auto" }}>
                        <Pie data={pieData} ref={chartRef} />
                    </Box>
                </Box>

                <Box sx={{ width: '100%', pl: 2}}>
                    <Typography variant="h6">Trending Ideas</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Idea Title</TableCell>
                                    <TableCell>Votes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.trendingIdeas.map((idea, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{idea.title}</TableCell>
                                        <TableCell>{idea.votes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
