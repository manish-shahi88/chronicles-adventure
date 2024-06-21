import platform from "/platform.png";
import background from "/background.png";
import hills from "/hills.png";
import Platform from "./Platforms";
import Player from "./Player";
import GenericObject from "./GenericObjects";
import { deadEndDistance, enemyShooterSpawnX, enemySpawnX, enemySpawnY, genericObjectSpeed, pit, playerSpeed, treeSpace } from "./constants";
import Bullet from "./bullet";
import Enemy from "./enemy";
import EnemyShooter from "./enemyShooter";
import Stone from "./stone";
import Fire from "./fire";

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
export let enemyShooters: EnemyShooter[] = []

export let bullets: Bullet[] = [];
export let stones: Stone[] = []
let platforms: Platform[] = [];
let genericObjects: GenericObject[] = [];
let fires: Fire[] = []
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

let intervalsSet = false

let lives = 5
let gameOver = false

function init() {

    if(lives <= 0){
        gameOver = true
        return
    }
    player = new Player();

    //platforms creation over the map
    platforms = [
        new Platform({ x: 0, y: 500, image }),
        new Platform({ x: image.width, y: 500, image }),
        new Platform({ x: image.width * 2 + pit, y: 500, image }),
        new Platform({ x: image.width * 3 + pit * 2, y: 400, image }),
        new Platform({ x: image.width * 4 + pit * 3, y: 300, image }),//
        new Platform({ x: image.width * 5 + pit * 4, y: 200, image }),
        new Platform({ x: image.width * 6 + pit * 5 + pit, y: 300, image }),
        new Platform({ x: image.width * 7 + pit * 6 + pit * 2, y: 300, image }),
        new Platform({ x: image.width * 8 + pit * 7 + pit * 3, y: 400, image }),
        new Platform({ x: image.width * 9 + pit * 8 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 10 + pit * 9 + pit * 4, y: 400, image }),
        new Platform({ x: image.width * 11 + pit * 10 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 12 + pit * 11 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 13 + pit * 12 + pit * 3, y: 500, image }),
        new Platform({ x: image.width * 14 + pit * 13 + pit * 3, y: 400, image }),
        new Platform({ x: image.width * 15 + pit * 14 + pit * 3, y: 300, image }),
        new Platform({ x: image.width * 16 + pit * 15 + pit * 3, y: 400, image }),
        new Platform({ x: image.width * 17 + pit * 16 + pit * 3, y: 300, image }),
        new Platform({ x: image.width * 18 + pit * 17 + pit * 3, y: 500, image }),
        new Platform({ x: image.width * 19 + pit * 18 + pit * 4, y: 500, image }),
        new Platform({ x: image.width * 20 + pit * 19 + pit * 5, y: 500, image }),
        new Platform({ x: image.width * 21 + pit * 20 + pit * 6, y: 500, image })


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
    fires = [
        new Fire({x: image.width/2, y: 400}),
        new Fire({ x: image.width/2 * 2 + pit, y: 400}),
        new Fire({ x: image.width * 2 + pit*2, y: 400}),
        new Fire({ x: image.width * 3 + pit * 3, y: 300}),
        new Fire({ x: image.width * 4 + pit * 4, y: 200}),
        new Fire({ x: image.width * 5 + pit * 5, y: 100}),
        new Fire({ x: image.width * 6 + pit * 6 + pit, y: 200}),
        new Fire({ x: image.width * 7 + pit * 7 + pit * 2, y: 200}),
        new Fire({ x: image.width * 8 + pit * 8 + pit * 3, y: 300}),
        new Fire({ x: image.width * 9 + pit * 9 + pit * 4, y: 400}),
        new Fire({ x: image.width * 10 + pit * 10 + pit * 4, y: 300}),
        new Fire({ x: image.width * 11 + pit * 11 + pit * 4, y: 400}),
        new Fire({ x: image.width * 12 + pit * 12 + pit * 4, y: 400}),
        new Fire({ x: image.width * 13 + pit * 13 + pit * 3, y: 400}),
        new Fire({ x: image.width * 14 + pit * 14 + pit * 4, y: 300}),
        new Fire({ x: image.width * 15 + pit * 15 + pit * 5, y: 200}),
        new Fire({ x: image.width * 16 + pit * 16 + pit * 5, y: 300}),
        new Fire({ x: image.width * 17 + pit * 17 + pit * 6, y: 200}),
    ]

    scrollOffset = 0;
}

image.onload = () => {
    init();
    animate();

    if(!intervalsSet){
        intervalsSet = true

        //random enemy generation at every 2 seconds
        setInterval(() => {
            if(!gameOver){
                enemies.push(new Enemy({ x: player.position.x - enemySpawnX, y: player.position.y-enemySpawnY }));

            }
        }, 2000)

        //random enemy generation at every 2 seconds
        setInterval(() => {
            if(!gameOver){
                enemyShooters.push(new EnemyShooter({ x: player.position.x + enemyShooterSpawnX, y: player.position.y-enemySpawnY}));

            }
        }, 2000)
    }
};

function animate() {
    if(gameOver){
        displayGameOver()
        return
    }
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    backgroundMusic.play()


    genericObjects.forEach(genericObject => {
        genericObject.draw();
    });
    fires.forEach(fire => {
        fire.update()
    })
    platforms.forEach(platform => {
        platform.draw();
    });
    

    player.update();

    player.velocity.x = 0;
    if ((keys.d.pressed && player.position.x < 500) || (keys.d.pressed && scrollOffset === deadEndDistance && player.position.x < deadEndDistance)) {
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
            enemyShooters.forEach(enemyShooter => {
                enemyShooter.position.x -= playerSpeed;
            });
            stones.forEach(stone => {
                stone.position.x -= playerSpeed;
            });
            fires.forEach(fire => {
                fire.position.x -= playerSpeed;
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
            enemyShooters.forEach(enemyShooter => {
                enemyShooter.position.x += playerSpeed;
            });
            stones.forEach(stone => {
                stone.position.x += playerSpeed;
            });
            fires.forEach(fire => {
                fire.position.x += playerSpeed;
            });
        }
    }

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

    //remove enemyShooter on bullet hit
    bullets.forEach((bullet, bulletIndex) => {
        bullet.update();
        enemyShooters.forEach((enemyShooter, enemyShooterIndex) => {
            if (detectBulletWithEnemyShooterCollision(bullet, enemyShooter)) {
                const deathSound = new Audio("../src/sounds/deathSound.mp3")
                deathSound.play()
                enemyShooters.splice(enemyShooterIndex, 1);
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    //remove Stones on bullet hit
    bullets.forEach((bullet, bulletIndex) => {
        bullet.update();

        stones.forEach((stone, stoneIndex) => {
            if (detectBulletToStoneCollision(bullet, stone)) {
                const deathSound = new Audio("../src/sounds/deathSound.mp3")
                deathSound.play()
                stones.splice(stoneIndex, 1);
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    //player dies to enemyshooters stone
    stones.forEach((stone) => {
        stone.update();

        if (detectStoneCollision(stone, player)) {
            playerDeathSound.play();
            console.log("you lose");
            // init(); // Reset the game
            loseLife()
        }
    });
    // Update and draw all stones
    stones.forEach((stone, index) => {
        stone.update();
        
        // Remove stones that are off the screen
        if (stone.position.x + stone.width < 0) {
            stones.splice(index, 1);
        }
    });

    // enemies are able to land on platform
    enemies.forEach(enemy => {
        enemy.update();
        platforms.forEach(platform => {
            if (detectCollisionWithEnemy(enemy, platform)) {
                enemy.velocity.y = 0;

            }
        });
    });

    // enemiesShooters are able to land on platform
    enemyShooters.forEach(enemyShooter => {
        enemyShooter.update();
        platforms.forEach(platform => {
            if (detectCollisionWithEnemyShooters(enemyShooter, platform)) {
                enemyShooter.velocity.y = 0;

            }
        });
    });

    // player dies and reset to start point
    enemies.forEach((enemy) => {
        if (detectPlayerEnemyCollision(player, enemy)) {
            playerDeathSound.play()
            console.log("you lose");
            // init(); // Reset the game
            loseLife()
        }
    });

    //player dies to enemy stone on collision
    enemyShooters.forEach((enemyShooter) => {
        if (detectPlayerEnemyShooterCollision(player, enemyShooter)) {
            playerDeathSound.play()
            console.log("you lose");
            // init(); // Reset the game
            loseLife()
        }
    });
    //player dies to fire

    fires.forEach((fire) => {
        if (detectPlayerFireCollision(player, fire)) {
            playerDeathSound.play()
            console.log("you lose");
            // init(); // Reset the game
            loseLife()
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
        // init(); // Reset the game
        loseLife()
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Lives: ${lives}`, 20, 50);  // Display lives
}

function loseLife() {
    lives -= 1;
    if (lives > 0) {
        init(); // Reset the game
    } else {
        gameOver = true;  // Set game over if no lives left
    }
}

function displayGameOver() {
    ctx.fillStyle = "White";
    ctx.font = "bold 50px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);  // Display game over message
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

// collision detection between enemyShooter on platform top
function detectCollisionWithEnemyShooters(enemyShooter: EnemyShooter, platform: Platform) {
    return enemyShooter.position.y + enemyShooter.height <= platform.position.y &&
        enemyShooter.position.y + enemyShooter.height + enemyShooter.velocity.y >= platform.position.y &&
        enemyShooter.position.x + enemyShooter.width >= platform.position.x &&
        enemyShooter.position.x <= platform.position.x + platform.width;
}


//detect collion of bullet with enemy
function detectBulletCollision(bullet: Bullet, enemy: Enemy): boolean {
    return bullet.position.x < enemy.position.x + enemy.width / 2 &&
        bullet.position.x + bullet.width / 2 > enemy.position.x &&
        bullet.position.y < enemy.position.y + enemy.height &&
        bullet.position.y + bullet.height > enemy.position.y;
}
//detect collision player with fire
function detectPlayerFireCollision(player: Player, fire: Fire): boolean {
    return player.position.x < fire.position.x + fire.width / 2 &&
        player.position.x + player.width / 2 > fire.position.x &&
        player.position.y < fire.position.y + fire.height/2 &&
        player.position.y + player.height/2 > fire.position.y;
}

//detect collion of bullet with enemyShooter
function detectBulletWithEnemyShooterCollision(bullet: Bullet, enemyShooter: EnemyShooter): boolean {
    return bullet.position.x < enemyShooter.position.x + enemyShooter.width / 2 &&
        bullet.position.x + bullet.width / 2 > enemyShooter.position.x &&
        bullet.position.y < enemyShooter.position.y + enemyShooter.height &&
        bullet.position.y + bullet.height > enemyShooter.position.y;
}

//detect collion of player with Stone 
function detectStoneCollision(stone: Stone, player: Player): boolean {
    return stone.position.x < player.position.x + player.width / 2 &&
        stone.position.x + stone.width / 2 > player.position.x &&
        stone.position.y < player.position.y + player.height &&
        stone.position.y + stone.height > player.position.y;
}

//detect collion of bullet with enemyShooter
function detectBulletToStoneCollision(bullet: Bullet, stone: Stone): boolean {
    return bullet.position.x < stone.position.x + stone.width / 2 &&
        bullet.position.x + bullet.width / 2 > stone.position.x &&
        bullet.position.y < stone.position.y + stone.height &&
        bullet.position.y + bullet.height > stone.position.y;
}


// detect collision between player and enemy
function detectPlayerEnemyCollision(player: Player, enemy: Enemy): boolean {
    return player.position.x < enemy.position.x + enemy.width / 2 &&
        player.position.x + player.width / 2 > enemy.position.x &&
        player.position.y < enemy.position.y + enemy.height / 2 &&
        player.position.y + player.height / 2 > enemy.position.y;
}

// detect collision between player and enemyShooter
function detectPlayerEnemyShooterCollision(player: Player, enemyShooter: EnemyShooter): boolean {
    return player.position.x < enemyShooter.position.x + enemyShooter.width / 2 &&
        player.position.x + player.width / 2 > enemyShooter.position.x &&
        player.position.y < enemyShooter.position.y + enemyShooter.height / 2 &&
        player.position.y + player.height / 2 > enemyShooter.position.y;
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
                    bullets.push(new Bullet({ x: player.position.x - player.width, y: player.position.y }, { velocityX: -10, velocityY: 0 }, 100, 100))
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



