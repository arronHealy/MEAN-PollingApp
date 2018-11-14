import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Poll } from '../Poll';
import { PollOption } from '../PollOption';
import { PollService } from '../poll.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  poll: Poll;
  option: PollOption;
  options: PollOption[] = [];
  staticId: number = 0;
  question: string;
  

  constructor(public ps: PollService) { }

  createPoll(){
    
    //check number of poll options
    if(this.options.length < 2){
      return;
    }//if

    this.poll = {
      question: this.question,
      options: this.options,
      totalVotes: 0
    };

    this.ps.addPoll(this.poll).subscribe();

    console.log(this.poll);

    (<HTMLInputElement>document.getElementById('questionInput')).value = '';
    (<HTMLInputElement>document.getElementById('optionArea')).value = '';
    this.options = [];
    
  }

  addPollOption(pollQuestion: string, pollAnswer: string){

    if(pollAnswer.length <= 0){
      return;
    }

    this.question = pollQuestion;

    this.option = {
      answer: pollAnswer,
      numVotes: 0
    };

    this.options.push(this.option);

    (<HTMLInputElement>document.getElementById('optionArea')).value = '';
    
  }//addPollOption

  deleteOption(optionId: number){

    this.options.splice(optionId, 1);

  }//deleteOption

  editOption(editedAnswer: string, optionId: number){

    if(editedAnswer.length <= 0){
      return;
    }//if

    this.options[optionId].answer = editedAnswer;

    (<HTMLInputElement>document.getElementById('optionArea')).value = '';

  }//editOption

  ngOnInit() {
  }

}
