function Dot() {

//set dot variables
this.pos = [];
this.vel = [];
this.acc = [];
this.dead = false;
this.step = 0;
this.reachedgoal = false;
this.distancetogoal = 0;
this.fitness = 0;
this.childbrain = [];
this.isBest = false;

//sets up dot and creates instance
  this.dotstart = function() {
    //generate brain: an array of vectors
    this.brain = new Brain(400); // ALSO CHANGE MINSTEP IN POP FUNCTION
    this.brain.brainstart();
    this.pos = createVector(width/2,(height-10));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
  }

//function draws dot
  this.show = function() {
    //different colour and size if its the best dot
    if(this.isBest) {
      //console.log("best");
      fill(255,0,255);
      ellipse(this.pos.x,this.pos.y,4,4);
    } else {
    fill(0);
    ellipse(this.pos.x,this.pos.y,4,4);
    }
  }

//function moves dot based on accel and vel vectors from brain
this.move = function() {
    if(this.brain.directions.length > this.brain.step){
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    } else {
      //checks no more moves from above and kills dot
      this.dead = true;
    }
    //console.log(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
  }

  //updates dot: checks if not dead or hit wall, then move
  this.update = function() {
    //console.log(dist(this.pos.x,this.pos.y,obstacle.pos.x,obstacle.pos.y));
    if (!this.dead && !this.reachedgoal) {
      this.move();
      if (this.pos.x<2||this.pos.x > (width-2)||this.pos.y<2||this.pos.y>(height-2)) {
        this.dead = true;
      } else if (dist(this.pos.x,this.pos.y,goal.pos.x,goal.pos.y) < 5){
        this.reachedgoal = true;
        this.dead = true;
      } else if (dist(this.pos.x,this.pos.y,obstacle.pos.x,obstacle.pos.y) < obstacle.size/2){
        this.dead = true;
      }
    }
  }

  //calculate fitness based on distance to goal
  this.calculatefitness = function () {
    if (this.reachedgoal) {
      this.fitness = 1/10 +1000/(this.brain.step*this.brain.step)
    } else {
      this.distancetogoal = dist(this.pos.x,this.pos.y,goal.pos.x,goal.pos.y);
      this.fitness = 1/(this.distancetogoal*this.distancetogoal)
    }
  }

  //create a dot with identical brain
  this.createChild = function() {
    this.child = new Dot();
    this.child.dotstart();
    this.child.brain = this.brain.cloneBrain();
    return this.child;
  }

}
