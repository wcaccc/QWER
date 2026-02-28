function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
// 側邊欄控制
function openNav() { document.getElementById("myNav").style.width = "100%"; }
function closeNav() { document.getElementById("myNav").style.width = "0%"; }

// 核心互動邏輯
let currentIndex = 0; // 追蹤目前填到第幾格 (0-3)

const correctOrder = ['Q', 'W', 'E', 'R'];

// 音效定義 (保留你之前的設定)
const sounds = {
    'Q': new Audio('audio/q.mp3'),
    'W': new Audio('audio/w.mp3'),
    'E': new Audio('audio/e.mp3'),
    'R': new Audio('audio/r.mp3')
};

function triggerEffect(key) {
    if (currentIndex > 3) return; // 如果滿了就不反應

    const statusMsg = document.getElementById('status-message');

    // --- 核心邏輯：檢查順序 ---
    if (key === correctOrder[currentIndex]) {
        // 順序正確
        
        // 1. 播放聲音
        if (sounds[key]) {
            sounds[key].currentTime = 0;
            sounds[key].play();
        }

        // 2. 更新畫面上的空格
        const currentSlot = document.getElementById(`slot-${currentIndex}`);
        currentSlot.innerText = key;
        currentSlot.classList.add('active');

        // 3. 提示訊息
        const memberNames = {
            'Q': 'Chodan 🥁',
            'W': 'Magenta 🎸',
            'E': 'Hina 🎹',
            'R': 'Siyeon 🎤'
        };
        statusMsg.innerText = memberNames[key] + " 就位！";

        // 4. 前進到下一格
        currentIndex++;

        // 5. 檢查是否集齊四人
        if (currentIndex === 4) {
            statusMsg.innerHTML = "<strong>✨ QWER 集合完畢！成為河蟹吧！ ✨</strong>";
            
            // --- 新增：跳轉到 YouTube ---
            // 等待 1.5 秒後跳轉，讓使用者看完訊息
            setTimeout(() => {
                window.location.href = "https://www.youtube.com/watch?v=ImuWa3SJulY";
            }, 1000); // 1500 毫秒 = 1.5 秒
        }
    } else {
        // 順序錯誤！
        statusMsg.innerText = "順序不對喔！請依照 Q-W-E-R 按下！";
        statusMsg.style.color = "red"; // 提示錯誤
        
        // 短暫提示後變回粉色
        setTimeout(() => {
            statusMsg.style.color = "#FF85A2";
            statusMsg.innerText = "請輸入...";
        }, 1000);
    }
}

// 重置功能... (保留原本的)
function resetSlots() {
    currentIndex = 0;
    for (let i = 0; i < 4; i++) {
        const slot = document.getElementById(`slot-${i}`);
        slot.innerText = "_";
        slot.classList.remove('active');
    }
    document.getElementById('status-message').innerText = "請輸入...";
    document.getElementById('status-message').style.color = "#FF85A2";
}

// 重置功能
function resetSlots() {
    currentIndex = 0;
    for (let i = 0; i < 4; i++) {
        const slot = document.getElementById(`slot-${i}`);
        slot.innerText = "_";
        slot.classList.remove('active');
    }
    document.getElementById('status-message').innerText = "請輸入...";
}

// 鍵盤支援... (保留原本的 keydown 監聽)

// 支援實體鍵盤 (電腦用戶)
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (['Q', 'W', 'E', 'R'].includes(key)) {
        // 讓按鈕看起來像被按下去
        const btn = document.getElementById('key' + key);
        btn.style.background = "#FFD1DC";
        setTimeout(() => btn.style.background = "#FFFFFF", 100);
        
        triggerEffect(key);
    }
});
