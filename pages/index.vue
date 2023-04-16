<script setup>
import { icon } from '@fortawesome/fontawesome-svg-core';
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

const blob = ref(null);
const bg = ref(null);

const firstTextStyle = ref({
  opacity: "1",
  right: "0px"
});
let blobTop = 0;
let blobScrollEnabled = true;

function createFirstBG()
{
  let video = document.createElement("video");
  video.id = 'bgVideo';
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.muted = true;
  video.setAttribute("v-motion-fade", "");

  let webmSource = document.createElement("source");
  let mp4Source = document.createElement("source")

  webmSource.src = "/fullbgloop.webm";
  webmSource.type = "video/webm";

  mp4Source.src = "/fullbgloop.mp4";
  mp4Source.type = "video/mp4";

  video.appendChild(webmSource);
  video.appendChild(mp4Source);

  return video;
}

const SCROLLBAR_STYLE = `
[data-scrollbar] {
  display: block;
  position: relative;
}
.scroll-content {
  display: flow-root;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.scrollbar-track {
  position: absolute;
  opacity: 0;
  z-index: 1;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-transition: opacity 0.5s 0.5s ease-out;
          transition: opacity 0.5s 0.5s ease-out;
  background-image: initial;
  background-color: rgba(0, 0, 0, 0.5);
}
.scrollbar-track.show,
.scrollbar-track:hover {
  opacity: 1;
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}

.scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-image: initial;
  background-color: rgba(51, 55, 58, 0.75);
  border-radius: 4px;
}

.scrollbar-track-y {
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
}

.scrollbar-track-x {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
}
`;
const STYLE_ID = 'smooth-scrollbar-style';

var time = 0;
var time2 = 0;
var time3 = 0;
var time4 = 0;
var bgTime = 0;

class DisableScrollPlugin extends ScrollbarPlugin {
  static pluginName = 'disableScroll';

  static defaultOptions = {
    direction: '',
  };

  transformDelta(delta) {
    if (this.options.direction) {
      delta[this.options.direction] = 0;
    }

    return { ...delta };
  }
}

function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function handleParallax() {
  var sc = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10)
  var target = document.getElementById("bgVideo");
  var header = document.getElementById("header");
  var gradientBG = document.getElementById("gradientBG");
  
  if (sc > -1360)
  {
    gradientBG.style.top = `${-sc}px`;
  }

  var factor = 0.6;
  var headerFactor = 0.6;

  var yvalue = sc * -factor;

  if (yvalue < 810)
  {
    target.style.top = `${yvalue}px`;
  }
  if ((sc * -headerFactor + ((window.innerHeight/2)-20)) < 810)
  {
    header.style.top = `${sc * -headerFactor + ((window.innerHeight/2)-20)}px`;
  }
}


