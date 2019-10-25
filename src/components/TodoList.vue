<template>
  <div class="home-wrapper">
    <!-- <cube-button @click="alert">Button</cube-button> -->
    <div style="text-align: center;padding: 20px 0;font-size: 20px;font-weight: bold;">Todo-List</div>
    <div class="wrapper-add">
      <cube-input
        class="input-add"
        v-model="value"
      ></cube-input>
      <cube-button
        class="btn-add"
        :inline="true"
        v-tap="addList"
        @keyup.enter="addList"
      >添加</cube-button>
    </div>
      <cube-scroll class="scroll">
        <cube-swipe
          @item-click="onItemClick"
          @btn-click="onBtnClick"
          :data="List"
        >
        </cube-swipe>
      </cube-scroll>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      value: '',
      List: [],
      initLength: 0,
      realList: []
    }
  },
  directives: {

  },
  async created () {
    try {
      const auth = localStorage.getItem('token')
      // let res = await this.$axios.get('/todolist')
      let res = await this.$axios({
        method:"get",
        url:"/todolist",
        // data:{"action":"refreshToken"},
        headers:{
            "Authorization": auth
        }
      })
      this.initLength = JSON.parse(JSON.stringify(res.data.rows.length))
      this.realList = res.data.rows
      res.data.rows = res.data.rows.filter(item => {
        return item.del === false
      })
      // console.log(res, 'res', res.data.rows)
      res.data.rows.forEach(element => {
        let temp = {
          item: {
            text: element.content,
            value: element.index
          },
          btns: [
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
      }
        this.List.push(temp)
      });
      
    }
    catch (error) {
      console.log(error, error.response.status, error.message, [error])
      if (error.response.status === 401) {
        this.$router.push({ path: '/login' })
      }
    }
  },
  methods: {
    alert () {
      console.log('111')
      this.$createDialog({
        type: 'alert',
        title: '我是标题',
        content: '我是内容',
        icon: 'cubeic-alert'
      }).show()
    },
    async addList () {
      if (this.value === '') {
        this.$createDialog({
          type: 'alert',
          title: '错误',
          content: '请输入内容',
          icon: 'cubeic-alert'
        }).show()
        return
      }
      const auth = localStorage.getItem('token')
      let res = await this.$axios({
        method: 'post',
        url: 'add-todo',
        data: {
          "content": this.value,
          "value": this.realList.length + 1
        },
        headers:{
            "Authorization": auth
        }
      })
      console.log(res,'增加');
      

      let cur = this.List
      let temp = {
          item: {
            text: this.value,
            value: cur.length
          },
          btns: [
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        }
      this.realList.push(temp)
      cur.push(temp)
      this.value = ''
      // let cur = localStorage.getItem('List')
      // if (cur !== null) {
      //   cur = JSON.parse(cur)
      //   let temp = {
      //     item: {
      //       text: this.value,
      //       value: cur.length
      //     },
      //     btns: [
      //       {
      //         action: 'delete',
      //         text: '删除',
      //         color: '#ff3a32'
      //       }
      //     ]
      //   }
      //   cur.push(temp)
      //   this.List = cur
      //   localStorage.setItem('List', JSON.stringify(cur))
      //   this.value = ''
      // }
      // else {
      //   // let temp = {
      //   //   index: 0,
      //   //   value: this.value
      //   // }
      //   let temp = [{
      //     item: {
      //       text: this.value,
      //       value: 0
      //     },
      //     btns: [
      //     // {
      //     //   action: 'clear',
      //     //   text: '不再关注',
      //     //   color: '#c8c7cd'
      //     // },
      //       {
      //         action: 'delete',
      //         text: '删除',
      //         color: '#ff3a32'
      //       }
      //     ]
      //   }]
      //   this.List = temp
      //   localStorage.setItem('List', JSON.stringify(temp))
      //   this.value = ''
      // }
    },
    onItemClick (item) {
      console.log('click item:', item)
    },
    onBtnClick (btn, index,e) {
      console.log(index,btn,e)
      if (btn.action === 'delete') {
        this.$createActionSheet({
          title: '确认要删除吗',
          active: 0,
          data: [
            {content: '删除'}
          ],
          onSelect: async () => {
            this.List.splice(index, 1)
            const auth = localStorage.getItem('token')
            let res = await this.$axios({
              method: 'delete',
              url: `/dellist/${e.item.value}`,
              headers:{
                  "Authorization": auth
              }
            })
            console.log(res, '删除');
            
            // localStorage.setItem('List', JSON.stringify(this.List))
          }
        }).show()
      }
    }

  },
  mounted () {
    // if (localStorage.getItem('List') !== null) {
    //   this.List = JSON.parse(localStorage.getItem('List'))
    // }
    // else {
    //   this.List = []
    // }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-add {
  display: flex;
  padding: 0 10px;
}
.input-add {
  // width: 80%;
  display: inline-block;
  flex: 1;
}
.btn-add {
  width: 80px;
  display: inline-block;
}
.home-wrapper{
  // padding: 10px;
  height: calc(100vh - 46px);
}
.scroll{
  padding-top: 20px;
}
</style>