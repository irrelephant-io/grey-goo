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
        super.draw();
    }

    private drawOnSurface() {
        super.draw();
    }

    private drawLabels() {
        const textSize = 32;
        const textY = this.y + this.radius + textSize * 2;
        this.context.fillStyle = theme.colorFgLight;
        this.context.textAlign = "center";
        this.context.font = `${textSize}px Arial`;
        this.context.fillText(this.celestialName, this.x, textY);
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
