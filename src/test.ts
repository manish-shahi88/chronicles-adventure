// import platform from "/images/platform.png";
// import background from "/images/background.png";
// import tree from "/images/tree.png";

// import zombieSoundSrc from "/sounds/zombieSound.mp3";
// import backgroundMusicSrc from "/sounds/backgroundMusic.mp3";
// import playerDeathSoundSrc from "/sounds/soldierScream.mp3";
// import deathSoundSrc from "/sounds/deathSound.mp3";
// import bulletSoundSrc from "/sounds/gunfire.mp3";

// import Platform from "./components/nonMovable/Platforms";
// import Player from "./components/movable/player/Player";
// import GenericObject from "./components/nonMovable/GenericObjects";
// import { deadEndDistance, enemyShooterSpawnX, enemySpawnX, enemySpawnY, genericObjectSpeed, pit, playerSpeed, treeSpace } from "./constants";
// import Bullet from "./components/movable/player/bullet";
// import Enemy from "./components/movable/enemy/enemy";
// import EnemyShooter from "./components/movable/enemy/enemyShooter";
// import Stone from "./components/movable/enemy/stone";
// import Fire from "./components/nonMovable/fire";
// import { detectBulletCollision, detectBulletToStoneCollision, detectBulletWithEnemyShooterCollision, detectCollision, detectCollisionWithEnemy, detectCollisionWithEnemyShooters, detectPlayerEnemyCollision, detectPlayerEnemyShooterCollision, detectPlayerFireCollision, detectStoneCollision } from "./physics/collisionDetection";

// // Canvas setup
// export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// export const ctx = canvas.getContext("2d")!;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // Images assets
// export const image = new Image();
// image.src = platform;

// export const backgroundImg = new Image();
// backgroundImg.src = background;

// export const treeImg = new Image();
// treeImg.src = tree;

// // Audio assets
// const zombieSound = new Audio(zombieSoundSrc);
// zombieSound.volume = 0.4;
// const backgroundMusic = new Audio(backgroundMusicSrc);
// backgroundMusic.volume = 0.4;
// const playerDeathSound = new Audio(playerDeathSoundSrc);
// playerDeathSound.volume = 0.9;
// backgroundMusic.loop = true;

// export let player: Player;
// export let enemies: Enemy[] = [];
// export let enemyShooters: EnemyShooter[] = [];

// export let bullets: Bullet[] = [];
// export let stones: Stone[] = [];
// export let platforms: Platform[] = [];
// let genericObjects: GenericObject[] = [];
// export let fires: Fire[] = [];
// export const keys = {
//     d: { pressed: false },
//     a: { pressed: false },
//     shoot: { pressed: false },
//     jump: { pressed: false }
// };

// let scrollOffset = 0;
// let bulletFired = false;
// let intervalsSet = false;
// let lives = 5;
// let gameOver = false;
// let paused = false; // Add paused state

// // Editor mode settings
// let editorMode = window.location.pathname.includes("levelEditor.html");
// let selectedObjectType: 'platform' | 'enemy' | 'fire' = 'platform';
// let draggingObject: any = null;

// // Initialize game state
// function init() {
//     if (editorMode) {
//         // Initialize editor-specific settings if needed
//     }

//     if (lives <= 0) {
//         gameOver = true;
//         return;
//     }
//     player = new Player();

//     // Create Platforms
//     platforms = [
//         new Platform({ x: 0, y: 500, image }),
//         new Platform({ x: image.width, y: 500, image }),
//         new Platform({ x: image.width * 2 + pit, y: 500, image }),
//         new Platform({ x: image.width * 3 + pit * 2, y: 400, image }),
//         new Platform({ x: image.width * 4 + pit * 3, y: 300, image }), //
//         new Platform({ x: image.width * 5 + pit * 4, y: 200, image }),
//         new Platform({ x: image.width * 6 + pit * 5 + pit, y: 300, image }),
//         new Platform({ x: image.width * 7 + pit * 6 + pit * 2, y: 300, image }),
//         new Platform({ x: image.width * 8 + pit * 7 + pit * 3, y: 400, image }),
//         new Platform({ x: image.width * 9 + pit * 8 + pit * 4, y: 500, image }),
//         new Platform({ x: image.width * 10 + pit * 9 + pit * 4, y: 400, image }),
//         new Platform({ x: image.width * 11 + pit * 10 + pit * 4, y: 500, image }),
//         new Platform({ x: image.width * 12 + pit * 11 + pit * 4, y: 500, image }),
//         new Platform({ x: image.width * 13 + pit * 12 + pit * 3, y: 500, image }),
//         new Platform({ x: image.width * 14 + pit * 13 + pit * 3, y: 400, image }),
//         new Platform({ x: image.width * 15 + pit * 14 + pit * 3, y: 300, image }),
//         new Platform({ x: image.width * 16 + pit * 15 + pit * 3, y: 400, image }),
//         new Platform({ x: image.width * 17 + pit * 16 + pit * 3, y: 300, image }),
//         new Platform({ x: image.width * 18 + pit * 17 + pit * 3, y: 500, image }),
//         new Platform({ x: image.width * 19 + pit * 18 + pit * 4, y: 500, image }),
//         new Platform({ x: image.width * 20 + pit * 19 + pit * 5, y: 500, image }),
//         new Platform({ x: image.width * 21 + pit * 20 + pit * 6, y: 500, image })
//     ];

