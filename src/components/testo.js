import * as React from "react";
import * as PropTypes from "prop-types";

import AutoSuggestBox from "react-uwp/AutoSuggestBox";

export default class SimpleExample extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;
    return (
      <div>
        <AutoSuggestBox background={theme.acrylicTexture60.background} />
      </div>
    );
  }
}