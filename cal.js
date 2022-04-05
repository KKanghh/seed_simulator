const $rings = document.querySelector('#rings');
const $levels = document.querySelector('#levels');
const $goals = document.querySelector('#goals');
const $form = document.querySelector('form');
const $open = document.querySelector('#open');
const $stop = document.querySelector('#stop');
const $seedResult = document.querySelector('#seed-result');
const $time = document.querySelector('#time');
const $shining = document.querySelector('#shining');
const $hidden = document.querySelector('#hidden');
const $brokenBox = document.querySelector('#broken-box');
console.log($brokenBox);
const $average = document.querySelector('#average');
const goals = new Set();
let opening = false;
let interval;


const ringList = ['리스트레인트 링', '웨폰퍼프 - S링', '웨폰퍼프 - I링', '웨폰퍼프 - L링', '웨폰퍼프 - D링', '얼티메이덤 링', '리스크테이커 링', 
    '링 오브 썸', '크리데미지 링', '크라이시스 - HM링', '타워인헨스 링', '버든리프트 링', '오버패스 링', '레벨퍼프 - S링', '레벨퍼프 - D링', '레벨퍼프 - I링',
    '레벨퍼프 - L링', '헬스컷 링', '크리디펜스 링', '리밋 링', '듀라빌리티 링', '리커버디펜스 링', '실드스와프 링', '마나컷 링', '크라이시스 - H링', '크라이시스 - M링',
    '크리쉬프트 링', '스탠스쉬프트 링', '리커버스탠스 링', '스위프트 링', '리플렉티브 링', '오션글로우 이어링', '깨진 상자 조각 5개', '시드 포인트 보따리 5개', '경험치 2배 쿠폰(15분) 3개',
]

const ringPercents = [424955, 262206, 262206, 262206, 262206, 262206, 262206,
    185353, 185353, 185353, 185353, 185353, 185353, 185353, 185353, 185353, 185353, 185353, 185353, 185353, 
    162749, 162749, 162749, 162749, 162749, 162749, 162749, 162749, 162749, 162749, 162749,
    49729, 2441230, 587703, 723327,
]

const hiddenPercents = [68027, 68027, 68027, 68027, 68027, 68027, 68027, 
    272109, 272109, 272109, 272109, 272109, 272109, 272109, 272109, 272109, 272109, 272109, 272109, 272109, 
    544218, 544218, 544218, 544218, 544218, 544218, 544218, 544218, 544218, 544218, 544218, 
]

const shiningPercents = [348837, 348837, 348837, 348837, 348837, 348837, 348837,
    581395, 581395, 581395, 581395, 581395, 581395, 581395, 581395, 581395, 581395, 581395, 581395, 581395,
]

const times = [];

const levelPercents = [41, 28, 20, 11];
let time = 0;
let brokenBox = 0;

const getAverage = function () {
    times.push(time);
    const average = times.reduce((a, c) => a + c) / times.length;
    $average.textContent = `${average}판`;
    time = 0;
}

const openHidden = function () {
    const ringPercent = Math.random() * 10000004;
    let ringPercentSum = 0;
    const ring = {}
    for (let i = 0; i < hiddenPercents.length; i++) {
        ringPercentSum += hiddenPercents[i];
        if (ringPercent < ringPercentSum) {
            ring.name = ringList[i];
            break;
        }
    }

    const levelPercent = Math.floor(Math.random() * 100);
    let levelPercentSum = 0;
    for (let i = 0; i < levelPercents.length; i++) {
        levelPercentSum += levelPercents[i];
        if (levelPercent < levelPercentSum) {
            ring.level = i + 1;
            break;
        }
    }

    const $div = document.createElement('div');
    $div.append(`숨겨진 반지 상자 개봉! ${ring.name} ${ring.level}레벨`);
    $seedResult.append($div);

    for (let goal of goals) {
        if (ring.name === goal.name && ring.level >= goal.level) {
            clearInterval(interval);
            getAverage();
            opening = false;
        }
    }
}

