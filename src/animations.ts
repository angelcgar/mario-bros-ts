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

    this.game.anims.create({
      key: 'mario-jump',
      frames: [{ key: 'mario', frame: 5 }],
    });

    this.game.anims.create({
      key: 'mario-dead',
      frames: [{ key: 'mario', frame: 4 }],
    });
  }
}
