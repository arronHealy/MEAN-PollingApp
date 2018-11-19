import { PollOption } from './PollOption';
//import poll option model

//Poll model
export interface Poll{
    question: string;
    options: PollOption[];
    totalVotes: number;
}