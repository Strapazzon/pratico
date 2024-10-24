export const BrowserStorage = {
  get: <T>(key: string): T | undefined => {
    if (typeof localStorage === "undefined") return;

    const item = localStorage.getItem(key);
    if (!item) return;
    return JSON.parse(item);
  },

  set: <T>(key: string, value: T): void => {
    if (typeof localStorage === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  },

  clear: (): void => {
    if (typeof localStorage === "undefined") return;
    localStorage.clear();
  },

  delete: (key: string): void => {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(key);
  },
};
