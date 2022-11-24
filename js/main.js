const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

const state = {
    players: {},
    fruits: {}
};

function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;
    
    state.players[playerId] = {
        x: playerX,
        y: playerY
    };
};

function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
}

function createGame() {
    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`)
        
        const acceptedMoves = {
            ArrowUp(player) {
                console.log(`game.movePlayer() -> Moving player Up`);

                if(player.y - 1 >= 0){
                    player.y = player.y - 1;
                }
            },
            ArrowRight(player) {
                console.log(`game.movePlayer() -> Moving player Right`);

                if(player.x + 1 < screen.width){
                    player.x = player.x + 1;
                }
            },
            ArrowDown(player) {
                console.log(`game.movePlayer() -> Moving player Down`);

                if(player.y + 1 < screen.height){
                    player.y = player.y + 1;
                }
            },
            ArrowLeft(player) {
                console.log(`game.movePlayer() -> Moving player Left`);

                if(player.x - 1 >= 0){
                    player.x = player.x - 1;
                }
            }
        };

        const keyPressed = command.keyPressed;
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed];

        if(player && moveFunction) {
            moveFunction(player);
        }
        
    };

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        state
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
        console.log(`KeyboardListener -> Notifing ${state.observers.length} observers`);

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