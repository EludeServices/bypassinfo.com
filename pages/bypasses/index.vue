<script setup>
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

const bypasses = ref(null);
const bypassesHeight = ref(0);

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

const bypassinfo = reactive({
    "windows": [
        {
            "title": "How To Get Admin On Windows (V2)",
            "id": "how-to-get-admin-on-windows-v2",
            "author": "rsa16"
        },
        {
            "title": "How To Get Admin On Windows (Recovery Method)",
            "id": "how-to-get-admin-on-windows-recovery-method",
            "author": "rsa16"
        },
        {
            "title": "How To Get Admin On Windows (USB Method)",
            "id": "how-to-get-admin-on-windows-usb-method",
            "author": "rsa16"
        },
        {
            "title": "Changing Your Mac Address",
            "id": "changing-your-mac-address",
            "author": "rsa16"
        },
        {
            "title": "Bypassing Blocked Files",
            "id": "bypassing-blocked-files-on-windows",
            "author": "rsa16"
        },
        {
            "title": "Bypassing Microsoft Screentime",
            "id": "bypassing-microsoft-screentime",
            "author": "rsa16"
        }
    ],

    "android": [
        {
            "title": "Changing Your Mac Address",
            "id": "changing-mac-address-on-android",
            "author": "rsa16"
        },
        {
            "title": "Family Link Bypass For Samsung",
            "id": "samsung-family-link-bypass",
            "author": "rsa16"
        },
        {
            "title": "Samsung Family Link Downtime Bypass",
            "id": "samsung-family-link-downtime-bypass",
            "author": "rsa16"
        }
    ],

    "chromebook": [
        {
            "title": "CAUB",
            "id": "exploit-caub",
            "author": "rsa16"
        },
        {
            "title": "JPCMG",
            "id": "exploit-jpcmg",
            "author": "rsa16"
        },
        {
            "title": "Killcurly",
            "id": "exploit-killcurly",
            "author": "rsa16"
        },
        {
            "title": "LTBEEF (Inspect Method)",
            "id": "exploit-ltbeef-inspect-method",
            "author": "rsa16"
        },
        {
            "title": "LTBEEF",
            "id": "exploit-ltbeef",
            "author": "rsa16"
        },
        {
            "title": "LTMEAT",
            "id": "exploit-ltmeat",
            "author": "rsa16"
        },
        {
            "title": "New Point Blank",
            "id": "exploit-new-point-blank",
            "author": "rsa16"
        },
        {
            "title": "Point Blank",
            "id": "exploit-point-blank",
            "author": "rsa16"
        },
        {
            "title": "UBOSS",
            "id": "exploit-uboss",
            "author": "rsa16"
        },
        {
            "title": "Extension Bypasses",
            "id": "extension-bypasses",
            "author": "rsa16"
        },
        {
            "title": "Extension Launcher",
            "id": "extension-launcher",
            "author": "rsa16"
        }
    ],

    "ios": [
        {
            "title": "Removing MDM Restrictions On IOS Devices",
            "id": "removing-mdm-restrictions-on-ios-devices",
            "author": "rsa16"
        },
        {
            "title": "Removing Screentime With An MDM Profile",
            "id": "removing-screentime-using-an-mdm",
            "author": "rsa16"
        }
    ]
});


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

onMounted(async () => {
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

    bypassesHeight.value = bypasses.value.clientHeight + 500 + 'px';
});

