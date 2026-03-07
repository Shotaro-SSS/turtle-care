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
    const feedStatus = lastFeedType ? `${lastFeedType}をあげてから${calculateElapsedTime(lastFeedTime)}` : 'まだ記録されていません';
    document.getElementById('feed-status').textContent = feedStatus;
    
    const lastBathTime = localStorage.getItem('lastBathTime');
    const bathStatus = lastBathTime ? `お風呂に入れてから${calculateElapsedTime(lastBathTime)}` : 'まだ記録されていません';
    document.getElementById('bath-status').textContent = bathStatus;
}

// 初期表示と毎秒更新
updateDisplays();
setInterval(updateDisplays, 1000);  // 毎秒更新（分単位なので十分）