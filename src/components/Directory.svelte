<script>
import {navigation} from '../config.js'
export let styles = ''
export let subtitle = false
</script>

<div style={styles}>
  <h2>Exhibition Directory</h2>
  <content>
    {#each Object.keys(navigation) as floorID, i}
        <div class="floor" style="--themeColor:{navigation[floorID].color}">
          <h3>{@html navigation[floorID].title}</h3>
          {#each Object.keys(navigation[floorID].posts) as postID, j}
            <div class="post">
            <a href='/?collection={floorID}&post={postID}'>
                <h4>
                  {navigation[floorID].posts[postID].title.full}
                </h4>
                {#if subtitle && navigation[floorID].posts[postID].subtitle}
                <p class="subtitle">{navigation[floorID].posts[postID].subtitle}</p>
                {/if}
                <p>
                  {navigation[floorID].posts[postID].names}
                </p>
            </a>
            </div>
          {/each}
        </div>
    {/each}
  </content>
  </div>


<style>
content{
    -webkit-column-width: 20em;
    -moz-column-width: 20em;
    column-width: 20em;
    -webkit-column-gap: 2em;
    -moz-column-gap: 2em;
    column-gap: 2em;
    text-align: left;
    display: block;
    height: max-content;
    width: calc(100% - 48px);
    margin: 24px 24px 24px 24px;
    color:var(--charcoal);
  }
  .floor{
    --themeColor:#000;
    margin:0 0 24px 0
  }
  .floor .post:nth-child(2){
    border:0;
    padding-top:0;
  }
  .post{
    border-top: 1px solid rgba(0,0,0,0.1);
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid-column;
    display: table;
    width: calc(100% - 24px);
    padding: 12px 24px 0 0px;
    margin: 12px 0 0 0;
    position: relative;
  }
  .post:before{
    content:'';
    position: absolute;
    top: 17px;
    right: 0;
    pointer-events: none;
    border-style: solid;
    border-width: 10px 7px 0px 7px;
    border-color: var(--themeColor) transparent transparent transparent;
    transform-origin:center;
    transform:rotate(90deg);
    opacity:0;
  }
  .floor .post:nth-child(2):before{
    top:5px;
  }
  .post:hover:before{
    opacity:1;
  }
  h2{
    text-transform:uppercase;
    word-spacing:.2em;
    margin:0 0 40px 12px;
    font-weight: 700;
    font-size: 40px;
    line-height: 1.1;
    width:calc(100% - 24px);
    text-align:center;
    color:var(--charcoal)
  }
  h3{
        text-transform: uppercase;
    word-spacing: .2em;
    margin: 0;
    padding: 0 10px 0 20px;
    /* width: max-content; */
    position: relative;
    font-weight: 200;
    font-size: 18px;
    line-height: 2.4;
  }
  h3:before{
    content: '';
    width: 12px;
    height: 100%;
    position: absolute;
    background: var(--themeColor);
    top: 0;
    left: 0;
  }
  h3:after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: black;
    opacity: 0.03;
    top: 0;
    left: 0;
  }
  h4{
    margin:0 0 4px 0;
    line-height:1.2;
    font-size:14px;
  }
  p{
    margin:0 0 0 24px;
    font-size:14px;
    font-weight:400; 
  }

  .subtitle{
      font-style: italic;
      font-family:'Noto Sans', sans-serif;
      margin:6px 0 4px 24px
  }

  a{
    color:rgb(25,25,25);
    text-decoration:none;
  }
  a:hover{
    text-decoration:underline;
  }
  :global(sup){
    font-size:.5em;
  }
</style>