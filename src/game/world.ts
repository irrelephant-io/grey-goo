import { CelestialClass } from './entities/celestical';

export interface TravelPath {
    // Display point for the origin of the path
    origin: { x: number, y: number },
  
    // Display point for the destination of the path
    destination: { x: number, y: number },
  
    // Distance to travel in meters/km/ any other unit of measurment that would make sense
    distance: number
}

export class Galaxy {
    private map: any;

    constructor(celestials: CelestialClass[]) {
        // TODO: auto generate instead of hard-coding
        this.map = {
            "EarchMars": 147.85,
            "MarsJupiter": 462.12,
            "EarthJupiter": 609.97
        };
    }

    getPath(from: CelestialClass, to: CelestialClass) : TravelPath {
        return{
            origin: { x: from.x, y: from. y },
            destination: { x: to.x, y: to.y },
            distance:
                this.map[`${from.celestialName}${to.celestialName}`] ||
                this.map[`${from.celestialName}${to.celestialName}`]
        }; 
    }
}