// animations are gay
function handleHeaderAnimation(oldval) {
  // ok, time for some huge ass fucking d ocumentation so I don't forget
  // first I get the current scroll value, kinda like scrollTop (since I am using smoothscrollbar, i get the transform)
  // i also get the oldvalue to compare whether we are scrolling up or down
  var currentValue = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10);
  var oldValue = parseInt(oldval.split(", ")[1], 10);

  // then i get each individual element and parse the current styles i want to change as floats
  var buttons  = document.getElementById("buttons");
  var btnOpacity = parseFloat(buttons.style.opacity);

  var firstText = document.getElementById("firstText");
  var firstRight = parseFloat(firstText.style.right);
  var firstOpacity = parseFloat(firstText.style.opacity);

  var secondText = document.getElementById("secondText");
  var secondLeft = parseFloat(secondText.style.left);
  var secondOpacity = parseFloat(secondText.style.opacity);

  var thirdText  = document.getElementById("subText");
  var thirdOpacity = parseFloat(thirdText.style.opacity);

  if (oldValue > currentValue) {
    // each animation occurs at a specific scroll position, i might have to figure out how to use the dynamically
    // if we are past 350, trigger the first text
    if (currentValue < -350)
    {
      if (!(firstOpacity < 0 && firstRight > 385)) {
        firstText.style.opacity = (easeInOutQuad(time, 1, 0.1, 1)).toString();
        firstText.style.right = `${easeInOutQuad(time, 0, -10, 1)}px`;
        time += 0.1;
      } else {
        time = 0;
      }

      console.log(`time: ${time}`, `right: ${firstText.style.right}`);
    }

    // animate second text to right fade
    if (currentValue < -550)
    {
      if (!(secondOpacity <= 0 && secondLeft >= 385)) {
        secondText.style.opacity = (easeInOutQuad(time2, 1, 0.1, 1)).toString();
        secondText.style.left = `${easeInOutQuad(time2, 0, -10, 1)}px`;
        time2 += 0.1;
      } else {
        time2 = 0;
      }

      console.log(`time2: ${time2}`, `left: ${secondText.style.left}`);
    }

    // animate subtex to regular fade
    if (currentValue < -700)
    {
      console.log(`time3: ${time3}`);

      if (!(thirdOpacity <= 0))
      {
        thirdText.style.opacity = (easeInOutQuad(time3, 1, 0.1, 1)).toString();
        time3 += 0.1;
      } else {
        time3 = 0;
      }
    }

    if (currentValue < -850)
    {
      console.log(`time4: ${time4}`);

      if (!(btnOpacity <= 0))
      {
        buttons.style.opacity = (easeInOutQuad(time4, 1, 0.1, 1)).toString();
        time4 += 0.1;
      } else {
        time4 = 0;
      }
    }
  }

  if (oldValue < currentValue)
  {
    if (!(firstOpacity > 1 && firstRight < 0))
    {
      firstText.style.opacity = (easeInOutQuad(time, 0, -0.1, 1)).toString();
      firstText.style.right = `${easeInOutQuad(time, 105, 10, 1)}px`;
      time += 0.1;
    } else {
      time = 0;
    }

    if (!(secondOpacity >= 1 && secondLeft <= 0))
    {
      secondText.style.opacity = (easeInOutQuad(time2, 0, -0.1, 1)).toString();
      secondText.style.left = `${easeInOutQuad(time2, 105, 10, 1)}px`;
      time2 += 0.1;
    } else {
      time2 = 0;
    }

    if (!(thirdOpacity >= 1))
    {
      thirdText.style.opacity = (easeInOutQuad(time3, 0, -0.1, 1)).toString();
      time3 += 0.1;
    } else {
      time3 = 0;
    }

    if (!(btnOpacity >= 1))
    {
      buttons.style.opacity = (easeInOutQuad(time4, 0, -0.1, 1)).toString();
      time4 += 0.1;
    } else {
      time4 = 0;
    }
  }
}

function handlePageTransition(oldval) {
  var currentValue = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10);
  var oldValue = parseInt(oldval.split(", ")[1], 10);

  var firstBG = document.getElementById("bgVideo");
  var secondBG = document.getElementById("gradientBG");

  var firstOpacity = parseFloat(firstBG.style.opacity);
  var secondOpacity = parseFloat(secondBG.style.opacity);

  var factor = 0.1;

  console.log("current:", currentValue);
  console.log("old:", oldValue)

  if (oldValue > currentValue)
  {
    if (!(firstOpacity < 0 && secondOpacity > 1)) {
      console.log("scrolling down")
      //console.log("first", firstOpacity - (-factor * ((currentValue - oldValue) / 100)));
      //console.log("second", secondOpacity + (-factor * ((currentValue - oldValue) / 100)));

      firstBG.style.opacity = firstOpacity - (-factor * ((currentValue - oldValue) / 100));
      secondBG.style.opacity = secondOpacity + (-factor * ((currentValue - oldValue) / 100));
    }
  }
  
  if (oldValue < currentValue) {
    console.log("scrolling up")
    if (!(firstOpacity > 1 && secondOpacity < 0)) {
      // console.log("first", firstOpacity + (-factor * ((oldValue - currentValue) / 100)));
      // console.log("second", secondOpacity - (-factor * ((oldValue - currentValue) / 100)));

      firstBG.style.opacity = firstOpacity + (-factor * ((oldValue - currentValue) / 100));
      secondBG.style.opacity = secondOpacity - (-factor * ((oldValue - currentValue) / 100));
    }
  }
}

