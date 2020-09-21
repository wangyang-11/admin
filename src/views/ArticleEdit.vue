<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <!-- 一行布局，把名称放在左边（正常情况下是在input上边） -->
    <!-- native原生表单   prevent阻止默认提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <!-- v-model双向绑定到model.name，输入时修改name -->
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <!-- v-model双向绑定到model.name，输入时修改name -->
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <!-- 富文本编辑器使用 -->
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
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
// 解构的方式引入富文本编辑
import { VueEditor } from "vue2-editor";
export default {
  // 这个组件接收一个id
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },

  methods: {
    // 富文本编辑器的方法
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

      // 定义一个表单数据
      const formData = new FormData();
      // 添加一个文件字段
      formData.append("file", file);
      const res = await this.$http.post("upload",formData)
       //       嵌入一个元素      在光标位置    插入图片    图片地址
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      // 重置上传器
      resetUploader();
    },
    // 发起请求 新建分类的方法
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 没有id的话执行
        // 数据提交到接口categories，参数为this.model，async代替.then方法就可以用await去访问，作用是把异步方法换成类似同步的写法
        res = await this.$http.post("rest/articles", this.model);
      }

      // 跳转到分类列表('/categories/list')
      this.$router.push("/articles/list");
      // 跳转之后提示的信息，$message是element UI提供的方法
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    // 获取一下parents
    this.fetchCategories();
    // 要自动执行一个方法，去判断有id才执行获取数据，
    // 前面条件（this.id）满足之后才会执行后面的（this.fetch()）
    this.id && this.fetch();
  },
};
</script>