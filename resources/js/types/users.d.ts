type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

type Users = {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};
