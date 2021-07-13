class Game extends PIXI.Container {
    constructor ()
    {
        super();
        this.setup();
    }

    setup(){
        this.startGame();
        this.setupButtons();
        /*const defaultFont = new PIXI.TextStyle({
            fontFamily: 'Comic Sans MS',
            fontSize: 30,
        });

        //Star Btn
        let start_btn = new PIXI.Text('Start', defaultFont);
        start_btn.style.fill = '#2b372b';
        start_btn.anchor.set(0.5);
        start_btn.position.x = 375/2
        start_btn.position.y = 667/2

        start_btn.interactive = true;
        start_btn.buttonMode = true;
        start_btn
        .on('pointerup', this.startGame)

        this.addChild(start_btn);*/
        app.stage.addChild(this);
    }

    setupButtons(){
        var game = this;

        //Close Btn
        const closeBtn = PIXI.Texture.from('assets/img/close_btn.png');
        const closeBtn_sprite = new PIXI.Sprite(closeBtn);
        this.addChild(closeBtn_sprite);

        closeBtn_sprite.width = 40;
        closeBtn_sprite.height = 40;
        closeBtn_sprite.anchor.set(0.5);
        closeBtn_sprite.position.x = 375/1.06
        closeBtn_sprite.position.y = 667/25

        closeBtn_sprite.interactive = true;
        closeBtn_sprite.buttonMode = true;
        closeBtn_sprite
        .on('pointerup', showMenu)

        //Change Scene Functions
        function showMenu(){
            var menu = new Menu();
            game.hide();
        }
    }

    startGame(){

        var LEVEL = 0;
        var MAX_TURNS = 4;
        var TURNS = 0;
        var SPEED = 500;

        const cup0 = PIXI.Texture.from('assets/img/cup_1.png');
        const cup0_sprite = new PIXI.Sprite(cup0);
        cup0_sprite.anchor.set(0.5);
        cup0_sprite.position.x = 375/4.6;
        cup0_sprite.position.y = 667/2;
        cup0_sprite.width = 76.5;
        cup0_sprite.height = 57.5;
        this.addChild(cup0_sprite);

        const cup1 = PIXI.Texture.from('assets/img/cup_2.png');
        const cup1_sprite = new PIXI.Sprite(cup1);
        cup1_sprite.anchor.set(0.5);
        cup1_sprite.position.x = 375/2;
        cup1_sprite.position.y = 667/2;
        cup1_sprite.width = 76.5;
        cup1_sprite.height = 57.5;
        this.addChild(cup1_sprite);

        const cup2 = PIXI.Texture.from('assets/img/cup_3.png');
        const cup2_sprite = new PIXI.Sprite(cup2);
        cup2_sprite.anchor.set(0.5);
        cup2_sprite.position.x = 375/1.3;
        cup2_sprite.position.y = 667/2;
        cup2_sprite.width = 76.5;
        cup2_sprite.height = 57.5;
        this.addChild(cup2_sprite);

        shuffle();
        function shuffle(){
            var itemArray = [cup0_sprite, cup1_sprite, cup2_sprite]
            var item1 = itemArray[Math.floor(Math.random()*itemArray.length)];

            var fixedItemArray = itemArray.filter(item => item !== item1)
            var item2 = fixedItemArray[Math.floor(Math.random()*fixedItemArray.length)];

            createjs.Tween.get( item1 ).to({x: item2.position.x, y: item2.position.y}, SPEED, createjs.Ease.cubicOut);
            createjs.Tween.get( item2 ).to({x: item1.position.x, y: item1.position.y}, SPEED, createjs.Ease.cubicOut).call(handleComplete);
            function handleComplete() {
                TURNS = TURNS + 1;
                    if (TURNS >= MAX_TURNS) {
                        console.log("Completed Level " + LEVEL)
                        TURNS = 0;
                        done();
                } else {
                    shuffle();
                }
            }
        }

        function done(){
            var itemArray = [cup0_sprite, cup1_sprite, cup2_sprite]

            itemArray.forEach(async function(sprite) {
                sprite.interactive = true;
                sprite.buttonMode = true;
                sprite.mouseover = function(mouseData) {
                    this.tint = 0xFFF943;
                }
                sprite.mouseout = function(mouseData) {
                    this.tint = 0xFFFFFF;
                }

                sprite.mouseup = function(mouseData) {
                    if(sprite === cup0_sprite){
                        console.log("Win win win")
                    }
                }
              })

        }
        
    }

    hide(){
        app.stage.removeChild(this);
        console.log("[HIDE]: Game")
    }
}