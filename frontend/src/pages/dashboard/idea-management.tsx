import { useEffect, useState } from "react";
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
    CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Idea } from "../../types";
import { fetchIdeas, createIdea, updateIdea, deleteIdea } from "../../utils/ideaService";

const IdeaTable = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm<Idea>();

    // Fetch all ideas from API
    useEffect(() => {
        const loadIdeas = async () => {
            setLoading(true);
            try {
                const response = await fetchIdeas();
                setIdeas(response.data);
            } catch (error) {
                console.error("Error fetching ideas:", error);
            } finally {
                setLoading(false);
            }
        };

        loadIdeas();
    }, []);

    // Open modal for Create/Edit
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

    // Handle Create or Edit Idea
    const onSubmit = async (data: Idea) => {
        try {
            if (editingIdea) {
                await updateIdea(editingIdea._id, data);
                setIdeas(ideas.map((idea) => (idea._id === editingIdea._id ? { ...idea, ...data } : idea)));
            } else {
                const response = await createIdea(data);
                setIdeas([...ideas, response.data]);
            }
            handleClose();
        } catch (error) {
            console.error("Error saving idea:", error);
        }
    };

    // Handle Delete Idea
    const handleDelete = async (id: string) => {
        try {
            await deleteIdea(id);
            setIdeas(ideas.filter((idea) => idea._id !== id));
        } catch (error) {
            console.error("Error deleting idea:", error);
        }
    };

    // Search filter
    const filteredIdeas = ideas.filter((idea) =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
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
                                <TableRow key={idea._id}>
                                    <TableCell>{idea.title}</TableCell>
                                    <TableCell>{idea.description}</TableCell>
                                    <TableCell>{idea.createdAt}</TableCell>
                                    <TableCell>{idea.status}</TableCell>
                                    <TableCell>{idea.userId}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(idea)}>
                                            <Edit color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(idea._id)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Create/Edit Idea Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{editingIdea ? "Edit Idea" : "Create Idea"}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField label="Title" {...register("title", { required: true })} fullWidth />
                        <TextField label="Description" {...register("description", { required: true })} fullWidth />
                        <TextField label="User ID" {...register("userId", { required: true })} fullWidth />
                        <Select {...register("status", { required: true })} fullWidth defaultValue="Neutral">
                            <MenuItem value="Approve">Approve</MenuItem>
                            <MenuItem value="Reject">Reject</MenuItem>
                            <MenuItem value="Neutral">Neutral</MenuItem>
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
