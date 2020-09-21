<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- native表示监听表单的原生事件  prevent阻止默认提交 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      model:{}
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post('login',this.model)
      // 表示把返回的数据的token写入到localStorken,localStorken是浏览器的存储
      // localStorage表示当前浏览器关掉还有只要是同一个网址
      localStorage.token = res.data.token
      // sessionStorage表示当前浏览器关了就没了
      // sessionStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type:'success',
        message:'登录成功'
      })
    }
  }
}
</script>

<style scoped>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>