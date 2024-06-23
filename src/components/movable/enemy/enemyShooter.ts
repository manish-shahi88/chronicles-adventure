import { gravity } from "../../../constants";
import { stones, canvas, ctx } from "../../../main";
import Stone from "./stone";
import enemyShooter from "/images/enemyShooter.png";

let enemyShooterImg = new Image();
enemyShooterImg.src = enemyShooter;

export interface Position {
    x: number;
    y: number;
}
interface EnemyParams {
    x: number;
    y: number;
}

export default class EnemyShooter {
    position: Position;
    velocity: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
    frame: number;
    frameInterval: number;
    frameTimer: number;
    currentSprite: HTMLImageElement;
    currentCroppWidth: number;
    currentCropHeight: number;
    cropWidth: number;
    cropHeight: number;
    throwInterval: number;
    throwTimer: number;

    constructor({ x, y }: EnemyParams) {
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: 1,
            y: 1
        };
        this.width = 50;
        this.height = 70;
        this.image = enemyShooterImg;
        this.frame = 0;
        this.frameInterval = 5; // Adjust this value to control the speed of animation
        this.frameTimer = 0;
        
        this.currentSprite = enemyShooterImg;
        this.currentCroppWidth = 66;
        this.currentCropHeight = 0;
        this.cropWidth = 160;
        this.cropHeight = 177;
        
        this.throwInterval = 40; // Adjust this value to control the frequency of throwing stones
        this.throwTimer = 0;
    }

    draw() {
        ctx.drawImage(
            this.currentSprite,
            this.currentCroppWidth,
            this.currentCropHeight,
            this.cropWidth,
            this.cropHeight,
            this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.currentCroppWidth = 66 + ((160 + 23) * this.frame);
            this.frame++;
            if (this.frame > 6) {
                this.frame = 0;
            }
            this.frameTimer = 0;
        }
        
        this.position.x -= this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        }
        
        this.throwTimer++;
        if (this.throwTimer >= this.throwInterval) {
            stones.push(new Stone({ x: this.position.x, y: this.position.y }, { velocityX: -2, velocityY: 0 }, 100, 100));
            this.throwTimer = 0; // Reset the throw timer
        }
    }

    getPosition(): Position {
        return this.position;
    }
}
