<!--  -->
<template>
 <div>
     <!--头部区域-->
    <header class="header">
        <a href="index.html" class="icon-back"></a>
        <h3>购物车</h3>
        <a href="" class="icon-menu"></a>
    </header>
    <!--安全提示-->
    <section class="jd-safe-tip">
        <p class="tip-word">
            您正在安全购物环境中，请放心购物
        </p>
    </section>
    <!--中间内容-->
    <main class="jd-shop-cart-list">
        <section >
            <div class="shop-cart-list-title">
                <div class="left">
                    <a href="javascript:;" class="cart-check-box" :checked="cartCheck" @click.prevent="checkedAllList"></a>
                    <span class="cart-logo"></span>
                    <span class="cart-title">京东自营</span>
                </div>
                <span class="right">您享受满100元免运费服务</span>
            </div>
            <div class="shop-cart-list-con" v-for="(shop,index) in shoplist" :key="shop.shopId">
                <div class="left">
                    <a 
                        href="javascript:;" 
                        class="cart-check-box"  
                        :checked='shop.checked'
                        @click.prevent="singleSelectedOrAll(shop)"
                        ></a>
                </div>
                <div class="center">
                    <img :src="shop.shopImage" :alt="shop.shopName" referrer="no-referrer|origin|unsafe-url">
                </div>
                <div class="right">
                    <a href="#">{{shop.shopName}}</a>
                    <div class="shop-price">
                        <div class="singer-price">{{shop.shopPrice |moneyFormat}}</div>
                        <div class="total">总价:{{shop.shopPrice * shop.shopNumber |moneyFormat}}</div>
                    </div>
                    <div class="shop-deal">
                        <span @click.prevent="shopAdd(false,shop)">-</span>
                        <input type="number" v-model="shop.shopNumber" disabled='false'> 
                        <span @click.prevent="shopAdd(true,shop)">+</span>
                    </div>
                    <div class="shop-deal-right" @click.prevent="delshop(shop,$event)">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
           
        </section>
    </main>
    <!--面板-->
    <div class="panel" style="display: none;" ref="panel">
        <div class="panel-content" ref="panelContent">
            <div class="panel-title">您确认删除这个商品吗?</div>
            <div class="panel-footer">
                <a href="javascript:;" class="cancel" @click.prevent="shopDel(false)">取消</a>
                <a href="javascript:;" class="submit" @click.prevent="shopDel(true)">确定</a>
            </div>
        </div>
    </div>
    <!--底部通栏-->
    <div id="tab_bar">
        <div class="tab-bar-left">
            <a href="javascript:;" class="cart-check-box" :checked="checkedAllFlag" @click="shopListCheckedOrNo(checkedAllFlag)"></a>
            <span style="font-size: 16px;">全选</span>
            <div class="select-all">
                合计：<span class="total-price">{{totalPrice |moneyFormat}}</span>
            </div>
        </div>
        <div class="tab-bar-right">
            <a href="index.html" class="pay">去结算</a>
        </div>
    </div>
 </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/cart.css'
import axios from 'axios'
export default {
 data () {
    return {
        shoplist:[],
        checkedAllFlag:false,
        totalPrice:0,
        cartCheck:false,
        up:null,
        currenShop:null
    }
 },
 created (){
     // 初始化获取数据
     this.getShopList()
 },
 methods:{
     getShopList(){
         axios.get('http://demo.itlike.com/web/jdm/api/shoplist').then((response)=>{
             console.log(response)
             if(response.status === 200){
                this.shoplist = response.data.result.shopList
             }
         }).catch((error)=>{
             console.log(error)
         })
     },
     // 单个商品的增加和减少
     shopAdd(flag,shop){
         if(!flag){
             // 减
             if(shop.shopNumber <= 1){
                alert('商品最少选择一件')
                shop.shopNumber = 1
                this.shopTotalPrice()
                return;
             } 
             shop.shopNumber -= 1;
             this.shopTotalPrice()
             return;
         } 
         // 加
         shop.shopNumber+=1
         this.shopTotalPrice()
     },
     // 单个商品的选中与全选
     singleSelectedOrAll(shop){
         // 判断单个商品有没有checked属性 
         
       if(typeof shop.checked === 'undefined'){
           this.$set(shop,'checked',true)
       }else{
           shop.checked = !shop.checked
       }
       this.shopTotalPrice()
       this.selecAllOrNo()
     },
     // 底部全选按钮的选中和取消
     shopListCheckedOrNo(flag){
        this.checkedAllFlag = !flag;
        this.shoplist.forEach((shop,index)=>{
            if(typeof shop.checked === 'undefined'){
                this.$set(shop,'checked',!flag)
            }else{
                shop.checked = !flag
            }
        })
        this.shopTotalPrice()
     },
     // 底部商品总价
     shopTotalPrice(){
        let price = 0
        this.shoplist.forEach((shop,index)=>{
            if(shop.checked){
                price += shop.shopNumber*shop.shopPrice
            }
        })
        this.totalPrice = price
     },
     // 判断要不要全选
     selecAllOrNo(){
        let flag = true
        this.shoplist.forEach((shop,index)=>{
            if(!shop.checked){
                flag = false;
            }
        })
        this.checkedAllFlag = flag && this.shoplist.length >0
     },
     checkedAllList(e){
        this.cartCheck = !this.cartCheck
        console.log(e)
     },
     // 删除商品
     delshop(shop,event){
         // 获取垃圾桶的盖子
         let parentNode = event.target.parentNode
         this.up = parentNode.firstElementChild;
         // 加过渡
         this.up.style.transition = 'all .2s ease';
         this.up.style.webkitTransition = 'all .2s ease';

        //  实现动画
        this.up.style.transformOrigin = '0 0.5rem';
        this.up.style.webkitTransformOrigin = '0 0.5rem';
        this.up.style.transform = 'rotate(-45deg)';
        this.up.style.webkitTransform = 'rotate(-45deg)';
        // 获取面板
        this.$refs.panel.style.display="block"
        // 给确认框添加动画
        this.$refs.panelContent.className="panel-content jump"
        this.currenShop = shop
     },
     shopDel(flag){
         if(flag){
             // 确认
            let index = this.shoplist.indexOf(this.currenShop)
            this.shoplist.splice(index,1)
            // 重新计算总价
            this.shopTotalPrice()
            this.selecAllOrNo()
            
         }else{
            // 取消
            // 面板隐藏
             //关闭垃圾框
            this.up.style.transform = 'rotate(0deg)';
            this.up.style.webkitTransform = 'rotate(0deg)';

         }
        this.$refs.panel.style.display="none"
        this.$refs.panelContent.className="panel-content"
     }
 },
 filters:{
     moneyFormat (moeny){
        return   "¥" +  moeny.toFixed(2) 
     }
 },

}

</script>

<style lang='scss' scoped>

</style>
