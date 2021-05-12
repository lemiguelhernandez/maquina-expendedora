import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AutomatonRunner } from 'src/app/runner/automaton.runner';
import { EventRunner, TypeEvent } from 'src/app/runner/event.model';
import { Subscription } from 'rxjs';
import { Transition } from 'src/app/model/transition.model';

@Component({
  selector: 'app-automaton',
  templateUrl: './automaton.component.html',
  styleUrls: ['./automaton.component.scss']
})
export class AutomatonComponent implements OnInit, OnDestroy {

  @Input()
  automatonRunner: AutomatonRunner;

  subscription: Subscription;

  state: string;
  lastState: string;
  lastTransition: Transition;

  constructor() { }
  
  ngOnInit(): void {
    this.subscription = this.automatonRunner.subscribe((response: EventRunner) => {
      switch(response.type) {
        case TypeEvent.INIT:
          this.lastTransition = {
            from: response.automaton.initialState,
            to: null,
            symbol: null
          }
          this.setState(response.automaton.initialState);
        break;
        case TypeEvent.CHANGE_STATE:
           const transition: Transition = response.value;
           if (this.lastTransition.to !== transition.to || this.lastTransition.from !== transition.from) {
              const newState = this.lastState + transition.symbol.toLowerCase() + transition.to;
              this.setState(newState);
              this.lastTransition = transition;
           }
        break;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setState(state: string) {
    this.state = `af_${state}.png`;
    this.lastState = state;
  }
}
