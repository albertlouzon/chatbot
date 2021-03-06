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
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showTooltip: false
        };
        _this.timer = null;
        _this.unShowTimer = null;
        _this.showTooltip = function (e) {
            clearTimeout(_this.unShowTimer);
            var show = function () {
                _this.setState({
                    showTooltip: true
                });
            };
            if (_this.props.autoClose) {
                show();
                _this.timer = setTimeout(function () {
                    _this.setState({
                        showTooltip: false
                    });
                }, _this.props.autoCloseTimeout);
            }
            else {
                show();
            }
        };
        _this.unShowTooltip = function (e) {
            _this.timer = setTimeout(function () {
                _this.setState({
                    showTooltip: false
                });
            }, _this.props.closeDelay);
        };
        _this.getStyle = function (showTooltip, positionStyle) {
            if (showTooltip === void 0) { showTooltip = false; }
            if (positionStyle === void 0) { positionStyle = {}; }
            var _a = _this, theme = _a.context.theme, _b = _a.props, style = _b.style, background = _b.background;
            return theme.prefixStyle(__assign({ height: 28, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "4px 8px", transition: "all .25s 0s ease-in-out", border: "1px solid " + (theme.useFluentDesign ? theme.listLow : theme.baseLow), color: theme.baseMediumHigh, background: background || theme.chromeMedium, opacity: showTooltip ? 1 : 0, transform: "translateY(" + (showTooltip ? "0px" : "10px") + ")", position: "absolute", fontSize: 14, pointerEvents: showTooltip ? "all" : "none", zIndex: theme.zIndex.tooltip }, style, positionStyle));
        };
        _this.getTooltipStyle = function () {
            var _a = _this, rootElm = _a.rootElm, tooltipElm = _a.tooltipElm;
            if (!(rootElm && tooltipElm))
                return _this.getStyle();
            var theme = _this.context.theme;
            var _b = _this.props, verticalPosition = _b.verticalPosition, horizontalPosition = _b.horizontalPosition, margin = _b.margin;
            var _c = rootElm.getBoundingClientRect(), width = _c.width, height = _c.height;
            var containerWidth = tooltipElm.getBoundingClientRect().width;
            var containerHeight = tooltipElm.getBoundingClientRect().height;
            var showTooltip = _this.state.showTooltip;
            var positionStyle = {};
            var isVerticalCenter = verticalPosition === "center";
            if (width !== void (0) && height !== void (0)) {
                switch (horizontalPosition) {
                    case "left": {
                        positionStyle.right = isVerticalCenter ? (width + margin) : 0;
                        break;
                    }
                    case "center": {
                        positionStyle.left = (width - containerWidth) / 2;
                        break;
                    }
                    case "right": {
                        positionStyle.left = isVerticalCenter ? (-width - margin) : 0;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                switch (verticalPosition) {
                    case "top": {
                        positionStyle.top = -containerHeight - margin;
                        break;
                    }
                    case "center": {
                        positionStyle.top = (height - containerHeight) / 2;
                        break;
                    }
                    case "bottom": {
                        positionStyle.top = height + margin;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            return _this.getStyle(showTooltip, positionStyle);
        };
        return _this;
    }
    Tooltip.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        var _a = this.props, verticalPosition = _a.verticalPosition, autoCloseTimeout = _a.autoCloseTimeout, autoClose = _a.autoClose, margin = _a.margin, horizontalPosition = _a.horizontalPosition, children = _a.children, content = _a.content, contentNode = _a.contentNode, closeDelay = _a.closeDelay, background = _a.background, className = _a.className, attributes = __rest(_a, ["verticalPosition", "autoCloseTimeout", "autoClose", "margin", "horizontalPosition", "children", "content", "contentNode", "closeDelay", "background", "className"]);
        var theme = this.context.theme;
        var tooltipStyle = this.getTooltipStyle();
        return (React.createElement("div", { style: { position: "relative", display: "inline-block" }, ref: function (rootElm) { return _this.rootElm = rootElm; }, onMouseEnter: this.showTooltip, onClick: this.showTooltip, onMouseLeave: this.unShowTooltip },
            React.createElement("span", __assign({ ref: function (tooltipElm) { return _this.tooltipElm = tooltipElm; } }, attributes, theme.prepareStyle({
                className: "tooltip",
                style: tooltipStyle,
                extendsClassName: className
            })), content || contentNode),
            children));
    };
    Tooltip.defaultProps = {
        verticalPosition: "top",
        horizontalPosition: "center",
        margin: 4,
        autoClose: false,
        autoCloseTimeout: 750,
        closeDelay: 0
    };
    Tooltip.contextTypes = { theme: PropTypes.object };
    return Tooltip;
}(React.Component));
exports.Tooltip = Tooltip;
exports.default = Tooltip;
//# sourceMappingURL=index.js.map