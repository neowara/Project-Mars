var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1280,
  height:  720,
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
  this.load.image('ship', 'assets/playerShip1_blue.png');
}

function create() {
  var self = this;
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

function update() {}

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(50, 50);

  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(200);
}