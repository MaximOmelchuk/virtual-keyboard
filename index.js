import {
  arrIndexFixed, arrIndexWide, arrButtonValuesFixed, arrButtonValuesEn,
  arrButtonValuesRu, arrButtonValuesEnCaps, arrButtonValuesRuCaps, arrButtonValuesEnShift,
  arrButtonValuesRuShift, arrButtonValuesShiftCapsEn, arrButtonValuesShiftCapsRu, arrWhich,
} from './data.js';

let currentLang = 'en'; let
  arrButtonValuesCommon;
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
const screen = document.createElement('textarea');
screen.classList.add('screen');
screen.autofocus = true;
const text = document.createElement('div');
text.classList.add('text');
text.innerHTML = 'You can switch languages by pressing <b>Ctrl</b> + <b>Shift</b>.<br>Keyboard designed for Windows.<br><br><a href="github.com/MaximOmelchuk">Maxim Omelchuk,<a><br><a href="https://rs.school">Rolling Scopes School, 2022<a>';

for (let i = 1; i <= 64; i += 1) {
  const button = document.createElement('div');
  button.classList.add('button');
  if (arrIndexFixed.includes(i)) {
    button.classList.add('fixed');
  } else button.classList.add('nonfixed');
  if (arrIndexWide.includes(i)) {
    button.classList.add('wide');
  }
  if (i === 59) button.classList.add('space');
  keyboard.append(button);
  if (i === 43 || i === 55) button.classList.add('shift');
  if (i === 56 || i === 61) button.classList.add('ctrl');
  if (i === 30) button.classList.add('CapsLock');
}

const fixedArr = keyboard.querySelectorAll('.fixed');
const nonFixedArr = keyboard.querySelectorAll('.nonfixed');

fixedArr.forEach((x, i) => {
  const tmp = x;
  tmp.innerHTML = arrButtonValuesFixed[i];
});

if (currentLang === 'en') {
  nonFixedArr.forEach((x, i) => {
    const tmp = x;
    tmp.innerHTML = arrButtonValuesEn[i];
  });
} else if (currentLang === 'ru') {
  nonFixedArr.forEach((x, i) => {
    const tmp = x;
    tmp.innerHTML = arrButtonValuesEn[i];
  });
}
if (!arrButtonValuesCommon) {
  arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((x) => x.innerHTML);
}

// FUNCTIONS

const displayOnScreenMouseDown = (e) => {
  e.preventDefault();
  if (e.target.closest('.nonfixed') || (e.target.closest('.button') && ['▲', '◄', '▼', '►'].includes(e.target.closest('.button').innerHTML))) {
    screen.value += e.target.closest('.button').innerHTML;
  }
  if (e.target.closest('.space')) {
    screen.value += ' ';
  }
  if (e.target.closest('.button') && e.target.closest('.button').innerHTML === 'Tab') {
    screen.value += '    ';
  }
  if (e.target.closest('.button') && e.target.closest('.button').innerHTML === 'Enter') {
    screen.value += '\n';
  }
  if (e.target.closest('.button') && e.target.closest('.button').innerHTML === 'Backspace') {
    const tmp = screen.selectionStart;
    screen.value = screen.value.slice(0, tmp - 1) + screen.value.slice(tmp);
    screen.selectionEnd = tmp - 1;
  }
  if (e.target.closest('.button') && e.target.closest('.button').innerHTML === 'Del') {
    const tmp = screen.selectionStart;
    screen.value = screen.value.slice(0, tmp) + screen.value.slice(tmp + 1);
    screen.selectionEnd = tmp;
  }
  if (e.target.closest('.CapsLock')) {
    if (e.target.closest('.CapsLock').classList.contains('button-down')) {
      e.target.closest('.CapsLock').classList.remove('button-down');
    } else e.target.closest('.CapsLock').classList.add('button-down');
  } else if (e.target.closest('.button')) {
    e.target.closest('.button').classList.add('button-down');
  }
};

const displayOnScreenMouseUp = (e) => {
  if (e.target.closest('.shift')) e.target.closest('.shift').classList.remove('button-down');
  keyboard.querySelectorAll('.button').forEach((x) => {
    if (!x.classList.contains('CapsLock') && !x.classList.contains('shift')) x.classList.remove('button-down');
  });
};

// const changeCompliance = (which, key) => {
//   if (arrButtonValuesCommon.indexOf(key) === -1) {
//   let ind = arrWhich.indexOf(+which);
//   console.log(which,arrWhich, keyboard.querySelectorAll('.nonfixed'), ind)
//   return keyboard.querySelectorAll('.nonfixed')[ind].innerHTML;
//   } else return key;

