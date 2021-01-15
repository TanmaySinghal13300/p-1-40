class Game {
  constructor(){

    this.happyBoyImage=loadImage("happyBoy.jpg");
    this.happyGirlImage=loadImage("happyGirl.jpg");
    this.sadBoyImage=loadImage("sadBoy.jpg");
    this.sadGirlImage=loadImage("sadGirl.jpg");
  }
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    people1=createSprite(100,200);
    people1.addImage(this.happyBoyImage);
    people1.scale=0.05

    people2=createSprite(300,200);
    people2.addImage(this.happyGirlImage);
    people2.scale=0.05

    people3=createSprite(500,200);
    people3.addImage(this.sadBoyImage);
    people3.scale=0.05

    people4=createSprite(700,200);
    people4.addImage(this.sadGirlImage);
    people4.scale=0.05

    people=[people1,people2,people3,people4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index=0,x=0,y;
      for(var plr in allPlayers){
        index=index+1;
        x=x+200;
        y=displayHeight-allPlayers[plr].distance;
        people[index-1].x=x;
        people[index-1].y=y;
        /*if (index === player.index){
          people[index-1].shapeColor="red";
          camera.position.x=displayWidth;
          camera.position.y=people[index-1].y;
        }*/
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
      console.log(player.distance)
    }
    drawSprites();
  }
}
