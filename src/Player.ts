// import Bullet from "./bullet";
import { gravity } from "./constants";
import {canvas, ctx, keys } from "./main";
import playerSprite from "/sprite.png";
import playerSpriteLeft from "/spriteFlip.png";

let spriteImg = new Image();
spriteImg.src = playerSprite;

let spriteLeft = new Image();
spriteLeft.src = playerSpriteLeft;

export interface Position {
    x: number;
    y: number;
}

interface Sprites {
    stand: {
        right: HTMLImageElement;
        // cropWidth: number
    };
    run: {
        right: HTMLImageElement;
        // cropWidth: number

    };
    runLeft:{
        left: HTMLImageElement
        // cropWidth: number
    }
    shootRight:{
        right: HTMLImageElement
        // cropWidth: number
    }
    shootLeft:{
        left: HTMLImageElement
        // cropWidth: number
    }
}

export default class Player {
    position: Position;
    velocity: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
    frame: number;
    sprites: Sprites;
    currentSprite: HTMLImageElement
    currentCroppWidth?: number
    currentCropHeight:number
    cropWidth: number
    cropHeight: number

    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        };
        this.width = 50;
        this.height = 70;
        this.image = spriteImg;
        this.frame = 0;
        this.sprites = {
            stand: {
                right: spriteImg,
                // cropWidth:290,
                // cropHeight: 68               
            },
            run: {
                right: spriteImg,
                // cropWidth:260 + ((87 + 105) * this.frame)
            },
            runLeft:{
                left: spriteLeft,
                // cropWidth: 110 + ((87 + 106) * this.frame)
            },
            shootRight:{
                right: spriteImg,
                // cropWidth: 50
            },
            shootLeft:{
                left: spriteLeft,
                // cropWidth: 50
            }
        };
        this.currentSprite = this.sprites.run.right
        this.currentCroppWidth = 290
        this.currentCropHeight = 65
        this.cropWidth = 87
        this.cropHeight = 130
    }

    draw() {
        ctx.drawImage(
            this.currentSprite,
            this.currentCroppWidth!,
            this.currentCropHeight,
            this.cropWidth,
            this.cropHeight,
            this.position.x, this.position.y, this.width, this.height);
            // console.log(this.currentCroppWidth);
    }

    update() {
        if(keys.d.pressed && this.currentSprite === this.sprites.run.right) {
            this.currentCroppWidth = 260 + ((87 + 105) * this.frame)
            this.currentCropHeight = 531     
            // bullets.push(new Bullet({x: this.position.x+this.width, y: this.position.y+this.height/2}, {velocityX: 10, velocityY: 0}, 5))

        }
        else if(keys.a.pressed && this.currentSprite === this.sprites.runLeft.left) {
            this.currentCroppWidth = 110 + ((87 + 106) * this.frame)
            this.currentCropHeight = 531  
            // bullets.push(new Bullet({x: this.position.x+this.width, y: this.position.y+this.height/2}, {velocityX: -10, velocityY: 0}, 5))


        }
        else if(keys.shoot.pressed && this.currentSprite === this.sprites.shootRight.right) {
            this.currentCroppWidth = 668
            this.currentCropHeight = 732  
            this.cropWidth = 110
            // bullets.push(new Bullet({x: this.position.x+this.width, y: this.position.y+this.height/2}, {velocityX: -10, velocityY: 0}, 5))


            // this.cropHeight = 143
        }
        else if(keys.shoot.pressed && this.currentSprite === this.sprites.shootLeft.left) {
            this.currentCroppWidth = 996
            this.currentCropHeight = 732  
            this.cropWidth = 110
            // bullets.push(new Bullet({x: this.position.x+this.width, y: this.position.y+this.height/2}, {velocityX: -10, velocityY: 0}, 5))


            // this.cropHeight = 143
        }
        else if(keys.shoot.pressed === false && this.currentSprite === this.sprites.shootRight.right ){
            this.currentCroppWidth = 260
        }
        else if(keys.shoot.pressed === false && this.currentSprite === this.sprites.shootLeft.left ){
            this.currentCroppWidth = 258
            this.currentCropHeight = 64 
            // this.cropWidth = 200
        }
        this.frame++;
        if (this.frame > 7) {
            this.frame = 0;
        }
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            // this.velocity.y = 0;
        }
    }
    getPosition(): Position {
        return this.position;
    }
}
