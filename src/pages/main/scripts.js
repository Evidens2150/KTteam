    // ToDoList

    const form = document.forms["todo"];       
    const startBlock = form.querySelector(".start-block_js");
    const addButton = form.querySelector(".add_js");    
    const reversButton = form.querySelector(".revers_js");
    const changeButton = form.querySelector(".change_js");    
    const removeButton = form.querySelector(".remove_js");      
    const textarea = form.querySelector(".textarea_js");       
    const sliderArea = form.querySelector(".sliderarea_js");       
    const editBlock = form.querySelector(".edit-block_js");
    let data = []; 
    let localData = localStorage.getItem("ToDoListData");
    let inProcess = false; 

    if (!localData) {
      data = ["Collect underpants", "???", "PROFIT"];
      localStorage.setItem("ToDoListData", JSON.stringify(data));
      data = JSON.parse(localStorage.getItem("ToDoListData"));
      refreshInfo();
    } else {      
      data = JSON.parse(localStorage.getItem("ToDoListData"));
      refreshInfo();
    }

function refreshInfo() {
  data = JSON.parse(localStorage.getItem("ToDoListData"));
  form.reset();
  textarea.focus();
  inProcess = false;
  editBlock.classList.add("hidden"); 
  startBlock.classList.remove("hidden"); 
  addButton.setAttribute("disabled", "");
  
  textarea.addEventListener("input", inputTask);
  reversButton.addEventListener("click", reversList);
  
  function reversList() {
    data = data.reverse();
    localStorage.setItem("ToDoListData", JSON.stringify(data));
    reversButton.removeEventListener("click", reversList);
    refreshInfo();
  }

  function inputTask(e) {
    e.preventDefault();    
    reversButton.removeEventListener("click", reversList);
    if(inProcess) {
      return
    } else {
      inProcess = true; 
      addButton.removeAttribute("disabled");
      addButton.addEventListener("click", addTask);      
          
    window.addEventListener("keydown", function (e) {
      if (e.code === "Enter" && !addButton.hasAttribute("disabled") && textarea.value > " ") {
        e.preventDefault();     
        data = JSON.parse(localStorage.getItem("ToDoListData"));
        data.push(textarea.value);
        localStorage.setItem("ToDoListData", JSON.stringify(data));
        addButton.removeEventListener("click", addTask);  
        refreshInfo();
      }
    });

      function addTask(e){
        e.preventDefault();      
        data = JSON.parse(localStorage.getItem("ToDoListData"));
        data.push(textarea.value);
        localStorage.setItem("ToDoListData", JSON.stringify(data));
        addButton.removeEventListener("click", addTask);  
        refreshInfo();
      };
    }    
  }; 
  
  function taskCreator(id, taskText) {
    return `        
    <li class="tasks__point task">
        <p class="task__text task-text_js">${taskText}</p>
        <button class="task__button edit-button_js" id="${id+1}" aria-label="Edit this task">Edit</button>
    </li>`;
  }

  function taskSlideCreator(index) {
    return `
    <div class="slider__slide">
      <ol class="tasks__list list_js" id="slide_${index}"> 
      </ol>
    </div>`;
  }

  let index = 0;
  sliderArea.innerHTML = "";
  while (data.length/10 - index > 0) {
    sliderArea.innerHTML += taskSlideCreator(index); 
    index++;
  }  
  slider({});

  let listsAll = [...form.querySelectorAll(".list_js")];

  let i = 0;
  listsAll.forEach((item) => {
      item.innerHTML = "";
      let listId =+ item.id.replace(/[^0-9]/g, '') + 1; 
      while (i<10*listId && i<data.length) {
    item.innerHTML += taskCreator(i, data[i]);
    i++
    }
    textarea.addEventListener("input", inputTask);
  });

  let editElements = [...form.querySelectorAll(".edit-button_js")];

  editElements.forEach(element => {  
    element.parentElement.querySelector(".task__text").insertAdjacentHTML("beforebegin", `${element.id}.`);
    element.addEventListener("click", elementListener);

    function elementListener(e) {
      e.preventDefault(); 
      inProcess = true;
      editElements.forEach(element => {
        element.removeEventListener("click", elementListener);
      });      
      element.removeEventListener("click", elementListener); 
      editBlock.classList.remove("hidden"); 
      startBlock.classList.add("hidden");
      textarea.value =  element.parentElement.querySelector(".task__text").innerText;
      changeButton.addEventListener("click", changeTask);        
      removeButton.addEventListener("click", removeTask);
    }
    
    function changeTask(e) {        
      e.preventDefault();      
      reversButton.removeEventListener("click", reversList);
      changeButton.removeEventListener("click", changeTask);      
      removeButton.removeEventListener("click", removeTask); 
      let taskId = element.id -1;
      data = JSON.parse(localStorage.getItem("ToDoListData"));
      data[taskId] = textarea.value; 
      localStorage.setItem("ToDoListData", JSON.stringify(data));
      refreshInfo();
    };

    function removeTask (e) {        
      e.preventDefault();       
      reversButton.removeEventListener("click", reversList);   
      removeButton.removeEventListener("click", removeTask);
      changeButton.removeEventListener("click", changeTask);    
      let taskId = element.id -1; 
      data = JSON.parse(localStorage.getItem("ToDoListData"));
      data.splice(taskId, 1);
      localStorage.setItem("ToDoListData", JSON.stringify(data));
      refreshInfo();
    }
  });  
};    

