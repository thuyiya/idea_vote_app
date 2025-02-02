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
import { Lightbulb, People, ThumbUp } from "@mui/icons-material";

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


    console.log(data)

    return (
        <Box sx={{ padding: 3 }}>
            {/* Summary Cards */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 3,
                    mt: 3,
                }}
            >
                {/* Employees Card */}
                <Box sx={{ flex: 1, minWidth: 280 }}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #42a5f5, #1976d2)",
                            color: "white",
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "transform 0.3s ease",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    >
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: "center", height: 200 }}>
                            
                            <Box>
                                <People sx={{ fontSize: 50, mb: 1 }} />
                                <Typography variant="h4">Employees</Typography>
                                <Typography variant="h4">{data.employees}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    
                                <Typography variant="h6">
                                    New this month: <strong>{data.newEmployeesThisMonth}</strong>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Ideas Card */}
                <Box sx={{ flex: 1, minWidth: 280 }}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #66bb6a, #2e7d32)",
                            color: "white",
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "transform 0.3s ease",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    >
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: "center", height: 200 }}>
                           <Box>
                                <Lightbulb sx={{ fontSize: 50, mb: 1 }} />
                                <Typography variant="h4">Ideas</Typography>
                                <Typography variant="h4">{data.totalIdeas}</Typography>
                           </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Approved: <strong>{data.approvedIdeas}</strong></Typography>
                                <Typography variant="h6">Rejected: <strong>{data.rejectedIdeas}</strong></Typography>
                            </Box>
                           
                        </CardContent>
                    </Card>
                </Box>

                {/* Votes Card */}
                <Box sx={{ flex: 1, minWidth: 280 }}>
                    <Card
                        sx={{
                            background: "linear-gradient(135deg, #ff9800, #e65100)",
                            color: "white",
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "transform 0.3s ease",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    >
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: "center", height: 200 }}>
                            <Box>
                            <ThumbUp sx={{ fontSize: 50, mb: 1 }} />
                                <Typography variant="h4">Votes</Typography>
                                <Typography variant="h4">{data.voteCount}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Top 5 Ideas:</Typography>
                                {data.topIdeas.slice(0, 3).map((idea, index) => (
                                    <Typography key={index} variant="body2">
                                        {idea.title}: <strong>{idea.votes} votes</strong>
                                    </Typography>
                                ))}
                            </Box>
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
