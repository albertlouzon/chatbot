import * as React from "react";
import * as PropTypes from "prop-types";

import AutoSuggestBox from "react-uwp/AutoSuggestBox";
import LoadAnimation from "../ui_items/load_animation"
import FlyoutBtn from "../ui_items/flyout_button"

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.viewType = this.props.viewType
    this.themeBkgrd = this.props.themeBkgrd
    
  }
  

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;
    const itemStyle: React.CSSProperties = {
      color: theme.baseHigh,
      fontSize: 14,
      fontWeight: "lighter",
      textAlign: "center",
      width: '50vh',
         marginTop:'25vh',
      height: '30vh',
      outline: "none",
      border: `1px solid ${theme.listAccentLow}`
    };
    return (
    <div style={{display:'flex',alignItems:'center' , flexFlow:'column nowrap'}}>
        <div style={theme.prefixStyle({
            padding: "10vh",
            background: theme.desktopBackground,
            ...itemStyle, background: theme.acrylicTexture80.background
            })}>
            <LoadAnimation themeBkgrd={this.props.themeBkgrd}/>
            {this.viewType} camera is loading...
        
        
            </div>
            <FlyoutBtn viewType={this.props.viewType}/>
    </div>
    );
  }
}