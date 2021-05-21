class Fakes {
      constructor(){
      this.r = 50;
      this.x = random(w)
      this.y = 0 - this.r
      this.flow = 4;
    }
    
    display(){
      image(fakeImg, this.x, this.y, this.r, this.r)
    }
    move(){
      this.y += this.flow;
    }
  }