"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var TransformCard = (function (_super) {
    __extends(TransformCard, _super);
    function TransformCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.handleMouseMove = function (e) {
            var _a = _this.props, xMaxRotate = _a.xMaxRotate, yMaxRotate = _a.yMaxRotate, defaultRotateX = _a.defaultRotateX, defaultRotateY = _a.defaultRotateY, leaveSpeed = _a.leaveSpeed, leaveTimingFunction = _a.leaveTimingFunction;
            var currentTarget = e.currentTarget, clientX = e.clientX, clientY = e.clientY;
            var _b = currentTarget.getBoundingClientRect(), width = _b.width, height = _b.height, left = _b.left, top = _b.top;
            var xOffset = (left + width - clientX) / width;
            var yOffset = (top + height - clientY) / height;
            var transition = "all " + leaveSpeed + "ms " + (leaveTimingFunction ? " " + leaveTimingFunction : "");
            Object.assign(_this.wrapperElm.style, {
                transition: "all 0ms",
                transform: "rotateX(" + (defaultRotateX + (yOffset - 0.5) * xMaxRotate) + "deg) rotateY(" + (defaultRotateY + (0.5 - xOffset) * yMaxRotate) + "deg)"
            });
        };
        _this.handleMouseLeave = function (e) {
            var _a = _this.props, defaultRotateX = _a.defaultRotateX, defaultRotateY = _a.defaultRotateY, leaveSpeed = _a.leaveSpeed, leaveTimingFunction = _a.leaveTimingFunction;
            var transition = "all " + leaveSpeed + "ms " + (leaveTimingFunction ? " " + leaveTimingFunction : "");
            Object.assign(_this.wrapperElm.style, {
                transition: transition,
                transform: "rotateX(" + defaultRotateX + "deg) rotateY(" + defaultRotateY + "deg)"
            });
        };
        return _this;
    }
    TransformCard.prototype.render = function () {
        var _this = this;
        var _a = this.props, perspective = _a.perspective, xMaxRotate = _a.xMaxRotate, yMaxRotate = _a.yMaxRotate, defaultRotateX = _a.defaultRotateX, defaultRotateY = _a.defaultRotateY, leaveSpeed = _a.leaveSpeed, leaveTimingFunction = _a.leaveTimingFunction, children = _a.children, attributes = __rest(_a, ["perspective", "xMaxRotate", "yMaxRotate", "defaultRotateX", "defaultRotateY", "leaveSpeed", "leaveTimingFunction", "children"]);
        var theme = this.context.theme;
        var styles = getStyles(this);
        return (React.createElement("div", __assign({}, attributes, { style: styles.root, onMouseLeave: this.handleMouseLeave, onMouseMove: this.handleMouseMove }),
            React.createElement("div", { onMouseLeave: this.handleMouseLeave, onMouseMove: this.handleMouseMove, style: styles.wrapper, ref: function (wrapperElm) { return _this.wrapperElm = wrapperElm; } }, children)));
    };
    TransformCard.defaultProps = {
        perspective: 200,
        xMaxRotate: 15,
        yMaxRotate: 15,
        defaultRotateX: 0,
        defaultRotateY: 0,
        leaveSpeed: 750,
        leaveTimingFunction: ""
    };
    TransformCard.contextTypes = { theme: PropTypes.object };
    return TransformCard;
}(React.Component));
exports.TransformCard = TransformCard;
function getStyles(TransformCard) {
    var theme = TransformCard.context.theme, _a = TransformCard.props, perspective = _a.perspective, style = _a.style, defaultRotateX = _a.defaultRotateX, defaultRotateY = _a.defaultRotateY, leaveSpeed = _a.leaveSpeed, leaveTimingFunction = _a.leaveTimingFunction;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ display: "inline-block", perspective: perspective }, style)),
        wrapper: theme.prefixStyle({
            display: "inline-block",
            transition: "all " + leaveSpeed + "ms " + (leaveTimingFunction ? " " + leaveTimingFunction : ""),
            transform: "rotateX(" + defaultRotateX + "deg) rotateY(" + defaultRotateY + "deg)"
        })
    };
}
exports.default = TransformCard;
//# sourceMappingURL=index.js.map