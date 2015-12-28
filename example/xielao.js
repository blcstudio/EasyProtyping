// pages
var login = [
	'登陆'	// title
	, ['img/logintitle.png', 'img/loginbutton.png', 'img/loginskip.png']	// image list
	, [[40, 50], [65, 300], [190, 500]]	// image position list
	, [null, {cmd: 'goto', val: 'userProtocol'}, {cmd: 'goto', val: 'userGender'}]	// image command list
];
var userProtocol = [
	'用户协议'
	, ['img/userprotocoltitle.png', 'img/userprotocolbutton.png']
	, [[10, 50], [10, 500]]
	, [null, {cmd: 'goto', val: 'userGender'}]
];
var userGender = [
	'性别'
	, ['img/usergender.png']
	, [[60, 100]]
	, [{cmd: 'goto', val: 'userAge'}]
];
var userAge = [
	'年龄'
	, ['img/userage.png']
	, [[20, 100]]
	, [{cmd: 'goto', val: 'mainLabel'}]
];
var mainLabel = [
	'主页'
	, ['img/mainlabeltitle.png'
		, 'img/mainlabelbutton_label.png'
		, 'img/mainlabelbutton_push.png'
		, 'img/mainlabelbutton_favor.png']
	, [[0, 0], [0, 600], [120, 600], [240, 600]]
	, [{cmd: 'goto', val: 'mainEditLabel'}
		, null
		, {cmd: 'goto', val: 'mainPush'}
		, {cmd: 'goto', val: 'mainFavor'}]
];
var mainEditLabel = [];
var mainPush = [];
var mainDetail = [];
var mainFavor = [];
var mainCamera = [];
// index
var index = ['login'];
// mProtyping
var mProtyping = [];
mProtyping['index'] = index;
mProtyping['login'] = login;
mProtyping['userProtocol'] = userProtocol;
mProtyping['userGender'] = userGender;
mProtyping['userAge'] = userAge;
mProtyping['mainLabel'] = mainLabel;
mProtyping['mainEditLabel'] = mainEditLabel;
mProtyping['mainPush'] = mainPush;
mProtyping['mainDetail'] = mainDetail;
mProtyping['mainFavor'] = mainFavor;
mProtyping['mainCamera'] = mainCamera;
// draw
$(document).ready(
	function () {
		ProtypingOn(mProtyping, 'ground');
	}
);
