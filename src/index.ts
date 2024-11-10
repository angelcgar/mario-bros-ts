import Phaser from 'phaser';

import { AnimationCreator } from './animations';
import { checkControls } from './controles';
import { initAudio, playAudio } from './audio';
import { initSpritesheet } from './spritesheet';

class Example extends Phaser.Scene {
  public objects: undefined;
  public mario!: Phaser.GameObjects.Sprite;
  public enemy!: Phaser.GameObjects.Sprite;

  public collectibes!: Phaser.Physics.Arcade.StaticGroup;

  public keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  public floor!: Phaser.Physics.Arcade.StaticGroup;

  preload() {
    this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');

    this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
    this.load.image('supermushroom', 'assets/collectibles/super-mushroom.png');
    // spritesheet
    initSpritesheet({ load: this.load });

    // audio
    initAudio({ load: this.load });
  }

  create() {
    const animCreator = new AnimationCreator(this);
    animCreator.createAnimations();

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

    this.enemy = this.physics.add
      .sprite(120, Number(config.height) - 30, 'goomba')
      .setOrigin(0, 1)
      .setGravityY(300);
    // .setVelocityX(-50);

    this.enemy.anims.play('goomba-walk', true);

    this.collectibes = this.physics.add.staticGroup();
    this.collectibes.create(100, 150, 'coin').anims.play('coin-idle', true);
    this.collectibes.create(200, 150, 'coin').anims.play('coin-idle', true);
    this.collectibes.create(100, Number(config.height) - 40, 'supermushroom');

    this.physics.add.overlap(
      this.mario,
      this.collectibes,
      this.collectItem,
      null,
      this,
    );

    this.physics.world.setBounds(0, 0, 2000, Number(config.height));

    this.physics.add.collider(this.mario, this.floor);

    this.physics.add.collider(this.enemy, this.floor);
    this.physics.add.collider(
      this.mario,
      this.enemy,
      this.onHitElement,
      null,
      this,
    );

    this.cameras.main.setBounds(0, 0, 2000, Number(config.height));
    this.cameras.main.startFollow(this.mario);

    this.keys = this.input.keyboard!.createCursorKeys();
  }

  public onHitElement(
    mario?: Phaser.GameObjects.Sprite,
    enemy?: Phaser.GameObjects.Sprite,
  ) {
    // ! Bug: mario and enemy not matching types
    if (mario?.body.touching.down && enemy?.body.touching.up) {
      enemy.anims.play('goomba-hurt', true);
      enemy.setVelocityX(0);
      mario.setVelocityY(-200);

      playAudio('goomba-stomp', this, { volume: 1 });
      this.addToScore(200, enemy, this);

      setTimeout(() => {
        enemy.destroy();
      }, 500);
    } else {
      this.killMario(this);
    }
  }

  update(time: number, delta: number): void {
    checkControls(this);

    const { mario } = this;

    // Mario is dead
    if (mario.y >= Number(config.height)) {
      this.killMario(this);
    }
  }

  public collectItem(
    mario: Phaser.GameObjects.Sprite,
    item: Phaser.GameObjects.Sprite,
  ) {
    const {
      texture: { key },
    } = item;

    if (key === 'coin') {
      playAudio('coin-pickup', this, { volume: 0.2 });
      item.destroy();

      this.addToScore(100, item, this);
    } else if (key === 'supermushroom') {
      this.physics.world.pause();
      this.anims.pauseAll();
      item.destroy();

      mario.isBlocking = true;

      playAudio('mario-grown-jump', this, { volume: 0.2 });

      let i = 0;
      const interval = setInterval(() => {
        i++;
        mario.anims.play(i % 2 === 0 ? 'mario-grown-idle' : 'mario-idle', true);
      }, 100);

      mario.isGrown = true;
      mario.isBlocking = false;

      setTimeout(() => {
        mario.setDisplaySize(18, 32);
        mario.body.setSize(18, 32);
        
        clearInterval(interval);
        this.physics.world.resume();
        this.anims.resumeAll();
        // this.addToScore(100, item, this);
      }, 1000);
    }
  }

  public addToScore(
    scoreToAdd: number,
    origin: Phaser.GameObjects.Sprite,
    game: Phaser.Scene,
  ) {
    const scoreText = game.add.text(origin.x, origin.y, scoreToAdd.toString(), {
      fontFamily: 'pixel',
      fontSize: Number(config.width) / 40,
    });

    game.tweens.add({
      targets: scoreText,
      y: Number(config.height) - 100,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        game.tweens.add({
          targets: scoreText,
          duration: 100,
          alpha: 0,
          onComplete: () => {
            scoreText.destroy();
          },
        });
      },
    });
  }

  public killMario({
    mario,
    scene,
  }: {
    mario: Phaser.GameObjects.Sprite;
    scene: Phaser.Scenes.ScenePlugin;
  }) {
    if (mario.isDead) return;

    mario.isDead = true;
    mario.anims.play('mario-dead');
    mario.setCollideWorldBounds(false);
    playAudio('gameover', this, { volume: 0.2 });

    mario.body.checkCollision.none = true;
    // console.log(mario.body.checkCollision.none);
    mario.setVelocityX(0);
    // mario.body.setCollideWorldBounds(false);

    setTimeout(() => {
      mario.setVelocityY(-300);
    }, 100);

    setTimeout(() => {
      scene.restart();
    }, 2000);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  autoFocus: false,
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
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
