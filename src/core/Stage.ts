import * as Pixi from 'pixi.js';

export default class Stage extends Pixi.Container {
    resources: any;
    constructor(){
        super();
    }

    // send resources to preloader
    preload(): object{
        return{};
    };

    // update stage
    update(elapsedTime: number){}

    //render stage
    render(resources?: any, renderer?: any): void{};
}