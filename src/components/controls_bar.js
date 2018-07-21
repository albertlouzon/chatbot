import * as React from "react";
import * as PropTypes from "prop-types";

import FloatNav from "react-uwp/FloatNav";
import IconButton from "react-uwp/IconButton";
import DropDownMenu from "react-uwp/DropDownMenu";


export default class ControlBar extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;
    const staticButtonStyle: React.CSSProperties = {
      background: theme.accent,
      color: "#fff",
    };

    return (
      <div> 

        <FloatNav
          style={{ 
          float:'right',
          padding: '40vh 0',
          background:'transparent'
                 
                 }}
          isFloatRight={true}
          focusItemIndex={1}
       
          expandedItems={[{
            iconNode: (
              <IconButton  hoverStyle={{}} activeStyle={{}}>
                ErrorBadge
              </IconButton>
            ),
            title: "STOP"
          }
          , {
            iconNode: (
              <IconButton hoverStyle={{}} activeStyle={{}}>
                MobAirplane
              </IconButton>
            ),
            title: "Takeoff / Land"
          }, {
            iconNode: (
              <IconButton hoverStyle={{}} activeStyle={{}}>
                HeartFillLegacy
              </IconButton>
            ),
            title: "Favorite Mission"
          },
          {
            iconNode: (
              <IconButton  hoverStyle={{}} activeStyle={{}} style={{height:'100px'}}>
                HomeSolid

              </IconButton>
        
            
            ),
            title: 'Back to the base',

      
          }]}
          bottomNode={[
            <IconButton
              style={staticButtonStyle}
              hoverStyle={staticButtonStyle}
              activeStyle={staticButtonStyle}
              onTouchMove={    <DropDownMenu
                values={["Mission1", "B", "C"]}
                itemHeight={32}
                itemWidth={320}
              />}
            >
              ScrollChevronUpLegacy
            </IconButton>
          ]}
        />
    
      </div>
    );
  }
}