const INIT_SPRITESHEETS: {
  key: string;
  url: string;
  frameWidth: number;
  frameHeight: number;
}[] = [
  {
    key: 'mario',
    url: 'assets/entities/mario.png',
    frameWidth: 18,
    frameHeight: 16,
  },
  {
    key: 'goomba',
    url: 'assets/entities/overworld/goomba.png',
    frameHeight: 16,
    frameWidth: 16,
  },
  {
    key: 'coin',
    url: 'assets/collectibles/coin.png',
    frameHeight: 16,
    frameWidth: 16,
  },
  {
    key: 'mario-grown',
    url: 'assets/entities/mario-grown.png',
    frameWidth: 18,
    frameHeight: 32,
  },
];

export const initSpritesheet = ({
  load,
}: { load: Phaser.Loader.LoaderPlugin }) => {
  INIT_SPRITESHEETS.forEach((spritesheet, index) => {
    load.spritesheet(spritesheet.key, spritesheet.url, {
      frameWidth: spritesheet.frameWidth,
      frameHeight: spritesheet.frameHeight,
    });
  });
};
