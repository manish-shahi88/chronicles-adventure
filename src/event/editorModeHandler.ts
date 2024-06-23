// // // EditorMode.ts
// // export let selectedObjectType: 'platform' | 'enemy' | 'fire' = 'platform';
// // export let draggingObject: any = null;

// // export function setupEditorControls(canvas: HTMLCanvasElement, platforms: any[], enemies: any[], fires: any[], Platform: any, Enemy: any, Fire: any, image: any) {
// //     document.getElementById('selectPlatform')!.addEventListener('click', () => {
// //         selectedObjectType = 'platform';
// //     });

// //     document.getElementById('selectEnemy')!.addEventListener('click', () => {
// //         selectedObjectType = 'enemy';
// //     });

// //     document.getElementById('selectFire')!.addEventListener('click', () => {
// //         selectedObjectType = 'fire';
// //     });

// //     document.getElementById('saveLevel')!.addEventListener('click', () => saveLevel(platforms, enemies, fires));
// //     document.getElementById('loadLevel')!.addEventListener('click', () => {
// //         document.getElementById('fileInput')!.click();
// //     });
// //     document.getElementById('fileInput')!.addEventListener('change', (event) => loadLevel(event, platforms, enemies, fires, Platform, Enemy, Fire, image));

// //     canvas.addEventListener('mousedown', (e) => {
// //         const mouseX = e.offsetX;
// //         const mouseY = e.offsetY;
// //         draggingObject = findObjectAtPosition(mouseX, mouseY, platforms, enemies, fires);
// //         if (!draggingObject) {
// //             placeObject(mouseX, mouseY, platforms, enemies, fires, Platform, Enemy, Fire, image);
// //         }
// //     });

// //     canvas.addEventListener('mousemove', (e) => {
// //         if (draggingObject) {
// //             const mouseX = e.offsetX;
// //             const mouseY = e.offsetY;
// //             draggingObject.position.x = mouseX;
// //             draggingObject.position.y = mouseY;
// //         }
// //     });

// //     canvas.addEventListener('mouseup', () => {
// //         draggingObject = null;
// //     });
// // }

// // function placeObject(x: number, y: number, platforms: any[], enemies: any[], fires: any[], Platform: any, Enemy: any, Fire: any, image: any) {
// //     if (selectedObjectType === 'platform') {
// //         platforms.push(new Platform({ x, y, image }));
// //     } else if (selectedObjectType === 'enemy') {
// //         enemies.push(new Enemy({ x, y }));
// //     } else if (selectedObjectType === 'fire') {
// //         fires.push(new Fire({ x, y }));
// //     }
// // }

// // function findObjectAtPosition(x: number, y: number, platforms: any[], enemies: any[], fires: any[]) {
// //     return platforms.find(platform => x >= platform.position.x && x <= platform.position.x + platform.width &&
// //         y >= platform.position.y && y <= platform.position.y + platform.height) ||
// //         enemies.find(enemy => x >= enemy.position.x && x <= enemy.position.x + enemy.width &&
// //         y >= enemy.position.y && y <= enemy.position.y + enemy.height) ||
// //         fires.find(fire => x >= fire.position.x && x <= fire.position.x + fire.width &&
// //         y >= fire.position.y && y <= fire.position.y + fire.height);
// // }

// // function saveLevel(platforms: any[], enemies: any[], fires: any[]) {
// //     const levelData = {
// //         platforms: platforms.map(platform => ({ x: platform.position.x, y: platform.position.y })),
// //         enemies: enemies.map(enemy => ({ x: enemy.position.x, y: enemy.position.y })),
// //         fires: fires.map(fire => ({ x: fire.position.x, y: fire.position.y }))
// //     };
// //     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(levelData));
// //     const downloadAnchorNode = document.createElement('a');
// //     downloadAnchorNode.setAttribute("href", dataStr);
// //     downloadAnchorNode.setAttribute("download", "level.json");
// //     document.body.appendChild(downloadAnchorNode);
// //     downloadAnchorNode.click();
// //     downloadAnchorNode.remove();
// // }

// // function loadLevel(event: Event, platforms: any[], enemies: any[], fires: any[], Platform: any, Enemy: any, Fire: any, image: any) {
// //     const fileInput = event.target as HTMLInputElement;
// //     if (fileInput.files) {
// //         const file = fileInput.files[0];
// //         const reader = new FileReader();
// //         reader.onload = (e) => {
// //             const levelData = JSON.parse(e.target!.result as string);
// //             loadLevelData(levelData, platforms, enemies, fires, Platform, Enemy, Fire, image);
// //         };
// //         reader.readAsText(file);
// //     }
// // }

