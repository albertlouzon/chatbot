import * as React from "react";
import * as PropTypes from "prop-types";

import NavigationView from "react-uwp/NavigationView";
import SplitViewCommand from "react-uwp/SplitViewCommand";

export default class Menu extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const baseStyle: React.CSSProperties = {
      margin: 10
    };
    const navigationTopNodes = [
      <SplitViewCommand icon={"\uE716"} />,
      <SplitViewCommand label="Print" icon="PrintLegacy" />
    ];

    const navigationBottomNode = [
      <SplitViewCommand label="Drone battery volume" icon={"\uEBB1"} />,
      <SplitViewCommand label="Mobile battery volume" icon={"\uEBA3"} />,
      <SplitViewCommand label="Settings" icon={"\uE713"} />,
      <SplitViewCommand label="CalendarDay" icon={"\uE161"} />
    ];

    const { theme } = this.context;

    return (
      <div>
        <div>
          <NavigationView
            isControlled={false}
            style={{ width: 200, height: '100vh', ...baseStyle }}
            pageTitle="Indoor-Robotics"
            displayMode="compact"
            autoResize={false}
            initWidth={120}
            expandedWidth={480}
            defaultExpanded={false}
            navigationTopNodes={navigationTopNodes}
            navigationBottomNodes={navigationBottomNode}
            focusNavigationNodeIndex={2}
          >
          </NavigationView>
        </div>
      </div>
    );
  }
}