import React, {Component} from "react";
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import RowBlock from "../../rowBlock";

export default class CharPage extends Component {

    gotService = new GotService();

    state = {
        selectedItem: 1,
        error: false
    }

    onItemSelected = id => {
        this.setState({selectedItem: id});
    }

    componentDidCatch() {
        this.setState({error: true})
    }
    
    render() {

        if (this.state.error) return <ErrorMessage/>;

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={item => item.name} />
        );

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getItem={this.gotService.getCharacter} >
                    <Field field="gender" label="Gender" />
                    <Field field="born" label="Born" />
                    <Field field="died" label="Died" />
                    <Field field="culture" label="Culture" />
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}