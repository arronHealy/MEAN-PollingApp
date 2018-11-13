import { PollOption } from './PollOption';

export interface Poll{
    question: string;
    votePick: number;
    options: PollOption[];
    totalVotes: number;
}