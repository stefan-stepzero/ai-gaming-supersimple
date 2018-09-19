function Goal() {

  this.pos = [];
  this.size = 10;

  this.goalstart = function() {
    this.pos = createVector(300,10);
  }

  this.show = function() {
    fill(0,255,0);
    ellipse(this.pos.x,this.pos.y,this.size,this.size)
  }


}
