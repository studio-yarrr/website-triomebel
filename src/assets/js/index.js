document.addEventListener("DOMContentLoaded", function (event) {

  const windowWidth = window.innerWidth;

  const fancy = document.querySelector('[data-fancybox]');

  if (fancy) {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }



  class DropDownList {

    constructor(dropDown, setting) {
      this.dropDown = dropDown;
      this.setting = setting
      this.#getElements();
      this.#click();
      if (this.setting.closeWindow === true) {
        this.#closeWindow()
      }


    }

    #getElements() {
      this.#getBtn();
      this.#getPanel();
    }

    #getBtn() {
      return this.btn = (typeof this.setting.btn === "string") ? this.dropDown.querySelector(this.setting.btn) : this.setting.btn;

    }
    #getPanel() {
      return this.panel = (typeof this.setting.panel === "string") ? this.dropDown.querySelector(this.setting.panel) : this.setting.panel; // получить панели
    }

    #click() {
      this.btn.addEventListener('click', () => {
        if (this.panel.style.maxHeight) {
          this.panel.style.maxHeight = null;
          this.dropDown.classList.remove('active');
        } else {
          this.panel.style.maxHeight = this.panel.scrollHeight + "px";

          this.dropDown.classList.add('active');
        }
      })
    }
    #closeWindow() {
      this.dropDown.addEventListener('click', () => {
        document.addEventListener("click", event => {
          this.#hide(event);
        });
      })
    }
    #hide(event) {
      if (this.dropDown.contains(event.target))
        return;
      this.panel.style.maxHeight = null;
      this.dropDown.classList.remove('active');
      document.removeEventListener("click", event => {
        this.#hide(event);
      });
    }
  }

  class Accordion {


    constructor(accordion, setting) {

      this.accordion = typeof accordion === "string" ? document.querySelector(accordion) : accordion;
      this.setting = setting;
      this.#getElements();
      this.#click();
      this.#showPanel();
    }

    #getElements() {
      this.#getBtn();
      this.#getPanel();
    }

    #getBtn() {
      return this.btnAll = typeof this.setting.btn === "string" ? this.accordion.querySelectorAll(this.setting.btn) : this.setting.btn;  //получить все кнопки
    }
    #getPanel() {
      return this.panelAll = typeof this.setting.panel === "string" ? this.accordion.querySelectorAll(this.setting.panel) : this.setting.panel;
    }


    #click() {
      this.btnAll.forEach((el, id) => {
        el.addEventListener('click', () => {
          //если true показывать только одну панель 
          if (this.setting.onlyOnePanel === true) {
            if (this.panelAll[id].style.maxHeight) {
              this.panelAll[id].style.maxHeight = null;
              this.btnAll[id].classList.remove('active');
              return;
            }
            this.panelAll.forEach((p, id) => {
              p.style.maxHeight = null;
              this.btnAll[id].classList.remove('active');
            });
            this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
            this.btnAll[id].classList.add('active');
          } else {
            if (this.panelAll[id].style.maxHeight) {
              this.panelAll[id].style.maxHeight = null;
              this.btnAll[id].classList.remove('active');
            } else {
              this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
              this.btnAll[id].classList.add('active');
            }
          }
        })
      });
    }

    #showPanel() {
      // открытая панель
      if (this.setting.showPanel) {
        const counter = this.setting.showPanel - 1;
        this.panelAll.forEach((p, id) => {
          if (counter === id) {
            p.style.maxHeight = this.panelAll[id].scrollHeight + "px";
            this.btnAll[id].classList.add('active');
          }
        });
      }
    }
  }

  let dropdown = document.querySelectorAll('.dropdown');

  if (dropdown.length > 0) {
    dropdown.forEach(dd => {
      new DropDownList(dd, {
        panel: '.dropdown-panel',
        btn: '.dropdown-btn',
        closeWindow: true, // не обязательно, закрывать панель при клике вне блока
      })

    })
  }

  const range = document.querySelector('.range-slider')


  /*----------------------------Accordion-----------------------------*/


  const accBar = document.querySelector('.sidebar__form');

  if (accBar && windowWidth <= 600) {
    new Accordion(accBar, {
      panel: '.sidebar__el-panel',
      btn: '.sidebar__el-title',
      onlyOnePanel: false,
      showPanel: 1,
    })
  }

  const specificationAcc = document.querySelector('.specification-acc');

  if (specificationAcc) {
    new Accordion(specificationAcc, {
      panel: '.specification-acc__panel',
      btn: '.specification-acc__btn',
      onlyOnePanel: true,

    })

  }




  /*-----------------------*/




  const navTop = document.querySelector('.header-top__nav');

  if (navTop) {
    if (windowWidth <= 1024 && windowWidth > 600) {
      const list = navTop.querySelectorAll('.list--hidden');
      const listMore = navTop.querySelector('.header-top__dropdown-panel ul');
      listMore.append(...list)
    }
  }

  const navBottom = document.querySelector('.header-bottom__nav');

  if (navBottom) {
    if (windowWidth <= 1024 && windowWidth > 600) {
      const list = navBottom.querySelectorAll('.list--hidden .header-bottom__nav-panel ul li');
      const listMore = navBottom.querySelector('.header-bottom__dropdown-panel ul');
      listMore.append(...list);

    }
  }


  const modalWrapper = document.querySelectorAll('.modal-wrapper');

  if (modalWrapper.length > 0) {

    modalWrapper.forEach(w => {
      w.addEventListener('click', closeWrapperModal)
    })

    function closeWrapperModal(ev) {
      if (ev.target === this) {
        this.classList.remove('visibility-modal');
        enableScroll();
      }
    }



  }

  // const modalCatalogContent = document.querySelector('.modal-catalog-content');
  // const catalogContent = document.querySelector('.header-bottom__nav-list');

  // if (modalCatalogContent && catalogContent) {
  //   modalCatalogContent.innerHTML = catalogContent.innerHTML;
  //   let a = modalCatalogContent.querySelectorAll('.header-bottom__nav-dropdown');
  //   modalCatalogContent.innerHTML = '';
  //   modalCatalogContent.append(...[...a].slice(1))
  // }



  /*-------------------------------Swiper------------------------------*/
  new Swiper('.swiper-banner', {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    effect: 'creative',
    creativeEffect: {
      prev: {

        translate: [0, 0, -500],
      },
      next: {

        translate: ['130%', 0, 0],
      },
    },
    navigation: {
      nextEl: '.swiper-banner .btn-next',
      prevEl: '.swiper-banner .btn-prev',
    }

  });

  new Swiper('.swiper-month', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 1,
    effect: 'creative',
    creativeEffect: {
      prev: {

        translate: [0, 0, -500],
      },
      next: {

        translate: ['130%', 0, 0],
      },
    },

    pagination: {
      el: '.products-month .swiper-pagination',
      clickable: true,
    },



  });

  new Swiper('.swiper-news', {

    speed: 600,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },

      374: {
        slidesPerView: 1,
        spaceBetween: -40,
      },

      440: {
        slidesPerView: 1,
        spaceBetween: -60,
      },

      558: {
        slidesPerView: 1,
        spaceBetween: -80,
      },

      601: {
        slidesPerView: 2,
        spaceBetween: -80,
      },

      880: {
        slidesPerView: 2,
        spaceBetween: -120,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 10,
      },

    },

  });
  new Swiper('.swiper-comment', {

    speed: 600,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },

      374: {
        slidesPerView: 1,
        spaceBetween: -40,
      },

      440: {
        slidesPerView: 1,
        spaceBetween: -60,
      },


      558: {
        slidesPerView: 1,
        spaceBetween: -80,
      },

      601: {
        slidesPerView: 2,
        spaceBetween: -80,
      },

      880: {
        slidesPerView: 2,
        spaceBetween: -120,
      },
      1025: {
        slidesPerView: 4,
        spaceBetween: 10,
      },

    },

  });



  const productAll = document.querySelectorAll('.section-products');

  if (productAll.length > 0) {
    productAll.forEach(product => {

      let btnNext = product.querySelector('.btn-next');
      let btnPrev = product.querySelector('.btn-prev');
      let swiper = product.querySelector('.swiper-product');

      new Swiper(swiper, {

        speed: 600,


        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 0,
          },

          601: {
            slidesPerView: 3,
            spaceBetween: -80,
          },

          830: {
            slidesPerView: 3,
            spaceBetween: -120,
          },
          1025: {
            slidesPerView: 4,
            spaceBetween: 20,
          },

        },
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
      });



    })
  }


  var swiper = new Swiper(".mySwiper", {
    loop: true,

    freeMode: true,
    watchSlidesProgress: true,

    breakpoints: {
      0: {
        slidesPerView: 5,
        spaceBetween: 0,
      },


      1025: {
        spaceBetween: 10,
        slidesPerView: 6,
      },

    },
  });
  var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    thumbs: {
      swiper: swiper,
    },
  });


  /*-----------------------*/




  let formContract = document.querySelectorAll('form')
  if (formContract.length > 0) {
    formContract.forEach(f => {
      f.addEventListener("submit", (e) => {
        e.preventDefault();
      })
    })
  }


  const modalSearch = document.getElementById('modalSearch');

  if (modalSearch) {

    const modalSearchInput = modalSearch.querySelector('#modalSearchInput');
    const closeText = modalSearch.querySelector('.form-search__close-text');
    const submit = modalSearch.querySelector('.btn-black');
    const searchResult = modalSearch.querySelector('.search-res');

    modalSearchInput.addEventListener('input', (ev) => {

      if (ev.target.value.length > 3) {
        closeText.classList.add('active');
        submit.classList.add('active');
        searchResult.classList.add('active');
      } else {
        closeText.classList.remove('active');
        submit.classList.remove('active');
        searchResult.classList.remove('active');
      }

    })

  }

  const modalSelectionCity = document.getElementById('modalSelectionCity');
  const choiceBtn = document.querySelector('.header__choice-btn');

  if (modalSelectionCity) {
    const input = modalSelectionCity.querySelector('#cityFormInput');
    const closeText = modalSelectionCity.querySelector('.city-form__close-text');
    const label = modalSelectionCity.querySelector('.city-form__label');
    const result = modalSelectionCity.querySelector('.selection-city-res');
    const cityBtn = result.querySelectorAll('a');


    input.addEventListener('input', (ev) => {

      if (ev.target.value.length > 3) {
        closeText.classList.add('active');
        result.classList.add('active');
        label.classList.add('active');
      } else {
        closeText.classList.remove('active');
        result.classList.remove('active');
        label.classList.remove('active');
      }
    })

    cityBtn.forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.preventDefault();
        result.classList.remove('active');
        input.value = b.textContent;
        choiceBtn.textContent = b.textContent.split(' ')[0];
        modalSelectionCity.classList.remove('visibility-modal');
        localStorage.setItem('city', b.textContent.split(' ')[0]);

      })
    })



  }

  if (localStorage.getItem('city')) {
    choiceBtn.textContent = localStorage.getItem('city');
  }


  const commentAll = document.querySelectorAll('.comment__el');

  if (commentAll.length > 0) {

    const maxLength = 106;

    commentAll.forEach(c => {
      const text = c.querySelector('.comment__el-text');
      let str = text.dataset.originalComment;
      const commentMore = c.querySelector('.comment__more');

      if (str.length >= maxLength) {
        text.textContent = str.slice(0, maxLength) + '...';
        commentMore.classList.add('active');
      } else {
        text.textContent = str;
      }
    })


  }


  const rangeSlider = document.querySelector('.range-slider');

  if (rangeSlider) {
    const rangeFromRes = rangeSlider.querySelector('.range-slider__from-r');
    const rangeToRes = rangeSlider.querySelector('.range-slider__to-r');


    $(".js-range-slider").ionRangeSlider({
      grid: false,
      hide_from_to: true,
      type: "double",
      hide_min_max: true,

      onStart: function (data) {
        rangeFromRes.textContent = new Intl.NumberFormat('ru-RU').format(data.from);
        rangeToRes.textContent = new Intl.NumberFormat('ru-RU').format(data.to);

      },
      onChange: function (data) {

        rangeFromRes.textContent = new Intl.NumberFormat('ru-RU').format(data.from);
        rangeToRes.textContent = new Intl.NumberFormat('ru-RU').format(data.to);

      },
    });



  }



  const btnUp = document.querySelector('.btn-up');
  if (btnUp) {
    btnUp.onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }


  const map = document.getElementById('YMapsID');

  if (map) {
    ymaps.ready(function () {
      const myMap = new ymaps.Map(
        'YMapsID',
        { center: [57.000353, 40.973930], zoom: 9, }
      );

      const card = document.querySelectorAll(".shop__card");

      let mapY = map.getBoundingClientRect();

      card.forEach((c, id) => {

        let modal = c.querySelector('.shop__info');
        let btn = c.querySelector('.shop__card-location');
        let coord = JSON.parse(btn.dataset.coordinate);


        btn.onclick = function () {
          myMap.setCenter(coord, 15, {
            duration: 400
          });
          showTab('map');


          window.scrollTo({
            top: mapY.top,
            left: 0,
            behavior: 'smooth'
          });




        };


        let myPlacemark = new ymaps.Placemark(coord,
          {
            balloonContentBody: modal.outerHTML
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'assets/images/icon/marker.svg',
            iconImageSize: [30, 30],
          });

        myMap.geoObjects.add(myPlacemark);
      })

      if (windowWidth > 600) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          myMap.behaviors.disable('drag');
          myMap.controls.remove('zoomControl');
        }
        myMap.controls.remove('zoomControl');
      }



      myMap.controls.remove('rulerControl');
      myMap.controls.remove('geolocationControl');

      myMap.controls.remove('trafficControl');
      myMap.controls.remove('typeSelector');

    });
  }


  const menu_header = document.querySelector('.header-top__nav ul');

  const menu_modal = document.querySelector('.modal-menu-content ul');

  if (menu_header && menu_modal) {

    if (windowWidth <= 600) {
      menu_modal.innerHTML = menu_header.innerHTML
    }


  }





});

