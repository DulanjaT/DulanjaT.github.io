const scrollUpButton = document.querySelector("#backtopBtn");
const menuList = document.querySelector("nav ul");
const mobileToggle = document.querySelector(".mobile");

function toggleNavigation() {
    menuList.classList.toggle("expanded");
}
mobileToggle.addEventListener("click", toggleNavigation);

window.addEventListener('scroll', () => {
    const navigationBar = document.querySelector("nav");

    navigationBar.classList.toggle('isScrolled', window.scrollY > 50);
    scrollUpButton.classList.toggle("hide", window.scrollY < 50);
});

scrollUpButton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

console.log(scrollUpButton);


document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const destinationId = this.getAttribute('href').substring(1);
        const destinationElement = document.getElementById(destinationId);

        if (destinationElement) {
            const offset = 60;
            const destinationPosition = destinationElement.getBoundingClientRect().top;
            const adjustedPosition = destinationPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: adjustedPosition,
                behavior: 'smooth'
            });
        }
    });
});
