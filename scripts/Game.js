class Game extends PIXI.Container {
    constructor ()
    {
        super();
        this.setup();
    }

    setup(){
        const defaultBG = PIXI.Texture.from('assets/img/background.png');
        const defaultBG_sprite = new SpriteTexture(this, defaultBG, 0, 0, 375, 667, 0);

        this.setupGame();
        this.setupButtons();
        app.stage.addChild(this);
    }

    setupButtons(){
        var game = this;

        //Close Btn
        const closeBtn = PIXI.Texture.from('assets/img/close_btn.png');
        const closeBtn_sprite = new SpriteTexture(this, closeBtn, 375/1.06, 667/25, 40, 40, 0.5)

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

    setupGame(){

        var LEVEL = 0;
        var MAX_TURNS = 4;
        var TURNS = 0;
        var SPEED = 500;
        var COINS = 0;

        //Interface
        const coins = PIXI.Texture.from('assets/img/coin.png');
        const coins_sprite = new SpriteTexture(this, coins, 375/12, 20, 30, 30, 0.5)

        let coins_txt = new PIXI.Text(COINS, {fontFamily : 'Ariblk', fontSize: 24, fill : 0x2b372b, align : 'center'});
        coins_txt.anchor.set(0.5);
        coins_txt.position.x = 375/5
        coins_txt.position.y = 20
        this.addChild(coins_txt);

        let level_txt = new PIXI.Text('Level: ' + LEVEL, {fontFamily : 'Ariblk', fontSize: 24, fill : 0x2b372b, align : 'center'});
        level_txt.anchor.set(0.5);
        level_txt.position.x = 375/6
        level_txt.position.y = 50
        this.addChild(level_txt);

        //Ball Texture
        const ball = PIXI.Texture.from('assets/img/coin.png');
        const ball_sprite = new SpriteTexture(this, ball, -10, -10, 40, 40, 0.5);

        //Cups Texture
        const cup0 = PIXI.Texture.from('assets/img/cup_000.png');
        const cup0_sprite = new SpriteTexture(this, cup0, 375/4.6, 667/2, 76.5, 57.5, 0.5)

        const cup1 = PIXI.Texture.from('assets/img/cup_000.png');
        const cup1_sprite = new SpriteTexture(this, cup1, 375/2, 667/2, 76.5, 57.5, 0.5)

        const cup2 = PIXI.Texture.from('assets/img/cup_000.png');
        const cup2_sprite = new SpriteTexture(this, cup2, 375/1.3, 667/2, 76.5, 57.5, 0.5)

        //Ball Location
        var itemArray = [cup0_sprite, cup1_sprite, cup2_sprite]
        var randomSprite = itemArray[Math.floor(Math.random()*itemArray.length)];

        moveBall();
        function moveBall(){
            ball_sprite.position.x = randomSprite.position.x -5;
            ball_sprite.position.y = randomSprite.position.y;
        }

        startGame();
        function startGame(){
            new SpriteAnimations(randomSprite, shuffle)
        }

        function enableCups(){
            cup0_sprite.interactive = true;
            cup1_sprite.interactive = true;
            cup2_sprite.interactive = true;
        }

        function disableCups(){
            cup0_sprite.interactive = false;
            cup1_sprite.interactive = false;
            cup2_sprite.interactive = false;

            cup0_sprite.tint = 0xFFFFFF;
            cup1_sprite.tint = 0xFFFFFF;
            cup2_sprite.tint = 0xFFFFFF;
        }

        function shuffle(){
            ball_sprite.alpha = 0;
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
            ball_sprite.alpha = 1;
            moveBall();
            enableCups();
            
            itemArray.forEach(async function(sprite) {
                sprite.buttonMode = true;

                sprite.pointerover = function(mouseData) {
                    this.tint = 0xFFF943;
                }

                sprite.pointerout = function(mouseData) {
                    this.tint = 0xFFFFFF;
                }

                sprite.pointerdown = function(mouseData) {
                    this.tint = 0xFFF943;
                }

                sprite.pointerup = function(mouseData) {
                    disableCups();
                    new SpriteAnimations(sprite, check)

                    function check(){
                        if(sprite === randomSprite){
                            winLevel()
                        } else {
                            loseLevel()
                        }
                    }
                    
                }

            })

            function winLevel(){
                //Win anim
                console.log("Win win win");
                nextLevel();
            }

            function loseLevel(){
                //Lose anim
                console.log("Lose :(");
                repeatLevel();
            }
        }

        function nextLevel(){
            LEVEL = LEVEL+1;
            COINS = COINS+10;
            MAX_TURNS = MAX_TURNS+3;
            SPEED = SPEED-15;
            updateText(COINS, LEVEL);

            console.log("Level: " + LEVEL + " Coins: " + COINS + " Speed: " + SPEED)
            shuffle();
        }

        function repeatLevel(){
            console.log("Level: " + LEVEL + " Coins: " + COINS + " Speed: " + SPEED)
            startGame();
        }

        function updateText(coins, level){
            coins_txt.text = coins;
            level_txt.text = 'Level: ' + level;
        }
        
    }

    hide(){
        app.stage.removeChild(this);
        console.log("[HIDE]: Game")
    }
}