//   // let tmp = key;
//   // if (arrButtonValuesCommon.indexOf(tmp) === -1) {
//   //   if (arrButtonValuesRu.includes(tmp)) {
//   //     return arrButtonValuesEn[arrButtonValuesRu.indexOf(tmp)]
//   //   } else if (arrButtonValuesEn.includes(tmp)) {
//   //     return arrButtonValuesRu[arrButtonValuesEn.indexOf(tmp)]
//   //   } else if (arrButtonValuesRuShift.includes(tmp)) {
//   //     return arrButtonValuesEnShift[arrButtonValuesRuShift.indexOf(tmp)]
//   //   } else if (arrButtonValuesEnShift.includes(tmp)) {
//   //     return arrButtonValuesRuShift[arrButtonValuesEnShift.indexOf(tmp)]
//   //   } else if (arrButtonValuesRuCaps.includes(tmp)) {
//   //     return arrButtonValuesEnCaps[arrButtonValuesRuCaps.indexOf(tmp)]
//   //   } else if (arrButtonValuesEnCaps.includes(tmp)) {
//   //     return arrButtonValuesRuCaps[arrButtonValuesEnCaps.indexOf(tmp)]
//   //   }
//   // }
//   // return tmp;
// }

const displayOnScreenKeyboardDown = (e) => {
  let keyCompliance;
  if (e.code === 'Space') keyCompliance = '&nbsp;';
  if (e.key === 'Delete') keyCompliance = 'Del';
  if (e.key === 'Meta') keyCompliance = 'Win';
  if (e.key === 'Control') keyCompliance = 'Ctrl';
  if (e.key === 'ArrowUp') keyCompliance = '▲';
  if (e.key === 'ArrowDown') keyCompliance = '▼';
  if (e.key === 'ArrowLeft') keyCompliance = '◄';
  if (e.key === 'ArrowRight') keyCompliance = '►';

  if ((!keyCompliance && arrButtonValuesCommon.indexOf(e.key) === -1) || (e.key === '.')) {
    const ind = arrWhich.indexOf(e.which);
    keyCompliance = keyboard.querySelectorAll('.nonfixed')[ind].innerHTML;
  } else if (!keyCompliance) keyCompliance = e.key;

  const ind = ['ShiftRight', 'ControlRight', 'AltRight'].includes(e.code)
    ? arrButtonValuesCommon.lastIndexOf(keyCompliance)
    : arrButtonValuesCommon.indexOf(keyCompliance);

  if (ind !== -1) {
    if (keyCompliance === 'CapsLock') {
      if (keyboard.querySelector('.CapsLock').classList.contains('button-down')) {
        keyboard.querySelector('.CapsLock').classList.remove('button-down');
      } else keyboard.querySelector('.CapsLock').classList.add('button-down');
    } else {
      keyboard.querySelectorAll('.button')[ind].classList.add('button-down');

      if (!keyboard.querySelectorAll('.button')[ind].classList.contains('fixed')) {
        e.preventDefault();
        screen.value += keyCompliance;
      } else if (keyCompliance === 'Tab') {
        e.preventDefault();
      }
    }

    if (keyCompliance === 'Tab') e.preventDefault();

    if (keyCompliance === 'Tab') {
      screen.value += '    ';
    }
  }
};

const displayOnScreenKeyboardUp = (e) => {
  let keyCompliance;
  if (e.code === 'Space') keyCompliance = '&nbsp;';
  if (e.key === 'Delete') keyCompliance = 'Del';
  if (e.key === 'Meta') keyCompliance = 'Win';
  if (e.key === 'Control') keyCompliance = 'Ctrl';
  if (e.key === 'ArrowUp') keyCompliance = '▲';
  if (e.key === 'ArrowDown') keyCompliance = '▼';
  if (e.key === 'ArrowLeft') keyCompliance = '◄';
  if (e.key === 'ArrowRight') keyCompliance = '►';

  if ((!keyCompliance && arrButtonValuesCommon.indexOf(e.key) === -1) || (e.key === '.')) {
    const ind = arrWhich.indexOf(e.which);
    keyCompliance = keyboard.querySelectorAll('.nonfixed')[ind].innerHTML;
  } else if (!keyCompliance) keyCompliance = e.key;

  let ind;
  if (e.code !== 'CapsLock') {
    ind = ['ShiftRight', 'ControlRight', 'AltRight'].includes(e.code)
      ? arrButtonValuesCommon.lastIndexOf(keyCompliance)
      : arrButtonValuesCommon.indexOf(keyCompliance);
    if (ind !== -1) {
      document.querySelectorAll('.button')[ind].classList.remove('button-down');
    }
  }
};

const shifts = keyboard.querySelectorAll('.shift');
const capsLock = keyboard.querySelector('.CapsLock');
const ctrls = keyboard.querySelectorAll('.ctrl');

