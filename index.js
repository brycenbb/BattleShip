import { onload, gameBuild, boardBuild } from './dom.js';
import { gameLoopReal } from './factories.js';
// const factories = require('./factories');

onload();
gameLoopReal();

//Only thing left is to have computer be able to hit player and to randomize computer placement
