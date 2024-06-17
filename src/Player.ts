import { gravity } from "./constants";
import { canvas, ctx } from "./main";
import playerSprite from "/sprite.png"

let spriteImg = new Image()
spriteImg.src = playerSprite;

export interface Position {
    x: number;
    y: number;
}

export default class Player {
    position: Position;
    velocity: Position;
    width: number;
    height: number;
   

    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        };
        this.width = 30;
        this.height = 30;
        
    }

    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(spriteImg,300,70,90,135,this.position.x,this.position.y-50,50,80);
        
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            // this.velocity.y = 0;
        }
    }
}