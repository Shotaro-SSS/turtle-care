function calculateElapsedTime(lastTime) {
    if (!lastTime) return 'まだ記録されていません';
    
    const now = new Date();
    const last = new Date(lastTime);
    const diff = now - last;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    let result = '';
    if (days > 0) result += `${days}日`;
    if (hours > 0 || days > 0) result += `${hours}時間`;
    if (result === '') result = `${minutes}分`;
    return `${result}経過しました`;
}
// ... 前回のcalculateElapsedTimeはそのまま ...

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
    const lastFeedTime = localStorage.getItem('lastFeedTime');
    const lastFeedType = localStorage.getItem('lastFeedType') || '';
    
    let feedText = 'まだごはんあげてないよ〜';
    if (lastFeedTime) {
        feedText = `${lastFeedType}あげてから<br>${calculateElapsedTime(lastFeedTime)}`;
    }
    document.getElementById('feed-status').innerHTML = feedText;

    const lastBathTime = localStorage.getItem('lastBathTime');
    let bathText = 'まだお風呂入ってないよ〜';
    if (lastBathTime) {
        bathText = `お風呂に入れてから<br>${calculateElapsedTime(lastBathTime)}`;
    }
    document.getElementById('bath-status').innerHTML = bathText;
}

updateDisplays();
setInterval(updateDisplays, 60000);  // 1分ごとに更新で十分（バッテリー節約）