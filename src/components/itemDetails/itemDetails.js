import React, { Component } from "react";
import GotService from '../../services/gotService';
import "./itemDetails.css";

const Field = ({item, field, label}) => {
    return (
        <li key={field} className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {

        const {itemId, getItem} = this.props;
        if (!itemId) {
            return;
        }

        getItem(itemId)
            .then(item => {
                this.setState({item})
            })
    }

    render() {

        if (!this.state.item) {
            return <span className="select-error">Please select a item</span>
        }

        const {item} = this.state;
        const {name} = item;
        //const {itemValues} = this.props;
        // const values = itemValues.map(element => {
        //     const {item} = this.state;
        //     return (
        //         <li key={element} className="list-group-item d-flex justify-content-between">
        //             <span className="term">{element}</span>
        //             <span>{item[element]}</span>
        //         </li>
        //     )
        // });

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        )
    }
}