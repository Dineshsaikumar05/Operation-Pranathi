/* ==========================================
        PROJECT BLUE v5.0
        Complete Script
========================================== */

document.addEventListener("DOMContentLoaded", () => {

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

        let i = 0;

        const typing = setInterval(()=>{

            element.textContent += text.charAt(i);

            i++;

            if(i >= text.length){

                clearInterval(typing);

                element.style.borderRight = "none";

                resolve();

            }

        },speed);

    });

}

async function playRevealSequence(){

    if(revealPlayed) return;

    revealPlayed = true;

    if(revealPhoto){

        revealPhoto.classList.add("show");

    }

    await new Promise(r=>setTimeout(r,700));

    await typeWriter(revealTitle,55);

    await typeWriter(revealName,55);

    for(const line of revealLines){

        line.classList.add("show");

        await new Promise(r=>setTimeout(r,550));

    }

    if(revealButton){

        revealButton.classList.add("show");

    }

}

const revealObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            playRevealSequence();

        }

    });

},{
    threshold:.45
});

if(revealSection){

    revealObserver.observe(revealSection);

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

        progress.style.width = value + "%";

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
            CONTINUE BUTTONS
    ========================================== */

    const buttons = document.querySelectorAll(".next-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const next = button.dataset.next;
            const section = document.getElementById(next);

            if (section) {

                section.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        });

    });
    /* ==========================================
        CONTENT REVEAL ANIMATION
========================================== */

const contents = document.querySelectorAll(".content");

const contentObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:0.15

});

contents.forEach(content=>{

    contentObserver.observe(content);

});

/* ==========================================
            GIFT BOX
========================================== */

const gift = document.getElementById("giftBox");

if (gift) {

    gift.addEventListener("click", () => {

        gift.style.transform = "scale(.8)";

        setTimeout(() => {

            gift.style.transform = "scale(1.15)";

        }, 200);

        setTimeout(() => {

            gift.style.transform = "scale(1)";

        }, 400);

        setTimeout(() => {

            const reveal = document.getElementById("reveal");

            if (reveal) {

                reveal.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

                setTimeout(() => {

                    launchConfetti();
                    launchSparkles();

                }, 300);

            }

        }, 300);

    });

}

    /* ==========================================
            FLIP CARD SYSTEM
    ========================================== */

    const cards = document.querySelectorAll(".card");
    const cardsComplete = document.getElementById("cardsComplete");

    let openedCards = 0;

    cards.forEach(card => {

        card.addEventListener("click", () => {

            if (card.classList.contains("flipped")) return;

            card.classList.add("flipped");

            openedCards++;

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

            const letterBox = letterSection.querySelector(".letter-box");

            const lines = letterSection.querySelectorAll(".letter-line");

            // Show the letter card first
            letterBox.classList.add("show");

            // Reveal each paragraph one by one
            lines.forEach((line, index) => {

                setTimeout(() => {

                    line.classList.add("show");

                }, 700 + index * 350);

            });

        }

    });

}, {
    threshold: 0.4
});

if (letterSection) {

    letterObserver.observe(letterSection);

}
/* ==========================================
            MEMORY JAR
========================================== */

const memories = [

    "💭 We rarely met during childhood, but every family function quietly added another little memory.",

    "💭 One memorable conversation after schooling slowly became the beginning of a wonderful friendship.",

    "💭 Somewhere between sharing reels, random chats and everyday conversations, time simply flew by.",

    "💭 It's funny how the best friendships often grow from the simplest moments.",

    "💭 Hopefully this little birthday surprise becomes one more happy memory to look back on someday. 😊"

];

const memoryJar = document.getElementById("memoryJar");
const memoryText = document.getElementById("memoryText");
const memoryHelper = document.getElementById("memoryHelper");
const memoryProgress = document.getElementById("memoryProgress");

let currentMemory = 0;

