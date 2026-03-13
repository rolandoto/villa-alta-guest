"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {

  const [loaded, setLoaded] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const metaLRef = useRef<HTMLDivElement>(null);
  const metaRRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const loaderRef = useRef<HTMLDivElement>(null);

  const heroImg = "/images/hero-back3.avif";

  // Loader animation
 useEffect(() => {

  const tl = gsap.timeline()

  tl.from(".loader-circle",{
    scale:0,
    opacity:0,
    duration:1.2,
    ease:"expo.out"
  })

  .from(".loader-va",{
    opacity:0,
    y:10,
    duration:1,
    ease:"power3.out"
  },"-=0.6")

  .from(".loader-sub",{
    opacity:0,
    y:15,
    duration:1,
    ease:"power3.out"
  },"-=0.5")

  .to(".loader-line",{
    scaleX:1,
    duration:1.2,
    ease:"power3.out"
  },"-=0.8")

  .to(loaderRef.current,{
    delay:1.2,
    opacity:0,
    duration:1.2,
    ease:"power2.out",
    onComplete:()=>{
      setLoaded(true)
      startHeroAnim()
    }
  })

},[])
  function startHeroAnim(){

    const tl = gsap.timeline()

    tl.from(bgRef.current,{
      scale:1.12,
      duration:2.6,
      ease:"expo.out"
    })
    .from(titleRef.current,{
      y:80,
      opacity:0,
      duration:1.6,
      ease:"expo.out"
    },"-=2.2")
    .from(".hero-sub",{
      y:28,
      opacity:0,
      duration:1.1,
      ease:"expo.out"
    },"-=1.2")
    .from(metaLRef.current,{
      x:-35,
      opacity:0,
      duration:.9,
      ease:"expo.out"
    },"-=0.8")
    .from(ctaRef.current,{
      y:22,
      opacity:0,
      duration:.8,
      ease:"power2.out"
    },"-=0.7")
    .from(metaRRef.current,{
      x:35,
      opacity:0,
      duration:.9,
      ease:"expo.out"
    },"-=0.7")

    gsap.to(bgRef.current,{
      yPercent:28,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:1.5
      }
    })

    gsap.to(titleRef.current,{
      y:-90,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:2
      }
    })

  }

  return(
    <>

    <div
ref={loaderRef}
style={{
position:"fixed",
inset:0,
background:"#4b2727",
display:loaded?"none":"flex",
alignItems:"center",
justifyContent:"center",
flexDirection:"column",
zIndex:9999
}}
>

<div
className="loader-circle"
style={{
width:90,
height:90,
border:"1px solid rgba(255,255,255,.35)",
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:30
}}
>

<span
className="loader-va"
style={{
fontFamily:"Barlow Condensed, sans-serif",
fontSize:22,
letterSpacing:".35em",
color:"#fff",
fontWeight:600
}}
>
VA
</span>

</div>

<div
className="loader-sub"
style={{
fontFamily:"Barlow Condensed, sans-serif",
fontSize:11,
letterSpacing:".5em",
color:"rgba(255,255,255,.7)",
textTransform:"uppercase",
marginBottom:12
}}
>
Villa Alta Guest House
</div>

<div
style={{
width:80,
height:1,
background:"rgba(255,255,255,.15)",
overflow:"hidden"
}}
>
<div
className="loader-line"
style={{
width:"100%",
height:"100%",
background:"rgba(255,255,255,.6)",
transform:"scaleX(0)",
transformOrigin:"left"
}}
/>
</div>

</div>

  
    <section
    ref={heroRef}
    style={{
      position:"relative",
      height:"100vh",
      overflow:"hidden",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}
    >

      <div
      ref={bgRef}
      style={{
        position:"absolute",
        inset:"-8%",
        backgroundImage:`url(${heroImg})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
      
      }}
      />


      <div
ref={titleRef}
style={{
position:"relative",
zIndex:10,
textAlign:"center"
}}
>

<h1
style={{
fontFamily:"Barlow Condensed, sans-serif",
fontWeight:900,
fontSize:"clamp(90px,18vw,90px)",
lineHeight:.85,
letterSpacing:"-.03em",
textTransform:"uppercase",

backgroundImage:`url(${heroImg})`,
backgroundSize:"cover",
backgroundPosition:"center",

WebkitBackgroundClip:"text",
backgroundClip:"text",

}}
>
VILLA ALTA
</h1>

<span
className="hero-sub"
style={{
display:"block",
fontFamily:"Barlow Condensed",
fontWeight:200,
fontSize:"clamp(13px,2vw,34px)",
letterSpacing:".75em",
textTransform:"uppercase",

marginTop:16
}}
>
GUEST HOUSE
</span>

</div>

  

      <div style={{
        position:"absolute",
        bottom:"11vh",
        left:0,
        right:0,
        display:"flex",
        justifyContent:"space-between",
        padding:"0 56px",
        zIndex:10
      }}>

        <div ref={metaLRef} style={{
          fontFamily:"Barlow Condensed",
          fontSize:10,
          letterSpacing:".22em",
          textTransform:"uppercase",
        
          lineHeight:2
        }}>
          Villa Alta Guest House<br/>
          Centro Histórico · Cartagena
        </div>

        <div ref={ctaRef}>

          <button
          style={{
            padding:"14px 56px",
            background:"transparent",
            color:"#fff",
            border:"1px solid rgba(255,255,255,.4)",
            borderRadius:40,
            letterSpacing:".3em",
            fontFamily:"Barlow Condensed"
          }}
          >
            DISCOVER MORE
          </button>

        </div>

        <div ref={metaRRef} style={{
          fontFamily:"Barlow Condensed",
          fontSize:10,
          letterSpacing:".22em",
          textTransform:"uppercase",
      
          textAlign:"right",
          lineHeight:2
        }}>
          Cartagena<br/>
          Colombia
        </div>

      </div>

    </section>

    </>
  )

}
