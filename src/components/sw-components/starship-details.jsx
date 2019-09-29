import React from 'react';
import ItemDetails, {Record} from '../item-details/item-details';
import {withSwapiService} from '../hoc-helpers';

const StarshipDetails = (props) =>{
    return (/*так как совпадают из-за mapMethodsToProps, то все скрывают просто под пропсами
             itemId={itemId}
             getData={getData}
             getImageUrl={getImageUrl}*/
        <ItemDetails {...props}>
            <Record field='model' label='Model' />
            <Record field='length' label='Length' />
            <Record field='costInCredits' label='Cost' />
        </ItemDetails>
    )
};

    const mapMethodsToProps = (swapiService) =>{
        return {
            getData: swapiService.getStarship,
            getImageUrl: swapiService.getStarshipImage
        }
    }

    export default withSwapiService(mapMethodsToProps)(StarshipDetails);