import { canvas, ctx } from "../../main";
import { Position } from "../movable/player/Player";


export interface PlatformProps {
    x: number;
    y: number;
    image: HTMLImageElement;
}

export default class BackGround {
    position: Position;
    image: HTMLImageElement;
    width: number;
    height: number;
    
    constructor({ x, y, image }: PlatformProps) {
        this.position = {
            x,
            y
        };
        this.image = image;

        this.width = canvas.width;
        this.height = canvas.height;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}