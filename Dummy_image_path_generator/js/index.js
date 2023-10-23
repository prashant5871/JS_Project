//https://dummyimage.com/600x400/fff/000&text=This+is+the+dummy+image


let input = document.querySelectorAll("input");
let Img = document.querySelector("img");

let textarea = document.querySelector("textarea");
let select = document.querySelector("select");

// textarea.innerHTML = UrlImg;

const RemoveHash = (str) => {
    return str.slice(1);
}

const AddPlus  = (str) => {
    return str.replace(/\s+/g,"+");
}

// console.log(input[0].value);
let BackgroundClr = RemoveHash(input[0].value);
let Clr = RemoveHash(input[1].value);

let text = AddPlus(input[2].value);

let UrlImg;

const AddImg = () => {
    BackgroundClr = RemoveHash(input[0].value);
    Clr = RemoveHash(input[1].value);
    text = AddPlus(input[2].value);
    UrlImg = `https://dummyimage.com/${select.value}/${BackgroundClr}/${Clr}&text=${text}`
    textarea.innerHTML = UrlImg;
    Img.src = UrlImg;
}
select.addEventListener("change", AddImg);

input.forEach((value) => {
    value.addEventListener("change",AddImg);
})