//     // Create Static objects
//     genericObjects = [
//         new GenericObject({ x: 0, y: 0, image: backgroundImg }),
//         new GenericObject({ x: 300, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 2, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 3, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 5, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 7, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 9, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 10, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 12, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 13, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 14, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 15, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 16, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 17, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 18, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 19, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 20, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 21, y: 100, image: treeImg }),
//         new GenericObject({ x: 300 + treeSpace * 22, y: 100, image: treeImg }),
//     ];

//     // Create Fires
//     fires = [
//         new Fire({ x: image.width / 2, y: 400 }),
//         new Fire({ x: image.width / 2 * 2 + pit, y: 400 }),
//         new Fire({ x: image.width * 2 + pit * 2, y: 400 }),
//         new Fire({ x: image.width * 3 + pit * 3, y: 300 }),
//         new Fire({ x: image.width * 4 + pit * 4, y: 200 }),
//         new Fire({ x: image.width * 5 + pit * 5, y: 100 }),
//         new Fire({ x: image.width * 6 + pit * 6 + pit, y: 200 }),
//         new Fire({ x: image.width * 7 + pit * 7 + pit * 2, y: 200 }),
//         new Fire({ x: image.width * 8 + pit * 8 + pit * 3, y: 300 }),
//         new Fire({ x: image.width * 9 + pit * 9 + pit * 4, y: 400 }),
//         new Fire({ x: image.width * 10 + pit * 10 + pit * 4, y: 300 }),
//         new Fire({ x: image.width * 11 + pit * 11 + pit * 4, y: 400 }),
//         new Fire({ x: image.width * 12 + pit * 12 + pit * 4, y: 400 }),
//         new Fire({ x: image.width * 13 + pit * 13 + pit * 3, y: 400 }),
//         new Fire({ x: image.width * 14 + pit * 14 + pit * 4, y: 300 }),
//         new Fire({ x: image.width * 15 + pit * 15 + pit * 5, y: 200 }),
//         new Fire({ x: image.width * 16 + pit * 16 + pit * 4, y: 300 }),
//         new Fire({ x: image.width * 17 + pit * 17 + pit * 6, y: 200 }),
//     ];

//     scrollOffset = 0;
// }

// // Start the game loop once the image is loaded
// image.onload = () => {
//     init();
//     animate();

//     if (!intervalsSet) {
//         intervalsSet = true;
//         //random enemy generation at every 2 seconds
//         setInterval(() => {
//             if (!gameOver && !paused) {
//                 enemies.push(new Enemy({ x: player.position.x - enemySpawnX, y: player.position.y - enemySpawnY }));
//             }
//         }, 500);

//         //random enemy generation at every 2 seconds
//         setInterval(() => {
//             if (!gameOver && !paused) {
//                 enemyShooters.push(new EnemyShooter({ x: player.position.x + enemyShooterSpawnX, y: player.position.y - enemySpawnY }));
//             }
//         }, 2000);
//     }
// };

// // Display "Victory" message
// function displayYouWin() {
//     ctx.fillStyle = "Green";
//     ctx.font = "bold 70px Arial";
//     ctx.fillText("Victory", canvas.width / 2 - 100, canvas.height / 2);
// }

// // Main game loop
// function animate() {
//     if (gameOver || paused) {
//         if (paused) {
//             ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             ctx.fillStyle = "white";
//             ctx.font = "bold 70px Arial";
//             ctx.fillText("Paused", canvas.width / 2 - 100, canvas.height / 2);
//         }
//         return;
//     }
//     window.requestAnimationFrame(animate);
//     ctx.fillStyle = "white";
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     backgroundMusic.play();

