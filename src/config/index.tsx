export interface Config {
    BASENAME?: string; // react-route  basename
    TOKEN_KEY: string; // token的标识
    TOKEN_EXPIRES: number; // token过期时间(天)
    USER_LOCAL_KEY: string; // localStorage 的用户信息key
}

export const config: Config = {
    BASENAME: '',
    TOKEN_KEY: 'ADMIN_TOKEN_KEY',
    TOKEN_EXPIRES: 7,
    USER_LOCAL_KEY: 'USER_LOCAL_KEY'
};
