import * as React from "react";
import * as ReactDOM from "react-dom";
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import MyComponent from "./components/testo";
import AcrylicSample from "./components/acrylic";
import ControlBar from "./components/controls_bar";
import Menu from "./components/menu";
import Camera from "./components/camera_view";
import StatisticBoard from "./components/statistics_board";
import StatusBar from "./components/status_bar";




export default class App extends React.Component {
  render() {

    return (
      <UWPThemeProvider className='tepu'
        theme={getTheme({
          themeName: "dark", 
          accent: "#D59AFD", 
          useFluentDesign: true, 


        })}
      >
          <div className='fixedComponents' style={{display:'flex', flexFlow:'column wrap', justifyContent:'space-betweens'}}>
                  <StatusBar style={{positon:'fixed'}}/>
                  <StatisticBoard/>
          </div>

            
        <div className="bigBox" style={{
          display: 'flex',
          flexFlow: 'column nowrap',


        }}>
          <div className='nodes' style={{
            display: 'inline-flex', justifyContent: 'space-between', flexFlow: 'row nowrap'
          }} >    
                            <Menu />
                            <Camera viewType='Normal' themeBkgrd='#D59AFD'/>
                            <Camera viewType='Termal' themeBkgrd='#00EBFF'/>
                            <ControlBar />
                            
                            
          </div>
     
         
          
        </div>




      </UWPThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);