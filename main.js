class BirdScene extends Phaser.Scene {
  bird;
  birdMovement = true;

  birdArray = [
    { 
      color: 'purple', 
      sprite: 'bird-purple', 
      src: 'assets/bird-purple.png', 
      element: null,
      movement: true
    },
    { 
      color: 'red', 
      sprite: 'bird-red', 
      src: 'assets/bird-red.png', 
      element: null,
      movement: true
    },
    { 
      color: 'green', 
      sprite: 'bird-green', 
      src: 'assets/bird-green.png', 
      element: null,
      movement: true
    },
  ]

  /**
   * Carrega meus assets para o jogo
   */
  preload() {
    this.load.image('bg', 'assets/bg_space.png');
    for(let bird of this.birdArray) {
      this.load.spritesheet(
        bird.sprite, 
        bird.src, 
        { frameWidth: 75, frameHeight: 75 }
      )
    };
  }

  /**
   * Cria todos os elementos do jogo
   */
  create() {
    this.add.image(400, 300, 'bg').setScale(1.2);
    for(const index of Object.keys(this.birdArray)) {
      const bird = this.birdArray[index];
      this.birdArray[index].element = this.add.sprite(
        100, 
        (100 * (parseInt(index) + 1)), 
        bird.sprite
        )
        .setScale(1.3);
      
      this.anims.create({
        key: `fly-${bird.color}`,
        frames: this.anims.generateFrameNumbers(bird.sprite, { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
      });
      
      bird.element.anims.play(`fly-${bird.color}`);
    };
  }

  /**
   * Atualiza o estado do jogo
   */
  update() {
    for(const index of Object.keys(this.birdArray)) {
      const bird = this.birdArray[index];
      this.birdArray[index].movement = (
        bird.element.x >= 800 && bird.movement 
        || bird.element.x <= 0 && !bird.movement) 
        ? !this.birdArray[index].movement
        : this.birdArray[index].movement;
  
      // A partir da direção define uma ação para o pássaro
      bird.movement ? this.actions.moveRight(bird.element) : this.actions.moveLeft(bird.element);
    };
  }

  // Objeto contendo todas as ações do pássaro
  actions = {
    moveRight: (bird) => {
      bird.flipX = false;
      bird.x += 10;
      bird.y += 7;
    },
    moveLeft: (bird) => {
      bird.flipX = true;
      bird.x -= 10;
      bird.y -= 7;
    }
  }
}

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  scene: [
    BirdScene
  ]
};

var game = new Phaser.Game(config);