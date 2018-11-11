import { Injectable } from '@angular/core';
import { Poll } from './Poll';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class PollService {

  polls: Poll[] = [];

  constructor(private http: HttpClient) { }

  addPoll(poll: Poll){

    this.polls.push(poll);
    //console.log('poll in service \n' + poll);
  }//addPoll

  getPolls(){

    if(this.polls.length <= 0){
      return [];
    }

    return[...this.polls];
  }
}
