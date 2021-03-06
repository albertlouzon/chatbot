/// <reference types="react" />
import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    perspective?: string | number;
    xMaxRotate?: number;
    yMaxRotate?: number;
    defaultRotateX?: number;
    defaultRotateY?: number;
    leaveSpeed?: number;
    leaveTimingFunction?: string;
}
export interface TransformCardProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface TransformCardState {
    isEnter?: boolean;
}
export declare class TransformCard extends React.Component<TransformCardProps, TransformCardState> {
    static defaultProps: TransformCardProps;
    state: TransformCardState;
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    wrapperElm: HTMLDivElement;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default TransformCard;
