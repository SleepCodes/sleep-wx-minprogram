export default function $http(options) {
	let {
		url,
		data,
		method
	} = options
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: method,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
				uni.showModal({
					content: '请求失败!' + err,
					showCancel: false
				})
			}
		})
	})
}
