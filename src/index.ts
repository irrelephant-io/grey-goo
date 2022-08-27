import { GameLoop, init, Sprite } from 'kontra';
import { setupCanvas } from './game/canvas';
import { Celestial, CelestialClass } from './game/entities/celestical';
import { Swarm, SwarmClass } from './game/entities/swarm';
import { DebugDisplay } from './game/ui/debug';

let { canvas } = init();

setupCanvas(canvas);

const celestials : CelestialClass[] = [
    Celestial({
        celestialName: "Earth",
        mass: 5.972e+27,
        massAvailability: 0.7,
        radius: 100, x: 500, y: 500
    }),
    Celestial({
        celestialName: "Jupiter",
        mass: 1.898e+30,
        massAvailability: 0.1,
        radius: 200, x: 100, y: 100
    }),
    Celestial({
        celestialName: "Mars",
        mass: 6.417e+26,
        massAvailability: 1.0,
        radius: 80, x: 300, y: 350
    })
];
const swarms: SwarmClass[] = [
    Swarm({ mass: 1, stationedAt: celestials[2] })
];


const debugDisplay = DebugDisplay({ trackedSwarms: swarms, updateDelay: 30 });

const loop = GameLoop({
    update: (dt) => {
        celestials.forEach(it => it.update(dt));
        swarms.forEach(it => it.update(dt));
    },
    render: () => {
        celestials.forEach(it => it.render());
        swarms.forEach(it => it.render());
        debugDisplay.render();
    }
});

loop.start();
