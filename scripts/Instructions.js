class Instructions extends PIXI.Container {
    constructor ()
    {
        super();
        this.setup()
    }

    setup(){
        const defaultBG = PIXI.Texture.from('assets/img/background.png');
        const defaultBG_sprite = new SpriteTexture(this, defaultBG, 0, 0, 375, 667, 0);

        this.setupButtons();
        app.stage.addChild(this);
        console.log("[SHOW]: Instructions")
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

    hide(){
        app.stage.removeChild(this);
        console.log("[HIDE]: Instructions")
    }
}