
    // Typing animation with highlighted keywords
    document.addEventListener('DOMContentLoaded', function() {
      const typingArea = document.getElementById('typing-area');

      // Define your sentences and which words should be highlighted
      const sentences = [
        {
          text: "I develop frontend solutions that delight and inspire users.",
          keywords: ["develop", "frontend"]
        },
        {
          text: "I create responsive UIs that engage customers.",
          keywords: ["create", "responsive"]
        },
        {
          text: "I build modern websites that scale and perform amazingly.",
          keywords: ["build", "modern"]
        },
        {
          text: "I craft intuitive experiences that simplify complex processes.",
          keywords: ["craft", "intuitive"]
        }
      ];

      let sentenceIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let isPaused = false;

      function type() {
        const currentSentence = sentences[sentenceIndex];
        const fullText = currentSentence.text;
        const keywords = currentSentence.keywords;

        // Handle typing or deleting
        if (isDeleting) {
          charIndex--;
        } else if (!isPaused && charIndex < fullText.length) {
          charIndex++;
        }

        // Get the text to display
        const displayText = fullText.substring(0, charIndex);

        // Split the text into lines (for multiline layout)
        const lines = displayText.split(/(?<=\.) /); // Split after periods

        // Clear the typing area
        typingArea.innerHTML = '';

        // Process each line
        lines.forEach((line, lineIndex) => {
          const lineElement = document.createElement('div');

          // Process the line to highlight keywords
          let processedLine = line;

          // Replace keywords with HTML markup for highlighting
          keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            processedLine = processedLine.replace(regex, `<span class="gradient-text">${keyword}</span>`);
          });

          // Add the processed line
          lineElement.innerHTML = processedLine;
          typingArea.appendChild(lineElement);
        });

        // Set typing speed
        let typingSpeed = isDeleting ? 30 : 70;

        // Handle pausing and transitions
        if (!isDeleting && charIndex === fullText.length && !isPaused) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
          }, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          sentenceIndex = (sentenceIndex + 1) % sentences.length;
        }

        setTimeout(type, typingSpeed);
      }

      // Start typing
      type();

       // Scroll animations using Intersection Observer
  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          // Optional: stop observing after animation is applied
          // observer.unobserve(entry.target);
        } else {
          // Optional: remove class when out of viewport for repeated animations
          // entry.target.classList.remove('animate-active');
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust the triggering area
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize scroll animations
  animateOnScroll();

  // Project slider animation
  let currentSlide = 0;
  const slides = document.querySelectorAll('.project-slide');
  const slidesContainer = document.querySelector('.slides-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  function updateSlider() {
    const slideWidth = slides[0].clientWidth;
    slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    updateSlider();
  });

  // Handle experience section toggle
  const experienceHeaders = document.querySelectorAll('.experience-header');

  experienceHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      const toggleBtn = header.querySelector('.experience-toggle');

      // Toggle display
      if (targetElement.classList.contains('hidden')) {
        targetElement.classList.remove('hidden');
        targetElement.classList.add('animate-expand');
        toggleBtn.textContent = '-';
      } else {
        targetElement.classList.add('hidden');
        targetElement.classList.remove('animate-expand');
        toggleBtn.textContent = '+';
      }
    });
  });

  // Form handling
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formMessage.classList.remove('hidden');
      formMessage.textContent = 'Message sent successfully!';
      formMessage.className = 'text-green-500 mb-4';
      contactForm.reset();

      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 3000);
    });


    const slidesContainer = document.querySelector('.slides-container');
      const slides = document.querySelectorAll('.project-slide');
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');

      let currentIndex = 0;
      const slideCount = slides.length;

      // Set initial position
      updateSlidePosition();

      // Auto slide functionality
      let autoSlideInterval = setInterval(nextSlide, 5000);

      // Event listeners for buttons
      nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
      });

      prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
      });

      function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlidePosition();
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlidePosition();
      }

      function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const experienceHeaders = document.querySelectorAll('.experience-header');

      experienceHeaders.forEach(header => {
        header.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          const detailsElement = document.getElementById(targetId);
          const toggleButton = this.querySelector('.experience-toggle');

          // Toggle details visibility
          if (detailsElement.classList.contains('hidden')) {
            detailsElement.classList.remove('hidden');
            toggleButton.textContent = '−'; // Using minus sign
            this.classList.add('rounded-t-lg');
            this.classList.remove('rounded-lg');
          } else {
            detailsElement.classList.add('hidden');
            toggleButton.textContent = '+';
            this.classList.remove('rounded-t-lg');
            this.classList.add('rounded-lg');
          }
        });
      });



    })

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const logo = document.getElementById("logo");

    // Function to handle scroll effects
    function onScroll() {
      // Logo visibility
      if (window.scrollY > 50) {
        logo.classList.add("opacity-0", "invisible");
        logo.classList.remove("opacity-100", "visible");
      } else {
        logo.classList.add("opacity-100", "visible");
        logo.classList.remove("opacity-0", "invisible");
      }

      // Active section highlighting
      let currentSection = "";
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      // Update active nav link
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-section") === currentSection) {
          link.classList.add("active");
        }
      });
    }

    // Smooth scrolling when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Offset for navbar height
            behavior: "smooth",
          });
        }
      });
    });

    // Listen for scroll events
    window.addEventListener("scroll", onScroll);

    // Initial call to set active state on page load
    onScroll();

    });


    // document.addEventListener('DOMContentLoaded', () => {

    // });
