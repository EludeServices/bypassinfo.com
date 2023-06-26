<script setup>
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

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

function handleParallax() {
  var sc = parseInt(document.getElementsByClassName("scroll-content")[0].style.transform.split(", ")[1], 10)
  var target = document.getElementById("bgVideo");

  var factor = 0.9;

  var yvalue = sc * -factor;
  
  factor += ((6*window.innerHeight/1000) - sc)


  target.style.top = `${yvalue}px`;
}

onMounted(() => {
  // load the plugin
  Scrollbar.use(DisableScrollPlugin);
  Scrollbar.use(OverscrollPlugin);
  let scrollbar = Scrollbar.init(document.querySelector('#app'), {
    plugins: {
      disableScroll: {
        direction: 'x',
      },
      overscroll: {
        effect: 'bounce'
      }
    },
    damping: 0.05,
    continuousScrolling: false
  });
  Scrollbar.detachStyle();
  scrollbar.addListener(handleParallax);

  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = SCROLLBAR_STYLE;

  document.head.appendChild(styleEl);
});
</script>

<template>
  <div id="app">
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

        <NuxtLink class="navLink" to="/bypasses">
          <span>BYPASSES</span>
        </NuxtLink>
      </div>
    </div>
    <div 
      id="overlay">
    </div>
    <div class="video-container">
      <video id="bgVideo" style="top:0;" v-motion-fade autoplay loop muted playsinline>
        <source src="/video/tunneloop.webm" type="video/webm"/> 
      </video>
    </div>
    <div class="page">
      <div id="header">
        <h1>GAMES</h1>
        <div id="line"></div>
        <p>Thousands of games, all provided at the service of Elude. All at the behest of your mousewheel.</p>
      </div>
    </div>
    <div class="page">
      <div id="searchHeader">
        <h1>ELUDE GAMES</h1>

        <div id="containerfr">
          <div id="searchContainer"></div>
          <input id="searchBar" placeholder="Search..." type="text"/>
          <div id="searchBG"></div>
        </div>

        <div class="searchBtn">
          <font-awesome-icon id="lel" :icon="['fas', 'magnifying-glass']" :mask="['fas', 'square-full']"/>
          <span>Submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo&family=Montserrat:wght@300;400;500;700&family=Roboto:wght@300;400;500&display=swap');

@property --c {
  syntax: '<color>';
  initial-value: #B73AAA;
  inherits: false;
}

@property --d {
  syntax: '<color>';
  initial-value: #06F;
  inherits: false;
}

#lel {
  position: absolute;
  width: 18px;
  height: 18px;

  left: 25px;

  transition: --c 500ms, --d 500ms, transform 500ms;
  color: white;
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%);
  -webkit-background-clip:padding-box;
}

@media (hover: hover) and (pointer: fine)
{
  .searchBtn:hover span {
    --c: #ff98f5;
    --d: rgb(131, 180, 255);
  }

  .searchBtn:hover::before {
    transform: translate(20%,50%) scale(4) translateZ(0);
    transition: transform .6s cubic-bezier(.165,.84,.44,1);
  }
}

.searchBtn span {
  text-align: center;
  font-size: 15px;
  font-family: Montserrat;
  font-weight: 500;

  transition: --c 500ms, --d 500ms, transform 500ms;

  background: linear-gradient(139deg, var(--c) 0%, var(--d) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.searchBtn::before {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-image: linear-gradient(26deg, #9E2892 0%, #1A60CA 100%);
  background-color: initial;
  transition: transform .6s cubic-bezier(.165,.84,.44,1);
  transform: translate(0,100%) translateZ(0);
  pointer-events: auto;
  z-index: -1;
}

.searchBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
  margin-top: 10px;

  cursor: pointer;

  width: 120px;
  height: 25px;
}

.searchBtn::after {
  content: "";

  position: absolute;
  width: 98%;
  height: 93%;
  top: 0;
  left: 0;
  
  border-radius: 25px; /*1*/
  border: 2px solid transparent; /*2*/
  background: linear-gradient(26deg, #9E2892 0%, #1A60CA 100%) border-box;
  -webkit-mask: /*4*/
     linear-gradient(#fff 0 0) padding-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; /*5'*/
          mask-composite: exclude; /*5*/
}

.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

#searchHeader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#searchHeader h1 {
  font-size: 64px;
  font-family: Roboto;
  font-weight: 300;
  text-align: center;
  letter-spacing: 12.8px;
  margin: 0;

  background: linear-gradient(90deg, #9F1C92, #0066FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#containerfr {
  display: flex;
  width: 34vw;
  height: 80px;

  justify-content: center;
  align-items: center;
}

#searchContainer {
  position: absolute;

  width: 34vw;
  height: 50px;

  border-radius: 25px; /*1*/
  border: 2px solid transparent; /*2*/
  background: linear-gradient(139deg, #7D2E75 0%, #0066FF 100%) border-box; /*3*/
  -webkit-mask: /*4*/
     linear-gradient(#fff 0 0) padding-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; /*5'*/
          mask-composite: exclude; /*5*/
  
}

#searchBar {
  all: unset;

  position: relative;
  font-family: Montserrat;

  color: #C970C5;

  width: 35vw;
  height: 50px;

  padding-left: 55px;
  border-radius: 20px;

  z-index: 3;
}

#searchBar:focus {
  background: linear-gradient(139deg, #ffb9f8 0%, #a2c7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#searchBar:focus + #searchBG::after {
  opacity: 1;
}

#searchBG {
  width: 34vw;
  height: 50px;
  position: absolute;

  z-index: 1;
}

#searchBG::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(139deg, #7D2E75 0%, #0066FF 100%);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.4s;
  z-index: -1;
}

#searchBG:hover::after {
  opacity: 1;
}

#searchBar::placeholder {
  color: #C970C5;
  font-size: 16px;
  font-family: Montserrat;
  font-weight: 300;
}



#line {
  margin-top: 15px;
  width: 400px;
  height: 1px;
  background: linear-gradient(90deg, #FF00E5 -0.83%, #0066FF 104.44%);
}

#header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#header h1 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: 110px;
  text-align: center;
  letter-spacing: 0.585em;
  margin: 0;

  width: calc(100% - 270px);

  background: linear-gradient(93.05deg, #FF00E5 -23.62%, #0066FF 131.22%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

#header p {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #9998D7;
  width: 60%;

  margin-top: 20px;
}

#app {
  width: 100vw;
  height: 100vh;
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


.video-container {
  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
  top: 0;
  object-fit: cover;
}

#bgVideo {
  position: absolute;
  z-index: -2;
  min-width: 100%;
  min-height: 100%;
}

#overlay {
  position: absolute;
  width: 100vw;
  height: 600vh;
  background-image: initial;
  background: rgba(10, 13, 34, 0.8);
  backdrop-filter: blur(25px);
  left: 0;
  top: 0;
  z-index: -1;
}

#navbar {
  position: relative;
  z-index: 100;
}
</style>
