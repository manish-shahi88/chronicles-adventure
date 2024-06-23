import Enemy from "../components/movable/enemy/enemy";
import EnemyShooter from "../components/movable/enemy/enemyShooter";
import Stone from "../components/movable/enemy/stone";
import Player from "../components/movable/player/Player";
import Bullet from "../components/movable/player/bullet";
import Platform from "../components/nonMovable/Platforms";
import Fire from "../components/nonMovable/fire";
// import Enemy from "../components/nonMovable/fire";

// collision detection between player and platform
export function detectCollision(player: Player, platform: Platform) {
    return player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width;
}

// collision detection between enemy on platform top
export function detectCollisionWithEnemy(enemy: Enemy, platform: Platform) {
    return enemy.position.y + enemy.height <= platform.position.y &&
        enemy.position.y + enemy.height + enemy.velocity.y >= platform.position.y &&
        enemy.position.x + enemy.width >= platform.position.x &&
        enemy.position.x <= platform.position.x + platform.width;
}

// collision detection between enemyShooter on platform top
export function detectCollisionWithEnemyShooters(enemyShooter: EnemyShooter, platform: Platform) {
    return enemyShooter.position.y + enemyShooter.height <= platform.position.y &&
        enemyShooter.position.y + enemyShooter.height + enemyShooter.velocity.y >= platform.position.y &&
        enemyShooter.position.x + enemyShooter.width >= platform.position.x &&
        enemyShooter.position.x <= platform.position.x + platform.width;
}


//detect collion of bullet with enemy
export function detectBulletCollision(bullet: Bullet, enemy: Enemy): boolean {
    return bullet.position.x < enemy.position.x + enemy.width / 2 &&
        bullet.position.x + bullet.width / 2 > enemy.position.x &&
        bullet.position.y < enemy.position.y + enemy.height &&
        bullet.position.y + bullet.height > enemy.position.y;
}

//detect collion of bullet with enemyShooter
export function detectBulletWithEnemyShooterCollision(bullet: Bullet, enemyShooter: EnemyShooter): boolean {
    return bullet.position.x < enemyShooter.position.x + enemyShooter.width / 2 &&
        bullet.position.x + bullet.width / 2 > enemyShooter.position.x &&
        bullet.position.y < enemyShooter.position.y + enemyShooter.height &&
        bullet.position.y + bullet.height > enemyShooter.position.y;
}

//detect collion of player with Stone 
export function detectStoneCollision(stone: Stone, player: Player): boolean {
    return stone.position.x < player.position.x + player.width / 2 &&
        stone.position.x + stone.width / 2 > player.position.x &&
        stone.position.y < player.position.y + player.height &&
        stone.position.y + stone.height > player.position.y;
}

//detect collion of bullet with enemyShooter
export function detectBulletToStoneCollision(bullet: Bullet, stone: Stone): boolean {
    return bullet.position.x < stone.position.x + stone.width / 2 &&
        bullet.position.x + bullet.width / 2 > stone.position.x &&
        bullet.position.y < stone.position.y + stone.height &&
        bullet.position.y + bullet.height > stone.position.y;
}


// detect collision between player and enemy
export function detectPlayerEnemyCollision(player: Player, enemy: Enemy): boolean {
    return player.position.x < enemy.position.x + enemy.width / 2 &&
        player.position.x + player.width / 2 > enemy.position.x &&
        player.position.y < enemy.position.y + enemy.height / 2 &&
        player.position.y + player.height / 2 > enemy.position.y;
}

// detect collision between player and enemyShooter
export function detectPlayerEnemyShooterCollision(player: Player, enemyShooter: EnemyShooter): boolean {
    return player.position.x < enemyShooter.position.x + enemyShooter.width / 2 &&
        player.position.x + player.width / 2 > enemyShooter.position.x &&
        player.position.y < enemyShooter.position.y + enemyShooter.height / 2 &&
        player.position.y + player.height / 2 > enemyShooter.position.y;
}


// detect collision between player and fire
export function detectPlayerFireCollision(player: Player, fire: Fire): boolean {
    return player.position.x < fire.position.x + fire.width / 2 &&
        player.position.x + player.width / 2 > fire.position.x &&
        player.position.y < fire.position.y + fire.height / 2 &&
        player.position.y + player.height / 2 > fire.position.y;
}