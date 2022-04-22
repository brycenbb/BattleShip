import { onload, gameBuild, boardBuild } from './dom.js';
import { gameLoopReal } from './factories.js';
// const factories = require('./factories');

onload();
gameLoopReal();
gameBuild();
