<template>
  <div class="home-wrapper">
    <!-- <cube-button @click="alert">Button</cube-button> -->
    <div style="text-align: center;padding: 20px 0;font-size: 20px;font-weight: bold;">Todo-List</div>
    <div class="wrapper">
      <cube-input
        class="input"
        v-model="value"
      ></cube-input>
      <cube-button
        class="btn"
        :inline="true"
        @click="addList"
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
      List: []
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
    addList () {
      if (this.value === '') {
        this.$createDialog({
          type: 'alert',
          title: '错误',
          content: '请输入内容',
          icon: 'cubeic-alert'
        }).show()
        return
      }
      let cur = localStorage.getItem('List')
      if (cur !== null) {
        cur = JSON.parse(cur)
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
        cur.push(temp)
        this.List = cur
        localStorage.setItem('List', JSON.stringify(cur))
        this.value = ''
      }
      else {
        // let temp = {
        //   index: 0,
        //   value: this.value
        // }
        let temp = [{
          item: {
            text: this.value,
            value: 0
          },
          btns: [
          // {
          //   action: 'clear',
          //   text: '不再关注',
          //   color: '#c8c7cd'
          // },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        }]
        this.List = temp
        localStorage.setItem('List', JSON.stringify(temp))
        this.value = ''
      }
    },
    onItemClick (item) {
      console.log('click item:', item)
    },
    onBtnClick (btn, index) {
      console.log(index)
      if (btn.action === 'delete') {
        this.$createActionSheet({
          title: '确认要删除吗',
          active: 0,
          data: [
            {content: '删除'}
          ],
          onSelect: () => {
            this.List.splice(index, 1)
            localStorage.setItem('List', JSON.stringify(this.List))
          }
        }).show()
      }
    }

  },
  mounted () {
    if (localStorage.getItem('List') !== null) {
      this.List = JSON.parse(localStorage.getItem('List'))
    }
    else {
      this.List = []
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  display: flex;
  padding: 0 10px;
}
.input {
  // width: 80%;
  display: inline-block;
  flex: 1;
}
.btn {
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