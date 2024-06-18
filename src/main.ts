
import platform from "/platform.png";
import background from "/background.png";
import hills from "/hills.png";
import Platform from "./Platforms";
import Player from "./Player";
import GenericObject from "./GenericObjects";
import { deadEndDistance, genericObjectSpeed, pit, playerSpeed, treeSpace } from "./constants";
import Bullet from "./bullet";

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const image = new Image();
image.src = platform;

export const backgroundImg = new Image();
backgroundImg.src = background;

export const hillsImg = new Image();
hillsImg.src = hills;

let player: Player;
const bullets: Bullet[] = [];
let platforms: Platform[] = [];
let genericObjects: GenericObject[] = [];
export const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    shoot:{
        pressed: false
    }
};

let scrollOffset = 0;

function init() {
    player = new Player();
    platforms = [
        new Platform({ x: 0, y: 500, image }),
        new Platform({ x: image.width, y: 500, image }),
        new Platform({ x: image.width * 2 + pit, y: 500, image }),
        new Platform({ x: image.width * 3 + pit*2, y: 400, image }),
        new Platform({ x: image.width * 4 + pit*3, y: 300, image }),
        new Platform({ x: image.width * 5 + pit*4, y: 200, image }),
        new Platform({ x: image.width * 6 + pit*5+pit, y: 300, image }),
        new Platform({ x: image.width * 7 + pit*6+pit*2, y: 300, image }),
        new Platform({ x: image.width * 8 + pit*7+pit*3, y: 400, image }),
        new Platform({ x: image.width * 9 + pit*8+pit*4, y: 500, image }),
        new Platform({ x: image.width * 10 + pit*9+pit*4, y: 400, image }),
        new Platform({ x: image.width * 11 + pit*10+pit*4, y: 500, image }),
        new Platform({ x: image.width * 12 + pit*11+pit*4, y: 500, image }),
        new Platform({ x: image.width * 13 + pit*12+pit*3, y: 500, image }),
        
    ];
    genericObjects = [
        new GenericObject({ x: 0, y: 0, image: backgroundImg }),
        // new GenericObject({ x: 600, y: 400, image: backgroundImg }),
        new GenericObject({ x: 300, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*2, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*3, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*5, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*7, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*9, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*10, y: 100, image: hillsImg }),
        new GenericObject({ x: 300+treeSpace*11, y: 100, image: hillsImg }),
    ];
    scrollOffset = 0;
}

image.onload = () => {
    init();
    animate();
};

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(genericObject => {
        genericObject.draw();
    });
    platforms.forEach(platform => {
      platform.draw();
    });
    player.update();
    
    player.velocity.x = 0;
    if ((keys.d.pressed && player.position.x < 500)) {
        player.velocity.x = playerSpeed;
    } else if ((keys.a.pressed && player.position.x > 100) || (keys.a.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -playerSpeed;
    } else {
        player.velocity.x = 0;

        if (keys.d.pressed && scrollOffset < deadEndDistance) {
            scrollOffset += playerSpeed;
            platforms.forEach(platform => {
                platform.position.x -= playerSpeed;
            });
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= genericObjectSpeed;
            });
        } else if (keys.a.pressed && scrollOffset > 0) {
            scrollOffset -= playerSpeed;
            platforms.forEach(platform => {
                platform.position.x += playerSpeed;
            });
            genericObjects.forEach(genericObject => {
                genericObject.position.x += genericObjectSpeed;
            });
        }
    }


    bullets.forEach(bullet => {
        bullet.update();
    })

    // detect collision with platforms
    platforms.forEach(platform => {
        if (detectCollision(player, platform)) {
            player.velocity.y = 0;
        }
    });

    // win condition
    if (scrollOffset > deadEndDistance) {
        console.log("you win");
    }

    // lose condition
    if (player.position.y > canvas.height) {
        console.log("you lose");
        init(); // Reset the game
    }
}

// Rectangular collision detection
function detectCollision(player: Player, platform: Platform) {
    return player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width;
}

// Keypress events
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        
        case "a": {
            keys.a.pressed = true;
            player.currentSprite = player.sprites.runLeft.left
            break;
        }
        case "d": {
            keys.d.pressed = true;
            player.currentSprite = player.sprites.run.right
            // player.currentCroppWidth = player.sprites.run.cropWidth
            break;
        }
        
        case " ": {
            player.velocity.y = -12;
            console.log(event.key);
            break;
        }
        case "Enter":{
            keys.shoot.pressed = true;
            player.currentSprite = player.sprites.shootRight.right
            bullets.push(new Bullet({x: player.position.x+player.width, y: player.position.y+player.height/2}, {velocityX: 10, velocityY: 0}, 5))
        }
        
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a": {
            keys.a.pressed = false;
            player.currentCroppWidth = 290
            player.currentCropHeight = 65
            break;
        }
        case "d": {
            keys.d.pressed = false;
            player.currentCroppWidth = 290
            player.currentCropHeight = 65
            break;
        }
        // case " ": {
        //     // keys.shoot.pressed = false;
        //     player.currentSprite = player.sprites.stand.right

        // }
        case "Enter":{
            keys.shoot.pressed = false;
            player.currentSprite = player.sprites.run.right
        }
    }
});
