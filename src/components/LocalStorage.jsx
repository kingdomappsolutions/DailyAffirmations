import { useState } from 'react';

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(defaultValue);
    const setAndStoreValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    };
    return [value, setAndStoreValue];
}