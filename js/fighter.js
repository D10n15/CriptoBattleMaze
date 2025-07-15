class Fighter {
  constructor({ x, y, width, height, spriteSheet, frames, context }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spriteSheet = spriteSheet;
    this.frames = frames; // Cuántos cuadros tiene la animación actual
    this.context = context;

    this.currentFrame = 0;
    this.frameTick = 0;
    this.state = "idle"; // idle, walk, attack, transform, jump, damage
    this.sprites = {}; // Se llena en B

  
    this.sprites = {
    idle: { image: new Image(), width: 256, height: 64 },     // ejemplo 4 frames de 64px
    walk: { image: new Image(), width: 384, height: 64 },     // ejemplo 6 frames
    attack: { image: new Image(), width: 320, height: 64 },   // ejemplo 5 frames
    transform: { image: new Image(), width: 512, height: 64 },// ejemplo 8 frames
    damage: { image: new Image(), width: 192, height: 64 }    // 3 frames
 
    };
 
    // Cargar las imágenes reales
    this.sprites.idle.image.src = "sprites/kael_idle.png";
    this.sprites.walk.image.src = "sprites/kael_walk.png";
    this.sprites.attack.image.src = "sprites/kael_attack.png";
    this.sprites.transform.image.src = "sprites/kael_transform.png";
    this.sprites.damage.image.src = "../CriptoBattleMaze_SelectScreen/sprites/kael/";
    
    }

  draw() {
    const sprite = this.sprites[this.state];
    const frameWidth = sprite.width / this.frames;
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.context.drawImage(
      sprite.image,
      this.currentFrame * frameWidth,
      0,
      frameWidth,
      sprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frameTick++;
    if (this.frameTick % 6 === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.frames;
    }
    this.draw();
  }

  setState(newState, totalFrames = 4) {
    if (this.state !== newState) {
      this.state = newState;
      this.frames = totalFrames;
      this.currentFrame = 0;
    }
  }

}

// Outside the Fighter class

const characters = {
  kael: {
    name: "Kael",
    folder: "kael",
    animations: {
      idle: {
        frames: 6,
        path: "sprites/kael/idle/",
        prefix: "",
        extension: ".png"
      },
      walk: {
        frames: 6,
        path: "sprites/kael/walk/",
        prefix: "",
        extension: ".png"
      },
      attack: {
        frames: 7,
        path: "sprites/kael/attack/",
        prefix: "",
        extension: ".PNG"
      },
      hit: {
        frames: 4,
        path: "sprites/kael/hit/",
        prefix: "",
        extension: ".png"
      },
      power: {
        frames: 6,
        path: "sprites/kael/power/",
        prefix: "",
        extension: ".png"
      },
      transformacion: {
        frames: 5,
        path: "sprites/kael/transformacion/",
        prefix: "",
        extension: ".png"
      },
      win: {
        frames: 4,
        path: "sprites/kael/win/",
        prefix: "",
        extension: ".png"
      }
    }
  }
};

function loadAnimation(character, action, frame) {
  const anim = characters[character].animations[action];
  return `${anim.path}${anim.prefix}${frame}${anim.extension}`;
}

let currentFrame = 0;
let action = 'attack';
let character = 'kael';

const kaelImg = new Image();
kaelImg.src = loadAnimation(character, action, currentFrame);
