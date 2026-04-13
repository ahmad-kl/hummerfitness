
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('preloader-hidden')) {
        preloader.classList.add('preloader-hidden');
        // Transition കഴിഞ്ഞ് മെമ്മറിയിൽ നിന്ന് മാറ്റാൻ 
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

window.addEventListener('load', hidePreloader);

setTimeout(hidePreloader, 5000); 

if (document.readyState === 'complete') {
    hidePreloader();
}


document.addEventListener("DOMContentLoaded", () => {
    
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
           
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                menuToggle.style.transform = 'rotate(180deg)';
            } else {
                menuToggle.style.transform = 'rotate(0deg)';
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.style.transform = 'rotate(0deg)';
            });
        });
    }

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            slides[currentSlide].classList.add('active');
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                resetInterval();
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                resetInterval(); 
            });
        }

        function startAutoPlay() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startAutoPlay();
        }

        startAutoPlay();
    }

    const baSliders = document.querySelectorAll('.ba-slider');

    if (baSliders.length > 0) {
        baSliders.forEach(slider => {
            const input = slider.querySelector('.slider-input');
            
            input.addEventListener('input', (e) => {
                slider.style.setProperty('--position', `${e.target.value}%`);
            });
        });
    }

   
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img'); 
                if(img) {
                    lightbox.classList.add('active');
                    lightboxImg.src = img.src; 
                }
            });
        });

        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }

    const progressPath = document.querySelector('.progress-wrap path');
    const progressWrap = document.querySelector('.progress-wrap');

    if (progressPath && progressWrap) {
        const pathLength = progressPath.getTotalLength();
        
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

        const updateProgress = function () {
            const scroll = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = pathLength - (scroll * pathLength / docHeight);
            progressPath.style.strokeDashoffset = progress;
        }

        updateProgress();
        
        window.addEventListener('scroll', () => {
            updateProgress();
            if (window.scrollY > 150) {
                progressWrap.classList.add('active-progress');
            } else {
                progressWrap.classList.remove('active-progress');
            }
        });

        progressWrap.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});