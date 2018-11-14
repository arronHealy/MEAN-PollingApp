import { PollOption } from './PollOption';

export interface Poll{
    question: string;
    options: PollOption[];
    totalVotes: number;
}