// const { data: bypassinfo } = await useFetch("/img/titledb.json", {
//     initialCache: false,
//     key: "bypassInfo"
// });
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
        
        <div class="video-container">
            <video id="bgVideo" style="top:0;" v-motion-fade autoplay loop muted playsinline>
                <source src="/video/bypassbg.webm" type="video/webm"/>
            </video>
        </div>
        
        <div class="page">
            <div id="content">
                <div v-motion :initial="{opacity: 0}" :enter="{opacity: 1}" :delay="200" id="header">
                    <h1>Bypass List</h1>
                    <div id="sep"></div>
                </div>
                <div ref="bypasses" v-motion-slide-top id="bypasses">
                    <div v-motion :initial="{y:-100, opacity: 0}" :enter="{y: 0, opacity: 1}" :delay="600 + index * 100" v-for="(bypass, index) in bypassinfo.windows" class="item">
                        <div class="itemContent">
                            <NuxtLink class="navLink2" :to="'/bypasses' + '/windows/' + bypass.id">
                                <h4>{{ bypass.title }}</h4>
                            </NuxtLink>
                            <p>Windows</p>
                        </div>
                    </div>
                    <div v-motion :initial="{y:-100, opacity: 0}" :enter="{y: 0, opacity: 1}" :delay="700 + index * 100" v-for="(bypass, index) in bypassinfo.android" class="item">
                        <div class="itemContent">
                            <NuxtLink class="navLink2" :to="'/bypasses' + '/android/' + bypass.id">
                                <h4>{{ bypass.title }}</h4>
                            </NuxtLink>
                            <p>Android</p>
                        </div>
                    </div>
                    <div v-motion :initial="{y:-100, opacity: 0}" :enter="{y: 0, opacity: 1}" :delay="800 + index * 100" v-for="(bypass, index) in bypassinfo.ios" class="item">
                        <div class="itemContent">
                            <NuxtLink class="navLink2" :to="'/bypasses' + '/ios/' + bypass.id">
                                <h4>{{ bypass.title }}</h4>
                            </NuxtLink>
                            <p>IOS</p>
                        </div>
                    </div>
                    <div v-motion :initial="{y:-100, opacity: 0}" :enter="{y: 0, opacity: 1}" :delay="900 + index * 100" v-for="(bypass, index) in bypassinfo.chromebook" class="item">
                        <div class="itemContent">
                            <NuxtLink class="navLink2" :to="'/bypasses' + '/chromebook/' + bypass.id">
                                <h4>{{ bypass.title }}</h4>
                            </NuxtLink>
                            <p>ChromeOS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :style="{'height': bypassesHeight }" id="overlay"></div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Poppins:wght@300;600&display=swap');

@media only screen and (max-width: 1024px) {
    #header h1 {
        display: inline-block;
    }

    #header {
        text-align: center;
    }

    #content {
        height: 60vh !important;
    }

    #sep {
        width: auto !important;
        margin-left: 5px;
    }

    .item {
        width: 100% !important;
    }
}

#app {
    width: 100vw;
    height: 100vh;
}

#bypasses {
    display: flex;
    margin-top: 40px;
    gap: 40px 60px;
    flex-flow: row wrap;
}

.navLink2 {
    appearance: none !important;
    text-decoration: none !important;
}

.item {
    width: 20vw;
    height: 110px;
    background: linear-gradient(107.41deg, #1B2431 0.7%, #002648 110.11%);
    border-radius: 30px;
}

.itemContent {
    display: flex;
    height: 100%;
    flex-direction: column;
    margin-left: 24px;
    margin-top: 20px;
    padding-right: 10px;
}

@property --a {
  syntax: '<color>';
  initial-value: #4273A0;
  inherits: false;
}

@property --b {
  syntax: '<color>';
  initial-value: #0359FF;
  inherits: false;
}

.item h4 {
    position: relative;

    transition: --a 500ms, --b 500ms, transform 500ms;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: -0.015em;

    background: linear-gradient(90deg, var(--a) -3.9%, var(--b) 107.56%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    margin: 0;

    cursor: pointer;

    bottom: 0;
}

.item h4:hover {
    --a: #729dc5;
    --b: #4f8bff;

    transform: translateY(-2px);
}

.item p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    letter-spacing: -0.015em;

    color: #3174B3;
    margin: 0;
}

#header h1 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    font-size: 38px;

    background: linear-gradient(91.84deg, #0047FF 0%, #00A3FF 130%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    width: fit-content;
    margin: 0;
}

#sep {
    width: 400px;
    height: 1px;
    margin-top: 15px;
    background-image: linear-gradient(90deg, #0044ff -0.83%, #00C2FF 134.44%);
}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

#content {
    width: 100vw;
    height: 40vh;
    padding-left: 15vw;
    padding-right: 15vw;
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
    height: 200vh;
    background-image: initial;
    background: rgba(14, 18, 41, 0.7);
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