enum IdeaStatus {
    Reject = 'Rejected',
    Approve = 'Approved',
    Neutral = 'Neutral'
}

type Idea = {
    _id: string;
    title: string;
    description: string;
    status: IdeaStatus;
    userId: string;
    user?: {
        _id: string,
        email: string
    };
    createdAt: string; // Use string to store formatted date
    updatedAt: Date;
    approvedUserIds: string[];
    voteCount?: number;
};

type User = {
    _id: string;
    name: string;
    email: string;
    username: string;
    password?: string; 
    role: string;
    createdAt: string;
};

type Notification = {
    _id: string;
    title: string;
    description: string;
    sender: string;
    ideaId?: string;
    voteId?: string;
    createdAt: string;
    status: "Read" | "Not-Read";
};

export type { Idea, User, Notification }
export { IdeaStatus }