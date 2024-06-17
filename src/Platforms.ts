import { ctx } from "./main";
import { Position } from "./Player";

export interface PlatformProps {
    x: number;
    y: number;
    image: HTMLImageElement;
}

export default class Platform {
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

        this.width = image.width;
        this.height = image.height;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}