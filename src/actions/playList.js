import Config from '../config'
import { spin,spinHidden } from './spin'
import api from '../api'
export const PLAYLIST = 'PLAYLIST'
export const MUSIC = 'MUSIC'

export const playList = (obj) =>{
	return {
		type: PLAYLIST,
		obj
	}
}

export const music = (obj) =>{
	return {
		type: MUSIC,
		obj
	}
}

export function playListAPI(id){
	return async dispatch => {
	 	dispatch(spin());
	 	try{
	 		let data = await api( Config.playListAPI.replace('id',id) );
	 		let d = {
	 			list:data.list.list.info,
	 			info:data.info.list
	 		}
		 	dispatch(playList(d))
		 	dispatch(spinHidden());
		 }catch(error){
			console.log('error',error);
		}
	}
}

export function musicAPI(id){
	return async dispatch => {
	 	dispatch(spin());
	 	try{
	 		let data = await api( Config.musicAPI.replace('HASH',id) );
	 		console.log(data)
		 	dispatch(music(data))
		 	dispatch(spinHidden());
		 }catch(error){
			console.log('error',error);
		}
	}
}


