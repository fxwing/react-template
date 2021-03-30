//倒计时 hooks
import React from 'react';
function useCount<T extends number>(defaultCount: T): [T, () => void, () => void] {
    const [count, setCount] = React.useState<T>(defaultCount);
    const timer = React.useRef<any>(null);
    function beginTimer() {
        timer.current = setInterval(() => {
            setCount((count: T) => {
                if ((count as number) === 0) {
                    endTimer();
                    return defaultCount;
                }
                (count as number) -= 1;
                return count;
            });
        }, 1000);
    }
    function endTimer() {
        clearInterval(timer.current!);
        timer.current = null;
    }
    return [count, beginTimer, endTimer];
}

export default useCount;
