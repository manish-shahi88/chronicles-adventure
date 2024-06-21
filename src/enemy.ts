import { gravity } from "./constants";
import {canvas, ctx} from "./main";
import enemy from "/enemy.png"
import playerSpriteLeft from "/spriteFlip.png";

let enemyImg = new Image();
enemyImg.src = enemy;

let spriteLeft = new Image();
spriteLeft.src = playerSpriteLeft;

export interface Position {
    x: number;
    y: number;
}

interface EnemyParams {
    x: number;
    y: number;
}

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

    constructor({x,y}:EnemyParams) {
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
        this.image = enemyImg;
        this.frame = 0;
        this.frameInterval = 10
        this.frameTimer = 0
        this.sprites = {
            stand: {
                right: enemyImg,
                               
            },
            run: {
                right: enemyImg,
            },
            runLeft:{
                left: spriteLeft,
            },
            shootRight:{
                right: enemyImg,
            },
            shootLeft:{
                left: spriteLeft,
            }
        };
        this.currentSprite = this.sprites.run.right
        this.currentCroppWidth = 87
        this.currentCropHeight = 0
        this.cropWidth = 99
        this.cropHeight = 131
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
            this.currentCroppWidth = 105 + ((99 + 48) *this.frame)
            this.frame++
            if(this.frame > 10){
                this.frame = 0
            }
            this.frameTimer = 0
        }
        
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        }
        
    }
    getPosition(): Position {
        return this.position;
    }
}



