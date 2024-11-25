"use strict";

document.addEventListener("DOMContentLoaded", function () {

  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);  
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);  
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);  
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);  
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);  
    },
    webOS: function () {
      return navigator.userAgent.match(/webOS/i);  
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.webOS()
        );
    }
  };

  if (isMobile.any()) {
      document.body.classList.add('__touch');

      let menuArrows = document.querySelectorAll('.header__menu__item__arrow');

      if(menuArrows.length>0) {
        for(let i = 0; i < menuArrows.length; i++) {
          const menuArrow = menuArrows[i];
          
          menuArrow.addEventListener('click', function (e) {
            menuArrow.parentElement.classList.toggle('__active');
          });
        }
      };
  } else {
      document.body.classList.add('__pc');
  }
    

// кнопка вгору

  const returnBtn = document.querySelector('.return__btn');

  document.addEventListener('scroll', function () {
      if (scrollY >= 100) {
          returnBtn.classList.remove('hidden');
      }else{
          returnBtn.classList.add('hidden');
      };
  });

  returnBtn.addEventListener('click', function () {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      })
  });

  // меню бургер

  const burgerIcon = document.querySelector('.burger');
  const menuBody = document.querySelector('.header__menu__body');

    if(burgerIcon) {
          burgerIcon.addEventListener('click', () => {
          document.body.classList.toggle('__lock');
          burgerIcon.classList.toggle('__active');
          menuBody.classList.toggle('__active');
        })
    }


  // перекидання при натисканні

  const menuLinks = document.querySelectorAll('[data-goto]');

  if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick (e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

          if(burgerIcon.classList.contains('__active')) {
            document.body.classList.remove('__lock');
            burgerIcon.classList.remove('__active');
            menuBody.classList.remove('__active');
          };

          window.scrollTo ({
              top: gotoBlockValue,
              behavior: 'smooth'
          });
          e.preventDefault();

      };
    };
  };

  // *************************************************************

  // Отримуємо елемент з класом .typing-text
  const text = document.querySelector('.typing-text');

  // Отримуємо всі слова з дочірніх елементів <span>
  // Перетворюємо список <span> на масив за допомогою Array.from.
  // map(span => span.textContent) витягує текстовий вміст кожного <span> у масив words.
  const words = Array.from(text.querySelectorAll('span')).map(span => span.textContent);

  // Запускаємо функцію з друку
  setTyper(text, words);

  function setTyper(element, words) {

      // затримка між друком кожної літери (в мілісекундах).
      const LETTER_TYPE_DELAY = 75;
      
      // час, протягом якого повне слово залишається на екрані перед видаленням (в мілісекундах).
      const WORD_STAY_DELAY = 2000;
      
      // напрямок друку вперед
      const DIRECTION_FORWARDS = 0;
      
      // напрямок друку назад
      const DIRECTION_BACKWARDS = 1;
      
      // напрямок друку
      let direction = DIRECTION_FORWARDS;
      // індекс поточного слова з масиву
      let wordIndex = 0;
      // індекс поточної літери у слові.
      let letterIndex = 0;
      
      // змінна для збереження інтервалу друку.
      let wordTypeInterval;
      
      // Запуск друку
      startTyping();
      
      function startTyping() {      
          wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);        
      }
      

    function typeLetter() {
      const word = words[wordIndex];

      if (direction === DIRECTION_FORWARDS) {
        letterIndex++;

        if (letterIndex === word.length) {
          direction = DIRECTION_BACKWARDS;
          clearInterval(wordTypeInterval);
          setTimeout(startTyping, WORD_STAY_DELAY);
        }
      } else if (direction === DIRECTION_BACKWARDS) {
        letterIndex--;

        if (letterIndex === 0) {
          nextWord();
        }
      }

      const textToType = word.substring(0, letterIndex);
      element.textContent = textToType;
    }

    function nextWord() {
      letterIndex = 0;
      direction = DIRECTION_FORWARDS;
      wordIndex++;

      if (wordIndex === words.length) {
        wordIndex = 0;
      }
    }
  };

  
  // ***********************************************************************

  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  const timeout = 300;

  if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
          const popupLink = popupLinks[index];
          popupLink.addEventListener("click", function (e) {
              const popupName = popupLink.getAttribute('href').replace('#', '');
              const curentPopup = document.getElementById(popupName);
              console.log("curentPopup: ", curentPopup);
              popupOpen(curentPopup);
              e.preventDefault();
          });
      }
  };
  
  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
          const el = popupCloseIcon[index];
          el.addEventListener("click", function (e) {
              popupClose(el.closest('.popup'));
              e.preventDefault();
          });
      }
  };

  function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
          const popupActive = document.querySelector('.popup.open');
          if (popupActive) {
              popupClose(popupActive, false);
          } else {
              bodyLock();
          }
          curentPopup.classList.add('open');
          curentPopup.addEventListener("click", function (e) {
              if (!e.target.closest('.popup__content')) {
                  popupClose(e.target.closest('.popup'));
              }
          });
       };
  };

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        
      const videoElem = document.getElementById("videoPlayer");
      // videoElem.style.display = "none";

      document.getElementById("videoPlayer").contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      console.log("popup closed", videoElem);

        popupActive.classList.remove('open');
        
          if (doUnlock) {
              bodyUnLock();
          }
      }
   };
  
  function bodyLock() {
      // const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

      // if (lockPadding.length > 0) {
      //     for (let index = 0; index < lockPadding.length; index++) {
      //         const el = lockPadding[index];
      //         el.style.paddingRight = lockPaddingValue;
      //     }
      // }        
      // body.style.paddingRight = lockPaddingValue;
      body.classList.add('__lock');

      unlock = false;
      setTimeout(function () {
          unlock = true;
      }, timeout);
  }

  function bodyUnLock() {
      setTimeout(function () {
          // if (lockPadding.length > 0) {
          //     for (let index = 0; index < lockPadding.length; index++) {
          //         const el = lockPadding[index];
          //         el.style.paddingRight = '0px';
          //     }
          // }            
          // body.style.paddingRight = '0px';
          body.classList.remove('__lock');
      }, timeout);

      unlock = false;
      setTimeout(function () {
          unlock = true;
      }, timeout);
  }

  document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
          const popupActive = document.querySelector('.popup.open');
          popupClose(popupActive);
      }
  })

  // **************************************************************************
  //   let player;

  //   // Ініціалізація YouTube API
  //   function onYouTubeIframeAPIReady() {
  //       player = new YT.Player('videoPlayer', {
  //           events: {
  //           'onReady': onPlayerReady
  //           }
            
  //       });
  //     console.log("player: ", player);
  //   }

  // function onPlayerReady(event) {
  //   console.log("player2: ", player);
  //       // Обробка натискання кнопки
  //   document.querySelector('.close-popup').addEventListener('click', () => {
  //     console.log("player3: ", player);
  //           if (player) {
  //               player.pauseVideo(); // Зупиняє відео
  //           }
  //       });
  // };
  // **************************************************************************
  


});
  




