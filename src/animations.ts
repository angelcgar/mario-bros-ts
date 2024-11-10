export class AnimationCreator {
  private game: Phaser.Scene;

  constructor(game: Phaser.Scene) {
    this.game = game;
  }

  public createAnimations(): void {
    this.game.anims.create({
      key: 'mario-walk',
      frames: this.game.anims.generateFrameNumbers('mario', {
        start: 1,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.game.anims.create({
      key: 'mario-idle',
      frames: [{ key: 'mario', frame: 0 }],
    });

    this.game.anims.create({ key: 'mario-grown-idle', frames: [{ key: 'mario-grown', frame: 0 }] });

    this.game.anims.create({
      key: 'mario-jump',
      frames: [{ key: 'mario', frame: 5 }],
    });

    this.game.anims.create({
      key: 'mario-dead',
      frames: [{ key: 'mario', frame: 4 }],
    });

    this.game.anims.create({
      key: 'goomba-walk',
      frames: this.game.anims.generateFrameNumbers('goomba', {
        start: 0,
        end: 1,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.game.anims.create({
      key: 'goomba-hurt',
      frames: [{ key: 'goomba', frame: 2 }],
    });

    this.game.anims.create({
      key: 'coin-idle',
      frames: this.game.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }
}
