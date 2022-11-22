<template>
    <div>
        <v-card
        width="300px"
        style="background-color: #E3F2FD;"
        >
        <v-card-title>高级检索使用方法</v-card-title>
       
        <v-card-text>
            <div>
                <span>高级检索支持使用运算符*、+、-、''、""、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。

输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。

若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。</span>
            </div>

            <h3 style="margin-top: 20px;">例如:</h3>
            <div>
                <span>
                    （1）篇名检索项后输入：神经网络 * 自然语言，可以检索到篇名包含“神经网络”及“自然语言”的文献。
                </span>
            </div>

            <div>
                <span>
                    （2）主题检索项后输入：(锻造 + 自由锻) * 裂纹，可以检索到主题为“锻造”或“自由锻”，且有关“裂纹”的文献。
                </span>
            </div>

            <div>
                <span>
                    （3）如果需检索篇名包含“digital library”和“information service”的文献，在篇名检索项后输入：'digital library' * 'information service'。
                </span>
            </div>

            <div>
                <span>
                    （4）如果需检索篇名包含“2+3”和“人才培养”的文献，在篇名检索项后输入：'2+3' * 人才培养。
                </span>
            </div>
        </v-card-text>
        </v-card>
    </div>
</template>