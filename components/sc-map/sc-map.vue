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
				this.$api.getCityByCode({ areaCode: e.areaCode }).then(res => {
					uni.hideLoading()
					if (res.success) {
						console.log(e.areaCode);
						console.log(res);
						_this.position = res.data.name
						_this.longitude = res.data.pos[0]
						_this.latitude = res.data.pos[1]
						_this.$emit('on-change', res.data.areaCode)
					} else {
						uni.showModal({
							content: '该城市无数据!',
							showCancel: false
						})
					}
				})
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
