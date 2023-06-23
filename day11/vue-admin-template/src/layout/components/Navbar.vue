<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            v-if="avatar"
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <div v-else class="avatar">{{ name[0] }}</div>
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
            @click.prevent="changePassword"
          >
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="visible" @close="reset">
      <el-form
        ref="changePsdRef"
        :model="changePsd"
        :rules="changePsdRules"
        label-width="80px"
      >
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input
            v-model="changePsd.oldPassword"
            :type="openOld ? 'text' : 'password'"
          >
            <template #suffix>
              <svg-icon
                :icon-class="openOld ? 'eye-open' : 'eye'"
                style="cursor: pointer"
                @click.native="openOld = !openOld"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            v-model="changePsd.newPassword"
            :type="openNew ? 'text' : 'password'"
          >
            <template #suffix>
              <svg-icon
                :icon-class="openNew ? 'eye-open' : 'eye'"
                style="cursor: pointer"
                @click.native="openNew = !openNew"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPsd" label="确认密码">
          <el-input
            v-model="changePsd.confirmPsd"
            :type="openConfirm ? 'text' : 'password'"
          >
            <template #suffix>
              <svg-icon
                :icon-class="openConfirm ? 'eye-open' : 'eye'"
                style="cursor: pointer"
                @click.native="openConfirm = !openConfirm"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePasd">确认修改</el-button>
          <el-button @click="visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { changePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      visible: false,
      changePsd: {
        oldPassword: '',
        newPassword: '',
        confirmPsd: ''
      },
      changePsdRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        // 自定义校验规则校验第二次密码
        confirmPsd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.changePsd.newPassword) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      openOld: false,
      openNew: false,
      openConfirm: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changePassword() {
      this.visible = true
    },
    async changePasd() {
      try {
        await this.$refs.changePsdRef.validate()
        const { oldPassword, newPassword } = this.changePsd
        await changePassword({ oldPassword, newPassword })
        this.$message.success('修改成功')
        this.visible = false
      } catch (error) {
        console.log(error)
      }
    },
    reset() {
      this.$refs.changePsdRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: skyblue;
  line-height: 40px;
  text-align: center;
  color: #000;
}
</style>
