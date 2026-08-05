/* ==========================================
        PROJECT BLUE v5.0
        Complete Script
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
   MOBILE PERFORMANCE MODE
========================================== */

const isMobile =
    window.matchMedia("(max-width:768px)").matches ||
    "ontouchstart" in window;

let scrollTimer = null;

function pauseAnimations() {

    if (!isMobile) return;

    document.body.classList.add("scrolling");

}

function resumeAnimations() {

    if (!isMobile) return;

    document.body.classList.remove("scrolling");

}

window.addEventListener("scroll", () => {

    pauseAnimations();

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(resumeAnimations, 150);

}, { passive:true });
/* ==========================================
        REVEAL ANIMATION
========================================== */

const revealSection = document.getElementById("reveal");

const revealPhoto = document.querySelector(".reveal-photo");
const revealTitle = document.querySelector(".reveal-title");
const revealName = document.querySelector(".reveal-name");
const revealLines = document.querySelectorAll(".reveal-line");
const revealButton = document.querySelector(".reveal-button");

let revealPlayed = false;

function typeWriter(element, speed = 40){

    if(!element) return Promise.resolve();

    const text = element.textContent;

    element.textContent = "";

    element.classList.add("show");

    return new Promise(resolve=>{

        let i=0;

        const typing=setInterval(()=>{

            element.textContent+=text.charAt(i);

            i++;

            if(i>=text.length){

                clearInterval(typing);

                element.style.borderRight="none";

                resolve();

            }

        },speed);

    });

}

async function playRevealSequence(){

    if(revealPlayed) return;

    revealPlayed=true;

    if(revealPhoto){

        revealPhoto.classList.add("show");

    }

    await new Promise(r => setTimeout(r,250));

    if (revealTitle) {
        revealTitle.classList.add("show");
    }

    await new Promise(r => setTimeout(r,250));

    await typeWriter(revealName,35);

    for(const line of revealLines){

        await new Promise(r=>setTimeout(r,120));

        line.classList.add("show");

    }

    if(revealButton){

        revealButton.classList.add("show");

    }

}

const revealObserver=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            playRevealSequence();

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.45
});

if(revealSection){

    revealObserver.observe(revealSection);

}
function smoothScrollTo(target, duration = 560, onComplete = null) {

    const start = window.pageYOffset;
    const end = target.offsetTop;
    const distance = end - start;

    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {

        if (!startTime) startTime = currentTime;

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const eased = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * eased);

        if (progress < 1) {

            requestAnimationFrame(animation);

        } else {

            if (typeof onComplete === "function") {
                onComplete();
            }

        }

    }

    requestAnimationFrame(animation);

}
    /* ==========================================
            PREMIUM LOADER
========================================== */

const loader = document.getElementById("loader");
const progress = document.querySelector(".progress");
const loadingValue = document.getElementById("loadingValue");
const loaderStatus = document.querySelector(".loader-status");

if (loader && progress) {

    let value = 0;

    const loading = setInterval(() => {

        value++;

        progress.style.transform = `scaleX(${value / 100})`;

        if (loadingValue) {
            loadingValue.textContent = value;
        }

        if (value >= 100) {

            clearInterval(loading);

            if (loaderStatus) {
                loaderStatus.textContent = "✨ Surprise Ready!";
            }

            setTimeout(() => {

                loader.style.opacity = "0";
                loader.style.pointerEvents = "none";

                setTimeout(() => {

                    loader.style.display = "none";

                }, 800);

            }, 700);

        }

    }, 30);

}

/* ==========================================
        CINEMATIC PAGE TRANSITION
========================================== */
let isNavigating = false;
const buttons = document.querySelectorAll(".next-btn");
const pageTransition = document.getElementById("pageTransition");
const celebrationOverlay = document.getElementById("celebrationOverlay");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        if (isNavigating) return;

        isNavigating = true;

        const next = button.dataset.next;
        const section = document.getElementById(next);

        if(!section) return;

        /* Award Button Celebration */
        if(next === "celebration" && celebrationOverlay){

            celebrationOverlay.classList.add("active");

            setTimeout(()=>{

                celebrationOverlay.classList.remove("active");

            },2200);

        }

        const nextContent = section.querySelector(".content");

        smoothScrollTo(section, 560, () => {

            requestAnimationFrame(() => {

                if (nextContent) {
                    nextContent.classList.add("show");
                }

                isNavigating = false;

            });

        });

 /*       pageTransition.classList.add("show");

        setTimeout(()=>{

            section.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        },220);

        setTimeout(()=>{

            pageTransition.classList.remove("show");

        },650);
*/

    });

});

