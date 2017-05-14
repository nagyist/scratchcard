import {
    Graphics, 
    Sprite,
    Container,
    RenderTexture
} from 'pixi.js';
import InverseDrawingMask from '../utils/Mask';
import renderer from '../index';
import Stage from '../core/Stage';
import Renderer from '../core/Renderer';

export default class Card extends Stage {
    drawingMask: any;
    game: any;
    config: any;
    constructor(game, config){
        super();
        this.game = game;
        this.config = config;
        this.resources = {
            cover: 'cover.png'
        };

        // Set size from config file
        const {size} = this.config;
        this.width = size.width;
        this.height = size.height;        
        
        // Create a drawing mask
        this.drawingMask = new InverseDrawingMask(this);
    }

    // preload sprites
    preload(): object{
        return this.resources;
    }

    // Build slot grid
    buildGrid(): void{
        const {positions, slotSize, size} = this.config;

        positions.map(position => {
            
            let rect = new Graphics();
            rect.beginFill(0x666666);
            rect.drawRoundedRect(position[0], position[1],slotSize, slotSize, 3);
            rect.endFill();
            this.addChild(rect);
        })
    }

    // Update the stage with a mask texture
    update(elapsedTime: number): void {
        const {positions, slotSize} = this.config;
		if(this.drawingMask){
			this.drawingMask.update();
        }
	}

    // render the stage
    render(resources: object, renderer: any): void{ 
        const {positions, slotSize, size} = this.config;
        //Mask sprite
        let bg = new Graphics();
        bg.beginFill(0xfff000)
        bg.drawRect(0, 0, size.width, size.height)
        bg.endFill();
        this.addChild(bg);

        this.buildGrid();

        // Cover the results with cover.png
        positions.map((position: number[], index: number): void => {
            let obj = {};
            obj['cover'+ index] = new Sprite(resources[this.resources.cover].texture);
            obj['cover'+ index].x = position[0];
            obj['cover'+ index].y = position[1];
            obj['cover'+ index].interactive = true;
            obj['cover'+ index].mask = this.drawingMask.getMaskSprite();
            this.addChild(obj['cover'+ index]);
        })        
    }
}