import { Sprite, SpriteClass } from "kontra";
import { theme } from "../../resource/theme";

type SwarmProps = {
    mass: number,
    stationedAt: CelestialClass|null,
} & Partial<Parameters<typeof Sprite>[0]>;

export class SwarmClass extends SpriteClass {
    private mass: string;
    private stationedAt: CelestialClass|null;
    
    constructor(props: Partial<SwarmProps>) {
        super(props);
        this.mass = props.mass;
        this.stationedAt = props.stationedAt;
    }

    update(dt: number): void {
        super.update();
        if (this.stationedAt !== null) {
            this.devourCelestial(dt);
        }
    }

    draw(): void {
        if (this.stationedAt === null) {
            this.drawInSpace();
        } else {
            this.drawOnSurface();         
        }
        this.drawLabels();
    }

    private drawInSpace() {
        // TODO: add render logic for space
    }

    private drawOnSurface() {
        // TODO: add render logic on the surface
    }

    private drawLabels() {
        // TODO: add render logic for text labels with swarm info. For now, we utilize debug UI
    }

    private devourCelestial(dt: number) {
        const deltaMass = Math.min(
            this.stationedAt.mass,
            this.mass * this.stationedAt.massAvailability * dt
        );

        this.mass += deltaMass;
        this.stationedAt.mass -= deltaMass;
        if (this.stationedAt.mass <= Number.EPSILON) {
            this.stationedAt.destroy();
            this.stationedAt = null;
        }
    }
}

export const Swarm = (props: SwarmProps) => new SwarmClass(props);
