/* ------------------------------------------------------------------ */
const scrollContent = document.getElementById('scrollContent');
const stopContent = document.querySelectorAll('.rectangle');
let scrollAmount = 1; // Amount to scroll by
let direction = 1; // 1 for forward, -1 for backward
let scrollInterval;

function startAutoScroll() {
    scrollInterval = setInterval(() => {
        scrollContent.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });

        // Check if we need to reverse direction
        if (scrollContent.scrollLeft + scrollContent.clientWidth >= scrollContent.scrollWidth) {
            direction = -1; // Reverse direction
        } else if (scrollContent.scrollLeft <= 0) {
            direction = 1; // Change direction to forward
        }
    }, 10); // Adjust the speed by changing the interval time
}

function stopAutoScroll(){
    clearInterval(scrollInterval);
}

startAutoScroll();

stopContent.forEach((stopContent) => {
    stopContent.addEventListener('mouseenter', stopAutoScroll);
    stopContent.addEventListener('mouseleave', startAutoScroll);
});

/* --------------------------------------------------------------------- */

function clickFunction(id){
    var modal = document.getElementById(id);
    var body = document.getElementById("body");
    var main = document.getElementById("main");
    // Get the image that opens the modal
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the image, open the modal
    body.style.overflowY="hidden"
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
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
    }
}

/*var modal = document.getElementById("myModal");
    var body = document.getElementById("body");
    var main = document.getElementById("main");
    // Get the image that opens the modal
    var img = document.getElementById("trigger-image");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the image, open the modal
    img.onclick = function() {
        body.style.overflowY="hidden"
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
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
    }
*/
//-----------------------------------------------------------------------------

function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = Math.min((currentTime - startTime) / duration, 1);
        obj.innerText = Math.floor(progress * range + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function() {
    animateCounter("counter", 0, 10000, 2000);
});
//-----------------------------------------------------------------------

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const videoContainer = document.getElementById('videoElement');

window.addEventListener('scroll', function() {
    if (isInViewport(videoContainer)) {
        videoContainer.classList.add('enlarge');
    } else {
        videoContainer.classList.remove('enlarge');
    }
});

//-----------------------------------------------------------------------

const image = document.getElementById('videoElement');
const originalWidth = 500;
const minWidth = 20;

window.addEventListener('scroll',()=>{
    let scrollY = window.scrollY;
    let newWidth = originalWidth = scrollY;

    if (newWidth >= minWidth){
        image.style.width = newWdith + 'px';
    }
});