// // function loadLevelData(levelData: any, platforms: any[], enemies: any[], fires: any[], Platform: any, Enemy: any, Fire: any, image: any) {
// //     platforms.length = 0; // Clear existing data
// //     enemies.length = 0;
// //     fires.length = 0;

// //     platforms.push(...levelData.platforms.map((platformData: any) => new Platform({ x: platformData.x, y: platformData.y, image })));
// //     enemies.push(...levelData.enemies.map((enemyData: any) => new Enemy({ x: enemyData.x, y: enemyData.y })));
// //     fires.push(...levelData.fires.map((fireData: any) => new Fire({ x: fireData.x, y: fireData.y })));
// // }




// // editorMode.ts

// // import { getPlatforms, setPlatforms, getEnemies, setEnemies, getFires, setFires } from '../../src/gameState';
// // import Enemy from '../components/movable/enemy/enemy';
// // import Platform from '../components/nonMovable/Platforms';
// // import Fire from '../components/nonMovable/fire';
// // import { image } from '../main';
// // // import Platform from './components/nonMovable/Platforms';
// // // import Enemy from './components/movable/enemy/enemy';
// // // import Fire from './components/nonMovable/fire';

// // export let selectedObjectType: string;
// // export let draggingObject: any;

// // export function initializeEditorMode(canvas: HTMLCanvasElement, image: HTMLImageElement) {
// //     document.getElementById('selectPlatform')!.addEventListener('click', () => {
// //         selectedObjectType = 'platform';
// //     });

// //     document.getElementById('selectEnemy')!.addEventListener('click', () => {
// //         selectedObjectType = 'enemy';
// //     });

// //     document.getElementById('selectFire')!.addEventListener('click', () => {
// //         selectedObjectType = 'fire';
// //     });

// //     document.getElementById('saveLevel')!.addEventListener('click', saveLevel);
// //     document.getElementById('loadLevel')!.addEventListener('click', () => {
// //         document.getElementById('fileInput')!.click();
// //     });
// //     document.getElementById('fileInput')!.addEventListener('change', loadLevel);

// //     canvas.addEventListener('mousedown', (e) => {
// //         const mouseX = e.offsetX;
// //         const mouseY = e.offsetY;
// //         draggingObject = findObjectAtPosition(mouseX, mouseY);
// //         if (!draggingObject) {
// //             placeObject(mouseX, mouseY, image);
// //         }
// //     });

// //     canvas.addEventListener('mousemove', (e) => {
// //         if (draggingObject) {
// //             const mouseX = e.offsetX;
// //             const mouseY = e.offsetY;
// //             draggingObject.position.x = mouseX;
// //             draggingObject.position.y = mouseY;
// //         }
// //     });

// //     canvas.addEventListener('mouseup', () => {
// //         draggingObject = null;
// //     });
// // }

// // function placeObject(x: number, y: number, image: HTMLImageElement) {
// //     const platforms = getPlatforms();
// //     const enemies = getEnemies();
// //     const fires = getFires();

// //     if (selectedObjectType === 'platform') {
// //         platforms.push(new Platform({ x, y, image }));
// //         setPlatforms(platforms);
// //     } else if (selectedObjectType === 'enemy') {
// //         enemies.push(new Enemy({ x, y }));
// //         setEnemies(enemies);
// //     } else if (selectedObjectType === 'fire') {
// //         fires.push(new Fire({ x, y }));
// //         setFires(fires);
// //     }
// // }

// // function findObjectAtPosition(x: number, y: number) {
// //     const platforms = getPlatforms();
// //     const enemies = getEnemies();
// //     const fires = getFires();

// //     return platforms.find(platform => x >= platform.position.x && x <= platform.position.x + platform.width &&
// //         y >= platform.position.y && y <= platform.position.y + platform.height) ||
// //         enemies.find(enemy => x >= enemy.position.x && x <= enemy.position.x + enemy.width &&
// //         y >= enemy.position.y && y <= enemy.position.y + enemy.height) ||
// //         fires.find(fire => x >= fire.position.x && x <= fire.position.x + fire.width &&
// //         y >= fire.position.y && y <= fire.position.y + fire.height);
// // }

// // function saveLevel() {
// //     const platforms = getPlatforms();
// //     const enemies = getEnemies();
// //     const fires = getFires();

