import * as React from "react";
import * as PropTypes from "prop-types";

import Button from "react-uwp/Button";
import { FadeInOut, SlideInOut, ScaleInOut, CustomAnimate } from "react-uwp/Animate";

import ProgressBar from "react-uwp/ProgressBar";

export default class StatusBar extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };
 

  render() {
    const baseStyle: React.CSSProperties = {
      margin: "10px 0",
      display: "block",
      width:"100%"
    };
    const { theme } = this.context;
    return (
      <div style={{  position:'fixed',marginLeft:'23%',}}>
        <CustomAnimate
          leaveStyle={{
            transform: "rotateY(180deg) rotateX(80deg)",
            transformStyle: "preserve-3d",
            opacity: 0,
          }}
          enterStyle={{
            transform: "rotateY(0)",
            opacity: 1,
          }}
          speed={1000}
        >
          <span style={{ background: theme.acrylicTexture40.background,
                          padding:'3vh 50vh',
                          color:'yellowgreen',
                          fontSize:'22px',
                            display:'inline-flex',

          }}>
            Your drone is operational
          </span>
          
          <ProgressBar style={baseStyle} />
        </CustomAnimate>

      </div>
    );
  }
}



