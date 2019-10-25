<template>
  <div class="wrapper">
    <div class="title">登录</div>
    <cube-input class='input' v-model="userName" placeholder="请输入用户名" ></cube-input>
    <cube-input class='input' v-model="passWord" placeholder="请输入密码" type="password" :eye="eye"></cube-input>
    <cube-button class="btn" :primary="true" @click="enter">登录</cube-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      passWord: '',
      eye: {
        open: true,
        reverse: false
      }
    }
  },
  methods: {
    async enter () {
      if (this.userName === '' || this.passWord === '') {
        this.$createDialog({
          type: 'alert',
          title: '错误',
          content: '请输入账号或密码',
          icon: 'cubeic-alert'
        }).show()
        return
      }
      try {
        console.log('enter')
        let res = await this.$axios.post('/users/login', {
          'nick_name': this.userName,
          'passwd': this.passWord
        })
        console.log(res)
        if (res.data.code === 3) {
          console.log(res.data.msg)
          this.$createDialog({
            type: 'alert',
            title: '错误',
            content: res.data.msg,
            icon: 'cubeic-alert'
          }).show()
        }
        else if (res.data.code === 2) {
          this.$createDialog({
            type: 'alert',
            title: '成功',
            content: res.data.msg,
            icon: 'cubeic-alert',
            confirmBtn: {
              text: '确定按钮',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            onConfirm: () => {
              console.log('确定')
              this.$router.replace({ path: '/' })
            }
          }).show()
          localStorage.setItem('token', res.data.authorization)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
  .wrapper{
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .input{
    min-width: 300px;
    flex-wrap: wrap;
    flex: 1;
    margin: 10px 0;
    display: flex;
  }
  .title{
    font-size: 20px;
    margin: 20px 0;
  }
  .btn{
    margin: 20px 0;
    display: flex;
    justify-content: center;
    width: 100px;
  } 
</style>