(function($) {
    "use strict";
 


    
// Page Loader
var imgLoad = imagesLoaded('.wrapper');

var progressBar = $(".c-preloader__progress"),
    count = $(".c-preloader__count"),
    images = $("img").length,
    loadedCount = 0,
    loadingProgress = 0,
    tlProgress = new TimelineMax();
 
imgLoad.on( 'progress', function( instance, image ) {
    loadProgress();
});
 
function loadProgress(imgLoad, image) {

    loadedCount++;
  
    loadingProgress = (loadedCount/images);
    console.log(loadingProgress);

    TweenMax.to(tlProgress, 1, {progress:loadingProgress});
}

var tlProgress = new TimelineMax({
    paused: true,
    onUpdate: countPercent,
    onComplete: loadComplete
});
 
tlProgress
    .to(progressBar, 1, {width:"100%"});
 

function countPercent() {
      var newPercent = (tlProgress.progress()*100).toFixed();
      count.text(newPercent + "%");
}

function loadComplete() {
  var tlEnd = new TimelineMax();
  tlEnd
      .to(count, 0.5, {autoAlpha:0})
      .to(".c-preloader", 0.5, {scaleX:0, transformOrigin: "center right"});
}
  

 // Dropdown
      	$('.collapse.in').each(function(){
		$(this).parent().find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
	});
  	
	$('.collapse').on('shown.bs.collapse', function(){
		$(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
	}).on('hidden.bs.collapse', function(){
		$(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
	});

// Side Menu
      document.addEventListener('DOMContentLoaded', function() {
        const menuRightElem = document.getElementById('hb-menu');

        const allEvents = [
          'sm.back',
          'sm.back-after',
          'sm.close',
          'sm.close-after',
          'sm.forward',
          'sm.forward-after',
          'sm.navigate',
          'sm.navigate-after',
          'sm.open',
          'sm.open-after',
        ];

        allEvents.forEach(eventName => {
          menuRightElem.addEventListener(eventName, event => logEvent('Menu right', event));
        });

        

        const menuRight = new SlideMenu(menuRightElem, {
          keyClose: 'Escape',
          submenuLinkAfter: '<span class="menu-control-arrows"><i class="flaticon-right-arrow"></i> </span>',
          backLinkBefore: '<span class="menu-control-arrows"><i class="flaticon-left-arrow"></i></span>',
        });

       if (window.innerWidth > 5000) {
          menuRight.open(false);
        }
      
      }); 
    
    
    

// Footer Menu Accordion
$(".footer .ac-trigger").click(function(){
  $(this).parent(".nav").toggleClass("open"); 
  $('html, body').animate({ scrollTop: $(this).offset().top - 170 }, 1500 );
});

    
// Green Sock Animations
var tl = gsap.timeline(); 


// Stagger Normal: ga-sn
tl.from(".ga-sn", {duration:.5,  opacity:0,  y:50, stagger:0.50});
tl.from(".ga-sr", {duration:.7,  opacity:0,  y :-100, stagger:0.25});
    


//  Scroller
console.clear();

gsap.set('.rollingText',{xPercent:0,yPercent:0})
gsap.set('#no01',{y:50})
gsap.set('#no02',{x:0})
gsap.set('#no03',{y:-20})

var boxWidth = 250,
    totalWidth = boxWidth * 10,  //  * n of boxes
    no01 = document.querySelectorAll("#no01 .box"),
    no02 = document.querySelectorAll("#no02 li"),
    no03 = document.querySelectorAll("#no03 .box"),
    dirFromLeft = "+=" + totalWidth,
    dirFromRight = "-=" + totalWidth;
    

var mod = gsap.utils.wrap(0, totalWidth);

function marquee(which, time, direction){
  gsap.set(which, {
    x:function(i) {
      return i * boxWidth;
    }
  });
  var action = gsap.timeline()
  .to(which,  {
  x: direction,
  modifiers: {
    x: x => mod(parseFloat(x)) + "px"
  },
    duration:time, ease:'none',
    repeat:-3,
  });
  return action
}

var master = gsap.timeline()
.add(marquee(no01, 80, dirFromLeft), 1)
.add(marquee(no02, 100, dirFromRight), 1.5)
.add(marquee(no03, 90, dirFromLeft), 1.6)



// Rolling Text

console.clear();

var rollingTween = new TimelineMax({ paused: false });
var $rollingTextgoLeft = $(".rollingText");
var $text = $(".text");

function startRolling() {

  $text.css({ width: "auto" });
  var width = $text.width();
  $text.width(width);

rollingTween.to(".rollingText",  {
    x: -width,
    duration:120, 
    ease: Linear.easeNone,
    repeat: 1 },
  0);
  
  return rollingTween;
}

function rollingText() {
  $('.rollingText').clone().appendTo(".wrapperRollingText");
  startRolling();
}

    
rollingText();

    

// Product CTA Bar
gsap.registerPlugin(ScrollTrigger);
    


// ScrollTrigger.create({
//    trigger: "main",
//    start: 'top 400',
//    end: "bottom 1200",
//    toggleClass: {className: 'cta-fixed', targets: 'main'},
//     snap: {
//      snapTo: "labels", // snap to the closest label in the timeline
//      duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
//      delay: 0.1, // wait 0.1 seconds from the last scroll event before doing the snapping
//      ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
//    },
//});
//    
    
// parallax effect on mouse move
    
var timeout;
$('.parallax-effect').mousemove(function(e){
  if(timeout) clearTimeout(timeout);
  setTimeout(callParallax.bind(null, e), 200);
  
});

function callParallax(e){
  parallaxIt(e, '.px-one', -10);
  parallaxIt(e, '.px-two', -30);
}

function parallaxIt(e, target, movement){
  var $this = $('.parallax-effect');
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;
  
  TweenMax.to(target, 1, {
    x: (relX - $this.width()/2) / $this.width() * movement,
    y: (relY - $this.height()/2) / $this.height() * movement,
    ease: Power2.easeOut
  })
}
        
    
// Quality Process Steps
    
var iconElementA = document.querySelector('.step-1');
var iconElementB = document.querySelector('.step-2');  
var iconElementC = document.querySelector('.step-3');
var iconElementD = document.querySelector('.step-4');
var iconElementE = document.querySelector('.step-5');
    
ScrollTrigger.create({
  trigger: ".process-step-trigger-1",
  markers: false,
  start: "top top",
  end: "top bottom",
   once: "true",
   toggleClass: {targets: ".step-1", className: "active"},
   toggleActions: "play resume reset",
});
    
    

    
ScrollTrigger.create({
  trigger: ".process-step-trigger-2",
  markers: false,
  start: "top 60px",
  end: "top bottom",
   once: "true",
   toggleClass: {targets: ".step-2", className: "active"},
   toggleActions: "play resume reset",
});
    

    
ScrollTrigger.create({
  trigger: ".process-step-trigger-3",
  markers: false,
  start: "top 60px",
  end: "top bottom",
   once: "true",
   toggleClass: {targets: ".step-3", className: "active"},
   toggleActions: "play resume reset",
});
    
ScrollTrigger.create({
  trigger: ".process-step-trigger-4",
  markers: false,
  start: "top 60px",
  end: "top bottom",
   once: "true",
   toggleClass: {targets: ".step-4", className: "active"},
   toggleActions: "play resume reset",
});
    
ScrollTrigger.create({
  trigger: ".process-step-trigger-5",
  markers: false,
  start: "top 60px",
  end: "top bottom",
   once: "true",
   toggleClass: {targets: ".step-5", className: "active"},
   toggleActions: "play resume reset",
    
    onLeaveBack: () => myfunction(),
});

function myfunction() {
  iconElementE.classList.toggle('hide');

};

  
//var iconElementB = document.querySelector('.step-2');
//ScrollTrigger.create({
//  trigger: ".process-step-trigger-2",
//  markers: false,
//  start: "top top",
//  end: "top bottom",
////   once: "true",
////   toggleClass: {targets: ".step-1, .step-2, .step-3, .step-4, .step-5", className: "active"},
////   toggleActions: "play resume resume reset",
//
//  onEnter: () => myfunction(),
//  onLeaveBack: () => myfunction(),
//
//});
    

//function myfunction() {
//  iconElementB.classList.toggle('active');
//
//};

    
// Product Key Information Animation
//ScrollTrigger.create({
//  scroller: ".product-cta-trigger",
//    start: 'bottom 400',
//    end: "bottom 600",
//    markers:true,
//    
//});
//    
//    
//    
//    tl.addLabel("start")
//  .from(".help-block", { y:-100, opacity:0, ease:"back.out(5)", duration:.6, delay:1 })
//    .addLabel("move")
//  .to(".help-block",  { y:0, opacity:1, ease:"back.out(5)", duration:.5 })
//    
//  tl.addLabel("start")
//  .from(".warranty-support", { y:-100, opacity:0, ease:"back.out(5)", duration:.6, delay:1 })
//    .addLabel("move")
//  .to(".warranty-support",  { y:0, opacity:1, ease:"back.out(5)", duration:.5 })
//    
//    tl.addLabel("start")
//  .from(".sale-support", { y:-100, opacity:0, ease:"back.out(5)", duration:.6, delay:.2 })
//    .addLabel("move")
//  .to(".sale-support",  { y:0, opacity:1, ease:"back.out(5)", duration:.5 })
//    
//    tl.addLabel("start")
//  .from(".process-steps", { y:-100, opacity:0, ease:"back.out(5)", duration:.6, delay:.5 })
//    .addLabel("move")
//  .to(".process-steps",  { y:0, opacity:1, ease:"back.out(5)", duration:.5 })
    
    
    
    

    
//tl.from(".warranty-support", {duration:.5,  opacity:0,  y:50, stagger:0.50});
//tl.from(".sale-support", {duration:.5,  opacity:0,  y:50, stagger:0.50});
//tl.from(".process-steps", {duration:.5,  opacity:0,  y:50, stagger:0.50});
    
//
//        tl.from(".ga-slideup-information", {duration:.3, delay:1,  opacity:0,  y:200, stagger:0.50});
//        tl.from(".ga-slideup-warranty", {duration:.3, delay:1,  opacity:0,  y:80, stagger:0.50});
//        tl.from(".ga-slideup-support", {duration:.3, delay:1.5,  opacity:0,  y:100, stagger:0.50});
//        tl.from(".ga-slideup-process", {duration:.3, delay:1,  opacity:0,  y:80, stagger:0.50});


    

//// add animations and labels to the timeline
//tl.addLabel("start")
//  .from(".pcs-cta", { y:0, opacity:0, ease:"back.out(5)", duration:.6 })
//    .addLabel("move")
//  .to(".pcs-cta",  { y:-100, opacity:1, ease:"back.out(5)", duration:1 })

    
// Scrollspy
    
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

let links = gsap.utils.toArray("nav.scrollspy-nav a");
links.forEach(a => {
  let element = document.querySelector(a.getAttribute("href")),
  linkST = ScrollTrigger.create({
    trigger: element,
    start: "top top" });

  ScrollTrigger.create({
    trigger: element,
    start: "top center",
    end: "bottom center",
    onToggle: self => self.isActive && setActive(a) });

  a.addEventListener("click", e => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: "auto" });
  });
});

function setActive(link) {
  links.forEach(el => el.classList.remove("active"));
  link.classList.add("active");
}  
    
// Typewriter
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 1px solid #666 }";
  document.body.appendChild(css);
};
   

