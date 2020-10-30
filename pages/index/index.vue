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
			this.getHotelList({
				areaCode: 330483
			})
		},
		methods: {
			change(code) {
				this.getHotelList({ areaCode: code })
			},
			// 根据城市码 获取当前城市的 酒店信息
			getHotelList(code) {
				this.$api.getHotelList(code).then(res => {
					if (res.success) {
						this.hotelList = res.data.hotels
					} else{
						this.hotelList = []
					}
				})
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
