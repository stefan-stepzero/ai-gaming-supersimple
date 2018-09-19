function setup() {
  // put setup code here
  createCanvas(600,600);

  //create new population size n
  population = new Population(1000);
  population.popstart();

  //create new goal
  goal = new Goal();
  goal.goalstart();

  //create obstacles
  obstacle = new Obstacle();
  obstacle.obstaclestart();
}

//update population location and draw location
function draw() {
  // put drawing code here
  background(235);

  //if not all dead
  if (population.markdead()) {
    population.getfitness();
    population.naturalSelection();
    population.breed();
    //if all dead
  } else {
    population.update();
    population.show();
    goal.show();
    obstacle.show();
  }
}
