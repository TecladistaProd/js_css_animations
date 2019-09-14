import $ from "./query";
import wait from "./wait";

import { Back, Power3, Elastic } from "gsap/TweenMax";
import { TimelineMax, TweenLite } from "gsap/all";
import { Power2 } from "gsap";

const menuAnim = new TimelineMax({ paused: true });

const textA = new TimelineMax({ paused: true });

window.addEventListener("resize", addAnim);

addAnim();

$(".fa.menu").addEventListener("click", e => {
  e.preventDefault();
  const { target } = e;
  const { innerText: txt } = target;
  if (txt.charCodeAt(0).toString(16) === "f00d") {
    target.innerText = "\uf0c9";
    menuAnim.reverse();
  } else if (txt.charCodeAt(0).toString(16) === "f0c9") {
    target.innerText = "\uf00d";
    menuAnim.play();
  }
});

function addAnim() {
  if (window.innerWidth <= 700) {
    menuAnim.from($(".p-header nav ul"), 1, {
      backgroundColor: "transparent",
      top: "-100rem",
      opacity: 0,
      display: "none",
      borderTop: "none"
    });
    menuAnim.to(
      $(".p-header nav ul"),
      1.7,
      {
        borderTop: "1px solid #33cddc",
        backgroundColor: "rgba(50,111,207,0.94118)",
        top: "4rem",
        opacity: 1,
        display: "block",
        // ease: Power2.easeOut
        ease: Elastic.easeInOut.config(0.4, 0.2)
      },
      "-=1"
    );
  } else {
    menuAnim.clear(true);
    $(".p-header nav ul").style = "";
  }
}

$(".p-header nav ul li").forEach((i, k) => {
  i.addEventListener("click", () => i.querySelector("a").click());
  i.querySelector("a").addEventListener("click", async e => {
    e.preventDefault();

    let mn = $(".fa.menu");

    if (mn.innerText.charCodeAt(0).toString(16) === "f00d") {
      mn.innerText = "\uf0c9";
      menuAnim.reverse();
      await wait(200);
    }

    $(".p-header nav ul li").forEach(el => el.classList.remove("active"));

    location.hash = e.target.dataset.to.replace("#", "#/");

    i.classList.add("active");

    let time =
      Math.abs(window.pageYOffset - $(e.target.dataset.to).offsetTop) /
      window.innerHeight;
    TweenLite.to(window, time * 0.9, {
      scrollTo: $(e.target.dataset.to).offsetTop,
      ease: Back.easeInOut.config(3)
    });
  });
});

let inner = "";

let modalAnim = new TimelineMax({
  paused: true,
  onComplete: () => {
    $(".modal .modal-content").innerHTML += inner;

    $(".modal .close").addEventListener("click", () => {
      setTimeout(() => {
        $(".modal .modal-content *:not(.close)").forEach(i =>
          i.parentElement.removeChild(i)
        );
      }, 300);
      modalAnim.reverse();
    });

    inner = "";
  }
});

modalAnim.from($("body"), 0, {
  overflow: "auto"
});

modalAnim.from($(".modal"), 0.5, {
  display: "block",
  opacity: 0,
  top: "250vh"
});

modalAnim.from($(".modal .modal-content"), 0.7, {
  height: 0,
  width: "0%",
  opacity: 0
});

modalAnim.to($("body"), 0, {
  overflow: "hidden"
});

modalAnim.to($(".modal"), 1, {
  display: "flex",
  opacity: 1,
  top: 0,
  ease: Power3.easeInOut
});

modalAnim.to($(".modal .modal-content"), 0.5, {
  opacity: 1,
  width: "75%"
});

modalAnim.to($(".modal .modal-content"), 1, {
  height: "75%",
  ease: Elastic.easeInOut.config(0.4, 0.3)
});

$("#products .list .card").forEach(i =>
  i.querySelector("button").addEventListener("click", () => {
    if (!modalAnim.isActive()) {
      modalAnim.play();
    }

    inner = i.innerHTML.replace(/<button>See More<\/button>/gm, "");
  })
);

let emailAnim = new TimelineMax({ paused: true });

emailAnim.from($("#contact form"), 0.5, {
  display: "none",
  height: "0px",
  opacity: 0
});

emailAnim.to($("#contact form"), 0.9, {
  display: "",
  height: "auto",
  opacity: 1
});

$("#contact form label").forEach((i, k) => {
  emailAnim.from(i, 0.5, {
    left: "-1000px",
    display: "none",
    opacity: 0
  });
  emailAnim.to(i, 0.2, {
    left: "-1000px"
  });
  emailAnim.to(i, 0.7, {
    left: "0px",
    opacity: 1,
    ease: Back.easeInOut.config(3)
  });
  emailAnim.from(i.querySelector("input, textarea"), 0.5, {
    width: "0%",
    opacity: 0
  });
  emailAnim.to(i.querySelector("input, textarea"), 0.3, {
    opacity: 1
  });
  emailAnim.to(i.querySelector("input, textarea"), 0.7, {
    width: "100%",
    ease: Back.easeInOut.config(3)
  });
});

emailAnim.from($("#contact form button"), 0.7, {
  left: "-1000px",
  width: "5%",
  color: "transparent"
});
emailAnim.to($("#contact form button"), 0.5, {
  color: "transparent",
  width: "5%",
  left: "0px"
});
emailAnim.to($("#contact form button"), 0.7, {
  width: "100%",
  color: "#fff",
  ease: Back.easeInOut.config(0.5)
});

$("#email").addEventListener("click", () => {
  if (emailAnim.progress() === 0) emailAnim.play();
  else if (emailAnim.progress() === 1) emailAnim.reverse();
});

$("#contact form").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  emailAnim.reverse();
});

if ($(`[data-to="${location.hash.replace("#/", "#")}"]`).click)
  $(`[data-to="${location.hash.replace("#/", "#")}"]`).click();

window.addEventListener("scroll", async () => {
  const { isInView } = await import("./helpers");
  console.clear();
  let page;
  for (page of $(".page")) {
    if (isInView(page, 0.75)) {
      location.hash = `#/${page.id}`;
      for (let li of $(".p-header nav ul li")) {
        li.classList.remove("active");
        if (li.querySelector("a").dataset.to === `#${page.id}`)
          li.classList.add("active");
      }
      break;
    }
  }
});
