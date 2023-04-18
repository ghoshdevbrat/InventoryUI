export interface User {
    username: string;
    token: {
        token: string;
        refreshToken: string;
    };
    roles: string[];
}
