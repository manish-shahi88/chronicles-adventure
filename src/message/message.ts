// // Display "Victory" message
// export function displayYouWin(ctx: CanvasRenderingContext2D, gameOver: boolean, victory: boolean) {
//     ctx.fillStyle = "Green";
//     ctx.font = "bold 70px Arial";
//     ctx.fillText("Victory", ctx.canvas.width / 2 - 100, ctx.canvas.height / 2);
//     gameOver = false
//     victory = true
// }

// Display "Game Over" message
// export function displayGameOver(ctx: CanvasRenderingContext2D) {
//     ctx.fillStyle = "White";
//     ctx.font = "bold 50px Arial";
//     ctx.fillText("Game Over", ctx.canvas.width / 2 - 100, ctx.canvas.height / 2);
// }


// export function showGuidanceText(ctx: CanvasRenderingContext2D, showGuidance: boolean) {
//     if (showGuidance) {
//         ctx.fillStyle = "white";
//         ctx.font = "14px Arial";
//         ctx.fillText("Use keys to Play:", 20, 80);
//         ctx.fillText("A: Move Left", 30, 100);
//         ctx.fillText("D: Move Right", 30, 120);
//         ctx.fillText("Space: Jump", 30, 140);
//         ctx.fillText("Enter: Fire", 30, 160);
//         ctx.fillText("P: Pause", 30, 180);
//         ctx.fillText("Press 'G' to toggle guidance", 20, 220);
//     }
// }


// export function showDroneMessageText(ctx: CanvasRenderingContext2D, showDroneMessage:boolean) {
//     if (showDroneMessage) {
//         ctx.fillStyle = "White";
//         ctx.font = "25px Arial";
//         ctx.fillText("Friendly fighter drone is on the way...", ctx.canvas.width / 2 - 200, ctx.canvas.height / 2 - 50);
//     }
// }
