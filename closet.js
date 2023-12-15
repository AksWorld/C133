status="";
objects=[];
img = "";
objectDetector = "";

function preload()
{
    img = loadImage("closet.png");
    console.log(img);
}

function setup()
{
    
    canvas = createCanvas(270,390);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function draw()
{
    image(img, 0, 0, 270, 390);
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

