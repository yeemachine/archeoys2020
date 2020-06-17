<script>
import {about} from '../config.js'
export let styles = ''
</script>

<div style={styles}>

  <content>
  <h2>{about.title}</h2>
    {#each about.paragraphs as item, i}
        <p>{@html item}</p>
    {/each}

  <button 
  on:click={()=>{window.location.href='/?collection=7lVLb&post=7Zh1R'}} 
  class="enter">
  Enter Exhibition
  </button>
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
  h2{
    text-transform: uppercase;
    word-spacing: .2em;
    margin: 0 0 40px 0px;
    font-weight: 700;
    font-size: 40px;
    line-height: 1.1;
    width: max-content;
    /* text-align: center; */
    padding: 24px;
    color: white;
    background: rgb(40,40,40);
  }

  p{
    color:#c5c5c5;
    margin: 0 0 32px 0;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
  }

  :global(a){
    color:#4488FB;
    text-decoration:underline;
  }

    .enter{
    --themeColor: white;
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
</style>