/* ==========================================
            GIFT BOX
========================================== */

const gift = document.getElementById("giftBox");
const giftFlash = document.getElementById("giftFlash");

let giftOpening = false;

if (gift) {

    gift.addEventListener("click", () => {

        if (giftOpening) return;
        giftOpening = true;

        /* Instant Press Effect */
        gift.style.transform = "scale(0.96)";

        setTimeout(() => {

            gift.style.transform = "";
            gift.classList.add("open");

        }, 70);

        /* Flash starts almost immediately */
        if (giftFlash) {

            setTimeout(() => {

                giftFlash.classList.add("show");

            }, 100);

        }

        /* Move to reveal sooner */
        setTimeout(() => {

            const reveal = document.getElementById("reveal");

            if (!reveal) return;

            smoothScrollTo(reveal, 500, () => {

                playRevealSequence();

                setTimeout(() => {

                    launchConfetti();
                    launchSparkles();

                }, 120);

                giftOpening = false;

            });

        }, 320);

    });

}

/* ==========================================
        FLIP CARD SYSTEM
========================================== */

const cards = document.querySelectorAll(".card");
const cardsComplete = document.getElementById("cardsComplete");

let openedCards = 0;
const visitedCards = new Set();

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => {

            if (c !== card) {

                c.classList.remove("flipped");

            }

        });

        card.classList.toggle("flipped");

        if (!visitedCards.has(card)) {

            visitedCards.add(card);
            openedCards++;

        }

        if (openedCards === cards.length && cardsComplete) {

            setTimeout(() => {

                cardsComplete.classList.add("show");

                cardsComplete.scrollIntoView({

                    behavior: "smooth",
                    block: "center"

                });

            }, 700);

        }

    });

});
/* ==========================================
            LETTER REVEAL
========================================== */

const letterSection = document.getElementById("letter");

let letterPlayed = false;

const letterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting && !letterPlayed) {

            letterPlayed = true;
            letterObserver.unobserve(entry.target);

            const letterBox = letterSection.querySelector(".letter-box");

            const lines = letterSection.querySelectorAll(".letter-line");

            letterBox.classList.add("show");
            lines.forEach((line, index) => {

                setTimeout(() => {

                    line.classList.add("show");

                }, 700 + index * 350);

            });

        }

    });

}, {
    threshold: 0.12
});

if (letterSection) {

    letterObserver.observe(letterSection);

}
/* ==========================================
            MEMORY JAR
========================================== */

const memories = [

"💭 We may not have met every day, but every family gathering quietly added another little memory.",

"💭 Funny how one random conversation slowly turned into a friendship that now feels completely natural.",

"💭 Somewhere between sharing reels, random chats, and everyday conversations... time quietly flew by.",

"💭 The best friendships aren't built in a single day—they're built through countless little moments that often go unnoticed.",

"💭 Hopefully this little surprise becomes one more happy memory that brings a smile whenever you look back on it. 💙"

];

const memoryJar = document.getElementById("memoryJar");
const memoryText = document.getElementById("memoryText");
const memoryHelper = document.getElementById("memoryHelper");
const memoryProgress = document.getElementById("memoryProgress");
const memoryCard = document.querySelector(".memory-card");

let currentMemory = 0;

