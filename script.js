/* =====================================================
   질문 데이터

   ★ 나중에 질문을 수정할 때 이 부분만 수정하면 됩니다.
===================================================== */

const questions = [

    {
        question: "연인과 함께 보내는 가장 좋은 주말은?",
        answers: [
            {
                text: "맛있는 거 먹으러 가기"
            },
            {
                text: "집에서 영화 보기"
            },
            {
                text: "같이 산책하기"
            },
            {
                text: "혼자 집에서 쉬기",
                trap: true
            }
        ]
    },


    {
        question: "연인에게 가장 받고 싶은 것은?",
        answers: [
            {
                text: "따뜻한 말 한마디"
            },
            {
                text: "작은 선물"
            },
            {
                text: "함께 보내는 시간"
            },
            {
                text: "아무것도 필요 없다",
                trap: true
            }
        ]
    },


    {
        question: "갑자기 시간이 생겼다면 무엇을 하고 싶나요?",
        answers: [
            {
                text: "맛있는 것을 먹으러 간다"
            },
            {
                text: "어딘가로 여행을 떠난다"
            },
            {
                text: "집에서 편하게 쉰다"
            },
            {
                text: "연락을 모두 끊는다",
                trap: true
            }
        ]
    },


    {
        question: "좋아하는 사람과 가장 해보고 싶은 것은?",
        answers: [
            {
                text: "같이 맛있는 음식 먹기"
            },
            {
                text: "예쁜 곳에 놀러 가기"
            },
            {
                text: "아무것도 안 하고 같이 있기"
            },
            {
                text: "각자 알아서 살기",
                trap: true
            }
        ]
    },


    {
        question: "좋은 연애에서 가장 중요하다고 생각하는 것은?",
        answers: [
            {
                text: "서로를 이해하는 것"
            },
            {
                text: "함께 웃는 것"
            },
            {
                text: "서로에게 솔직한 것"
            },
            {
                text: "굳이 만나지 않는 것",
                trap: true
            }
        ]
    }

];



/* =====================================================
   현재 질문 번호
===================================================== */

let currentQuestion = 0;



/* =====================================================
   HTML 요소 가져오기
===================================================== */

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const trapScreen = document.getElementById("trap-screen");
const resultScreen = document.getElementById("result-screen");
const letterScreen = document.getElementById("letter-screen");

const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");
const letterButton = document.getElementById("letter-button");

const questionNumber =
    document.getElementById("question-number");

const questionText =
    document.getElementById("question-text");

const answersContainer =
    document.getElementById("answers");

const progress =
    document.getElementById("progress");



/* =====================================================
   화면 전환 함수
===================================================== */

function showScreen(screenToShow) {

    const screens = [
        startScreen,
        quizScreen,
        trapScreen,
        resultScreen,
        letterScreen
    ];

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    screenToShow.classList.add("active");
}



/* =====================================================
   테스트 시작
===================================================== */

startButton.addEventListener("click", () => {

    currentQuestion = 0;

    showQuestion();

    showScreen(quizScreen);

});



/* =====================================================
   질문 보여주기
===================================================== */

function showQuestion() {

    const question = questions[currentQuestion];


    /* 질문 번호 */

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1}`;


    /* 질문 내용 */

    questionText.textContent =
        question.question;


    /* 진행률 */

    const progressPercent =
        ((currentQuestion + 1) / questions.length) * 100;

    progress.style.width =
        `${progressPercent}%`;


    /* 기존 선택지 삭제 */

    answersContainer.innerHTML = "";


    /* 새로운 선택지 만들기 */

    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer.text;


        /* 선택지 클릭 */

        button.addEventListener("click", () => {

            selectAnswer(answer);

        });


        answersContainer.appendChild(button);

    });

}



/* =====================================================
   선택지 처리
===================================================== */

function selectAnswer(answer) {


    /* ---------------------------------------------
       함정 선택지인 경우
    --------------------------------------------- */

    if (answer.trap === true) {

        showScreen(trapScreen);

        return;

    }


    /* ---------------------------------------------
       마지막 질문인 경우
    --------------------------------------------- */

    if (currentQuestion === questions.length - 1) {

        showScreen(resultScreen);

        return;

    }


    /* ---------------------------------------------
       다음 질문으로 이동
    --------------------------------------------- */

    currentQuestion++;

    showQuestion();

}



/* =====================================================
   함정 화면에서 다시 선택하기
===================================================== */

retryButton.addEventListener("click", () => {

    showQuestion();

    showScreen(quizScreen);

});



/* =====================================================
   결과 → 편지
===================================================== */

letterButton.addEventListener("click", () => {

    showScreen(letterScreen);

});
