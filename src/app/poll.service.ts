import { Injectable } from '@angular/core';
import { Poll } from './Poll';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class PollService {

  polls: Poll[] = [];

  poll: Poll;

  updatedPoll: Poll;

  constructor(private http: HttpClient) { 

  }

  addPoll(poll: Poll): Observable<any>{

    this.poll = poll;

    return this.http.post('http://localhost:8081/api/polls', this.poll);
    
  }//addPoll

  getPolls(): Observable<any>{

    return this.http.get('http://localhost:8081/api/polls');
  }//getPolls

  editGetPoll(id: string): Observable<any>{
    return this.http.get('http://localhost:8081/api/polls/' + id);
  }//editGetPoll

  deletePoll(id: String): Observable<any>{
    return this.http.delete('http://localhost:8081/api/polls/' + id);
  }//deletePoll

  submitVote(id: String, pollVote: Poll, pollOption: number): Observable<any>{

    pollVote.options[pollOption].numVotes++;
    pollVote.totalVotes++;

    this.updatedPoll = {
      question: pollVote.question,
      options: pollVote.options,
      totalVotes: pollVote.totalVotes
    };
  
    return this.http.put('http://localhost:8081/api/polls/'+ id, this.updatedPoll);
  }//submitVote

  updatePoll(pollId: String, editedPoll: Poll): Observable<any>{

    return this.http.put('http://localhost:8081/api/polls/' + pollId, editedPoll);
  }//updatePoll

 

}
