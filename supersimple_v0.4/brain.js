//generates array of random vectors

function Brain(size) {

  this.mutationRate = 0;
  this.randnum = 0;
  this.brainclone = [];

  this.brainstart = function() {
    this.directions = [];
    this.step = 0;
    this.directions[size] = 0;
    //console.log(this.directions.length);
    this.randomise();
  }

  //function generates random % out of 100 and takes from 360 degree to create random movement direction
  this.randomise = function() {
    for (var i = 0; i < this.directions.length ;i++) {
      var randomAngle = (Math.random() * 2 * Math.PI);
      this.directions[i] = p5.Vector.fromAngle(randomAngle);
    }
  }

  this.cloneBrain = function() {
    this.brainclone = new Brain(this.directions.length);
    this.brainclone.brainstart();
    for (var i = 0; i < this.directions.length ;i++) {
      //console.log(this.brainclone.directions[i]);
      this.brainclone.directions[i] = this.directions[i];
      //console.log(this.brainclone.directions[i]);
    }
    return this.brainclone;
  }

  this.mutate = function() {
    //set mutation rate so only 1% of pop mutate
    this.mutationRate = 0.02;
    //loop through each direction in the brain
    for (var i = 0; i < this.directions.length ;i++) {
      this.randnum = Math.random();
      //check if in the 1%
      if (this.randnum < this.mutationRate){
        //set a completely new direction
        var randomAngle = (Math.random() * 2 * Math.PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }

}
