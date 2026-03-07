function calculateElapsedTime(lastTime) {
    if (!lastTime) return '';

    const diff = Date.now() - new Date(lastTime).getTime();
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    let text = '';
    if (days > 0)    text += days + '日';
    if (hours > 0)   text += hours + '時間';
    if (text === '' && minutes > 0) text += minutes + '分';
    if (text) text += '経過したよ〜';
    return text;
}

function feedTurtle(type) {
    const now = new Date().toISOString();
    localStorage.setItem('lastFeedTime', now);
    localStorage.setItem('lastFeedType', type);
    updateDisplays();
}

function bathTurtle() {
    const now = new Date().toISOString();
    localStorage.setItem('lastBathTime', now);
    updateDisplays();
}

function updateDisplays() {
    const feedTime = localStorage.getItem('lastFeedTime');
    const feedType = localStorage.getItem('lastFeedType') || '';
    const feedTextEl = document.querySelector('#feed-status .status-text');
    const feedImg    = document.getElementById('feed-turtle');

    if (feedTime) {
        feedTextEl.textContent = `${feedType}あげてから ${calculateElapsedTime(feedTime)}`;
        feedImg.src = "images/happy_turtle.png" || "images/turtlefoods.png";
    } else {
        feedTextEl.textContent = "まだごはんあげてないよ…";
        feedImg.src = "images/turtlefoods.png";
    }

    const bathTime = localStorage.getItem('lastBathTime');
    const bathTextEl = document.querySelector('#bath-status .status-text');
    const bathImg    = document.getElementById('bath-turtle');

    if (bathTime) {
        bathTextEl.textContent = `お風呂に入れてから ${calculateElapsedTime(bathTime)}`;
        bathImg.src = "images/happy_turtle.png" || "images/bath.png";
    } else {
        bathTextEl.textContent = "まだお風呂入ってないよ…";
        bathImg.src = "images/bath.png";
    }
}

updateDisplays();
setInterval(updateDisplays, 60000);