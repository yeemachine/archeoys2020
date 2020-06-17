<script>
// import lottie from 'lottie-web';
// import {data} from './svgdata.js'
import {onMount} from 'svelte'
// import { tweened,spring } from 'svelte/motion';
// import { backOut, sineInOut, quadInOut, linear } from 'svelte/easing';
import {findURLParams} from './helpers.js'
import {PAGE,WIDTH,HEIGHT,SCROLLY,currentCollectionID,currentPostID} from './stores.js'
import Gallery from './components/Gallery.svelte'
import Home from './components/Home.svelte'
// import {navigation} from './config.js'
  
  let windowWidth = 1
  let windowHeight = 1
  let scrollY = 0
  // let lottieEl
  // let videoEl
  // let currentFrame
  // let lottieAnim

  // let postList = []
  // let postIDList = []
  
  // const svgLoadTween = tweened(0, {
  //   duration: 6000,
  //   easing: linear
  // });
  
  // const yMax = spring(0,{
	// 	stiffness: 0.08,
	//   damping: 0.5
  // })
  
  // $: {
  //   yMax.set(constrain(scrollY/(windowHeight*1),{min:0,max:1}))
  // }
    
  onMount(async () => {
    
    //If User enters with a Gallery Link
    const urlParams = findURLParams()
    
    if(urlParams.collection){
      console.log(urlParams.collection)
      currentCollectionID.set(urlParams.collection)
      // setCollection(urlParams.collection)
      currentPostID.set(urlParams.post)
      PAGE.set('gallery')
    }
    
  
    // lottieAnim = lottie.loadAnimation({
    // container: lottieEl, // the dom element
    // renderer: 'svg',
    // loop: false,
    // autoplay: false,
    // animationData: data, // the lottieAnimation data
    // rendererSettings: {
    //   preserveAspectRatio: 'xMidYMid meet'
    // }
    // });
    
    // svgLoadTween.set(0.6)
    
    
  })
  
  // $:{
  //   if(lottieAnim){
  //     lottieAnim.goToAndStop(lottieAnim.totalFrames*($svgLoadTween + 0.4*$yMax),true)
  //   }
  // }
  
  // $:{
  //   if(videoEl && !isNaN(videoEl.duration)){
  //     videoEl.currentTime = $yMax*videoEl.duration
  //     videoEl.pause()
  //     console.log(videoEl.duration)
  //   }
  // }

  $:{
    WIDTH.set(windowWidth)
    HEIGHT.set(windowHeight)
    SCROLLY.set(scrollY)
  }
  
</script>

<svelte:window 
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
  bind:scrollY={scrollY}
/>

<!-- <div bind:this={lottieEl} class="lottie" style="background:rgba(0,0,0,{0.8*(1-$yMax)})">
    
</div>

<video style="position:fixed;top:0;left:0;width:100%;height:auto;z-index:1" bind:this={videoEl} autoplay=false tabindex="0" autobuffer="autobuffer" preload="preload">
    <source type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" src="https://cdn.glitch.com/7e6513ba-8c51-4a99-a910-980e2644f0fb%2Foutput_N8T87d.mp4?v=1592034491592"/>     
      <p>Sorry, your browser does not support the &lt;video&gt; element.</p>
</video> -->

{#if $PAGE === 'gallery'}
  <Gallery/>
{:else}
  <Home/>
{/if}

<!-- <main class={$frameLoaded ? 'loaded' : ''}>
  <button class="plan" on:click={planView}>
     <i class="material-icons">home</i>
  </button>

  <iframe 
      bind:this={frame} 
      class={$frameLoaded ? 'loaded' : ''}
      frameborder="0"
      title="End of the Year Show 2020"></iframe>
  
  <BottomNav/>

</main> -->

<!-- <div style="z-index:1;top:0;left:0;width:100%;height:200vh;">
</div> -->


<style>
  :global(html), :global(body) {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: black;
  font-variation-settings: "wght" 90, "wdth" 120, "ital" 0;
  margin:0;
  padding:0;
  /* width:100%;
  height:100%;
  overflow:hidden; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  :global(h1),:global(h2),:global(h3),:global(h4),:global(p),:global(label),:global(button){
  font-family: 'Noto Sans JP', sans-serif;	
  }

  :global(i){
    font-family:'Noto Sans', sans-serif
  }
  
  :global(:root){
    --carouselItemWidth: 360px;
    --carouselBGColor: rgb(25,25,25);
    --carouselItemBorderRadius:0;
    --carouselItemBorderWidth:4px;
    --charcoal: rgb(60,60,60);
  }

	:global(button){
		background: transparent;
      border: none;
      white-space: nowrap;
	}

	:global(button){
		padding:0;
	}

	/* a subtle focus style for keyboard-input elements */
	:global(.text-input:focus) {
	outline: 1px solid #aaa; /* Adjust to suit your tastes */
	}

	/* no outline for non-keyboard-inputs elements */
	:global(button:focus),
	:global(input:focus),
	:global(label:focus),
	:global(select:focus){
	outline: none;
	}

	:global(body.user-is-tabbing *:focus),
	:global(body.user-is-tabbing input:focus + container) {
	outline: 2px solid #7AACFE !important; /* for non-webkit browsers */
	outline: 5px auto -webkit-focus-ring-color !important;
  }

@media only screen and (max-width: 600px) {
  :global(:root) {
    --carouselItemWidth: 240px;
  }
}  
</style>