function handleBlobScroll(oldval) {
  if (blobScrollEnabled) {
    let offsetY = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10);
    let thing = 0;
    if (offsetY > oldval)
    {
      thing = blobTop+offsetY;
    } else {
      thing = blobTop-offsetY;
    }

    if (thing < document.documentElement.clientHeight * 2)
    {
      thing = 0;
    }

    blob.value.animate({
      top: `${thing}px`
    }, { duration: 3000, fill: 'forwards' });
  }
}

const iconAmounts = ref(2);
const hasMid = ref(0);
const many = ref(iconAmounts.value - hasMid.value);
const iconTan = ref(Math.tan(Math.PI/many.value));

onMounted(() => {
  // load the plugin
  Scrollbar.use(DisableScrollPlugin);
  Scrollbar.use(OverscrollPlugin);
  Scrollbar.init(document.querySelector('#app'), {
    plugins: {
      disableScroll: {
        direction: 'x',
      },
      overscroll: {
        effect: 'glow'
      }
    },
    damping: 0.05
  });
  Scrollbar.detachStyle();

  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = SCROLLBAR_STYLE;

  document.head.appendChild(styleEl);

  // our custom scroll event lmao
  var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
        handleParallax();
        handleHeaderAnimation(mutationRecord.oldValue);
        handlePageTransition(mutationRecord.oldValue);
        // handleBlobScroll(mutationRecord.oldValue);
      });    
  });
  observer.observe(document.getElementsByClassName('scroll-content')[0], { attributes : true, attributeFilter : ['style'], attributeOldValue: true })

  document.addEventListener("mousemove", (event) => {
    blobScrollEnabled = false;
    let offsetY = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10) | 0;
    blobTop = event.clientY - offsetY;

    if (blobTop < document.documentElement.clientHeight * 2)
    {
      blobTop = 0;
    }
    blob.value.animate({
      left: `${event.clientX}px`,
      top: `${event.clientY}px`
    }, { duration: 3000, fill: 'forwards' });
    setTimeout(() => {
      blobScrollEnabled = true;
    }, 3000);
  })

  let body = document.querySelector("body");
  body.style.overflowX = "hidden";
  body.style.margin = 0;
  body.classList = "darkScrollbar"

  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  // let gyroscope = new Gyroscope({ frequency: 60 });

  // gyroscope.addEventListener("reading", (event) => {
  //   let offsetY = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10);
  //   blob.value.animate({
  //     left: `${event.x}px`,
  //     top: `${event.y}px`
  //   }, { duration: 3000, fill: 'forwards' });
  // });
  // gyroscope.start();
});
</script>

