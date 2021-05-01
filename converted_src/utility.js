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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3REFBd0Q7QUFDeEQsU0FBUyxVQUFVLENBQUMsR0FBVztJQUMzQix3REFBd0Q7SUFDeEQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFVBQVUsSUFBSSxJQUFJLEtBQUssYUFBYSxDQUFDO1NBQ2xGLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlCLHdEQUF3RDtJQUN4RCxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQVMsRUFBRSxPQUFpQixFQUFZLEVBQUUsQ0FDM0QsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlHLE9BQU8sV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUMvQixDQUFDIn0=