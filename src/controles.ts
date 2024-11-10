const MARIO_ANUMATIONS = {
  grown: {
    idle: 'mario-grown-idle',
    walk: 'mario-grown-walk',
    jump: 'mario-grown-jump',
  },
  normail: {
    idle: 'mario-idle',
    walk: 'mario-walk',
    jump: 'mario-jump',
  },
};

export function checkControls({
  mario,
  keys,
}: {
  mario: Phaser.GameObjects.Sprite;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
}) {
  const isMarioTouchingFlooe = mario.body?.touching.down;

  const isLeftKeyDown = keys.left.isDown;
  const isRightKeyDown = keys.right.isDown;
  const isUpKeyDown = keys.up.isDown;

  if (mario.isDead) return;
  if (mario.isBlocking) return;

  const marioAnimations = mario.isGrown
    ? MARIO_ANUMATIONS.grown
    : MARIO_ANUMATIONS.normail;

  if (isLeftKeyDown) {
    isMarioTouchingFlooe && mario.anims.play('mario-walk', true);
    mario.x -= 2;
    mario.flipX = true;
  } else if (isRightKeyDown) {
    isMarioTouchingFlooe && mario.anims.play('mario-walk', true);
    mario.x += 2;
    mario.flipX = false;
  } else if (isMarioTouchingFlooe) {
    mario.anims.play(marioAnimations.idle, true);
  }

  if (isUpKeyDown && isMarioTouchingFlooe) {
    mario.setVelocityY(-300);
    mario.anims.play('mario-jump', true);
  }
}
