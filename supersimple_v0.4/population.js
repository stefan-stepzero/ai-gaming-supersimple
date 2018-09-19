function Population(psize) {

  //define variables
  //original array
  this.dots = [];
  //array for breeding
  this.newdots = [];
  this.parent = [];
  this.generation = 1;
  this.minstep = 400; //must also change if changing number of dot direct

  //create n dots
  this.popstart = function() {
    for(var i = 0; i<psize ;i++) {
      this.dots[i] = new Dot();
      this.dots[i].dotstart();
    }
  }

  //show each of the n dots
  this.show = function(){
    for(var i = 1; i < this.dots.length; i++){
      this.dots[i].show();
    }
    this.dots[0].show();
  }

  //update each of the dots
  this.update = function(){
    for(var i = 0; i< this.dots.length; i++){
      //kill dots if they take too many steps compared to last generation
      if(this.dots[i].brain.step > this.minstep) {
        this.dots[i].dead = true;
      }
      this.dots[i].update();
    }
  }

  //get fitness for each dot
  this.getfitness = function() {
    for(var i = 0; i< this.dots.length; i++) {
      this.dots[i].calculatefitness();

    }
  }

  //check all dots are dead
  this.markdead = function() {
    for(var i = 0; i<this.dots.length ;i++) {
      if(!this.dots[i].dead) {
        return false;
      }
    }
    return true;
  }

  //select ideal parents & breed babies
  this.naturalSelection = function() {
    //get best dot
    this.setbestdot();
    //get fitness sum for whole generation
    this.calculateFitnessSum();
    //add best dot to pool
    this.newdots[0] = this.dots[this.bestDot].createChild();
    this.newdots[0].isBest = true;
    //create arraoy of new dots for next generation
    for(var i = 1; i<this.dots.length ;i++) {
      this.newdots[i] = new Dot();
      this.newdots[i].dotstart();
    }
    //select parent and copy its good brain
    for(var i = 1; i<this.newdots.length ;i++) {
      this.parent = this.selectParent();
      this.newdots[i] = this.parent.createChild();
    }
    //set next gen of dots as new dots to use
    this.dots = this.newdots.slice();
    //grow generation
    this.generation ++;
    console.log(this.generation);
  }

  //get total fitness sum for the generation
  this.calculateFitnessSum = function() {
    this.fitnessSum = 0;
    for(var i = 0; i<this.dots.length ;i++) {
      this.fitnessSum = this.fitnessSum + this.dots[i].fitness
    }
  }

  //selects the best parents
  this.selectParent = function() {
    //generate random number between 0 and fitness sum
    this.rand = (Math.random() * this.fitnessSum);
    this.runningsum = 0;
    // we identify parents in the dot generation who have better fitness
    //probability that dot is fit for reproduction is related to fitnesses.
    //i.e fitness 2 should be 2x likely than fitness 1
    for(var i = 0; i<this.dots.length ;i++) {
      this.runningsum += this.dots[i].fitness;
      if (this.runningsum > this.rand) {
        return this.dots[i];
      }
    }
    //should never reach this point because there should be at least one dot
    //with fitness above the running sum
    return null;
  }

  //mutate dots brain slightly so they arent identical to parents
  this.breed = function(){
    for(var i = 1; i<this.dots.length ;i++) {
      this.dots[i].brain.mutate();
    }
  }

  //identify best dot from the generation
  this.setbestdot = function() {
    this.max = 0;
    this.maxindex = 0;
    for(var i = 0; i<this.dots.length ;i++) {
      if (this.dots[i].fitness > this.max) {
        this.max = this.dots[i].fitness
        this.maxindex = i;
      }
    }
    this.bestDot = this.maxindex;
    //check if reached goal and save number of steps
    if(this.dots[this.bestDot].reachedgoal) {
      this.minstep = this.dots[this.bestDot].brain.step;
    }
  }

}
