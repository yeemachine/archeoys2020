<script>
import {onMount} from 'svelte'
import {findURLParams,findNext} from '../helpers.js'
import {frameLoaded,currentCollectionID,currentFrameID,currentPostID, currentPlanID, currentPostArr,currentPostArrIDs,expandBottomNav} from '../stores.js'
import BottomNav from './BottomNav.svelte'
import Directory from './Directory.svelte'
import Logo from './logo.svelte'
import {navigation} from '../config.js'

let frame
let currentFrame
let navExpanded = false

const planView = () => {
    KuulaPlayerAPI.load($currentFrameID, $currentPlanID);
}

const changeFloor = (direction='forwards') => {
  let nextID = findNext($currentCollectionID,Object.keys(navigation),direction)
  // currentCollectionID.set(nextID)
  // currentPostID.set(null)
  window.location.href='/?collection='+nextID
}

const changeFloorPost = (floorID,postID) => {
  currentCollectionID.set(floorID)
  currentPostID.set(postID)
}

const testFloor = () => {
  currentCollectionID.set('7lVLZ')
  currentPostID.set(null)
}

onMount(async()=>{

    //On Load Collection
    KuulaPlayerAPI.addEventListener("frameloaded", function(e) {
      currentFrame = e
      
      currentFrameID.set(e.frame)
      currentPlanID.set(e.data.tour.plans[0])

      //sets currentPost to Plan
      if(!$currentPostID){
        currentPostID.set(e.data.tour.plans[0])
      }

      currentPostArr.set(e.data.posts) //Array of posts

      let postArrIDs = []
      e.data.posts.forEach(e=>{
        postArrIDs.push(e.id)
      })
      currentPostArrIDs.set(postArrIDs)

    });
    
    //On Load Post
    KuulaPlayerAPI.addEventListener("postloaded", function(e) {
      if($frameLoaded){
        currentPostID.set(e.data.id)
      }else{
        frameLoaded.set(true);
      }
    });
})

  $:{
    if($frameLoaded && $currentFrameID && $currentPostID){
      KuulaPlayerAPI.load($currentFrameID, $currentPostID);
    }
  }

$:{
    if($frameLoaded){
      //Changes URL when switching posts
      if(findURLParams().collection !== $currentCollectionID || findURLParams().post !== $currentPostID){
          history.replaceState(null, '', '?collection='+$currentCollectionID+'&post='+$currentPostID);  
      }
    }  
  } 

</script>

<main class={$frameLoaded ? 'loaded' : ''} style="--globalTheme:{navigation[$currentCollectionID].color}">
  <nav class='{navExpanded? 'active' : ''}'>
  <section>
    <a href="/">
      <div class="logo">
        <Logo color={navExpanded ? '#000':'#fff'}/>
      </div>
    </a>
    <button class="hamburger {$expandBottomNav ? 'hide' : ''}" on:click={()=>{navExpanded = !navExpanded}}>
      <i class="material-icons">{navExpanded? 'clear' : 'menu'}</i>
    </button>
  </section>
  <Directory styles="margin-top:140px;{navExpanded ? '' : 'opacity:0'}"/>
  </nav>
  <div class='{$expandBottomNav ? 'hide' : ''} planControls {$currentPlanID === $currentPostID ? 'active' : ''}'>
  <button class="upFloor {Object.keys(navigation).indexOf($currentCollectionID) === Object.keys(navigation).length-1 ? 'hide' : ''}" 
  on:click={()=>{changeFloor()}}>
    <i class="material-icons">arrow_drop_up</i>
  </button>
  <button class="plan" on:click={planView}>
      <p class="currentFloor">{navigation[$currentCollectionID].abr||''}</p>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          svg{
            width:100%;
            height:100%;
          }
          .progress{
                stroke-dasharray: 170;
                stroke-dashoffset: 170;
                transform: rotate(-90deg);
                transform-origin: center;
                transition:.4s;
                stroke:var(--globalTheme);
          }
        </style>
        <circle cx="28" cy="28" r="26.5" fill="black" fill-opacity="0"/>
        <path d="M32.7751 48.4393L32.6575 48.8314L32.2678 48.7145L32.2654 48.7138L15.8643 43.6731L15.8643 43.673L15.8571 43.671L15.6033 43.5984V43.3555V11.7525V11.3762H15.9795H43.5193H44.0634L43.9122 11.8675L43.9119 11.8686L32.7755 48.4378L32.7751 48.4393Z" stroke="white" stroke-width="0.752454"/>
        <path d="M42.5 17L37.5 17L37.5 11.5" stroke="white" stroke-width="0.5"/>
        <path d="M26.5 39L26.5 42L15.5 42" stroke="white" stroke-width="0.5"/>
        <path d="M26.5 17L26.5 11" stroke="white" stroke-width="0.5"/>
        <circle class="progress" style="stroke-dashoffset:{
          $currentPostArrIDs.length > 0 && $currentPostID
          ? 170-(($currentPostArrIDs.indexOf($currentPostID))/($currentPostArrIDs.length-1))*170
          : 170
        }" cx="28" cy="28" r="27" 
        stroke="#FF4747" stroke-width="2"/>
      </svg>

  </button>
  <button class="downFloor {Object.keys(navigation).indexOf($currentCollectionID) === 0 ? 'hide' : ''}" 
    on:click={()=>{changeFloor('reverse')}}>
    <i class="material-icons">arrow_drop_down</i>
  </button>
  </div>

  <div class="gradient"></div>
  <iframe 
      bind:this={frame} 
      class="{$frameLoaded ? 'loaded' : ''} {navExpanded ? 'locked' : ''}"
      frameborder="0"
      src={($currentCollectionID)?'https://kuula.co/share/collection/'+$currentCollectionID+'?fs=0&vr=0&gyro=0&thumbs=-1&chromeless=1&logo=-1&zoom=1&enablejs=1&priority=1':''}
      title="End of the Year Show 2020"></iframe>
  
  <BottomNav/>

