/* =====================================================
   질문 데이터
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
    },

    {
        question: "내가 생각하는 가장 완벽한 이상형의 키는?",

        answers: [

            {
                text: "150cm",
                trap: true
            },

            {
                text: "160cm",
                trap: true
            },

            {
                text: "164.8cm"
            },

            {
                text: "170cm",
                trap: true
            }

        ]
    }
];


/* =====================================================
   선물 데이터

   사진 파일 이름을 바꾸고 싶다면
   여기만 수정하면 됨.
===================================================== */

const gifts = [

    {
        image: "gift1.jpg"
    },

    {
        image: "gift2.jpg"
    },

    {
        image: "gift3.jpg"
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
        document.getElementById("letter-screen"),

    gift:
        document.getElementById("gift-screen")

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


const nextGiftButton =
    document.getElementById("next-gift-button");


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
   선물 요소
===================================================== */

const giftPreview =
    document.getElementById("gift-preview");


const giftBoxes =
    document.getElementById("gift-boxes");


const giftSelectText =
    document.getElementById("gift-select-text");


const giftResult =
    document.getElementById("gift-result");


const resultGiftImage =
    document.getElementById("result-gift-image");


const giftBoxesElements =
    document.querySelectorAll(".gift-box");


/* =====================================================
   화면 전환
===================================================== */

function showScreen(screen) {

    Object.values(screens).forEach(item => {

        if (item) {

            item.classList.remove("active");

        }

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
        ((currentQuestion + 1) /
            questions.length) * 100;


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

        showScreen(screens.loading);


        setTimeout(() => {

            showScreen(screens.result);

        }, 2500);


        return;

    }


    /* 다음 질문 */

    currentQuestion++;

    showQuestion();

}


/* =====================================================
   함정 → 다시 질문
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


/* =====================================================
   편지 → 선물
===================================================== */

nextGiftButton.addEventListener("click", () => {

    showScreen(screens.gift);

    resetGiftPage();

    startGiftAnimation();

});


/* =====================================================
   선물 페이지 초기화
===================================================== */

function resetGiftPage() {

    giftPreview.style.opacity = "1";

    giftBoxes.style.opacity = "0";

    giftBoxes.style.pointerEvents = "none";

    giftBoxes.classList.remove("shuffle");

    giftSelectText.classList.remove("show");

    giftResult.classList.remove("show");


    giftBoxesElements.forEach(box => {

        box.style.pointerEvents = "none";

        box.style.transform = "";

    });

}


/* =====================================================
   선물 연출
===================================================== */

function startGiftAnimation() {


    /*
        1단계
        선물 사진 등장
    */

    setTimeout(() => {

        const photos =
            document.querySelectorAll(".gift-photo");


        photos.forEach(photo => {

            photo.style.opacity = "1";

            photo.style.transform =
                "translateY(0) scale(1)";

        });

    }, 300);


    /*
        2단계
        선물 사진 사라짐
        상자 등장
    */

    setTimeout(() => {

        giftPreview.style.opacity = "0";

        giftBoxes.style.opacity = "1";

    }, 1800);


    /*
        3단계
        상자 섞기
    */

    setTimeout(() => {

        giftBoxes.classList.add("shuffle");

    }, 2400);


    /*
        4단계
        섞기 종료
        선택 가능
    */

    setTimeout(() => {

        giftBoxes.classList.remove("shuffle");

        giftBoxes.style.pointerEvents = "auto";

        giftSelectText.classList.add("show");


        giftBoxesElements.forEach(box => {

            box.style.pointerEvents = "auto";

        });

    }, 4400);

}


/* =====================================================
   선물상자 선택
===================================================== */

giftBoxesElements.forEach(box => {

    box.addEventListener("click", () => {


        /*
            아직 선택 시간이 아니면
            아무 일도 하지 않음
        */

        if (
            !giftSelectText.classList.contains("show")
        ) {

            return;

        }


        revealRandomGift();

    });

});


/* =====================================================
   랜덤 선물 공개
===================================================== */

function revealRandomGift() {


    /*
        중복 클릭 방지
    */

    giftBoxesElements.forEach(box => {

        box.style.pointerEvents = "none";

    });


    giftSelectText.classList.remove("show");


    /*
        ==========================================
        여기서 선택 화면을 완전히 숨김
        ==========================================
    */

    giftBoxes.style.opacity = "0";

    giftBoxes.style.pointerEvents = "none";

    giftPreview.style.opacity = "0";


    /*
        랜덤으로 선물 하나 선택

        0 / 1 / 2 중 하나
    */

    const randomIndex =
        Math.floor(
            Math.random() * gifts.length
        );


    const selectedGift =
        gifts[randomIndex];


    /*
        결과 이미지 변경
    */

    resultGiftImage.src =
        selectedGift.image;


    /*
        ==========================================
        결과 화면으로 완전히 전환
        ==========================================
    */

    setTimeout(() => {

        giftResult.classList.add("show");

    }, 250);

   /* ==========================================
   지호 사진 움짤 효과
========================================== */
   
   const jihhoPhoto =
       document.getElementById("jihho-photo");
   
   
   let jihhoPhotoToggle = false;
   
   
   setInterval(() => {
   
       jihhoPhotoToggle =
           !jihhoPhotoToggle;
   
   
       if (jihhoPhotoToggle) {
   
           jihhoPhoto.src =
               "jihho2.png";
   
       } else {
   
           jihhoPhoto.src =
               "jihho1.png";
   
       }
   
   }, 500);

}
