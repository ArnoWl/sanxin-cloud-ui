<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        ภาษาไทย
      </el-dropdown-item>
      <!--      <el-dropdown-item :disabled="language==='ja'" command="ja">-->
      <!--        日本語-->
      <!--      </el-dropdown-item>-->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { setLanguage } from '@/utils/auth'

export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      var language = ''
      switch (lang) {
        case 'zh':
          language = 'CN'
          break
        case 'en':
          language = 'EN'
          break
        case 'es':
          language = 'THAI'
          break
        default:
          break
      }
      setLanguage(language)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>
