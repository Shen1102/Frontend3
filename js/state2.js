/*let currentIndex = 0;

function moveLeft() {
    const carouselInner = document.querySelector('.section-container1');
    const items = document.querySelectorAll('.rectangle');
    const itemWidth = items[0].offsetWidth;

    currentIndex = Math.max(currentIndex - 1, 0); // Prevent scrolling beyond the first item
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function moveRight() {
    const carouselInner = document.querySelector('.section-container1');
    const items = document.querySelectorAll('.rectangle');
    const itemWidth = items[0].offsetWidth;

    currentIndex = Math.min(currentIndex + 1, items.length - 1); // Prevent scrolling beyond the last item
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}*/

function detailInformation(id,num){
    var modal = document.getElementById(id);
    var body = document.getElementById("body");
    var main = document.getElementById("main");
    // Get the image that opens the modal
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[num];
    // When the user clicks on the image, open the modal
    body.style.overflowY="hidden"
    modal.classList.add("show");
    

    span.onclick = function () {
        modal.classList.remove("show"); // Remove 'show' class to hide the modal
        setTimeout(function() { // Ensure the modal is fully hidden before re-enabling scroll
            body.style.overflowY = "auto";
        }, 300); // Timeout should match the transition duration
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove("show"); // Remove 'show' class to hide the modal
            setTimeout(function() { // Ensure the modal is fully hidden before re-enabling scroll
                body.style.overflowY = "auto";
            }, 300); // Timeout should match the transition duration
        }
    };
    /*// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        body.style.overflowY="scroll";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
    
            modal.style.display = "none";
            body.style.overflowY="auto";
        }
    }*/
}

//----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");

    const options = {
        threshold: 0.5 // Trigger when 50% of the section is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

//----------------------------------------------------------------------------


/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

//--------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.navbar');
    const content = document.querySelector('.header-container');
    const body = document.getElementById('body');
    navBar.addEventListener('mouseover', () => {
        body.style.backgroundColor = "#162527";
        content.classList.add('blur');
    });

    navBar.addEventListener('mouseout', () => {
        body.style.backgroundColor = "";
        content.classList.remove('blur');
    });
});  

document.getElementById('show-button').addEventListener('click', () => {
    const element = document.getElementById('animated-element');
    
    // Remove the 'hidden' class to show the element
    element.classList.remove('hidden');

    // Add 'visible' class to trigger the fade-in effect
    setTimeout(() => {
        element.classList.add('visible');
    }, 10); // Short delay to ensure the class removal is processed
});

//--------------------------------------------------------------------------

function copyURL() {
    // Get the current URL

    const url = window.location.href;
    // Use the Clipboard API to write the text
    navigator.clipboard.writeText(url)
        .then(() => {
            // Alert the user or update the button text to confirm the copy
            alert("URL copied to clipboard!");
        })
        .catch(err => {
            // If an error occurs, log it to the console or alert the user
            console.error('Failed to copy: ', err);
            alert("Failed to copy the URL.");
        });
}


document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    
        
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            640: {
                slidesPerView: 1,
            },
            0: {  // Adjusted breakpoint for screens smaller than 640px
                slidesPerView: 1,  // Ensure only 1 slide per view on very small screens
            },
        }
    });
});