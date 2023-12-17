var count = 0;

// animacija za naslova na homepage
setInterval(function () {
    count++;
    if (count == 2) {
        document.getElementById("homepageTitle").style.width = '90%';
    }
    if (count === 4) {
        document.getElementById("homepageTitle").style.width = '0';
        count = 0;
    }
}, 500)

// funckije za otvaranje sidenav
function showSide() {
    document.getElementById("loginArea").className += ' displaySide';
}
function closeSide() {
    document.getElementById("loginArea").className = 'area';
}



