var imgs = [
        'https://images.unsplash.com/photo-1529788295308-1eace6f67388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
        'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFzdHJvbm9teXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
        'https://images.unsplash.com/photo-1591302418462-eb55463b49d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXN0cm9ub215fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
        'https://images.unsplash.com/photo-1522087066130-0c8c39bb0558?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFzdHJvbm9teXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
        'https://images.unsplash.com/photo-1605704311533-443f1f58874f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFzdHJvbm9teXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60',
        'https://images.unsplash.com/photo-1589225529399-8705282f98e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFzdHJvbm9teXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60'
      ],
      n = imgs.length,
      current = n-1,
      closedWidth = Math.floor(window.innerWidth/11)
    
    
    for (var i=0; i<n; i++){
    
    var bgImg = document.createElement('div');
    bg.appendChild(bgImg);
    
    gsap.set(bgImg, {
      attr:{id:'bgImg'+i, class:'bgImg'},
      width:'100%',
      height:'100%',
      backgroundImage:'url('+imgs[i]+')',
      backgroundSize:'cover',
      backgroundPosition:'center'
    })
    
    var b = document.createElement('div');
    fg.appendChild(b);
    
    gsap.fromTo(b, {
      attr:{id:'b'+i, class:'box'},
      innerHTML:'<p><sub>Fig.</sub> '+(i+1)+'</p>',
      width:'100%',
      height:'100%',
      borderLeft:(i>0)?'solid 1px #eee':'',
      backgroundColor:'rgba(250,250,250,0)',
      left:i*closedWidth,
      transformOrigin:'100% 100%',
      x:'100%'
    },{
      duration:i*0.15,
      x:0,
      ease:'expo.inOut'
    })  
    
    b.onmouseenter = b.onclick = (e)=>{    
      if (Number(e.currentTarget.id.substr(1))==current) return;
       
      var staggerOrder = !!(current < Number(e.currentTarget.id.substr(1)));
      current = Number(e.currentTarget.id.substr(1));
      gsap.to('.box', {
        duration:0.5,
        ease:'elastic.out(0.3)',
        left:(i)=>(i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth),
        x:0,
        stagger: staggerOrder? 0.05:-0.05
      })
      
      bg.appendChild( document.getElementById('bgImg'+current) )
      gsap.fromTo('#bgImg'+current, {opacity:0}, {opacity:1, duration:0.3, ease:'power1.inOut'})
      gsap.fromTo('#bgImg'+current, {scale:1.05, rotation:0.05}, {scale:1, rotation:0.5, duration:1.5, ease:'sine'}) 
    }
    }
    
    
    window.onresize = (e)=>{
    closedWidth = Math.floor(window.innerWidth/10)
    gsap.set('.box', { x:0, left:(i)=> (i<=current)? i*closedWidth: window.innerWidth-((n-i)*closedWidth) })
    }
    
    document.querySelector('#fg').onclick = (e)=>{
    window.open(imgs[current], '_self') 
    }