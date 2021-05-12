import { Automaton } from '../model/automaton.model';
import { Subject } from "rxjs";
import { SimpleEvent, TypeEvent } from './event.model';
import { Transition, TypeNext } from '../model/transition.model';

export interface ValidatorRunner {
    meets: (symbol: string) => boolean
}

export class AutomatonRunner {
    automaton: Automaton;
    subject = new Subject();
    validator: ValidatorRunner;
    currentState: string;
    resetNext = false;

    constructor() { }

    setValidator(validator: ValidatorRunner) {
        this.validator = validator;
    }

    setAutomaton(automaton: Automaton) {
        this.automaton = automaton;
        this.currentState = automaton.initialState;
        this.subject.next(new SimpleEvent(TypeEvent.INIT, automaton));
    }

    subscribe(next: (value: any) => void) {
        return this.subject.subscribe(next);
    }

    getNextTransations(): Transition[] {
        return this.automaton.transitions.filter(it => it.from === this.currentState);
    }

    next() {
        if (this.resetNext) {
            this.reset();
        }
        const nextTransitions = this.getNextTransations();
        for (const transition of nextTransitions) {
           if (this.validator.meets(transition.symbol)) {
            this.currentState = transition.to;
            this.subject.next(new SimpleEvent(TypeEvent.CHANGE_STATE, this.automaton, transition));
            if (String(TypeNext.AUTO) === String(transition.next)) {
                 setTimeout(() => {
                    this.next();
                 }, 500);
            }
            break;
           }
        }
    }

    reset() {
        this.resetNext = false;
        this.currentState = this.automaton.initialState;
        this.subject.next(new SimpleEvent(TypeEvent.INIT, this.automaton));
    }
}