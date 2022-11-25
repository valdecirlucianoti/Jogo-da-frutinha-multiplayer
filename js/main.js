import createGame from "./game.js";
import createKeyboardListener from "./Keyboard-Listener.js";
import renderScreen from "./render-Screen.js";

const game = createGame();
const KeyboardListener = createKeyboardListener(document);
KeyboardListener.subscribe(game.movePlayer);

const screen = document.getElementById('screen');
const context = screen.getContext('2d');
renderScreen(screen, game, requestAnimationFrame);

game.addPlayer({playerId: 'player1', playerX: 1, playerY: 2});
game.addPlayer({playerId: 'player2', playerX: 3, playerY: 6});
game.addPlayer({playerId: 'player3', playerX: 5, playerY: 3});
game.addFruit({fruitId: '1', fruitX: 4, fruitY: 3});
game.addFruit({fruitId: '2', fruitX: 5, fruitY: 7});