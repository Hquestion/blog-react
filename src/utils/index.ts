export function throttle(fn: Function, ms = 3000) {
    var lastTime : undefined | number = undefined;
    return function(...rest: any) {
        let now = +new Date();
        if (!lastTime) {
            lastTime = now;
            fn.apply(null, rest);
            return;
        }
        if (now - lastTime > ms) {
            lastTime = now;
            fn.apply(null, rest);
        }
    }
}

export function debounce(fn: Function, ms = 500) {
    var interval : any = undefined;
    return function(...rest: any) {
        clearTimeout(interval);
        interval = setTimeout(() => {
            fn.apply(null, rest);
        }, ms);
    }
}
