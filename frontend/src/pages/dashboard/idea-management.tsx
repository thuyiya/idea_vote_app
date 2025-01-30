import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Toolbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Idea } from "../../types";

const initialIdeas: Idea[] = [
    {
        id: "1",
        title: "New Feature Request",
        description: "Implement a dark mode for the app",
        status: "Approve",
        userId: "user123",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date(),
        approvedUserIds: ["user456"],
    },
    {
        id: "2",
        title: "Bug Fix",
        description: "Fix login issue on mobile",
        status: "Reject",
        userId: "user789",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date(),
        approvedUserIds: [],
    },
];

const IdeaTable = () => {
    const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [editingIdea, setEditingIdea] = useState<Idea | null>(null);

    const { register, handleSubmit, reset } = useForm<Idea>();

    const handleOpen = (idea: Idea | null) => {
        setEditingIdea(idea);
        setOpen(true);
        reset(idea || {}); 
    };

    const handleClose = () => {
        setOpen(false);
        setEditingIdea(null);
        reset();
    };

    const onSubmit = (data: Idea) => {
        if (editingIdea) {
            setIdeas(
                ideas.map((idea) =>
                    idea.id === editingIdea.id ? { ...idea, ...data, updatedAt: new Date() } : idea
                )
            );
        } else {
            const newIdea: Idea = {
                ...data,
                id: Date.now().toString(),
                createdAt: new Date().toLocaleDateString(),
                updatedAt: new Date(),
            };
            setIdeas([...ideas, newIdea]);
        }
        handleClose();
    };

    const handleDelete = (id: string) => {
        setIdeas(ideas.filter((idea) => idea.id !== id));
    };

    const filteredIdeas = ideas.filter((idea) => idea.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Box>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                    label="Search by Title"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                    Create Idea
                </Button>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIdeas.map((idea) => (
                            <TableRow key={idea.id}>
                                <TableCell>{idea.title}</TableCell>
                                <TableCell>{idea.description}</TableCell>
                                <TableCell>{idea.createdAt}</TableCell>
                                <TableCell>{idea.status}</TableCell>
                                <TableCell>{idea.userId}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(idea)}>
                                        <Edit color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(idea.id)}>
                                        <Delete color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create/Edit Idea Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth={true} >
                <DialogTitle>{editingIdea ? "Edit Idea" : "Create Idea"}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField label="Title" {...register("title", { required: true })} fullWidth />
                        <TextField label="Description" {...register("description", { required: true })} fullWidth />
                        <TextField label="User ID" {...register("userId", { required: true })} fullWidth />
                        <Select {...register("status", { required: true })} fullWidth defaultValue="Nural">
                            <MenuItem value="Approve">Approve</MenuItem>
                            <MenuItem value="Reject">Reject</MenuItem>
                            <MenuItem value="Nural">Neutral</MenuItem>
                        </Select>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                        {editingIdea ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default IdeaTable;
