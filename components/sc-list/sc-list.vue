<template>
	<scroll-view class="content" scroll-y enable-flex="true">
		<view v-if="list.length === 0" class="msg">没有数据</view>
		<block v-for="item in list" :key="item.id">
			<view class="items" @click="HotelDetail(item)">
				<image :src="item.iconPath" class="logo" mode="aspectFill"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="add">{{item.address}}</view>
					<view class="foot">
						<view></view>
						<view class="tel">{{item.tel}}</view>
					</view>
				</view>
			</view>
		</block>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			HotelDetail(param) {
				console.log(param);
				this.$store.commit('setHotelInfo', param)
				uni.navigateTo({
					url: '../../pages/details/details'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 地图高度为40vh  定位高度为32px tabBar高度为50px
	/* #ifdef H5 */
	$height: calc(60vh - 82px);
	/* #endif */
	/* #ifdef MP-WEIXIN */
	$height: calc(60vh - 32px);

	/* #endif */
	.content {
		width: 100vw;
		height: $height;
		padding: 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		.msg{
			width: 1005;
			text-align: center;
			font-size: 14px;
			color: #C0C0C0;
		}
		.items {
			width: 100%;
			height: 150rpx;
			margin-bottom: 20rpx;
			box-shadow: 2px 2px 3px #808080;
			box-sizing: border-box;
			border: 1rpx #808080 solid;
			display: flex;

			.logo {
				width: 150rpx;
				height: 150rpx;
				flex-shrink: 0;
				margin-left: 10rpx;
			}

			.info {
				padding-right: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: 5rpx;
				flex: 1;
				margin-left: 20rpx;
				overflow: hidden;

				.name {
					font-weight: 700;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.add {
					font-size: 12px;
					color: #808080;

					&::before {
						content: '\e601';
						margin-right: 10rpx;
					}
				}

				.foot {
					display: flex;
					justify-content: space-between;

					.tel {
						font-size: 12px;
						color: #808080;

						&::before {
							content: '\e648';
						}
					}
				}
			}

		}
	}
</style>
