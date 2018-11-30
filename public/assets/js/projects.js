var create = document.getElementById('toCreate');
create.addEventListener('click', toCreate);

function toCreate() {
    this.style.animation = '1s toCloud .2s forwards';
    setTimeout(redirect, 550);
    
}
function redirect() {
    window.location.replace('User.html');
}