</main>

<style>
  nav section{
    width:100%;
    height:100px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    position:fixed;
    z-index:6;
  }
  nav.active section{
    background:#efefef;
    border-bottom:1px solid rgba(0,0,0,0.2)
  }
  .logo{
    height: 80px;
    margin: 0 16px 0 12px;
    pointer-events: all;
    position:relative;
  }
   .hamburger{
    border-radius:0;
    z-index:7;
    pointer-events:all;
    margin-right: 12px;
  }
  .hamburger.hide{
    opacity:0;
    pointer-events:none;
  }
  nav{
    width:100%;
    height:100%;
    position:absolute;
    top:0;left:0;
    z-index:5;
    overflow-y:scroll;
    pointer-events:none;
  }
  nav.active{
    pointer-events:all;
    background:#efefef;
  }
  
	main {
		position: fixed;
    top:0;
    left:0;
		display:grid;
		grid-template-columns: repeat(12, 1fr);
		column-gap: 16px;
		margin: 0 0 0 0;
		width:100%;
		height:100%;
		overflow:hidden;
		background:black;
	}
  main{
    opacity:0;
    transition:opacity 0.4s .4s;
  }

  main.loaded{
    opacity:1;
    transition:opacity 0.4s;

  }
  main iframe {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:calc(100%);
    border:none;
    z-index:0;
    border: none; background-color: rgb(0, 0, 0); max-width: 100%;
    opacity:0;
    transition:opacity 0.4s .4s;
}
  main iframe.loaded{
    opacity:1;
    transition:opacity 0.4s;
  }
  main iframe.locked{
    pointer-events:none;
  }
  .gradient{
   position: absolute;
    top: 0px;
    right: 0;
    background: rgba(0,0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 75%,rgba(0,0,0,.6) 100%);
    height: 100%;
    width: 100%;
    z-index: 3;
    pointer-events:none;
  }
  button{
    position:relative;
    height:64px;
    width:64px;
    color:white;
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
    background: white;
  }
  button:after{
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -2;
    transition: .3s;
    position: absolute;
    background: rgb(0,0,0);
    opacity: .75;
  }
  button:hover{
    cursor:pointer;
  }
  button:hover:after,.active button:after{
    background:var(--globalTheme);
  }
  button:hover:before{
    border-radius:50%;
  }
  button:hover:before,.active button:before{
    background:var(--globalTheme);
    cursor:pointer;
  }

  .planControls{
    left: 8px;
    position: absolute;
    bottom: 80px;
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 4;
    padding: 12px 12px 12px 12px;
    transition:.4s;
  }
  .planControls.hide{
    opacity:0;
    pointer-events:none;
  }
  .upFloor,.downFloor{
    position: relative;
    border-radius: 0;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    background: rgba(0,0,0,0);
    overflow: hidden;
  }
  .upFloor .material-icons,.downFloor .material-icons{
    font-size:56px;
    position:absolute;
  }
  .upFloor:hover,.downFloor:hover{
    border-radius:0;
    color:var(--globalTheme)
  }
  .active .upFloor:before,.active .upFloor:after,.upFloor,.upFloor:before,.upFloor:after,.upFloor:hover,.upFloor:hover:before,.upFloor:hover:after,.active .downFloor:before,.active .downFloor:after,.downFloor,.downFloor:before,.downFloor:after,.downFloor:hover,.downFloor:before,.downFloor:after,.downFloor:hover:before,.downFloor:hover:after{
    background:transparent;
  }
   .upFloor:hover,.upFloor:hover:before,.upFloor:hover:after,.downFloor:hover,.downFloor:hover:before,.downFloor:hover:after{
    border-radius:0;
  }
  .upFloor.hide, .downFloor.hide{
    opacity:0.2;
    pointer-events:none;
  }
  .plan{
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:4px 0 4px 0;
    width:80px;
    height:80px;
    border-radius: 50%;
    overflow: hidden;
  }
  .currentFloor{
    position:absolute;
    margin:0;
    font-weight: 900;
    font-size:18px;
  }
  
  @media only screen and (max-width: 600px) {
    .planControls{
      bottom:50px;
    }
    
  }
  
  
</style>