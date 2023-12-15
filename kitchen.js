status="";
objects=[];
img = "";
objectDetector = "";
var a=15 ;
var b=15;


function preload()
{
    img = loadImage("kitchen.jpg");
    console.log(img);
}

function setup()
{
    canvas = createCanvas(410, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function draw()
{
    image(img, 0, 0, 410, 380);
    if(status != "")
    {
       for (i=0; i < objects.length; i++)
       {
        document.getElementById("status").innerHTML = "Status : Object Dectected";
        document.getElementById("status_n").innerHTML = "Number of objects detected are : "+ objects.length;
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        textSize(9);
        text(objects[i].label + " " + percent + "%", objects[i].x +10, objects[i].y +10);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
    
       }
    }
  
}



function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error)
    {
        console.log(error)
    }
    console.log(results);
    objects = results;
}

