import{S as n,P as o,W as e,s as t,a as i,A as s,T as a,M as d,b as r,c as w}from"./vendor.1ecb2eb8.js";const c=new n,p=new o(75,window.innerWidth/window.innerHeight,.1,1e3),l=new e({canvas:document.querySelector("#bg")});l.setPixelRatio(window.devicePixelRatio),l.setSize(window.innerWidth,window.innerHeight),l.outputEncoding=t,p.position.setZ(30),p.position.setX(-3),l.render(c,p);const m=new i(16777215);m.position.set(5,5,5);const u=new s(16777215);c.add(m,u),(new a).load("space.jpg");const g=(new a).load("moon.jpg"),b=(new a).load("normal_x.png"),y=new d(new r(2,96,96),new w({map:g,normalMap:b}));function h(){const n=document.body.getBoundingClientRect().top;y.rotation.x-=.04,y.rotation.y-=.025,p.position.z=-.002*n}c.add(y),y.position.z=-2,y.position.setX(-5),y.rotation.y+=.2,document.body.onscroll=h,h(),function n(){requestAnimationFrame(n),l.render(c,p)}();