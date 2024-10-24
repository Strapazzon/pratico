export const BrowserStorage = {
  get: <T>(key: string): T | null => {
    if (typeof localStorage === "undefined") return null;

    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  },

  set: <T>(key: string, value: T): void => {
    if (typeof localStorage === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  },
};
