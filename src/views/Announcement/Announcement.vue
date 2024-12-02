<template>
  <div class="home">
    <div class="container">
      <div class="left">
        <el-tabs v-model="activeName" class="left-top">
          <el-tab-pane label="通知公告" name="first">
            <el-card
              class="box-card"
              v-for="(item, index) in uoppt"
              :key="index"
            >
              <div class="item-top">
                <div class="item-name" @click="policyName(item.id)">
                  【{{ item.type }}】{{ item.policyName }}
                </div>
                <div class="time">{{ item.createTime }}</div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="政策文件" name="second">
            <el-card
              class="box-card"
              v-for="(item, index) in Datacard"
              :key="index"
            >
              <div class="item-top">
                <div class="item-name" @click="policyName(item.id)">
                  【文件】{{ item.policyName }}
                </div>
                <div class="time">{{ item.createTime }}</div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <div class="top-ss">
          <div class="input-with">
            <el-input
              placeholder="请输入内容"
              v-model="inputLiu"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="probleL"
              ></el-button>
            </el-input>
          </div>
          <div class="item-po">
            <el-badge class="item">
              <el-button
                size="small"
                v-if="currentView !== 'main'"
                @click="goToMain"
                >返回</el-button
              >

              <div class="conyuyu" v-if="currentView !== 'alternative'">
                <div class="question"></div>
                <el-button
                  @click="Clickwt"
                  class="button"
                  icon="el-icon-chat-dot-round"
                >
                  提问题
                </el-button>
              </div>
            </el-badge>
          </div>
        </div>
        <!-- <div class="conter" v-if="currentView === 'main'">
          <div class="dage">
            <div class="diedi">
              <div class="el-tagl" @click="ropiuyt"><el-tag>全部</el-tag></div>
              <div class="name-List">
                <div
                  class="Name"
                  v-for="(item, index) in channelAnswer"
                  :key="index"
                >
                  <el-button
                    plain
                    class="el-problemModule"
                    @click="problemClick(item.problemModule)"
                    >{{ item.problemModule }}</el-button
                  >
                </div>
              </div>
            </div>
            <div class="zhankai1" @click="toggleExpand">
              {{ zhankai1 ? "收起" : "展开"
              }}<i
                :class="`el-icon-arrow-${
                  zhankai1 ? 'down' : 'down'
                } el-icon--right`"
              ></i>
            </div>
          </div>
          <div class="value-bottom" v-show="zhankai1">
            <div
              v-for="(item, index) in items"
              :key="index"
              :class="{ selected: selectedIndex === index }"
              @click="selectItem(index, item)"
              class="grid-item"
            >
              {{ item }}
            </div>
          </div>
        </div> -->
        <div class="border-bottom-li" v-if="currentView === 'main'">
          <el-tabs type="border-card" class="card">
            <el-tab-pane label="全部">
              <div class="container">
                <div
                  v-for="(item, index) in itemrows"
                  :key="index"
                  class="item-row"
                >
                  <div class="item-image">
                    <img :src="item.problemByPicture" alt="问题图片" />
                    <div>
                      <div
                        class="details2"
                        @click="problemNameClick(item.problemName)"
                      >
                        {{ item.problemName }}
                      </div>
                      <div class="item-details">
                        <!-- <div class="details1">{{ item.problemType }}</div> -->

                        <div class="item-info">
                          <div class="publisher-name">{{ item.publishBy }}</div>
                          <div class="publish-time">
                            发表时间: {{ item.publishTime }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <el-row :gutter="20">
                      <el-col :span="10"
                        ><div class="grid-purple">
                          {{ item.replyList }}回答
                        </div></el-col
                      >
                      <!-- <el-col :span="6"
                        ><div class="grid-purple">{{ 0 }}浏览</div></el-col
                      > -->
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- <el-tab-pane label="官方回答">官方回答</el-tab-pane>
            <el-tab-pane label="用户提问">用户提问</el-tab-pane> -->
          </el-tabs>
        </div>
        <div v-else class="alternative-content">
          <div
            class="alternativeconter"
            v-for="(item, index) in replyInfoList"
            :key="index"
          >
            <div class="left-alternativeconter">
              <div class="title">
                <!-- <div class="top">{{ item.problemType }}</div> -->
                <h2 class="zhong">{{ item.problemName }}</h2>
                <div class="xia">
                  <div>{{ item.publishTime }}</div>
                  <!-- <div>2次阅读</div> -->
                  <div>{{ item.replyList }}个回答</div>
                </div>
              </div>
              <div class="conteroff">
                <div>
                  {{ item.problemDetails }}
                </div>
                <div class="problem">
                  <img :src="item.problemNamePictureUrl" alt="" />
                </div>
              </div>
            </div>
            <!-- <div class="right-alternativeconter">
              <div class="profile-card">
                <div class="icon">
                  <img :src="item.problemByPicture" alt="" />
                </div>
                <div class="name">{{ item.publishBy }}</div>
                <div class="subtitle">淮北市自然资源和规划局杜集分局</div>
                <div class="stats">
                  <div>
                    <span>回答</span>
                    0
                  </div>
                  <div>
                    <span>粉丝</span>
                    0
                  </div>
                  <div>
                    <span>关注</span>
                    0
                  </div>
                </div>
                <button class="follow-button">关注</button>
              </div>
            </div> -->

            <div class="comment-section">
              <div
                v-for="(comment, index) in comments"
                :key="index"
                class="comment"
              >
                <div class="comment-header">
                  <img
                    :src="comment.replyByPicture"
                    alt="avatar"
                    class="avatar"
                  />
                  <div class="comment-info">
                    <span class="comment-author">{{ comment.replyBy }}</span>
                    <span class="comment-date">{{ comment.replyTime }}</span>
                  </div>
                </div>
                <div class="comment-body">
                  <p>{{ comment.replyContent }}</p>
                  <img :src="comment.replyPictureUrl" alt="" />
                  <div class="comment-actions">
                    <!-- <el-button size="mini" type="text" @click="reply(index)"
                      >回复</el-button
                    > -->
                    <!-- <el-button size="mini" type="text">编辑</el-button> -->
                    <el-button
                      size="mini"
                      @click="wromer(comment.id)"
                      type="text"
                      >删除</el-button
                    >
                  </div>
                  <div v-if="replyIndex === index" class="reply-box">
                    <el-input
                      type="textarea"
                      placeholder="输入回复内容..."
                      v-model="replyContent"
                      rows="3"
                    >
                    </el-input>
                    <div class="reply-actions">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="submitReply(index)"
                        >提交</el-button
                      >
                      <el-button size="mini" @click="cancelReply"
                        >取消</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
              >
              </el-pagination> -->
            </div>
            <div class="button-container">
              <button
                v-if="!isEditorVisible"
                class="button"
                @click="showEditor"
              >
                我来说两句，分享我的答案
              </button>

              <div v-else class="quill-editor">
                <quill-editor
                  v-model="replyInfo.replyContent"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)"
                >
                </quill-editor>
                <input type="file" @change="onFileChange" />
                <div class="dialog-footer">
                  <el-button type="primary" @click="submitAnswer"
                    >提交</el-button
                  >
                </div>
              </div>
            </div>
            <!-- <div class="right-bottom">
              <h3>相关问题</h3>
              <div
                v-for="(item, index) in correlationProblemList"
                :key="index"
                class="list-item"
              >
                <div class="index-circle">{{ index + 1 }}</div>
                <div
                  class="item-content"
                  :class="{ hovered: hoveredItem === item }"
                  @mouseenter="hoveredItem = item"
                  @mouseleave="hoveredItem = null"
                  @click="handleItemClick(item)"
                >
                  {{ item }}
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="工作通知"
      class="visible"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div v-for="(item, index) in Policy" :key="index" class="top-Name">
        <h2 class="policyName-item">{{ item.policyName }}</h2>
        <div class="createTime">
          <!-- {{ item.createBy }}--- -->
          {{ item.createTime }}
        </div>
        <!-- <div class="fjian">详见附件</div> -->
        <div style="text-align: center">{{ item.noticeContent }}</div>
        <div class="fjian2">附件</div>
        <div class="top-url">
          <div class="policyUrl">{{ item.policyName }}</div>
          <div>
            <el-link type="danger" @click="dangerClick(item.policyUrl)"
              >下载</el-link
            >
          </div>
          <!-- <div>下载</div> -->
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="选择任务（支持多选）"
      :visible.sync="xuanzrwe"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="任务分类">
          <el-radio-group v-model="form.category" @change="getCategoryName">
            <el-radio label="外业核查">外业核查</el-radio>
            <el-radio label="系统填报">系统填报</el-radio>
            <el-radio label="日常变更">日常变更</el-radio>
            <el-radio label="集中举证">集中举证</el-radio>
            <el-radio label="违法处置">违法处置</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="history-list">
        <el-scrollbar>
          <el-list class="el-scrollbar-zl">
            <el-list-item
              class="scroolter"
              v-for="(item, index) in historyItems"
              :key="index"
              :class="{ 'is-selected': isSelected(item) }"
              @click="addItem(item)"
            >
              {{ item }}
            </el-list-item>
          </el-list>
        </el-scrollbar>
      </div>
    </el-dialog>
    <div class="form-container" v-show="VisibleLIsat">
      <div class="form-group">
        <label for="title">标题</label>
        <input v-model="textlist" type="text" id="title" name="title" />
      </div>
      <!-- <div class="form-group">
        <label for="task">添加任务</label>
        @click="taskClick"
        <input
          type="text"
          id="task"
          name="task"
          v-model="selectedItemsString"
        />
      </div> -->
      <div class="form-group">
        <label for="task">上传图片</label>
        <input type="file" @change="onFileChange" />
      </div>
      <div class="form-group">
        <editor
          v-model="listrowe"
          useCustomImageHandler
          @onEditorChange="handleEditorChange"
          @image-added="handleImageAdded"
          :id="tinymceId"
          :init="init"
        ></editor>
      </div>
      <div class="submit-button">
        <div><button type="submit" @click="noneClick">提交</button></div>
        <div>
          <button type="submit" @click="submitClick">没想清楚?先退出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PolicyDocument,
  PolicyDocumenturl,
  problemModule,
  channelAnswermodule,
  probleList,
  channelAnswerroblem,
  replyProblem,
  raiseProblemr,
  channelAnswer2024,
  probleList2024,
  problemByType,
  notice2024,
} from "../../api/document/index";
// 导入富文本
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default"; //富文本样式
// 配置富文本
import "tinymce/plugins/table";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/paste"; //可复制
import "tinymce/plugins/link";
import "tinymce/themes/silver/theme.min.js"; //引入富文本的主要脚本
import "tinymce/skins/ui/oxide/skin.min.css"; //富文本样式
const toolbar =
  "  undo redo restoredraft | fontselect fontsizeselect styleselect forecolor backcolor bold italic underline strikethrough  anchor link | alignleft aligncenter alignright alignjustify outdent indent lineheight| \
table tablemergecells  image  charmap emoticons hr pagebreak |bullist numlist | blockquote subscript superscript removeformat | \
insertdatetime print preview | fullscreen | bdmap indent2em  formatpainter axupimgs";
const plugins =
  "powerpaste autoresize print paste preview searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools template  codesample table  charmap hr pagebreak nonbreaking anchor link insertdatetime advlist lists wordcount  textpattern help emoticons autosave ";
const fonts = [
  "宋体=宋体",
  "微软雅黑=微软雅黑",
  "新宋体=新宋体",
  "黑体=黑体",
  "楷体=楷体",
  "隶书=隶书",
  "Courier New=courier new,courier",
  "AkrutiKndPadmini=Akpdmi-n",
  "Andale Mono=andale mono,times",
  "Arial=arial,helvetica,sans-serif",
  "Arial Black=arial black,avant garde",
  "Book Antiqua=book antiqua,palatino",
  "Comic Sans MS=comic sans ms,sans-serif",
  "Courier New=courier new,courier",
  "Georgia=georgia,palatino",
  "Helvetica=helvetica",
  "Impact=impact,chicago",
  "Symbol=symbol",
  "Tahoma=tahoma,arial,helvetica,sans-serif",
  "Terminal=terminal,monaco",
  "Times New Roman=times new roman,times",
  "Trebuchet MS=trebuchet ms,geneva",
  "Verdana=verdana,geneva",
  "Webdings=webdings",
  "Wingdings=wingdings,zapf dingbats",
];

export default {
  components: { Editor },
  name: "Index",
  data() {
    return {
      uoppt: [],
      inputLiu: "",
      listrowe: "",
      textlist: "",
      selectedItems: [],
      form: {
        category: "外业核查",
        date: "",
      },
      historyItems: [],
      VisibleLIsat: false,
      xuanzrwe: false,
      hoveredItem: null,
      comments: [],
      activeName: "first",
      Datacard: [],
      dialogVisible: false,
      Policy: [],
      channelAnswer: [],
      items: [],
      selectedIndex: null,
      zhankai1: false,
      itemrows: [],
      currentView: "main",
      isEditorVisible: false,
      editorContent: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },

        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
      replyInfo: {
        replyContent: "",
        problemName: "",
      },
      replyInfoList: [],
      correlationProblemList: [],
      replyIndex: null,
      replyContent: "",
      selectedFile: null,
      poDatarow: "",
      tinymceId:
        "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""), //富文本编辑器的id,
      init: {
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",

        images_upload_handler: this.handleImageUpload,
        language_url: require("@/assets/langs/zh_CN.js"), // 语言包的路径，具体路径看自己的项目（前期工作请下载好语言包）
        language: "zh_CN",
        fontsize_formats:
          "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字体大小
        font_formats: fonts.join(";"), //字体
        setup: function (editor) {
          //设置默认字体样式
          editor.on("init", function (e) {
            this.getBody().style.fontFamily = "宋体";
          });
        },
        min_height: 300, //编辑器最小高度
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        //主题样式路径
        skin_url:
          (process.env.VUE_APP_BASE_API == "//xx.woa.com/wxgame"
            ? "//xx.woa.com/wxgame"
            : process.env.VUE_APP_BASE_API == "//xx.woa.com/wxgame-test"
            ? "//xx.woa.com/wxgame-test"
            : "") + "/public/skins/ui/oxide", // 必选 skin路径，具体路径看自己的项目
        //为编辑区指定css文件
        //  content_css:"./public/css/content.css",//一般我们这里都是直接获取路径是没有问题的，但是有坑点，往下看会有解释原因,skin_url,powerpaste同理
        //正确写法，根据自己的环境判断拼接根路径
        // (process.env.VUE_APP_BASE_API == 测试环境路径
        //  ? 测试环境路径
        // : process.env.VUE_APP_BASE_API == 现网环境路径
        //  ? 现网环境路径
        // : "")
        content_css:
          (process.env.VUE_APP_BASE_API == "//xx.woa.com/wxgame"
            ? "//xx.woa.com/wxgame"
            : process.env.VUE_APP_BASE_API == "//xx.woa.com/wxgame-test"
            ? "//xx.woa.com/wxgame-test"
            : "") + "/public/css/content.css",
        // 添加复制可保留原格式扩展插件开始
        external_plugins: {
          //powerpaste 路径
          powerpaste:
            (process.env.VUE_APP_BASE_API == "//xx.woa.com/wxgame"
              ? "//xx.woa.com/wxgame"
              : process.env.VUE_APP_BASE_API == "//xx.woa.com/wxgame-test"
              ? "//xx.woa.com/wxgame-test"
              : "") + "/public/powerpaste/plugin.min.js",
        },
        powerpaste_word_import: "propmt", // 参数可以是propmt, merge, clear，效果自行切换对比
        powerpaste_html_import: "propmt", // propmt, merge, clear
        powerpaste_allow_local_images: true,
        // 添加复制可保留原格式扩展插件结束
        image_dimensions: true, // 保存图片的时候可以设置大小
        //表格默认样式
        table_default_styles: {
          "line-height": "47px",
          "border-collapse": "collapse",
          width: "100%",
          "border-color": "#EBEEF5",
          "box-sizing": " border-box",
        },
        plugins: plugins,
        toolbar: toolbar,
      },
    };
  },
  computed: {
    // selectedItemsString() {
    //   return this.selectedItems.join(",");
    // },
  },
  mounted() {
    this.PolicyDocumen();
    this.problemModu();
    this.raiseProbl();
    tinymce.init({});
    this.noneko();
  },
  methods: {
    noneko() {
      notice2024().then((ok) => {
        // console.log(ok);
        this.uoppt = ok.data.rows;
      });
    },
    probleL() {
      let params = {
        problemName: this.inputLiu,
      };
      probleList2024(params).then((ok) => {
        this.itemrows = ok.data.rows;
      });
    },
    wromer(rowid) {
      channelAnswer2024(rowid).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.channel(this.poDatarow);
        } else {
          this.$message({
            message: "无权限",
            type: "success",
          });
        }
      });
    },
    handleEditorChange(content, editor) {},

    submitClick() {
      this.VisibleLIsat = false;
      this.textlist = "";
      this.selectedItems = [];
      this.form.category = "";
      this.listrowe = "";
      this.selectedFile = null;
    },
    noneClick() {
      let textContent = this.listrowe.replace(/<\/?p>/g, "");
      let postData = {
        problemName: this.textlist,
        // problemType: this.selectedItems.join(","),
        problemType: this.selectedItemsString,
        problemModule: this.form.category,
        problemDetails: textContent,
      };
      const formData = new FormData();
      // formData.append("problemInfo", postData);
      formData.append("file", this.selectedFile);
      for (const key in postData) {
        formData.append(key, postData[key]);
      }

      raiseProblemr(formData).then((ok) => {
        if (ok.code == 200) {
          this.raiseProbl();
          this.channel();
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.textlist = "";
          this.selectedItems = [];
          this.form.category = "";
          this.listrowe = "";
          this.selectedFile = "";
          this.VisibleLIsat = false;
        }
      });
    },
    addItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index === -1) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems.splice(index, 1);
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item);
    },
    getCategoryName() {
      // this.form.category = "外业核查";
      this.problemClick(this.form.category);
    },
    taskClick() {
      this.xuanzrwe = true;
    },
    Clickwt() {
      this.VisibleLIsat = true;
      this.getCategoryName();
    },
    handleItemClick(item) {
      this.channel(item);
    },
    onEditorFocus(event) {},

    onEditorChange(event) {},

    onEditorBlur(event) {},
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    reply(index) {
      this.replyIndex = index;
    },
    cancelReply() {
      this.replyIndex = null;
      this.replyContent = "";
    },
    channel(problemName) {
      this.poDatarow = problemName;
      this.replyInfoList = [];
      let pamas = {
        problemName: problemName,
      };
      channelAnswerroblem(pamas).then((ok) => {
        this.replyInfoList.push(ok.data);
        // console.log(this.replyInfoList);
        this.comments = ok.data.replyInfoList;
        this.correlationProblemList = ok.data.correlationProblemList;
      });
    },
    showEditor() {
      this.isEditorVisible = true;
    },
    submitAnswer() {
      const cleanedContent = this.replyInfo.replyContent.replace(/<\/?p>/g, "");
      this.replyInfo.replyContent = cleanedContent;

      const formData = new FormData();
      formData.append("replyInfo", JSON.stringify(this.replyInfo));
      formData.append("file", this.selectedFile);
      replyProblem(formData).then((ok) => {
        if (ok.code === 200) {
          this.raiseProbl();
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.channel(this.replyInfo.problemName);
          this.replyInfo.replyContent = "";
          this.isEditorVisible = false;
          this.editorContent = "";
        }
      });
    },
    goToMain() {
      this.currentView = "main";
    },
    problemNameClick(problemName) {
      this.channel(problemName);
      this.replyInfo.problemName = problemName;
      this.currentView = "alternative";

      // const item = this.itemrows.find((i) => i.problemName === problemName);
      // if (item) {
      //   item.views++;
      // }
    },
    toggleView() {
      this.currentView = this.currentView === "main" ? "alternative" : "main";
    },
    raiseProbl() {
      probleList().then((ok) => {
        // console.log(ok);
        this.itemrows = ok.data.rows;
      });
    },
    ropiuyt() {
      this.raiseProbl();
    },
    toggleExpand() {
      this.zhankai1 = !this.zhankai1;
    },
    selectItem(index, item) {
      this.selectedIndex = index;
      // console.log(item);
      let params = {
        problemType: item,
      };
      problemByType(params).then((ok) => {
        // console.log(ok);
        this.itemrows = ok.data;
      });
    },
    problemClick(problemModule) {
      let pamas = {
        problemModule: problemModule,
      };
      channelAnswermodule(pamas).then((ok) => {
        this.zhankai1 = true;
        this.items = ok.data;
        this.historyItems = ok.data;
      });
    },
    problemModu() {
      problemModule().then((ok) => {
        // console.log(ok);
        this.channelAnswer = ok.data;
      });
    },
    dangerClick(policyUrl) {
      const url = policyUrl;
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    PolicyDocumen() {
      PolicyDocument().then((ok) => {
        if (ok.code == 200) {
          this.Datacard = ok.data.rows;
        }
      });
    },
    policyName(id) {
      let pamas = {
        id: id,
      };
      PolicyDocumenturl(pamas).then((ok) => {
        if (ok.code == 200) {
          this.Policy = [];
          this.dialogVisible = true;
          this.Policy.push(ok.data);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f9;
}
.problem {
  height: 200px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.history-list {
  .el-scrollbar-zl {
    height: 300px;
    display: flex;
    flex-direction: column;
  }
  .scroolter {
    height: 30px;
    background-color: #aed4ff;
    color: #74ade7;
    line-height: 30px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
  }
  .scroolter.is-selected {
    background-color: #0056b3;
    // background-color: #000;
  }
}

.form-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;

  box-sizing: border-box;

  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}
.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.form-group textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
.toolbar {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
}
.toolbar button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px;
  font-size: 16px;
  color: #333;
}
.toolbar button:hover {
  color: #007bff;
}
.submit-button {
  display: flex;
  justify-content: space-evenly;
}
.submit-button button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.submit-button button:hover {
  background-color: #0056b3;
}
.visible {
  ::v-deep .el-dialog__title {
    border-left: 3px solid blue;
  }
  ::v-deep .el-dialog__body {
    height: 406px !important;
  }
  .top-Name {
    height: 380px;
    .top-url {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
    }
  }
  .policyName-item {
    height: 30px;
    text-align: center;
    color: #000;
    font-weight: bold;
  }
  .createTime {
    height: 30px;
    text-align: center;
  }
  .fjian {
    margin-top: 20px;
    margin-left: 12px;
    width: 200px;
  }
  .fjian2 {
    margin-top: 150px;
    margin-left: 12px;
    width: 200px;
  }
  .policyUrl {
    margin-top: 10px;
    margin-left: 12px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.container {
  display: flex;
  justify-content: space-around;
  height: 100%;
  .left {
    margin-top: 10px;
    width: 48%;
    height: 97%;
    background-color: #fff;
    .left-top ::v-deep .el-tabs__nav {
      width: 100%;
      display: flex !important;
      justify-content: space-evenly !important;
      // background-color: #f5f5f5;
    }
    .left-top ::v-deep .el-tabs__item {
      font-size: 16px;
      padding: 10px 20px;
      font-weight: bold;
    }
    .left-top ::v-deep .el-tabs__item.is-active {
      color: #ffa500;
      height: 45px;
      background-color: #fff;
      border-bottom: 3px solid #ffa500;
      border-radius: 21px 21px 0 0;
    }
    .left-top ::v-deep .el-tabs__active-bar {
      width: 0px !important;
    }
    .box-card {
      width: 100%;
      height: 40px;

      background-color: #ffff;
      cursor: pointer;
      ::v-deep.el-card__body {
        padding: 0px !important;
      }
      .item-top {
        display: flex;
        justify-content: space-around;
        .item-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 77%;
          line-height: 40px;
        }
        .time {
          line-height: 40px;
        }
      }
      .item-top:hover .item-name,
      .item-top:hover .time {
        color: black;
      }
      .item-name,
      .time {
        color: gray;
      }
    }
  }
  .right {
    margin-top: 10px;
    width: 48%;
    height: 97%;
    background: rgb(235, 235, 235);
    overflow: hidden;
    overflow-y: auto;

    .alternative-content {
      width: 100%;
      height: 95%;
      .alternativeconter {
        display: flex;
        justify-content: space-between;
        height: 100%;
        flex-wrap: wrap;
        align-content: flex-start;
        .right-bottom {
          background-color: #fff;
          width: 21%;
          margin-top: 10px;
          h3 {
            border-bottom: 1px solid #ccc;
          }
          .list-item.hovered,
          .list-item:hover {
            cursor: pointer;
            color: #007bff;
          }
          .list-item {
            display: flex;

            margin-bottom: 10px;
          }

          .index-circle {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
          }

          .item-content {
            flex: 1;
          }
        }
        .quill-editor {
          width: 100%;
          ::v-deep .ql-toolbar.ql-snow {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            border: 0px !important;
            padding: 0px !important;
            display: none;
          }
          ::v-deep .ql-container.ql-snow {
            border-top: 1px solid #ccc !important;
            height: 200px;
          }
        }
        .comment-section {
          width: 100%;
          margin-top: 10px;
          font-family: Arial, sans-serif;
          background-color: #fff;
        }

        .comment {
          border-bottom: 1px solid #ccc;
          padding: 10px 0;
        }

        .comment-header {
          display: flex;
          align-items: center;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .comment-info {
          display: flex;
          flex-direction: column;
        }

        .comment-author {
          font-weight: bold;
        }

        .comment-date {
          font-size: 12px;
          color: #999;
        }

        .comment-body {
          margin-left: 50px;
        }
        .comment-body > img {
          width: 76%;

          object-fit: cover;
        }

        .comment-actions {
          margin-top: 5px;
          text-align: right;
        }

        .reply-box {
          margin-top: 10px;
        }

        .reply-actions {
          text-align: right;
          margin-top: 5px;
        }

        .button-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px;
          background-color: #fff;
          margin-top: 10px;
        }
        .button {
          background-color: #2196f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #1976d2;
        }
        .dialog-footer {
          margin-top: 10px;
          text-align: right;
        }
      }
      .left-alternativeconter {
        width: 100%;
        background-color: #fff;
        height: 50%;
        .conteroff {
          height: 50%;
          padding: 10px;
        }
        .title {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #ccc;
          padding: 10px;
          .zhong {
          }
          .top {
            padding: 5px;
            text-align: center;
            background-color: #20a0ff;
            color: #fff;
            height: 20px;
            width: 300px;
            line-height: 13px;
          }
          .xia {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            color: #ccc;
            width: 30%;
          }
        }
      }
      .right-alternativeconter {
        width: 21%;
        background-color: #1fcac2;
        height: 50%;
        .profile-card {
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          width: 100%;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .profile-card .icon,
        img {
          background-color: #8bc34a;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          // align-items: center;
          margin: 0 auto 10px auto;
          font-size: 24px;
          color: #fff;
        }
        .profile-card .name {
          font-size: 16px;
          font-weight: bold;
          margin: 10px 0;
        }
        .profile-card .subtitle {
          font-size: 12px;
          color: #ffa000;
          margin-bottom: 10px;
        }
        .profile-card .stats {
          display: flex;
          justify-content: space-around;
          margin: 10px 0;
        }
        .profile-card .stats div {
          font-size: 14px;
          color: #333;
        }
        .profile-card .stats div span {
          display: block;
          font-size: 12px;
          color: #aaa;
        }
        .profile-card .follow-button {
          background-color: #2196f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .item-row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      justify-content: space-between;
      .grid-purple {
        width: 60px;
        height: 50px;
        color: #20a0ff;
        background-color: #e8f3ff;
        text-align: center;
        line-height: 50px;
      }
    }
    .item-image {
      display: flex;
      align-items: center;
    }

    .item-image img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .item-info {
      display: flex;
      justify-content: space-between;
      width: 320px;
    }

    .publisher-name {
      margin-bottom: 5px;
      color: #333;
      font-size: 16px;
    }
    .publish-time {
      margin-bottom: 5px;
      color: #666;
      font-size: 14px;
    }
    .details2 {
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
    }
    .item-details {
      .details1 {
        height: 20px;
        line-height: 20px;
        color: #20a0ff;
        background-color: #e8f3ff;
        font-size: 14px;
      }
    }

    .top-ss {
      height: 5%;
      background-color: #ffff;
      padding: 4px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .input-with {
        width: 50%;
      }
      .item-po {
        width: 300px;
        .conyuyu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          font-family: Arial, sans-serif;
          width: 311px;
        }
        .question {
          font-size: 14px;
          color: #333;
        }
        .button {
          display: flex;
          align-items: center;
          padding: 5px 15px;
          background-color: #fff;
          border: 1px solid #cce7ff;
          border-radius: 5px;
          text-decoration: none;
          color: #3366cc;
          font-size: 14px;
          transition: background-color 0.3s, color 0.3s, border-color 0.3s;
          cursor: pointer;
        }

        .button:hover {
          background-color: #e6f3ff;
          color: #0056b3;
          border-color: #0056b3;
        }
      }
    }
    .conter {
      width: 100%;
      background-color: #fff;
      flex-grow: 0;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;

      .dage {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .zhankai1 {
          cursor: pointer;
        }
        .diedi {
          display: flex;
          // justify-content: space-between;
          align-items: center;
          width: 90%;
          .el-tagl {
            width: 8%;
            text-align: center;
          }
          .name-List {
            width: 82%;
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .value-bottom {
        width: 98%;
        display: grid;
        // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 15px;
        margin: 15px;
      }

      .grid-item {
        color: #20a0ff;
        background-color: #e8f3ff;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
        // width: 294px;
        height: 30px;
        line-height: 30px;
      }
      .selected {
        background-color: #20a0ff;
        color: #fff;
      }
    }
  }
}
</style>

