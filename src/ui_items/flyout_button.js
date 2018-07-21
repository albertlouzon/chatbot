import * as React from "react";
import * as PropTypes from "prop-types";

import Flyout from "react-uwp/Flyout";
import Button from "react-uwp/Button";
import FlyoutContent from "react-uwp/FlyoutContent";

export default class FlyoutBtn extends React.Component {
  constructor(props) {
    super(props);
    this.viewType = this.props.viewType
    
  }
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const defaultBtnStyle: React.CSSProperties = {
        margin: 4,
        background: '#D59AFD',
        border: '2px solid #00EBFF',
        borderRadius:'5px'
      };
    return (
      <div style={{ margin: "10px 0" }}>
        <Flyout>
          <Button style={{ fontSize: 32, ...defaultBtnStyle }}>{this.viewType} View</Button>
          <FlyoutContent
            show={false}
            verticalPosition="bottom"
            enterDelay={400}
            style={{display:'flex',justifyContent:'center',width:'18vh'}}
          >
           <Button style={{ ...defaultBtnStyle }}>Hide {this.viewType} view</Button>
          </FlyoutContent>

        </Flyout>
      </div>
    );
  }
}