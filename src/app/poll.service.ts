import { Injectable } from '@angular/core';

import { Poll } from './Poll';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class PollService {

  //service class variables
  polls: Poll[] = [];

  updatedPoll: Poll;

  //constructor takes http client
  constructor(private http: HttpClient) { 
  }

  //add poll takes poll from create poll component - returns observable
  addPoll(poll: Poll): Observable<any>{

    //post Poll to database
    return this.http.post('http://localhost:8081/api/polls', poll);
    
  }//addPoll

  //get polls returns all polls in database
  getPolls(): Observable<any>{

    //return all polls from database
    return this.http.get('http://localhost:8081/api/polls');
 
  }//getPolls

  //edit get poll takes poll id returns matching poll 
  editGetPoll(id: string): Observable<any>{
    
    //return single poll based on id
    return this.http.get('http://localhost:8081/api/polls/' + id);
  
  }//editGetPoll

  //delete poll takes poll id
  deletePoll(id: String): Observable<any>{
    
    //delete poll from database based on poll id
    return this.http.delete('http://localhost:8081/api/polls/' + id);
  
  }//deletePoll

  //submit vote takes poll id, poll & index of selected option
  submitVote(id: String, pollVote: Poll, pollOption: number): Observable<any>{

    //increment votes based on index passed
    pollVote.options[pollOption].numVotes++;
    pollVote.totalVotes++;

    //build new poll model with updated votes 
    this.updatedPoll = {
      question: pollVote.question,
      options: pollVote.options,
      totalVotes: pollVote.totalVotes
    };
  
    //put new poll to database based on id passed
    return this.http.put('http://localhost:8081/api/polls/'+ id, this.updatedPoll);
  
  }//submitVote

  //update poll takes poll id & edited poll
  updatePoll(pollId: String, editedPoll: Poll): Observable<any>{

    //put edited poll to database based on id passed
    return this.http.put('http://localhost:8081/api/polls/' + pollId, editedPoll);
  
  }//updatePoll

 
}//pollService
