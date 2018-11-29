import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { AppHeaderComponent } from './app-header/app-header.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MatDividerModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatListModule} from '@angular/material';
import { RouterModule, Routes} from '@angular/router';
import { PollService } from 'src/app/poll.service';
import { EditPollComponent } from './edit-poll/edit-poll.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: PollListComponent
  },
  {
    path: 'create',
    component: CreatePollComponent
  },
  {
    path: 'edit/:id',
    component: EditPollComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    PollListComponent,
    AppHeaderComponent,
    EditPollComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
