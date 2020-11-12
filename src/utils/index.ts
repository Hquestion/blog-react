export function throttle(fn: Function, ms = 3000) {
    var lastTime : undefined | number = undefined;
    return function(...rest: any) {
        let now = +new Date();
        if (!lastTime) {
            console.log(lastTime);
            lastTime = now;
            fn.apply(null, rest);
            return;
        }
        if (now - lastTime > ms) {
            console.log(now - lastTime);
            lastTime = now;
            fn.apply(null, rest);
        }
    }
}
