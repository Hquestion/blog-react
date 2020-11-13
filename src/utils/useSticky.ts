import { useEffect } from 'react';
import {throttle} from "./index";

export default function useSticky(ref: any, top: number) {
    useEffect(() => {
        let isSticky = false;
        let offsetTop = (ref && ref.current && ref.current.offsetTop) || 0;
        const onScroll = throttle(() => {
            if (ref && ref.current) {
                if (window.scrollY >= offsetTop) {
                    if (!isSticky) {
                        ref.current.style.position = 'fixed';
                        ref.current.style.top = top + 'px';
                        isSticky = true;
                    }
                } else {
                    if (isSticky) {
                        ref.current.style.position = 'static';
                        ref.current.style.top = 'none';
                        isSticky = false;
                    } else {
                        offsetTop = ref.current.offsetTop;
                    }
                }
            }
        }, 50);
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
    }, []);
}
