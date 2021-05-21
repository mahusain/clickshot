class Click {
      constructor(){
      this.r = 15;
      this.x = player.x;
      this.y = player.y - player.r / 2;
      this.flow = 15;
    }
    
    display(){
      image(clickImg, this.x, this.y, this.r, this.r)
    }
    move(){
      this.y -= this.flow;
    }
  }