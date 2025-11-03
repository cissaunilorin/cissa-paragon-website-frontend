import apiClient from "./api";
import { setAccessToken } from "./utils/token";

export interface UserData {
    id: string;
    username: string;
    email: string;
}

export async function login(
    email: string,
    password: string
): Promise<UserData | undefined> {
    try {
        const response = await apiClient.post("/auth/login", {
            email,
            password,
        });

        const { access_token, data } = response.data;
        setAccessToken(access_token);

        return data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            throw new Error("Invalid email or password");
        }
        throw error;
    }
}

export async function logout(): Promise<void> {
    // Clear tokens from storage
    localStorage.removeItem("access_token");
}

export async function getCurrentUser(): Promise<UserData | undefined> {
    try {
        const response = await apiClient.get("/auth/user");
        return response.data.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new Error("Unauthorized");
        }
        throw error;
    }
}
