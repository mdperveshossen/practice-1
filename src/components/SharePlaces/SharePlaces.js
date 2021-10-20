import React, { useState } from "react";
import {  Button, View } from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../redux/actionCreators";
import InputPlace from "../InputPlace/InputPlace";
import PicImage from '../PicImage/PicImage';


const mapStateToProps = state => {
    return {
        placeList: state.placeList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPlace: place => dispatch(addPlace(place)),
    }
}


const SharePlaces = props => {
    const [inputValue, setInputValue] = useState("");
    const [image, setImage] = useState("");
    return (
        <View>
            <PicImage image={image} setImage={setImage} />
            <InputPlace
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
            <View style={{ alignItems: 'center' }}>
            <Button
                title="Add"
                onPress={() => {
                    if(inputValue === "" || image == "")
                    {
                        if(image === ""){
                            alert("Please pic an image");
                        }
                    } else {
                        props.addPlace({
                            key: Math.random().toString(),
                            value:inputValue,
                            image: image
                        })
                        setInputValue("");
                        setImage("");
                        props.navigation.navigate('Find Places');
                    }
                }}
            />
            </View>
        </View>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(SharePlaces);
