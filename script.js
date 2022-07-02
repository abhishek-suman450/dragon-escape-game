// Initializing the score to 0
score = 0;
cross = true;

// Adding audio to our game
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

// setting the arrow keys to jump and move the boy
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        boy = document.querySelector('.boy');
        boy.classList.add('animateBoy');
        setTimeout(() => {
            boy.classList.remove('animateBoy')
        }, 700);
    }
    if (e.keyCode == 39) {
        boy = document.querySelector('.boy');
        boyX = parseInt(window.getComputedStyle(boy, null).getPropertyValue('left'));
        boy.style.left = boyX + 112 + "px";
    }
    if (e.keyCode == 37) {
        boy = document.querySelector('.boy');
        boyX = parseInt(window.getComputedStyle(boy, null).getPropertyValue('left'));
        boy.style.left = (boyX - 112) + "px";
    }
}


// Check for the collision of boy with dragon

setInterval(() => {
    boy = document.querySelector('.boy');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(boy, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(boy, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY)
    if (offsetX < 112 && offsetY < 87) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 138 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 1000);

    }

}, 10);

// function to update the score
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}