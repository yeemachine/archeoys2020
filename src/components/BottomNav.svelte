<script>
import * as animateScroll from "svelte-scrollto";
import {WIDTH,frameLoaded,currentCollectionID,currentFrameID,currentPostID, currentPlanID,currentPostArr,expandBottomNav} from '../stores.js'
import {findPost} from '../helpers.js'

let bottomNav
const maxCharCount = 42
const maxCharCountM = 28
const handleCarouselClick = (id) => {
    if(!$expandBottomNav){
      expandBottomNav.set(true)
    }else{
      if(id !== $currentPostID){
        findPost($currentFrameID,id)
      }
    }
  }

const scrollDone = (element, offset) => {
}

  //scroll to current post
  animateScroll.setGlobalOptions({
      container:'container',
      duration:500,
      offset:-100,
      scrollX:true,
      onDone:scrollDone,
      scrollY:false
  })

  $:{
    animateScroll.setGlobalOptions({
      offset:($WIDTH>600)? (-$WIDTH/2 + 180) : (-$WIDTH/2 + 120)
    })
  }

  let scrollToID = null
  $:{
      if(bottomNav && $currentPostID && scrollToID !== $currentPostID){
        scrollToID = $currentPostID
        animateScroll.scrollTo({element: '.slide-content[kuulaID="'+$currentPostID+'"]'})
      }
  }

  $:{
    if(bottomNav && $currentPostID && !$expandBottomNav){
        animateScroll.scrollTo({element: '.slide-content[kuulaID="'+$currentPostID+'"]'})
    }
  }

  let scrollToCollection = null
  $:{
    if(bottomNav && $frameLoaded && scrollToCollection !== $currentCollectionID){
      scrollToCollection = $currentCollectionID
      animateScroll.scrollTo({element: '.slide-content[kuulaID="'+$currentPostID+'"]'})
    }
  }

</script>

<section 
bind:this={bottomNav} class={!$expandBottomNav ? 'hide' : ''}>
  <button class="expandPosts" on:click={()=>{expandBottomNav.set(false)}}>
    <i class="material-icons">close</i>
  </button>
  <!-- <div class="thumb"></div> -->
  <!-- <div class="gradient"></div> -->
  <container>
            <div class="track">
              
             {#each $currentPostArr as post, i}
                <!-- {#if post.id !== $currentPlanID} -->
                  <div 
                    on:click={()=>{handleCarouselClick(post.id)}}
                    class="slide-content {$currentPostID===post.id ? 'selected' : ''}" 
                    kuulaID={post.id}
                  >
                    <label>
                      <span>{i>9 ? i : "0"+i} -</span>
                      {
                      ($WIDTH<600 && post.title.length>maxCharCount) ? post.title.slice(0,maxCharCount).trim()+'...' 
                      : ($WIDTH<600 && post.title.length>maxCharCountM) ? post.title.slice(0,maxCharCountM).trim()+'...' 
                      : post.title
                      }
                    </label>
                    <div class="mask" style="background-image:url({post.cover})">
                      <!-- <img src={post.cover} alt={post.title}/> -->
                    </div>
                  </div> 
                  <!-- {/if} -->
              {/each}
              
            </div>
       
  </container>
</section>

<style>
button{
    width: 64px;
    height: 64px;
    /* border-radius: 50%; */
    background: white;
    pointer-events: all;
}
button:hover{
    cursor: pointer;
}
.material-icons{
    font-size:32px;
    margin-top: 2px;
}

.expandPosts{
    z-index: 4;
    position: relative;
    background:rgb(60,60,60);
    transition: opacity .4s, border-radius .3s;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0 12px 12px 12px;
}
  .expandPosts:before{
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -2;
     transition:.3s;
    position: absolute;
    background: var(--globalTheme);
  }
  .expandPosts:after{
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -2;
    transition: .3s;
    position: absolute;
    background:var(--globalTheme);
    opacity: .75;
  }

.expandPosts:hover:before{
  border-radius:50%;
}
.hide .expandPosts{
  opacity:0;
  pointer-events: none;
}
section{
  position: absolute;
  bottom:0;
  left:0;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ;
  pointer-events:none;
  z-index: 4;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0,0,0);
}

section.hide{
  -webkit-transform: translate3d(0,calc(var(--carouselItemWidth)*9/16 + 20px),0);
  -moz-transform: translate3d(0,calc(var(--carouselItemWidth)*9/16 + 20px),0);
  transform: translate3d(0,calc(var(--carouselItemWidth)*9/16 + 20px),0)
}
.hide .thumb{
  opacity: 1;
}
  .thumb{
    width:60px;
    height:4px;
    background:rgba(255,255,255,0.7);
    margin:8px;
    border-radius:16px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.45);
-moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.45);
box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.45);
    opacity: 0;
    transition: .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ;
  }

  container{
    /* position: absolute;
    bottom: 0; */
    position: relative;
    z-index: 2;
    width: calc(100%);
    height: max-content;
    display: flex;
    overflow-x: scroll;
    padding: 40px 0 24px 0;
    background: var(--carouselBGColor);
    transition:opacity .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ;
    pointer-events:all;
    /* transform: rotate(-1deg); */
  }
  .gradient{
   position: absolute;
    top: 20px;
    right: 0;
    background: rgba(0,0,0,0.4);
    background: linear-gradient(90deg, rgba(0,0,0,0) 25%, rgba(0,0,0,.6) 100%);
    height: 100%;
    width: 10vw;
    min-width: 80px;
    z-index: 3;
  }
  .track{
    width:max-content;
    display:flex
  }
  
  .hide .slide-content{
    pointer-events: all;
  }

  .slide-content{
  margin:0 24px 0 24px;
  width:var(--carouselItemWidth);
  height:calc(var(--carouselItemWidth)*9/16);
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
  pointer-events: all;
}
/* .slide-content:last-child{
  margin-right:40px;
} */
.slide-content.selected{
  pointer-events: none;
}
.hide .slide-content.selected{
  pointer-events: all;
}
.slide-content:hover{
  cursor: pointer;
}

