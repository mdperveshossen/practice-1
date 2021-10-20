import React,{useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import bg from '../../images/bg.jpg';
import { tryAuth } from "../../redux/actionCreators";
import { useIsFocused } from '@react-navigation/core';


const mapStateToProps = state => {
    return{
        isAuth: state.isAuth,
    }
}



const mapDispatchToProps = dispatch => {
    return{
        tryAuth: (email, password, mode) => dispatch(tryAuth(email, password, mode))
    }
}


const Login = props => {

    const [authState, setAuthState] = useState({
        mode: 'login',
        inpute: {
            email: "",
            password: "",
            confirmPassword: ""

        }
    })


    const isFocused = useIsFocused();

    useEffect(() => {
        setAuthState({
            ...authState,
            inpute: {
                email: "",
                password: "",
                confirmPassword: ""

            }
        })
    }, [isFocused]);


    const switchViews = () => {
        setAuthState({
            ...authState,
            mode: authState.mode === 'login'?'signup':'login',
            inpute: {
                email: "",
                password: "",
                confirmPassword: "",
            }
        })
    }



    const updateInputs = (value, name) => {
        setAuthState({
            ...authState,
            inpute: {
                ...authState.inpute,
                [name]: value
            }
        })
    }

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handelAuth = () => {
        const email = authState.inpute.email;
        const password = authState.inpute.password;
        const confirmPassword = authState.inpute.confirmPassword;


        if (email !== "" && password !== "") {
            if (re.test(email)) {
                if (authState.mode === 'login') {
                    props.tryAuth(email, password, 'login');
                } else {
                    if (password === confirmPassword) {
                        props.tryAuth(email, password, 'signup');
                    } else {
                        alert("Password fileds doesn't match");
                    }
                }
            } else {
                alert("Invalid Email");
            }
        } else{
            alert("Input all the fields");
        }
    }


    let confirmPassFiled = null;
    if (authState.mode === 'signup') {
        confirmPassFiled = (
            <TextInput 
                style={styles.input}
                placeholder="Confirm Password"
                value={authState.inpute.confirmPassword}
                onChangeText={value => updateInputs(value, 'confirmPassword')}
            />
        )
    }

    return(
        <ImageBackground 
        blurRadius={2}
        source={bg} 
        style={{ width: '100%', flex: 1 }} 
        >
        <View style={styles.loginView}>
            <TouchableOpacity 
            style={styles.btnContainer}
            onPress={
                () => switchViews()
            }
            >
                <Text style={styles.btnStyle} > {authState.mode==='login'?'Switch to Sign Up': 'Switch to Login'} </Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Your Email Address"
                value={authState.inpute.email}
                onChangeText={value => updateInputs(value, 'email')}
            />
            <TextInput 
                style={styles.input}
                placeholder="Password"
                value={authState.inpute.password}
                onChangeText={value => updateInputs(value, 'password')}
            />
            {confirmPassFiled}
            <TouchableOpacity 
            style={styles.btnContainer}
            onPress={() => {
                handelAuth();
            }}
            >
                <Text style={styles.btnStyle} > {authState.mode==='login'?'Login': 'Sign Up'} </Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}



const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '85%',
        padding: 5,
        marginTop: 10,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 4,
    },
    btnStyle:{
        fontSize: 16,
        color:"#fff",
        alignSelf: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        width: 150,
        paddingVertical: 5,
        backgroundColor: '#009688',
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'

    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);