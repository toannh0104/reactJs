import React, {Component, PropTypes} from 'react';
import routeConfig from '../common/routeConfig';
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        return (
            <div className="app">

                <div className="page-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
