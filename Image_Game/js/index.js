let cardsArray = [
    {
        'name': 'CSS',
        'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrKpZ6-ig8CoX0Mihwv_iqbm1bI10ProeN6w&usqp=CAU',
    },
    {
        'name': 'HTML',
        'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvLOK9VYd322r8Q5nLWzxFPfJCUKYEeiKTRg&usqp=CAU',
    },
    {
        'name': 'jQuery',
        'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRRuvcBvozD-_dmNCsATIOVivem0_GH6ZsQ&usqp=CAU',
    },
    {
        'name': 'JS',
        'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiFnOZaa6dh6D5HECyaV8a-Tqcc-Hqacr9Q&usqp=CAU',
    },
    {
        'name': 'Node',
        'img': 'https://p7.hiclipart.com/preview/306/37/167/node-js-javascript-web-application-express-js-computer-software-others.jpg',
    },
    {
        'name': 'Python',
        'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png',
    }
];

let GameCard = cardsArray.concat(cardsArray)
let clickCnt = 0;
let first = "";
let second = "";
let section = document.querySelector("#card-container");


const Change_Selected = () => {
    let card_selected = document.querySelectorAll(".card_selected");

    card_selected.forEach((CurrCard) => {
        CurrCard.classList.add("card_match");
    })
}



const reset_game = () => {
    clickCnt = 0;
    first = "";
    second = "";

    let card_selected = document.querySelectorAll(".card_selected");

    card_selected.forEach((CurrCard) => {

        CurrCard.classList.remove("card_selected");

    })
}


section.addEventListener("click", (event) => {
    clickCnt++;

    let CurrBox = event.target;
    if (CurrBox.id === "card-container") { return false; }
    if (clickCnt < 3) {
        if (clickCnt === 1) {

            first = CurrBox.parentNode.dataset.name;

            CurrBox.parentNode.classList.add("card_selected");

        }
        else if (clickCnt === 2) {
            second = CurrBox.parentNode.dataset.name;

            CurrBox.parentNode.classList.add("card_selected");
            // Change_Selected();
        }
    }

    if (first !== "" && second !== "") {
        if (first === second) {
            setTimeout(() => {
                Change_Selected();
                reset_game();
            }, 1000);

        } else {
            setTimeout(() => {

                reset_game();
            }, 1000);
        }
    }
})


let Shufle = GameCard.sort(() => 0.5 - Math.random());
for (let i = 0; i < Shufle.length; i++) {

    let ChildDiv = document.createElement("div");

    ChildDiv.classList.add("card");

    ChildDiv.dataset.name = Shufle[i].name;


    let front_card = document.createElement("div");

    front_card.classList.add("front_card");

    let back_card = document.createElement("div");

    back_card.classList.add("back_card");

    back_card.style.backgroundImage = `url(${Shufle[i].img})`;

    // back_card.style.backgroundSize = "cover";
    ChildDiv.appendChild(front_card);

    ChildDiv.appendChild(back_card);

    section.appendChild(ChildDiv)
}

