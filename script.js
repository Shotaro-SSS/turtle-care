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
    if (text) text += '経過したよ';
    return text;
}

// 直後用のメッセージを返す関数（1分未満なら「あげたよ」表示）
function getImmediateMessage(type) {
    if (type === '果物') return '果物をあげたよ';
    if (type === '亀フード') return '亀フードをあげたよ';
    if (type === '野菜') return '野菜をあげたよ';
    return 'お風呂に入れたよ';  // 温浴の場合
}

function feedTurtle(type) {
    const now = new Date().toISOString();
    localStorage.setItem('lastFeedTime', now);
    localStorage.setItem('lastFeedType', type);
    updateDisplays();  // 即時反映
}

function bathTurtle() {
    const now = new Date().toISOString();
    localStorage.setItem('lastBathTime', now);
    updateDisplays();  // 即時反映
}

function updateDisplays() {
    // 餌やり側
    const feedTime = localStorage.getItem('lastFeedTime');
    const feedType = localStorage.getItem('lastFeedType') || '';
    const feedTextEl = document.querySelector('#feed-status .status-text');
    const feedImg    = document.getElementById('feed-turtle');

    if (feedTime) {
        const elapsed = calculateElapsedTime(feedTime);
        if (elapsed === '') {
            // 1分未満（押した直後）
            feedTextEl.textContent = getImmediateMessage(feedType);
        } else {
            // 1分以上経過
            feedTextEl.textContent = `${feedType}あげてから ${elapsed}`;
        }
        feedImg.src = "images/happy_turtle.png" || "images/turtlefoods.png";
    } else {
        feedTextEl.textContent = "まだごはんあげてないよ…";
        feedImg.src = "images/turtlefoods.png";
    }

    // お風呂側
    const bathTime = localStorage.getItem('lastBathTime');
    const bathTextEl = document.querySelector('#bath-status .status-text');
    const bathImg    = document.getElementById('bath-turtle');

    if (bathTime) {
        const elapsed = calculateElapsedTime(bathTime);
        if (elapsed === '') {
            // 1分未満（押した直後）
            bathTextEl.textContent = "お風呂に入れたよ";
        } else {
            // 1分以上経過
            bathTextEl.textContent = `お風呂に入れてから ${elapsed}`;
        }
        bathImg.src = "images/happy_turtle.png" || "images/bath.png";
    } else {
        bathTextEl.textContent = "まだお風呂入ってないよ…";
        bathImg.src = "images/bath.png";
    }
}

// 初回表示 & 1分ごとに更新
updateDisplays();
setInterval(updateDisplays, 60000);