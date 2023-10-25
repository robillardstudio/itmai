// MACHINE UNLEARNING (workshop)
// MOBILENET2GIF VERSION
// Gaëtan Robillard
// ---------------------------------------------------------------------------------------
// 1. Au choix :
// Créer un nouveau dessin aléatoire pour obfusquer la reconnaissance d'image
// ou
// Insérer une séquence d'images ou input vidéo pour explorer l'espace sémantique du modèle
// 2. Exporter une séquence gif avec différentes images obfusquées puis labelisées
// ---------------------------------------------------------------------------------------

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

let doc = 600;
let f = 0.8;

// A variable to hold the image we want to classify
let img;

// A variable to store canvas
let canvas;

function preload() {
  //Models available are: 'MobileNet', 'Darknet' and 'Darknet-tiny','DoodleNet'...
  classifier = ml5.imageClassifier('MobileNet'); //
  img = loadImage('images/bird.png');
}

function setup() {
  canvas = createCanvas(doc, doc);
  pixelDensity(1);
  frameRate(12);
  strokeWeight(f);

  // GUI init

  sel = createSelect();
  sel.position(10, 10);
  sel.option('MobileNet');
  sel.option('Darknet');
  sel.option('Darknet-tiny');
  sel.option('DoodleNet');
  sel.selected('MobileNet');
  sel.changed(mySelectEvent);

  let div = createDiv('patterns size:');
  div.position(10, 40);

  slider = createSlider(1, 100, 1);
  slider.position(10, 60);
  slider.style('width', '80px');

  checkbox = createCheckbox('all labels', false);
  checkbox.position(10, 90);
  checkbox.changed(myCheckedEvent);

  button = createButton('save image');
  button.position(10, 150);
  button.mousePressed(saveImage);

  // let div2 = createDiv("press 's' to export .gif");
  // div2.position(10, 180);

  let div4 = createDiv("Press 's' to save a .gif sequence");
  div4.style('font-size', '10px');
  div4.position(10, 200);
}

function draw(){
  noFill(); 
  if(frameCount%14==0){
    background(250);

    // Insert image
    // image(img, 0, 0, doc, doc);
    
    stroke("#6200ff");
    hatch();
    hatch();
    circles(20*f);
    circles(100*f);
    circles(200*f);
    circles(200*f);

    classifier.classify(canvas, gotResult);
  }
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  
  let offset

  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    // console.log(results);
    
    if (checkbox.checked()) {
      txt = results[0].label+'\n'+results[1].label+'\n'+results[2].label
      offset = 100
    } else {
      txt = results[0].label
      offset = 20
    }

    fill("#6200ff");
    noStroke();
    textSize(32);
    text(txt,20, doc-offset);
    
  }
}

// Random drawing functions
// ---------------------------------

// random hatchings
function hatch(){
  let val = slider.value();
  var y_pos = random(height-80);
  for (var i = 0; i < 50; i++){
    var x_1 = randomGaussian(200,30);
    line(x_1, y_pos, x_1, y_pos+80*val);
  }
}

// random circles
function circles(d){
  let val = slider.value();
  var delta1;
  var delta2;
  var pos_x = random(width);
  var pos_y = random(height);
  for (var i = 0; i<20; i++){
    delta1 = random(50);
    delta2 = random(50);
    delta3  = random(10,30);
    ellipse(pos_x+delta1, pos_y+delta2, d+delta3*val);
  }
}

// GUI
// ---------------------------------
function myCheckedEvent() {
  if (checkbox.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
}

function mySelectEvent() {
  let item = sel.value();
  classifier = ml5.imageClassifier(item)
  text(item, 20, 20);
}

function saveImage() {
  save("myimage.png");
}

function keyPressed() {
  // this will download the first 3 seconds of the animation!
  if (key === 's') {
    createLoop({duration:5, gif:true})
  }
}