import { Text, TextClass } from "kontra";
import { SwarmClass } from "../entities/swarm";
import { displayMass } from "./util";

type DebugDisplayProps = {
    trackedSwarms: SwarmClass[],
    updateDelay: number    
} & Partial<Parameters<typeof Text>[0]>;

export class DebugDisplayClass extends TextClass {

    private trackedSwarms: SwarmClass[];
    private updateTimer: number = 0;
    private updateDelay: number;
    
    constructor(props: DebugDisplayProps) {
        super({
            x: 100,
            y: 100,
            anchor: {x: 1.0, y: 0.0},
            textAlign: 'right',
            font: '32px Arial',
            color: 'white',
            text: 'This is debug UI',
            ...props
        });
        this.updateDelay = props.updateDelay;
        this.trackedSwarms = props.trackedSwarms;
    }

    draw(): void {
        if (this.updateTimer > 0) {
            this.updateTimer--;
            super.draw();
            return;
        }
        this.updateTimer = this.updateDelay;
        this.x = this.context.canvas.width - 300;
        this.text = this.trackedSwarms.map(it => this.displaySwarm(it)).join("\n");
        super.draw();
    }

    private displaySwarm(swarm : SwarmClass): string {
        let text = "";
        if (swarm.stationedAt === null) {
            text += "In space - ";
        } else {
            text += `${swarm.stationedAt.celestialName} swarm - `;
        }

        text += displayMass(swarm.mass);
        return text;
    }
}

export const DebugDisplay = (props: DebugDisplayProps) => new DebugDisplayClass(props);
