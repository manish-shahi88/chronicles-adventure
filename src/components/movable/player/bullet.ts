
import { ctx, player } from "../../../main"; 
import { Position } from "./Player";
import bullet from "/images/bullet.png"

const bulletImg = new Image()
bulletImg.src = bullet

export interface Velocity {
    velocityX: number;
    velocityY: number;
}

export default class Bullet {
    position: Position;
    velocity: Velocity;
    width: number
    height: number

    constructor(position: Position, velocity: Velocity,width:number,height:number) {
        this.position = position;
        this.velocity = velocity;
        this.width = width
        this.height = height

    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(bulletImg,this.position.x,this.position.y-player.height*2/8,this.width,this.height)
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.velocityX;
        this.position.y += this.velocity.velocityY;
    }
}
