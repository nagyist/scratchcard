import {Application} from 'pixi.js';
import Stage from './Stage';
import Preloader from './Preloader';

export default class Renderer {
    private app: any;
    private stages: any;
    preloader: any;
    resources: any;
    elapsedTime: any;
    currentStage: any;
    constructor(config){
        const {width, height} = config.size;
        this.app = new Application(width || 512, height || 512, config.options);
        document.querySelector(config.container).appendChild(this.app.view);
        this.stages = {};
        this.resources = [];
        this.elapsedTime = Date.now();
        this.currentStage = null;

        // Calculate the current time
		this.elapsedTime = Date.now();

		//Start the loop
		this.loop(this.elapsedTime);
    }

    //Create Stages and list them in app
    createStage(name: string, stage: any = new Stage() ): void {
        
        if (!this.stages.hasOwnProperty(name)){
            this.stages[name] = stage;
            if(stage.preload){
                const resources = stage.preload();                
                this.resources = resources
                this.preloader = new Preloader(this.resources);
                this.preloader.on('complete', () => {
                    this.resources = this.preloader.loader.resources;
                    this.goToAndRender('card');
                })
            }

        }else{
            console.log(`Already has an stage named: ${name}`);
        }
    }

    // game loop
    loop(time) {
		//Request a new frame to browser
		window.requestAnimationFrame(time => this.loop(time));

		let now = Date.now();

		//Render current stage
		if(this.currentStage) {
			if(this.currentStage.update)
				//Pass elapsed seconds and time to the update method
				this.currentStage.update((now - this.elapsedTime) * 0.001, time);

			this.app.renderer.render(this.currentStage)
		}

		this.elapsedTime = now;
	}

    // render a stage
    goToAndRender(name: string): void {
        if(this.stages.hasOwnProperty(name)){
            this.currentStage = this.stages[name];
            this.stages[name].render(this.resources);
            this.app.stage.addChild(this.stages[name]);
        }else{
            console.log(`No stage ${name}`);
        }
    }
    
}