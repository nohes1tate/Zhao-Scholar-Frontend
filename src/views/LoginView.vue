<template>
<div class="main">
  <!-- 创建封装容器 -->
  <div class="container" id="container">

    <!-- 注册页面 -->
    <div class="form-container sign-up-container">
      <form>
        <h1>注册</h1>
        <!-- 公共组件 -->
        <v-text-field
            v-model="username"
            label="用户名"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;margin-top: 20px;"
            :rules="[rules.username]"
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
            :rules="[rules.email]"
        ></v-text-field>
        <v-text-field
            v-model="password1"
            label="密码"
            outlined
            dense
            filled
            height=10
            color="black"
            style="width: 20vw;"
            :rules="[rules.password]"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
        ></v-text-field>
        <div style="display: flex;flex-direction: row">
          <v-text-field
              v-model="password2"
              label="确认密码"
              outlined
              dense
              filled
              height=10
              color="black"
              style="width: 20vw;"
              :rules="[rules.checkPassword2]"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show3 ? 'text' : 'password'"
              @click:append="show3 = !show3"
          ></v-text-field>
        </div>
        <button class="button" @click.prevent="register">注册</button>
      </form>
    </div>

    <!-- 登录页面 -->
    <div class="form-container sign-in-container">
      <form>
        <h1>登录</h1>
        <!-- 公共组件 -->
        <v-text-field
            v-model="username"
            label="用户名"
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
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
        ></v-text-field>
        <v-dialog
            v-model="forgetPasswordDialog"
            persistent
            max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <a class="forget" v-bind="attrs" v-on="on">忘记密码？</a>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">修改密码</span>
            </v-card-title>
                <v-text-field
                    v-model="forgetEmail"
                    label="邮箱"
                    required
                    color="black"
                    style="width: 80%;margin: auto;padding-top: 20px;"
                ></v-text-field>
            <v-text-field
                v-model="newPassword"
                label="新密码"
                required
                color="black"
                style="width: 80%;margin: auto;padding-top: 20px;"
            ></v-text-field>
            <div style="display: flex;flex-direction: row;width: 80%;margin: auto">
              <v-text-field
                  v-model="confirmCode"
                  label="验证码"
                  required
                  color="black"
                  style="width: 40%;margin: auto;padding-top: 20px;"
              ></v-text-field>
              <v-btn outlined style="margin-left: 20px;margin-top: 10px" @click="forget">
                发送验证码
              </v-btn>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="forgetPasswordDialog = false"
              >
                取消
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="update"
              >
                修改密码
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <button class="button" @click.prevent="login">登录</button>
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
          <button class="button ghost" id="signIn">登录</button>
        </div>

        <!-- 覆盖右边 -->
        <div class="overlay-penal overlay-right-container">
          <h1>你好!</h1>
          <p>
            想要加入我们？点击注册按钮开启你的学术分享之旅
          </p>
          <button class="button ghost" id="signUp">注册</button>
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
      userID:'',
      forgetPasswordDialog:false,
      show1:false,
      show2:false,
      show3:false,
      username:"",
      email:"",
      password:"",
      password1:"",
      password2:"",
      confirmCode:"",
      forgetEmail:"",
      newPassword:"",
      usernameCheck:false,
      emailCheck:false,
      passwordCheck:false,
      passwordConfirmCheck:false,
      rules: {
        username: value =>{
          const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
          if (!value) {
            return '用户名不能为空'
          } else if (!reg.test(value)) {
            return '用户名由中英文、数字或下划线组成'
          } else {
            this.usernameCheck=true;
            return reg.test(value)
          }
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if(!pattern.test(value))
            return '请输入有效邮箱格式'
          else{
            this.emailCheck=true;
            return pattern.test(value)
          }
        },
        password: value =>{
          var reg_pwd=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
          if(!value){
            return '请输入密码'
          }
          else if(!reg_pwd.test(value)){
            return '密码至少同时包含字母和数字，且长度为8-18'
          }
          else{
            this.passwordCheck=true;
            return reg_pwd.test(value)
          }
        },
        checkPassword2: value =>{
          if (value === '') {
            return  '请再次输入密码';
          } else if (value !== this.password1) {
            return '两次输入密码不一致!';
          }
          else {
            this.passwordConfirmCheck=true;
            return true
          }
        },
      },
    }
  },
  methods:{
    forget(){
      const self = this;
      const formData = new FormData();
      formData.append("email", self.forgetEmail);
      self.$axios({
        method: 'post',
        url: 'api/UserManager/forget/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("验证码已发送，请前往邮箱确认！");
                break;
              case 3001:
                this.$message.error('表单信息错误（未全部填写或数据类型有误）！');
                break;
              case 4001:
                this.$message.warning('邮件发送失败！');
                break;
              case 4002:
                this.$message.error('邮箱未注册！');
                break;
              case 2001:
                this.$message.error('请求方式错误！');
                break;
            }
          })
    },
    update(){
      const self = this;
      const formData = new FormData();
      formData.append("email", self.forgetEmail);
      formData.append("password",self.newPassword);
      formData.append("code",self.confirmCode);
      //console.log(self.code)
      self.$axios({
        method: 'post',
        url: 'api/UserManager/update/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("密码修改成功！");
                this.$router.push('/login');
                break;
              case 4001:
                this.$message.error('密码违规！');
                break;
              case 4002:
                this.$message.error('验证码错误！');
                break;
              case 2001:
                this.$message.error('请求方式错误！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    // test(){
    //   console.log("login");
    // },
    login() {
      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      this.$axios({
        method: 'post',
        url: 'api/UserManager/login/',
        data: formData,
      })
          .then(res => {
            console.log(res.data);
            if (res.data.error===0) {
              this.$message.success("登录成功");
              this.$store.dispatch('saveUserInfo', {
                user: {
                  'username': res.data.username,
                  'Authorization': res.data.authorization,
                  'userId': res.data.userID,
                  'email':res.data.email,
                  'authorId': res.data.scholarID,
                }
              });
              const history_pth = localStorage.getItem('preRoute');
              console.log(history_pth)
              setTimeout(() => {
                if (history_pth == null || history_pth === '/login') {
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
      if(this.emailCheck&&this.usernameCheck&&this.passwordCheck&&this.passwordConfirmCheck) {
        const _formData = new FormData();
        _formData.append("username", this.username);
        _formData.append("password1", this.password1);
        _formData.append("password2", this.password2);
        _formData.append("email", this.email);
        this.$axios({
          method: 'post',
          url: 'api/UserManager/register/',
          data: _formData,
        })
            .then(res => {
              console.log(res.data.error)
              switch (res.data.error) {
                case 200:
                  this.$message.success("注册成功！");
                  setTimeout(() => {
                    this.$router.push("/login");
                  }, 1000);
                  this.userID=res.data.userID;
                  break;
                case 4002:
                  this.$message.warning("请勿重复注册");
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
        const formData = new FormData();
        formData.append("userID", this.userID);
        formData.append("name", "默认");
        this.$axios({
          method: 'post',
          url: 'api/UserManager/createCollect/',
          data: formData,
        })
            .then(res => {
              if(res.data.error===0)
                this.$message.success("成功创建默认收藏夹");
            })
            .catch(err => {
              console.log(err);
            })
      }
      else
        this.$message.error("请填写正确的表单");
    }
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
  created() {
    this.usernameCheck=false;
    this.emailCheck=false;
    this.passwordCheck=false;
    this.passwordConfirmCheck=false;
  }
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
.button {
  outline: none;
  border: 1px solid #1E88E5;
  border-radius: 20px;
  background-color: #039BE5;
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
  background-color: #0288D1;
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
  background: linear-gradient(to right, #1E88E5, #0288D1);
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
  border-bottom: 2px #0288D1 solid;
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
