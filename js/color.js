var heading=document.querySelectorAll('.heading');
var rule=CSSRulePlugin.getRule('.heading::after');
var tl=new TimelineLite();
tl.staggerFrom('.heading',1,{
    y:'100px',
    opacity:0,
    ease:'power1.out'
    
    },0.5)
    .to(rule,1,{
        cssRule:{scaleY:0},
        ease:'power1.out'
    },-0)
    .staggerTo('.heading',1,{
        y:'-110px',
        ease:'power3.out',
        x:'-250px',
        fontSize:'35px'
    },0.5)
    .from('.place_holder2',1,{
        opacity:0,
        y:'200px',
        ease:'power2.out'
    },'-=0.7')
    .staggerFrom('.column_item',1,{
        opacity:0,
        x:'-100px',
        ease:'power2.out',
        stagger:0.1
    },'-=0.2')
    .from('.row_item',1,{
        opacity:0,
        x:'-100px',
        ease:'power2.out',
        stagger:0.1
    },'-=1.8')
    .from('.mobile,.mobileBackground,.controlBoard',1,{
        opacity:0,
        x:'-200px',
        ease:'power2.out'
    },'-=1.2')
    .staggerFrom('.boardNotation,.boardDetailes',0.5,{
        opacity:0,
        y:'-10px',
        ease:'power2.out',
        stagger:0.1
    },'-=0.5')
    ;
    