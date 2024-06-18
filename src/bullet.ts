// import { ctx } from "./main";
// import { Position } from "./Player";

// export interface Velocity{
//     velocityX : number
//     velocityY : number
// }
// export default class Bullet{
//     position: Position
//     velocity: Velocity
//     radius: number
//     constructor(position:Position,velocity:Velocity,radius:number){
//         this.position = {
//             x: 0,
//             y: 0
//         }
//         this.velocity = {
//             velocityX: 0,
//             velocityY: 0
//         }
//         this.radius = 5

//     }

//     draw(){
//         ctx.beginPath();
//         ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = "red";
//         ctx.fill();
//         ctx.closePath();
//     }

//     update(){
//         this.draw();
//         this.position.x += this.velocity.velocityX;
//         this.position.y += this.velocity.velocityY;
//     }
// }


import { ctx } from "./main"; // Make sure this import works correctly with your project structure
import { Position } from "./Player";

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
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.velocityX;
        this.position.y += this.velocity.velocityY;
    }
}
