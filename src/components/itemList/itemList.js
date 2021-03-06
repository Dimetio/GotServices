import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../error';
import PropTypes from 'prop-types';

import './itemList.css';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    static defaultProps = {
        onItemSelected:() => {}
    }
    
    static propTypes = {
        onItemSelected: PropTypes.func
    }

    componentDidMount() {
        const {getData} = this.props;
        
        getData()
            .then( (itemList) => {
                this.setState({
                    itemList,
                    error: false
                });
            })
            .catch(() => this.onError())
    }

    onError(status) {
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList, error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }       

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}