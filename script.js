
const toggler = document.querySelector('.menu__toggler');
const menu    = document.querySelector('.menu');
toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    menu.classList.toggle('active');
})
window.addEventListener('DOMContentLoaded', function() {
    // Get the necessary elements
    var logo = document.querySelector('.logo');
    var list = document.querySelector('ul ');

    // Function to check and show/hide the logo based on list width
    function checkLogoVisibility() {
        var listWidth = list.getBoundingClientRect().width;
        var listItemWidth = list.firstElementChild.getBoundingClientRect().width;
        var listItemMargin = parseInt(window.getComputedStyle(list.firstElementChild).marginRight);
        var listItemTotalWidth = listItemWidth + listItemMargin;
        var listItemsPerRow = Math.floor(listWidth / listItemTotalWidth);

        if (listItemsPerRow * 0.8 < list.children.length) {
            logo.style.display = 'none';
        } else {
            logo.style.display = 'block';
        }
    }

    // Initial check on page load
    checkLogoVisibility();

    // Check logo visibility on window resize
    window.addEventListener('resize', function() {
        checkLogoVisibility();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVW|/-";
    const intervals = [];
    const h1Elements = document.querySelectorAll("nav ul li a");

    h1Elements.forEach((h1) => {
        h1.onmouseover = event => {
            let iteration = 0;
            clearInterval(intervals[h1.dataset.value]);

            intervals[h1.dataset.value] = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(intervals[h1.dataset.value]);
                }

                iteration += 1 / 3;
            }, 20);
        };
    });
});

window.addEventListener("mousemove", effect3d);

const moveableEls = document.querySelectorAll('.moveable-3d');

const limit = 25;
const sensitivity = 50;

function effect3d(event) {
    function doEffect(el, event) {
        let w = el.scrollWidth;
        let h = el.scrollHeight;
        let mouseX = Math.round(event.pageX - el.offsetLeft);
        let mouseY = Math.round(event.pageY - el.offsetTop - el.style.marginTop);

        let dx = mouseX - w / 2;
        let dy = mouseY - h / 2;

        let ax = dx / sensitivity;
        if (ax >= limit) ax = limit;
        if (ax <= -limit) ay = limit;
        let ay = dy / sensitivity;
        if (ay > limit) ay = limit;
        if (ay < -limit) ay = -limit;

        let theta = Math.atan2(dy, dx);
        let angle = theta * 180 / Math.PI - 90;

        if (angle < 0) angle = angle + 360;
        angle = angle - 180;

        el.style.transform = `rotateX(${-ay}deg) rotateY(${ax}deg)`;
    }

    moveableEls.forEach(el => {
        doEffect(el, event);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden, .hidden2');
hiddenElements.forEach((el) => observer.observe(el));

const characters = ['+', '-', '*', '0', 'π', '√', '∫', 'Σ', '∞', '±', '≤', '≥', '≠', '≈', '÷', '×', '∑', '∆', '∏', '∂', '∇', '√', '∝', '∞', '∟', '∠', '∢', '∥', '∦', '∧', '∨', '∩', '∪', '∫', '!', '&', '=', '<', '>', '◉', '○', '±', '¬', '↑', '↓', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

function getRandomCharacter() {
    return characters[Math.floor(Math.random() * characters.length)];
}

function getRandomColorClass() {
    const colorClasses = ['grey-dark', 'grey-white', 'grey-white-yellow', 'grey-white-green', 'grey-white-blue', 'grey-green', 'grey-yellow', 'grey-blue'];
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
}

function updateCharacter(element) {
    const colorClass = getRandomColorClass();
    element.innerHTML = getRandomCharacter();
    element.className = colorClass;
}

function createParagraphs() {
    const totalParagraphs = Math.ceil(window.innerWidth / 40) * Math.ceil(window.innerHeight / 30);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalParagraphs; i++) {
        const paragraph = document.createElement('p');
        fragment.appendChild(paragraph);
        updateCharacter(paragraph);

        // Change characters randomly with a delay
        setInterval(() => updateCharacter(paragraph), Math.random() * 500000 + 500);
    }

    let sectionElement = document.getElementById("bg"); // Replace "yourSectionId" with the actual ID of your <section> element
    sectionElement.appendChild(fragment);
}

window.onload = createParagraphs;
