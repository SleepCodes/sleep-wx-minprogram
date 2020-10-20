'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('hotelRooms')
	let res = await collection.where({
		_id: event._id
	}).get()
	if (res.affectedDocs === 1) {
		return {
			code: 200,
			success: true,
			response: res.data[0]
		}
	} else {
		return {
			code: 200,
			success: false
		}
	}
};
