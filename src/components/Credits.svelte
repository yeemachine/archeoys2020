<script>
import {credits} from '../config.js'
export let styles = ''
</script>

<div class="credits" style={styles}>

  <content>
    <h2>{credits.title}</h2>
    <div class="orgGroup">

    {#each credits.orgs as org}
        <div class="org">
            <h5>{org.name}</h5>
            {#each org.people as person}
                <p class="people">
                    {@html person.title ? person.name+', <i>'+person.title+'</i>':person.name}
                </p>
            {/each}
        </div>
    {/each} 
    </div>   
    
    <div class="exhibition">
    {#each credits['EXHIBITION'] as group,i}
        {#if i === 0}
        <div class="no-break">
            <h3>Exhibition</h3>
            <div class="group">
                <h4>{group.groupName}</h4>
                {#each group.people as person}
                    <p class="people">
                        {@html person.title ? person.name+', <i>'+person.title+'</i>':person.name}
                    </p>
                {/each}
            </div>
        </div>
        {:else}
        <div class="group">
            <h4>{group.groupName}</h4>
            {#each group.people as person}
                <p class="people">
                {@html person.title ? person.name+', <i>'+person.title+'</i>':person.name}
                </p>
            {/each}
        </div>
        {/if}
    {/each}
    </div>

    <div class="relations">
    <h3>Public Relations</h3>
    {#each credits['PUBLIC RELATIONS'].people as person}
        <p class="people">
            {@html person.title ? person.name+', <i>'+person.title+'</i>':person.name}
        </p>
    {/each}
    </div>

    <div class="no-break">
    <h3>Special Thanks</h3>
    <p>{credits['SPECIAL THANKS'].intro}</p>
    </div>
    <div>
    {#each credits['SPECIAL THANKS'].people as person}
        <p class="people">
            {@html person.title ? person.name+', <i>'+person.title+'</i>':person.name}
        </p>
    {/each}
    </div>
    {#each credits['SPECIAL THANKS'].orgs as org}
        <p class="people">{org}</p>
    {/each}
    <p>{credits['SPECIAL THANKS'].outro}</p>

</content>

</div>

<style>
.credits{
    max-width: 1400px;
    margin: 0 48px 0 48px;
}

.org,.group,.no-break,.relations{
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid-column;
    display: table;
    width:100%;
}
.orgGroup,.exhibition,.relations{
    margin-bottom:40px;
}
.group{
    background:rgb(60,60,60);
    padding:0 16px 0 16px;
    width:calc(100% - 32px)
}

.exhibition h3{
    padding:24px 16px 24px 16px;
    margin: 0 0 0 0;
    background: rgb(60,60,60);
    border-bottom: 1px solid rgb(100,100,100);
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
    color:white;
  }
    h2{
    text-transform: uppercase;
    word-spacing: .2em;
    margin: 0 0 24px 0px;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.3;
    /* text-align: center; */
    padding: 16px;
    color: white;
    background: rgb(40,40,40);
  }
  h3{
      text-transform: uppercase;
      font-size:22px;
      margin-top:0;
  }
  h4{
     margin: 24px 0 10px 0;
     color:#c5c5c5;
  }
  h5{
      font-weight: 700;
      color:#c5c5c5;
  }

  p{
    color:#c5c5c5;
    margin: 0 0 0 0;
    padding:0 0 12px 0;
    font-size: 14px;
    line-height: 1.6;
    font-weight: 400;
  }
  .people{
     margin: 0 0 0 16px; 
  }

  :global(a){
    color:#4488FB;
    text-decoration:underline;
  }
    @media only screen and (max-width: 700px) {
        .credits{margin: 0 24px 0 24px;}
    }

  @media only screen and (max-width: 600px) {
  .credits{
    width:100%;
    margin:0;
  }
  }
</style>