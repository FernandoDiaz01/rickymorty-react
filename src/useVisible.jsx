/* import { useEffect, useState, useRef } from "react";

export const useVisible = (visorRef) => {
    const [visible, setVisible] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const { current } = visorRef;

        const cbFunction = (entries) => {
            const [entry] = entries;
            setVisible(entry.isIntersecting);
        };

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        };

        observerRef.current = new IntersectionObserver(cbFunction, options);

        if (current) observerRef.current.observe(current);

        return () => {
            if (current) observerRef.current.disconnect();
        };

    }, [visorRef.current]);

    return { visible };
};
 */