window.onload = function() {
  var possible = "АаБбВвГгЃѓҐґДдЂђЕеЄєЀѐЁёЖжЗзИиЇїЙйЌќЛлЉљЊњПпЋћФфЏџЩщЫыЮюЯяѬѭѪѫѦѧꙖꙗѶѷѮѯ";
  function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }
  function component(width, height, color, x, y, w) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    var ctx = w.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  function full(b, w) {
    var ctx=w.getContext("2d"),b1=b-6,b2=b-4,b3=b-2,b4=b,bk="#000000",gr="#005000",wi=w.width,he=w.height;
    ctx.fillStyle=bk;ctx.fillRect(0,0,wi,he);
    ctx.fillStyle=gr;ctx.fillRect(b1,b1,wi-2*b1,he-2*b1);
    ctx.fillStyle=bk;ctx.fillRect(b2,b2,wi-2*b2,he-2*b2);
    ctx.fillStyle=gr;ctx.fillRect(b3,b3,wi-2*b3,he-2*b3);
    ctx.fillStyle=bk;ctx.fillRect(b4,b4,wi-2*b4,he-2*b4);
  }
  function niceW(w) {
    var ctx = w.getContext("2d");
    ctx.font="20px Impact,Charcoal,sans-serif";
    ctx.fillText("Spielen Spielen Spielen",20,50);
  }

  var allTaken = [];
  var currentTaken = [];
  function addW(l) {
    var character = possible.charAt(Math.floor(Math.random()*possible.length));
    var place;
    while (true) {
      place = Math.floor(Math.random()*l);
      if (!currentTaken[place]) break;
    }
    currentTaken[place] = character;
  }
  function addWNomr(p) {
    var character = possible.charAt(Math.floor(Math.random()*possible.length));
    var place;
    while (true) {
      place = Math.floor(randn_bm()+p);
      if (!currentTaken[place] && place>=0) break;
    }
    currentTaken[place] = character;
  }
  function animateAllTaken(ctx) {
    allTaken.forEach((row, i) => {
      row.forEach((character, j) => {
        ctx.fillText(character,20+20*j,20+20*i);
      });
    });
  }

  var windowLeft  = document.getElementById("l");
  var windowRight = document.getElementById("r");

  //var a = new component(30, 30, "green", 10, 120, windowLeft);
  //niceW(windowLeft);
  var text = "Spielen Spielen Spielen Spielen Spielen Spielen";
  var i = 1;
  var time = 0;
  function draw() {
    var ctxR = windowRight.getContext('2d');
    var ctxL = windowLeft.getContext('2d');
    ctxR.font="20px Impact,Charcoal,sans-serif";
    ctxR.clearRect(0, 0, windowRight.width, windowRight.height);
    ctxL.clearRect(0, 0, windowLeft.width, windowLeft.height);
    full(10, windowRight);
    full(10, windowLeft);
    ctxL.fillStyle="#005000"

    if (time % 10 === 0 && time <=1000) {
      currentTaken = [];
      var x = Math.exp(time/400), l = Math.floor(Math.random()*(x<10?x:10));
      for (var i=0;i<l;i++) addWNomr(10);
      for (var i=0;i<l;i++) addWNomr(windowLeft.width/20-12);
      allTaken.unshift(currentTaken);
      if (allTaken.length > Math.floor(windowLeft.height/20)-1) allTaken.splice(-1,1);
    }
    var m;
    if (time % 10 === 0 && time>1000) {
      if (time>1000 && time<1500) m = 40;
      else m = 20;
      currentTaken = [];
      var l = Math.floor(Math.random()*m);
      for (var i=0;i<l;i++) addW(windowLeft.width/20-2);
      allTaken.unshift(currentTaken);
      if (allTaken.length > Math.floor(windowLeft.height/20)-1) allTaken.splice(-1,1);
    }
    animateAllTaken(ctxL);

    ctxR.fillStyle="#005000";
    ctxR.fillText(text.substring(0, i),20,40);
    i = i<text.length?i+1:i;
    time++;
    window.requestAnimationFrame(draw);
  }

  window.requestAnimationFrame(draw);
}