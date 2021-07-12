var debug = true;

let app = new PIXI.Application({ 
    width: 375,
    height: 667,
    antialias: true,
    transparent: false,
    resolution: 1
    });
document.getElementById('game').appendChild(app.view);
menu = new Menu();