<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">
        <h3>登录页面</h3>
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        label-position="right"
        label-width="70px"
        class="loginForm"
        hide-required-asterisk
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            ref="username"
            v-model="loginForm.username"
            name="username"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            ref="password"
            type="password"
            v-model="loginForm.password"
            name="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            style="width:100%;"
            :loading="loading"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { setToken } from '../utils/auth';
export default {
  data() {
    const validateUsername = (rule, username, callback) => {
        if(!username || username.length == 0) {
          callback(new Error('请输入用户名'))
          
        }else{
          callback()
        }
      }
    const  validatePassword = (rule, password, callback) => {
        if(!password || password.length == 0) {
          callback(new Error('请输入密码'))
        }else {
          callback()
        }
      }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false
      
    };
  },
  components: {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          const user = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          // console.log("user",user);
          this.loading = true
          axios.post('https://qc76o2.fn.thelarkcloud.com/login', user).then(res => {
            if(res.data.code !== 0) {
              const token = res.data.token
              // console.log(token);
              // this.$store.commit('setToken', token)
              setToken(token)
              this.loading = false
              this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              });
              this.$router.push('/accountList')
            }else {
              const message = res.data.message
              this.$message({
                message: message,
                type: 'warning',
                center: true
              });
              throw new Error("登录失败，用户名或密码不存在")
            }
          }).catch(err => {
            throw new Error(err)
          })
          
        }else {
          this.$message({
            message: '用户名或密码不正确',
            type: 'danger',
            center: true
          });
        }
      })
    }
  },
  mounted() {
    if(this.loginForm.username == '') {
      this.$refs.username.focus()
    }else if(this.loginForm.password == '') {
      this.$refs.password.focus()
    }
  },
  computed: {
    
  }
};
</script>
<style lang="scss" scoped>
$color: red;
.login {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-container {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 165px 0 0 0;
    .loginForm {
      padding-right: 35px;
    }
    .login-title {
      font-size: 26px;
      font-weight: 700;
      color: #eee;
      margin: 0 auto 40px auto;
      text-align: center;
    }
  }
}
</style>
