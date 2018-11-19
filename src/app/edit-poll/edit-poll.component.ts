import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Poll } from '../Poll';
import { PollOption } from '../PollOption';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css']
})
export class EditPollComponent implements OnInit {

  poll: any = [];
  
  pollModel: Poll;

  pollOptions: PollOption[];

  option: PollOption;

  constructor(private router: Router, private route: ActivatedRoute, private ps: PollService) { }

  //ngOnInit calls service function on subscribe call build model
  ngOnInit() {
    //console.log(this.route.snapshot.params['id']);

    this.ps.editGetPoll(this.route.snapshot.params['id'])
    .subscribe(data => {
      this.poll = data;
      //console.log(this.poll);
      this.modelPoll();
    });
  }//ngOnInit

  //model poll builds poll from data passed to page
  modelPoll(){

    //assign passed array to component array
    this.pollOptions = this.poll[0].options;

    //build poll from data passed
    this.pollModel = {
      question: this.poll[0].question,
      options: this.pollOptions,
      totalVotes: this.poll[0].totalVotes
    };

    //console.log('pollModel question: ' + this.pollModel.question);
    //console.log('pollModel option 0: ' + this.pollModel.options);
    //console.log('poll model total votes: ' + this.pollModel.totalVotes);

  }//modelPoll

  //add poll option to array
  addPollOption(pollAnswer: string){

    //if invalid return
    if(pollAnswer.length <= 0){
      return;
    }

    //build new option
    this.option = {
      answer: pollAnswer,
      numVotes: 0
    };

    //add to list of options
    this.pollModel.options.push(this.option);

    //get text area by id and clear text area
    (<HTMLInputElement>document.getElementById('optionArea')).value = '';
    
  }//addPollOption

  //delete option takes index of poll option
  deleteOption(index: number){

    //check if options has votes and decrement if it has
    if(this.pollModel.options[index].numVotes > 0){
      this.pollModel.totalVotes -= this.pollModel.options[index].numVotes;
    }

    //splice option from array index
    this.pollModel.options.splice(index, 1);

  }//deleteOption

  //edit poll option takes answer & option index
  editPollOption(editedAnswer: string, optionId: number){

    //return if invalid text
    if(editedAnswer.length <= 0){
      return;
    }//if

    //edit new answer
    this.pollModel.options[optionId].answer = editedAnswer;

    //clear text area after edited
    (<HTMLInputElement>document.getElementById('optionArea')).value = '';

  }//editOption

  //update poll takes question on submit
  updatePoll(editQuestion: string){

    //assign question to poll
    this.pollModel.question = editQuestion;

    //update poll from service pass up id of poll & updated poll model
    this.ps.updatePoll(this.poll[0]._id, this.pollModel).subscribe(() => {
      this.router.navigate(['/list']);
    });

  }//updatePoll

}//end class
