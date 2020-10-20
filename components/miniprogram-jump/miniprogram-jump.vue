<template>
	<view class="content">
		<navigator target="miniProgram" :app-id="AppID">
			<button type="default" class="btn">小程序跳转</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			AppID: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		height: 150rpx;
		.navigator{
			height: 150rpx;
			display: flex;
			justify-content: space-between;
		}
		.btn{
			color: white;
			width: 300rpx;
			background-color: #4CD964;
			font-size: 14px;
		}
	}
</style>
