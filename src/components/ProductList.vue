<template>
    <div ref="listRoot">
        <van-grid class="product-list" :column-num="columnNum" :gutter="gutter" :border="false">
            <van-grid-item v-for="product in lists" :key="product.id" :to="'/product/detail/'+product.id">
                <div class="product-item" :style="{width:itemSize+'px'}">
                    <img fit="scale-down" :width="itemSize" :height="itemSize" v-lazy="product.image"/>
                    <h4 class="card-title van-ellipsis">{{product.title}}</h4>
                    <div class="prodinfo">
                        <div class="price-group">
                            <div class="price">{{product.min_price}}</div>
                        </div>
                        <van-button class="my-btn">
                            <van-icon name="cart-o"></van-icon>
                        </van-button>
                    </div>
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>
<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class ProductList extends Vue {
        private origWidth = 0;
        @Prop({required: true}) private lists: any;
        @Prop({default: 10}) private gutter: any;
        @Prop({default: 0}) private boxWidth: any;
        @Prop({default: 2}) private columnNum: any;

        get itemSize() {
            let width = this.boxWidth > 0 ?
                this.boxWidth :
                this.origWidth;
            if (width > 0) {
                return (
                    (width -
                        (this.columnNum + 1) * this.gutter) /
                    this.columnNum
                )

                return
                200;
            }
        }

        private mounted()
            {
                // console.log(this.$refs.listRoot)
                // @ts-ignore
                this.origWidth = this.$refs.listRoot.offsetWidth;
            }
        }
</script>
<style lang="scss">
    .product-list {
        .van-grid-item {
            .van-grid-item__content {
                padding: 0;
            }
        }
    }

    .product-item {
        background: #fff;
        border-radius: 5px;
        overflow: hidden;

        .card-title {
            width: 100%;
            font-size: 14px;
            text-align: left;
            margin: 5px;
        }

        .prodinfo {
            display: flex;
            flex-direction: row;
            line-height: 32px;

            .price-group {
                flex: 1;
            }

            .price {
                color: #b18856;
                font-size: 16px;
                line-height: 40px;
                width: 40%;
                font-weight: bold;
                white-space: nowrap;

                &:before {
                    content: "￥";
                    font-size: 10px;
                }
            }

            .market-price {
                color: #999999;
                font-size: 12px;
                line-height: 14px;
                width: 10%;
                white-space: nowrap;
                text-align: left;
                text-decoration: line-through;

                &:before {
                    content: "￥";
                    font-size: 8px;
                }
            }
        }

        .my-btn {
            flex: 0 0 80px;
            border: 0;
            background-size: contain;
            line-height: 32px;
            height: 32px;
            width: 80px;

            .van-icon {
                vertical-align: middle;
            }
        }
    }

</style>