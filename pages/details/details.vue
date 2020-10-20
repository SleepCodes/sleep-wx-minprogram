<template>
	<view>
		<!-- 轮播图 -->
		<hotel-banner :images="banner"></hotel-banner>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 公众号 小程序跳转 -->
		<miniprogram-jump :AppID="appid"></miniprogram-jump>
		<!-- #endif -->
		<!-- 酒店详情 -->
		<hotel-detail :info="hotel"></hotel-detail>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				banner: [{
						url: '../../static/rooms/1.jpg'
					},
					{
						url: '../../static/rooms/2.jpg'
					},
					{
						url: '../../static/rooms/3.jpg'
					},
					{
						url: '../../static/rooms/4.jpg'
					},
					{
						url: '../../static/rooms/5.jpeg'
					},
				],
				appid: 'wxf62924e69a6df779'
			}
		},
		methods: {

		},
		created() {
			uni.setNavigationBarTitle({
				title: this.hotel.name
			})
		},
		computed: {
			...mapState(['hotel'])
		}
	}
</script>

<style>

</style>
