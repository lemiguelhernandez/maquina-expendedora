import { Component, OnInit } from '@angular/core';
import { AutomatonService } from './automaton.service';
import { Automaton } from 'src/app/model/automaton.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-automaton',
  templateUrl: './automaton.component.html',
  styleUrls: ['./automaton.component.scss']
})
export class AutomatonComponent implements OnInit {

  state: string;
  automaton: Automaton;

  constructor(private automatonService: AutomatonService) { }

  ngOnInit(): void {
    this.automatonService.get()
      .subscribe(
        (res: HttpResponse<Automaton>) => {
          this.automaton = res.body;
          this.setState(this.automaton.initialState);
        },
        (res: HttpErrorResponse) => this.onError(res.message));
  }

  setState(state: string) {
    this.state = `af_${state}.png`;
  }

  onError(error: string) {
    alert(error);
  }

}
