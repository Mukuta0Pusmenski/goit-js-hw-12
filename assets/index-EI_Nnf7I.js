import l from"izitoast";import p from"simplelightbox";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const g="47345734-08f76e4fa789f0ddb3136f311";async function y(t,s=1){const r=await fetch(`https://pixabay.com/api/?key=${g}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}`);if(!r.ok)throw new Error("Failed to fetch images");return r.json()}function f(t,s,r=!1){const i=t.map(e=>`
        <div class="image-item">
            <a href="${e.largeImageURL}" data-lightbox="image-gallery" data-title="Likes: ${e.likes}, Views: ${e.views}, Comments: ${e.comments}, Downloads: ${e.downloads}">
                <img src="${e.webformatURL}" alt="${e.tags}">
            </a>
            <div class="image-stats">
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
            </div>
        </div>
    `).join("");r?s.innerHTML+=i:s.innerHTML=i}const h=document.getElementById("search-form"),w=document.getElementById("search-input"),u=document.getElementById("image-results"),c=document.getElementById("load-more"),n=document.getElementById("loader");let d=1,a="";h.addEventListener("submit",async t=>{if(t.preventDefault(),a=w.value.trim(),d=1,!a||!/^[a-zA-Z0-9\s]+$/.test(a)){l.error({title:"Error",message:"Invalid search query. Please enter a valid search term."});return}u.innerHTML="",c.style.display="none",n.style.display="block";try{const r=await y(a,d);if(r.hits.length===0){l.error({title:"Sorry",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"red",position:"center",timeout:5e3}),n.style.display="none";return}f(r.hits,u),c.style.display="block",new p(".image-item a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),n.style.display="none"}catch(r){l.error({title:"Error",message:`An error occurred: ${r.message}`}),n.style.display="none"}});c.addEventListener("click",async()=>{d+=1,n.style.display="block";try{const t=await y(a,d);if(t.hits.length===0){l.error({title:"End of results",message:"No more images to load.",backgroundColor:"yellow",position:"center",timeout:5e3}),c.style.display="none",n.style.display="none";return}f(t.hits,u,!0),new p(".image-item a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),n.style.display="none",window.scrollBy({top:document.documentElement.clientHeight,behavior:"smooth"})}catch(t){l.error({title:"Error",message:`An error occurred: ${t.message}`}),n.style.display="none"}});
