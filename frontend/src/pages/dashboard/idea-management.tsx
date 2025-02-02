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
    Snackbar,
    Alert,
    AlertColor,
    AlertPropsColorOverrides,
    Popover,
    Typography,
    List,
    ListItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Comment, Idea, IdeaStatus } from "../../types";
import { fetchIdeas, createIdea, updateIdea, deleteIdea, updateIdeaStatus } from "../../utils/ideaService";
import { Star, StarBorder } from "@mui/icons-material";
import { createVote, fetchMyVotes } from "../../utils/voteService";
import { OverridableStringUnion } from "@mui/types";

const IdeaTable = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
    const [loading, setLoading] = useState(false);
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [comment, setComment] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [voteIds, setVoteIds] = useState<string[]>([])
    const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [anchorCommentEl, setAnchorCommentEl] = useState<null | HTMLElement>(null);
    const [selectedComments, setSelectedComments] = useState<Comment[]>([]);

    const openMenuStatus = Boolean(anchorEl);
    const openComment = Boolean(anchorCommentEl);

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
        fetchVotes();
        loadIdeas();
    }, []);

    const handleCommentClick = (event: React.MouseEvent<HTMLButtonElement>, comments?: Comment[]) => {
        if (comments && comments.length > 0) {
            setAnchorCommentEl(event.currentTarget);
            setSelectedComments(comments);
        }
    };

    const handleCommentClose = () => {
        setAnchorCommentEl(null);
        setSelectedComments([]);
    };

    const fetchVotes = async () => {
        try {
            const votes = await fetchMyVotes();
            setVoteIds(votes.data.map((vote: { ideaId: string; }) => vote.ideaId));
        } catch (error) {
            console.error("Error deleting idea:", error);
        }
    };

    const handleVote = async (id: string, isAdded: boolean) => {
        try {
            const vote = await createVote(id);
            setVoteIds(prevState => !isAdded ? [...prevState, vote.data.ideaId] : prevState.filter(ideaId => ideaId !== id));
            setOpenSnackbar({ open: true, message: `Vote ${!isAdded ? 'added' : 'removed'} successfully!`, severity: !isAdded ? "success" : "info" });
        } catch (error) {
            console.error("Error deleting idea:", error);
            setOpenSnackbar({ open: true, message: "Vote removed successfully!", severity: "info" });
        }
    };

    const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>, idea: Idea) => {
        if (userRole === 'staff' || userRole === 'admin') {
            setEditingIdea(idea);
            setAnchorEl(event.currentTarget);
        }
    };

    const handleStatus = (status: IdeaStatus) => {
        setEditingIdea(prevState => prevState ? ({
            ...prevState,
            status
        }): null)
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
        try {
            if (comment && editingIdea?._id) {
                await updateIdeaStatus(editingIdea?._id, editingIdea?.status, comment);
                setIdeas(ideas.map((idea) => (idea._id === editingIdea?._id ? { ...idea, status: editingIdea?.status, comment } : idea)));
                setOpenSnackbar({ open: true, message: "Idea status updated successfully!", severity: "success" });
                setEditingIdea(null)
                setOpenCommentDialog(false);
                setComment(""); // Clear the comment input after submission
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Handle Create or Edit Idea
    const onSubmit = async (data: Idea) => {
        try {
            if (editingIdea) {
                await updateIdea(editingIdea._id, data);
                setIdeas(ideas.map((idea) => (idea._id === editingIdea._id ? { ...idea, ...data } : idea)));
                setOpenSnackbar({ open: true, message: "Idea updated successfully!", severity: "success" });
            } else {
                const response = await createIdea(data);
                setIdeas([...ideas, response.data]);
                setOpenSnackbar({ open: true, message: "Idea created successfully!", severity: "success" });
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

    const id = open ? 'popover-comments' : undefined;

    return (
        <Box>
            <Snackbar open={openSnackbar.open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpenSnackbar({ open: false, message: "", severity: "success" })}>
                <Alert severity={openSnackbar.severity as OverridableStringUnion<AlertColor, AlertPropsColorOverrides>} onClose={() => setOpenSnackbar({ open: false, message: "", severity: "success" })}>
                    {openSnackbar.message}
                </Alert>
            </Snackbar>
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
                                <TableCell>Comment</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Votes Count</TableCell>
                                <TableCell>Give Vote</TableCell>
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
                                        <Chip component={"button"} onClick={(event) => handleCommentClick(event, idea?.comments)} label={`View ${idea?.comments?.length || ""}`} />
                                        <Popover
                                            id={id}
                                            open={openComment}
                                            anchorEl={anchorCommentEl}
                                            onClose={handleCommentClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <div style={{ padding: '10px', width: '300px' }}>
                                                <Typography variant="h6" gutterBottom>
                                                    Comments
                                                </Typography>
                                                <List>
                                                    {selectedComments.map((comment) => (
                                                        <ListItem key={comment._id}>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {comment.comment} <br />
                                                                <span style={{ fontSize: '0.8em' }}>
                                                                    - {comment.createdAt}
                                                                </span>
                                                            </Typography>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        </Popover>
                                        </TableCell>
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
                                            onClick={e => handleStatusClick(e, idea)}
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
                                            <MenuItem onClick={() => handleStatus(IdeaStatus.Approve)}>{IdeaStatus.Approve}</MenuItem>
                                            <MenuItem onClick={() => handleStatus(IdeaStatus.Reject)}>{IdeaStatus.Reject}</MenuItem>
                                            <MenuItem onClick={() => handleStatus(IdeaStatus.Neutral)}>{IdeaStatus.Neutral}</MenuItem>
                                        </Menu>
                                    </TableCell>
                                    <TableCell>{idea.user?.email}</TableCell>
                                    <TableCell>{idea.voteCount}</TableCell>
                                    <TableCell>{
                                        <IconButton onClick={() => handleVote(idea._id, voteIds.includes(idea._id))}>
                                            {voteIds.includes(idea._id) ? <Star color="warning" /> : <StarBorder />}
                                        </IconButton>
                                    }</TableCell>
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
