import GenericObject from "./components/nonMovable/GenericObjects";
import { backgroundImg, image, treeImg } from "./main";
import Platform from "./components/nonMovable/Platforms";
import Player from "./components/movable/player/Player";

export default function init(){
    // @ts-ignore
    let player = new Player();
    // @ts-ignore
    let platforms: Platform[] = [];
    // @ts-ignore
    let genericObjects: GenericObject[] = []
    image.onload = () => {
        platforms = [new Platform({ x: 0, y: 500, image }), new Platform({ x: image.width, y: 500, image }),new Platform({ x: image.width*2+150, y: 500, image })];
        animate();
    };
    
    backgroundImg.onload = () =>{
      genericObjects = [new GenericObject({ x: 0, y: 0, image:backgroundImg }), new Platform({ x: 600, y: 400, image:backgroundImg }),new Platform({ x: 300, y: 100, image:treeImg })]
    }
}

function animate() {
    throw new Error("Function not implemented.");
}
