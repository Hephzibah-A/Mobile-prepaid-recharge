
function heroAnimation() {
    var tl = gsap.timeline();

    tl.from("header a", {
        y: -50,
        duration: 0.6,
        delay: 0.5,
        ease: "sine.out",
        opacity: 0,
    })

    tl.from("nav ul li", {
        y: -50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
        stagger: 0.3,
    })

    tl.from("nav button", {
        y: -50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
    })

    tl.from(".hero-text h1", {
        x: -50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
    }, "-=0.3")

    tl.from(".hero-text p", {
        x: -50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
    })

    tl.from(".hero-text button", {
        x: -50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
    })

    tl.from(".hero-image img", {
        x: 50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
    }, "-=0.5")

    tl.from(".clientlogo img", {
        x: 50,
        duration: 0.7,
        opacity: 0,
        ease: "sine.out",
        stagger: 0.3,
    })
}
function serviceAnimation() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".services",
            scroller: "body",
            start: "top 50%",
            end: "top 10%",
            scrub: 2,
        }
    })

    tl2.from(".serviceText", {
        x: -200,
        duration: 0.5,
        opacity: 0,
    })
    tl2.from(".servicebox1", {
        x: -300,
        duration: 1,
        opacity: 0,
    }, "serviveRow1")
    tl2.from(".servicebox2", {
        x: 300,
        duration: 1,
        opacity: 0,
    }, "serviveRow1")

    tl2.from(".servicebox3", {
        x: -300,
        duration: 1,
        opacity: 0,
    }, "serviveRow2")
    tl2.from(".servicebox4", {
        x: 300,
        duration: 1,
        opacity: 0,
    }, "serviveRow2")
}

function casestudyAnimation() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".casestudies",
            scroller: "body",
            start: "top 80%",
            end: "top 10%",
            scrub: 2,
        }
    })
    tl2.from(".caseText", {
        x: -200,
        duration: 0.5,
        opacity: 0,
    })
    tl2.from(".casestudy-col", {
        y: -300,
        duration: 1,
        opacity: 0,
    })
}

function Accordion() {
    document.querySelectorAll("details").forEach(details => {
        details.addEventListener("toggle", () => {
            const arrowUp = details.querySelector(".arrow-up");
            const arrowDown = details.querySelector(".arrow-down");

            if (details.open) {
                arrowUp.style.display = "block";
                arrowDown.style.display = "none";
            } else {
                arrowUp.style.display = "none";
                arrowDown.style.display = "block";
            }
        });
    });
}

function ProcessAnimation() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".process",
            scroller: "body",
            start: "top 80%",
            end: "top 10%",
            scrub: 2,
        }
    })
    tl2.from(".processText", {
        x: -200,
        duration: 0.5,
        opacity: 0,
    })
    tl2.from(".accordion-item", {
        y: 300,
        duration: 2,
        opacity: 0,
    })
}

function teamAnimation() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".team",
            scroller: "body",
            start: "top 80%",
            end: "top 10%",
            scrub: 2,
        }
    })
    tl2.from(".teamText", {
        x: -200,
        duration: 0.5,
        opacity: 0,
    })
    tl2.from("#team1", {
        x: -300,
        duration: 1,
        opacity: 0,
    }, "teamRow1")
    tl2.from("#team2", {
        y: 0,
        duration: 1,
        opacity: 0,
    }, "teamRow1")
    tl2.from("#team3", {
        x: 300,
        duration: 1,
        opacity: 0,
    }, "teamRow1")
    tl2.from("#team4", {
        x: -300,
        duration: 1,
        opacity: 0,
    }, "teamRow2")
    tl2.from("#team5", {
        y: 0,
        duration: 1,
        opacity: 0,
    }, "teamRow2")
    tl2.from("#team6", {
        x: 300,
        duration: 1,
        opacity: 0,
    }, "teamRow2")
}

function contactAnimation() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact",
            scroller: "body",
            start: "top 80%",
            end: "top 10%",
            scrub: 2,
        }
    })
    tl2.from(".contactText", {
        x: -200,
        duration: 0.5,
        opacity: 0,
    })
    tl2.from(".contactform", {
        x: 0,
        duration: 3,
        opacity: 0,
    })
}


heroAnimation()
serviceAnimation()
casestudyAnimation()
Accordion()
ProcessAnimation()
teamAnimation()
contactAnimation()

