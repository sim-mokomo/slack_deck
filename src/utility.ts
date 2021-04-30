// eslint-disable-next-line @typescript-eslint/ban-types
function getMethods(obj: object) : string[] {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const getOwnMethods = (obj: object) =>
        Object.entries(Object.getOwnPropertyDescriptors(obj))
            .filter(([name, {value}]) => typeof value === 'function' && name !== 'constructor')
            .map(([name]) => name)
    // eslint-disable-next-line @typescript-eslint/ban-types
    const _getMethods = (o: object, methods: string[]): string[] =>
        o === Object.prototype ? methods : _getMethods(Object.getPrototypeOf(o), methods.concat(getOwnMethods(o)))
    return _getMethods(obj, [])
}