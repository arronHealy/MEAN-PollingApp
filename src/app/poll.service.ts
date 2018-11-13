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

  constructor(private http: HttpClient) { }

  addPoll(poll: Poll): Observable<any>{

    //this.polls.push(poll);
    this.poll = poll;
    //this.polls.push(this.poll);
    return this.http.post('http://localhost:8081/api/polls', this.poll);
    //console.log('poll in service \n' + poll);
  }//addPoll

  getPolls(): Observable<any>{

    return this.http.get('http://localhost:8081/api/polls');
  }

  deletePoll(id: String): Observable<any>{
    return this.http.delete('http://localhost:8081/api/polls/' + id);
  }

  submitVote(id: String, pollVote: Poll, pollOption: number): Observable<any>{

    pollVote.options[pollOption].numVotes++;
    pollVote.totalVotes++;

    this.updatedPoll = {
      question: pollVote.question,
      votePick: pollOption,
      options: pollVote.options,
      totalVotes: pollVote.totalVotes
    };

    //this.updatedPoll = pollVote;
    //this.updatedPoll.votePicked = pollOption;

    return this.http.put('http://localhost:8081/api/polls/'+ id, this.updatedPoll);
  }

 

}