<template>
  <div id="app">
    <div 
        v-motion-fade
        id="overlay">
      </div>
    <div id="page1">
      <div id="navbar">
        <NuxtLink class="navLink" id="homeNav" to="/">
          <span>HOME</span>
        </NuxtLink>

        <div id="rightSide">
          <NuxtLink class="navLink" to="/games">
            <span>GAMES</span>
          </NuxtLink>

          <NuxtLink class="navLink" to="/proxy">
            <span>PROXY</span>
          </NuxtLink>

          <NuxtLink class="navLink" to="/proxy">
            <span>BYPASSES</span>
          </NuxtLink>
        </div>
      </div>
      <video id="bgVideo" v-motion-fade autoplay loop muted playsinline>
        <source src="/fullbgloop.webm" type="video/webm"/>
        <source src="/fullbgloop.mp4" type="video/mp4"/>
      </video>
      <div id="header">
        <h1
          v-motion
          :initial="{opacity: 0}"
          :enter="{opacity: 1}"
          :delay="200"
        ><span id="firstText" :style="firstTextStyle">Bypass</span><span style="width: 18px;"></span><span id="secondText" :style="secondTextStyle">Anything</span></h1>
        <p
          id="subText"
          v-motion
          :initial="{opacity: 0}"
          :enter="{opacity: 1}"
          :delay="600" 
        >Grasp the tip of the world at your fingers. Just a click away.</p>
        <div
        v-motion 
        :initial="{opacity: 0}"
        :enter="{opacity: 1}"
        :delay="1000"
        id="buttons">
          <NuxtLink class="linkBtn" to="/bypasses">
            <span>VIEW BYPASSES</span>
          </NuxtLink>

          <a class="linkBtn" href="https://discord.gg/elude">
            <span>JOIN DISCORD</span>
          </a>
        </div>
      </div>
      <div ref="blob" id="blob"></div>
    </div>

    <div id="page2">
      <div style="opacity: 0;" id="gradientBG"></div>
      <div id="mainContentPage2">
        <h1>We&rsquo;re a small group of people based in different places, but we do our best to help if we can. 
          If you let us, we&rsquo;ll help you do things you couldn&rsquo;t before. 
          With us, there will be nothing you cannot do.
        </h1>

        <a class="linkBtn2" href="https://discord.gg/elude">
          <span>JOIN OUR DISCORD <font-awesome-icon :icon="['fas', 'arrow-right']" /></span>
        </a>
      </div>
      <div id="skillCircle">
        <!-- PC Bypasses -->
        <div class="skill">
          <img src="/windowsCurved.png">
          <div class="skillCirc"></div>
          <font-awesome-icon class="icon" :icon="['fab', 'windows']" />
        </div>

        <!-- Apple Bypasses -->
        <div class="skill">
          <img src="/appleCurved.png">
          <div class="skillCirc"></div>
          <font-awesome-icon class="icon" :icon="['fab', 'apple']" />
        </div>

        <!-- Android Bypasses -->
        <div class="skill">
          <img src="/androidCurved.png">
          <div class="skillCirc"></div>
          <font-awesome-icon class="icon" :icon="['fab', 'android']" />
        </div>

        <!-- Chromebook Bypasses -->
        <div class="skill">
          <img src="/cbCurved.png">
          <div class="skillCirc"></div>
          <font-awesome-icon class="icon" :icon="['fab', 'chrome']" />
        </div>

        <!-- Games -->
        <div class="skill">
          <img src="/gamesCurved.png">
          <div class="skillCirc"></div>
          <font-awesome-icon class="icon" :icon="['fas', 'gamepad']" />
        </div>

         <!-- Proxies -->
        <div class="skill">
          <img src="/proxiesCurved.png">
          <div class="skillCirc"></div>
          <font-awesome-icon class="icon" :icon="['fas', 'server']" />
        </div>

        <div class="mainText">
          <h2>SERVICES WE PROVIDE:</h2>
          <p>We provide a variety of services for your choosing.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo&family=Montserrat:wght@400;700&family=Roboto:wght@400;500&display=swap');

#app {
  width: 100vw;
  height: 100vh;
}

@keyframes bg-animation {
  from {
    background-position: left;
    background-size: 600%;
  }

  to {
    background-position: right;
    background-size: 100%;
  }
}

@media (hover: hover) and (pointer: fine)
{
  .linkBtn:hover {
    color: white;
  }

  .linkBtn:hover::before {
    transform: translate(50%,50%) scale(4) translateZ(0);
    transition: transform .6s cubic-bezier(.165,.84,.44,1);
  }
}

@keyframes rotate {
  from {
    rotate: 0deg;
    background-position: left;
    background-size: 600%;
  }

  50% {
    scale: 1 1.35;
  }

  to {
    rotate: 360deg;
    background-position: right;
    background-size: 100%;
  }
}

