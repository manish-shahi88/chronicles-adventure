import { ctx } from "./main"; 
import { Position } from "./Player";
import stone from "/stone.png";

let stoneImg = new Image();
stoneImg.src = stone;

export interface Velocity {
    velocityX: number;
    velocityY: number;
}

export default class Stone {
    position: Position;
    velocity: Velocity;
    width: number;
    height: number;
    rotation: number; // Add a rotation property

    constructor(position: Position, velocity: Velocity, width: number, height: number) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.rotation = 0; // Initialize the rotation
    }

    draw() {
        ctx.save(); // Save the current state of the context
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2); // Move the context to the center of the stone
        ctx.rotate(this.rotation); // Rotate the context
        ctx.drawImage(stoneImg, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the image with the rotation applied
        ctx.restore(); // Restore the context to its original state
    }

    update() {
        this.draw();
        this.position.x += this.velocity.velocityX;
        this.position.y += this.velocity.velocityY;
        this.rotation -= 0.1; // Increment the rotation angle (adjust as needed)
    }
}
