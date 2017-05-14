import {loaders} from 'pixi.js';
import {EventEmitter} from 'eventemitter3';



export default class Preloader extends EventEmitter {
    resources: string[];
    loader: any;
    constructor(resources: string[],){
        super();
        this.resources = resources;

        this.loader = new loaders.Loader();

        // add resources to the loader
        for(let key in this.resources){
            this.loader.add(this.resources[key]);
        }

        // when load complete emit
        this.loader.on('complete', (): void => {
            this.emit('complete');
        })

        // show loader progress
        this.loader.on('progress', (loader: any, resource: string): void => {
			this.emit('progress', Math.ceil(loader.progress));		
		});

        // load resources
        this.loader.load();
    }
}