//     // Draw background elements
//     genericObjects.forEach(genericObject => {
//         genericObject.draw();
//     });

//     // Update and draw fires
//     fires.forEach(fire => {
//         fire.update();
//     });

//     // Draw platforms
//     platforms.forEach(platform => {
//         platform.draw();
//     });

//     if (!editorMode) {
//         player.update();

//         // Handle player movement
//         player.velocity.x = 0;
//         if ((keys.d.pressed && player.position.x < 500) || (keys.d.pressed && scrollOffset === deadEndDistance && player.position.x < deadEndDistance)) {
//             player.velocity.x = playerSpeed;
//         } else if ((keys.a.pressed && player.position.x > 100) || (keys.a.pressed && scrollOffset === 0 && player.position.x > 0)) {
//             player.velocity.x = -playerSpeed;
//         } else {
//             player.velocity.x = 0;

//             if (keys.d.pressed && scrollOffset < deadEndDistance) {
//                 scrollOffset += playerSpeed;
//                 platforms.forEach(platform => {
//                     platform.position.x -= playerSpeed;
//                 });
//                 genericObjects.forEach(genericObject => {
//                     genericObject.position.x -= genericObjectSpeed;
//                 });
//                 enemies.forEach(enemy => {
//                     enemy.position.x -= playerSpeed;
//                 });
//                 enemyShooters.forEach(enemyShooter => {
//                     enemyShooter.position.x -= playerSpeed;
//                 });
//                 stones.forEach(stone => {
//                     stone.position.x -= playerSpeed;
//                 });
//                 fires.forEach(fire => {
//                     fire.position.x -= playerSpeed;
//                 });
//             } else if (keys.a.pressed && scrollOffset > 0) {
//                 scrollOffset -= playerSpeed;
//                 platforms.forEach(platform => {
//                     platform.position.x += playerSpeed;
//                 });
//                 genericObjects.forEach(genericObject => {
//                     genericObject.position.x += genericObjectSpeed;
//                 });
//                 enemies.forEach(enemy => {
//                     enemy.position.x += playerSpeed;
//                 });
//                 enemyShooters.forEach(enemyShooter => {
//                     enemyShooter.position.x += playerSpeed;
//                 });
//                 stones.forEach(stone => {
//                     stone.position.x += playerSpeed;
//                 });
//                 fires.forEach(fire => {
//                     fire.position.x += playerSpeed;
//                 });
//             }
//         }

//         // Handle bullet-enemy collision
//         bullets.forEach((bullet, bulletIndex) => {
//             bullet.update();
//             enemies.forEach((enemy, enemyIndex) => {
//                 if (detectBulletCollision(bullet, enemy)) {
//                     const deathSound = new Audio(deathSoundSrc);
//                     deathSound.play();
//                     enemies.splice(enemyIndex, 1);
//                     bullets.splice(bulletIndex, 1);
//                 }
//             });
//         });

//         // Handle bullet-stone collision
//         bullets.forEach((bullet, bulletIndex) => {
//             bullet.update();
//             enemyShooters.forEach((enemyShooter, enemyShooterIndex) => {
//                 if (detectBulletWithEnemyShooterCollision(bullet, enemyShooter)) {
//                     const deathSound = new Audio(deathSoundSrc);
//                     deathSound.play();
//                     enemyShooters.splice(enemyShooterIndex, 1);
//                     bullets.splice(bulletIndex, 1);
//                 }
//             });
//         });

//         // Handle stone collision with player
//         bullets.forEach((bullet, bulletIndex) => {
//             bullet.update();
//             stones.forEach((stone, stoneIndex) => {
//                 if (detectBulletToStoneCollision(bullet, stone)) {
//                     const deathSound = new Audio(deathSoundSrc);
//                     deathSound.play();
//                     stones.splice(stoneIndex, 1);
//                     bullets.splice(bulletIndex, 1);
//                 }
//             });
//         });

//         // Handle stone collision with player
//         stones.forEach((stone) => {
//             stone.update();
//             if (detectStoneCollision(stone, player)) {
//                 playerDeathSound.play();
//                 console.log("you lose");
//                 loseLife();
//             }
//         });

//         // Update and draw stones
//         stones.forEach((stone, index) => {
//             stone.update();

//             // Remove stones that are off the screen
//             if (stone.position.x + stone.width < 0) {
//                 stones.splice(index, 1);
//             }
//         });

