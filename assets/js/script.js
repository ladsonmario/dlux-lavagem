//GLOBAL VARIABLES//
const q = (el) => document.querySelector(el);
const qs = (el) => document.querySelectorAll(el);
let onScroll = true;
let timer = 0;

//EVENTS//
window.onscroll = (e) => {        
    if(onScroll && e.type === 'scroll') {
        qs('section').forEach(e => {
            let top = scrollY;
            let offset = e.offsetTop;
            let height = e.offsetHeight;
            let id = e.getAttribute('id');
            
            if(top > offset && top <= (offset + height)) {          
                removeActiveMenu();            
                q(`a[href="#${id}"].nav-link`).classList.add('active--menu');                                   
            }        
        });
    }    
    scrollY !== 0 ? q('.button--top').style.display = 'flex' : q('.button--top').style.display = 'none';    
};

//START//
const start = () => {
    addClickInTheMenu();
    addFunctionButtonTop();
}


//ADD EVENTS AND THEIR FUNCTIONS//
const addClickInTheMenu = () => {
    qs('.nav-link').forEach(item => {
        item.addEventListener('click', scrollToIdOnClick);        
    });    
}
const addFunctionButtonTop = () => {
    q('.button--top').addEventListener('click', handleClickButtonTop);
}

//FUNCTIONS//
const scrollToIdOnClick = (event) => {    
    onScroll = false;
    if(timer) { clearInterval(timer); }
    timer = setTimeout(() => { onScroll = true }, 1000);
	event.preventDefault();
	const to = getScrollTopByHref(event.currentTarget) - 80;
	scrollToPosition(to);
    qs('a[href^="#"].nav-link').forEach(item => {
        item.classList.remove('active--menu');
    });
    event.target.classList.add('active--menu');       
}

const getScrollTopByHref = (element) => {
	const id = element.getAttribute('href');
	return q(id).offsetTop;
}

const scrollToPosition = (to) => {    
    window.scroll({ top: to, behavior: "smooth" });  
}

const handleClickButtonTop = () => {     
    scroll({ top: 0 });
}

const removeActiveMenu = () => {
    qs('a[href^="#"].nav-link').forEach(item => {
        item.classList.remove('active--menu');
    });
}

//INIT START//
start();