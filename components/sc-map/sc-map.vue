<template>
	<view class="content">
		<view class="region" @click="openAddres">{{position}}</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		<map scale="12" :latitude="latitude" :longitude="longitude" :markers="hotels" class="map" @markertap="clickHotel">
		</map>
	</view>
</template>

<script>
	export default {
		props: {
			hotels: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				latitude: 30.628163,
				longitude: 120.552292,
				cityPickerValueDefault: [0, 0, 1],
				position: '选择目标城市'
			};
		},
		created() {
			// #ifdef MP-WEIXIN
			console.log('获取地址');
			let _this = this
			uni.getLocation({
				success(res) {
					console.log(res);
					_this.latitude = res.latitude
					_this.longitude = res.longitude
				},
				fail(err) {
					console.log(err);
				}
			})
			// #endif
		},
		methods: {
			region_change(e) {
				console.log(e)
				let final = e.detail.value.pop()
				this.position = final
			},
			clickHotel(e) {
				console.log(e)
			},
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open()
			},
			onConfirm(e) {
				uni.showLoading({
					title: 'Loading'
				})
				let _this = this
				uniCloud.callFunction({
					name: 'getPosByCode',
					data: {
						areaCode: e.areaCode
					},
					success(res) {
						uni.hideLoading()
						let result = res.result.response
						if (result) {
							_this.position = result.name
							_this.longitude = result.pos[0]
							_this.latitude = result.pos[1]
						} else {
								uni.showModal({
								content: '当前城市没有相关数据!',
								showCancel: false
							})
						}
						_this.$emit('on-change', result.areaCode)
					},
					fail(err) {
						uni.hideLoading()
						uni.showModal({
							content: err,
							showCancel: false
						})
					}
				})
				// let res = getPos(e.areaCode)
				// if (res === undefined) {
				// 	uni.showModal({
				// 		content: '当前城市没有相关数据!',
				// 		showCancel: false
				// 	})
				// } else {
				// 	this.position = res.name
				// 	this.longitude = res.pos[0]
				// 	this.latitude = res.pos[1]
				// 	this.$emit('on-change', res)
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;

		.region {
			height: 32px;
			width: 100vw;
			background-color: #ffaa00;
			color: white;
			font-size: 16px;

			&::before {
				content: '\e601';
				margin: 0 10rpx;
			}

			padding-top: 5px;
			box-sizing: border-box;
		}

		.map {
			width: 100vw;
			height: 40vh;
		}
	}
</style>
