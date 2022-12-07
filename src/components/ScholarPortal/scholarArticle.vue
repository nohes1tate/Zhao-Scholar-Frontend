<template>
  <div>
    <div style="margin-top: 20px;font-size: 18px;">
      <div style="margin-left: 20px;float: left;margin-top: 10px">学者文献共<span style="font-size: 30px">{{pageNum}}</span>篇</div>
      <div style="float: right;margin-right: 20px;">
        <v-select
            :items="selects"
            label="排序方式"
            v-model="selectMethod"

        ></v-select></div>
    </div>
    <v-card
        width="1000px"
        style="float: left;box-shadow: none;background-color: #fcfcfc"
    >

      <v-list-item
          v-for="(item, i) in this.CurrentPageData"
          :key="i"
          three-line
      >
        <v-card
            style="width: 100%;margin-bottom: 20px;"
        >
          <v-list-item-content style="margin-left: 10px;">

            <v-list-item-title class="headline mb-2" v-text="item.Title">
            </v-list-item-title>
            <v-list-item-subtitle v-text="item.Authors" style="color: #1E88E5;">
            </v-list-item-subtitle>
            <div v-text="item.Abstract" class="text-ellipsis-two" style="font-weight: 350;">
            </div>
            <v-divider></v-divider>
            <div>
              <div style="margin-top: 10px;float: left;">
                <h5 style="float: left;">被引用数:{{item.cites}}</h5>
                <h5 style="float: left;margin-left: 30px;">收藏数:{{item.collections}}</h5>
                <h5 style="float: left; margin-left: 30px;">发表时间:{{item.publishTime}}</h5>
              </div>
              <div style="float: right;">

                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" >收藏<v-icon color="#64B5F6">mdi-star-plus-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;">引用<v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;">下载<v-icon color="#64B5F6">mdi-download</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" @click="toDocument(item.Title)">详情<v-icon color="#64B5F6">mdi-link-variant</v-icon></v-btn>

              </div>
            </div>
          </v-list-item-content>
        </v-card>
      </v-list-item>


      <v-pagination
          v-model="page"
          :length="this.pageNum"
          circle
      ></v-pagination>
    </v-card>
  </div>
</template>
<script>
export default{
  data:()=>({
    page: 1,
    pageSize:5,
    pageNum:1,
    Num:1,
    CurrentPageData:[],
    selects:["推荐排序","被引用数", "收藏数", "发表时间"],
    selectMethod:"推荐排序",
    paperInfo:[
      {Title:"第一个Improved Techniques for Training GANs",
        Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen",
        Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"第二个Improved Techniques for Training GANs",
        Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen",
        Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"Inkjet Printing of Polymers: State of the Art and Future Developments",
        Authors:"BJ De Gans, PC Duineveld, US Schubert - Advanced materials, 2004 - Wiley Online Library",
        Abstract:"Inkjet printing is considered to be a key technology in the field of defined polymer deposition. This article provides an introduction to inkjet printing technology and a short overview of the available instrumentation. Examples of polymer inkjet printing are given, including the manufacturing of multicolor polymer light-emitting diode displays, polymer electronics, three-dimensional printing, and oral dosage forms for controlled drug release. Special emphasis is placed upon the utilized polymers and conditions, such as polymer structure, molar mass, solvents, and concentration. Studies on viscoelastic fluid jets and the formation of viscoelastic droplets under gravity indicate that strain hardening is the key parameter that determines the inkjet printability of polymer solutions.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"第二个Improved Techniques for Training GANs",
        Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen",
        Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"Inkjet Printing of Polymers: State of the Art and Future Developments",
        Authors:"BJ De Gans, PC Duineveld, US Schubert - Advanced materials, 2004 - Wiley Online Library",
        Abstract:"Inkjet printing is considered to be a key technology in the field of defined polymer deposition. This article provides an introduction to inkjet printing technology and a short overview of the available instrumentation. Examples of polymer inkjet printing are given, including the manufacturing of multicolor polymer light-emitting diode displays, polymer electronics, three-dimensional printing, and oral dosage forms for controlled drug release. Special emphasis is placed upon the utilized polymers and conditions, such as polymer structure, molar mass, solvents, and concentration. Studies on viscoelastic fluid jets and the formation of viscoelastic droplets under gravity indicate that strain hardening is the key parameter that determines the inkjet printability of polymer solutions.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"第二个Improved Techniques for Training GANs",
        Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen",
        Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"Inkjet Printing of Polymers: State of the Art and Future Developments",
        Authors:"BJ De Gans, PC Duineveld, US Schubert - Advanced materials, 2004 - Wiley Online Library",
        Abstract:"Inkjet printing is considered to be a key technology in the field of defined polymer deposition. This article provides an introduction to inkjet printing technology and a short overview of the available instrumentation. Examples of polymer inkjet printing are given, including the manufacturing of multicolor polymer light-emitting diode displays, polymer electronics, three-dimensional printing, and oral dosage forms for controlled drug release. Special emphasis is placed upon the utilized polymers and conditions, such as polymer structure, molar mass, solvents, and concentration. Studies on viscoelastic fluid jets and the formation of viscoelastic droplets under gravity indicate that strain hardening is the key parameter that determines the inkjet printability of polymer solutions.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"第二个Improved Techniques for Training GANs",
        Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen",
        Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      },
      {Title:"Inkjet Printing of Polymers: State of the Art and Future Developments",
        Authors:"BJ De Gans, PC Duineveld, US Schubert - Advanced materials, 2004 - Wiley Online Library",
        Abstract:"Inkjet printing is considered to be a key technology in the field of defined polymer deposition. This article provides an introduction to inkjet printing technology and a short overview of the available instrumentation. Examples of polymer inkjet printing are given, including the manufacturing of multicolor polymer light-emitting diode displays, polymer electronics, three-dimensional printing, and oral dosage forms for controlled drug release. Special emphasis is placed upon the utilized polymers and conditions, such as polymer structure, molar mass, solvents, and concentration. Studies on viscoelastic fluid jets and the formation of viscoelastic droplets under gravity indicate that strain hardening is the key parameter that determines the inkjet printability of polymer solutions.",
        pdf:0,//0无，1有
        link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
        cites:123,//被引用数
        collections:12,//收藏数
        publishTime:2012,//发表时间
      }
    ]
  }),
  methods:{
    toDocument(title){
      console.log(title)
      this.$router.push({path:"/document", query:{Title:title, Id:123}})
    },
    getCurrentPageData(){
      let begin = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      this.CurrentPageData=this.paperInfo.slice(begin, end);
    }
  },
  created(){
    this.Num = this.paperInfo.length;
    this.pageNum =  Math.ceil(this.Num/this.pageSize);
    console.log("pageNum:"+this.pageNum)
    this.getCurrentPageData()
  },
  //监听page的变化
  watch:{
    page(){
      console.log("page:"+this.page)
      this.getCurrentPageData()
    },
    selectMethod(){
      console.log("selectMethod:"+this.selectMethod)
    }
  }
}
</script>
<style scoped>
.text-ellipsis-two {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}


</style>