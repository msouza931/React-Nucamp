import React from 'react';
import { useSelector } from 'react-redux';
//import { CAMPSITES } from '../../app/shared/CAMPSITES';
import {Col, Row} from "reactstrap";
import CampsiteCard from "./CampsiteCard";
import { selectAllCampsites } from './campsitesSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';



const CampsitesList = () => {
    const campsites = useSelector(selectAllCampsites);
    //const randomCampsite = selectRandomCampsite();
    //export const selectCampsiteById = (id) => {
    //return CAMPSITES.find((campsite) => campsite.id === id);
        console.log('campsites:', campsites);

        const isLoading = useSelector((state) => state.campsites.isLoading);
        const errMsg = useSelector((state) => state.campsites.errMsg);

        if (isLoading) {
            return (
                <Row>
                    <Loading />
                </Row>
            );
        }
    
        if (errMsg) {
            return (
                <Row>
                    <Error errMsg={errMsg} />
                </Row>
            );
        }
    


    return ( 
    <Row className='ms-auto'>
        {campsites.map((campsite) => {
            return (
                <Col 
                    md='5' 
                    className='m-4' 
                    key={campsite.id}
                    >
                    <CampsiteCard campsite={campsite} />
                </Col>
            );
            })}           
    </Row>
    );
};
export default CampsitesList;