class Menu extends PIXI.Container {
    constructor ()
    {
        super();
        this.setup()
    }

    setup(){
        this.alpha = 0;
        createjs.Tween.get( this ).to( { alpha: 1 }, 250 );

        const defaultBG = PIXI.Texture.from('assets/img/main_menu.png');
        const defaultBG_sprite = new SpriteTexture(this, defaultBG, 0, 0, 375, 667, 0);

        this.setupButtons();
        app.stage.addChild(this);
        console.log("[SHOW]: Menu");
    }

    setupButtons(){
        var game = this;

        //Start Btn
        const defaultFont = new PIXI.TextStyle({
            fontFamily: 'Ariblk',
            fontSize: 25,
        });
        let start_btn = new PIXI.Text('START', defaultFont);
        start_btn.style.fill = '#2b372b';
        start_btn.anchor.set(0.5);
        start_btn.position.x = 375/2
        start_btn.position.y = 667/1.7

        start_btn.interactive = true;
        start_btn.buttonMode = true;
        start_btn
        .on('pointerup', showGame)

        //Instructions Btn
        let inst_btn = new PIXI.Text('INSTRUCTIONS', defaultFont);
        inst_btn.anchor.set(0.5);
        inst_btn.position.x = 375/2
        inst_btn.position.y = 667/1.5

        inst_btn.interactive = true;
        inst_btn.buttonMode = true;
        inst_btn
        .on('pointerup', showInstructions)

        //Credits Btn
        let credits_btn = new PIXI.Text('CREDITS', defaultFont);
        credits_btn.anchor.set(0.5);
        credits_btn.position.x = 375/2
        credits_btn.position.y = 667/1.33

        credits_btn.interactive = true;
        credits_btn.buttonMode = true;
        credits_btn
        .on('pointerup', showCredits)
        
        this.addChild(start_btn);
        this.addChild(inst_btn);
        this.addChild(credits_btn);

        //Change Scene Functions
        function showInstructions(){
            new Instructions();
            game.hide();
        }

        function showCredits(){
            new Credits();
            game.hide();
        }

        function showGame(){
            new Game();
            game.hide();
        }
    }

    hide(){
        app.stage.removeChild(this);
        console.log("[HIDE]: Menu")
    }
}