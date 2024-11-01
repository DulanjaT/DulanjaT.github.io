const backToTop = this.document.querySelector("#backtopBtn");
const navList = document.querySelector("nav ul")
const mobButton = document.querySelector(".mobile")

function toggleMenu() {
    navList.classList.toggle("responsive")
}
mobButton.addEventListener("click",toggleMenu)

window.addEventListener('scroll', function() {
    const header = document.querySelector("nav");
    
    header.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle("hidden",window.scrollY < 50);
});

backToTop.addEventListener("click",() => {
    document.body.scrollTop= 0;
    document.documentElement.scrollTop = 0;
    
    })


console.log(backToTop)


// Script to adjust scroll when clicking links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 60; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});