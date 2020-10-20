<template>
	<view class="content">
		<view>
			<map :latitude="info.latitude" :longitude="info.longitude" class="map" scale="14" :markers="markers"></map>
		</view>
		<!-- 根据酒店的uid 获取酒店房间信息 swpier 轮播 -->
		<room-scroller class="fill" :uid="info.uid"></room-scroller>
		<view class="tools">
			<button type="primary" class="btn" @click="call">
				<text>&#xe6a6; &nbsp;致电</text>
			</button>
			<button class="Navi btn" @click="naviTo">
				<text>&#xe656; &nbsp;导航</text></button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {};
		},
		created() {
			console.log(this.info);
		},
		computed: {
			markers(newVal) {
				let arr = []
				let temp = {
					id: this.info.id,
					title: this.info.name,
					latitude: this.info.latitude,
					iconPath: '../../static/location.png',
					longitude: this.info.longitude,
					width: 30,
					height: 30
				}
				arr.push(temp)
				return arr
			}
		},
		methods: {
			// 拨打电话
			call() {
				uni.makePhoneCall({
					phoneNumber: this.info.tel
				})
			},
			naviTo() {
				uni.openLocation({
					latitude: this.info.latitude,
					longitude: this.info.longitude,
					name:this.info.name,
					scale:18,
					success(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		height: 100%;

		.map {
			width: 100vw;
			height: 20vh;
		}

		.tools {
			display: flex;

			.btn {
				flex: 1;
				margin: 20rpx;
				font-size: 14px;
			}
		}
	}
</style>
