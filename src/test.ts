// Import necessary modules

// Update the import path accordingly
import Platform from "./components/nonMovable/Platforms";
import { gravity } from "./constants";
import { canvas, ctx, keys } from "./main";
import { detectCollision } from "./physics/collisionDetection";
import playerSprite from "/images/sprite.png";
import playerSpriteLeft from "/images/spriteFlip.png";

let spriteImg = new Image();
spriteImg.src = playerSprite;

let spriteLeft = new Image();
spriteLeft.src = playerSpriteLeft;

export interface Position {
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
    runLeft: {
        left: HTMLImageElement;
    };
    shootRight: {
        right: HTMLImageElement;
    };
    shootLeft: {
        left: HTMLImageElement;
    };
}

export default class Player {
    position: Position;
    velocity: Position;
    width: number;
    height: number;
    image: HTMLImageElement;
    frame: number;
    frameInterval: number;
    frameTimer: number;
    sprites: Sprites;
    currentSprite: HTMLImageElement;
    currentCroppWidth?: number;
    currentCropHeight: number;
    cropWidth: number;
    cropHeight: number;
    isOnGround: boolean;

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
        this.frameInterval = 2; // Adjust this value to control the speed of animation
        this.frameTimer = 0;
        this.sprites = {
            stand: {
                right: spriteImg,
            },
            run: {
                right: spriteImg,
            },
            runLeft: {
                left: spriteLeft,
            },
            shootRight: {
                right: spriteImg,
            },
            shootLeft: {
                left: spriteLeft,
            }
        };
        this.currentSprite = this.sprites.run.right;
        this.currentCroppWidth = 290;
        this.currentCropHeight = 65;
        this.cropWidth = 87;
        this.cropHeight = 130;
        this.isOnGround = true;
    }

    draw() {
        ctx.drawImage(
            this.currentSprite,
            this.currentCroppWidth!,
            this.currentCropHeight,
            this.cropWidth,
            this.cropHeight,
            this.position.x, this.position.y, this.width, this.height
        );
    }

    update(platforms: Platform[]) {  // Specify the type of 'platforms'
        this.frameTimer++;
        if (keys.d.pressed && this.currentSprite === this.sprites.run.right) {
            if (this.frameTimer >= this.frameInterval) {
                this.currentCroppWidth = 260 + ((87 + 105) * this.frame);
                this.frame++;
                if (this.frame > 7) {
                    this.frame = 0;
                }
                this.frameTimer = 0;
            }
            this.currentCropHeight = 531;
        } else if (keys.a.pressed && this.currentSprite === this.sprites.runLeft.left) {
            if (this.frameTimer >= this.frameInterval) {
                this.currentCroppWidth = 110 + ((87 + 106) * this.frame);
                this.frame++;
                if (this.frame > 7) {
                    this.frame = 0;
                }
                this.frameTimer = 0;
            }
            this.currentCropHeight = 531;
        } else if (keys.shoot.pressed && this.currentSprite === this.sprites.shootRight.right) {
            this.currentCroppWidth = 668;
            this.currentCropHeight = 732;
            this.cropWidth = 110;
        } else if (keys.shoot.pressed && this.currentSprite === this.sprites.shootLeft.left) {
            this.currentCroppWidth = 996;
            this.currentCropHeight = 732;
            this.cropWidth = 110;
        } else if (keys.shoot.pressed === false && this.currentSprite === this.sprites.shootRight.right) {
            this.currentCroppWidth = 260;
        } else if (keys.shoot.pressed === false && this.currentSprite === this.sprites.shootLeft.left) {
            this.currentCroppWidth = 258;
            this.currentCropHeight = 64;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }

        this.draw();
        this.updatePosition(platforms);
    }

    updatePosition(platforms: Platform[]) {  // Specify the type of 'platforms'
        if (this.isOnPlatform(platforms)) {
            this.isOnGround = true;
            this.velocity.y = 0;
        } else {
            this.isOnGround = false;
        }
    }

    isOnPlatform(platforms: Platform[]): boolean {  // Specify the type of 'platforms'
        for (const platform of platforms) {
            if (detectCollision(this, platform)) {
                return true;
            }
        }
        return false;
    }

    getPosition(): Position {
        return this.position;
    }
}
