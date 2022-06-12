class Game {
    chooseCharacter() {
        const buttons = document.querySelectorAll('.choose-btn');
        console.log(buttons.length);
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let leastChar = [];
                let firstCharacter;
                characters.forEach(char => {
                    if(char.name !== button.id) {
                        leastChar.push(char);
                    } else {
                        firstCharacter = char;
                    }
                });
                const randomCharacter = leastChar[Math.floor(Math.random() * leastChar.length)];
                disp.createFightField(firstCharacter, randomCharacter);
            });
        });
    }
    fighting(first, second) {
        const fightBtn = document.querySelector('.fightBtn');
        fightBtn.style.display = 'none';
        const interval = setInterval(() => {
            console.log('fight');
            first.health -= Math.round((100 - first.armour)*second.power/100);
            second.health -= Math.round((100 - second.armour)*first.power/100);
            console.log(second.health);
            if (first.health < 0) {
                first.health = 0;
            }
            if(second.health < 0) {
                second.health = 0;
            }
            disp.refresh(first);
            disp.refresh(second);
            if (first.health == 0 || second.health == 0) {
                clearInterval(interval);
                const winner = first.health > second.health ? first.name : second.name;
                const textWinner = document.createElement('p');
                textWinner.textContent = winner + ' is the winner!';
                textWinner.className = 'winner';
                const main = document.querySelector('main');
                main.appendChild(textWinner);
            }
        }, 1000);
    }
}

class Unit {
    constructor(name, avatar, power, armour) {
        this.name = name;
        this.health = 300;
        this.avatar = avatar;
        this.power = power;
        this.armour = armour;
    }
}

class Display {
    startGame(characters) {
        startBtn.style.display = 'none';
        
        characters.forEach(char => {
            this.createCharacter(char, '.characters-list');
        });
        const charsField = document.querySelector('.characters-list');
        charsField.style.display = 'flex';
        const header = document.querySelector('header');
        header.innerText = 'Choose your fighter';
        game.chooseCharacter();
    }

    createCharacter(character, field) {
        const charsField = document.querySelector(field);
        charsField.style.display = 'none';

        const charField = document.createElement('div');
        charField.classList.add('character');

        const charAva = document.createElement('img');
        charAva.src = character.avatar;

        const charName = document.createElement('p');
        charName.textContent = character.name;
        charName.className = 'character-name';

        const charPower = document.createElement('p');
        charPower.textContent = 'Power: ' + character.power;
        charPower.className = 'character-skill';

        const charArmour = document.createElement('p');
        charArmour.textContent = 'Armour: ' + character.armour;
        charArmour.className = 'character-skill';

        const chooseBtn = document.createElement('button');
        chooseBtn.textContent = 'Choose';
        chooseBtn.className = 'choose-btn';
        chooseBtn.id = character.name; 

        const health = document.createElement('div');
        health.className = 'health';
        health.textContent = character.health;
        health.id = character.name;

        charField.appendChild(charAva);
        charField.appendChild(charName);
        charField.appendChild(charPower);
        charField.appendChild(charArmour);
        if(field === '.battle-field') {
            charField.appendChild(health);
        } else {
            charField.appendChild(chooseBtn);
        }
        charField.classList.add('animation');
        charsField.appendChild(charField);
    }

    createFightField(first, random) {
        const charsField = document.querySelector('.characters-list');
        charsField.style.display = 'none';

        const header = document.querySelector('header');
        header.innerText = 'Let\'s fight!';

        this.createCharacter(first, '.battle-field');
        this.createCharacter(random, '.battle-field');

        const fightField = document.querySelector('.battle-field');
        fightField.style.display = 'flex';

        const fightBtn = document.createElement('button');
        fightBtn.textContent = 'Fight';
        fightBtn.className = 'fightBtn';

        const main = document.querySelector('main');
        main.appendChild(fightBtn);

        fightBtn.addEventListener('click', () => {
            game.fighting(first, random);
        });
    }
    refresh(character) {
        const health = document.querySelectorAll('.health');
        console.log(health.length);
        health.forEach((el) => {
            console.log(el.id);
            if(el.id == character.name) {
                el.textContent = character.health;
                if(character.health>=30) {
                    el.style.width = Math.round(character.health/3) + '%'; 
                } 
                if(character.health <=60) {
                    el.style.backgroundColor = 'rgb(162, 62, 0)';
                } else if(character.health <=150) {
                    el.style.backgroundColor = 'rgb(162, 160, 0)';
                }
            }
        });
    }
}

const header = document.querySelector('header');
header.innerText = 'MarvelCraft';

const characters = [
    new Unit('Iron Man', 'https://i.pinimg.com/564x/74/44/22/7444220ce50e9f829ffdf2837df6fea4.jpg', 40, 30),
    new Unit('Captain America', 'https://i.pinimg.com/564x/9f/f6/d4/9ff6d4c7ce8d26a16fb9ca55342c670e.jpg', 43, 26),
    new Unit('Spider Man', 'https://i.pinimg.com/564x/a0/87/42/a08742c448e06ce24320980256e38477.jpg', 38, 28),
    new Unit('Doctor Strange', 'https://i.pinimg.com/564x/68/c9/be/68c9be968cbc771d425095356b75669b.jpg', 43, 32),
    new Unit('Scarlet Witch', 'https://i.pinimg.com/564x/e7/1f/f6/e71ff60d1d0ff42c2651d2961d1a2657.jpg', 48, 30),
    new Unit('Venom', 'https://i.pinimg.com/564x/c8/9d/df/c89ddff8b66b39945a43ac327246af1b.jpg', 39, 29),
    new Unit('Thanos', 'https://i.pinimg.com/564x/d7/07/e2/d707e20e234aaf00ed529958c6963c3d.jpg', 44, 35),
    new Unit('Star Lord', 'https://i.pinimg.com/564x/02/43/ec/0243ec8041980ca786cc3779ff8e35ed.jpg', 36, 28),
    new Unit('Ant-Man', 'https://i.pinimg.com/564x/c7/0c/18/c70c183447e10ffa0ee3f270f26623fb.jpg', 36, 26),
    new Unit('Hawkeye', 'https://i.pinimg.com/564x/18/04/1a/18041ac8e8999f163d5f092a734e41eb.jpg', 34, 28),
    new Unit('Black Widow', 'https://i.pinimg.com/564x/e2/21/a4/e221a4aed0ede751e330a934268ae66b.jpg', 37, 26),
    new Unit('Gamora', 'https://i.pinimg.com/564x/9b/1c/96/9b1c96f1ae36ca6125657d2d131b9124.jpg', 38, 28),
];
console.log(characters);

const game = new Game();
const disp = new Display();

const fightBtn = document.querySelector('.fight');
fightBtn.style.display = 'none';

const startBtn = document.querySelector('.start');
startBtn.onclick = () => {
    disp.startGame(characters);
};