if (memoryJar && memoryText) {

    memoryText.classList.add("show");

    memoryJar.addEventListener("click", () => {

        const particleCount = window.innerWidth <= 768 ? 2 : 5;

        for(let i = 0; i < particleCount; i++){

            const particle = document.createElement("span");

            particle.className = "memory-particle";

            particle.style.left = "50%";
            particle.style.top = "50%";

            particle.style.setProperty(
                "--x",
                (Math.random()*140-70)+"px"
            );

            particle.style.setProperty(
                "--y",
                (-Math.random()*120-30)+"px"
            );

            memoryJar.appendChild(particle);

            setTimeout(()=>{

                particle.remove();

            },900);

        }

        memoryJar.style.transform = "scale(.96)";

        setTimeout(() => {

            memoryJar.style.transform = "scale(1)";

        },160);
        memoryText.classList.remove("show");
        memoryText.classList.add("hide");

        setTimeout(() => {

            memoryText.innerHTML = memories[currentMemory];
            memoryText.classList.remove("hide");
            memoryText.classList.add("show");

            if (window.innerWidth > 768) {

                setTimeout(() => {

                    memoryText.scrollIntoView({

                        behavior: "smooth",
                        block: "center"

                    });

                },150);

            }

            currentMemory++;

            memoryProgress.textContent =
                `${currentMemory} / ${memories.length} Memories Unlocked`;
                memoryProgress.style.transform = "scale(1.05)";

                setTimeout(() => {

                    memoryProgress.style.transform = "scale(1)";

                }, 250);

                if (currentMemory < memories.length) {

                    memoryHelper.innerHTML = `
                        🫙 There are <strong>${memories.length} little memories</strong>
                        hidden inside.
                        <br><br>
                        👇 Tap the jar again to unlock another memory.
                    `;

                } else {

                memoryHelper.innerHTML = `
                    ✨ You've unlocked every memory in the jar.
                    <br><br>
                    Ready for the next chapter 💙
                `;
                launchConfetti();
                launchSparkles();
                memoryJar.style.pointerEvents = "none";
                memoryJar.style.opacity = ".7";
                memoryJar.classList.add("completed");
                if(window.innerWidth <= 768){

                    document.querySelector(".progress-counter").style.display = "none";

                    document
                        .querySelector(".memory-continue")
                        .classList.add("show");

                }

            }

        }, 300);

    });

}
/* ==========================================
        BIRTHDAY CONFETTI
========================================== */

const confettiContainer = document.getElementById("birthdayConfetti");

let confettiPlayed = false;

