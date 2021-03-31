export function stringify(data: string): string {
    return JSON.stringify(data);
}

interface ParseResult {
    [propName: string]: any;
}
export function parse<T = ParseResult>(data: string): T | null {
    try {
        return JSON.parse(data) as T;
    } catch (error) {
        return null;
    }
}

interface LocalStore {
    setValue(key: string, value: any): LocalStore;
    getValue<T>(key: string, defaultValue?: T): T | null;
    removeValue(key: string): LocalStore;
}
//  localStorage  方法封装
export const localStore: LocalStore = {
    setValue(key: string, data: any): LocalStore {
        localStorage.setItem(key, stringify(data));
        return this;
    },
    getValue<T = any>(key: string, defaultValue?: T): T | null {
        const value = localStorage.getItem(key);
        if (!value) return defaultValue || null;
        const data = parse<T>(value);
        return data;
    },
    removeValue(key: string): LocalStore {
        localStorage.removeItem(key);
        return this;
    }
};
