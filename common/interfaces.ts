export interface Message {
	mode : 'echo' | 'receive';
	end? : boolean;

	message : string;
}
