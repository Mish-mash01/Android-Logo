window.onload = function(){
//canvas init
var canvas = document.getElementById("confetti");
var ctx = canvas.getContext("2d");

//canvas dimensions
var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = w + 100;
canvas.height = h / 3;

//snowflake particles
var num_confetti = 400; //max particles
var particles = [];
for(var i = 0; i < num_confetti; i++)
{
    particles.push({
        x: Math.random() * w, //x-coordinate
        y: Math.random() * h, //y-coordinate
        r: Math.random() * 10+1, //radius
        d: Math.random() * num_confetti, //density
        color: "rgba(" + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) + ", 0.8)"
    })
}

//Lets draw the flakes
function draw()
{
    ctx.clearRect(10, 10, w, h);



    for(var i = 0; i < num_confetti; i++)
    { 
        var p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        ctx.fill();
    }

    update();
}

//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
var angle = 0;
function update()
{
    angle += 0.01;
    for(var i = 0; i < num_confetti; i++)
    {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle+p.d) + 1 + p.r/2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if(p.x > w + 5 || p.x < -5 || p.y > h)
        {
            if(i % 3 > 0) //66.67% of the flakes
            {
                particles[i] = {x: Math.random() * w, y: -10, r: p.r, d: p.d, color : p.color};
            }
            else
            {
                //If the flake is exitting from the right
                if(Math.sin(angle) > 0)
                {
                    //Enter from the left
                    particles[i] = {x: -5, y: Math.random() * h, r: p.r, d: p.d, color: p.color};
                }
                else
                {
                    //Enter from the right
                    particles[i] = {x: w + 5, y: Math.random() * h , r: p.r, d: p.d, color : p.color};
                }
            }
        }
    }
}

//animation loop
setInterval(draw, 50);
}