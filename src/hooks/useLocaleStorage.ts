import { useEffect, useState } from "react"

export const useLocaleStorage = <T>(key: string): readonly [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
    const [value, setValue] = useState<T | null>(localStorage.getItem(key) as T ?? null);

    useEffect(() => {
        const result = localStorage.getItem(key);
        if (!result) return;
        setValue(result.match(/\d+/)?.[0] as T ?? null);
    }, [key])

    useEffect(() => {
        if (!value) return;
        localStorage.setItem(key, value.toString());
    }, [key, value]);

    return [value, setValue] as const;
}