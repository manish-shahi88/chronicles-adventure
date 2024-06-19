import GenericObject from "./GenericObjects";
import { backgroundImg, hillsImg, image } from "./main";
import Platform from "./Platforms";
import Player from "./Player";

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
      genericObjects = [new GenericObject({ x: 0, y: 0, image:backgroundImg }), new Platform({ x: 600, y: 400, image:backgroundImg }),new Platform({ x: 300, y: 100, image:hillsImg })]
    }
}

function animate() {
    throw new Error("Function not implemented.");
}
