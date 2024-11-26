class SessionCache {

    set(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get<T>(key: string): T | null {
        const value = sessionStorage.getItem(key);
        return value
            ? JSON.parse(value)
            : null;
    }

    remove(key: string) {
        sessionStorage.removeItem(key);
    }

    removeAll(keys: string[]) {
        keys.forEach(key => sessionStorage.removeItem(key));
    }

    hasItem(key: string) {
        return !!sessionStorage.getItem(key)
    }
}

export const sessionCache = new SessionCache();