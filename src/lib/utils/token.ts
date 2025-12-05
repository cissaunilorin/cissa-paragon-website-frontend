import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken(): void {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isTokenExpired(): boolean {
    const token = getAccessToken();
    if (!token) {
        return true;
    }

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch {
        return true;
    }
}