/*--------------------------function---------------------------------------*/


function showModal(modalSelect) {
  const modal = document.getElementById(modalSelect);
  if (modal) {
    document.querySelector('.visibility-modal') ? document.querySelector('.visibility-modal').classList.remove('visibility-modal') : '';
    modal.classList.add('visibility-modal');
    disableScroll();
  }
}

function clearText(inputSelect) {
  const input = document.getElementById(inputSelect);
  if (input) {
    input.value = '';
  }

}

function closeModal() {
  document.querySelector('.visibility-modal') ? document.querySelector('.visibility-modal').classList.remove('visibility-modal') : '';
  enableScroll();
}

function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  document.documentElement.scrollLeft;
  document.documentElement.style.setProperty('scroll-behavior', 'hidden');
  document.documentElement.classList.add('scroll-lock');

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  document.documentElement.style.setProperty('scroll-behavior', null);
  document.documentElement.classList.remove('scroll-lock');
  window.onscroll = function () { };
}

function addToBasket(id) {
  // let quantityProduct = document.getElementById('quantity_' + id);
  let productClassToggle = document.getElementById('product_' + id);

  // let quantityProductValue = 1;
  // if (quantityProduct) {
  //   quantityProductValue = quantityProduct.value;
  // }

  // const request = new XMLHttpRequest();
  // const url = "/local/ajax/add_to_basket.php";
  // const params = "id=" + id + "&quantity=" + quantityProductValue;

  // request.open("POST", url, true);

  // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // request.addEventListener("readystatechange", () => {
  //   if (request.readyState === 4 && request.status === 200) {
  //     BX.onCustomEvent('OnBasketChange');
  //     productClassToggle.classList.add('active');
  //   }
  // });
  productClassToggle.classList.toggle('active');
  // request.send(params);
}

