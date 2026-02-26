function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

const slides = qsa(".hero__slide");
const prev = qs("#heroPrev");
const next = qs("#heroNext");
const dotsWrap = qs("#heroDots");

let idx = 0;
let timer = null;

function buildDots(){
  if(!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "hero__dot" + (i === 0 ? " is-active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para slide ${i+1}`);
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });
}

function setActive(i){
  slides.forEach(s => s.classList.remove("is-active"));
  const dots = qsa(".hero__dot");
  dots.forEach(d => d.classList.remove("is-active"));

  if(slides[i]) slides[i].classList.add("is-active");
  if(dots[i]) dots[i].classList.add("is-active");
}

function go(i, userAction=false){
  if(!slides.length) return;
  idx = (i + slides.length) % slides.length;
  setActive(idx);
  if(userAction) restartAuto();
}

function startAuto(){
  if(timer) clearInterval(timer);
  timer = setInterval(()=> go(idx + 1), 6500);
}

function restartAuto(){
  startAuto();
}

prev?.addEventListener("click", () => go(idx - 1, true));
next?.addEventListener("click", () => go(idx + 1, true));

buildDots();
setActive(0);
startAuto();

// Cupom modal (opcional — se existir na página)
const modal = qs("#couponModal");
const openBtn = qs("#openCoupon");

function openCoupon(){ modal?.setAttribute("aria-hidden","false"); }
function closeCoupon(){ modal?.setAttribute("aria-hidden","true"); }
window.closeCoupon = closeCoupon;

openBtn?.addEventListener("click", openCoupon);
modal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close !== undefined) closeCoupon();
});
qsa("[data-close]").forEach(el => el.addEventListener("click", closeCoupon));
