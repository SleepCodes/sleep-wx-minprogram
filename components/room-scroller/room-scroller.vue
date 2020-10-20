<template>
	<view class="content">
		<swiper class="swiper" circular="true">
			<view v-if="Rooms.length === 0">没有数据</view>
			<block v-for="(item,index) in Rooms" :key="index">
				<swiper-item>
					<view class="room">
						<image :src="item.url[0]" mode="aspectFill" class="img"></image>
						<view class="column info">
							<view class="row jc-b">
								<view class="name">{{item.name}}</view>
								<view class="price">{{item.price}}</view>
							</view>
							<!-- 描述 -->
							<!-- 	<view class="desc">
								
							</view>
							-->
							<!-- 好评及人数相关 -->
							<!--
							<view class="">
								<view class="evaluate"></view>
								<view class="number"></view>
							</view> -->
						</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			uid: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				Rooms: []
			};
		},
		created() {
			this.getRoomList(this.uid)
		},
		methods: {
			// 根据酒店UID 查找酒店房间信息
			getRoomList(uid) {
				uni.showLoading({
					title: 'Loading'
				})
				let _this = this
				uniCloud.callFunction({
					name: 'getRooms',
					data: {
						_id: uid
					},
					success(res) {
						uni.hideLoading()
						// console.log(res);
						if (!res.result.success) {
							uni.showToast({
								title: '没有房间数据',
								icon: 'none'
							})
						} else {
							_this.Rooms = res.result.response.rooms
						}
					},
					fail(err) {
						uni.hideLoading()
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin-top: 10rpx;
		padding: 10rpx;
		box-sizing: border-box;

		.swiper {
			height: 200rpx;
			border: 1rpx #e7e7e7 solid;
			border-radius: 10rpx;
			box-sizing: border-box;

			.room {
				display: flex;

				.img {
					width: 200rpx;
					height: 200rpx;
					border: 1rpx #C0C0C0 solid;
					justify-content: center;
					align-items: center;
					flex-shrink: 0;
				}

				.info {
					margin-left: 10rpx;
					flex: 1;

					.name {
						font-weight: 700;
					}

					.price {
						color: red;
						font-size: 20px;

						&::before {
							content: '\e63c';
							margin-right: 10rpx;
						}

						&::after {
							content: '.00 元';
						}
					}
				}

			}
		}
	}
</style>
