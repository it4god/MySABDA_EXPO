
import {ENG} from './ENG';
import {IND} from './IND';


export const getValue = (value, lang_code) => {
	let text = '';
	

	switch(lang_code){
		case "ind": //indonesia
			text =  IND[value];
			break
		default :
			text = ENG[value];
			break
	}

	if(text === null || text === undefined)
		text = '';

	return text;
	
};