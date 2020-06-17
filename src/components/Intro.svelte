<script>
import {intro} from '../config.js'
export let styles = ''

</script>

<!-- <div style={styles}>
  <container class="info">
  <container>
    <h3>{intro.eyebrow}</h3>
    <h2>{@html intro.title}</h2>
      {#each intro.list as item, i}
        <p><b>{item.title}:</b> {item.text}</p>
      {/each}
  </container>
  </container>

  <container class="para">
    {#each intro.paragraphs as item, i}
      <p>{@html item}</p>
    {/each}
  </container>
</div> -->


<div style={styles}>

  <content>
  <div class="no-break">
  <h2>{intro.title}</h2>
    {#each intro.list as item, i}
        <p class="date"><b>{item.title}:</b> {item.text}</p>
    {/each}
  </div>
    <hr>
    {#each intro.paragraphs as item, i}
      <p>{@html item}</p>
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
    color:#c5c5c5;
  }
  .no-break{
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid-column;
    display: table;
    width:100%;
    color:white;
    margin-bottom: 24px;
  }
  h2{
    text-transform: uppercase;
    word-spacing: .2em;
    margin: 0 0 24px 0px;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.1;
    width: max-content;
    padding: 24px;
    color: white;
    background: rgba(40,40,40,1);
  }
p{
  color:#c5c5c5;
}
b{
  color:white;
}
h3{
      width: 100%;
    margin: 0 0 4px 0;
    font-size: 12px;
    text-transform: uppercase;
    display:none;
}
:global(p>hr){
    width: 48px;
    color: white;
    margin-top:24px;
    margin-bottom:24px;
    /* margin: 0; */
    border: 0;
    border-bottom: 1px solid;
}

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
  hr{
    opacity: 0;
    margin: 12px 0 32px 0;
  }


  @media only screen and (max-width: 600px) {
    hr{
      opacity: .5;
    }
  }

</style>