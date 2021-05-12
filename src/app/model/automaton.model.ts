import { Transition } from './transition.model';

export interface Automaton {
    states: string[],
    initialState: string,
    finalStates: string[],
    transitions: Transition[]
}