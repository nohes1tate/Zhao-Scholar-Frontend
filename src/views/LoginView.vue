<template>
<div class="main">
  <!-- 创建封装容器 -->
  <div class="container" id="container">

    <!-- 注册页面 -->
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>注册</h1>
        <!-- 公共组件 -->
        <v-text-field
            v-model="userName"
            label="用户名"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;margin-top: 20px;"
        ></v-text-field>
        <v-text-field
            v-model="email"
            label="邮箱"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;"
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="密码"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;"
        ></v-text-field>
        <div style="display: flex;flex-direction: row">
          <v-text-field
              v-model="confirmCode"
              label="验证码"
              outlined
              dense
              filled
              height=10
              color="black"
              style="width: 11vw;"
          ></v-text-field>
          <v-btn
              depressed
              outlined
              style="margin-left:1vw;height:40px;width:8vw;border-radius: 5px;background-color: #EEEEEE;border: #757575 1px solid;color:#757575 "
          >获取验证码</v-btn>
        </div>
        <button @click="register">注册</button>
      </form>
    </div>

    <!-- 登录页面 -->
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>登录</h1>
        <!-- 公共组件 -->
        <v-text-field
            v-model="email"
            label="邮箱"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;margin-top: 20px;"
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="密码"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;"
        ></v-text-field>
        <a href="#" class="forget">忘记密码？</a>
        <button @click="login">登录</button>
      </form>
    </div>

    <!-- 覆盖容器 -->
    <div class="overlay-container">
      <div class="overlay">

        <!-- 覆盖左边 -->
        <div class="overlay-penal overlay-left-container">
          <h1>欢迎回来!</h1>
          <p>
            点击登录按钮来继续你的学术分享之旅
          </p>
          <button class="ghost" id="signIn">登录</button>
        </div>

        <!-- 覆盖右边 -->
        <div class="overlay-penal overlay-right-container">
          <h1>你好!</h1>
          <p>
            想要加入我们？点击注册按钮开启你的学术分享之旅
          </p>
          <button class="ghost" id="signUp">注册</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "LoginView",
  data(){
    return{
      userName:"",
      email:"",
      password:"",
      confirmCode:"",
    }
  },
  methods:{
    login() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      this.$axios({
        method: 'post',
        url: '/user/login',
        data: formData,
      })
          .then(res => {
            if (res.data.success) {
              this.$message.success("登录成功");
              this.$store.dispatch('saveUserInfo', {
                user: {
                  'username': res.data.detail.username,
                  'Authorization': res.data.Authorization,
                  'userId': res.data.detail.user_id,
                  'authorId': res.data.detail.author_id,
                }
              });
              const history_pth = localStorage.getItem('preRoute');
              setTimeout(() => {
                if (history_pth == null || history_pth === '/register') {
                  this.$router.push('/');
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
            } else {
              this.$message.error("用户名或密码错误");
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    register() {
      const _formData = new FormData();
      _formData.append("username", this.username);
      _formData.append("confirm_number", this.form.confirmCode);
      this.$axios({
        method: 'post',
        url: '/user/confirm',
        data: _formData,
      })
          .then(res => {
            switch (res.data.status) {
              case 200:
                this.$message.success("注册成功！");
                setTimeout(() => {
                  this.$router.push("/login");
                }, 1000);
                break;
              case 401:
                this.$message.warning("请勿重复注册");
                break;
              case 402:
                this.$message.error("验证码错误");
                break;
              case 404:
                this.$message.error("查无注册用户信息，请重新注册");
                break;
              case 600:
                this.$message.error("验证码失效，请重新获取");
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
  },
  mounted(){
    const container = document.getElementById('container');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');

    signUpButton.onclick = function() {
      container.classList.add('penal-right-active');
    }

    signInButton.onclick = function() {
      container.classList.remove('penal-right-active');
    }
  },
}
</script>

<style scoped>
* {
  padding:0;
  margin:0;
  box-sizing: border-box;
}

.main{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F6F5F7;
}
button {
  outline: none;
  border: 1px solid #FF4B2B;
  border-radius: 20px;
  background-color: #FF4B2B;
  padding: 10px 40px;
  font-size: 12px;
  text-transform: uppercase;
  color: white;
  transition: transform 85ms ease-in;
}
h1 {
  text-transform: capitalize;
  font-size: 30px;
}
p{
  margin: 10px 0 30px;
}
button:active {
  transform: scale(.95);
}
.ghost {
  background-color: transparent;
  border-color: white;
}

.container{
  position: relative;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  background-color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  border-radius: 10px;
  overflow: hidden;
}

.form-container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 50%;
  padding: 0 40px;
  transition: all .65s ease-in-out;
}
.form-container form{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-container input {
  width: 100%;
  height: 40px;
  margin: 8px 0;
  background-color: #EEEEEE;
  border: none;
  font-size: 14px;
  padding: 0 20px;
}
.sign-in-container{
  z-index: 10;
}
.sign-up-container{
  z-index: 5;
}

.social-container {
  display: flex;
}
.social-container a{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  line-height: 40px;
  text-align: center;
  color: #333;
  margin: 20px 8px;
}
.social-container a:hover {
  background-color: #222F3E;
  color: white;
  border-color: #CBCBCC;
}

.overlay-container {
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: tomato;
  overflow: hidden;
  transition: transform .65s ease-in-out;
  z-index: 100;
}
.overlay {
  position: absolute;
  display: flex;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(to right, #FF4B2D, #FF426B);
}

.overlay-penal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0 40px;
  text-align: center;
  color: white;
  font-size: 12px;
}
.forget {
  height: 20px;
  color: #9AA9B7;
  text-decoration: none;
  margin: 5px 0 15px;
  font-size: 12px;
  text-transform: capitalize;
}
.forget:hover {
  border-bottom: 2px tomato solid;
}

.overlay-left-container {
  transform: translateX(10%);
  transition: transform .65s ease-in-out;
}
.overlay-right-container {
  transform: translateX(0);
  transition: transform .65s ease-in-out;
}

.container.penal-right-active .sign-in-container {
  z-index: 5;
  transform: translateX(100%);
}

.container.penal-right-active .sign-up-container {
  z-index: 10;
  transform: translateX(100%);
}

.container.penal-right-active .overlay-container {
  transform: translateX(-100%);
}
.container.penal-right-active .overlay {
  transform: translateX(50%);
}
.container.penal-right-active .overlay-left-container {
  transform: translateX(0);
}
.container.penal-right-active .overlay-right-container {
  transform: translateX(-10%);
}
</style>