function launchConfetti(){

    if(confettiPlayed || !confettiContainer) return;

    confettiPlayed = true;

    const colors = [

        "#7DD3FC",
        "#60A5FA",
        "#BFDBFE",
        "#FFFFFF"

    ];

    for(let i = 0; i < 18; i++){

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDelay =
            (Math.random() * 0.4) + "s";

        piece.style.animationDuration =
            (2 + Math.random()) + "s";

        piece.style.transform =
            `translateY(-40px) rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 3500);

    }

}

/* ==========================================
        BIRTHDAY SPARKLES
========================================== */

function launchSparkles(){

    if(!confettiContainer) return;

    for(let i = 0; i < 28; i++){

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left = Math.random() * 100 + "%";

        sparkle.style.top = (35 + Math.random() * 35) + "%";

        sparkle.style.animationDelay =
            (Math.random() * 0.8) + "s";

        confettiContainer.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 3000);

    }

}
/* ==========================================
        TIMELINE ANIMATION
========================================== */

const timelineItems = document.querySelectorAll(".timeline-item");
const timeline = document.querySelector(".timeline");

const timelineObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            timelineObserver.unobserve(entry.target);

            if(timeline){

                timeline.classList.add("draw");

            }

        }

    });

},{

    threshold:0.25

});

timelineItems.forEach(item=>{

    timelineObserver.observe(item);

});
/* ==========================================
        PERSONALITY SCANNER
========================================== */

const scanner = document.getElementById("scanner");
const scanBar = document.querySelector(".scan-progress-fill");

const scanItems = document.querySelectorAll(".scan-item");
const scanLines = document.querySelectorAll(".scan-line");
const scanResult = document.querySelector(".scan-result");

let scannerPlayed = false;

const scannerObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !scannerPlayed){

            scannerPlayed = true;

            scannerObserver.unobserve(entry.target);

            scanBar.style.width = "100%";

            setTimeout(()=>{

                scanItems.forEach((item,index)=>{

                    setTimeout(()=>{

                        item.classList.add("show");

                    },index*140);

                });

                setTimeout(()=>{

                    if(scanResult){

                        scanResult.classList.add("show");

                    }

                },scanItems.length*140+180);

                scanLines.forEach((line,index)=>{

                    setTimeout(()=>{

                        line.classList.add("show");

                    },scanItems.length*140+300+(index*170));

                });

            },1500);

        }

    });

},{
    threshold:.5
});

if(scanner){

    scannerObserver.observe(scanner);

}

/* ==========================================
        END SCREEN REVEAL
========================================== */

const endSection = document.getElementById("end");
const endLines = document.querySelectorAll(".end-line");
const shootingStar = document.querySelector(".shooting-star");

let endPlayed = false;

const endObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !endPlayed){

            endPlayed = true;

            endObserver.unobserve(entry.target);

            endLines.forEach((line,index)=>{

                setTimeout(()=>{

                    line.classList.add("show");

                    if(index === endLines.length-1){

                        setTimeout(()=>{

                            shootingStar?.classList.add("show");

                        },900);

                    }

                },index*700);

            });

        }

    });

},{
    threshold:.35
});

if(endSection){

    endObserver.observe(endSection);

}
/* ==========================================
        AWARD ANIMATION
========================================== */

const awardSection = document.querySelector(".award");
const awardContent = document.querySelector(".award .content");

let awardPlayed = false;

const awardObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !awardPlayed){

            awardPlayed = true;
            awardObserver.unobserve(entry.target);

            awardContent.classList.add("show");

        }

    });

},{
    threshold:0.45
});

if(awardSection){

    awardObserver.observe(awardSection);

}

/* ==========================================
        CELEBRATION ANIMATION
========================================== */

const celebration = document.getElementById("celebration");

const celebrationTitle = document.querySelector(".celebration-title");
const celebrationName = document.querySelector(".celebration-name");
const celebrationMessage = document.querySelector(".celebration-message");
const celebrationButton = document.querySelector(".celebration-button");

let celebrationPlayed = false;

const celebrationObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting || celebrationPlayed) return;

        celebrationPlayed = true;

        celebrationObserver.unobserve(entry.target);

        launchBlueConfetti();

        if (celebrationTitle) {
            setTimeout(() => celebrationTitle.classList.add("show"), 300);
        }

        if (celebrationName) {
            setTimeout(() => celebrationName.classList.add("show"), 900);
        }

        if (celebrationMessage) {
            setTimeout(() => celebrationMessage.classList.add("show"), 1500);
        }

        if (celebrationButton) {
            setTimeout(() => celebrationButton.classList.add("show"), 2200);
        }

    });

},{
    threshold:0.45
});

if (celebration) {

    celebrationObserver.observe(celebration);

}
/* ==========================================
        TYPEWRITER EFFECT
========================================== */

const typewriters = document.querySelectorAll(".typewriter");

const typeObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("start");
            typeObserver.unobserve(entry.target);

        }

    });

},{

    threshold:.5

});

typewriters.forEach(item=>{

    typeObserver.observe(item);

});
/* ==========================================
        PREMIUM CURSOR GLOW
========================================== */
/*
const cursorGlow = document.getElementById("cursorGlow");

if(cursorGlow){

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animateCursor(){

        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;

        cursorGlow.style.left = currentX + "px";
        cursorGlow.style.top = currentY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

}
const hoverElements = document.querySelectorAll(
    "button, .card, .memory-jar, .timeline-content"
);

hoverElements.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursorGlow.style.width = "58px";
        cursorGlow.style.height = "58px";
        cursorGlow.style.opacity = "1";
        cursorGlow.style.filter = "blur(7px)";

    });

    item.addEventListener("mouseleave",()=>{

        cursorGlow.style.width = "34px";
        cursorGlow.style.height = "34px";
        cursorGlow.style.opacity = ".9";
        cursorGlow.style.filter = "blur(4px)";

    });

});
/* ==========================================
        HERO WAVE
========================================== */

function waveHeroHand(){

    const hand = document.getElementById("heroWave");

    if(!hand) return;

    hand.animate([

        { transform:"rotate(0deg)" },
        { transform:"rotate(18deg)" },
        { transform:"rotate(-12deg)" },
        { transform:"rotate(18deg)" },
        { transform:"rotate(-8deg)" },
        { transform:"rotate(12deg)" },
        { transform:"rotate(0deg)" }

    ],{

        duration:1400,
        easing:"ease-in-out"

    });

}
window.addEventListener("load", () => {

    setTimeout(() => {

        waveHeroHand();

    }, 800);

});
/* ==========================================
        PREMIUM CONFETTI
========================================== */

function launchBlueConfetti(){

    const container=document.getElementById("confettiContainer");

    if(!container) return;

    const colors=[
        "#60A5FA",
        "#7DD3FC",
        "#A5D8FF",
        "#FFFFFF"
    ];

    for(let i=0;i<70;i++){

        const piece=document.createElement("span");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"%";

        piece.style.background=
            colors[Math.floor(Math.random()*colors.length)];

        piece.style.animationDelay=
            Math.random()*1.2+"s";

        piece.style.transform=
            `rotate(${Math.random()*360}deg)`;

        container.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },4000);

    }

}

});