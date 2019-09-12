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
      <el-table-column :label="$t('agreement.title')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>CN:{{ scope.row.cnTitle }}</span><br>
          <span>EN:{{ scope.row.enTitle }}</span><br>
          <span>THAI:{{ scope.row.thaiTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('agreement.createTime')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" min-width="60px" align="center">
        <template slot-scope="scope">
          <router-link :to="'/system/agreementDetail/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              {{ $t('status.edit') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { agreementList } from '@/api/system'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Agreement',
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
      agreementList(this.listQuery).then(response => {
        this.list = response.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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
