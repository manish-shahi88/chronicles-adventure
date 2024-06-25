import GenericObject from "./components/nonMovable/GenericObjects";
import { backgroundImg, canvas, image, treeImg } from "./main";
import Platform from "./components/nonMovable/Platforms";
import Player from "./components/movable/player/Player";
import { pit, treeSpace } from "./constants";

export default function init(){
    // @ts-ignore
    let player = new Player();
    // @ts-ignore
    let platforms: Platform[] = [];
    // @ts-ignore
    let genericObjects: GenericObject[] = []
    image.onload = () => {
        platforms = [new Platform({ x: 0, y: canvas.height - image.height, image }),
            new Platform({ x: image.width, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 2 + pit, y: canvas.height - image.height, image }),
            new Platform({ x: image.width * 3 + pit * 2, y: canvas.height- image.height*2, image }),
            new Platform({ x: image.width * 4 + pit * 3, y: canvas.height- image.height*3, image }),//
            new Platform({ x: image.width * 5 + pit * 4, y: canvas.height- image.height*4, image }),
            new Platform({ x: image.width * 6 + pit * 5 + pit, y: canvas.height- image.height*3, image }),
            new Platform({ x: image.width * 7 + pit * 6 + pit * 2, y: canvas.height- image.height*3, image }),
            new Platform({ x: image.width * 8 + pit * 7 + pit * 3, y: canvas.height- image.height*2, image }),
            new Platform({ x: image.width * 9 + pit * 8 + pit * 4, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 10 + pit * 9 + pit * 4, y: canvas.height- image.height*2, image }),
            new Platform({ x: image.width * 11 + pit * 10 + pit * 4, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 12 + pit * 11 + pit * 4, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 13 + pit * 12 + pit * 3, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 14 + pit * 13 + pit * 3, y: canvas.height- image.height*2, image }),
            new Platform({ x: image.width * 15 + pit * 14 + pit * 3, y: canvas.height- image.height*3, image }),
            new Platform({ x: image.width * 16 + pit * 15 + pit * 3, y: canvas.height- image.height*2, image }),
            new Platform({ x: image.width * 17 + pit * 16 + pit * 3, y: canvas.height- image.height*3, image }),
            new Platform({ x: image.width * 18 + pit * 17 + pit * 3, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 19 + pit * 18 + pit * 4, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 20 + pit * 19 + pit * 5, y: canvas.height- image.height, image }),
            new Platform({ x: image.width * 21 + pit * 20 + pit * 6, y: canvas.height- image.height, image })];
        animate();
    };
    
    backgroundImg.onload = () =>{
      genericObjects = [new GenericObject({ x: 300, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 2, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 3, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 5, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 7, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 9, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 10, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 12, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 13, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 14, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 15, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 16, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 17, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 18, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 19, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 20, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 21, y: canvas.height-treeImg.height, image: treeImg }),
        new GenericObject({ x: 300 + treeSpace * 22, y: canvas.height-treeImg.height, image: treeImg }),]
    }
}

function animate() {
    throw new Error("Function not implemented.");
}
