import { useEffect, useRef } from 'react';
/**
 *
 * @param {func} updaterFunction The function to be executed repeatdly in the given delay
 * @param {number} delay
 */
export default function useInterval(updaterFunction, delay) {
    const updaterRef = useRef();

    useEffect(() => {
        updaterRef.current = updaterFunction;
    }, [updaterFunction]);

    useEffect(() => {
        const updater = () => {
            updaterRef.current();
        }
        if (delay !== null) {
            let id = setInterval(updater, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
