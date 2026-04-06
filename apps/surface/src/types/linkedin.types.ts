export type LinkedInStatus = 
    | {status: "loading"}
    | {status: "not_connected"}
    | {status: "expired"; profile: Profile; expiredAt: string;}
    | {status: "connected"; profile: Profile; token: TokenInfo;}

export interface Profile {
    name: string;
    avatarUrl?: string;
}

export interface TokenInfo {
    expiresAt: string;
    percentRemaining: number;
}