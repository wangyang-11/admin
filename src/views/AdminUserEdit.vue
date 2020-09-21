<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <!-- 一行布局，把名称放在左边（正常情况下是在input上边） -->
    <!-- native原生表单   prevent阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <!-- v-model双向绑定到model.name，输入时修改name -->
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <!-- v-model双向绑定到model.name，输入时修改name -->
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- native-type标识原生的类型 submint提交按钮-->
        <!-- 点击按钮时执行from的submit事件 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 这个组件接收一个id
  props:{
    id:{}
  },
  data(){
    return{
      model:{},
    }
  },

  methods:{
    // 发起请求 新建分类的方法
    async save(){
      let res 
      if(this.id){
        res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
      }else{
        // 没有id的话执行
        // 数据提交到接口categories，参数为this.model，async代替.then方法就可以用await去访问，作用是把异步方法换成类似同步的写法
        res = await this.$http.post('rest/admin_users',this.model)
      }
      
      // 跳转到分类列表('/categories/list')
      this.$router.push('/admin_users/list')
      // 跳转之后提示的信息，$message是element UI提供的方法
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
    
  },
  created(){
    // 要自动执行一个方法，去判断有id才执行获取数据，
    // 前面条件（this.id）满足之后才会执行后面的（this.fetch()）
    this.id && this.fetch()
  }
}
</script>