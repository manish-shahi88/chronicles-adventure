
import { ctx, player } from "./main"; 
import { Position } from "./Player";
import bullet from "/bullet.png"

const bulletImg = new Image()
bulletImg.src = bullet

export interface Velocity {
    velocityX: number;
    velocityY: number;
}

export default class Bullet {
    position: Position;
    velocity: Velocity;
    radius: number;

    constructor(position: Position, velocity: Velocity, radius: number) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(bulletImg,this.position.x,this.position.y-player.height*3/8)
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.velocityX;
        this.position.y += this.velocity.velocityY;
    }
}
