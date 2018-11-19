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

  //poll array to hold 
  polls: Poll[] = [];

  //variables to get vote selected
  selectedPoll: number;
  selectedVote: number;

  constructor(public ps: PollService) { }

  //get polls returns all polls from service 
  getPolls(){

    return this.ps.getPolls().subscribe(data => {
      this.polls = data;
    });
  }

  //delete poll takes poll id deletes from service function
  deletePoll(id: String){
    //console.log('delete poll id: ' + id);
    this.ps.deletePoll(id).subscribe(() => {
      this.ngOnInit();
    });

  }

  //call get polls on each initialization
  ngOnInit() {
    this.getPolls();
  }

  ////submitVote passes id & poll to service function
  submitVote(id: String, poll: Poll){
    //console.log('vote index to submit vote: ' + this.selectedVote);
    this.ps.submitVote(id, poll, this.selectedVote).subscribe(() => {
      
    });
    
  }//submitVote

  //set votes based on index passed in
  setVote(voteId: number, pollId: number){
    this.selectedVote = voteId;
    this.selectedPoll = pollId;
    //console.log('poll id: ' + pollId);
    //console.log('option index: ' + voteId);
  }

}
