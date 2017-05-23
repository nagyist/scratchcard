import * as PIXI from 'pixi.js';

export default class InverseDrawingMask {
		private isDrawing : boolean;
		private stage : any;
		private width : number;
		private height : number;
		private renderer : any;
		private innerStage : any;
		private drawingPoint : any;
		private texture : any;
		private partCont : any;
		private particle : any;
		constructor(stage) {
				this.isDrawing = false;

				// create stage and set it as interactive
				this.stage = stage;
				this.stage.interactive = true;

				//Get stage dimensions
				this.width = this.stage.game.app.renderer.width;
				this.height = this.stage.game.app.renderer.height;

				//Create a new canvas with particle container
				this.renderer = new PIXI.CanvasRenderer(this.width, this.height, {backgroundColor: 0xFFFFFF});
				this.innerStage = new PIXI.Container();
				this.partCont = new PIXI.particles.ParticleContainer(10000, {alpha: true});

				// Cursor drawing point
				this.renderer.render(this.innerStage);
				this.innerStage.addChild(this.partCont);

				//Assign events
				this.stage.on('mousedown', this.onStart.bind(this));
				this.stage.on('mousemove', this.onMove.bind(this));
				this.stage.on('mouseup', this.onEnd.bind(this));
				this.stage.on('touchstart', this.onStart.bind(this));
				this.stage.on('touchmove', this.onMove.bind(this));
				this.stage.on('touchend', this.onEnd.bind(this));

				//Register the canvas as texture, it needs to update on every frame
				this.texture = PIXI.Texture.fromCanvas(this.renderer.view);
		}

		// End drawing
		onStart(): void {
				this.isDrawing = true;
		}

		// activate drawing
		onEnd(): void {
				this.isDrawing = false;
		}

		// Add sprite particle on random rotation when move clicked or touch and move
		onMove(e:any): void {
				if (this.isDrawing) {
						let pos = e.data.getLocalPosition(this.stage);
						let particle = PIXI.Sprite.fromImage('assets/scratch.png');
						particle.x = pos.x;
						particle.y = pos.y;
						particle.rotation = Math.random() * 10;
						particle.anchor.set(0.5)
						this.partCont.addChild(particle);
				}
		}

		/**
	 * update
	 * Updates the canvas renderer and the "canvas texture"
	 */
		update() {
				this.renderer.render(this.innerStage);
				this.texture.update();
		}

		// return mask sprite
		getMaskSprite(): object {
				return new PIXI.Sprite(this.texture);
		}
}