import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import MainLayout from './MainLayout';
import Dashboard from '../containers/Dashboard';
import Form from '../containers/Form';
import TablePage from '../containers/TablePage';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';

@observer
class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		return (
			<Router>
				<Provider store={this.store}>
					<div className="wrapper">
						<DevTools />
                        <Switch>
                            <Route exact path="/login" component={Login}/>
							<Route exact path="/" render={() => (
								<Redirect to="/dashboard"/>
							)}/>
                            <MainLayout>
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard}/>
									<Route path="/form" component={Form}/>
									<Route path="/table" component={TablePage}/>
                                    <Route path="*" component={NotFound} />
                                </Switch>
                            </MainLayout>
                        </Switch>
					</div>
				</Provider>
			</Router>
		);
	}
}

App.propTypes = {
  store: PropTypes.object,
  logger: PropTypes.object
};

export default App;