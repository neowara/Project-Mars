var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('ship', 'assets/PNG/playerShip1_blue.png');
  this.load.image('bg', 'assets/Backgrounds/darkPurple.png');
}

function create() {

  var self = this;
  this.add.image(0,0, 'bg').setOrigin(0);
  this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg', 'darkPurple.png').setOrigin(0);
  this.add.image(100, 50, 'ship');
  this.socket = io();

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      }
    });
  });
}
	
function update() {
    this.bg.tilePositionY += 5;
}

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  if (playerInfo.team === 'blue') {
    self.ship.setTint(0x0000ff);
  } else {
    self.ship.setTint(0xff0000);
  }
  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(200);
}