
export interface LoginInputs{
    username: string;
    password: string;
}

export interface RegisterInputs{
    username: string;
    email: string;
    password: string;
    name: string;
}

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    // avatar?: string;
    role?: string;
    token?: string;
}

export interface AuthContextType{
    currentUser: User | null;
    login: (inputs: LoginInputs) => Promise<void>;
    logout?: () => void;
    register?: (inputs: RegisterInputs) => Promise<void>;
}