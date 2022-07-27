import { Component, OnInit } from '@angular/core';

let items   : any[],
    sections: any[],
    current : any;

@Component({
  selector   : 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls  : ['./drag-drop.component.css']
})

export class DragDropComponent implements OnInit {

  public choices : String[] = [];
  public options : String[] = [];
  public solution: String   = '';

  constructor() {
    this.options  = ['First', 'example', 'of', 'the', 'angular', 'app'];
    this.solution = 'First app'
  }

  ngOnInit(): void {
    current = null;
    setTimeout(() => {
      this.getExample();
      this.sectionAction();
      this.itemAction()
    }, 100);
  }

  getExample(){
    sections = [].slice.call(document.querySelectorAll( '.area' ), 0 );
    items    = [].slice.call(document.querySelectorAll( '.word' ), 0 );
  }

  itemAction(){
    items.forEach( item => {
      item.ondragstart = ( ev: any ) => { current = ev.target }
    })
  }

  sectionAction(){
    sections.forEach( section => {

      section.ondragenter = section.ondragover = function( ev: any ) {
        ev.preventDefault();
        this.classList.add( 'hovering' );
      };

      section.ondragleave = function() {
        this.classList.remove( 'hovering' );
      };

      section.ondrop = () => {
        if(section.id == 'dropedArea'
           && current.classList.contains('drag')
           && !this.choices.includes(current.innerHTML)) {
          this.choices.push(current.innerHTML);
        } else if(section.id == 'dragArea' && current.classList.contains('drop')) {
          this.choices = this.choices.filter(choice => {return choice !== current.innerHTML})
        }
        section.classList.remove( 'hovering' );
        this.ngOnInit()
      };

    });
  }

  checkChoice(){
    let res = '';
    this.choices.forEach( choice => {res += choice + ' '});
    if (res.slice(0, -1) === this.solution) alert('Correcto!'); else alert('Error')
  }
}
