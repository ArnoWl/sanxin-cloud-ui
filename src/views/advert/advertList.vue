<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-select v-model="listQuery.event" :placeholder="$t('advert.eventName')" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option
          v-for="item in eventType"
          :key="item.url"
          :label="item.url"
          :value="item.url"
        >
          <span>{{ item.url }}</span>
        </el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button type="primary" icon="el-icon-edit">
        <router-link :to="'/advert/editAdvertList/-1'">
          {{ $t('advert.addAdvert') }}
        </router-link>
      </el-button>
    </div>

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
      <el-table-column :label="$t('advert.eventName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.sort')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.advertTime')" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.statusName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="primary" size="small">{{ $t('status.invalid') }}</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success" size="small">{{ $t('status.effective') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" width="150px" align="center">
        <template slot-scope="scope">
          <router-link :to="'/advert/editAdvertList/'+scope.row.id">
            <el-button type="primary" size="small">
              {{ $t('status.edit') }}
            </el-button>
          </router-link>
          <el-button v-if="scope.row.status==0" type="info" size="small" @click="handleStatus(scope.row, 1)">
            {{ $t('status.effective') }}
          </el-button>
          <el-button v-if="scope.row.status==1" type="danger" size="small" @click="handleStatus(scope.row, 0)">
            {{ $t('status.invalid') }}
          </el-button>
          <el-button v-if="scope.row.homeShow==0 && scope.row.status==1" type="warning" size="small" @click="handleHomeShow(scope.row)">
            {{ $t('advert.setFrame') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { advertFindList, handleAdvertFindStatus, queryEventType } from '@/api/advert'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Advert',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: '',
        content: '',
        event: ''
      },
      showReviewer: false,
      dialogPvVisible: false,
      pvData: [],
      eventType: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.getTypeValue()
  },
  methods: {
    getList() {
      this.listLoading = true
      advertFindList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getTypeValue() {
      queryEventType().then(response => {
        this.eventType = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleStatus(row, status) {
      const query = {
        id: row.id,
        status: status
      }
      this.listLoading = true
      handleAdvertFindStatus(query).then(response => {
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
      this.listLoading = false
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

