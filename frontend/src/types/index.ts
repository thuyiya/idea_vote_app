enum IdeaStatus {
    Reject = 'Rejected',
    Approve = 'Approved',
    Neutral = 'Neutral'
}

type Comment = {
    _id: string,
    comment: string;
    createdAt: string
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
    comments?: Comment[]
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

export type { Idea, User, Notification, Comment }
export { IdeaStatus }