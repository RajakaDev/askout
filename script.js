let yesScale = 1;
let noScale = 1;
let musicStarted = false;
const secretCode = "LOVE";

function goScene(n){
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));

  const target = document.getElementById("scene" + n);
  if(!target) return;

  // ❤️ Start heart rain from Scene 3 onward (never stops)
  if(n >= 3){
    startHeartRain();
  }

  target.classList.add("active");
  gsap.from(target,{ opacity:0, scale:0.9, duration:0.9 });
}

function checkCode(){
  const input = codeInput.value.toUpperCase();
  if(input === secretCode){
    errorBox.style.display="none";
    goScene(2);
    startCountdown();
  }else{
    errorBox.style.display="block";
    gsap.from(codeInput,{x:-8,repeat:4,yoyo:true});
    setTimeout(()=>errorBox.style.display="none",5000);
  }
}

function startCountdown(){
  let c=5;
  heartbeat.play();
  const t=setInterval(()=>{
    countdown.innerText=c--;
    if(c<0){
      clearInterval(t);
      heartbeat.pause();
      goScene(3);
    }
  },1000);
}

function noClick(){
  yesScale+=0.4;
  noScale=Math.max(0.3,noScale-0.15);

  gsap.to(yesBtn,{scale:yesScale});
  gsap.to(noBtn,{scale:noScale});

  noMessage.innerText="You are breaking my heart 💔";
  emotionImg.src="images/sad2.gif";

  navigator.vibrate?.(80);
}

function yesClick(){
  heartBurst();
  goScene(4);
}

function heartBurst(){
  for(let i=0;i<25;i++){
    const h=document.createElement("div");
    h.innerText="❤️";
    h.style.position="absolute";
    h.style.left=Math.random()*100+"vw";
    h.style.top="100vh";
    document.body.appendChild(h);
    gsap.to(h,{y:"-120vh",opacity:0,onComplete:()=>h.remove()});
  }
}

function startHeartRain(){
  const container = document.getElementById("heartRain");
  if(container.dataset.running) return; // prevent duplicates
  container.dataset.running = "true";

  setInterval(()=>{
    const heart = document.createElement("div");
    heart.className = "heart-drop";
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 28 + "px";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";
    container.appendChild(heart);

    setTimeout(()=>heart.remove(),7000);
  },120);
}

function openEnvelope(){
  gsap.to(".flap",{rotateX:180,duration:.8});
  heartBurst();
  setTimeout(()=>{
    letterPopup.style.display="block";
    typeLetter();
  },600);
}

function typeLetter(){
  const text=`Hey My Love Rashmi❤️

I just can’t stop thinking about how amazing you are.
You’re honestly so attractive but it’s more than just that.
There’s something about you that stays on my mind all the time.
I like you for so many reasons.
The way you light up everything around you.
Your smile just makes everything better.

But no pressure, okay?
You don't have to feel the same way 
I just need to get this off my chest for 
my own peace of mind.

take care`;
  let i=0;
  letterText.textContent="";
  const t=setInterval(()=>{
    letterText.textContent+=text[i++];
    if(i>=text.length)clearInterval(t);
  },100);
}

function animateScene4Text(){
  const whisper = document.getElementById("whisperText");
  const love = document.getElementById("loveText");

  if(!whisper || !love) return;

  // reset (important when coming back)
  whisper.classList.remove("reveal");
  love.classList.remove("reveal");
  love.classList.add("hidden");

  // first text
  setTimeout(()=>{
    whisper.classList.add("reveal");
  },300);

  // second text after first finishes
  setTimeout(()=>{
    love.classList.remove("hidden");
    love.classList.add("reveal");
  },2300);
}