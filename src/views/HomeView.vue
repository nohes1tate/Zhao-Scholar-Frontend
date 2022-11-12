<template>
  <div height="100vh">
    <div 
      width="100vw"
      class="bgimg"
      :style="{ 'height':'60vh'}"
    >
      <!-- <v-card   background="linear-gradient(red, blue)"> -->
      <v-row :style="{'height':'60vh'}">
        <v-col cols="12" md="12" sm="2">
          <v-row>
            <v-col cols="12" md="2" sm="12">
              <h1 class="d-flex justify-center" :style="{'color':'white'}">LOGO</h1>
            </v-col>
            <v-col cols="12" md="7" sm="12"/>
            <v-col cols="12" md="3" sm="12" class="d-flex align-center">
            <div>
              <v-btn text :style="{'font-weight': 'bold','color':'white'}">English</v-btn>
              <v-btn text :style="{'font-weight': 'bold','color':'white'}">登录</v-btn>
            </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12" sm="10">
          <v-row>
        <v-col cols="12" md="3" sm="12" />
        <v-col cols="12" md="6" sm="12">
        <v-row min-height="800px">
          <v-col cols="12" md="12" sm="2" />
          <v-col cols="12" md="12" sm="4">
            <h1 class="d-flex justify-center" :style="{'font-size':'80px', 'color':'white'}">
              ZScholar
            </h1>
          </v-col>
          <v-col cols="12" md="12" sm="1" />
          <v-col cols="12" md="12" sm="5" class="d-flex align-center">
            <v-text-field
        append-icon="mdi-heart"
        @click:append="searchTag"
        @keyup.enter="searchTag"
        hide-details
        solo
        label="Search something"
        v-model="search"
    />
          </v-col>
        </v-row>
        </v-col>
        <v-col cols="12" md="3" sm="12" />
          </v-row>
        </v-col>
          <v-col cols="12" md="12" sm="2"/>

      </v-row>
    </div>
  <div :style="{'background-color':'#EEEEEE','height':'50vh'}">
    <v-row>
      <v-col cols="12" md="4" sm="12">
    <v-card
    :style="{'margin-top':'-50px'}"
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>
      <v-subheader>Scholars</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
    <v-card
    :style="{'margin-top':'-50px'}"
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>
      <v-subheader>Scholars</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
    <v-card
    :style="{'margin-top':'-50px'}"
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>
      <v-subheader>Scholars</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
      </v-col>
    </v-row>
  </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      search: "",
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    };
  },
  methods: {
    searchTag() {
      if(this.search=='') return false;
      console.log(this.search);
    }
  }
};
</script>
<style scoped>
.bgimg{
    background-image: url('../assets/bg.png');
    background-size: cover
  }
</style>>
