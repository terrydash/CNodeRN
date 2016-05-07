'use stirct'

import React,{Component,View,TouchableOpacity,Text,TextInput} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"

import {containerByComponent} from "../lib/redux-helper"

import {replyReducer} from "./reducer"
import {saveReply} from "./action"

import styles from "./stylesheet/topic"

class Reply extends Component{
    constructor(props){
        super(props)
        this.state = {
            content:""
        }
    }
    renderNavigationBar(){
        const title = (
            <View style={styles.navigationBarTitle}>
                <Text style={styles.navigationBarTitleText}>回复</Text>
            </View>
        )
        const handleSave = ()=>{
            const reply = {
                accesstoken:"",
                content:this.state.content,
                reply_id:""
            }
            this.props.saveReply(this.props.id,reply)
        }
        const rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={handleSave}>
                <Icon name="save" size={20} color="#999"/>
            </TouchableOpacity>
        )
        const leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>Actions.pop()}>
            <Icon name="angle-left" size={25} color="#666"/>
            <Text style={styles.navigationBarButtonText}>取消</Text>
            </TouchableOpacity>
        )
        return <NavigationBar title={title} leftButton={leftButton} rightButton={rightButton} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            <View style={styles.replyWrap}>
            <TextInput placeholder="回复内容不超过50字" onChangeText={(content)=>this.setState({content})} 
            multiline={true} maxLength={50} 
            style={styles.replyInput}/>
            </View>
            </View>
        )
    }
}

export default containerByComponent(Reply,replyReducer,{saveReply})