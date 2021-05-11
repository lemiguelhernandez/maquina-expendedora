import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Automaton } from 'src/app/model/automaton.model';

@Injectable({
  providedIn: 'root'
})
export class AutomatonService {

  constructor(private http: HttpClient) { }

  get(): Observable<HttpResponse<Automaton>> {
    return this.http.get<Automaton>('assets/automaton/automaton.json', { observe: 'response' });
  }
}
