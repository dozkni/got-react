import React, {Component} from "react";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class HousePage extends Component {

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
                getData={this.gotService.getAllHouses}
                renderItem={item => item.name} />
        );

        const houseDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getItem={this.gotService.getHouse}
                
                itemValues={["region", "words", "titles", "overlord", "ancestralWeapons"]} />
        );

        return (
            <RowBlock left={itemList} right={houseDetails} />
        )
    }
}