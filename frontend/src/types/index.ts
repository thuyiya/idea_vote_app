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
    role: string;
    createdAt: string;
};

export type { Idea, User }
export { IdeaStatus }