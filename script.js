const bootLines=[
  ">>> INITIALIZING NODE",
  ">>> VERIFYING CHANNEL",
  ">>> OPERATOR SIGNATURE: ANU",
  ">>> LOADING SYSTEM LAYERS",
  ">>> ACCESS GRANTED"
];

const bootLog=document.getElementById("boot-log");
const system=document.getElementById("system");
let b=0;

function boot(){
  if(b<bootLines.length){
    bootLog.textContent+=bootLines[b++]+"\n";
    setTimeout(boot,500);
  }else{
    setTimeout(()=>{
      document.getElementById("boot").remove();
      system.classList.remove("hidden");
      activatePanels();
    },800);
  }
}
boot();

function activatePanels(){
  document.querySelectorAll(".panel").forEach((p,i)=>{
    setTimeout(()=>p.classList.add("active"),400*i);
  });
}

const capText={
  "STR-01":"Systemic foresight. Structural decision modeling.",
  "IDN-02":"Identity deployed as infrastructure.",
  "EXP-03":"Behavioral flow engineered under constraint.",
  "INT-04":"Interfaces calibrated for control.",
  "AUT-05":"Logic layers reducing human drag.",
  "CRD-06":"Directional coherence across systems."
};

document.querySelectorAll(".matrix li").forEach(li=>{
  li.onclick=()=>{
    li.parentElement.nextElementSibling.textContent=capText[li.dataset.id];
  };
});

const responses=[
  "COMPATIBILITY UNKNOWN",
  "REQUEST UNDER REVIEW",
  "OPERATOR RESPONSE PENDING",
  "CHANNEL ACCEPTED"
];

const input=document.getElementById("console-input");
const out=document.getElementById("console-output");

input.addEventListener("keydown",e=>{
  if(e.key==="Enter" && input.value){
    const msg=input.value;
    input.value="";
    out.textContent+="> "+msg+"\n";
    input.disabled=true;
    setTimeout(()=>{
      typeResponse(responses[Math.floor(Math.random()*responses.length)]);
    },600);
  }
});

function typeResponse(text){
  let i=0;
  const interval=setInterval(()=>{
    out.textContent+=text[i++];
    if(i>=text.length){
      clearInterval(interval);
      out.textContent+="\n";
      input.disabled=false;
    }
  },60);
}

function clock(){
  const d=new Date();
  document.getElementById("clock").textContent=d.toISOString().split("T")[1].split(".")[0];
}
setInterval(clock,1000);
clock();
