function calculateElapsedTime(lastTime) {
    if (!lastTime) return '';

    const diff = Date.now() - new Date(lastTime).getTime();
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    let parts = [];
    if (days > 0)    parts.push(`${days}日`);
    if (hours > 0)   parts.push(`${hours}時間`);
    if (parts.length === 0 && minutes > 0) parts.push(`${minutes}分`);

    if (parts.length === 0) return '';  // 1分未満は空

    const elapsedStr = parts.join('');
    return `<span class="elapsed-highlight">${elapsedStr}</span>経過したよ`;
}

// 直後用のメッセージ
function getImmediateMessage(type) {
    if (type === '果物') return '果物をあげたよ';
    if (type === '亀フード') return '亀フードをあげたよ';
    if (type === '野菜') return '野菜をあげたよ';
    return 'お風呂に入れたよ';
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
    // 餌やり側
    const feedTime = localStorage.getItem('lastFeedTime');
    const feedType = localStorage.getItem('lastFeedType') || '';
    const feedTextEl = document.querySelector('#feed-status .status-text');

    if (feedTime) {
        const elapsed = calculateElapsedTime(feedTime);
        if (elapsed === '') {
            feedTextEl.innerHTML = getImmediateMessage(feedType);
        } else {
            feedTextEl.innerHTML = `${feedType}あげてから ${elapsed}`;
        }
    } else {
        feedTextEl.textContent = "まだごはんあげてないよ…";
    }

    // お風呂側
    const bathTime = localStorage.getItem('lastBathTime');
    const bathTextEl = document.querySelector('#bath-status .status-text');

    if (bathTime) {
        const elapsed = calculateElapsedTime(bathTime);
        if (elapsed === '') {
            bathTextEl.innerHTML = "お風呂に入れたよ";
        } else {
            bathTextEl.innerHTML = `お風呂に入れてから ${elapsed}`;
        }
    } else {
        bathTextEl.textContent = "まだお風呂入ってないよ…";
    }
}

updateDisplays();
setInterval(updateDisplays, 60000);