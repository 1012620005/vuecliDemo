<template>
  <div>
     <p><input type="text" placeholder="请输入要搜索的姓名" v-model="searchName"/></p>
     <p><button @click="orderBy(0)">默认</button><button @click="orderBy(1)">年龄↑</button><button @click="orderBy(2)">年龄↓</button></p>
     <ul>
         <li v-for="(person,index) in filterPersions" :key="personKeys[index]">
            序号 {{index + 1}}) 姓名 {{person.name}} 性别 {{person.sex}}  年龄{{person.age}} 电话 {{person.phone}}
         </li>
     </ul>
  </div>
</template>

<script>
import shortId from 'shortid' // 
export default {
  name: 'ListRander',
  data () {
      return {
          searchName:'',
          persons: [
                    {name: '张三', sex: '女', age: 19, phone: '18921212121'},
                    {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                    {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                    {name: '李思思', sex: '男', age: 29, phone: '18921221121'},
                    {name: '张三', sex: '女', age: 19, phone: '18921212121'},
                    {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                    {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                    {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                    {name: '李五五', sex: '男', age: 29, phone: '18921221121'}
          ],
          personKeys:[],// 数组设置key 唯一识别码
          orderType:0 
      }
  },
  computed:{
    filterPersions:{
      cache:false,
      get(){
        //获取数据
      let {searchName,persons,orderType} = this
      //取出数据
      let arr = [...persons]
      //过滤数据
      if(searchName.trim()){ // 去除关键词的空格 并且判断他非空
        arr = persons.filter(p =>p.name.indexOf(searchName) !==-1)
      }
      // 排序
      if(orderType){
        arr.sort((p1, p2) => {
           if (orderType === 2) { // 降序
                  return p2.age - p1.age
            } else { // 升序
                  return p1.age - p2.age
            }
        })
      }
      
      return arr
    }
      }
      
  },
  methods:{
    orderBy (value) {
       this.orderType = value
       console.log( this.filterPersions)
    }
  },
  mounted () {
    this.personKeys = this.persons.map(v => shortId.generate())  
  }
}
</script>
<!--<script>
import shortId from 'shortid'
export default {
    data() {
        return {
            searchName: '',
                    persons: [
                        {name: '张三', sex: '女', age: 19, phone: '18921212121'},
                        {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                        {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                        {name: '李思思', sex: '男', age: 29, phone: '18921221121'},
                        {name: '张三', sex: '女', age: 19, phone: '18921212121'},
                        {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                        {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '李四', sex: '男', age: 29, phone: '18921221121'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '王五', sex: '女', age: 39, phone: '18921788721'},
                        {name: '赵六', sex: '男', age: 49, phone: '18921556121'},
                        {name: '李五五', sex: '男', age: 29, phone: '18921221121'}
                    ],
                personKeys: [],
                orderType: 0 // 排序
            }
        },
        computed: {
            filterPersions() {
                // 1. 获取数据
                let {searchName, persons, orderType} = this;
                // 2. 取出数组中的数据
                let arr = [...persons];
                // 3. 过滤数组
                if (searchName.trim()) {
                    arr = persons.filter(p => p.name.indexOf(searchName) !== -1);
                }
                // 4. 排序
                if (orderType) {
                    arr.sort((p1, p2) => {
                        if (orderType === 2) { // 降序
                            return p2.age - p1.age
                        } else { // 升序
                            return p1.age - p2.age
                        }
                    });
                }
                return arr;
            }
        },
        mounted() {
            this.personKeys = this.filterPersions.map(v => shortId.generate())
        },
        methods: {
            orderBy(orderType) {
                this.orderType = orderType;
            }
        }

}
</script>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style: none;
  
}
li {
  padding:4px 0;
  
}

</style>
