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

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);

    this.ps.editGetPoll(this.route.snapshot.params['id'])
    .subscribe(data => {
      this.poll = data;
    
      console.log(this.poll);
      this.modelPoll();
    });
  }//ngOnInit

  modelPoll(){

    this.pollOptions = this.poll[0].options;

    this.pollModel = {
      question: this.poll[0].question,
      options: this.pollOptions,
      totalVotes: this.poll[0].totalVotes
    };

    console.log('pollModel question: ' + this.pollModel.question);
    console.log('pollModel option 0: ' + this.pollModel.options);
    console.log('poll model total votes: ' + this.pollModel.totalVotes);

  }//modelPoll

  addPollOption(pollAnswer: string){

    if(pollAnswer.length <= 0){
      return;
    }

    this.option = {
      answer: pollAnswer,
      numVotes: 0
    };

    this.pollModel.options.push(this.option);

    (<HTMLInputElement>document.getElementById('optionArea')).value = '';
    
  }//addPollOption

  deleteOption(index: number){

    if(this.pollModel.options[index].numVotes > 0){
      this.pollModel.totalVotes -= this.pollModel.options[index].numVotes;
    }

    this.pollModel.options.splice(index, 1);

  }//deleteOption

  editPollOption(editedAnswer: string, optionId: number){

    if(editedAnswer.length <= 0){
      return;
    }//if

    this.pollModel.options[optionId].answer = editedAnswer;

    (<HTMLInputElement>document.getElementById('optionArea')).value = '';

  }//editOption

  updatePoll(editQuestion: string){

    this.pollModel.question = editQuestion;

    this.ps.updatePoll(this.poll[0]._id, this.pollModel).subscribe(() => {
      this.router.navigate(['/list']);
    });

  }//updatePoll

}
