import React, {Component} from "react";
import ItemDetails, {Field} from "../itemDetails";
import GotService from "../../services/gotService";

export default class BookItem extends Component {
    
    gotService = new GotService();

    render() {
        return (
            <ItemDetails 
                itemId={this.props.bookId}
                getItem={this.gotService.getBook} >
                <Field field="numberOfPages" label="Number of pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
                <Field field="culture" label="Culture" />
            </ItemDetails>
        )
    }
}