//         // Enemies land on platforms
//         enemies.forEach(enemy => {
//             enemy.update();
//             platforms.forEach(platform => {
//                 if (detectCollisionWithEnemy(enemy, platform)) {
//                     enemy.velocity.y = 0;
//                 }
//             });
//         });

//         // Enemies shooters are able to land on platforms
//         enemyShooters.forEach(enemyShooter => {
//             enemyShooter.update();
//             platforms.forEach(platform => {
//                 if (detectCollisionWithEnemyShooters(enemyShooter, platform)) {
//                     enemyShooter.velocity.y = 0;
//                 }
//             });
//         });

//         // Handle player-enemy collision
//         enemies.forEach((enemy) => {
//             if (detectPlayerEnemyCollision(player, enemy)) {
//                 playerDeathSound.play();
//                 console.log("you lose");
//                 loseLife();
//             }
//         });

//         // Handle player-enemy shooter collision
//         enemyShooters.forEach((enemyShooter) => {
//             if (detectPlayerEnemyShooterCollision(player, enemyShooter)) {
//                 playerDeathSound.play();
//                 console.log("you lose");
//                 loseLife();
//             }
//         });

//         // Handle player-fire collision
//         fires.forEach((fire) => {
//             if (detectPlayerFireCollision(player, fire)) {
//                 playerDeathSound.play();
//                 console.log("you lose");
//                 loseLife();
//             }
//         });

//         // Handle player-platform collision
//         platforms.forEach(platform => {
//             if (detectCollision(player, platform)) {
//                 player.velocity.y = 0;
//             }
//         });

//         // Handle enemy-platform collision
//         enemies.forEach(enemy => {
//             enemy.update();
//             zombieSound.play();
//             platforms.forEach(platform => {
//                 if (detectCollisionWithEnemy(enemy, platform)) {
//                     enemy.velocity.y = 0;
//                 }
//             });
//         });

//         // Win condition
//         if (scrollOffset > deadEndDistance) {
//             displayYouWin(); // Call the function to display "You Win" message
//             return; // Stop further animation
//         }

//         // Lose condition
//         if (player.position.y > canvas.height) {
//             playerDeathSound.play();
//             console.log("you lose");
//             loseLife();
//         }

//         ctx.fillStyle = "white";
//         ctx.font = "20px Arial";
//         ctx.fillText(`Lives: ${lives}`, 20, 50); // Display lives
//     } else {
//         // Draw player in editor mode for reference
//         player.draw();
//     }
// }

// // Reduce player's life and reset the game if there are lives left
// function loseLife() {
//     lives -= 1;
//     if (lives > 0) {
//         init(); // Reset the game
//     } else {
//         gameOver = true;  // Set game over if no lives left
//     }
// }

// // Display "Game Over" message
// function displayGameOver() {
//     ctx.fillStyle = "White";
//     ctx.font = "bold 50px Arial";
//     ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);  // Display game over message
// }

// // Keypress events
// window.addEventListener("keydown", (event) => {
//     switch (event.key) {
//         case "a":
//         case "A": {
//             keys.a.pressed = true;
//             player.currentSprite = player.sprites.runLeft.left;
//             break;
//         }
//         case "d":
//         case "D": {
//             keys.d.pressed = true;
//             player.currentSprite = player.sprites.run.right;
//             break;
//         }
//         case " ": {
//             keys.jump.pressed = true;
//             player.velocity.y = -12;
//             console.log(event.key);
//             break;
//         }
//         case "Enter": {
//             if (!bulletFired) {
//                 keys.shoot.pressed = true;
//                 bulletFired = true;
//                 const bulletSound = new Audio(bulletSoundSrc);
//                 bulletSound.volume = 0.4;
//                 bulletSound.play();
//                 if (player.currentSprite === player.sprites.runLeft.left) {
//                     bullets.push(new Bullet({ x: player.position.x - player.width, y: player.position.y }, { velocityX: -10, velocityY: 0 }, 100, 100));
//                 } else if (player.currentSprite === player.sprites.run.right) {
//                     bullets.push(new Bullet({ x: player.position.x + player.width, y: player.position.y }, { velocityX: 10, velocityY: 0 }, 100, 100));
//                 }
//             }
//             break;
//         }
//         case "p":
//         case "P": {
//             paused = !paused; // Toggle pause state
//             if (!paused) {
//                 animate(); // Resume animation loop if unpaused
//             }
//             break;
//         }
//     }
// });

