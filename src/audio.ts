const INIT_AUDIOS = [
  {
    key: 'gameover',
    url: 'assets/sound/music/gameover.mp3',
    type: 'audio',
    preload: true,
    volume: 0.2,
  },
  {
    key: 'goomba-stomp',
    url: 'assets/sound/effects/goomba-stomp.wav',
    type: 'audio',
    preload: true,
    volume: 0.2,
  },
  {
    key: 'coin-pickup',
    url: 'assets/sound/effects/coin.mp3',
    type: 'audio',
    preload: true,
    volume: 0.2,
  },
  {
    key: 'mario-grown-jump',
    url: 'assets/sound/effects/consume-powerup.mp3',
    type: 'audio',
    preload: true,
    volume: 0.2,
  },
];

export const initAudio = ({ load }: { load: Phaser.Loader.LoaderPlugin }) => {
  INIT_AUDIOS.forEach((audio, index) => {
    load.audio(audio.key, audio.url);
  });
};

export const playAudio = (
  key: string,
  {
    sound,
  }: {
    sound:
      | Phaser.Sound.NoAudioSoundManager
      | Phaser.Sound.HTML5AudioSoundManager
      | Phaser.Sound.WebAudioSoundManager;
  },
  { volume = 1 }: { volume?: number },
) => {
  try {
    return sound.add(key, { volume }).play();
  } catch (e) {
    console.error(e);
  }
};
