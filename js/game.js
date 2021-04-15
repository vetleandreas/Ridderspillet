// Removes start screen
document.getElementById("main").onkeypress = function (event) {
  var x = event.charCode || event.keyCode;
  if (x == 13) {
    startGame();
  }
};

// Removes start screen and starts game
function startGame() {
  let startscreen = document.getElementsByClassName("start");
  for (let i = 0; i < startscreen.length; i++) {
    startscreen[i].style.display = "none";
  }

  function loadImage(url) {
    return new Promise((resolve) => {
      let image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.src = url;
    });
  }

  let canvas = document.getElementById("knight-game");
  let ctx = canvas.getContext("2d");
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx.fillRect(0, 0, 50, 50);

  loadImage("img/preview.png").then((image) => {
    let sprites = new SpriteSheet(image, 16, 16);
    sprites.define("test", 0, 0);
    sprites.draw("test", ctx, 45, 62);

    ctx.drawImage(
      image,
      0,
      0,
      16,
      16,

      32,
      32,
      16,
      16
    );
  });

  class SpriteSheet {
    constructor(image, w = 16, h = 16) {
      this.image = image;
      this.width = w;
      this.height = h;
      this.tiles = new Map();
    }

    define(name, x, y) {
      let buffer = document.createElement("canvas");
      buffer.height = this.height;
      buffer.width = this.width;
      buffer
        .getContext("2d")
        .drawImage(
          this.image,
          this.width * x,
          this.height * y,
          this.width,
          this.height,
          0,
          0,
          this.width,
          this.height
        );
      this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
      const buffer = this.tiles.get(name);
      context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
      this.draw(name, context, x * this.width, y * this.height);
    }
  }

  /*
  // The attributes of the player.
  let player = {
    x: 200,
    y: 250,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 50,
    width: 50,
  };
  // The status of the arrow keys
  let keys = {
    right: false,
    left: false,
    up: false,
  };
  // The friction and gravity to show realistic movements
  let gravity = 0.6;
  let friction = 0.7;
  // The number of platforms
  let num = 3;
  // The platforms
  let platforms = [];
  // Function to render the canvas
  function rendercanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  // Function to render the player
  function renderplayer() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect(player.x - 50, player.y - 50, player.width, player.height);
  }
  // Function to create platforms
  function createplat() {
    for (i = 0; i < num; i++) {
      platforms.push({
        x: 100 * i,
        y: 200 + 30 * i,
        width: 150,
        height: 25,
      });
    }
  }
  // Function to render platforms
  function renderplat() {
    ctx.fillStyle = "#45597E";
    ctx.fillRect(
      platforms[0].x,
      platforms[0].y,
      platforms[0].width,
      platforms[0].height
    );
    ctx.fillRect(
      platforms[1].x,
      platforms[1].y,
      platforms[1].width,
      platforms[1].height
    );
    ctx.fillRect(
      platforms[2].x,
      platforms[2].y,
      platforms[2].width,
      platforms[2].height
    );
  }
  // This function will be called when a key on the keyboard is pressed
  function keydown(e) {
    // 37 is the code for the left arrow key
    if (e.keyCode == 37 || e.keyCode == 65) {
      keys.left = true;
    }
    // 37 is the code for the up arrow key
    if (e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 32) {
      if (player.jump == false) {
        player.y_v = -10;
      }
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39 || e.keyCode == 68) {
      keys.right = true;
    }
  }
  // This function is called when the pressed key is released
  function keyup(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
      keys.left = false;
    }
    if (e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 32) {
      if (player.y_v < -2) {
        player.y_v = -3;
      }
    }
    if (e.keyCode == 39 || e.keyCode == 68) {
      keys.right = false;
    }
  }
  function loop() {
    // If the player is not jumping apply the effect of frictiom
    if (player.jump == false) {
      player.x_v *= friction;
    } else {
      // If the player is in the air then apply the effect of gravity
      player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
      player.x_v = -4.5;
    }
    if (keys.right) {
      player.x_v = 4.5;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collions with the platform
    let i = -1;
    if (
      platforms[0].x < player.x &&
      player.x < platforms[0].x + platforms[0].width &&
      platforms[0].y < player.y &&
      player.y < platforms[0].y + platforms[0].height
    ) {
      i = 0;
    }
    if (
      platforms[1].x < player.x &&
      player.x < platforms[1].x + platforms[1].width &&
      platforms[1].y < player.y &&
      player.y < platforms[1].y + platforms[1].height
    ) {
      i = 1;
    }
    if (
      platforms[2].x < player.x &&
      player.x < platforms[2].x + platforms[2].width &&
      platforms[2].y < player.y &&
      player.y < platforms[2].y + platforms[2].height
    ) {
      i = 1;
    }
    if (i > -1) {
      player.jump = false;
      player.y = platforms[i].y;
    }
    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();
  }
  canvas = document.getElementById("knight-game");
  ctx = canvas.getContext("2d");
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  createplat();
  // Adding the event listeners
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);
  setInterval(loop, 22); */
}
