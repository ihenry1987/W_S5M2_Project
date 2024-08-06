function moduleProject2() {
  let startTime = new Date().getTime();

  function getTimeElapsed() {
    return new Date().getTime() - startTime;
  }

  let footer = document.querySelector('footer');
  let currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let keys = {
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  };

  const getAllSquares = () => document.querySelectorAll('.square');

  for (let n = 0; n < 5; n++) {
    let row = document.createElement('div');
    document.querySelector('#grid').appendChild(row);
    row.classList.add('row');
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div');
      square.classList.add('square');
      row.appendChild(square);
      square.addEventListener('click', () => {
        let targetedSquare = document.querySelector('.square.targeted');
        if (targetedSquare) targetedSquare.classList.remove('targeted');
        square.classList.add('targeted');
      });
    }
  }

  document.querySelector('.row:nth-child(3)').children[2].classList.add('targeted');

  function generateRandomIntegers() {
    let randomInts = [];
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25);
      if (!randomInts.includes(randomInt)) randomInts.push(randomInt);
    }
    return randomInts;
  }

  let allSquares = getAllSquares();
  generateRandomIntegers().forEach(randomInt => {
    let mosquito = document.createElement('img');
    mosquito.src = './mosquito.png';
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`;
    mosquito.dataset.status = 'alive';
    allSquares[randomInt].appendChild(mosquito);
  });

  document.addEventListener('keydown', evt => {
    let targetedSquare = document.querySelector('.square.targeted');
    let row = targetedSquare.parentElement;
    let index = Array.from(row.children).indexOf(targetedSquare);

    if (evt.key === keys.up && row.previousElementSibling) {
      let newTarget = row.previousElementSibling.children[index];
      targetedSquare.classList.remove('targeted');
      newTarget.classList.add('targeted');
    } else if (evt.key === keys.down && row.nextElementSibling) {
      let newTarget = row.nextElementSibling.children[index];
      targetedSquare.classList.remove('targeted');
      newTarget.classList.add('targeted');
    } else if (evt.key === keys.left && targetedSquare.previousElementSibling) {
      let newTarget = targetedSquare.previousElementSibling;
      targetedSquare.classList.remove('targeted');
      newTarget.classList.add('targeted');
    } else if (evt.key === keys.right && targetedSquare.nextElementSibling) {
      let newTarget = targetedSquare.nextElementSibling;
      targetedSquare.classList.remove('targeted');
      newTarget.classList.add('targeted');
    } else if (evt.key === keys.space) {
      let mosquito = targetedSquare.querySelector('img[data-status="alive"]');
      if (mosquito) {
        mosquito.dataset.status = 'dead';
        targetedSquare.style.backgroundColor = 'red';
        mosquito.remove();

        let remainingMosquitoes = document.querySelectorAll('img[data-status="alive"]').length;
        if (remainingMosquitoes === 0) {
          let elapsedTime = getTimeElapsed() / 1000;
          document.querySelector('p.info').textContent = `Extermination completed in ${elapsedTime.toFixed(2)} seconds!`;
          let restartButton = document.createElement('button');
          restartButton.textContent = 'Restart';
          restartButton.addEventListener('click', () => location.reload());
          document.querySelector('h2').appendChild(restartButton);
          restartButton.focus();
        }
      }
    }
  });
}

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
