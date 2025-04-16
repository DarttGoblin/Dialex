const submit = document.querySelector('.submit');
const github = document.querySelector('.github');

submit.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/Dialex', '_blank');
}