/* body.darkScrollbar::-webkit-scrollbar {
    background-color: #24282a;
    color: #ded4c6;
}
body.darkScrollbar::-webkit-scrollbar-thumb {
    background-color: #565c60;
}
body.darkScrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #6e777c;
}
body.darkScrollbar::-webkit-scrollbar-thumb:active {
    background-color: #5a6266;
}
body.darkScrollbar::-webkit-scrollbar-corner {
    background-color: #1a1c1e;
} */

.skill .icon {
  position: absolute;
  bottom: -10px;
  color: #7130C5;
  font-size: 40px;
}
.skill img {
  position: absolute;
  color: white;
  top: 15px;
  text-align: center;
}
.skill {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
  width: 100px;
  height: 100px;
}
.skillCirc {
  position: relative;
  height: 10px;
  width: 10px;
  background-color: #D64141;
  border-radius: 50%;
}

.skill:nth-child(1) {
    transform: translateY(-250px);
}

.skill:nth-child(2) {
    transform: rotate(60deg) translateY(-250px);
}

.skill:nth-child(3) {
    transform: rotate(120deg) translateY(-250px);
}

.skill:nth-child(4) {
    transform: rotate(180deg) translateY(-250px);
}

.skill:nth-child(5) {
    transform: rotate(240deg) translateY(-250px);
}

.skill:nth-child(6) {
    transform: rotate(300deg) translateY(-250px);
}

#skillCircle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 500px;
  height: 500px;
  transform: translateX(-50%);
  right: 0;
}

#skillCircle .mainText {
  font-family: 'Exo';
  line-height: 1em;
  color: #7130C5;
  text-align: center;
}

#skillCircle::before {
  position: absolute;
  content: "";
  inset: 0;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(126.06deg, #6100FF -6.51%, #CE1623 97.48%, #E64848 97.49%);

  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude; 
}

#mainContentPage2 h1 {
  font-family: 'Exo';
  font-style: normal;
  font-weight: 400;
  font-size: 45px;
  line-height: 60px;

  background: linear-gradient(90.83deg, #5E06E6 2.6%, #A80F7A 55.45%, #F41809 115.35%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* text-fill-color: transparent; */
}

#mainContentPage2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 38%;
  margin-left: 7%;
  margin-bottom: 25px;
}

#page1 {
  height: 150vh;
}

#page2 {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 150vh;
  height: 100vh;
}

#gradientBG {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-image: linear-gradient(106.83deg,
    rgb(82, 0, 255) -1.36%,
    rgb(159, 0, 151) 36.23%,
    rgb(188, 0, 87) 64.28%,
    rgb(255, 0, 0) 106.35%);
  background-color: initial;
  z-index: -2;
  animation: bg-animation 5s ease-in-out infinite alternate;
}


