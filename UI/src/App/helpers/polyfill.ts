enum Browser {
    IE = 1,
    Edge = 2,
    Other = 3,
}
/** Detect current executed browser. */
const detectBrowser  = () => {
    const ua = window.navigator.userAgent;

    //
    // IE 10 or older => return version number
    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return {
            browser: Browser.IE,
            version: parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10),
        }
    }
    //
    // IE 11 => return version number
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        const rv = ua.indexOf('rv:');
        return {
            browser: Browser.IE,
            version: parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10),
        }
    }
    //
    // Edge (IE 12+) => return version number
    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return {
            browser: Browser.Edge,
            version: parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10),
        };
    }

    // Other browser
    return { browser: Browser.Other, version: 0 };
};

/** Get correct polyfill cdnjs for currenct executed browser. */
const getPolyfill = (force: boolean) => {
    if (force) {
        return 'https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.11/core.js';
    } else {
        const browser = detectBrowser();
        switch (browser.browser) {
            case Browser.IE:
                console.log('include https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.11/core.js');
                return 'https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.11/core.js';
        }
        return false;
    }
};

/** Check if need load polyfill */
const waitForLoadPolyfill = (callback: () => void) => {
    if (!window.Promise) {
        setTimeout(function () {
            waitForLoadPolyfill(callback);
        }, 1000);
    } else {
        callback();
    }
};

export function loadPolyfill(callback: () => void, force: boolean = false) {
    const cdns = getPolyfill(force);
    if (cdns) {
        const element = document.createElement('script');
        const head = document.getElementsByTagName('head')[0];

        element.setAttribute('src', cdns);
        head.appendChild(element);
    }
    waitForLoadPolyfill(callback);
}