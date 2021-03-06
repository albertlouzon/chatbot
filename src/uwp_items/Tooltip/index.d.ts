/// <reference types="react" />
import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    content?: string;
    contentNode?: React.ReactNode;
    verticalPosition?: "top" | "bottom" | "center";
    horizontalPosition?: "left" | "right" | "center";
    margin?: number;
    autoClose?: boolean;
    autoCloseTimeout?: number;
    closeDelay?: number;
    background?: string;
}
export interface TooltipProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export interface TooltipState {
    showTooltip?: boolean;
}
export declare class Tooltip extends React.Component<TooltipProps, TooltipState> {
    static defaultProps: TooltipProps;
    state: TooltipState;
    rootElm: HTMLDivElement;
    tooltipElm: HTMLSpanElement;
    timer: any;
    unShowTimer: any;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillUnmount(): void;
    showTooltip: (e: React.MouseEvent<HTMLDivElement>) => void;
    unShowTooltip: (e: React.MouseEvent<HTMLDivElement>) => void;
    getStyle: (showTooltip?: boolean, positionStyle?: {}) => React.CSSProperties;
    getTooltipStyle: () => React.CSSProperties;
    render(): JSX.Element;
}
export default Tooltip;
