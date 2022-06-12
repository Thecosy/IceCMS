// var domain = "119.45.164.21:7953/";

var http = "localhost:8181/";
var apisec = "秘钥";
var API_URL = 'http://' + http ;


module.exports = {
	GetArctivelist: function(page,limit) {
		return API_URL + '/WebArticle/getAllArticle/' + page + '/' +limit;
	},
	Login: function() {
		return API_URL + '/User/login' ;
	},
	GetDomain: function() {
		return 'https://' + http + '/';
	},
	// GetPosts: function(size) {
	// 	return API_URL + '/WebResource/getNewResource/' + size;
	// },
	GetPosts: function(page,limit) {
		return API_URL + '/WebResource/getAllResource/' + page + '/' + limit;
	},
	GetHot: function() {
		return this.appendAPISEC(API_URL + 'posts?pageSize=10&idx=0');
	},
	GetComment: function() {
		return this.appendAPISEC(API_URL + 'posts?idx=1&pageSize=10');
	},
	GetTag:function() {
		return this.appendAPISEC(API_URL + 'gettag?');
	},
	GetFriend:function() {
		return this.appendAPISEC(API_URL + 'getfriend?');
	},
	GetRankedPosts: function(idx) {
		return this.appendAPISEC(API_URL + 'posts?&pageSize=30' + '&idx=' + idx);
	},
	GetPostsList: function(page) {
		return this.appendAPISEC(API_URL + 'posts?&pageSize=10' + '&page=' + page);
	},
	GetAboutCid: function() {
		return this.appendAPISEC(API_URL + 'getaboutcid?');
	},
	GetSwiperPost:function() {
		return API_URL + '/WebSitting/getCarousel';
	},

	GetCat: function() {
		return API_URL + '/WebResourceClass/getResourceClasslist';
	},	
	GetRecommend:function() {
		return this.appendAPISEC(API_URL + 'getrecommend?');
	},
	GetAccessCode: function(url) {
		return this.appendAPISEC(API_URL + 'getaccesscode?path=' + url);
	},
	GetPostsbyClassID: function(id) {
		return API_URL + '/WebResource/getResourceByClassId/' + id;
	},
	GetPagebyCID: function(cid) {
		return this.appendAPISEC(API_URL + 'posts?cid=' + cid + '&getpage=1');
	},
	GetPostsbyID: function(id) {
		return API_URL + '/WebResource/getResourceById/' + id;
	},
	GetPostsbyMIDLimit: function(mid, limit, except) {
		return this.appendAPISEC(API_URL + 'getpostbymid?mid=' + mid + '&pageSize=' + limit + '&except=' + except);
	},

	GetPostsCommentbyCID: function(cid) {
		return this.appendAPISEC(API_URL + 'getcomment?cid=' + cid);
	},
	GetPostsReplybyCID: function(cid, parent) {
		return this.appendAPISEC(API_URL + 'getcomment?cid=' + cid + '&parent=' + parent);
	},
	Postcomment: function(cid, author, text, icon) {
		return this.appendAPISEC(API_URL + 'addcomment?cid=' + cid + '&author=' + author + '&text=' + text +'&icon=' + icon);
	},


	Search: function(key) {
		return this.appendAPISEC(API_URL + 'search?keyword=' + key);
	},

	IsNull(obj) {
		return (obj != null && obj != undefined);
	},

	appendAPISEC: function(url) {
		var request = url + "&apisec=" + apisec;
		return (request);
	},
	randomHexColor() { //随机生成十六进制颜色
		var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
		while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
			hex = '0' + hex;
		}
		return '#' + hex; //返回‘#'开头16进制颜色
	},
	//获取距今天数
	getcreatedtime(created) {
		var now = Date.parse(new Date()) / 1000;
		console.log(now)
		var span = (now - created) > 0 ? (now - created) : 0;
		if (span <= 3600) {
			var ts = Math.round(span / 60);
			return (ts + '分钟前');
		} else if (span < 86400) {
			var ts = Math.round(span / 3600);
			return (ts + '小时前');
		} else {
			var ts = Math.round(span / 86400);
			return (ts + '天前');
		}
	},
	//获取日期
	formatDate(datetime) {
		var datetime = new Date(parseInt(datetime * 1000));
		// 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
		var year = datetime.getFullYear(),
			month = ("0" + (datetime.getMonth() + 1)).slice(-2),
			date = ("0" + datetime.getDate()).slice(-2),
			hour = ("0" + datetime.getHours()).slice(-2),
			minute = ("0" + datetime.getMinutes()).slice(-2);
		//second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		var result = year + "-" + month + "-" + date + " " + hour + ":" + minute;
		// 返回
		return result;
	},
}
