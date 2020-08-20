var image;
var redImage;
var grayImage;
var blurImage;
var rainbowImage;

var canv = document.getElementById("can1");

function uploadImage(){
  var input = document.getElementById("fileB2");
  image = new SimpleImage(input);
  redImage = new SimpleImage(input);
  grayImage = new SimpleImage(input);
  blurImage = new SimpleImage(input);
  rainbowImage = new SimpleImage(input);
  image.drawTo(canv);
}

function resetToOrig(){
  image.drawTo(canv);
}

function filterGray(){
  if (grayImage == null || !grayImage.complete()) {
    alert("Image not properly loaded");
  }
  var greyButton = document.getElementById("b1");
  for(var pixel of grayImage.values()){
    var avr = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avr);
    pixel.setGreen(avr);
    pixel.setBlue(avr);
  }
  grayImage.drawTo(canv);
}

function filterRed(){
  if (redImage == null || !redImage.complete()) {
    alert("Image not properly loaded");
  }
  var redButton =
  document.getElementById("b2");
  for(var pixel of redImage.values()){
    if(pixel.getX() <= redImage.getWidth()){
      pixel.setRed(255);
    }
  }
  redImage.drawTo(canv);
}

function filterRainbow(){
  if (rainbowImage == null || !rainbowImage.complete()) {
    alert("Image not properly loaded");
  }
  var rainbowButton =
  document.getElementById("b3");
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
     
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
rainbowImage.drawTo(canv);
}

function filterBlur(){
  if (blurImage == null || !blurImage.complete()) {
    alert("Image not properly loaded");
  }
   var blurButton =
  document.getElementById("b4");
  for (var pixel of blurImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var nsq = 3;
    var redtot = 0;
    var bluetot = 0;
    var greentot = 0;
    var numtot = 0;
    for (i = 0; i <= nsq; i++) {
      for (j = 0; j <= nsq; j++) {
        if ((x + i) < blurImage.getWidth() && (y + j) < blurImage.getHeight()) {
          var oripx = image.getPixel(x + i, y + j);
          redtot = redtot + oripx.getRed();
          bluetot = bluetot + oripx.getBlue();
          greentot = greentot + oripx.getGreen();
          numtot = numtot + 1;
        }
      }
    }
    pixel.setRed(redtot / numtot);
    pixel.setBlue(bluetot / numtot);
    pixel.setGreen(greentot / numtot);
  }
  blurImage.drawTo(canv);
}

function clearCanvas(){
  var cntx = canv.getContext("2d");
  cntx.clearRect(0,0,canv.width,canv.height); 
  image = null;
  redImage = null;
  grayImage = null;
  blurImage = null;
  rainbowImage = null;
}