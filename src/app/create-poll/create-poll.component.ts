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

  //class variables
  poll: Poll;
  
  option: PollOption;
  
  options: PollOption[] = [];
  
  question: string;
  
  //constructor takes poll service
  constructor(public ps: PollService) { }

  //create poll takes poll question on submit
  createPoll(pollQuestion: string){
    
    //check number of poll options
    if(this.options.length < 2){
      return;
    }//if

    //assign poll question
    this.question = pollQuestion;

    //build your poll model
    this.poll = {
      question: this.question,
      options: this.options,
      totalVotes: 0
    };

    //send poll to service to post to DB
    this.ps.addPoll(this.poll).subscribe();

    //console.log(this.poll);

    //clear input and text area after submit
    (<HTMLInputElement>document.getElementById('questionInput')).value = '';
    (<HTMLInputElement>document.getElementById('optionArea')).value = '';
    
    //empty array
    this.options = [];
    
  }//createPoll

  //add poll option takes answer
  addPollOption(pollAnswer: string){

    //return if invalid
    if(pollAnswer.length <= 0){
      return;
    }

    //build poll option model
    this.option = {
      answer: pollAnswer,
      numVotes: 0
    };

    //add option to array
    this.options.push(this.option);

    //clear text area after option added
    (<HTMLInputElement>document.getElementById('optionArea')).value = null;
    
  }//addPollOption

  //delete option takes index
  deleteOption(optionId: number){

    //splice from array
    this.options.splice(optionId, 1);

  }//deleteOption

  //edit option takes answer & index
  editOption(editedAnswer: string, optionId: number){

    //return if invalid
    if(editedAnswer.length <= 0){
      return;
    }//if

    //edit answer text from id
    this.options[optionId].answer = editedAnswer;

    //clear text area after edit
    (<HTMLInputElement>document.getElementById('optionArea')).value = '';

  }//editOption

  //does nothing
  ngOnInit() {
  }

}