if (memoryJar && memoryText) {

    // Initial state
    memoryText.classList.add("show");

    memoryJar.addEventListener("click", () => {
        // Magical particles

for(let i = 0; i < 10; i++){

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

        // Jar bounce animation
        memoryJar.style.transform = "scale(.88) rotate(-10deg)";

        setTimeout(() => {

            memoryJar.style.transform = "scale(1.12) rotate(8deg)";

        }, 120);

        setTimeout(() => {

            memoryJar.style.transform = "scale(1)";

        }, 240);

        // Hide current memory card
        memoryText.classList.remove("show");
        memoryText.classList.add("hide");

        setTimeout(() => {

            memoryText.innerHTML = memories[currentMemory];

            // Show new memory card
            memoryText.classList.remove("hide");
            memoryText.classList.add("show");

            currentMemory++;

            memoryProgress.textContent =
                `${currentMemory} / ${memories.length} Memories Unlocked`;

            if (currentMemory < memories.length) {

                memoryHelper.innerHTML = `
                    🫙 There are <strong>${memories.length} little memories</strong>
                    hidden inside.
                    <br><br>
                    <span id="memoryProgress">${currentMemory} / ${memories.length} Memories Unlocked</span>
                    <br><br>
                    👇 Tap the jar again to unlock another memory.
                `;

            } else {

                memoryHelper.innerHTML = `
                    ✅ <strong>${memories.length} / ${memories.length} Memories Unlocked</strong>
                    <br><br>
                    ✨ You've unlocked every memory in the jar.
                    <br>
                    Ready for the next chapter? 💙
                `;

                currentMemory = 0;

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

const timelineObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

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

let scannerPlayed = false;

const scannerObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !scannerPlayed){

            scannerPlayed = true;

            let progress = 0;

            const loading = setInterval(()=>{

                progress++;

                scanBar.style.width = progress + "%";

                if(progress >= 100){

                    clearInterval(loading);

                    const items = document.querySelectorAll(".scan-item");

                    const result = document.querySelector(".scan-result");

                    const lines = document.querySelectorAll(".scan-line");

                    /* Reveal scan items */

                    items.forEach((item,index)=>{

                        setTimeout(()=>{

                            item.classList.add("show");

                        },index*250);

                    });

                    /* Show report box */

                    setTimeout(()=>{

                        if(result){

                            result.classList.add("show");

                        }

                    },items.length*250+400);

                    /* Reveal report lines */

                    lines.forEach((line,index)=>{

                        setTimeout(()=>{

                            line.classList.add("show");

                        },

                        items.length*250+700+(index*350));

                    });

                }

            },20);

        }

    });

},{
    threshold:.5
});

if(scanner){

    scannerObserver.observe(scanner);

}

/* ==========================================
        CINEMATIC END SCREEN
========================================== */

const endSection = document.getElementById("end");

let endPlayed = false;

const endObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !endPlayed){

            endPlayed = true;

            const lines = document.querySelectorAll(".end-line");

            lines.forEach((line,index)=>{

                setTimeout(()=>{

                    line.classList.add("show");

                },index*700);

            });

        }

    });

},{
    threshold:.45
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

        if(entry.isIntersecting && !celebrationPlayed){

            celebrationPlayed = true;

            setTimeout(()=>{

                celebrationTitle.classList.add("show");

            },300);

            setTimeout(()=>{

                celebrationName.classList.add("show");

            },900);

            setTimeout(()=>{

                celebrationMessage.classList.add("show");

            },1500);

            setTimeout(()=>{

                celebrationButton.classList.add("show");

            },2200);

        }

    });

},{
    threshold:.45
});

if(celebration){

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

        cursorGlow.style.width = "52px";
        cursorGlow.style.height = "52px";
        cursorGlow.style.opacity = "1";

    });

    item.addEventListener("mouseleave",()=>{

        cursorGlow.style.width = "28px";
        cursorGlow.style.height = "28px";
        cursorGlow.style.opacity = ".85";

    });

});

});