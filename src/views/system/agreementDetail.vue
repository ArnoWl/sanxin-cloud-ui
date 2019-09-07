<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar draft'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="primary" @click="submitForm">
          {{ $t('status.save') }}
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                {{ $t('agreement.title') }}
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          CN<Tinymce ref="editor" v-model="postForm.cnContent" :height="400" />
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          EN<Tinymce ref="editor" v-model="postForm.enContent" :height="400" />
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          THAI<Tinymce ref="editor" v-model="postForm.thaiContent" :height="400" />
        </el-form-item>

        <el-form-item align="center">
          <el-button type="primary" @click="submitForm()">{{ $t('status.save') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getAgreementDetail, updateAgreementDetail } from '@/api/system'

const defaultForm = {
  title: '', // 文章题目
  content: '' // 文章内容
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('The title cannot empty'))
      } else {
        callback()
      }
    }
    const validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('The content cannot empty'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateContent }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getData(id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData(id) {
      const data = {
        id: id
      }
      getAgreementDetail(data).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.createTime = null
          updateAgreementDetail(this.postForm).then(response => {
            if (response.status) {
              this.$notify({
                message: response.msg,
                type: 'success',
                duration: 2000
              })
              this.getData(this.postForm.id)
            } else {
              this.$notify({
                message: response.msg,
                type: 'error',
                duration: 2000
              })
            }
          })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
