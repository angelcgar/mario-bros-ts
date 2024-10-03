import Phaser from 'phaser';

class Example extends Phaser.Scene {
  objects: undefined;
  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor() {
    super();
  }

  preload() {
    this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');
  }

  create() {
    this.add.image(0, 0, 'cloud1').setOrigin(0, 0).setScale(0.15);
    // this.objects.image0 = this.add.image(400, 300, 'cloud1');
  }
  update(time: number, delta: number): void {}
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 256,
  height: 224,
  scene: Example,
  backgroundColor: '#049cda',
  parent: 'game',
};

const game = new Phaser.Game(config);

// new Phaser.Game(config);

// function preload() {
//   this.load.image("cloud1", "assets/scenary/overworld/cloud1.png");
// }
// function create() {
//   this.add.image(0, 0, "cloud1");
// }
// function update() {
//   // console.log("update");
// }
