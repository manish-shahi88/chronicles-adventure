import { ctx } from "../../../main";
import { Position } from "../player/Player";
import explosionImage from "/images/explosion.png";

let explosionImg = new Image();
explosionImg.src = explosionImage;

export interface Velocity {
    velocityX: number;
    velocityY: number;
}

export default class Explosion {
    position: Position;
    width: number;
    height: number;
    frame: number;
    currentCroppWidth: number;
    currentCropHeight: number;
    cropWidth: number;
    cropHeight: number;
    isFinished: boolean;

    constructor(position: Position) {
        this.position = position;
        this.frame = 0;
        this.currentCroppWidth = 0;
        this.currentCropHeight = 0;
        this.cropWidth = 192;
        this.cropHeight = 159;
        this.width = 100;
        this.height = 100;
        this.isFinished = false;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(explosionImg, this.currentCroppWidth, this.currentCropHeight, this.cropWidth, this.cropHeight, this.position.x, this.position.y, this.width, this.height);
        ctx.closePath();
    }

    update() {
        this.frame++;
        if (this.frame < 8) {
            this.currentCroppWidth = 195 * this.frame;
        } else {
            this.isFinished = true;
        }
        this.draw();
    }

    getPosition(): Position {
        return this.position;
    }
}
