window.onload = function() {
  document.addEventListener('contextmenu', event => event.preventDefault());

  document.getElementById('i').ondragstart = function() { return false; };
  function component(width, height, color, x, y, ctx) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  function button(width, height, color, x, y, ctx, bold, text, w) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.text = text;
    this.bold = bold;
    this.ctx = ctx
    this.ctx.fillStyle = color;
    this.hoover = false;
    this.boundsToDetect = [x+w.offsetLeft, x+w.offsetLeft+this.width, y+w.offsetTop, y+w.offsetTop+this.height]
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(this.x+this.bold, this.y+this.bold, this.width-2*this.bold, this.height-2*this.bold);
    this.ctx.fillStyle = color; this.text = this.text || ""; this.ctx.font="20px Impact,Charcoal,sans-serif";
    this.ctx.fillText(this.text,this.x+this.bold*2, this.y+(this.height)*2/3);
  }

  button.prototype.redraw = function(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(this.x+this.bold, this.y+this.bold, this.width-2*this.bold, this.height-2*this.bold);
    this.ctx.fillStyle = color; this.text = this.text || ""; this.ctx.font="20px Impact,Charcoal,sans-serif";
    this.ctx.fillText(this.text,this.x+this.bold*2, this.y+(this.height)*2/3);
  }

  button.prototype.isPointInPath = function(x, y){
    return (x>this.boundsToDetect[0]) && (x<this.boundsToDetect[1]) && (y>this.boundsToDetect[2]) && (y<this.boundsToDetect[3]);
  };

  function full(b, w) {
    var ctx=w.getContext("2d"),b1=b-6,b2=b-4,b3=b-2,b4=b,bk="#000000",gr="#005000",wi=w.width,he=w.height;
    ctx.fillStyle=bk;ctx.fillRect(0,0,wi,he);
    ctx.fillStyle=gr;ctx.fillRect(b1,b1,wi-2*b1,he-2*b1);
    ctx.fillStyle=bk;ctx.fillRect(b2,b2,wi-2*b2,he-2*b2);
    ctx.fillStyle=gr;ctx.fillRect(b3,b3,wi-2*b3,he-2*b3);
    ctx.fillStyle=bk;ctx.fillRect(b4,b4,wi-2*b4,he-2*b4);
  }

  var windowLeft  = document.getElementById("l");
  var windowRight = document.getElementById("r");

  var i = 1;
  var time = 0;

  var ctxR = windowRight.getContext('2d');
  var ctxL = windowLeft.getContext('2d');

  var appButton = new button(120, 40, "#004000", 11, 11, ctxL, 4, "Applications", windowLeft);
  var strButton = new button(120, 40, "#004000", 131, 11, ctxL, 4, "Places", windowLeft);

  document.getElementById("i").addEventListener("mousemove", function (e) {
    var x = e.screenX + window.pageXOffset;
    var y = e.screenY + window.pageYOffset - 71;
    appButton.hoover = appButton.isPointInPath(x, y);
    strButton.hoover = strButton.isPointInPath(x, y);
  }, false);

  function draw() {
    ctxR.font="20px Impact,Charcoal,sans-serif";
    ctxR.clearRect(0, 0, windowRight.width, windowRight.height);
    ctxL.clearRect(0, 0, windowLeft.width, windowLeft.height);
    full(10, windowRight);
    full(10, windowLeft);
    appButton.redraw(appButton.hoover ? "#ff4000" : "#004000");
    strButton.redraw(strButton.hoover ? "#ff4000" : "#004000");
    window.requestAnimationFrame(draw);
  }

  window.requestAnimationFrame(draw);
}