// Slider

  function slider({sliderEl = ".slider", defaultActiveSlide = +localStorage.getItem("activeSlide") || 0 }) {
    const slider = document.querySelector(sliderEl);
    if (!slider) {
      console.warn (`Element "Slider" with querySelector "${sliderEl}" is NOT FOUND on this page, please check your querySelector.`)
      return
    };
    const wrapper = slider.querySelector(".slider__wrapper");
    const innerWrapper = slider.querySelector(".slider__inner-wrapper");
    const pagination = slider.querySelector(".slider__pagination");
    const buttonPrev = slider.querySelector(".slider__button_previous");
    const buttonNext = slider.querySelector(".slider__button_next");
    const slides = [...slider.querySelectorAll(".slider__slide")];
    const anyTime = 500;
    
    if (defaultActiveSlide < 0) {defaultActiveSlide = 0};
    if (defaultActiveSlide >= slides.length) {defaultActiveSlide = slides.length - 1};
  
    let activeSlide = defaultActiveSlide;
    let slideWidth = 0;
    let dots = [];
    let timerId = null;
    
    pagination.innerHTML = "";
  
    initSlidesWidth();
    createPagination();
    setActiveSlide(activeSlide, false);
  
    window.addEventListener("resize", function () {
      initSlidesWidth();
      setActiveSlide(activeSlide, false);
    })
  
    function addAnimation(duration) {
      clearTimeout(timerId);
      innerWrapper.style.transition = `transform ${duration}ms`;
      timerId = setTimeout(function () {
        innerWrapper.style.transition = "";
      }, duration);
    }
  
    function createPagination() {
      for (let i = 0; i < slides.length; i++) {
        let dot = createDot(i);
        pagination.insertAdjacentElement("beforeend", dot);
        dots.push(dot);
      }
    }
  
    function createDot(index) {
      let dot = document.createElement("button");
      dot.innerText = `${index+1}`;
      dot.classList.add("slider__pagination__item");
      if (index === activeSlide) {
        dot.classList.add("slider__pagination__item_active");
      }
      dot.addEventListener("click", function () {
        setActiveSlide(index)
      })
      return dot;
    }
  
    function initSlidesWidth() {
      slideWidth = wrapper.clientWidth;
      for (let slide of slides) {
        slide.style.width = `${slideWidth}px`;
      }
    }
  
    function setActiveSlide(index, playAnimation = true) {
      if (index < 0 || index >= slides.length) {
        return
      }
  
      if (playAnimation) {
        addAnimation(anyTime);
      }
      dots[activeSlide].classList.remove("slider__pagination__item_active");
      dots[index].classList.add("slider__pagination__item_active");
  
      if (index === 0) {
        buttonPrev.setAttribute("disabled", "");
      } else {
        buttonPrev.removeAttribute("disabled");
      }
      if (index === slides.length - 1) {
        buttonNext.setAttribute("disabled", "");
      } else {
        buttonNext.removeAttribute("disabled");
      }
      innerWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
      activeSlide = index;
      localStorage.setItem("activeSlide", activeSlide);
    }
  
    buttonPrev.addEventListener("click", function () {
      setActiveSlide(activeSlide - 1);
    })
  
    buttonNext.addEventListener("click", function () {
      setActiveSlide(activeSlide + 1);
    })

    let x;
    let left = 0;
    let isTouch = false;
    let px = 150;
    let active = false;

    wrapper.addEventListener ("touchstart", function (event) {
      x = event.changedTouches[0].pageX;
      isTouch = true;
      active = true;
    });

    wrapper.addEventListener ("touchmove", function (event) {
      if(!isTouch){return}      
      let diffX;
      
      diffX = x - event.changedTouches[0].pageX;

      left = -diffX;
      
      if (left > px+diffX && active) {
          setActiveSlide(activeSlide - 1);
          active = false;
      }

      if (diffX > px+left && active) {
        setActiveSlide(activeSlide + 1);
        active = false;
    }
    });

    wrapper.addEventListener ("touchend", function (event) {
      left = 0;
      isTouch = false;
    });
  };