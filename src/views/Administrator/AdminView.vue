<template>
  <div class="admin">
    <div class="left-tabs">
      <v-card>
        <v-tabs vertical>
          <v-tab @click="showInfo">
            <v-icon left>mdi-information-outline</v-icon>
            平台概况
          </v-tab>
          <v-tab @click="showVerify">
            <v-icon left>mdi-account-multiple-plus-outline</v-icon>
            入驻审核
          </v-tab>
          <v-tab @click="showScholar">
            <v-icon left>mdi-account-check</v-icon>
            入驻学者
          </v-tab>
        </v-tabs>
      </v-card>
    </div>
    <div class="right-info">
      <v-card v-if="showInfoTab">
        info
      </v-card>
      <v-card v-if="showVerifyTab">
        verify
      </v-card>
      <v-card v-if="showScholarTab">
        scholar
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
      showInfoTab: true,
      showVerifyTab: false,
      showScholarTab: false,
    };
  },
  methods: {
    showInfo() {
      this.showInfoTab = true;
      this.showVerifyTab = false;
      this.showScholarTab = false;
    },
    showVerify() {
      this.showInfoTab = false;
      this.showVerifyTab = true;
      this.showScholarTab = false;
    },
    showScholar() {
      this.showInfoTab = false;
      this.showVerifyTab = false;
      this.showScholarTab = true;
    },
  },
}
</script>

<style scoped>
.admin{
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
  padding-left: 10vh;
  padding-top: 10vh;
}
.left-tabs{
  width: 15%;
  height: 100%;
  float: left;
}
.right-info{
  width: 60%;
  height: 100%;
  margin-left: 10%;
  float: left;
}
</style>