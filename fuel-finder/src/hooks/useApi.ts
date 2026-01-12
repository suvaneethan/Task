import { useState, useCallback } from 'react';

export function useApi<T>(apiFn: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiFn();
            setData(result);
        } catch (e) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [apiFn]);

    return { data, loading, error, fetchData };
}
