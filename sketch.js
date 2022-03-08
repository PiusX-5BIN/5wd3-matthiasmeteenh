let cursor = null;

let ground = null;

let timer = 0;

function setup() {
    createCanvas(800, 400);

    cursor = createSprite(100, 100, 30, 30);
    cursor.shapeColor = color(255, 0, 0);
    cursor.draw = DrawCursor;
    cursor["Move"] = MoveCursor;
    cursor["Show"] = ShowCursor;
    
    

    ground = createSprite(width / 2, height - 15, width, 30);
    ground.shapeColor = color(138, 84, 59);
}

function draw() {
    timer = timer + 1;

    background(0);

    if (timer > 100) {
        timer = 0;

       
                     
                     
                     

        let missileStartPos = createVector(random(0, width), 0);
        let missileEndPos =   createVector(random(0, width), height);
        let direction = p5.Vector.sub(missileEndPos, missileStartPos);
        let angle = direction.heading();
        angle = degrees(angle);

        let missile = createSprite(missileStartPos.x, missileStartPos.y, 5, 10);
        missile["goal"] = missileEndPos;
        missile.shapeColor = color(255, 0, 0);
        missile.setSpeed(1, angle);
        missile.rotation = angle + 90;
        missile.draw = DrawMissile;
    }

    drawSprites();
}

function DrawMissile() {
    fill(this.shapeColor);
    rect(0, 0, this.width, this.height);

    let direction = p5.Vector.sub(this.goal, this.position);
    let distanceToGoal = direction.mag();
    if (distanceToGoal < 10) {
        
        this.remove();
    }
    
}



function ShowCursor() {
    stroke(this.shapeColor);
    strokeWeight(2);
    noFill();

    square(0, 0, this.width);
    
}
function MoveCursor() {
    if (keyIsDown(LEFT_ARROW) === true || keyIsDown (81) === true){
        this.position.x = this.position.x - 5;
    }

    if (keyIsDown(RIGHT_ARROW) === true || keyIsDown (68) === true){
        this.position.x = this.position.x + 5;
    }
    if (keyIsDown(UP_ARROW) === true || keyIsDown (90) === true){
        this.position.y = this.position.y - 5;
    }
    if (keyIsDown(DOWN_ARROW) === true || keyIsDown (83) === true){
        this.position.y = this.position.y + 5;
    }
    
    if(this.position.x <= 0){
        this.position.x = this.position.x + 5
    }
    if(this.position.x >= width ){
        this.position.x = this.position.x - 5
    }
    if(this.position.y <= 0 ){
        this.position.y = this.position.y + 5
    }
    if(this.position.y >= height - ground.height ){
        this.position.y = this.position.y - 5
    }
}

function DrawCursor() {
    this.Show();
    this.Move();

    if (keyIsDown(32) === true){
        this.Shoot();
    }
}