function addToFavorites(id) {

  let productClassToggle = document.getElementById('product_' + id);


  productClassToggle.classList.toggle('favorite');

}

function showComment(modalSelect, commentSelect) {
  const modalWrap = document.getElementById(modalSelect);

  const comment = document.getElementById(commentSelect);
  if (modalWrap && comment) {
    const commentModal = modalWrap.querySelector('.comment');
    modalWrap.classList.add('visibility-modal');
    commentModal.innerHTML = comment.innerHTML;
    const newText = modalWrap.querySelector('.comment__el-text');
    newText.textContent = newText.dataset.originalComment
    disableScroll();
  }

}

function showTab(data) {
  document.querySelector("[data-prod-tab].active") ? document.querySelector("[data-prod-tab].active").classList.remove('active') : " ";
  document.querySelector(`[data-prod-tab='${data}']`) ? document.querySelector(`[data-prod-tab='${data}']`).classList.add('active') : " ";

  document.querySelector("[data-tab].active") ? document.querySelector("[data-tab].active").classList.remove('active') : " ";
  document.querySelector(`[data-tab='${data}']`) ? document.querySelector(`[data-tab='${data}']`).classList.add('active') : " ";;
}

function productMinus(selectorInput) {

  const i = document.getElementById(`productCounter_${selectorInput}`);
  if (i) {
    i.value > 1 ? i.value-- : i.value;
  }

}

function productPlus(selectorInput) {
  const i = document.getElementById(`productCounter_${selectorInput}`);
  if (i) {
    i.value++;
  }
}

function share(select) {
  let copyText = document.getElementById(select);
  copyText.select();
  document.execCommand("copy");

  let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Готово";
}

function outFunc() {
  let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Скопировать";
}

function chooseAll() {
  const check = document.querySelectorAll('input[type=checkbox]');



  if (check.length > 0) {
    check.forEach(c => {
      c.checked = true;
    })
  }
}

function deleteAll() {
  const check = document.querySelectorAll('input[type=checkbox]');
  if (check.length > 0) {
    check.forEach(c => {
      c.checked = false;
    })
  }

}





