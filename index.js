//6:30 sec thika sob tuku dekhbi

const carousel= document.querySelector(".carousel");
const wrapper= document.querySelector(".wrapper");
const arrowBtns= document.querySelectorAll(".wrapper i");
const firstCardWidth= carousel.querySelector(".card").offsetWidth;
const carouselChildrens =[...carousel.children];
 
let isDragging= false , startX, startScrollleft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth /firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card=> {
     carousel.insertAdjacentHTML("afterbegin",card.outerHTML)
});

carouselChildrens.slice(0,cardPerView).forEach(card=> {
     carousel.insertAdjacentHTML("beforeend",card.outerHTML)
});


arrowBtns.forEach(btn => {
     btn.addEventListener("click", ()=>{
carousel.scrollLeft += btn.id === "left"? -firstCardWidth : firstCardWidth;
     })
});

const dragStart= ()=>{
     isDragging= true;
     carousel.classList.add("dragging");
     startX =e.pageX
     startScrollleft= carousel.scrollLeft;
}

const dragging= (e)=>{
     if(!isDragging) return;
carousel.scrollLeft=  startScrollleft- (e.pageX - startX);
}
const dragStop= ()=>{
     isDragging = false;
     carousel.classList.remove("dragging")
}

const autoPlay= ()=>{
     if(window.innerWidth < 800) return;
     timeoutId= setTimeout(()=> carousel.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

const InfinitScroll= ()=>{
     if(carousel.scrollLeft===0){
          carousel.classList.add("no-transition");
          carousel.scrollLeft= carousel.scrollWidth- ( 2* carousel.offsetWidth)
          carousel.classList.remove("no-transition");
          
     }
     else if(Math.ceil(carousel.scrollLeft)=== carousel.scrollWidth- carousel.offsetWidth){
          carousel.classList.add(" ");
          carousel.scrollLeft= carousel.offsetWidth;
          carousel.classList.remove("no-transition");
     
     }
     clearTimeout(timeoutId);
if( !wrapper.matched(":hover"))  autoPlay();
}

carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("mousedown",dragStart);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",InfinitScroll);
wrapper.addEventListener("mouseenter", ()=> clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);






