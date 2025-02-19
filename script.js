let isGenerating = false; // 생성 중 여부를 추적
let history = []; // 과거 기록 저장 배열

function generateSingleLotto() {
    if (isGenerating) return; // 이미 생성 중이면 실행 중지

    const resultDiv = document.getElementById('result');
    const button = document.getElementById('singleButton');
    const historyList = document.getElementById('historyList');

    // 버튼 비활성화 및 '생성중'으로 변경
    isGenerating = true;
    button.disabled = true;
    button.textContent = '생성중';

    // 초기 메시지와 섞이는 효과
    resultDiv.classList.add('shuffling');
    resultDiv.innerHTML = '숫자를 섞는 중...';

    // 1초 후 숫자 생성 시작
    setTimeout(() => {
        resultDiv.classList.remove('shuffling');
        resultDiv.innerHTML = ''; // 초기화

        const numbers = [];
        let interval = setInterval(() => {
            if (numbers.length < 6) {
                let newNumber;
                do {
                    newNumber = Math.floor(Math.random() * 45) + 1;
                } while (numbers.includes(newNumber)); // 중복 방지

                numbers.push(newNumber);

                // 숫자를 작은 순서로 정렬
                const sortedNumbers = numbers.sort((a, b) => a - b);

                // 결과 Div 초기화 후 정렬된 숫자 중 첫 번째 미출력 숫자 출력
                resultDiv.innerHTML = ''; // 이전 내용 초기화 (텍스트 제거)

                for (let i = 0; i < sortedNumbers.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = sortedNumbers[i];
                    if (i > 0) resultDiv.innerHTML += '  '; // 숫자 사이 두 칸 공백
                    if (i < sortedNumbers.length - (6 - numbers.length)) {
                        // 이미 출력된 숫자
                        resultDiv.appendChild(span);
                    } else {
                        // 새로 출력할 숫자에만 fade-in 효과
                        const newSpan = document.createElement('span');
                        newSpan.textContent = sortedNumbers[i];
                        newSpan.classList.add('fade-in'); // 새 숫자에만 페이드 인 효과
                        resultDiv.appendChild(newSpan);

                        // 페이드 인 효과가 끝난 후 클래스 제거
                        setTimeout(() => {
                            newSpan.classList.remove('fade-in');
                        }, 500); // 애니메이션 지속 시간과 동일
                    }
                }

            } else {
                clearInterval(interval); // 모든 숫자 생성 완료

                // 최종 정렬된 숫자 출력 (숫자만, 텍스트 제거)
                const sortedNumbers = numbers.sort((a, b) => a - b);
                resultDiv.innerHTML = ''; // 텍스트 제거
                sortedNumbers.forEach((num, index) => {
                    const span = document.createElement('span');
                    span.textContent = num;
                    if (index > 0) resultDiv.innerHTML += '  '; // 숫자 사이 두 칸 공백
                    resultDiv.appendChild(span);
                });

                // 기록에 추가 (각 숫자를 number-item으로 감싸고 순서 번호 추가)
                let historyEntry = `<span class="history-number">${history.length + 1}.</span>`; // 순서 번호
                sortedNumbers.forEach((num, index) => {
                    historyEntry += `<span class="number-item">${num}</span>`;
                    if (index < sortedNumbers.length - 1) historyEntry += '  '; // 숫자 사이 두 칸 공백
                });
                history.unshift(historyEntry); // 최신 기록을 맨 위에 추가
                updateHistoryList();

                // 효과음과 반짝임 추가
                const sound = document.getElementById('successSound');
                sound.play();

                resultDiv.classList.add('sparkle');

                // 반짝임 효과 0.5초 후 제거 및 버튼 재활성화
                setTimeout(() => {
                    resultDiv.classList.remove('sparkle');
                    isGenerating = false;
                    button.disabled = false;
                    button.textContent = '1개'; // 원래 텍스트로 복구
                }, 500);
            }
        }, 1000); // 1초 간격으로 숫자 출력
    }, 1000); // 초기 섞이는 시간 1초
}

function generateMultipleLotto() {
    if (isGenerating) return; // 이미 생성 중이면 실행 중지

    const resultDiv = document.getElementById('result');
    const button = document.getElementById('multipleButton');
    const historyList = document.getElementById('historyList');

    // 버튼 비활성화 및 '생성중'으로 변경
    isGenerating = true;
    button.disabled = true;
    button.textContent = '생성중';

    // 초기 메시지와 섞이는 효과
    resultDiv.classList.add('shuffling');
    resultDiv.innerHTML = '숫자를 섞는 중...';

    // 1초 후 5세트 숫자 생성 시작
    setTimeout(() => {
        resultDiv.classList.remove('shuffling');
        resultDiv.innerHTML = ''; // 초기화

        let allNumbers = [];
        for (let set = 0; set < 5; set++) {
            const numbers = [];
            while (numbers.length < 6) {
                let newNumber;
                do {
                    newNumber = Math.floor(Math.random() * 45) + 1;
                } while (numbers.includes(newNumber)); // 중복 방지 (세트 내)
                numbers.push(newNumber);
            }
            allNumbers.push(numbers.sort((a, b) => a - b)); // 각 세트 정렬
        }

        let currentSet = 0;
        let interval = setInterval(() => {
            if (currentSet < 5) {
                const sortedNumbers = allNumbers[currentSet];

                // 현재 세트 출력
                resultDiv.innerHTML = ''; // 이전 내용 초기화
                sortedNumbers.forEach((num, index) => {
                    const span = document.createElement('span');
                    span.textContent = num;
                    if (index > 0) resultDiv.innerHTML += '  '; // 숫자 사이 두 칸 공백
                    resultDiv.appendChild(span);
                });

                // 기록에 추가
                let historyEntry = `<span class="history-number">${history.length + 1}.</span>`; // 순서 번호
                sortedNumbers.forEach((num, index) => {
                    historyEntry += `<span class="number-item">${num}</span>`;
                    if (index < sortedNumbers.length - 1) historyEntry += '  '; // 숫자 사이 두 칸 공백
                });
                history.unshift(historyEntry); // 최신 기록을 맨 위에 추가

                updateHistoryList();

                // 효과음 재생
                const sound = document.getElementById('successSound');
                sound.play();

                resultDiv.classList.add('sparkle');

                // 반짝임 효과 0.5초 후 제거
                setTimeout(() => {
                    resultDiv.classList.remove('sparkle');
                }, 500);

                currentSet++;
            } else {
                clearInterval(interval); // 모든 세트 출력 완료

                // 최종 버튼 재활성화
                isGenerating = false;
                button.disabled = false;
                button.textContent = '5개'; // 원래 텍스트로 복구
            }
        }, 2000); // 각 세트는 2초 간격으로 출력

    }, 1000); // 초기 섞이는 시간 1초
}

// 과거 기록 리스트 업데이트 함수 (삭제 버튼 포함)
function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // 기존 리스트 비우기

    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = entry; // 기존 기록 HTML

        // 삭제 버튼 추가
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = '삭제';
        deleteButton.onclick = () => deleteHistory(index); // 해당 인덱스 기록 삭제

        li.appendChild(deleteButton); // 삭제 버튼을 li에 추가
        historyList.appendChild(li);
    });
}

// 특정 인덱스의 기록 삭제 함수
function deleteHistory(index) {
    history.splice(index, 1); // 배열에서 해당 인덱스 항목 삭제
    updateHistoryList(); // 리스트 갱신
}