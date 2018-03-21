(()=>{
    //variables
    const header=document.querySelector('header');
    let psdHeight = document.querySelector('.service:first-of-type img');
    let second = document.querySelector('.second');
    const section = document.querySelectorAll(".section");
    const left=document.querySelector('.fa-angle-left');
    const right=document.querySelector('.fa-angle-right');
    let picture=document.querySelector('.work figure img');
    let figcaption=document.querySelector('#figc');
    let current=0;
    let sections = {};
    let i = 0;
    const slideBtn=document.querySelectorAll('.slidenav li button');
    let imgs=[
        {
            src: "img/1random.jpg",figc
        },
        {
            src: "img/form.png",figc
        },
        {
            src: "img/random.png",figc
        }
    ]
    //check the language to set the figcaption
    switch (document.querySelector('html').getAttribute('lang')) {
        case 'en':
            imgs[0].figc = "-A random psd template to html/css";
            imgs[1].figc = "-Traversy Media form challenge";
            imgs[2].figc = "-Random quote machine";
            break;
        case 'es':
            imgs[0].figc = "-Un diseño de photoshop random a HTML/CSS";
            imgs[1].figc ="-Desafío de formulario de Traversy Media";
            imgs[2].figc ="-Máquina de citas al azar";
            break;  
    }
    //functions
    function changeMargin(){
        second.style.marginBottom=psdHeight.offsetHeight-second.offsetHeight+'px';
    } 
   
    //below taken from http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
    function getScrollXY() {
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    }

    //taken from http://james.padolsey.com/javascript/get-document-height-cross-browser/
    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }
    function scrollSpy() {

        Array.prototype.forEach.call(section, e => {
            sections[e.id] = e.offsetTop;
        });

        window.onscroll = () => {

            let scrollPosition = document.documentElement.scrollTop + header.offsetHeight || document.body.scrollTop + header.offsetHeight;

            for (i in sections) {
                if (sections[i] <= scrollPosition) {
                    document.querySelector('.active').classList.remove('active');
                    document.querySelector('a[href*=' + i + ']').classList.add('active'); 
                } else if (getDocHeight() == getScrollXY()[1] + window.innerHeight&& window.innerWidth >= 768) {

                    document.querySelector('.active').classList.remove('active');
                    document.querySelector('.contact').classList.add('active');

                }
            }
        }
    }

    //slideshow
    function createCurrentAnnouncement(){
        let live = document.createElement('div');
        live.setAttribute('aria-live', 'polite');
        live.setAttribute('aria-atomic', 'true');
        live.setAttribute('class', 'live hidden');
        document.querySelector('.work figure').appendChild(live);  
    }
    function announceCurrent(currentSlide) {
        switch (document.querySelector('html').getAttribute('lang')) {
            case 'en':
                document.querySelector('.live').textContent = 'Item ' + currentSlide + ' of ' + imgs.length;
                break;
            case 'es':
                document.querySelector('.live').textContent = 'Item ' + currentSlide + ' de ' + imgs.length;
        }
        
    }
    createCurrentAnnouncement();
    announceCurrent(1);
    function leftArrow(){
        picture.src = imgs[current-1].src;
        figcaption.innerHTML=imgs[current-1].figc;
        current--
        document.querySelector('.current').classList.remove('current');
        slideBtn[current].classList.add('current');
        announceCurrent((current+1));
    }
    function  rightArrow() {
        picture.src = imgs[current + 1].src;
        figcaption.innerHTML = imgs[current + 1].figc;
        current++
        document.querySelector('.current').classList.remove('current');
        slideBtn[current].classList.add('current');
        announceCurrent((current + 1));
    }
    window.addEventListener('keyup',e=>{
        if(e.keyCode===37){
            if (current === 0) {
                current = imgs.length;
            }
            leftArrow();
        }
        if(e.keyCode===39){
            if (current === imgs.length - 1) {
                current = -1;
            }
            rightArrow();
        }
    })
    left.addEventListener('click',e=>{
        if(current===0){
            current=imgs.length;
        }
        leftArrow();
    });
    right.addEventListener('click', e => {
        if (current === imgs.length - 1) {
            current = -1;
        }
        rightArrow();
    });
    slideBtn.forEach(btn=>{
        btn.addEventListener('click',e=>{
            if(e.target==slideBtn[0]){
                picture.src = imgs[0].src;
                figcaption.innerHTML = imgs[0].figc;
                document.querySelector('.current').classList.remove('current');
                slideBtn[0].classList.add('current');
                announceCurrent(1);
            }
            if (e.target==slideBtn[1]) {
                picture.src = imgs[1].src;
                figcaption.innerHTML = imgs[1].figc;
                document.querySelector('.current').classList.remove('current');
                slideBtn[1].classList.add('current');
                announceCurrent(2);
            }
            if (e.target==slideBtn[2]) {
                picture.src = imgs[2].src;
                figcaption.innerHTML = imgs[2].figc;
                document.querySelector('.current').classList.remove('current');
                slideBtn[2].classList.add('current');
                announceCurrent(3);
            }
        })
    });
   
    //function executions when page loads
   window.onload=e=>{
    scrollSpy();
       if (window.innerWidth >= 768) {
           changeMargin();
       }
   }
    
    //function executions when resizing
    window.addEventListener('resize',()=>{
    
        if(window.innerWidth>=768){
            changeMargin();
        } else {
            second.style.marginBottom = 'initial';
        }
       
        scrollSpy();
        
    })   
    //language submenu
    document.querySelector('.has-submenu a').onclick= (e)=>{
        e.preventDefault();
        let y = document.querySelector('.has-submenu ul');
        if(y.style.display=='block'){
            y.style.display='none';
        }else{
            y.style.display='block';
        }
    }
})();
