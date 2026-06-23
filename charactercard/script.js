const character = {
  name: 'Snortleblat',
  characterClass: 'Swamp Beast Diplomat',
  level: 5,
  health: 100,
  image: 'images/snortleblat.webp',

  attacked: function () {
    this.health -= 20;
    if (this.health <= 0) {
      this.health = 0;
      renderCard();
      alert(`${this.name} has died!`);
    } else {
      renderCard();
    }
  },

  levelUp: function () {
    this.level += 1;
    renderCard();
  }
};

function renderCard() {
  document.getElementById('charImage').src = character.image;
  document.getElementById('charImage').alt = character.name;
  document.getElementById('charName').textContent = character.name;
  document.getElementById('charClass').textContent = character.characterClass;
  document.getElementById('charLevel').textContent = character.level;
  document.getElementById('charHealth').textContent = character.health;
}

document.getElementById('attackedBtn').addEventListener('click', function () {
  character.attacked();
});

document.getElementById('levelUpBtn').addEventListener('click', function () {
  character.levelUp();
});

renderCard();