//Scroll Tabs
$.fn.tabbing = function (options) {
    var opts = {delayTime : 300};
    options = options || {};
    opts = $.extend(opts,options);    
    return this.each(function () {
        $(this).on('click', function (event) {
            event.preventDefault();
            var sum = 0;
            $(this).prevAll().each(function(){  sum += $(this).width();});
          var get = document.getElementById('tabs').scrollWidth
            var dist = sum - ( $(this).parent().width() - $(this).width()) / 2;
          if(dist < 0){
            dist = 0;
          }
          /* else if(dist+sum > get){
            dist = get-sum+dist+dist;
          } */
            $(this).parent().animate({
                scrollLeft: dist
            },opts['delayTime']);
        });
    });
};
$('#tabs li').tabbing();


$('#tabs li').click(function(){
  var  hashit = $(this).find('a').attr('href')
  var autoHeight = $(hashit).height() + 30;
$('.tab-content').animate({height: autoHeight}, 100);
});
    


    
// Swiper Carousel

var swiper = new Swiper(".banner-carousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
    autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
    
  });  
    
    var swiper = new Swiper(".page-banner .carousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
    autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
    
  });  
    
// Swiper Scroller
var swiper = new Swiper(".swiper-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });
    

    
    

var swiper = new Swiper(".table-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });
    
    
    
// Swiper Carousel
var swiper = new Swiper(".swiper-single", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    effect: "fade",
    
    loop: false,
    loopFillGroupWithBlank: true,
    autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
    
    
 
    
    
// Testimonials Carousel 
var swiper = new Swiper(".testimonials-carousel", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    breakpoints: {
          0: {
            slidesPerView: 1,
              slidesPerView: 1,
            spaceBetween: 10,
              
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
            
          },
            
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        
        },
    
});
    
// Associated Carousel 
var swiper = new Swiper(".associated--carousel", {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    breakpoints: {
        
        0: {
            slidesPerView: 2,
              slidesPerView: 2,
            spaceBetween: 10,
              
          },
        
          768: {
            slidesPerView: 3,
              slidesPerView: 3,
            spaceBetween: 10,
              
          },
          
            
        1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        
        },
    
});
    
    
// Associated Carousel 
var swiper = new Swiper(".associated--carousel-2", {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    breakpoints: {
        
        0: {
            slidesPerView: 2,
            slidesPerView: 2,
            spaceBetween: 30,
              
          },
        
          768: {
            slidesPerView: 3,
              slidesPerView: 3,
            spaceBetween: 30,
              
          },
          
            
        1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        
        },
    
});
    
    
var swiper = new Swiper(".list-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });
    
var swiper = new Swiper(".cpc-customer-testimonials-swiper", {
    
    breakpoints: {
        
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
            freeMode: true,
            grid: {
              rows: 1,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
              
          },
        
        1200: {
            slidesPerView: 3,
            spaceBetween: 0,
            grid: {
              rows: 2,
            },
          },
        
        },
    
  });
    
    
    
// Custom PC Selection Slider
var swiper = new Swiper(".cps-slides", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
    
// Process Carousel
var swiper = new Swiper(".process-slides", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
 
    
// Featured Products Carousel
 var swiper = new Swiper(".featured-products-carousel", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
     autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });   
    
     
// Popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})    
    
// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})  

//  Wow Animation
new WOW().init();
    
     
    

    
    
    

    
    
// Form

$(".password-showhide .show-password").click(function() {
    $("#password").attr("type", "text");
    $(".password-showhide .show-password").hide();
    $(".password-showhide .hide-password").show();
});
$(".password-showhide .hide-password").click(function() {
    $("#password").attr("type", "password");
    $(".password-showhide .hide-password").hide();
    $(".password-showhide .show-password").show();
});
    
    
$(".cps-start-selection input.form-check-input").click(function(){

var value = $( this ).val();

//Remove the class option-checked
$( ".option-checked" ).removeClass( "option-checked" );

switch( value ) {
    case 'option1':
            $( ".stop-ani" ).addClass( "option-checked" );
        break;
    case 'option2':
            $( ".stop-ani" ).addClass( "option-checked" );
        break;
}

});    
    
    
    
  
    
// Range Slider
const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

numberInput.addEventListener('input', handleInputChange)
    
 

    
    
// Greensock
    
    
//gsap.registerPlugin(ScrollTrigger);
//
//let currentIndex = 0;
//
//const accordions = gsap.utils.toArray(".step");
//
//const regions = gsap.utils.toArray(".accordion");
//
//const containerHeight = document.querySelector(".process").clientHeight;
//
//ScrollTrigger.create({
//  trigger: ".process",
//  start: "top top",
//  end: `+=${containerHeight}`,
//  pin: true
//});
//
//accordions.forEach((accordion, index) =>
//  ScrollTrigger.create({
//    trigger: accordion,
//    start: "top top",
//    end: `+=${accordion.clientHeight}`,
//    onEnter: () => handleUpdate(index),
//    onEnterBack: () => handleUpdate(index),
//    markers: true
//  })
//);
//
//function handleUpdate(index) {
//  currentIndex = index;
//
//  //This is supposed to hide the previous
//  gsap.to(regions, {
//    duration: 0,
//    display: "none",
//    ease: "Power4.inOut"
//  });
//
//  gsap.to(regions[currentIndex], {
//    display: "block",
//    duration: 0.5,
//    ease: "Power4.inOut"
//  });
//}

    
gsap.registerPlugin(ScrollTrigger);

let currentIndex = 0;

const accordions = gsap.utils.toArray(".accordion");

const regions = gsap.utils.toArray(".region");

const containerHeight = document.querySelector(".process-steps").clientHeight;

ScrollTrigger.create({
  trigger: ".process"
  
});

accordions.forEach((accordion, index) =>
  ScrollTrigger.create({
    trigger: accordion,
    start: "top top",
    end: `+=${accordion.clientHeight}`,
    onEnter: () => handleUpdate(index),
    onEnterBack: () => handleUpdate(index),
    markers: false
  })
);

function handleUpdate(index) {
  currentIndex = index;

  //This is supposed to hide the previous
  gsap.to(regions, {
    duration: 0,
    display: "none",
    ease:'none'
  });

  gsap.to(regions[currentIndex], {
    display: "block",
    duration: 0.5,
  });
}

  
// Fancybox 
$(".fancybox").fancybox();
    
   
    
    

    


})(jQuery);


