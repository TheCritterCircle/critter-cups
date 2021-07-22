class SpriteTexture extends PIXI.Sprite {
    constructor (container, texture, posX, posY, width, height, anchor)
    {
        super(texture);
        this.width = width;
        this.height = height;
        this.position.x = posX;
        this.position.y = posY;
        this.anchor.set(anchor);

        container.addChild(this);
    }
}