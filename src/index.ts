import Renderer from './core/Renderer';
import Card from './stages/Card';
import Config from './core/Config';
import configuration from './config.json';

// Create game config from config.json.ts
const config = new Config(configuration);

// Create new Renderer whit the configuration
let renderer = new Renderer(config);

// Render card
renderer.createStage('card', new Card(renderer,config));

//export renderer for other modules access
export default renderer;