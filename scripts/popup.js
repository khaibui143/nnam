const body = document.querySelector('body');
const popup = document.querySelector('.popup');
const page = popup.querySelector('article');

document.addEventListener('click', async function(event) {
    if (event.target.dataset.link === "popup") {
        event.preventDefault();
        const response = await fetch(event.target.href);
        const fragment = await response.text();
        page.innerHTML = fragment;

        popup.setAttribute('aria-hidden', false);
        body.classList.add('noscroll');
        popup.scrollTop = 0;
    }
}, false);

const close = document.querySelector('.close-popup');

close.addEventListener('click', function() {
    popup.setAttribute('aria-hidden', true);
    body.classList.remove('noscroll');
})