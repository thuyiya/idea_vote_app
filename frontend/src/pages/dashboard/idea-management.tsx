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
    IconButton,
    CircularProgress,
    Chip,
    MenuItem,
    Menu,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Idea, IdeaStatus } from "../../types";
import { fetchIdeas, createIdea, updateIdea, deleteIdea, updateIdeaStatus } from "../../utils/ideaService";

const IdeaTable = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
    const [loading, setLoading] = useState(false);
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [comment, setComment] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenuStatus = Boolean(anchorEl);

    const { register, handleSubmit, reset } = useForm<Idea>();

    const userRole = localStorage.getItem('role')

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

    const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (userRole === 'staff' || userRole === 'admin') {
            setAnchorEl(event.currentTarget);
        }
    };
    
    const handleStatus = (idea: Idea, status: IdeaStatus) => {
        setEditingIdea({ ...idea, status })
        setOpenCommentDialog(true);
        handleStatusClose()
    };

    const handleStatusClose = () => {
        setAnchorEl(null);
    };

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

    const handleCommentSubmit = async () => {
        if (comment && editingIdea?._id) {
            try {
                await updateIdeaStatus(editingIdea?._id, editingIdea?.status, comment );
                setIdeas(ideas.map((idea) => (idea._id === editingIdea?._id ? { ...idea, status: editingIdea?.status, comment } : idea)));
            } catch (error) {
                console.error("Error updating status:", error);
            }
            setEditingIdea(null)
            setOpenCommentDialog(false);
            setComment(""); // Clear the comment input after submission
        }
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
                                <TableCell>Email</TableCell>
                                <TableCell>Votes</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredIdeas.map((idea) => (
                                <TableRow key={idea._id}>
                                    <TableCell>{idea.title}</TableCell>
                                    <TableCell>{idea.description}</TableCell>
                                    <TableCell>{idea.createdAt}</TableCell>
                                    <TableCell>
                                        <Chip
                                            component="button" 
                                            label={idea.status}
                                            color={
                                                idea.status === IdeaStatus.Reject
                                                    ? "error"
                                                    : idea.status === IdeaStatus.Approve
                                                        ? "success"
                                                        : "default"
                                            }
                                            sx={{
                                                fontWeight: "bold",
                                                textTransform: "capitalize",
                                            }}
                                            onClick={handleStatusClick}
                                        />
                                        <Menu
                                            id="status-menu"
                                            anchorEl={anchorEl}
                                            open={openMenuStatus}
                                            onClose={handleStatusClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleStatus(idea, IdeaStatus.Approve)}>{IdeaStatus.Approve}</MenuItem>
                                            <MenuItem onClick={() => handleStatus(idea, IdeaStatus.Reject)}>{IdeaStatus.Reject}</MenuItem>
                                            <MenuItem onClick={() => handleStatus(idea, IdeaStatus.Neutral)}>{IdeaStatus.Neutral}</MenuItem>
                                        </Menu>
                                    </TableCell>
                                    <TableCell>{idea.voteCount}</TableCell>
                                    <TableCell>{idea.user?.email}</TableCell>
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

            {/* Comment Dialog for Status Update */}
            <Dialog open={openCommentDialog} onClose={() => setOpenCommentDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Provide a Comment for {editingIdea?.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCommentDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleCommentSubmit()} variant="contained" color="primary">
                        Submit Comment
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default IdeaTable;
