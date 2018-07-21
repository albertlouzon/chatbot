import * as React from "react";
import * as PropTypes from "prop-types";

import ProgressRing from "react-uwp/ProgressRing";

export default class LoadAnimation extends React.Component {  //blue bck : #00EBFF
    constructor(props) {
        super(props);
        this.themeBkgrd = this.props.themeBkgrd
        
      }
    static contextTypes = { theme: PropTypes.object };
    context: { theme: ReactUWP.ThemeType };

    render() {
        return (
            <div>
                <ProgressRing size={70} dotsNumber={9} speed={6125} dotsStyle={{ background: this.themeBkgrd }} /> 
            </div>
        );
    }
}