const shiftInfluentOn = (e) => {
  if (e.target.closest('.shift') || e.key === 'Shift') {
    if (currentLang === 'en') {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains('button-down')) {
          tmp.innerHTML = arrButtonValuesShiftCapsEn[i];
        } else tmp.innerHTML = arrButtonValuesEnShift[i];
        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains('button-down')) {
          tmp.innerHTML = arrButtonValuesShiftCapsRu[i];
        } else tmp.innerHTML = arrButtonValuesRuShift[i];
        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    }
  }
};

const shiftInfluentOff = (e) => {
  if (e.key === 'Shift' && (ctrls[0].classList.contains('button-down') || ctrls[1].classList.contains('button-down'))) return;

  if (e.target.closest('.shift') || e.key === 'Shift') {
    if (currentLang === 'en') {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains('button-down')) {
          tmp.innerHTML = arrButtonValuesEnCaps[i];
        } else tmp.innerHTML = arrButtonValuesEn[i];

        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains('button-down')) {
          tmp.innerHTML = arrButtonValuesRuCaps[i];
        } tmp.innerHTML = arrButtonValuesRu[i];

        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    }
  }
};

const capsLogInfluent = (e) => {
  if (e.key === 'CapsLock') {
    if (!document.querySelector('.CapsLock').classList.contains('button-down')) {
      if (shifts[0].classList.contains('button-down') || shifts[1].classList.contains('button-down')) {
        if (currentLang === 'en') {
          nonFixedArr.forEach((x, i) => {
            const tmp = x;
            tmp.innerHTML = arrButtonValuesEnShift[i];
            arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
          });
        } else {
          nonFixedArr.forEach((x, i) => {
            const tmp = x;
            tmp.innerHTML = arrButtonValuesRuShift[i];
            arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
          });
        }
      } else if (currentLang === 'en') {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arrButtonValuesEn[i];
          arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
        });
      } else {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arrButtonValuesRu[i];
          arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
        });
      }
    } else if (shifts[0].classList.contains('button-down') || shifts[1].classList.contains('button-down')) {
      if (currentLang === 'en') {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arrButtonValuesShiftCapsEn[i];
          arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
        });
      } else {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arrButtonValuesShiftCapsRu[i];
          arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
        });
      }
    } else if (currentLang === 'en') {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arrButtonValuesEnCaps[i];
        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arrButtonValuesRuCaps[i];
        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    }
  } else if (e.target.closest('.CapsLock')) {
    if (document.querySelector('.CapsLock').classList.contains('button-down')) {
      if (currentLang === 'en') {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arrButtonValuesEn[i];
          arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
        });
      } else {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arrButtonValuesRu[i];
          arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
        });
      }
    } else if (currentLang === 'en') {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arrButtonValuesEnCaps[i];
        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arrButtonValuesRuCaps[i];
        arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
      });
    }
  }
};

const langSwitch = (e) => {
  if ((e.key === 'Shift' && (ctrls[0].classList.contains('button-down') || ctrls[1].classList.contains('button-down')))
    || (e.key === 'Control' && (shifts[0].classList.contains('button-down') || shifts[1].classList.contains('button-down')))) {
    if (currentLang === 'en') {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arrButtonValuesRu[i];
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arrButtonValuesEn[i];
      });
    }
    if (currentLang === 'en') {
      currentLang = 'ru';
    } else currentLang = 'en';
    arrButtonValuesCommon = Array.prototype.slice.call(keyboard.querySelectorAll('.button')).map((y) => y.innerHTML);
  }
};

const changeLangLocalStorage = (curLang) => {
  if (curLang === 'ru') {
    nonFixedArr.forEach((x, i) => {
      const tmp = x;
      tmp.innerHTML = arrButtonValuesRu[i];
    });
  } else {
    nonFixedArr.forEach((x, i) => {
      const tmp = x;
      tmp.innerHTML = arrButtonValuesEn[i];
    });
  }
};

const setLocalStorage = () => {
  localStorage.setItem('currentLang', currentLang);
};

const getLocalStorage = () => {
  if (localStorage.getItem('currentLang')) {
    currentLang = localStorage.getItem('currentLang');
    changeLangLocalStorage(currentLang);
  }
};

// EVENT LISTENERS

keyboard.addEventListener('mousedown', displayOnScreenMouseDown);
keyboard.addEventListener('mouseup', displayOnScreenMouseUp);

document.addEventListener('keydown', displayOnScreenKeyboardDown);
document.addEventListener('keyup', displayOnScreenKeyboardUp);
shifts.forEach((x) => {
  x.addEventListener('mousedown', shiftInfluentOn);
  x.addEventListener('mouseup', shiftInfluentOff);
});
document.addEventListener('keydown', shiftInfluentOn);
document.addEventListener('keyup', shiftInfluentOff);
capsLock.addEventListener('mousedown', capsLogInfluent);
document.addEventListener('keydown', capsLogInfluent);
document.addEventListener('keydown', langSwitch);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

wrapper.append(screen, keyboard, text);
document.body.append(wrapper);
