const submit = document.querySelector('.submit');
const github = document.querySelector('.github');
const demo = document.querySelector('.demo');

submit.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/Dialex_server', '_blank');
}

demo.onclick = function() {
    window.open('https://drive.google.com/file/d/1QxbRdSiEavC-4iJBXhNcHSk9TkK8CLfQ/view?usp=sharing', '_blank');
}