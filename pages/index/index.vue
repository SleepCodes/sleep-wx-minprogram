<template>
	<view class="content">
		<!-- 地图组件 -->
		<sc-map :hotels="hotelList" @on-change="change"></sc-map>
		<!-- 酒店列表组件 -->
		<sc-list :list="hotelList"></sc-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotelList: []
			}
		},
		onLoad() {
			// 当前默认地点为桐乡
			this.getHotelList('330483')
		},
		methods: {
			getHotelList(Code) {
				let _this = this
				uni.showLoading({
					title: 'Loading'
				})
				uniCloud.callFunction({
					name: 'getHotelsByCode',
					data: {
						areaCode: Code
					},
					success(res) {
						// console.log(res);
						uni.hideLoading()
						if (res.result.success) {
							_this.hotelList = res.result.response.hotels
						}else{
							_this.hotelList = []
						}
						// console.log(_this.hotelList);
					},
					fail(err) {
						// console.error(err);
						uni.hideLoading()
						uni.showModal({
							content: err,
							showCancel: false
						})
					}
				})
			},
			change(code) {
				console.log(code);
				this.getHotelList(code)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
</style>
