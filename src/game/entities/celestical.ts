import { Sprite, SpriteClass } from "kontra";
import { theme } from "../../resource/theme";

type CelestialProps = {
    /**
     * Mass of the celestial in grams
     **/
    mass: number,

    /**
     * Availability factor for the celestial mass,
     * e.g. effective rate of conversion of it's mass to grey goo
     * 0.7 meaning that 700g of mass can be converted per tick by 1kg
     * of grey goo.
     **/
    massAvailability: number,

    /**
     * Display Name of the celestial
     **/
    celestialName: string,

    /**
     * Display radius of the celestial in px.
     **/
    radius: number,
} & Partial<Parameters<typeof Sprite>[0]>;

export class CelestialClass extends SpriteClass {
    private radius: number;
    public mass: number;
    private massAvailability: number;
    
    private celestialName: string;

    constructor(props: Partial<CelestialProps>) {
        super(props);
        this.radius = props.radius;
        this.celestialName = props.celestialName;
        this.mass = props.mass;
        this.massAvailability = props.massAvailability;
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

    destroy(): void {
        console.log(`${this.celestialName} is no more!`);
    }
}

export const Celestial = (props: CelestialProps) => new CelestialClass(props);
