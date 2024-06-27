import {ctx, enemies, enemyShooters, player } from "../../../main";
import { detectDroneBulletToEnemyCollision, detectDroneBulletWithEnemyShooterCollision } from "../../../physics/collisionDetection";
import { Position } from "./Player";
import DroneBullet, { Velocity } from "./DroneBullet";
import droneImgSrc from "/images/drone.png";
import deathSoundSrc from "/sounds/deathSound.mp3"
import droneBulletSoundSrc from "/sounds/droneBullet.mp3"


const droneImg = new Image();
droneImg.src = droneImgSrc;

const droneBulletSound = new Audio(droneBulletSoundSrc)


export default class Drone {
    position: Position;
    velocity: Velocity;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    bullets: DroneBullet[];
    lastShootTime: number;
    shootInterval: number;
    frame: number;
    frameInterval: number;
    frameTimer: number;
    currentCroppWidth: number
    currentCropHeight:number
    cropWidth: number
    cropHeight: number

    constructor(position: Position, velocity: Velocity, width: number, height: number) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.offsetX = 0; // Offset from the player's position
        this.offsetY = -100; // Offset from the player's position
        this.bullets = [];
        this.lastShootTime = 0;
        this.shootInterval = 300; // Shoot every 1 second
        this.frame = 0;
        this.frameInterval = 10
        this.frameTimer = 0
        this.currentCroppWidth = 0
        this.currentCropHeight = 0
        this.cropWidth = 143
        this.cropHeight = 79
    }

    draw() {
        ctx.drawImage(droneImg,this.currentCroppWidth,this.currentCropHeight,this.cropWidth,this.cropHeight, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x = player.position.x + this.offsetX;
        this.position.y = player.position.y + this.offsetY;
        this.draw();
        this.frameTimer++
        if(this.frameTimer >= this.frameInterval){
            this.currentCroppWidth = 143 *this.frame
            this.frame++
            if(this.frame > 10){
                this.frame = 0
            }
            this.frameTimer = 0
        }

        const now = Date.now();
        if (now - this.lastShootTime >= this.shootInterval) {
            this.shoot();
            this.lastShootTime = now;
        }

        // Update bullets
        // this.bullets.forEach((bullet, index) => {
        //     bullet.update();
        //     // Remove bullet if it goes off screen
        //     if (bullet.position.x < 0 || bullet.position.x > canvas.width) {
        //         this.bullets.splice(index, 1);
        //     }
        // });
        this.bullets.forEach((bullet, bulletIndex) => {
            bullet.update();
            droneBulletSound.play()
            droneBulletSound.volume = 0.3

            enemies.forEach((enemy, enemyIndex) => {
                if (detectDroneBulletToEnemyCollision(bullet, enemy)) {
                    const deathSound = new Audio(deathSoundSrc);
                    deathSound.play();
                    enemies.splice(enemyIndex, 1);
                    this.bullets.splice(bulletIndex, 1);
                    // score += 10
                }
            });
        });
        this.bullets.forEach((bullet, bulletIndex) => {
            bullet.update();
            enemyShooters.forEach((enemy, enemyIndex) => {
                if (detectDroneBulletWithEnemyShooterCollision(bullet, enemy)) {
                    const deathSound = new Audio(deathSoundSrc);
                    deathSound.play();
                    enemyShooters.splice(enemyIndex, 1);
                    this.bullets.splice(bulletIndex, 1);
                    // score += 10
                }
            });
        });
        
    }

    shoot() {
        const bulletWidth = 50;
        const bulletHeight = 50;
        const bulletSpeed = 20;

        let bulletVelocity: Velocity;

        
        if (player.currentSprite === player.sprites.run.right || player.currentSprite === player.sprites.shootRight.right) {
            bulletVelocity = { velocityX: -bulletSpeed, velocityY: 7 };
        } else {
            bulletVelocity = { velocityX: bulletSpeed, velocityY: 7 };
        }

        const bulletPosition: Position = { x: this.position.x + this.width * 1/8, y: this.position.y + this.height / 2 };
        
        this.bullets.push(new DroneBullet(bulletPosition, bulletVelocity, bulletWidth, bulletHeight));


        

    }
}
