<script>
// import lottie from 'lottie-web';
import * as animateScroll from "svelte-scrollto";
import {title} from '../lottie/title.js'
import {bg} from '../lottie/bg.js'
import {onMount} from 'svelte'
import { tweened,spring } from 'svelte/motion';
import { linear,sineInOut } from 'svelte/easing';
import {constrain} from '../helpers.js'
import {PAGE,WIDTH,HEIGHT,SCROLLY} from '../stores.js'
import Directory from './Directory.svelte'
import Intro from './Intro.svelte'
import About from './About.svelte'
import Credits from './Credits.svelte'
import {navigation} from '../config.js'
  

  animateScroll.setGlobalOptions({
      offset:0,
      duration:2000
  })

  let windowWidth = 1
  let windowHeight = 1
  let scrollY = 0
  let lottieEl,lottieEl2
  let lottieAnim,lottieAnim2
  
  const svgLoadTween = tweened(0, {
    duration: 4000,
    easing: linear
  });

  const bgLoadTween = tweened(0, {
    duration: 1000,
    easing: linear
  });
  
  const yMax = spring(0,{
		stiffness: 0.05,
	  damping: 0.3
  })
  
  $: {
    yMax.set($SCROLLY)
  }
    
  onMount(async () => {
    lottieAnim = lottie.loadAnimation({
    container: lottieEl, // the dom element
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: title, // the lottieAnimation data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet'
    }
    });

    lottieAnim2 = lottie.loadAnimation({
    container: lottieEl2, // the dom element
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: bg, // the lottieAnimation data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
    });
    
    svgLoadTween.set(1)
    bgLoadTween.set(1)
    
  })
  
  $:{
    if(lottieAnim && $SCROLLY<$HEIGHT*3.5){
      lottieAnim.goToAndStop(
        lottieAnim.totalFrames*
        ($svgLoadTween*.825 + 0.175*constrain($SCROLLY/($HEIGHT*1),{min:0,max:1}))
        ,true)
    }
  }

  $:{
    if(lottieAnim2 && $SCROLLY<$HEIGHT*3.5){
      lottieAnim2.goToAndStop(
        lottieAnim2.totalFrames*
        (1*constrain($SCROLLY/($HEIGHT*3),{min:0,max:1}))
        ,true)
    }
  }
  
</script>

<container style='transform:translate3d(0,{-1*.5*constrain(($SCROLLY - $HEIGHT*3),{min:0,max:$HEIGHT*2})}px,0)'>
<!-- <container style='opacity:{$SCROLLY > $HEIGHT*5 ? 0 : 1}'> -->

<div bind:this={lottieEl} class="lottie">
    
</div>

<div bind:this={lottieEl2} class="lottie-bg">
</div>

<!-- <div class="scroll"></div> -->
</container>

<button 
on:click={()=>{window.location.href='/?collection=7lVLb&post=7Zh1R'}} 
style='opacity:{$SCROLLY > $HEIGHT*3 ? 0 : 1}'
class="enter">
Enter Exhibition
</button>

<button 
class="down" 
style='opacity:{$SCROLLY > $HEIGHT*3 ? 0 : 1}'
on:click={()=>{animateScroll.scrollTo({element: 'main'})}}>
  <span class="material-icons">
  arrow_downward
  </span>
</button>

<div class="spacer"></div>
<main>
<section class="intro">
  <Intro/>
</section>

<section class="directory">
 <Directory subtitle={true}/>
</section>

<section class="about">
 <About/>
</section>

<section class="credits">
 <Credits/>
</section>


</main>

<style>

  :global(body){
    display: block;
    justify-content: center;
  }
  .directory{
    background:rgb(243, 243, 243);
    padding: 64px 0 48px 0;
  }
  section{
    width: calc(100% - 96px);
    margin: 0 48px 0 48px;
    padding: 160px 0 160px 0;
    max-width:1400px;
  }
  container{
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
  }

  .lottie{
    position: absolute;
    width: 100vw;
    height: 95vh;
    margin: auto;
    z-index: 1;
    top:0;
    left:0;
/*     pointer-events:none; */
  }
  .lottie-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* z-index:-3; */
  }
  .spacer{
    width:100%;
    height:370vh;
    pointer-events: none;
  }
  main{
    --mainBG:rgb(25,25,25);
    margin:0 0 0 0;
    position:relative;
    z-index: 2;
    width:100%;
    background:var(--mainBG);
    flex-direction: column;
    display: flex;
    align-items: center;
  }
  main:before{
    --triangleHeight:80px;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: calc(-1 * var(--triangleHeight) + 1px);
    border-style: solid;
    border-width: 0 0 var(--triangleHeight) 100vw;
    border-color: transparent transparent var(--mainBG) transparent;
  }
  .credits{
    position: relative;
    margin: 0;
    left: 0;
    padding: 48px 0 80px 0;
    width: 100vw;
    background: rgb(50,50,50);
    max-width: unset;
    display: flex;
    justify-content: center;
  }
  .credits:before{
    --triangleHeight:80px;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: calc(-1 * var(--triangleHeight) + 1px);
    border-style: solid;
    border-width: var(--triangleHeight) 0 0 100vw;
    border-color: transparent transparent transparent rgb(50,50,50);
  }
  .down{
    --themeColor: white;
    position:fixed;
    right:32px;
    bottom:32px;
    background:rgb(80,80,80);
    color:white;
  }
  .enter{
    --themeColor: white;
    position: fixed;
    bottom: 32px;
    left:32px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: .02em;
    margin: auto;
    width:max-content;
    color:white;
    width: 224px;
    font-size: 18px;
  }
  button{
    position:relative;
    height:64px;
    width:64px;
    background: rgb(60,60,60);
    color: white;
    z-index:2;
    border:none;
    /* border-radius:36px; */
    font-size:14px;
    pointer-events: all;
    transition:.3s;
  }
  button:before{
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -2;
    transition:.3s;
    position: absolute;
    background: rgb(100,100,100);
  }
  button:hover{
    cursor:pointer;
  }
  button:hover:before{
    cursor:pointer;
    border-radius:50%;
  }
  .enter:hover:before{
    border-radius: 32px;
  }

@media only screen and (max-width: 600px) {
  .lottie{
    height:80vh;
  }
  section{
    width: calc(100% - 48px);
    padding: 48px 0 48px 0;
    margin: 0 24px 0 24px 0;
  }
  .intro,.about,.directory{
    width:100%;
    margin:0;
  }
  .credits:before{
    --triangleHeight:40px;
  }
  main:before{
    --triangleHeight:40px;
    }
}  
</style>