const openShining = function () {
    const ringPercent = Math.random() * 9999994;
    let ringPercentSum = 0;
    const ring = {}
    for (let i = 0; i < hiddenPercents.length; i++) {
        ringPercentSum += hiddenPercents[i];
        if (ringPercent < ringPercentSum) {
            ring.name = ringList[i];
            break;
        }
    }

    const levelPercent = Math.floor(Math.random() * 100);
    if (levelPercent < 75) ring.level = 3;
    else ring.level = 4;

    const $div = document.createElement('div');
    $div.append(`빛나는 반지 상자 개봉! ${ring.name} ${ring.level}레벨`);
    $seedResult.append($div);

    for (let goal of goals) {
        if (ring.name === goal.name && ring.level >= goal.level) {
            clearInterval(interval);
            getAverage();
            opening = false;
        }
    }
}

const open = function () {
    const ringPercent = Math.random() * 10000000;
    let ringPercentSum = 0;
    const ring = {};
    for (let i = 0; i < ringPercents.length; i++) {
        ringPercentSum += ringPercents[i];
        if (ringPercent < ringPercentSum) {
            ring.name = ringList[i];
            break;
        }
    }

    const levelPercent = Math.floor(Math.random() * 100);
    let levelPercentSum = 0;
    for (let i = 0; i < levelPercents.length; i++) {
        levelPercentSum += levelPercents[i];
        if (levelPercent < levelPercentSum) {
            ring.level = i + 1;
            break;
        }
    }
    time += 1;
    $time.textContent = `${time}판`;

    if (ring.name === '깨진 상자 조각 5개') {
        brokenBox += 5;
        $brokenBox.textContent = `${brokenBox}개`
    }

    const $div = document.createElement('div');
    if (ring.name !== '오션글로우 이어링' && ring.name !== '깨진 상자 조각 5개' &&
    ring.name !== '경험치 2배 쿠폰(15분) 3개' && ring.name !== '시드 포인트 보따리 5개') {
        $div.append(`${ring.name} ${ring.level}레벨`);
    } else {
        $div.append(`${ring.name}`);
    }
    $seedResult.append($div);

    for (let goal of goals) {
        if (ring.name === goal.name && ring.level >= goal.level) {
            clearInterval(interval);
            getAverage();
            opening = false;
            return;
        }
    }

    if ($hidden.checked && brokenBox >= 10) {
        openHidden();
        brokenBox -= 10;
    }
    if ($shining.checked && brokenBox >= 100) {
        openShining();
        brokenBox -= 100;
    }
}

let $option = document.createElement('option');
$option.textContent = '반지 선택';
$rings.appendChild($option);
for (let i = 0; i < ringList.length; i++) {
    $option = document.createElement('option');
    $option.textContent = ringList[i];
    $rings.append($option);
}
$option = document.createElement('option');
$option.textContent = '레벨 선택';
$levels.appendChild($option);
for (let i = 0; i < 4; i++) {
    $option = document.createElement('option');
    $option.textContent = `${i + 1}레벨`
    $levels.append($option);
}

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ringGoal = document.createElement('div');
    const ringName = document.createElement('span');
    const ringLevel = document.createElement('span');
    if (e.target.rings.value === '반지 선택') return;
    else if (e.target.levels.value === '레벨 선택') {
        if (e.target.rings.value !== '오션글로우 이어링' && e.target.rings.value !== '깨진 상자 조각 5개' &&
        e.target.rings.value !== '경험치 2배 쿠폰(15분) 3개' && e.target.rings.value !== '시드 포인트 보따리 5개') return;
    }
    const ring = {
        name: e.target.rings.value,
        level: parseInt(e.target.levels.value),
    }
    ringName.textContent = ring.name;
    ringName.classList.add('name');
    ringLevel.textContent = `${ring.level}레벨`;
    ringLevel.classList.add('level');
    
    if (ring.name !== '오션글로우 이어링' && ring.name !== '깨진 상자 조각 5개' &&
    ring.name !== '경험치 2배 쿠폰(15분) 3개' && ring.name !== '시드 포인트 보따리 5개') {
        ringGoal.append(ringName, ' ', ringLevel);
            
    } else {
        ringGoal.append(ringName);
        ring.level = 0;
    }
    
    for (let item of goals) {
        if (JSON.stringify(item) === JSON.stringify(ring)) return;
    }
    goals.add(ring);
    ringGoal.classList.add('goal');
    $goals.appendChild(ringGoal);
});

$open.addEventListener('click', () => {
    while ($seedResult.hasChildNodes()) {
        $seedResult.removeChild($seedResult.firstChild);
    }
    if (opening) return;
    opening = true;
    interval = setInterval(open , 100);
});

$stop.addEventListener('click', () => {
    if (!opening) return;
    clearInterval(interval);
    opening = false;
})