#blob {
  background-color: white;
  height: 500px;
  aspect-ratio: 1;
  background-size: 600%;
  position: absolute;
  translate: -50% -50%;
  border-radius: 50%;
  background-image: linear-gradient(106.83deg,
    rgb(82, 0, 255) -1.36%,
    rgb(159, 0, 151) 36.23%,
    rgb(188, 0, 87) 64.28%,
    rgb(255, 0, 0) 106.35%);
  background-color: initial;
  animation: rotate 10s infinite alternate;
  z-index: -2;
  filter: blur(70px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.linkBtn::before {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-image: linear-gradient(106.83deg,
    rgb(82, 0, 255) -1.36%,
    rgb(159, 0, 151) 36.23%,
    rgb(188, 0, 87) 64.28%,
    rgb(255, 0, 0) 106.35%);
  background-color: initial;
  transition: transform .6s cubic-bezier(.165,.84,.44,1);
  transform: translate(0,50%) translateZ(0);
  pointer-events: auto;
  z-index: -2;
}

#homeNav
{
  position: absolute;
  top: 40px;
  left: 60px;
}

#rightSide
{
  display: flex;
  top: 40px;
  position: absolute;
  right: 60px;
  width: 20%;
  justify-content: space-evenly;
}
.navLink
{
  appearance: none;
  text-decoration: none;
  font-size: 14px;
  transition: color .6s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-family: 'Roboto', sans-serif;
  position: relative;
  color: rgb(196, 186, 167);
}

.navLink:hover {
  color: #6754DD;
}

.linkBtn {
  display: inline-block;
  position: relative;
  appearance: none;
  text-align: center;
  text-decoration: none;
  color: rgb(198, 186, 168);
  font-size: 12px;
  transition: color .6s cubic-bezier(.165,.84,.44,1);
  padding: 12px 35px 12px 35px;
  font-family: 'Roboto', sans-serif;
  z-index: 0;
  overflow: hidden;
  border-radius: 25px;
  margin-left: 10px;
  margin-right: 10px;
}

.linkBtn::after {
  width: 98%;
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  padding: 1px;
  border-radius: 25px;
  background-image: linear-gradient(106.83deg,
    rgb(82, 0, 255) -1.36%,
    rgb(159, 0, 151) 36.23%,
    rgb(188, 0, 87) 64.28%,
    rgb(255, 0, 0) 106.35%);
  background-color: initial;
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
          mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.linkBtn2 {
  display: inline-block;
  position: relative;
  appearance: none;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  letter-spacing: 0.265em;
  width: fit-content;

  color: #6754DD;
}

.linkBtn2 span {
  transition: filter 250ms ease-in;
}

.linkBtn2 span:hover {
  filter: brightness(185%);
}

.linkBtn2::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  transform-origin: bottom center;
  transition: transform 0.25s ease-out;
  height: 2px;
  bottom: 0;
  left: 0;
  background-size: 600%;
  top: 25px;
  background-image: linear-gradient(90deg, #8000FF -0.83%, #DA3649 104.44%);
}

.linkBtn2:hover::after {
  transform: scaleX(1);
  transform-origin: bottom center;
  animation: bg-animation 1s ease-in-out forwards alternate;
}

#bgVideo {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -2;
}

#overlay {
  position: absolute;
  width: 100vw;
  height: 250vh;
  background-image: initial;
  background-color: rgba(12, 15, 28, 0.7);
  backdrop-filter: blur(25px);
  left: 0;
  top: 0;
  z-index: -1;
}

#overlay2 {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: initial;
  background-color: rgba(12, 15, 28, 0.7);
  backdrop-filter: blur(5px);
  z-index: -1;
}

#header {
  position: absolute;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  left: 50%;
  top: 32%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1;
  opacity: 1;
}

#buttons {
  height: 100%;
  opacity: 0;
}

#header h1 {
  display: flex;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  margin: 0;
  text-align: center;
  background-size: 600%;
  animation: bg-animation 2s ease-in-out forwards alternate;
}

#firstText {
  position: relative;
  background-image: linear-gradient(93.39deg, #5E06E6 1.62%, #910C9A 100%);
  background-color: initial;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

#secondText {
  position: relative;
  background-image: linear-gradient(93.39deg, #980D91 1.61%, #F41809 116.94%);
  background-color: initial;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

#header p {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 14px;
  color: rgb(196, 186, 167);
  opacity: 0;
}

@media only screen and (max-width: 768px) {
  #overlay {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }

  #mainContentPage2 h1 {
    font-size: 30px;
    line-height: normal;
  }

  #mainContentPage2 {
    align-items: center;
    text-align: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  /*
  #blob {
    display: none;
  }
  */

  #bgVideo {
    left: -250px;
    min-width: 60%;
  }

  #header {
    width: 70%;
  }

  #buttons {
    text-align: center;
  }

  #header h1 {
    font-size: 36px;
  }

  .linkBtn {
    margin-top: 15px;
  }

  #header p {
    font-size: 11px;
  }
}
</style>
