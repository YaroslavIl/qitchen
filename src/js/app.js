// Підключення функціоналу "Чортоги Фрілансера"
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"

addLoadedAttr();
// addTouchAttr();



let menuArr = document.querySelectorAll('.internal-menu__wrapper')
let cardArr = document.querySelectorAll('.news__card')
let mainCardArr = document.querySelectorAll('.aside__item')

function transitionDelay(arr,start) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        const base = start;
        const extra = i * 0.09;
        const duration = base + extra;
        element.style.transitionDelay = duration + 's';
    }
}
transitionDelay(cardArr, 0)
transitionDelay(menuArr, 0)
transitionDelay(mainCardArr, 0.4)