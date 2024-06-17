
import platform from "/platform.png";
import background from "/background.png";
import hills from "/hills.png";
import Platform from "./Platforms";
import Player from "./Player";
import GenericObject from "./GenericObjects";

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
let platforms: Platform[] = [];
let genericObjects: GenericObject[] = [];
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
};

let scrollOffset = 0;

function init() {
    player = new Player();
    platforms = [
        new Platform({ x: 0, y: 500, image }),
        new Platform({ x: image.width, y: 500, image }),
        new Platform({ x: image.width * 2 + 150, y: 500, image })
    ];
    genericObjects = [
        new GenericObject({ x: 0, y: 0, image: backgroundImg }),
        // new GenericObject({ x: 600, y: 400, image: backgroundImg }),
        new GenericObject({ x: 300, y: 100, image: hillsImg })
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
    if (keys.d.pressed && player.position.x < 500) {
        player.velocity.x = 5;
    } else if ((keys.a.pressed && player.position.x > 100) || (keys.a.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.d.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5;
            });
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= 2;
            });
        } else if (keys.a.pressed && scrollOffset > 0) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 5;
            });
            genericObjects.forEach(genericObject => {
                genericObject.position.x += 2;
            });
        }
    }

    platforms.forEach(platform => {
        if (detectCollision(player, platform)) {
            player.velocity.y = 0;
        }
    });

    // win condition
    if (scrollOffset > 2000) {
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
            break;
        }
        case "d": {
            keys.d.pressed = true;
            break;
        }
        case "w": {
            player.velocity.y = -10;
            break;
        }
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a": {
            keys.a.pressed = false;
            break;
        }
        case "d": {
            keys.d.pressed = false;
            break;
        }
    }
});
