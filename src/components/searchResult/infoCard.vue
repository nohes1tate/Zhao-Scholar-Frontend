<template>
    <v-card
    width="1000px"
    >
    <v-list-item-group v-model="paperInfo" color="primary">
        <v-list-item
        v-for="(item, i) in paperInfo"
        :key="i"
        three-line
        >
        <v-list-item-content>
            <v-list-item-title class="headline mb-2" v-text="item.Title">
            </v-list-item-title>
            <v-list-item-subtitle v-text="item.Authors">
            </v-list-item-subtitle>
            <div v-text="item.Abstract" class="text-ellipsis-two">
            </div>
            <div>
                <v-btn style="background-color: transparent;box-shadow: none;" >收藏<v-icon >mdi-star-plus-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;">引用<v-icon>mdi-format-quote-close-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;">下载<v-icon>mdi-download</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;" @click="toDocument(item.Title)">详情<v-icon>mdi-link-variant</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;">被引用数</v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;">收藏数</v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;">发表时间</v-btn>
            </div>
        </v-list-item-content>
        </v-list-item>
    </v-list-item-group>
    </v-card>
</template>
<script>
    export default{
        data:()=>({
            paperInfo:[
            {Title:"第一个Improved Techniques for Training GANs", 
            Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen", 
            Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
            pdf:0,//0无，1有
            link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
            refernces:123,//被引用数
            collections:12,//收藏数
            publishTime:2012,//发表时间  
            },
            {Title:"第二个Improved Techniques for Training GANs", 
            Authors:"Tim Salimans, Ian Goodfellow, Wojciech Zaremba, Vicki Cheung, Alec Radford, Xi Chen, Xi Chen", 
            Abstract:"We present a variety of new architectural features and training procedures that we apply to the generative adversarial networks (GANs) framework. Using our new techniques, we achieve state-of-the-art results in semi-supervised classification on MNIST, CIFAR-10 and SVHN. The generated images are of high quality as confirmed by a visual Turing test: Our model generates MNIST samples that humans cannot distinguish from real data, and CIFAR-10 samples that yield a human error rate of 21.3%. We also present ImageNet samples with unprecedented resolution and show that our methods enable the model to learn recognizable features of ImageNet classes.",
            pdf:0,//0无，1有
            link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
            refernces:123,//被引用数
            collections:12,//收藏数
            publishTime:2012,//发表时间  
            },
            {Title:"Inkjet Printing of Polymers: State of the Art and Future Developments", 
            Authors:"BJ De Gans, PC Duineveld, US Schubert - Advanced materials, 2004 - Wiley Online Library", 
            Abstract:"Inkjet printing is considered to be a key technology in the field of defined polymer deposition. This article provides an introduction to inkjet printing technology and a short overview of the available instrumentation. Examples of polymer inkjet printing are given, including the manufacturing of multicolor polymer light-emitting diode displays, polymer electronics, three-dimensional printing, and oral dosage forms for controlled drug release. Special emphasis is placed upon the utilized polymers and conditions, such as polymer structure, molar mass, solvents, and concentration. Studies on viscoelastic fluid jets and the formation of viscoelastic droplets under gravity indicate that strain hardening is the key parameter that determines the inkjet printability of polymer solutions.",
            pdf:0,//0无，1有
            link:"https://proceedings.neurips.cc/paper/2016/hash/8a3363abe792db2d8761d6403605aeb7-Abstract.html",
            refernces:123,//被引用数
            collections:12,//收藏数
            publishTime:2012,//发表时间  
            }
        ]
        }),
        methods:{
            toDocument(title){
                console.log(title)
                this.$router.push({path:"/document", query:{Title:title, Id:123}})
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