var http = "157.245.86.35:8181/";
// var apisec = "秘钥";
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
	
	GetPosts: function(page,limit) {
		return API_URL + '/WebArticle/getAllArticle/' + page + '/' + limit;
	},
	GetSwiperPost:function() {
		return API_URL + '/WebSitting/getCarousel';
	},
	GetCat: function() {
		return API_URL + '/WebResourceClass/getResourceClasslist';
	},	
	GetPostsbyClassID: function(id) {
		return API_URL + '/WebResource/getResourceByClassId/' + id;
	},
	GetPostsbyID: function(id) {
		return API_URL + '/WebArticle/getArticleById/' + id;
	},
	GetAllSquare: function(otherName,page,limit) {
		return API_URL + '/Websquare/getAllSquare/' + otherName + '/' + page + '/' + limit;
	},
	GetSquareById: function(id) {
		return API_URL + '/Websquare/getSquareById/' + id;
	},
	GetPlanetIdComment: function(SortName) {
		return API_URL + '/WebSquareComment/getPlanetIdComment/' + SortName;
	},
	CreateSquare: function(id) {
		return API_URL + '/Websquare/create/' + id;
	},
	AddPlanetComment: function() {
		return API_URL + '/WebSquareComment/addPlanetComment';
	},
	LikeClickComments: function(id) {
		return API_URL + '/Websquare/likeClickComment/' + id;
	},
	LikeClickComment: function(id) {
		return API_URL + '/WebSquareComment/likeClickComment/' + id;
	},
	GetUserInfoByid: function(id) {
		return API_URL + '/User/GetUserInfoByid/' + id;
	},
	GetAllResource: function(page,limit) {
		return API_URL + '/WebResource/getAllResource/' + page + '/' + limit;
	},
	GetResourceById: function(id) {
		return API_URL + '/WebResource/getResourceById/' + id;
	},
	
	IsNull(obj) {
		return (obj != null && obj != undefined);
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
