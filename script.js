"use strict";

/* ========= 要素取得 ========= */
let lastTopic = "";
const hands=["グー","チョキ","パー"];
let answer=Math.floor(Math.random()*10)+1;
const slot=["🍒","🍋","🍇","⭐","💎","7️⃣"];
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const darkBtn = document.getElementById("darkBtn");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const typing = document.getElementById("typing");
const quickArea = document.getElementById("quickArea");
const userTemplate = document.getElementById("userTemplate");
const botTemplate = document.getElementById("botTemplate");

/* ========= 初期化 ========= */

window.addEventListener("load", () => {

    loadHistory();

    if (chat.children.length === 0) {

        addBot("オッス！よしくんだ！😺");

    }

});
function playJanken(text){

    const user=text.replace("じゃんけん","").trim();

    if(!hands.includes(user)) return null;

    const bot=hands[Math.floor(Math.random()*3)];

    let result="";

    if(user===bot){

        result="あいこ！";

    }else if(
        (user==="グー"&&bot==="チョキ")||
        (user==="チョキ"&&bot==="パー")||
        (user==="パー"&&bot==="グー")
    ){

        result="あなたの勝ち！🎉";

    }else{

        result="私の勝ち😎";

    }

    return `✊ あなた:${user}
🤖 私:${bot}

${result}`;

}
function playNumber(text){

    if(!text.startsWith("数字")) return null;

    const n=parseInt(text.replace("数字",""));

    if(isNaN(n))
        return "数字1〜10で入力してください";

    if(n===answer){

        answer=Math.floor(Math.random()*10)+1;

        return "🎉 正解！！";

    }

    if(n<answer)
        return "もっと大きい数字！";

    return "もっと小さい数字！";

}
function playSlot(text){

    if(text!=="スロット") return null;

    const a=slot[Math.floor(Math.random()*slot.length)];
    const b=slot[Math.floor(Math.random()*slot.length)];
    const c=slot[Math.floor(Math.random()*slot.length)];

    let result="残念😅";

    if(a===b&&b===c){

        result="🎉 JACKPOT！！";

    }else if(a===b||b===c||a===c){

        result="😊 2つ揃った！";

    }

    return `${a} ${b} ${c}

${result}`;

}
/* ========= メッセージ追加 ========= */

function addUser(text){

    const node = userTemplate.content.cloneNode(true);

    node.querySelector(".text").textContent = text;

    chat.appendChild(node);

    scrollBottom();

}

function addBot(text){

    const node = botTemplate.content.cloneNode(true);

    node.querySelector(".text").textContent = text;

    chat.appendChild(node);

    scrollBottom();

}

/* ========= 送信 ========= */

function sendMessage(){

    const text = input.value.trim();

    if(!text) return;

    addUser(text);

    input.value = "";

    showTyping();

    setTimeout(()=>{

        hideTyping();

        const reply = getReply(text);

        addBot(reply);

        saveHistory();

    },700);

}

/* ========= AI返答 ========= */


    if(text.includes("疲れ")){

    switch(memory.topic){

        case "仕事":
            return "仕事で疲れたんだね。本当にお疲れさま😊";

        case "学校":
            return "学校お疲れさま！今日は授業どうだった？";

        case "ゲーム":
            return "ゲームで疲れたのかな？少し休憩しよう😊";

        default:
            return "今日もお疲れさま！";
    }

}

    if(text.includes("こんにちは"))
        return "こんにちは！今日は何を話そうか？";

    if(text.includes("ありがとう")){
    return "どういたしまして！また何でも聞いてね😊";
}

if(text.includes("悲しい")){
    return "つらかったね…。話せる範囲で聞かせてくれたら、一緒に考えるよ。";
}

if(text.includes("嬉しい")){
    return "それは良かったね！😊 自分も嬉しいよ！";
}

    if(text.includes("疲れ"))
        return "お疲れさま！無理しすぎないでね。";

    if(text.includes("好き"))
        return "そうなんだ！その話もっと聞かせて！";
    
    if(text.includes("仕事")){
    lastTopic = "仕事";
    return "お仕事だったんだ！お疲れさま😊";
}

    if(text.includes("ゲーム")){
    lastTopic = "ゲーム";
    return "ゲーム好きなんだね！何を遊んでるの？";
}

    if(text.includes("学校")){
    lastTopic = "学校";
    return "学校だったんだ！今日はどうだった？";
}

    if(text.includes("疲れ")){

    if(lastTopic === "仕事"){
        return "仕事で疲れたんだね。今日はゆっくり休もう😊";
    }

    if(lastTopic === "学校"){
        return "学校お疲れさま！宿題は終わった？";
    }

    if(lastTopic === "ゲーム"){
        return "ゲームのやりすぎかな？少し休憩もしよう😊";
    }

    return "今日もお疲れさま！";
}
    return random[Math.floor(Math.random()*random.length)];
}

