import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


export default class CheckboxList extends Component{
    
    constructor(props)
    {
        super(props); //needed for every constructor
        this.handleToggle = this.handleToggle.bind(this);
        this.createEntry = this.createEntry.bind(this);
        this.state = { //all data stored in state
            itemList: ['Flower task', 'Bird task', 'Tree task', 'Mammal task', 'Other task', 'Otter task'], //delete if pulled from database
            boolList: [],
            checked: [], //array to store button values
        }
    }

    componentDidMount(){
        console.log('mounted');
        axios.get('http://localhost:5000/quests/') 
        .then(response=>{      
            console.log('promise');
            if(response.data.length === 0)
            {
                console.log('makin stuff');
                this.state.itemList.array.forEach(element => {
                    this.createEntry(element);
                });
            }
            else
            {
                console.log('stuff exists');
                this.setState({        
                    itemList: response.data.map(quest => quest.description),
                    boolList: response.data.map(quest => quest.isDone)
                })
            }
        })
    }

    createEntry(newDescription)
    {
        const quest = 
        {
            description : newDescription,
            isDone : false
        }

        axios.post('http://localhost:5000/quest/add', quest)
        .then(res => console.log(res.data));
  
    }

    handleToggle = (value) => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
            checked: (newChecked)}
        );
    }

    render(){

        return (
            <List>
            {this.state.itemList.map((value) => {
                const labelId = `checkbox-list-label-${value}`; //remove the last bit after testing

                return (
                <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={this.state.checked[value]}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
            </List>
    );
}
}