// window.addEventListener("keyup", (event) => {
//     switch (event.key) {
//         case "a": {
//             keys.a.pressed = false;
//             player.currentCroppWidth = 290;
//             player.currentCropHeight = 65;
//             break;
//         }
//         case "d": {
//             keys.d.pressed = false;
//             player.currentCroppWidth = 290;
//             player.currentCropHeight = 65;
//             break;
//         }
//         case "Enter": {
//             keys.shoot.pressed = false;
//             bulletFired = false;
//             break;
//         }
//     }
// });

// // Editor mode specific event listeners
// if (editorMode) {
//     document.getElementById('selectPlatform')!.addEventListener('click', () => {
//         selectedObjectType = 'platform';
//     });

//     document.getElementById('selectEnemy')!.addEventListener('click', () => {
//         selectedObjectType = 'enemy';
//     });

//     document.getElementById('selectFire')!.addEventListener('click', () => {
//         selectedObjectType = 'fire';
//     });

//     document.getElementById('saveLevel')!.addEventListener('click', saveLevel);
//     document.getElementById('loadLevel')!.addEventListener('click', () => {
//         document.getElementById('fileInput')!.click();
//     });
//     document.getElementById('fileInput')!.addEventListener('change', loadLevel);

//     canvas.addEventListener('mousedown', (e) => {
//         if (editorMode) {
//             const mouseX = e.offsetX;
//             const mouseY = e.offsetY;
//             draggingObject = findObjectAtPosition(mouseX, mouseY);
//             if (!draggingObject) {
//                 placeObject(mouseX, mouseY);
//             }
//         }
//     });

//     canvas.addEventListener('mousemove', (e) => {
//         if (editorMode && draggingObject) {
//             const mouseX = e.offsetX;
//             const mouseY = e.offsetY;
//             draggingObject.position.x = mouseX;
//             draggingObject.position.y = mouseY;
//         }
//     });

//     canvas.addEventListener('mouseup', () => {
//         if (editorMode) {
//             draggingObject = null;
//         }
//     });
// }

// // Place new object in editor mode
// function placeObject(x: number, y: number) {
//     if (selectedObjectType === 'platform') {
//         platforms.push(new Platform({ x, y, image }));
//     } else if (selectedObjectType === 'enemy') {
//         enemies.push(new Enemy({ x, y }));
//     } else if (selectedObjectType === 'fire') {
//         fires.push(new Fire({ x, y }));
//     }
// }

// // Find an object at a specific position in editor mode
// function findObjectAtPosition(x: number, y: number) {
//     return platforms.find(platform => x >= platform.position.x && x <= platform.position.x + platform.width &&
//         y >= platform.position.y && y <= platform.position.y + platform.height) ||
//         enemies.find(enemy => x >= enemy.position.x && x <= enemy.position.x + enemy.width &&
//             y >= enemy.position.y && y <= enemy.position.y + enemy.height) ||
//         fires.find(fire => x >= fire.position.x && x <= fire.position.x + fire.width &&
//             y >= fire.position.y && y <= fire.position.y + fire.height);
// }

// // Save the current level data
// function saveLevel() {
//     const levelData = {
//         platforms: platforms.map(platform => ({ x: platform.position.x, y: platform.position.y })),
//         enemies: enemies.map(enemy => ({ x: enemy.position.x, y: enemy.position.y })),
//         fires: fires.map(fire => ({ x: fire.position.x, y: fire.position.y }))
//     };
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(levelData));
//     const downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute("href", dataStr);
//     downloadAnchorNode.setAttribute("download", "level.json");
//     document.body.appendChild(downloadAnchorNode);
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
// }

// // Load a level from a file
// function loadLevel(event: Event) {
//     const fileInput = event.target as HTMLInputElement;
//     if (fileInput.files) {
//         const file = fileInput.files[0];
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const levelData = JSON.parse(e.target!.result as string);
//             loadLevelData(levelData);
//         };
//         reader.readAsText(file);
//     }
// }

// // Parse and load level data
// function loadLevelData(levelData: any) {
//     platforms = levelData.platforms.map((platformData: any) => new Platform({ x: platformData.x, y: platformData.y, image }));
//     enemies = levelData.enemies.map((enemyData: any) => new Enemy({ x: enemyData.x, y: enemyData.y }));
//     fires = levelData.fires.map((fireData: any) => new Fire({ x: fireData.x, y: fireData.y }));
// }
