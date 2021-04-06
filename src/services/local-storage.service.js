export const getItem = (key) => {
    const raw = localStorage.getItem(key);
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
};

export const setItem = (key, obj) => {
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
        return null;
    }
};
