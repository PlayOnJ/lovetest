/* =====================================================
   질문 설정

   질문이나 선택지를 바꾸려면 이 부분을 수정하세요.

   trap: true
   → 함정 선택지

   trap이 없는 선택지
   → 정상 선택지
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
        question: "갑자기 하루의 시간이 생겼다면?",

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
   화면
===================================================== */

const screens = {

    start:
        document.getElementById("start-screen"),

    quiz:
        document.getElementById("quiz-screen"),

    trap:
        document.getElementById("trap-screen"),

    loading:
        document.getElementById("loading-screen"),

    result:
        document.getElementById("result-screen"),

    letter:
        document.getElementById("letter-screen")

};


/* =====================================================
   버튼
===================================================== */

const startButton =
    document.getElementById("start-button");

const retryButton =
    document.getElementById("retry-button");

const letterButton =
    document.getElementById("letter-button");


/* =====================================================
   질문 요소
===================================================== */

const questionNumber =
    document.getElementById("question-number");

const questionCount =
    document.getElementById("question-count");

const questionText =
    document.getElementById("question-text");

const answersContainer =
    document.getElementById("answers");

const progress =
    document.getElementById("progress");


/* =====================================================
   화면 전환
===================================================== */

function showScreen(screen) {

    Object.values(screens).forEach(item => {

        item.classList.remove("active");

    });

    screen.classList.add("active");

}


/* =====================================================
   테스트 시작
===================================================== */

startButton.addEventListener("click", () => {

    currentQuestion = 0;

    showQuestion();

    showScreen(screens.quiz);

});


/* =====================================================
   질문 표시
===================================================== */

function showQuestion() {

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1}`;


    questionCount.textContent =
        `${currentQuestion + 1} / ${questions.length}`;


    questionText.textContent =
        question.question;


    const percentage =
        ((currentQuestion + 1) / questions.length) * 100;


    progress.style.width =
        `${percentage}%`;


    answersContainer.innerHTML = "";


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.className =
            "answer-button";


        button.textContent =
            answer.text;


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


    /* 함정 선택 */

    if (answer.trap === true) {

        showScreen(screens.trap);

        return;

    }


    /* 마지막 질문 */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        showScreen(screens.result);

        return;

    }


    /* 다음 질문 */

    currentQuestion++;

    showQuestion();

}


/* =====================================================
   함정 → 다시 선택
===================================================== */

retryButton.addEventListener("click", () => {

    showQuestion();

    showScreen(screens.quiz);

});


/* =====================================================
   결과 → 편지
===================================================== */

letterButton.addEventListener("click", () => {

    showScreen(screens.letter);

    window.scrollTo(0, 0);

});