// //     const levelData = {
// //         platforms: platforms.map(platform => ({ x: platform.position.x, y: platform.position.y })),
// //         enemies: enemies.map(enemy => ({ x: enemy.position.x, y: enemy.position.y })),
// //         fires: fires.map(fire => ({ x: fire.position.x, y: fire.position.y }))
// //     };
// //     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(levelData));
// //     const downloadAnchorNode = document.createElement('a');
// //     downloadAnchorNode.setAttribute("href", dataStr);
// //     downloadAnchorNode.setAttribute("download", "level.json");
// //     document.body.appendChild(downloadAnchorNode);
// //     downloadAnchorNode.click();
// //     downloadAnchorNode.remove();
// // }

// // function loadLevel(event: Event) {
// //     const fileInput = event.target as HTMLInputElement;
// //     if (fileInput.files) {
// //         const file = fileInput.files[0];
// //         const reader = new FileReader();
// //         reader.onload = (e) => {
// //             const levelData = JSON.parse(e.target!.result as string);
// //             loadLevelData(levelData);
// //         };
// //         reader.readAsText(file);
// //     }
// // }

// // function loadLevelData(levelData: any) {
// //     const platforms = levelData.platforms.map((platformData: any) => new Platform({ x: platformData.x, y: platformData.y, image }));
// //     const enemies = levelData.enemies.map((enemyData: any) => new Enemy({ x: enemyData.x, y: enemyData.y }));
// //     const fires = levelData.fires.map((fireData: any) => new Fire({ x: fireData.x, y: fireData.y }));

// //     setPlatforms(platforms);
// //     setEnemies(enemies);
// //     setFires(fires);
// // }



// // editorMode.ts

// import { getPlatforms, setPlatforms, getEnemies, setEnemies, getFires, setFires } from '../gameState';
// import Platform from '../components/nonMovable/Platforms';
// import Enemy from '../components/movable/enemy/enemy';
// import Fire from '../components/nonMovable/fire';
// import { image } from '../main';

// export let selectedObjectType: string;
// export let draggingObject: any;

// export function initializeEditorMode(canvas: HTMLCanvasElement, image: HTMLImageElement) {
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
//         const mouseX = e.offsetX;
//         const mouseY = e.offsetY;
//         draggingObject = findObjectAtPosition(mouseX, mouseY);
//         if (!draggingObject) {
//             placeObject(mouseX, mouseY, image);
//         }
//     });

//     canvas.addEventListener('mousemove', (e) => {
//         if (draggingObject) {
//             const mouseX = e.offsetX;
//             const mouseY = e.offsetY;
//             draggingObject.position.x = mouseX;
//             draggingObject.position.y = mouseY;
//         }
//     });

//     canvas.addEventListener('mouseup', () => {
//         draggingObject = null;
//     });
// }

// function placeObject(x: number, y: number, image: HTMLImageElement) {
//     const platforms = getPlatforms();
//     const enemies = getEnemies();
//     const fires = getFires();

//     if (selectedObjectType === 'platform') {
//         platforms.push(new Platform({ x, y, image }));
//         setPlatforms(platforms);
//     } else if (selectedObjectType === 'enemy') {
//         enemies.push(new Enemy({ x, y }));
//         setEnemies(enemies);
//     } else if (selectedObjectType === 'fire') {
//         fires.push(new Fire({ x, y }));
//         setFires(fires);
//     }
// }

// function findObjectAtPosition(x: number, y: number) {
//     const platforms = getPlatforms();
//     const enemies = getEnemies();
//     const fires = getFires();

//     return platforms.find(platform => x >= platform.position.x && x <= platform.position.x + platform.width &&
//         y >= platform.position.y && y <= platform.position.y + platform.height) ||
//         enemies.find(enemy => x >= enemy.position.x && x <= enemy.position.x + enemy.width &&
//         y >= enemy.position.y && y <= enemy.position.y + enemy.height) ||
//         fires.find(fire => x >= fire.position.x && x <= fire.position.x + fire.width &&
//         y >= fire.position.y && y <= fire.position.y + fire.height);
// }

// function saveLevel() {
//     const platforms = getPlatforms();
//     const enemies = getEnemies();
//     const fires = getFires();

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

// function loadLevelData(levelData: any) {
//     const platforms = levelData.platforms.map((platformData: any) => new Platform({ x: platformData.x, y: platformData.y, image }));
//     const enemies = levelData.enemies.map((enemyData: any) => new Enemy({ x: enemyData.x, y: enemyData.y }));
//     const fires = levelData.fires.map((fireData: any) => new Fire({ x: fireData.x, y: fireData.y }));

//     setPlatforms(platforms);
//     setEnemies(enemies);
//     setFires(fires);
// }
