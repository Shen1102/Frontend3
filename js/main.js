const counts = document.querySelectorAll('.count');
const duration = 2000; // Duration for counting in milliseconds

function formatNumber(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toLocaleString(); // Adds commas for thousands
}

counts.forEach((counter) => {
    const target = Number(counter.getAttribute('data-target'));
    const startTime = performance.now(); // Start time for animation

    function upDate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1
        const count = Math.floor(target * progress); // Calculate the current count based on progress
        
        counter.innerText = formatNumber(count);

        if (progress < 1) {
            requestAnimationFrame(upDate); // Continue animation
        } else {
            counter.innerText = formatNumber(target); // Ensure final value is set
        }
    }

    requestAnimationFrame(upDate); // Start animation
});

const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

function startCounterAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.getAttribute('data-target'));
            const startTime = performance.now();

            function upDate(time) {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const count = Math.floor(target * progress);
                
                counter.innerText = formatNumber(count);

                if (progress < 1) {
                    requestAnimationFrame(upDate);
                } else {
                    counter.innerText = formatNumber(target);
                }
            }

            requestAnimationFrame(upDate);
            observer.unobserve(counter); // Stop observing after animation starts
        }
    });
}

const observer = new IntersectionObserver(startCounterAnimation, observerOptions);

// Observe each counter element
counts.forEach(counter => observer.observe(counter));
