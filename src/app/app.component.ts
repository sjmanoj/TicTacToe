import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  public turn0: boolean = true;
  public clickCount: number = 0;
  public board :Array<string> = []
  public boxValue: string = ''
  public winnerMsg: string = ''
  public disableBox: boolean = false
  public winnerDisplay: boolean = false

  public winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  ngOnInit(): void {
    this.board = new Array(9).fill('')
  }

  handleBox(index: number){
    if(this.turn0){
      
      this.board[index] = 'O'
      this.turn0 = false
    }else{
      this.board[index] = 'X'
      this.turn0 = true
    }
    this.clickCount++

    let isWinner = this.checkWinner()
    
    if (this.clickCount === 9 && !isWinner){
      this.gameDraw()
    }
    
  }

  checkWinner(){
    for(let pattern of this.winPatterns){
      // console.log(pattern[0], pattern[1], pattern[2])
      let posVal1 = this.board[pattern[0]]
      let posVal2 = this.board[pattern[1]]
      let posVal3 = this.board[pattern[2]]

      if(posVal1!=='' && posVal2!=='' && posVal3!==''){
        if(posVal1===posVal2 && posVal2===posVal3){
          this.displayWinner(posVal1)
          return true
        }
      }
    }
    return false
  }

  displayWinner(winner: string){
    if(winner){
      this.winnerDisplay = true
      this.disableBox = true
      this.winnerMsg = `Congrats, The Winner is ${winner}`
    }
  }

  gameDraw(){
    this.winnerDisplay = true
    this.winnerMsg = `This Game ended in a Draw`
    this.disableBox = false
  }

  resetGame(){
    this.board.fill('')
    this.clickCount = 0
    this.disableBox = false
    this.winnerDisplay = false
  }
}
