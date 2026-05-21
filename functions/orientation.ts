


export function getNextPoint(position : {latitude : number; longitude: number}) : {latitude : number; longitude: number} {
    const distance = 0.025;
    return {
        longitude: position.longitude + (Math.random() - 0.5) * distance,
        latitude: position.latitude + (Math.random() - 0.5) * distance,
    };
}