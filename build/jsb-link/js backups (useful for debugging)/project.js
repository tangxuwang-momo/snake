require = function i(c, h, a) {
function r(e, t) {
if (!h[e]) {
if (!c[e]) {
var s = "function" == typeof require && require;
if (!t && s) return s(e, !0);
if (f) return f(e, !0);
var o = new Error("Cannot find module '" + e + "'");
throw o.code = "MODULE_NOT_FOUND", o;
}
var n = h[e] = {
exports: {}
};
c[e][0].call(n.exports, function(t) {
return r(c[e][1][t] || t);
}, n, n.exports, i, c, h, a);
}
return h[e].exports;
}
for (var f = "function" == typeof require && require, t = 0; t < a.length; t++) r(a[t]);
return r;
}({
GameCtrl: [ function(t, e, s) {
"use strict";
cc._RF.push(e, "838e9UjNJxCXoQvbLq+kKBb", "GameCtrl");
cc.Class({
extends: cc.Component,
properties: {
g: cc.Graphics,
startLayer: cc.Node,
overLayer: cc.Node,
scoreLabel: cc.Label,
bestLabel: cc.Label
},
onLoad: function() {
this.initGame();
},
initGame: function() {
this.canControl = !1;
this.moveOffset = 1;
this.nextIndex = 0;
this.snake = [ 202, 201 ];
this.food = 115;
this.s = 0;
this.mSpeed = 5;
this.scoreLabel.string = this.s = 0;
var t = cc.sys.localStorage.getItem("best_score");
if (!t) {
t = 0;
cc.sys.localStorage.setItem("best_score", 0);
}
this.bestLabel.string = t;
this._startPos = cc.v2(0, 0);
this._endPos = cc.v2(0, 0);
},
onEnable: function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onDisable: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onKeyDown: function(t) {
if (this.canControl) {
cc.log("keyCode: " + t.keyCode);
this.moveOffset = this.snake[1] - this.snake[0] == (this.nextIndex = [ -1, 20, 1, -20 ][t.keyCode - 37] || this.moveOffset) ? this.moveOffset : this.nextIndex;
}
},
onTouchStart: function(t) {
this._startPos = t.getLocation();
},
onTouchMove: function(t) {
this._endPos = t.getLocation();
},
onTouchEnd: function(t) {
var e = cc.v2(this._endPos.x - this._startPos.x, this._endPos.y - this._startPos.y);
if (!(Math.abs(e.x) < 10 && Math.abs(e.y) < 6)) {
Math.abs(e.x) > Math.abs(e.y) ? e.x < 0 ? t.keyCode = 37 : t.keyCode = 39 : e.y < 0 ? t.keyCode = 40 : t.keyCode = 38;
this.onKeyDown(t);
}
},
onBtnDown: function(t, e) {
t.keyCode = ~~e;
this.onKeyDown(t);
},
move: function() {
this.nextIndex = this.snake[0] + this.moveOffset;
this.snake.unshift(this.nextIndex);
0 < this.snake.indexOf(this.nextIndex, 1) && this.gameOver();
-20 == this.moveOffset && this.nextIndex < 0 ? this.snake[0] = this.snake[0] + 400 : 20 == this.moveOffset && 399 < this.nextIndex ? this.snake[0] = this.snake[0] - 400 : 1 == this.moveOffset && (this.nextIndex % 20 == 0 || 399 < this.nextIndex) ? this.snake[0] = this.snake[0] - 20 : -1 == this.moveOffset && (this.nextIndex % 20 == 19 || this.nextIndex < 0) && (this.snake[0] = this.snake[0] + 20);
this.draw(this.snake[0], cc.Color.GREEN);
if (this.nextIndex == this.food) {
for (;0 <= this.snake.indexOf(this.food = ~~(400 * Math.random())); ) ;
this.draw(this.food, cc.Color.YELLOW);
this.addScore(1);
} else this.draw(this.snake.pop(), cc.Color.GRAY);
},
draw: function(t, e) {
this.g.fillColor = e;
this.g.fillRect(t % 20 * 18 + 2, 18 * ~~(t / 20) + 2, 16, 16);
},
start: function() {},
startGame: function() {
for (var e = this, t = 0; t < 400; t++) this.draw(t, cc.Color.GRAY);
this.snake.forEach(function(t) {
e.draw(t, cc.Color.GREEN);
});
this.draw(this.food, cc.Color.YELLOW);
this.schedule(this.move, 1 / this.mSpeed);
this.canControl = !0;
this.startLayer.active = !1;
this.overLayer.active = !1;
},
restart: function() {
this.initGame();
this.startGame();
},
gameOver: function() {
var e = this;
cc.log("gameover.");
this.unschedule(this.move);
this.canControl = !1;
this.snake.forEach(function(t) {
e.draw(t, cc.Color.RED);
});
this.scheduleOnce(function() {
e.overLayer.active = !0;
}, 1);
var t = cc.sys.localStorage.getItem("best_score");
cc.sys.localStorage.setItem("best_score", this.s > t ? this.s : t);
},
addScore: function(t) {
this.s += t;
this.scoreLabel.string = this.s;
if (10 < this.s) {
var e = this.mSpeed + Math.floor(this.s / 10);
if (e <= 15) {
cc.log("sp: " + e);
this.schedule(this.move, 1 / e);
}
}
}
});
cc._RF.pop();
}, {} ],
HelloWorld: [ function(t, e, s) {
"use strict";
cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
cc.Class({
extends: cc.Component,
properties: {
label: {
default: null,
type: cc.Label
},
text: "Hello, World!"
},
onLoad: function() {
this.label.string = this.text;
},
update: function(t) {}
});
cc._RF.pop();
}, {} ]
}, {}, [ "GameCtrl", "HelloWorld" ]);