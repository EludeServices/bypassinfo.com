<template>
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
    <div id="test">
        <h1 style="color: skyblue">Proxy In Progress</h1> 
        <p style="color: skyblue">Sorry for the wait!</p>
    </div>
</template>

<style>
#test {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

#navbar {
  position: relative;
  z-index: 100;
}
</style>