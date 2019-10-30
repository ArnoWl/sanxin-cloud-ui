<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('address.zhName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('address.thaiName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nameThai }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('address.enName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nameEn }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('address.level')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-button type="primary">
            {{ $t('status.edit') }}
          </el-button>
          <el-button v-if="scope.row.status == 1" type="danger" @click="handleStatus(scope.row, 0)">
            {{ $t('status.invalid') }}
          </el-button>
          <el-button v-if="scope.row.status == 0" type="success" @click="handleStatus(scope.row, 1)">
            {{ $t('status.effective') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { addressList, handleAddressStatus } from '@/api/system'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Address',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      addressList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleStatus(row, status) {
      const query = {
        id: row.id,
        status: status
      }
      handleAddressStatus(query).then(response => {
        if (response.status) {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          row.status = status
        } else {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }
  }
}
</script>
