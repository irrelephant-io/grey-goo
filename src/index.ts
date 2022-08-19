import { GameLoop, init, Sprite } from 'kontra';
import { setupCanvas } from './game/canvas';
import { Celestial } from './game/entities/celestical';
let { canvas } = init();

setupCanvas(canvas);

const celestials : any[] = [
    Celestial({celestialName: "Earth", radius: 100, x: 500, y: 500}),
    Celestial({celestialName: "Jupiter", radius: 200, x: 100, y: 100}),
    Celestial({celestialName: "Mars", radius: 80, x: 300, y: 350})
]

const loop = GameLoop({
    update: () => {
        celestials.forEach(it => it.update());
    },
    render: () => {
        celestials.forEach(it => it.render());
    }
});

loop.start();