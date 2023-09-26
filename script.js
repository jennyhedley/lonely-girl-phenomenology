document.addEventListener("DOMContentLoaded", function () {
    const leftImageCycle = document.getElementById("leftImageCycle");
    const rightImageCycle = document.getElementById("rightImageCycle");

    function cycleImages(imageCycle) {
        const images = imageCycle.getElementsByTagName("img");
        let currentIndex = 0;

        function showImage(index) {
            for (let i = 0; i < images.length; i++) {
                images[i].style.display = i === index ? "block" : "none";
            }
        }

        imageCycle.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        // Show the first image initially
        showImage(currentIndex);
    }

    // Initialize image cycling for both divs
    cycleImages(leftImageCycle);
    cycleImages(rightImageCycle);
  
  
  
  
     // Create a fixed-position container for the dropping images
    const droppingImagesContainer = document.getElementById("dropping-images-container");
    droppingImagesContainer.style.position = "fixed";
    droppingImagesContainer.style.top = "0";
    droppingImagesContainer.style.left = "0";
    droppingImagesContainer.style.width = "100%";
    droppingImagesContainer.style.height = "100%";
    droppingImagesContainer.style.pointerEvents = "none"; // Allow clicks to pass through to the underlying content

    // Function to create a dropping image
    function createDroppingImage(x, y) {
        let dropImage = document.createElement("img");
        dropImage.src = randomImage(); // Function to get a random image path
        dropImage.className = "dropping-image";
        dropImage.style.position = "absolute";
        dropImage.style.left = x + "px";
        dropImage.style.top = y + "px";
        droppingImagesContainer.appendChild(dropImage);

        // Add a random angle to the initial movement
        let angle = Math.random() * 90 - 45; // Adjust the range as needed

        // Calculate horizontal and vertical speeds based on the angle
        let xSpeed = Math.cos(angle * (Math.PI / 180)) * 2; // Adjust the speed as needed
        let ySpeed = Math.sin(angle * (Math.PI / 180)) * 2; // Adjust the speed as needed

        // Animate the drop
        let dropInterval = setInterval(function () {
            if (parseInt(dropImage.style.top) < window.innerHeight - dropImage.clientHeight) {
                dropImage.style.top = (parseInt(dropImage.style.top) + ySpeed) + "px";
                dropImage.style.left = (parseInt(dropImage.style.left) + xSpeed) + "px";
            } else {
                clearInterval(dropInterval); // Stop the animation when it reaches the bottom
                setTimeout(function () {
                    droppingImagesContainer.removeChild(dropImage);
                }, 500); // Delay before removing the image (adjust as needed)
            }
        }, 10);
    }
  
    // Function to get a random image path
    function randomImage() {
        // Return a random image path
        let images = ["https://cdn.glitch.global/5bfeed9e-86d2-40a1-9c56-e0e77d88e5dd/dollar.png?v=1695688755592", "https://cdn.glitch.global/5bfeed9e-86d2-40a1-9c56-e0e77d88e5dd/dollars-sm.JPG?v=1695691649738", "https://cdn.glitch.global/5bfeed9e-86d2-40a1-9c56-e0e77d88e5dd/starving-1s.png?v=1695691809352", "https://cdn.glitch.global/5bfeed9e-86d2-40a1-9c56-e0e77d88e5dd/starving-2s.png?v=1695691813057", "https://cdn.glitch.global/5bfeed9e-86d2-40a1-9c56-e0e77d88e5dd/cryingcat-s.png?v=1695692867387", "https://cdn.glitch.global/5bfeed9e-86d2-40a1-9c56-e0e77d88e5dd/crycloud-s.png?v=1695692997456"];
        return images[Math.floor(Math.random() * images.length)];
    }

    // Add a click event listener to the entire document
    document.addEventListener("click", function (event) {
        createDroppingImage(event.clientX, event.clientY);
    });
});

