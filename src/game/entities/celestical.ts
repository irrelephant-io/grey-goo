import { Sprite, SpriteClass } from "kontra";
import { theme } from "../../resource/theme";

type CelestialProps = {
    radius: number,
    celestialName: string
} & Parameters<typeof Sprite>[0];

export class CelestialClass extends SpriteClass {
    private radius: number = 100;
    public celestialName: string;

    constructor(props: Partial<CelestialProps>) {
        super(props);
        this.radius = props.radius!;
        this.celestialName = props.celestialName!;
    }

    draw(): void {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.context.fillStyle = theme.colorFgDark;
        this.context.fill();
        this.context.stroke();

        if (this.celestialName !== undefined) {
            const textSize = 32;
            const textY = this.y + this.radius + textSize * 2;
            this.context.fillStyle = theme.colorFgLight;
            this.context.textAlign = "center";
            this.context.font = `${textSize}px Arial`;
            this.context.fillText(this.celestialName, this.x, textY);
        }
    }
}

export const Celestial = (props: Partial<CelestialProps>) => new CelestialClass(props);