document.addEventListener("DOMContentLoaded", function (event) {

  const windowWidth = window.innerWidth;

  console.log("разрешение", windowWidth);

  /*----------------------------DropDownList-----------------------------*/
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
      return this.panelAll = typeof this.setting.panel === "string" ? this.accordion.querySelectorAll(this.setting.panel) : this.setting.panel; // получить все панели
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



  /*----------------------------Accordion-----------------------------*/




  // new Accordion('.accordion', {
  //   panel: '.accordion__panel',
  //   btn: '.accordion__btn',
  //   onlyOnePanel: true,        // открывать только одну
  //   showPanel: 1,               // выбираем открытую панель
  // })
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



  /*-------------------------------Swipper------------------------------*/
  // new Swiper('.swiper', {
  //   loop: true,
  //   speed:900,
  //   navigation: {
  //     nextEl: '.btn-next',
  //     prevEl: '.btn-prev',
  //   },
  //   breakpoints: {
  //     640: {
  //       slidesPerView: 1,
  //     },
  //     1024: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });
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

  if (modalSelectionCity) {
    const input = modalSelectionCity.querySelector('#cityFormInput');
    const closeText = modalSelectionCity.querySelector('.city-form__close-text');
    const label = modalSelectionCity.querySelector('.city-form__label');
    const result = modalSelectionCity.querySelector('.selection-city-res');

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
  }




});

/*--------------------------function---------------------------------------*/


function showModal(modalSelect) {
  const modal = document.getElementById(modalSelect);
  if (modal) {
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



