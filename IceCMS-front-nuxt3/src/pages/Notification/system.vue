<template>
  <div class="home">
    <div v-for="item in announcementsList" :key="item.id" class="box b2-radius author-header">
      <div data-v-657577a0="" data-v-53c53cba="" class="basic-list-item">

        <div style="    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;"> <img class="img-avatar"
            src="https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg">
          <div>{{ item.author }}</div>
        </div>
        <div data-v-657577a0="" class="center-box">

          <div data-v-657577a0="" class="line-1"><span data-v-657577a0="" class="name-field"><a data-v-657577a0=""
                target="_blank">{{ item.title }}</a></span><span data-v-657577a0="" class="desc-field">
            </span></div>
          <div data-v-657577a0="" class="line-2">
            <div data-v-53c53cba="" data-v-657577a0="" class="real-reply">
              <div data-v-b8d820e0="" data-v-53c53cba="" class="content-list" data-v-657577a0=""><span
                  data-v-e5050176="" data-v-b8d820e0="" class="text string"><!----><span
                    data-v-e5050176="">{{ item.content }}</span></span><!----></div>
            </div><!---->
          </div>
          <div data-v-657577a0="" class="line-3"><span data-v-657577a0="" class="time-filed"><span data-v-0bc25b4d=""
                data-v-657577a0="" class="time time-span">{{ item.caeated }}</span></span>
            <div data-v-657577a0="" class="action-field">
              <button data-v-53c53cba="" data-v-657577a0="" class="action-button del-button"><svg data-v-53c53cba=""
                  viewBox="0 0 16 16" class="action-icon css-x5loxn" data-v-657577a0="">
                  <g fill-rule="nonzero">
                    <rect id="Rectangle" opacity="0" x="0" y="0" width="16" height="16"></rect>
                    <path
                      d="M12.5146059,5.54590692 L12.5146059,12.5459069 C12.5146059,13.6504764 11.6191754,14.5459069 10.5146059,14.5459069 L5.51460589,14.5459069 C4.41003639,14.5459069 3.51460589,13.6504764 3.51460589,12.5459069 L3.51460589,5.54590692 L3.51460589,5.54590692"
                      stroke-linecap="round" stroke-linejoin="round"></path>
                    <line x1="6" y1="1.85714286" x2="9.5" y2="1.85714286" id="Line" stroke-linecap="round"
                      stroke-linejoin="round"></line>
                    <line x1="1.88309006" y1="3.6900534" x2="14.0338156" y2="3.6900534" stroke-linecap="round"
                      stroke-linejoin="round"></line>
                    <line x1="5.71428571" y1="7.63739248" x2="5.71428571" y2="11.230495" stroke-linecap="round"
                      stroke-linejoin="round"></line>
                    <line x1="8.01783774" y1="7.62825381" x2="8.01783774" y2="11.2213564" stroke-linecap="round"
                      stroke-linejoin="round"></line>
                    <line x1="10.3396003" y1="7.63344062" x2="10.3396003" y2="11.2265432" stroke-linecap="round"
                      stroke-linejoin="round"></line>
                  </g>
                </svg>
                删除该通知
              </button>
            </div>
          </div>
        </div>
        <div data-v-657577a0="" class="right-box"><!---->
          <!-- <div data-v-53c53cba="" data-v-657577a0="" title="发一份谢谢" class="text-box">发一份谢谢</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAnnouncementslist } from "../../../api/webannouncements";

export default {
  data() {
    return {
      announcementsList: ""
    }
  },
  created() {
    this.getAnnouncements()
  },
  methods: {
    getAnnouncements() {
      getAnnouncementslist().then(
        (response) => {
          console.log(response)
          this.announcementsList = response.data;
        }
      );
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 22px;
  width: 100%;
  /* background-color: #ffffff;
  border-radius: 13px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto; */
  background-color: #ffffff;
  border-radius: 13px;
}

.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  margin: 30px 30px 30px 30px;
}

.left-box {
  margin-right: 15px;
}

.left-box .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  overflow: hidden;
  position: relative;
}

.center-box {
  flex: 1;
  order: 1;
  /* 使内容在中间 */
  flex-basis: 70%;
  /* 设置为父元素宽度的 70% */
  max-width: 70%;
  /* 确保不超过 70% */
}

.line-1 {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.line-1 .desc-field {
  font-weight: 400;
  color: #666;
  margin-left: 5px;
}

.line-2 {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.real-reply .content-list {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}

.line-3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
}

.action-field {
  display: flex;
  gap: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 14px;
  color: #555;
  cursor: pointer;
}

.action-button:hover {
  color: #0073e6;
}

.action-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  margin-right: 4px;
}

.del-button {
  color: #e60000;
}

.text-box {
  color: #0073e6;
  font-size: 14px;
  cursor: pointer;
}

.text-box:hover {
  text-decoration: underline;
}

.img-avatar {
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 8px 8px 8px 8px;
}

.basic-list-item {
  display: flex;
  align-items: flex-start;
  /* 顶部对齐 */
  justify-content: space-between;
  width: 100%;
}

.right-box {
  margin-left: auto;
  /* 将内容推到最右边 */
  order: 2;
  /* 将“发一份谢谢”放到最右边 */
  flex-grow: 1;
  /* 让它占据剩余的 30% */
  text-align: right;
}
</style>