const history = [];

function remember(text){
    history.push(text);

    if(history.length > 5){
        history.shift();
    }
}

const memory = {
    topic: "",
    mood: "normal",
    lastQuestion: "",
    history: []
};

function remember(text){

    memory.history.push(text);

    if(memory.history.length > 10){
        memory.history.shift();
    }

    if(text.includes("仕事")) memory.topic = "仕事";
    if(text.includes("学校")) memory.topic = "学校";
    if(text.includes("ゲーム")) memory.topic = "ゲーム";
    if(text.includes("勉強")) memory.topic = "勉強";
    if(text.includes("恋")) memory.topic = "恋愛";
}

function detectMood(text){

    if(text.match(/疲れ|眠い|しんどい|つらい/))
        return "tired";

    if(text.match(/嬉しい|楽しい|最高|やった/))
        return "happy";

    if(text.match(/悲しい|泣きたい|落ち込/))
        return "sad";

    if(text.match(/怒|ムカつく/))
        return "angry";

    return "normal";
}

const mood = detectMood(text);

if(mood==="tired"){
    return "今日は頑張ったんだね😊 無理しすぎず、ゆっくり休もう。";
}

if(mood==="sad"){
    return "つらかったね…。話したいことがあれば聞くよ。";
}

if(mood==="happy"){
    return "それは良かったね！😊 自分まで嬉しくなるよ！";
}

if(mood==="angry"){
    return "何か嫌なことがあったのかな？落ち着いて話してみよう。";
}
　　function getReply(text){

    const game1 = playJanken(text);
    if(game1) return game1;

    const game2 = playNumber(text);
    if(game2) return game2;

    const game3 = playSlot(text);
    if(game3) return game3;

    if(typeof knowledge !== "undefined"){
        for(const key in knowledge){
            if(text.includes(key)){
                const list = knowledge[key];
                return list[Math.floor(Math.random()*list.length)];
            }
        }
    }


/* ========= タイピング ========= */

function showTyping(){

    typing.classList.add("show");

}

function hideTyping(){

    typing.classList.remove("show");

}

/* ========= スクロール ========= */

function scrollBottom(){

    chat.scrollTop = chat.scrollHeight;

}

/* ========= 履歴 ========= */

function saveHistory(){

    localStorage.setItem(

        "ygpt-history",

        chat.innerHTML

    );

}

function loadHistory(){

    const data = localStorage.getItem(

        "ygpt-history"

    );

    if(data){

        chat.innerHTML = data;

    }

}

/* ========= 暗闇モード ========= */

darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

/* ========= メニュー ========= */

menuBtn.addEventListener("click",()=>{

    menu.classList.toggle("open");

});

/* ========= Enter ========= */

input.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Enter"){

            sendMessage();

        }

    }

);

/* ========= ボタン ========= */

sendBtn.addEventListener(

    "click",

    sendMessage

);

/* ========= クイック質問 ========= */

quickArea.querySelectorAll("button")

.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            input.value = button.textContent;

            sendMessage();

        }

    );

});

/* ========= 証拠隠滅 ========= */

const clearBtn = document.getElementById(

    "clearHistory"

);

if(clearBtn){

clearBtn.onclick=()=>{

localStorage.removeItem("ygpt-history");

chat.innerHTML="";

addBot("履歴を削除したぞ！");

};

}

/* ========= 読み上げ ========= */

const speechBtn = document.getElementById(

"speechBtn"

);

if(speechBtn){

speechBtn.onclick=()=>{

const msg = chat.lastElementChild;

if(!msg)return;

const text = msg.innerText;

speechSynthesis.speak(

new SpeechSynthesisUtterance(text)

);

};

}

/* ========= 音声入力 ========= */

const voiceBtn = document.getElementById(

"voiceBtn"

);

if(

voiceBtn &&

"webkitSpeechRecognition" in window

){

const rec = new webkitSpeechRecognition();

rec.lang="ja-JP";

voiceBtn.onclick=()=>{

rec.start();

};

rec.onresult=e=>{

input.value=

e.results[0][0].transcript;

};

}
