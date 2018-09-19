function Obstacle() {
  this.pos = [];
  this.size = 500;

  this.obstaclestart = function() {
    this.pos = createVector(300,300);
  }

  this.show = function() {
    fill(204,0,0);
    ellipse(this.pos.x,this.pos.y,this.size);
  }

}
