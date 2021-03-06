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
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../common/AddBlurEvent");
var SplitViewPane_1 = require("./SplitViewPane");
exports.SplitViewPane = SplitViewPane_1.default;
var emptyFunc = function () { };
var SplitView = (function (_super) {
    __extends(SplitView, _super);
    function SplitView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: _this.props.defaultExpanded
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            var clickExcludeElms = _this.props.clickExcludeElms;
            _this.addBlurEvent.setConfig({
                addListener: _this.state.expanded,
                clickExcludeElm: clickExcludeElms ? clickExcludeElms.concat([_this.rootElm]) : _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        expanded: false
                    }, _this.props.onClosePane);
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        return _this;
    }
    SplitView.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultExpanded = nextProps.defaultExpanded;
        if (defaultExpanded !== void 0 && defaultExpanded !== this.state.expanded) {
            this.setState({
                expanded: defaultExpanded
            });
        }
    };
    SplitView.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    SplitView.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    SplitView.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    SplitView.prototype.render = function () {
        var _this = this;
        var _a = this.props, displayMode = _a.displayMode, expandedWidth = _a.expandedWidth, defaultExpanded = _a.defaultExpanded, panePosition = _a.panePosition, children = _a.children, paneStyle = _a.paneStyle, onClosePane = _a.onClosePane, className = _a.className, clickExcludeElms = _a.clickExcludeElms, attributes = __rest(_a, ["displayMode", "expandedWidth", "defaultExpanded", "panePosition", "children", "paneStyle", "onClosePane", "className", "clickExcludeElms"]);
        var theme = this.context.theme;
        var splitViewPanes = [];
        var childView = [];
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "split-view",
            styles: inlineStyles
        });
        if (children) {
            React.Children.forEach(children, function (child, index) {
                if (child.type === SplitViewPane_1.default) {
                    splitViewPanes.push(React.cloneElement(child, {
                        style: __assign({}, styles.pane.style, child.props.style),
                        className: styles.pane.className,
                        key: index.toString()
                    }));
                }
                else {
                    childView.push(child);
                }
            });
        }
        return (React.createElement("div", __assign({}, attributes, { style: styles.root.style, ref: function (rootElm) { return _this.rootElm = rootElm; }, className: theme.classNames(styles.root.className, className) }),
            childView.length > 0 && childView,
            splitViewPanes.length > 0 && splitViewPanes));
    };
    SplitView.defaultProps = {
        expandedWidth: 320,
        displayMode: "compact",
        panePosition: "right",
        onClosePane: emptyFunc
    };
    SplitView.contextTypes = { theme: PropTypes.object };
    return SplitView;
}(React.Component));
exports.SplitView = SplitView;
function getStyles(splitView) {
    var context = splitView.context, _a = splitView.props, style = _a.style, expandedWidth = _a.expandedWidth, displayMode = _a.displayMode, panePosition = _a.panePosition, paneStyle = _a.paneStyle, expanded = splitView.state.expanded;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    var isCompact = displayMode === "compact";
    var isOverlay = displayMode === "overlay";
    var panePositionIsRight = panePosition === "right";
    var transition = "all .25s ease-in-out";
    return {
        root: prefixStyle(__assign({ color: theme.baseHigh, background: theme.useFluentDesign ? theme.acrylicTexture60.background : theme.chromeLow, display: "inline-block", position: "relative", margin: 0, padding: 0, transition: transition }, (isCompact ? {
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "auto",
            height: "auto"
        } : void 0), (isOverlay ? {
            width: "100%"
        } : void 0), style, { overflow: "hidden" })),
        pane: prefixStyle(__assign({ background: theme.useFluentDesign ? theme.acrylicTexture40.background : theme.altHigh, transition: transition, boxShadow: theme.useFluentDesign ? "rgba(0, 0, 0, 0.34) 0px 4px 24px" : void 0 }, (isCompact ? {
            height: "100%",
            width: expandedWidth,
            transform: "translate3d(" + (expanded ? 0 : expandedWidth) + "px, 0, 0)"
        } : void 0), (isOverlay ? {
            position: "absolute",
            top: 0,
            right: panePositionIsRight ? 0 : void 0,
            left: panePositionIsRight ? void 0 : 0,
            height: "100%",
            width: expandedWidth,
            transform: "translate3d(" + (expanded ? 0 : expandedWidth) + "px, 0, 0)"
        } : void 0), paneStyle))
    };
}
exports.default = SplitView;
//# sourceMappingURL=index.js.map