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
var Icon_1 = require("../Icon");
var PseudoClasses_1 = require("../PseudoClasses");
var SplitViewCommand = (function (_super) {
    __extends(SplitViewCommand, _super);
    function SplitViewCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplitViewCommand.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, label = _a.label, icon = _a.icon, visited = _a.visited, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, isTenFt = _a.isTenFt, iconStyle = _a.iconStyle, showLabel = _a.showLabel, attributes = __rest(_a, ["style", "className", "label", "icon", "visited", "onMouseEnter", "onMouseLeave", "isTenFt", "iconStyle", "showLabel"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var rootStyleClasses = theme.prepareStyle({
            className: "split-view-command",
            style: inlineStyles.root,
            extendsClassName: className
        });
        var iconStyleClasses = theme.prepareStyle({
            className: "split-view-command-icon",
            style: inlineStyles.icon,
            extendsClassName: className
        });
        var labelStyleClasses = theme.prepareStyle({
            className: "split-view-command-label",
            style: inlineStyles.label,
            extendsClassName: className
        });
        var visitedBorderStyleClasses = theme.prepareStyle({
            className: "split-view-command-border",
            style: inlineStyles.visitedBorder,
            extendsClassName: className
        });
        return (React.createElement(PseudoClasses_1.default, __assign({}, rootStyleClasses),
            React.createElement("div", __assign({}, attributes),
                (visited && !isTenFt) ? React.createElement("div", __assign({}, visitedBorderStyleClasses)) : null,
                React.createElement(Icon_1.default, __assign({}, iconStyleClasses), icon),
                label && (React.createElement("div", __assign({}, labelStyleClasses), label)))));
    };
    SplitViewCommand.defaultProps = {
        isTenFt: false,
        showLabel: true
    };
    SplitViewCommand.contextTypes = { theme: PropTypes.object };
    return SplitViewCommand;
}(React.Component));
exports.SplitViewCommand = SplitViewCommand;
function getStyles(splitViewCommand) {
    var context = splitViewCommand.context, _a = splitViewCommand.props, style = _a.style, iconStyle = _a.iconStyle, visited = _a.visited, isTenFt = _a.isTenFt, showLabel = _a.showLabel;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ fontSize: 14, color: theme.baseMediumHigh, background: isTenFt ? (visited ? theme.listAccentLow : "none") : "none", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", position: "relative", transition: "all .25s 0s ease-in-out", "&:hover": {
                background: isTenFt ? theme.accent : theme.baseLow
            } }, style)),
        visitedBorder: {
            width: 0,
            borderLeft: "4px solid " + theme.accent,
            height: "50%",
            left: 0,
            top: "25%",
            position: "absolute"
        },
        icon: prefixStyle(__assign({ cursor: "default", flex: "0 0 auto", width: 48, height: 48, lineHeight: "48px", color: isTenFt ? void 0 : (visited ? theme.accent : theme.baseHigh), fontSize: 16 }, iconStyle)),
        label: {
            color: isTenFt ? void 0 : (visited ? theme.accent : theme.baseHigh),
            cursor: "default",
            opacity: showLabel ? 1 : 0,
            transition: "opacity .25s"
        }
    };
}
exports.default = SplitViewCommand;
//# sourceMappingURL=index.js.map