import React from 'react';
import {Tracker} from 'meteor/tracker';

import {Links} from '../api/links';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.linksTracker = Tracker.autorun(() => {
      const links = Links.find({}).fetch();
      this.setState({links});
    });    
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.linksTracker.stop();
  }
  renderLinksListItems () {
    if (this.state.links.length === 0) {
      return <p>Add your first link!</p>;
    } else {
      return this.state.links.map((link) => {
        return <p key={link._id}>{link.url}</p>;
      });
    }    
  }
  render() {
    return (
      <div>
        <p>Links list</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }  
};