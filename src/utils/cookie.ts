import Cookies from 'js-cookie';
import { config } from '@config/index';

const { TOKEN_KEY, TOKEN_EXPIRES } = config;

export const setToken: (token: string) => void = (token: string) =>
    Cookies.set(TOKEN_KEY, token, { expires: TOKEN_EXPIRES });

export const getToken: () => string = () => Cookies.get(TOKEN_KEY) || '';

export const removeToken: () => void = () => Cookies.remove(TOKEN_KEY);
