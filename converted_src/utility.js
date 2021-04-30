"use strict";
// eslint-disable-next-line @typescript-eslint/ban-types
function getMethods(obj) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const getOwnMethods = (obj) => Object.entries(Object.getOwnPropertyDescriptors(obj))
        .filter(([name, { value }]) => typeof value === 'function' && name !== 'constructor')
        .map(([name]) => name);
    // eslint-disable-next-line @typescript-eslint/ban-types
    const _getMethods = (o, methods) => o === Object.prototype ? methods : _getMethods(Object.getPrototypeOf(o), methods.concat(getOwnMethods(o)));
    return _getMethods(obj, []);
}
//# sourceMappingURL=utility.js.map