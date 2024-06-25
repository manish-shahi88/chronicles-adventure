import { ctx } from "../../../main";
import { Position } from "../player/Player";
import bulletImg from "/images/droneBullet.png";

const bulletImage = new Image();
bulletImage.src = bulletImg;

export interface Velocity {
    velocityX: number;
    velocityY: number;
}

export default class DroneBullet {
    position: Position;
    velocity: Velocity;
    width: number;
    height: number;

    constructor(position: Position, velocity: Velocity, width: number, height: number) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.drawImage(bulletImage, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.velocityX;
        this.position.y += this.velocity.velocityY;
    }
}
