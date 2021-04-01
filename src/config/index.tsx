// 常量的控制用大写

// 菜单栏位置
const layoutArr: Array<string> = ['side', 'top'];

export interface Config {
    BASENAME?: string; // react-route  basename
    TOKEN_KEY: string; // token的标识
    TOKEN_EXPIRES: number; // token过期时间(天)
    USER_LOCAL_KEY: string; // 用户信息 localStorage 的key
    SETTING_LOCAL_KEY: string; // setting localStorage的key
    layout: typeof layoutArr[number]; //  菜单栏位置
}

export const config: Config = {
    BASENAME: '',
    TOKEN_KEY: 'ADMIN_TOKEN_KEY',
    TOKEN_EXPIRES: 7,
    USER_LOCAL_KEY: 'USER_LOCAL_KEY',
    SETTING_LOCAL_KEY: 'SETTING_LOCAL_KEY',
    layout: 'side'
};
