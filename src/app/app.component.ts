import { Component, OnInit } from '@angular/core';
import { AutomatonRunner, ValidatorRunner } from './runner/automaton.runner';
import { Automaton } from './model/automaton.model';
import { AutomatonService } from './modules/automaton/automaton.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'maquina-expendedora';
  automatonRunner = new AutomatonRunner();

  constructor(private automatonService: AutomatonService) {}

  ngOnInit(): void {
    this.automatonService.get()
      .subscribe(
        (res: HttpResponse<Automaton>) => {
          this.automatonRunner.setAutomaton(res.body);
        },
        (res: HttpErrorResponse) => this.onError(res.message));
  }

  onError(error: string) {
    alert(error);
  }
  
}
