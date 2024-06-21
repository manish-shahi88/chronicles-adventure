import { gravity } from "./constants";
import {canvas, ctx} from "./main";
import fire from "/fire.png"

let fireImg = new Image();
fireImg.src = fire;

export interface Position {
    x: number;
    y: number;
}

// interface EnemyParams {
//     x: number;
//     y: number;
// }

export interface Sprites {
    stand: {
        right: HTMLImageElement;
    };
    run: {
        right: HTMLImageElement;

    };
    runLeft:{
        left: HTMLImageElement
    }
    shootRight:{
        right: HTMLImageElement
    }
    shootLeft:{
        left: HTMLImageElement
    }
}

export default class Enemy {
    position: Position;
    velocity: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
    frame: number;
    frameInterval: number;
    frameTimer: number;
    sprites: Sprites;
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
        this.sprites = {
            stand: {
                right: fireImg,
                               
            },
            run: {
                right: fireImg,
            },
            runLeft:{
                left: fireImg,
            },
            shootRight:{
                right: fireImg,
            },
            shootLeft:{
                left: fireImg,
            }
        };
        this.currentSprite = this.sprites.run.right
        this.currentCroppWidth = 32
        this.currentCropHeight = 0
        this.cropWidth = 136
        this.cropHeight = 223
        this.width = 100
        this.height = 150
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
        
        
        // this.position.x -= this.velocity.x;
        // this.position.y += this.velocity.y;

        // if (this.position.y + this.height + this.velocity.y < canvas.height) {
        //     this.velocity.y += gravity;
        // }
        // this.frame++;
        // if (this.frame > 10) {
        //     this.frame = 0;
        // }
    }
    getPosition(): Position {
        return this.position;
    }
}



