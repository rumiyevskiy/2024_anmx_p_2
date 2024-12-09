// це слухач (гладач, наглядач, відстежувач) подій,  який підтверджує завантаження всього контенту DOM, а після запускає функцію,  в якій ми прописуємо всі наші завдання для javascript
document.addEventListener("DOMContentLoaded", function () {

  // це реалізація виявлення на якому пристрої відкрит наш додаток або сторінка. працює так: оголошуємо об'єкт з ім'ям isMobile, в якому ключи - це функції,  які перевіряють в значенні navigator.userAgent — рядок, який браузер надає, щоб описати себе. Наприклад: якщо в рядку userAgent є текст Android, метод поверне true. В кінці об'єкту я метод any: викликає всі інші методи (Android, BlackBerry, iOS, тощо) і повертає true, якщо хоча б один із них повертає true. Таким чином, визначається, чи це мобільний пристрій загалом.
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
// далі ми перевіряємо, чи повернув метод any значення true, якщо так, то додаємо до елемента body клас '__touch', інакше клас '__pc', далі можно або тут після додавання класу писати код  в залежності від того, для якого пристрою ми будемо це робити. але таким способом можно отримати помилкуи. то ліпше потім просто перевіряти який клас додан но елементу body і далі вже вирішувати завдання.
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
    
// *********************************************************************
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

  // *********************************************************************
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

  // *********************************************************************
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
        
        if (menuLink && menuLink.getAttribute('data-goto') === '.footer') {

          sendPostRequest(apiVersion, pixelId, token, eventData_Push);
          console.log('Атрибут data-goto містить значення .footer');

        } else {
          console.log('Атрибут data-goto не містить значення .footer');
        }

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
      videoElem.setAttribute('src', "https://www.youtube.com/embed/iMCNMVKjvhc?enablejsapi=1");
      document.getElementById("videoPlayer").contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');

      if (popupActive.querySelector('.full-form')) {
        
        funcSelectReset();
      } else {
          
      }

        popupActive.classList.remove('open');
        
          if (doUnlock) {
              bodyUnLock();
          }
      }
   };
  
  function bodyLock() {
      
      body.classList.add('__lock');

      unlock = false;
      setTimeout(function () {
          unlock = true;
      }, timeout);
  }

  function bodyUnLock() {
      setTimeout(function () {
          
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

// ***********************************************************************

    const swiper = new Swiper('.slider-main-block', {
      // Optional parameters
      loop: true,

      //**************************************************
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 2,
      spaceBetween: 50,
      
      preventClicks: true,
      slidesPerView: "auto",
      coverflowEffect: {
        depth: 250,
        modifier: 1,
        rotate: 0,
        stretch: 0,
        slideShadows: true,

      },

      //**************************************************
      // effect: "coverflow",

      // slidesPerView: "auto",
      // centeredSlides: true,
      // spaceBetween: 0,
      // grabCursor: true,

      // coverflowEffect: {
      //   rotate: 50,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 1,
      //   slideShadows: true,
      // },

    //**************************************************

      breakpoints: {
        640: {
          slidesPerView: 2,

        }
      },


      
        // Navigation arrows
      navigation: {
        nextEl: '.slider-main-block__arrow.swiper-button-next',
        prevEl: '.slider-main-block__arrow.swiper-button-prev',
      },
      
      autoplay: {
        delay: 3000,
      },
    });
  
    const swiper2 = new Swiper('.slider-main-block2', {
      // Optional parameters
      loop: true,

      // *************************************

      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 2,
      spaceBetween: 50,
      
      preventClicks: true,
      slidesPerView: "auto",
      coverflowEffect: {
        depth: 250,
        modifier: 1,
        rotate: 0,
        stretch: 0,
        slideShadows: true,

      },

      // *************************************
      // effect: "coverflow",

      // slidesPerView: 1,
      // centeredSlides: true,
      // spaceBetween: 0,
      // grabCursor: true,

      // *************************************

      breakpoints: {
        640: {
          slidesPerView: 2,

        }
      },
     
        // Navigation arrows
      navigation: {
        nextEl: '.slider-main-block2__arrow.swiper-button-next',
        prevEl: '.slider-main-block2__arrow.swiper-button-prev',
      },
      
      autoplay: {
        delay: 2000,
      },
    });
  
    const swiper3 = new Swiper('.slider-main-block3', {
      // Optional parameters
      loop: true,

      effect: "coverflow",

      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 0,
      grabCursor: true,

      breakpoints: {
        640: {
          slidesPerView: 3,

        }
      },


      
        // Navigation arrows
      navigation: {
        nextEl: '.slider-main-block3__arrow.swiper-button-next',
        prevEl: '.slider-main-block3__arrow.swiper-button-prev',
      },
      
      autoplay: {
        delay: 6000,
      },
  });

  


    document.querySelectorAll('.page__hero,.page__about .slide-image').forEach(image => {
      image.addEventListener('click', (event) => {
        let imagePath = event.target.src; 

          let rezult = new URL(imagePath).pathname;
          let repoName = '/2024_anmx_p_2';
          if (rezult.startsWith(repoName)) {
              rezult = rezult.replace(repoName, '');

          }             
          const relativePath = rezult.slice(1);
          const imgElement = document.querySelector("#popup1 .popup-img__item");
          if (imgElement) {
              imgElement.src = relativePath; 
          }
          const curentPopup = document.getElementById("popup1");
          popupOpen(curentPopup);

      });
    });
  
  // ***********************************************************************

  const page_1 = document.querySelector(".popup__content-page-1");
  const page_2 = document.querySelector(".popup__content-page-2");
  page_2.classList.add("pagehidden");
  const page_3 = document.querySelector(".popup__content-page-3");
  page_3.classList.add("pagehidden");

  const selectNum = document.querySelector(".custom-select");
  const optionsNum = selectNum.querySelectorAll(".option");
  const hiddenInputNum = selectNum.querySelector("input[type=hidden]");

  const selectСomposition = document.querySelector(".custom-select.__2"); 
  const optionsСomposition = selectСomposition.querySelectorAll(".option");
  const hiddenInputСomposition = selectСomposition.querySelector("input[type=hidden]#select_type-2");

  const btnResetPage1 = document.querySelector(".popup__content-page-1 button.custom-btn[type=reset]");
  const btnResetPage2 = document.querySelector(".popup__content-page-2 button.custom-btn[type=reset]");
  const btnResetPage3 = document.querySelector(".popup__content-page-3 button.custom-btn[type=reset]");
  const btnNextPage1 = document.querySelector(".popup__content-page-1 button.custom-btn.next");
  const btnNextPage2 = document.querySelector(".popup__content-page-2 button.custom-btn.next");
  const btnBackPage2 = document.querySelector(".popup__content-page-2 button.custom-btn.back");
  const btnBackPage3 = document.querySelector(".popup__content-page-3 button.custom-btn.back");


  optionsNum.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      hiddenInputNum.value = value;

      optionsNum.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
    });
  });

  btnResetPage1.addEventListener("click", () => {
    optionsNum.forEach((opt) => opt.classList.remove("selected"));
    hiddenInputNum.value = "";
  });

  btnNextPage1.addEventListener("click", (event) => {

    const selectedOpts = document.querySelectorAll(".popup__content-page-1 .custom-select.__1 .selected");

    if (!selectedOpts.length) {
      alert("Ці поля повині бути заповнені");
      event.preventDefault();
      return;
    }

    page_1.classList.add("pagehidden");
    page_2.classList.remove("pagehidden");
     event.preventDefault();

  });

  const selectedValues = new Set(); // Використовуємо Set для унікальності

  optionsСomposition.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");

      if (selectedValues.has(value)) {
        // Якщо опція вже вибрана, видаляємо її
        selectedValues.delete(value);
        option.classList.remove("selected");
      } else {
        // Якщо опція не вибрана, додаємо її
        selectedValues.add(value);
        option.classList.add("selected");
      }

      // Оновлюємо значення прихованого інпуту
      hiddenInputСomposition.value = Array.from(selectedValues).join(",");
    });
  });

  btnResetPage2.addEventListener("click", () => {
    optionsСomposition.forEach((opt) => opt.classList.remove("selected"));
    selectedValues.clear();
    hiddenInputСomposition.value = "";
  });

  btnNextPage2.addEventListener("click", (event) => {

    const selectedOpts = document.querySelectorAll(".popup__content-page-2 .custom-select.__2 .selected");


    if (!selectedOpts.length) {
      alert("Ці поля повині бути заповнені");
      event.preventDefault();
      return;
    }

    page_2.classList.add("pagehidden");
    page_3.classList.remove("pagehidden");
     event.preventDefault();
  });

  btnBackPage2.addEventListener("click", (event) => {
    page_2.classList.add("pagehidden");
    page_1.classList.remove("pagehidden");
    event.preventDefault();
  });

  btnBackPage3.addEventListener("click", (event) => {
    page_3.classList.add("pagehidden");
    page_2.classList.remove("pagehidden");
    event.preventDefault();
  });

  const funcSelectReset = (event) => {

    const mainFormOrder = document.querySelector('.popup3 .full-form');

    selectedValues.clear();
    const inputs = mainFormOrder.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    const optionsForReset = document.querySelectorAll(".popup3 .full-form .option.selected");

    optionsForReset.forEach(opt => {
      opt.classList.remove("selected");
    });

    alert("Всі данні в формі видалені! ");

    page_1.classList.remove("pagehidden");
    page_2.classList.add("pagehidden");
    page_3.classList.add("pagehidden");
  
  }
  
  btnResetPage3.addEventListener("click", funcSelectReset);

  // *****************************************************************

  const mainFormOrder = document.querySelector('.popup3 .full-form');
  const mainForm = document.querySelector('.page__section-3 .full-form');

  // Логіка обробки форми
  mainFormOrder.addEventListener('submit', (event) => {

    event.preventDefault(); // Зупиняємо стандартну поведінку форми

    if (!mainFormOrder.privacy.checked) {
      const privacy = document.querySelector(".privacy-policy");
      privacy.classList.add("error");
      alert("Заповніть всі поля!")
      return;
    }

    const privacyElem = document.querySelector(".privacy-policy");
    privacyElem.classList.remove("error");
    const name = mainFormOrder.name.value;
    const phone = mainFormOrder.phone.value;
    const email = mainFormOrder.email.value;
    const request = hiddenInputNum.value;    
    const select_type = hiddenInputСomposition.value;
    const select_size = mainFormOrder.select_size.value;
    const select_decor = mainFormOrder.select_decor.value;
    const privacy = mainFormOrder.privacy.checked ? 'Так' : 'Ні';

    sendTelegram(name, phone, email, request, select_type, select_size, select_decor, privacy); // Викликаємо функцію для відправки в Telegram
    
    sendPostRequest(apiVersion, pixelId, token, eventData);
  });

  mainForm.addEventListener('submit', (event) => {

    event.preventDefault(); // Зупиняємо стандартну поведінку форми

    const name = mainForm.name.value;
    const phone = mainForm.phone.value;
    const email = mainForm.email.value;

    sendTelegram(name, phone, email); // Викликаємо функцію для відправки в Telegram
  });

  // Функція для відправки повідомлення в Telegram
  async function sendTelegram(name, phone, email, request, select_type, select_size, select_decor, privacy) {

    // const botToken = '7648355172:AAE4jsw4ZfadhgoEezXJyy0X7U4EQwFkkbQ'; // Токен МІЙ бота
    // const chatId = '-4588952109'; // ID МІЙ чату
    const botToken = '1605870485:AAHL-Z9gtDNJxzN3hggY_cd3yUeUfQ072yE'; // Токен бота
    const chatId = '-551933957'; // ID чату

        const bodymessage = `
            Запит з сайту Annamax (Набір солодощів)
            Ім'я: ${name}
            Телефон: ${phone}
            Пошта: ${email}
            Літери: ${request||""}
            Наповнювачи: ${select_type||""}
            Варіант цифр: ${select_size||""}
            Святкове оформлення: ${select_decor||""}
            Згода на обробку даних: ${privacy||"так"}
        `;

        // Відправка через API Telegram
        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: bodymessage
                })
            });

            const data = await response.json();
            if (data.ok) {

                console.log('The message has been successfully sent!');

                alert('Thank you! Your message has been sent.');

                // Автоматичне надсилання повідомлення на пошту, повідомлення не бачно
                sendEmail2(name, phone, email, request, select_type, select_size, select_decor, privacy);

            } else {

                console.error('Помилка Telegram:', data);

                alert('An error occurred while sending the message');
            }
        } catch (error) {


            console.error('Помилка запиту:', error);

            alert('An error occurred while sending the request.');
        }
  }
  
  function sendEmail2(name, phone, email, request, select_type, select_size, select_decor, privacy) {

    // сайт: https://dashboard.emailjs.com/admin/account
    // це Public Key з розділу account/general:API keys
    // let emailjsID = "_ruQbUC348SMI_KYA"; // МІЙ-ID
    let emailjsID = "mq5LVCRL1uA0epLXa";

    // ініціалізація сервісу за допомогою Public Key (або ще його називають user_id)
    emailjs.init(emailjsID);

    // Параметри для Email.js, тут ми формуємо об'єкт, який надішлемо до пошти, вказаної при реєстрації на сервісі emailjs. тут головне: щоб назви ключей відповідали змінним у подвійних дужках {{}} в темплейті(шаблоні) в сервісі emailjs
    const templateParams = {
      from_name: 'site Annamax (Набір солодощів)',
      message: `Ім'я: ${name || ""} 
                Телефон: ${phone || ""}
                Е-mail: ${email || ""}
                Літери: ${request || ""}
                Наповнювачи: ${select_type || ""} 
                Варіант цифр: ${select_size || ""} 
                Святкове оформлення: ${select_decor || ""}`,
    };
    

    // сюда SERVICE_ID записується Service ID з вкладки Edit Service який ми отримали при додаванні сервіса, яким будемо користуватися при надсиланнях повідомлень в emailjs. я використовував gmail
    // let SERVICE_ID = 'service_oeydswb'; // МІЙ-ID
    let SERVICE_ID = 'service_pq3pnlx';

    // сюда TEMPLATE_ID записується Template ID з вкладки Email Templates, далі обираємо потрібний створений нами template (в безкоштовному варіанті їх тільки два), далі обираємо settings, там знаходимо Template ID
    // let TEMPLATE_ID = 'template_53b9ea6'; // МІЙ-ID
    let TEMPLATE_ID = 'template_4zhd3xj';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then((response) => {


            console.log('Email успішно відправлено!', response.status, response.text);

            alert('Ваше повідомлення успішно відправлено!');
        })
        .catch((error) => {

            console.error('Помилка відправки:', error);
            alert('Сталася помилка при відправці.');
        });
  }
  
  // *******************************************************
    

    // Отримуємо всі елементи з класом "collapsible"
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((collapsible) => {
    const header = collapsible.querySelector(".collapsible__header");
    const content = collapsible.querySelector(".collapsible__content");

    header.addEventListener("click", () => {
      const isExpanded = collapsible.classList.contains("collapsible--expanded");

      if (isExpanded) {
        // Згорнути
        content.style.height = `${content.scrollHeight}px`; // Встановлюємо початкову висоту
        requestAnimationFrame(() => {
          content.style.height = "0"; // Анімуємо до 0
        });

        collapsible.classList.remove("collapsible--expanded");
      } else {
        // Розгорнути
        content.style.height = "0"; // Починаємо з 0
        requestAnimationFrame(() => {
          content.style.height = `${content.scrollHeight}px`; // Анімуємо до scrollHeight
        });

        collapsible.classList.add("collapsible--expanded");
      }

      // Скидаємо висоту після завершення анімації
      content.addEventListener(
        "transitionend",
        () => {
          if (!isExpanded) {
            content.style.height = "auto"; // Встановлюємо auto, щоб працювало з динамічним контентом
          }
        },
        { once: true }
      );
    });
  });
 
  

  // *******************************************************
  function findVideos() {
    let videos = document.querySelectorAll('.video__body-item');



    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    let linkVideoHref = video.querySelector('.video__link').href;

    let button = video.querySelector('.video__button');

    video.addEventListener('click', (event) => {
      event.preventDefault();
      let popupBody = document.getElementById("videoPlayer");

      let iframeSrcValue = linkVideoHref + '?enablejsapi=1';
      popupBody.setAttribute('src', iframeSrcValue);
      let  videoPopup = document.getElementById("popup2");
               popupOpen(videoPopup);

    });    
  }

  findVideos();

  // *****************************************************************
    
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);

    }

    let options = {
        threshold: 0.3
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
            }
        });
    }, options);

    let sections = document.querySelectorAll(".running-numbers .running-numbers__box");
    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }


  // *****************************************************************

  const timeValue = Math.floor(Date.now() / 1000);

    const sendPostRequest = async (apiVersion, pixelId, token, eventData) => {
      const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${token}`;
    
      const payload = {
        data: eventData, // Ваші дані події
      };
    
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Помилка запиту:", errorData);
        } else {
          const responseData = await response.json();
          console.log("Успішна відповідь:", responseData);
        }
      } catch (error) {
        console.error("Помилка під час виконання запиту:", error);
      }
    };
    
    // Використання функції
    const apiVersion = "v12.0"; // Вкажіть вашу версію API
    const pixelId = "497413253345752";
    const token = "EAAHTZBUO2nWIBO3DCJmUqiR3BNDNJmRWyEtpF3gLMZCofyGyrReSAOS4RDZCgTi0mlZCNNkk62OR8XQjQthZAwItJKZBDy1J3M2Vm0i00GslwlNKTSiBJwZCCnmziuomxZBBViCiKNxtEZB1RfA3wRmnX9TZAev3sZCZAAd93dTFEj7DEm4iCVmFjQWg6nEPEHvSsLqoxwZDZD";
    const eventData = [
            {
                 "event_name": "SubmitApplication",
                "event_time": timeValue,
                "action_source": "website",
                "user_data": {
                    "em": [
                        "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
                    ],
                    "ph": [
                        null
                    ]
                },
                "custom_data": {
                    "currency": "USD",
                    "value": "142.52"
                },
                "original_event_data": {
                    "event_name": "SubmitApplication",
                    "event_time": timeValue
                },
            },
    ];
  
    const eventData_Push = [
      {
                "event_name": "Contact",
                "event_time": timeValue,
                "action_source": "website",
                "user_data": {
                    "em": [
                        "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
                    ],
                    "ph": [
                        null
                    ]
                },
                "custom_data": {
                    "currency": "USD",
                    "value": "111"
                },
                "original_event_data": {
                    "event_name": "Contact",
                    "event_time": timeValue
                },
            },
    ];
    
    // sendPostRequest(apiVersion, pixelId, token, eventData);
  



    // *****************************************************************
  // const timeValue = Math.floor(Date.now() / 1000);
  console.log("time: ", timeValue);

});
  




