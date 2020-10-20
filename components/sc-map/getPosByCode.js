import {data} from './location.js'

export const getPos = (code) => {
	return data.find((item) => item.areaCode === code)
}


