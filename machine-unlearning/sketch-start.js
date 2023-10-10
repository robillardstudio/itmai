// MACHINE UNLEARNING (workshop)
// START VERSION
// Gaëtan Robillard
// ---------------------------------------------------------------------------------------
// 1. Au choix :
// Créer un nouveau dessin aléatoire pour obfusquer la reconnaissance d'image
// ou
// Insérer une nouvelle image ou une séquence d'images ou input vidéo pour explorer l'espace sémantique du modèle
// 2. Exporter une séquence gif avec différentes images obfusquées puis labelisées
// ---------------------------------------------------------------------------------------

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

let doc = 600;
let f = 1.2;

// A variable to hold the image we want to classify
let img;

// A variable to store canvas
let canvas;

function preload() {
  //Models available are: 'MobileNet', 'Darknet' and 'Darknet-tiny','DoodleNet'...
  classifier = ml5.imageClassifier('MobileNet'); //
  img1 = loadImage('images/bird.png');
}

function setup() {
  canvas = createCanvas(doc, doc);
  pixelDensity(1);
  frameRate(12);
  strokeWeight(f);
  noFill();
  background(250);

  // Insert image
  image(img1, 0, 0, doc, doc);

  // YOUR RANDOM DRAWING HERE
 for(let i = 0; i<100; i++){
    let x = random(600);
    let y = random(600);
    rect(x, y, 50, 50)
 }

  classifier.classify(canvas, gotResult);
}

function draw(){
}

// A function to run when we get any errors and the results
function gotResult(error, results) {

  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);

    let txt = results[0].label;
    let confidence = nf(results[0].confidence, 0, 2);
    let offset = 20;

    let div = createDiv('Label: ' + txt + ' | Confidence: ' + confidence);
    div.style('font-size', '18px')
  }
}