/// <reference types="react" />
import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    label?: string;
    icon?: string;
    visited?: boolean;
    iconStyle?: React.CSSProperties;
    isTenFt?: boolean;
    showLabel?: boolean;
}
export interface SplitViewCommandProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class SplitViewCommand extends React.Component<SplitViewCommandProps> {
    static defaultProps: SplitViewCommandProps;
    displayName: "SplitViewCommand";
    static contextTypes: {
        theme: PropTypes.Requireable<any>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default SplitViewCommand;
