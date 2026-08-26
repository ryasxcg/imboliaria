// MENU MOBILE

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
});


// PESQUISA DE IMÓVEIS

const searchButton = document.getElementById("searchButton");
const propertyCards = document.querySelectorAll(".property-card");
const noResults = document.getElementById("noResults");

searchButton.addEventListener("click", () => {
    const location = document.getElementById("location").value;
    const type = document.getElementById("type").value;
    const price = document.getElementById("price").value;

    let visibleProperties = 0;

    propertyCards.forEach((property) => {
        const propertyLocation = property.dataset.location;
        const propertyType = property.dataset.type;
        const propertyPrice = property.dataset.price;

        const locationMatch =
            location === "all" || location === propertyLocation;

        const typeMatch =
            type === "all" || type === propertyType;

        const priceMatch =
            price === "all" || price === propertyPrice;

        if (locationMatch && typeMatch && priceMatch) {
            property.style.display = "block";
            visibleProperties++;
        } else {
            property.style.display = "none";
        }
    });

    noResults.style.display =
        visibleProperties === 0 ? "block" : "none";

    document.getElementById("properties").scrollIntoView({
        behavior: "smooth"
    });
});


// CONTADORES ANIMADOS

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1500;
        const increment = target / (duration / 16);

        let current = 0;

        function updateCounter() {
            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + "+";
            }
        }

        updateCounter();
    });

    countersStarted = true;
}


// OBSERVA QUANDO A SEÇÃO APARECE

const aboutSection = document.getElementById("about");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startCounters();
            }
        });
    },
    {
        threshold: 0.4
    }
);

observer.observe(aboutSection);


// FORMULÁRIO

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent =
            "Please fill in all required fields.";

        formMessage.style.color = "#b00020";
        return;
    }

    formMessage.textContent =
        "Thank you! Your message has been received.";

    formMessage.style.color = "#4d7c4d";

    contactForm.reset();
});