class Instructions extends PIXI.Container {
    constructor ()
    {
        super();
        this.setup()
    }

    setup(){
        const defaultBG = PIXI.Texture.from('assets/img/background.png');
        const defaultBG_sprite = new PIXI.Sprite(defaultBG);
        defaultBG_sprite.width = 375;
        defaultBG_sprite.height = 667;

        this.addChild(defaultBG_sprite);
        this.setupButtons();
        app.stage.addChild(this);
        console.log("[SHOW]: Instructions")
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

    hide(){
        app.stage.removeChild(this);
        console.log("[HIDE]: Instructions")
    }
}