import { Automaton } from '../model/automaton.model';

export enum TypeEvent {
    INIT, CHANGE_STATE
}

export interface EventRunner {
    type: TypeEvent,
    automaton: Automaton,
    value?: any
}

export class SimpleEvent implements EventRunner {
    constructor(
       public type: TypeEvent,
       public automaton: Automaton,
       public value?: any
    ) {}
}
