import React from 'react';
import NavigationBar from '../components/navigationBar/navigationBar'
import Dashboardpage from '../components/dashboard/Dashboardpage'

import './Homepage.scss'

class Homepage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                <div className="HomePage__leftSide">
                    <NavigationBar logo="" location="VietNam"></NavigationBar>
                </div>
                <div className="HomePage__rightSide">
                    <div className="HomePage__rightSide__featureBar">
                        
                    </div>
                    <Dashboardpage></Dashboardpage>
                </div>
                
            </div>
        )
    }
}

export default Homepage;