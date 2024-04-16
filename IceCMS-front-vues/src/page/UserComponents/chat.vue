<template>
    <div class="home">
        <div class="chat-container">
            <div class="friend-list">
                <el-card>
                    <el-input placeholder="搜索好友" v-model="searchText" clearable></el-input>
                    <el-menu :default-active="activeFriend" class="friend-menu" router>
                        <el-menu-item v-for="friend in filteredFriends" :key="friend.id" 
                            @click="selectFriend(friend)">
                            <el-avatar :src="friend.avatar" size="medium" class="friend-avatar"></el-avatar>
                            <span>{{ friend.name }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-card>
            </div>
            <div class="chat-window">
                <el-card class="chat-header" v-if="activeFriend">
                    <el-avatar :src="activeFriend.avatar" size="large" class="friend-avatar"></el-avatar>
                    <span class="friend-name">{{ activeFriend.name }}</span>
                </el-card>
                <el-card class="chat-body">
                    <div class="message" v-for="message in messages" :key="message.id">
                        <div class="message-content" :class="{ 'message-right': message.from === 2 }">
                            <div class="message-text">{{ message.text }}</div>
                            <div class="message-time">{{ message.time }}</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="chat-input" style="">
                    <div style="display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;">
                        <el-input placeholder="输入消息" v-model="messageInput" clearable></el-input>
                        <el-button type="primary" @click="sendMessage">发送</el-button>
                    </div>

                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
// import { getAllResourcebyAuthor } from '@/api/webresource'
import { getMessageList, getChatMessages, sendChatMessage } from '@/api/webchatmessages'
import { getUserInfobyid } from '@/api/webuser'

export default {
    data() {
        return {
            touserid: '',
            currentUser: {
                // id: 1,
                // name: 'Alice',
                // avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
            },
            friends: [
                // {
                //     id: 2,
                //     name: 'Bob',
                //     avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
                // },
                // {
                //     id: 3,
                //     name: 'Charlie',
                //     avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
                // },
                // {
                //     id: 4,
                //     name: 'David',
                //     avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
                // }
            ],
            activeFriend: null,
            searchText: '',
            messageInput: '',
            messages: [
                // {
                //   id: 1,
                //   text: 'Hello, Alice!',
                //   from: 2,
                //   time: '2022-01-01 10:00:00'
                // },
                // {
                //   id: 2,
                //   text: 'Hi, Bob!',
                //   from: 1,
                //   time: '2022-01-01 10:01:00'
                // }
            ]
        }
    },
    created() {

        const user = JSON.parse(window.localStorage.getItem('access-admin'))
        getMessageList(user.data.userid).then(response => {
            this.friends = response.data
            if(this.$route.params.id != user.data.userid){
            // 检测this.friends中是否有this.$route.params.id这个id写个代码
            // 如果没有就添加
            // 如果有就不添加   
            console.log(this.friends.length)
            for (let i = 0; i < this.friends.length; i++) {
                console.log("添加用户", this.friends[i])
                if (this.friends[i].id != this.$route.params.id) {
                    let is_exist = true
                    console.log("已经存在")
                    getUserInfobyid(this.$route.params.id).then(response => {
                        console.log(response.data)
                        this.friends.push({
                            id: this.$route.params.id,
                            name: response.data.name,
                            avatar: response.data.profile
                        })
                        let friends =  
                {
                    id: this.$route.params.id,
                    name: response.data.name,
                    avatar: response.data.profile
                }
                        this.selectFriend(friends)
                    })
                    // this.friends.push({
                    //     id: this.$route.params.id,
                    //     name: "123",
                    //     avatar: "https://img0.baidu.com/it/u=2705683877,4119372584&fm=253&fmt=auto&app=138&f=JPEG?https://static.konlonair.com/public/uploads/_/originals/g9sqh9gp.jpeg"
                    // })
                    return
                }else{
                    let is_exist = false
                    
                }
      
            }
            
        }
            console.log(this.friends)
        })
        
    },
    computed: {
        filteredFriends() {
            return this.friends.filter(friend => {
                return friend.name.toLowerCase().includes(this.searchText.toLowerCase())
            })
        }
    },
    methods: {
        selectFriend(friend) {
            this.touserid = friend.id
            console.log(this.touserid, "this.touserid")
            const user = JSON.parse(window.localStorage.getItem('access-admin'))
            getChatMessages(friend.id, user.data.userid).then(response => {
                
                this.messages = response.data
                console.log(this.messages)
            })
            this.activeFriend = friend
        },
        sendMessage() {
            console.log(this.touserid)
            if (!this.messageInput) {
                return
            }
            const message = {
                id: this.messages.length + 1,
                text: this.messageInput,
                from: 2,
                time: new Date().toLocaleString()
            }
            const user = JSON.parse(window.localStorage.getItem('access-admin'))
            sendChatMessage(user.data.userid, this.touserid, this.messageInput).then(response => {
                console.log(response)
            })

            this.messages.push(message)
            this.messageInput = ''
        }
    }
}
</script>
<style scoped>
.chat-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    width: 100%;
}

.friend-list {
    width: 300px;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
}

.friend-menu {
    padding: 0;
}

.friend-avatar {
    margin-right: 10px;
}

.chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.chat-header {
    display: flex;
    align-items: center;
    padding: 10px;
}

.friend-avatar {
    margin-right: 10px;
}

.friend-name {
    font-size: 20px;
}

.chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.message {
    display: flex;
    margin-bottom: 10px;
}

.message-content {
    padding: 5px 10px;
    max-width: 70%;
    border-radius: 5px;
    background-color: #F0F0F0;
    word-wrap: break-word;
}

.message-right {
    align-self: flex-end;
    background-color: #62c074;
}

.message-text {
    font-size: 16px;
}

.message-time {
    font-size: 12px;
    color: #777;
}

.chat-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.el-input {
    width: 80%;
    margin-right: 10px;
}

.el-button {
    width: 35%;
}
</style>

 <style scoped>
 .site-content {
     display: flex;
     padding: 20px;
     margin-left: 43px;
     margin-right: 43px;
 }

 .usertopName {
     display: flex;
 }

 .home {
     background-color: #ffffff;
     border-radius: 13px;
 }

 .homeContent {
     margin-top: 40px;
 }
</style>
 
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
    position: relative;
    width: 100%;
    margin-top: -26px;

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
        position: absolute;
        right: -50px;
        top: 1px;
    }
}

.article-textarea ::v-deep {
    textarea {
        width: 100%;
        padding-right: 30px;
        resize: none;
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #bfcbd9;
    }
}

.app-top {
    padding-top: 0px !important;
}
</style>
 