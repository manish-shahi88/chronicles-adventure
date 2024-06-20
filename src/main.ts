import platform from "/platform.png";
import background from "/background.png";
import hills from "/hills.png";
import Platform from "./Platforms";
import Player from "./Player";
import GenericObject from "./GenericObjects";
import { deadEndDistance, enemySpawnX, enemySpawnY, genericObjectSpeed, pit, playerSpeed, treeSpace } from "./constants";
import Bullet from "./bullet";
import Enemy from "./enemy";

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

const zombieSound = new Audio("../src/sounds/zombieSound.mp3")
zombieSound.volume = 0.4
const backgroundMusic = new Audio("../src/sounds/backgroundMusic.mp3")
backgroundMusic.volume = 0.4
const playerDeathSound = new Audio("../src/sounds/soldierScream.mp3")
playerDeathSound.volume = 0.9

backgroundMusic.loop = true

export let player: Player;
export let enemies: Enemy[] = []
export let bullets: Bullet[] = [];
let platforms: Platform[] = [];
let genericObjects: GenericObject[] = [];
export const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    shoot: {
        pressed: false
    },
    jump: {
        pressed: false
    }
};

let scrollOffset = 0;
let bulletFired = false;

function init() {
    player = new Player();

    //random enemy generation at every 2 seconds
    setInterval(() => {
        enemies.push(new Enemy({ x: player.position.x + enemySpawnX, y: enemySpawnY }));
    }, 2000)

    //platforms creation over the map
    platforms = [
        new Platform({ x: 0, y: 500, image }),
        new Platform({ x: image.width, y: 500, image }),
        new Platform({ x: image.width * 2 + pit, y: 500, image }),
        new Platform({ x: image.width * 3 + pit * 2, y: 400, image }),
        new Platform({ x: image.width * 4 + pit * 3, y: 300, image }),
        new Platform({ x: image.width * 5 + pit * 4, y: 200, image }),
        new Platform({ x: image.width * 6 + pit * 5 + pit, y: 300, image }),
        new Platform({ x: image.width * 7 + pit * 6 + pit * 2, y: 300, image }),
        new Platform({ x: image.width * 8 + pit * 7 + pit * 3, y: 400, image }),
        new Platform({ x: image.width * 9 + pit * 8 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 10 + pit * 9 + pit * 4, y: 400, image }),
        new Platform({ x: image.width * 11 + pit * 10 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 12 + pit * 11 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 13 + pit * 12 + pit * 3, y: 500, image }),

    ];
    genericObjects = [
        new GenericObject({ x: 0, y: 0, image: backgroundImg }),
        new GenericObject({ x: 300, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 2, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 3, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 5, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 7, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 9, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 10, y: 100, image: hillsImg }),
        new GenericObject({ x: 300 + treeSpace * 11, y: 100, image: hillsImg }),
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

    backgroundMusic.play()


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
            enemies.forEach(enemy => {
                enemy.position.x -= playerSpeed;
            });
        } else if (keys.a.pressed && scrollOffset > 0) {
            scrollOffset -= playerSpeed;
            platforms.forEach(platform => {
                platform.position.x += playerSpeed;
            });
            genericObjects.forEach(genericObject => {
                genericObject.position.x += genericObjectSpeed;
            });
            enemies.forEach(enemy => {
                enemy.position.x += playerSpeed;
            });
        }
    }


    // bullets.forEach(bullet => {
    //     bullet.update();
    // })

    //remove enemy on bullet hit
    bullets.forEach((bullet, bulletIndex) => {
        bullet.update();

        enemies.forEach((enemy, enemyIndex) => {
            if (detectBulletCollision(bullet, enemy)) {
                const deathSound = new Audio("../src/sounds/deathSound.mp3")
                deathSound.play()
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    enemies.forEach(enemy => {
        enemy.update();
        platforms.forEach(platform => {
            if (detectCollisionWithEnemy(enemy, platform)) {
                enemy.velocity.y = 0;

            }
        });
    });

    // player dies and reset to start point
    enemies.forEach((enemy) => {
        if (detectPlayerEnemyCollision(player, enemy)) {
            playerDeathSound.play()
            console.log("you lose");
            init(); // Reset the game
        }
    });

    // detect collision with platforms
    platforms.forEach(platform => {
        if (detectCollision(player, platform)) {
            player.velocity.y = 0;
        }
    });

    // detect collision of enemy with platform
    enemies.forEach(enemy => {
        enemy.update()
        
        zombieSound.play()
        platforms.forEach(platform => {
            if (detectCollisionWithEnemy(enemy, platform)) {
                enemy.velocity.y = 0;
            }

        });
    })



    // win condition
    if (scrollOffset > deadEndDistance) {
        console.log("you win");
    }

    // lose condition
    if (player.position.y > canvas.height) {
        playerDeathSound.play()
        console.log("you lose");
        init(); // Reset the game
    }
}

// collision detection between player and platform
function detectCollision(player: Player, platform: Platform) {
    return player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width;
}

// collision detection between enemy on platform top
function detectCollisionWithEnemy(enemy: Enemy, platform: Platform) {
    return enemy.position.y + enemy.height <= platform.position.y &&
        enemy.position.y + enemy.height + enemy.velocity.y >= platform.position.y &&
        enemy.position.x + enemy.width >= platform.position.x &&
        enemy.position.x <= platform.position.x + platform.width;
}

//detect collion of bullet with enemy
function detectBulletCollision(bullet: Bullet, enemy: Enemy): boolean {
    return bullet.position.x < enemy.position.x + enemy.width / 2 &&
        bullet.position.x + bullet.width / 2 > enemy.position.x &&
        bullet.position.y < enemy.position.y + enemy.height &&
        bullet.position.y + bullet.height > enemy.position.y;
}

// detect collision between player and enemy
function detectPlayerEnemyCollision(player: Player, enemy: Enemy): boolean {
    return player.position.x < enemy.position.x + enemy.width / 2 &&
        player.position.x + player.width / 2 > enemy.position.x &&
        player.position.y < enemy.position.y + enemy.height / 2 &&
        player.position.y + player.height / 2 > enemy.position.y;
}

// Keypress events
window.addEventListener("keydown", (event) => {
    switch (event.key) {

        case "a": 
        case "A":{
            keys.a.pressed = true;
            player.currentSprite = player.sprites.runLeft.left
            break;
        }
        case "d":
        case "D":
            {
            keys.d.pressed = true;
            player.currentSprite = player.sprites.run.right
            break;
        }

        case " ": {
            keys.jump.pressed = true
            player.velocity.y = -12;

            console.log(event.key);
            break;
        }
        case "Enter": {
            if (!bulletFired) {
                keys.shoot.pressed = true;
                bulletFired = true;
                const bulletSound = new Audio("../src/sounds/gunfire.mp3");
                bulletSound.volume = 0.4
                bulletSound.play();
                if (player.currentSprite === player.sprites.runLeft.left) {
                    bullets.push(new Bullet({ x: player.position.x, y: player.position.y }, { velocityX: -10, velocityY: 0 }, 100, 100))
                } else if (player.currentSprite === player.sprites.run.right) {
                    bullets.push(new Bullet({ x: player.position.x + player.width, y: player.position.y }, { velocityX: 10, velocityY: 0 }, 100, 100))
                }
            }
            break;
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

        case "Enter": {
            keys.shoot.pressed = false;
            bulletFired = false;
            break;
        }
    }
});



