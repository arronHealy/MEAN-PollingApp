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

  constructor(public ps: PollService) { }

  getPolls(){

    return this.ps.getPolls();
  }

  ngOnInit() {
    this.polls = this.getPolls();
  }

}
