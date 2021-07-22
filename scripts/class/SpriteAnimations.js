class SpriteAnimations {
    constructor (cupSprite, startFunction)
    {
        this.showCup(cupSprite, startFunction);
    }

    showCup(cupSprite, startFunction){
        createjs.Tween.get( cupSprite ).to({y: cupSprite.position.y - 80}, 1000, createjs.Ease.cubicOut).call(handleComplete);

        function handleComplete() {
            createjs.Tween.get( cupSprite ).to({y: cupSprite.position.y + 80}, 1000, createjs.Ease.cubicOut).call(startFunction);
        }
    }
}