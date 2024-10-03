import Phaser from 'phaser';
import { CreateAnimetions } from './animations';

class Example extends Phaser.Scene {
  public objects: undefined;
  public mario!: Phaser.GameObjects.Sprite;
  public keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  public floor!: Phaser.Physics.Arcade.StaticGroup;

  preload() {
    this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');

    this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');

    this.load.spritesheet('mario', 'assets/entities/mario.png', {
      frameWidth: 18,
      frameHeight: 16,
    });

    this.load.audio('gameover', 'assets/sound/music/gameover.mp3');
  }

  create() {
    this.add.image(100, 50, 'cloud1').setOrigin(0, 0).setScale(0.15);

    this.floor = this.physics.add.staticGroup();

    this.floor
      .create(0, Number(config.height) - 16, 'floorbricks')
      .setOrigin(0, 0.5)
      .refreshBody();

    this.floor
      .create(150, Number(config.height) - 16, 'floorbricks')
      .setOrigin(0, 0.5)
      .refreshBody();

    this.mario = this.physics.add
      .sprite(50, 100, 'mario')
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(500);

    this.physics.world.setBounds(0, 0, 2000, Number(config.height));

    this.physics.add.collider(this.mario, this.floor);

    this.cameras.main.setBounds(0, 0, 2000, Number(config.height));
    this.cameras.main.startFollow(this.mario);

    CreateAnimetions(this);

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    this.keys = this.input.keyboard!.createCursorKeys();
  }

  update(time: number, delta: number): void {
    if (this.mario.isDead) return;

    if (this.keys.left.isDown) {
      this.mario.anims.play('mario-walk', true);
      this.mario.x -= 2;
      this.mario.flipX = true;
    } else if (this.keys.right.isDown) {
      this.mario.anims.play('mario-walk', true);
      this.mario.x += 2;
      this.mario.flipX = false;
    } else {
      this.mario.anims.play('mario-idle', true);
    }

    // if (this.keys.up.isDown && this.mario.body.touching.down) {
    if (this.keys.up.isDown) {
      this.mario.setVelocityY(-300);
      this.mario.anims.play('mario-jump', true);
    }

    if (this.mario.y >= Number(config.height)) {
      this.mario.isDead = true;
      this.mario.anims.play('mario-dead');
      // this.mario.setCollideWorldCounds(false);
      this.sound.add('gameover', { volume: 0.2 }).play();

      setTimeout(() => {
        this.mario.setVelocityY(-300);
      }, 100);

      setTimeout(() => {
        this.scene.restart();
      }, 2000);
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 256,
  height: 224,
  scene: Example,
  backgroundColor: '#049cda',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300, x: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
