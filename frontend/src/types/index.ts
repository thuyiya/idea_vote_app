type Idea = {
    id: string;
    title: string;
    description: string;
    status: "Reject" | "Approve" | "Nural";
    userId: string;
    createdAt: string; // Use string to store formatted date
    updatedAt: Date;
    approvedUserIds: string[];
};

type User = {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
};

export type { Idea, User }