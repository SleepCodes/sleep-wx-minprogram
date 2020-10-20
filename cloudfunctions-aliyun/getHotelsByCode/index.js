'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('hotels')
	let res = await collection.where({
		areaCode: event.areaCode
	}).get()

	//返回数据给客户端
	if (res.affectedDocs == 1) {
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
