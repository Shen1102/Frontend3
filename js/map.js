document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById("svgMap");

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument;
        const svgElement = svgDoc.documentElement;

        // Set preserveAspectRatio to ensure the SVG scales while maintaining its aspect ratio
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

        // Variables for dragging and zooming
        let isDragging = false;
        let startX, startY;
        let translateX = 0, translateY = 0;
        let zoom = 1;

        // Handle dragging
        svgElement.addEventListener('mousedown', function (event) {
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;
            svgElement.style.cursor = 'grabbing';
        });

        svgElement.addEventListener('mousemove', function (event) {
            if (isDragging) {
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;
                translateX += dx / zoom;
                translateY += dy / zoom;
                svgElement.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${zoom})`);
                startX = event.clientX;
                startY = event.clientY;
            }
        });

        svgElement.addEventListener('mouseup', function () {
            isDragging = false;
            svgElement.style.cursor = 'default';
        });

        // Handle zooming
        document.getElementById("zoomIn").addEventListener("click", function() {
            zoom += 0.1;
            svgElement.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${zoom})`);
        });

        document.getElementById("zoomOut").addEventListener("click", function() {
            zoom = Math.max(0.5, zoom - 0.1); // Prevent zooming out too much
            svgElement.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${zoom})`);
        });

        // Handle Reset View
        document.getElementById("resetView").addEventListener("click", function() {
            zoom = 1;
            translateX = 0;
            translateY = 0;
            svgElement.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${zoom})`);
        });

        // Hover and click handling
        const elements = svgDoc.querySelectorAll("#features path, #label_points circle");

        elements.forEach(e => {
            e.setAttribute('class', `allPaths ${e.id}`);
            
            // Set the pattern ID for each circle element
            e.setAttribute('data-pattern', `url(#pattern${e.id})`);

            e.addEventListener("mouseover", function () {
                const patternId = e.getAttribute('data-pattern');
                e.style.fill = patternId; // Apply the pattern as fill

                const nameAttribute = e.getAttribute('name');
                document.getElementById("name").style.opacity = 1;
                document.getElementById("namep").innerText = nameAttribute;
            });

            e.addEventListener("mouseleave", function () {
                e.style.fill = ''; // Reset fill on mouse leave
                document.getElementById("name").style.opacity = 0;
            });

            // Handle click to show a pop-up with a link
            e.addEventListener("click", function () {
                const regionName = e.getAttribute('name');

                // Find the pop-up element
                const popupOverlay = document.getElementById('mapPopupOverlay');
                const popupTitle = popupOverlay.querySelector('.popup-title');
                const popupLink = popupOverlay.querySelector('.popup-link');

                // Format the region name by removing spaces and converting to lowercase
                let formattedRegionName = regionName.toLowerCase().replace(/\s+/g, '');

                // Set the region name and link
                popupTitle.innerText = regionName;
                popupLink.href = `${formattedRegionName}.html`;

                // Show the pop-up
                popupOverlay.classList.add('active');
            });
        });
    });

    // Close pop-up when the close button is clicked
    document.querySelector('#mapPopupOverlay .close-popup-btn').addEventListener('click', function() {
        const popupOverlay = document.getElementById('mapPopupOverlay');
        popupOverlay.classList.remove('active');
    });

    // Optional: Close pop-up when clicking outside the content area
    document.getElementById('mapPopupOverlay').addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.remove('active');
        }
    });
});
