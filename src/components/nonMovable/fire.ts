import {ctx} from "../../main";
import fire from "/images/fire.png"

let fireImg = new Image();
fireImg.src = fire;

export interface Position {
    x: number;
    y: number;
}

export default class Fire {
    position: Position;
    velocity: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
    frame: number;
    frameInterval: number;
    frameTimer: number;
    // sprites: Sprites;
    currentSprite: HTMLImageElement
    currentCroppWidth?: number
    currentCropHeight:number
    cropWidth: number
    cropHeight: number

    constructor({x,y}:Position) {
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: 1,
            y: 1
        };
        this.width = 150;
        this.height = 250;
        this.image = fireImg;
        this.frame = 0;
        this.frameInterval = 10
        this.frameTimer = 0
        this.currentSprite = fireImg
        this.currentCroppWidth = 32
        this.currentCropHeight = 0
        this.cropWidth = 136
        this.cropHeight = 223
        this.width = 90
        this.height = 130
    }

    draw() {
        ctx.drawImage(
            this.currentSprite,
            this.currentCroppWidth!,
            this.currentCropHeight,
            this.cropWidth,
            this.cropHeight,
            this.position.x, this.position.y, this.width, this.height);
    }

    update() {
    
        this.draw();
        this.frameTimer++
        if(this.frameTimer >= this.frameInterval){
            this.currentCroppWidth = 32 + (136 * this.frame)
            this.frame++
            if(this.frame > 6){
                this.frame = 0
            }
            this.frameTimer = 0
        }       
    }
    getPosition(): Position {
        return this.position;
    }
}



