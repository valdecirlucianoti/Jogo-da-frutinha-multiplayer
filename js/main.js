const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

const state = {
    players: {
        'player1': {x: 1, y: 1},
        'player2': {x: 9, y: 9}
    },
    fruits: {
        'fruit1': {x: 3, y: 1}
    }
};

function createGame() {
    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`)
    };

    return {
        movePlayer 
    }
};

const game = createGame();
const KeyboardListener = createKeyboardListener();
KeyboardListener.subscribe(game.movePlayer);


function createKeyboardListener(params) {
    const state = {
        observers: []
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    };

    function notfyAll(command) {
        console.log(`Notifing ${state.observers.length} observers`);

        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        const keyPressed = event.key;

        const command = {
            playerId: 'player1',
            keyPressed
        };

        notfyAll(command);
    };

    return {
        subscribe
    }
}

renderScreen();

function renderScreen() {
    context.fillStyle = 'white';
    context.clearRect(0 , 0, 10, 10);

    for(const playerId in state.players) {
        const player = state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for(const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(renderScreen);
};