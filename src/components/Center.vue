<template>
  <div class="wrapper">
    <div class="inner">
      <div>个人中心</div>
      <div class="nick_name">昵称：{{nick_name}}</div>
      <div>id: {{id}}</div>
    </div>

    <!-- <cube-upload
      action="//jsonplaceholder.typicode.com/photos/"
      :simultaneous-uploads="1"
      @files-added="filesAdded"
    /> -->

    <!-- <cube-button @click="cameraTakePicture(0)">调用相册</cube-button>
    <br>
    <cube-button @click="createAndWriteFile(0)">创建文件</cube-button> -->
    <cube-button
      class="btn"
      :primary="true"
      @click="out"
    >退出</cube-button>

  </div>
</template>
<script>
export default {
  data() {
    return {
      Camera: {},
      tasksStr: [1, 2, 3, 4, 5],
      nick_name: '',
      id: 0
    }
  },
  async created() {
    try {
      const auth = localStorage.getItem('token')
      // let res = await this.$axios.get('/todolist')
      let res = await this.$axios({
        method: "get",
        url: "/",
        // data:{"action":"refreshToken"},
        headers: {
          "Authorization": auth
        }
      })
      // console.log(res, 'res', res.msg)
      this.nick_name = res.data.nick_name
      this.id = res.data.userId
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    out() {
      this.$createActionSheet({
        title: '确认要退出吗',
        active: 0,
        data: [
          { content: '退出' }
        ],
        onSelect: async () => {
          localStorage.removeItem('token')
          this.$router.push({ path: '/login' })
          console.log(res, '退出');
        }
      }).show()

    },
    filesAdded(files) {
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
    },
    cameraTakePicture: function (mySourceType) {
      navigator.camera.getPicture(this.onSuccess, this.onFail, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        encodingType: navigator.camera.EncodingType.JPEG,
        sourceType: mySourceType
      })
    },
    onSuccess(imageURL) {
      console.log(imageURL)
    },
    onFail(message) {

    },

    /*
 * 打开或创建文件夹,创建文件并写入内容
 * Android:sdcard/xbrother/assets目录
 * IOS:cdvfile://localhost/persistent/xbrother/assets目录
 * 文件目录存在则打开,不存在则创建
 * */
    createAndWriteFile() {
      window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, this.createsuccess, this.onErrorLoadFs)
    },
    createsuccess(fs) {
      console.log('打开的文件系统: ' + fs.name)
      fs.root.getDirectory('xbrother', { create: true }, (dirEntry) => {
        console.log('dirEntry', dirEntry)
        dirEntry.getDirectory('assets', { create: true }, (subDirEntry) => {
          subDirEntry.getFile('task.json', { create: true, exclusive: false }, (fileEntry) => {
            fileEntry.name = 'task.json'
            fileEntry.fullPath = 'xbrother/assets/task.json'
            // 文件内容
            var dataObj = new Blob(this.tasksStr, { type: 'text/plain' })
            // 写入文件
            this.writeFile(fileEntry, dataObj)
          }, this.onErrorCreateFile)
        }, this.onErrorGetDir)
      }, this.onErrorGetDir)
    },

    // 将内容数据写入到文件中
    writeFile(fileEntry, dataObj) {
      // 创建一个写入对象
      fileEntry.createWriter((fileWriter) => {
        // 文件写入成功
        fileWriter.onwriteend = () => {
          console.log('Successful file write...')
        }

        // 文件写入失败
        fileWriter.onerror = (e) => {
          console.log('Failed file write: ' + e.toString())
        }

        // 写入文件
        fileWriter.write(dataObj)
      })
    },
    // FileSystem加载失败回调
    onErrorLoadFs(err) {
      console.log(err)
    },
    // 文件夹创建失败回调
    onErrorGetDir(err) {
      console.log(err)
    },
    // 文件创建失败回调
    onErrorCreateFile(err) {
      console.log(err)
    },
    // 读取文件失败响应
    onErrorReadFile() {
      console.log('文件读取失败!')
    }
    // ,
    // cameraTakePicture (sourceType) {
    //   navigator.camera.getPicture(this.onSuccess, this.onFail, {
    //     quality: 50,
    //     destinationType: 1,
    //     encodingType: Camera.EncodingType.JPEG,
    //     allowEdit: true,
    //     sourceType: sourceType
    //   })
    // }, // 就上面这点就实现调用摄像头和照片库，（这里只是实现调用）
    // onFail (message) {
    //   // 取消照相功能提示
    // },
    // onSuccess (imageURL) {
    //   // 开始上传，这里用到了cordova-plugin-file-transfer 插件，
    //   let options = new FileUploadOptions()
    //   options.fileKey = 'file'// 我这里后台采用的是阿里云的上传，接收的参数类型为File
    //   options.fileName = imageURL.substr(imageURL.lastIndexOf('/') + 1)
    //   let ft = new FileTransfer()
    //   var SERVER = 'http://XXXX'// 上传接口
    //   ft.upload(imageURL, encodeURI(SERVER), this.success, this.fail, options)
    // }
  },
  mounted() {
    document.addEventListener('deviceready', onDeviceReady, false)
    function onDeviceReady() {
      this.Camera = navigator.camera
      console.log(this.Camera)
      console.log('navigator.camera', navigator.camera)
      console.log('cordova.file', cordova.file)
      console.log('LocalFileSystem.PERSISTENT', window.LocalFileSystem.PERSISTENT)
      console.log('LocalFileSystem.PERSISTENT', window.LocalFileSystem)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 30px;
  display: flex;
  // justify-content: center;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .inner {
    text-align: center;
  }
}
.nick_name {
  margin: 20px 0;
}
.btn {
  width: 80px;
  display: inline-block;
}
</style>