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
import { getAllEmployees, getLastMonthEmployees } from "../../utils/userService";
import { fetchIdeas, fetchIdeasByStatus } from "../../utils/ideaService";
import { IdeaStatus } from "../../types";
import { fetchBestVoteIdeas, fetchVotes } from "../../utils/voteService";

Chart.register(...registerables);

type DashboardData = {
    employees: number;
    newEmployeesThisMonth: number;
    totalIdeas: number;
    approvedIdeas: number;
    rejectedIdeas: number;
    voteCount: number;
    topIdeas: { title: string; votes: number }[];  // Array of top ideas, each with a title and votes
};

const Dashboard = () => {
    const chartRef = useRef<Chart<"pie"> | null>(null);

    const [data, setData] = useState<DashboardData>({
        employees: 0,
        newEmployeesThisMonth: 0,
        totalIdeas: 0,
        approvedIdeas: 0,
        rejectedIdeas: 0,
        voteCount: 0,
        topIdeas: []
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

    const fetchEmployeeCount = async () => {
        try {
            const employeeData = await getAllEmployees();
            setData((prevData) => ({
                ...prevData,
                employees: employeeData.data.length,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const fetchLastMothEmployeeCount = async () => {
        try {
            const employeeData = await getLastMonthEmployees();
            setData((prevData) => ({
                ...prevData,
                newEmployeesThisMonth: employeeData.data.length,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const fetchAllIdeas = async () => {
        try {
            const ideas = await fetchIdeas();
            setData((prevData) => ({
                ...prevData,
                totalIdeas: ideas.data.length,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const fetchApprovedIdeas = async () => {
        try {
            const ideas = await fetchIdeasByStatus(IdeaStatus.Approve);
            setData((prevData) => ({
                ...prevData,
                approvedIdeas: ideas.data.length,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const fetchRejectIdeas = async () => {
        try {
            const ideas = await fetchIdeasByStatus(IdeaStatus.Reject);
            setData((prevData) => ({
                ...prevData,
                rejectedIdeas: ideas.data.length,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const fetchAllVotes = async () => {
        try {
            const votes = await fetchVotes();
            setData((prevData) => ({
                ...prevData,
                voteCount: votes.data.length,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const fetchAllBestVoteIdeas = async () => {
        try {
            const votes = await fetchBestVoteIdeas();

            console.log("votes.data ", votes.data)

            setData((prevData) => ({
                ...prevData,
                topIdeas: votes.data,  // Assuming the API returns an array of employees
            }));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    useEffect(() => {
        fetchEmployeeCount();
        fetchLastMothEmployeeCount();
        fetchAllIdeas()
        fetchApprovedIdeas()
        fetchRejectIdeas()
        fetchAllVotes()
        fetchAllBestVoteIdeas()
    }, []); // Empty dependency array ensures that this effect runs only once

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();  // Update chart when data changes
        }
    }, [data]);

    return (
        <Box sx={{ padding: 3 }}>
            {/* Summary Cards */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "space-between" }}>
                {/* Employee Summary */}
                <Box sx={{ flex: 1, minWidth: "280px" }}>
                    <Card>
                        <CardContent sx={{ height: 280 }}>
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
                        <CardContent sx={{ height: 280 }}>
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

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">Idea Approval Status</Typography>
                    <Box sx={{ width: 300, margin: "auto" }}>
                        {data && (
                            <Pie data={pieData} ref={chartRef} />
                        )}
                    </Box>
                </Box>

                <Box sx={{ width: '100%', pl: 2 }}>
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
                                {data.topIdeas.map((idea, index) => (
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
