import { useEffect, useState } from "react"

export const useLocaleStorage = <T>(key: string): readonly [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
    const [value, setValue] = useState<T>();

    useEffect(() => {
        const result = localStorage.getItem(key);
        if (!result) return;
        try {
            setValue(JSON.parse(result) as T);
        } catch {
            setValue(result as T);
        }
    }, [key])

    useEffect(() => {
        if (!value) return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}