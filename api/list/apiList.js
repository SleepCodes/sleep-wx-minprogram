import $http from '../http.js'
const base_url = 'http://192.168.1.73:3000/'

export const getCityByCode = param => {
	return $http({
		url: base_url + 'getCityByCode',
		data: param,
		method: 'GET'
	})
}

export const getHotelList = param => {
	return $http({
		url: base_url + 'getHotelList',
		data: param,
		method: 'GET'
	})
}
