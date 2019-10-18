<template>
  <div class="app-container">
    <el-form ref="form" label-width="150px">
      <div v-loading="listLoading" class="app-container" style="margin: auto">

        <div v-for="(n, nindex) in postForm.cell" :key="nindex" class="form-box">
          <el-row :gutter="20">
            <el-col v-for="(b, bindex) in postForm.cellSize" :key="bindex" :span="24/postForm.cellSize">
              <div class="grid-content bg-purple">
                <div v-if="postForm.list[nindex*postForm.cellSize+bindex] != null" class="emp-box">
                  <div>
                    <span>{{ postForm.list[nindex*postForm.cellSize+bindex].slot }}</span>
                    <span>{{ postForm.list[nindex*postForm.cellSize+bindex].terminalId }}</span>
                  </div>
                  <el-button size="small" type="danger" style="text-align: right; right: 0">{{ $t('device.eject') }}</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getDeviceTerminalDetail } from '@/api/device'
import waves from '@/directive/waves' // waves directive

const defaultForm = {
  size: 0,
  cellSize: 0,
  cell: 0
}
export default {
  name: 'EditDevice',
  directives: { waves },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      listLoading: false,
      id: 0
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    if (this.id !== '-1') {
      this.getData(this.id)
    } else {
      this.id = null
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData(id) {
      this.listLoading = true
      const query = {
        id: id
      }
      getDeviceTerminalDetail(query).then(response => {
        this.postForm = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .emp-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding-left: 4px;
    padding-right: 4px;
  }
</style>
