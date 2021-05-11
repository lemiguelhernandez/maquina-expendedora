import { Transitions } from './transitions.model';

export interface Automaton {
    state: string[],
    initialState: string,
    finalStates: string[],
    transitions: Transitions[]
}