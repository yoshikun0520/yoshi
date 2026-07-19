/* よしくん AI設定
・優しく親しみやすい
・暴言を使わない
・相手を否定しない
*/
let lastTopic = "";
const memory={topic:"",history:[]};
function remember(text){
 memory.history.push(text);
 if(memory.history.length>10)memory.history.shift();
 if(text.includes("仕事"))memory.topic="仕事";
 else if(text.includes("学校"))memory.topic="学校";
 else if(text.includes("ゲーム"))memory.topic="ゲーム";
}
function detectMood(text){
 if(/疲れ|眠い|しんどい|つらい|死にたい|鬱/.test(text))return "tired";
 if(/嬉しい|楽しい|最高|やった|うれしい|うぇーい/.test(text))return "happy";
 if(/悲しい|落ち込|泣き|どん底|終わり|クソ/.test(text))return "sad";
 return "normal";
}

"use strict";

/* ========= 要素取得 ========= */
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

        addBot("よぉ！何か用か😺？");

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

function getReply(text){

    if(typeof knowledge !== "undefined"){

        for(const key in knowledge){

            if(text.includes(key)){

                const list = knowledge[key];

                return list[Math.floor(Math.random()*list.length)];

            }

        }

    }

　　const game1=playJanken(text);

if(game1) return game1;

const game2=playNumber(text);

if(game2) return game2;

const game3=playSlot(text);

if(game3) return game3;
if(text.includes("疲れ")){

    if(lastTopic === "仕事"){
        return "仕事で疲れたんだね。じゃたんまり稼いだよな😊？";
    }

    if(lastTopic === "学校"){
        return "学校なんてバックれちまえ！カツアゲでもしに行くか？";
    }

    if(lastTopic === "ゲーム"){
        return "チート使ってる？楽をする為に苦労してます😊";
    }

    return "おっつー！";
 }

if(text.includes("仕事")){
    lastTopic = "仕事";
    return "お仕事だったんだ！お疲れさま！で今日のアガリは😊？";
}
if(text.includes("学校")){
    lastTopic = "学校";
    return "学校だったんだ！今日はどうだった？";
}
if(text.includes("ゲーム")){
    lastTopic = "ゲーム";
    return "ゲーム好きなんだね！何を遊んでるの？";
}
if(text.includes("疲れ")){
    return "は？何言ってんの😊？ 身体が動かなくなるまで耐えろや！";
}
if(text.includes("ありがとう")){
    return "どういたしまして！また何でも聞いてね😊";
}

if(text.includes("悲しい")){
    return "マジ笑える…。根性ねぇ奴はいらねぇから消えろや。";
}

if(text.includes("嬉しい")){
    return "あっそ！😊 自分だけ嬉しくて満足か？";
}
    if(text.includes("こんにちは"))
        return "どーも！今日は何から話すべか？";

    if(text.includes("ありがとう"))
        return "はいよー！ちゃんと礼持って来いよ？";

    if(text.includes("疲れ"))
        return "何だせぇ事ぬかしてんだよ！ガタくれる前に動けや。";

    if(text.includes("好き"))
        return "ふーん。そうなんだ！その話それ以上したら殴っていいか？";
  
function detectMood(text){

    if(text.match(/疲れ|眠い|しんどい|つらい|自殺/))
        return "tired";

    if(text.match(/嬉しい|楽しい|最高|やった|うれしい|うぇーい/))
        return "happy";

    if(text.match(/悲しい|泣きたい|落ち込|死にたい/))
        return "sad";

    if(text.match(/怒|ムカつく|殺す|イラつく/))
        return "angry";

    return "normal";
}
const mood = detectMood(text);

if(mood==="tired"){
    return "今日は頑張ったんだね😊 無理しすぎず、ゆっくり休もう。";
}

if(mood==="sad"){
    return "つらかったね…。何て言うと思ったか？考えが甘いんだよ。";
}

if(mood==="happy"){
    return "それは良かったね！😊 自慢して楽しいか？";
}

if(mood==="angry"){
    return "何かムカつく事があったのか？ケツ取りに行くべや。";
}
        "なるほど！",

        "面白いな！",

        "もっと教えてくれ！",

        "そうなんだ！",

        "マジかよ！",

        "あ？なめてんのか？", 

        "グーで殴られたいのか？",

        "おっぱい好き！",

         "はいよ～",

        "テメーで考えろや！", 

        "ダサっ",

        "いくらくれんの？",

　　　 "グラム4万ね！",

        "逃がさねーぞ？こら！", 

        "銭湯に行ってくる！",

        "人生楽をして生きたい不良だもの",

        "へぇ〜！"


    return random[Math.floor(Math.random()*random.length)];

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
