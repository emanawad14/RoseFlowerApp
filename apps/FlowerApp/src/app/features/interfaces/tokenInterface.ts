export interface TokenInterface{
    TOKEN_KEY :string;
    setToken(token: string): void ;
    getToken(): string | null;
    removeToken(): void ;
}