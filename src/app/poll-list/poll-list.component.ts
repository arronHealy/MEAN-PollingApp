import { Component, OnInit } from '@angular/core';
import { Poll } from '../Poll';
import { PollService } from '../poll.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  polls: Poll[] = [];

  selectedPoll: number;
  selectedVote: number;

  constructor(public ps: PollService) { }

  getPolls(){

    return this.ps.getPolls().subscribe(data => {
      this.polls = data;
    });
  }

  deletePoll(id: String){
    console.log('delete poll id: ' + id);

    this.ps.deletePoll(id).subscribe(() => {
      this.ngOnInit();
    });
    //this.ngOnInit();

  }

  ngOnInit() {
    this.getPolls();
  }

  submitVote(id: String, poll: Poll){

    console.log('vote index to submit vote: ' + this.selectedVote);

    this.ps.submitVote(id, poll, this.selectedVote).subscribe(() => {
      
    });
    
  }//submitVote

  setVote(voteId: number, pollId: number){
    this.selectedVote = voteId;
    this.selectedPoll = pollId;
    console.log('poll id: ' + pollId);
    console.log('option index: ' + voteId);
  }

}