.slide-content:after{
    content: '';
    width: calc(100% + 48px);
    top: -40px;
    left: -24px;
    height: calc(100% + 64px);
    background: white;
    opacity: 0;
    position: absolute;
    z-index: -1;
    transition:opacity .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ;
}

  .slide-content:hover:after{
    opacity:0.05;
  }
  .slide-content.selected:after{
    opacity: 0.13;
  }
.slide-content:before{
    content: '';
    width: 2px;
    top: -40px;
    left: -24px;
    height: calc(100% + 64px);
    background: var(--globalTheme);
    /* opacity: 0; */
    position: absolute;
    transition: opacity .4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateY(calc(-1 * (100% + 64px)))
}
.slide-content.selected::before{
    transform: translateY(0)
}
.slide-content label{
    position: absolute;
    font-size: 14px;
    top: -40px;
    left: 0px;
    width: max-content;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    height: 40px;
    letter-spacing: 0;
    transition: opacity .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-weight: 700;
    opacity:0.3;
}

.slide-content label span{
  color:var(--globalTheme);
  padding-right:.3em;
}

.slide-content:hover label{
  opacity:1;
  cursor:pointer;
}


.slide-content.selected label{
  opacity:1;
}

  
  .slide-content .mask{
    width:100%;
    height:100%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: var(--carouselItemBorderRadius);
    transform: scale3d(1,1,1);
    background-position: center;
    background-size:cover;
    transition: opacity  .4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    /* transition: transform .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ; */
  }

.slide-content.selected .mask{
      /* transform: scale3d(1.1,1.1,1.1) */
  }
  .slide-content img{
    width:var(--carouselItemWidth);
    height:auto;
    /* transition: opacity  .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) */
  }
  .hide .slide-content .mask{
    opacity:0;
}
  @media screen and (max-width: 600px) {
 
 section.hide{
  -webkit-transform: translate3d(0,calc(var(--carouselItemWidth)*9/16 + 20px),0);
  -moz-transform: translate3d(0,calc(var(--carouselItemWidth)*9/16 + 20px),0);
  transform: translate3d(0,calc(var(--carouselItemWidth)*9/16 + 20px),0)
}
  }  

</style>