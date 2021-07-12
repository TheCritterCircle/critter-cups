class Game extends PIXI.Container {
    constructor ()
    {
        super();
        this.setup();
    }

    setup(){
        const defaultBG = PIXI.Texture.from('assets/img/background.png');
        const defaultBG_sprite = new PIXI.Sprite(defaultBG);
        defaultBG_sprite.width = 375;
        defaultBG_sprite.height = 667;

        this.addChild(defaultBG_sprite);
        app.stage.addChild(this);
        console.log("[SHOW]: Game")
    }

    hide(){
        app.stage.removeChild(this);
        console.log("[HIDE]: Game")
    }
}

var LEVEL = 1;

//--#Game#--
const texture = PIXI.Texture.from('assets/img/cup_000.png');
const bunny = new PIXI.Sprite(texture);

/*bunny.interactive = true;
bunny.buttonMode = true;


bunny.on('pointerdown', onButtonDown)
function onButtonDown(){
    Game.visible = false;
}*/


function startGame(){

}


function gameOver(){
    
}

function startGame(){
    
}