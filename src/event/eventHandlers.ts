// // KeyHandlers.ts

// import Player from "../components/movable/player/Player";
// import Bullet from "../components/movable/player/bullet";
// let bulletFired = false;


// export const keys = {
//     d: {
//         pressed: false
//     },
//     a: {
//         pressed: false
//     },
//     shoot: {
//         pressed: false
//     },
//     jump: {
//         pressed: false
//     }
// };

// export function setupKeyHandlers(keys:any, player:Player, bullets:any[], bulletSoundSrc:string) {
//     window.addEventListener("keydown", (event) => {
//         switch (event.key) {
//             case "a":
//             case "A":
//                 keys.a.pressed = true;
//                 player.currentSprite = player.sprites.runLeft.left;
//                 break;
//             case "d":
//             case "D":
//                 keys.d.pressed = true;
//                 player.currentSprite = player.sprites.run.right;
//                 break;
//             case " ":
//                 keys.jump.pressed = true;
//                 player.velocity.y = -12;
//                 break;
//             case "Enter":
//                 if (!bulletFired) {
//                     keys.shoot.pressed = true;
//                     bulletFired = true;
//                     const bulletSound = new Audio(bulletSoundSrc);
//                     bulletSound.volume = 0.4;
//                     bulletSound.play();
//                     if (player.currentSprite === player.sprites.runLeft.left) {
//                         bullets.push(new Bullet({ x: player.position.x - player.width, y: player.position.y }, { velocityX: -10, velocityY: 0 }, 100, 100));
//                     } else if (player.currentSprite === player.sprites.run.right) {
//                         bullets.push(new Bullet({ x: player.position.x + player.width, y: player.position.y }, { velocityX: 10, velocityY: 0 }, 100, 100));
//                     }
//                 }
//                 break;
//         }
//     });

//     window.addEventListener("keyup", (event) => {
//         switch (event.key) {
//             case "a":
//             case "d":
//                 keys[event.key.toLowerCase()].pressed = false;
//                 player.currentCroppWidth = 290;
//                 player.currentCropHeight = 65;
//                 break;
//             case "Enter":
//                 keys.shoot.pressed = false;
//                 bulletFired = false;
//                 break;
//         }
//     });
// }





