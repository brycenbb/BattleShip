import { onload, gameBuild, boardBuild } from './dom.js';
import { gameLoopReal } from './factories.js';
// const factories = require('./factories');

onload();
// gameBuild();
gameLoopReal();

//current things to fix: allowing ship placements on the edge of the screen, letting players place their ships down themselves, putting computer ships down randomly.
