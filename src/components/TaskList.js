import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        this.updateQuest = this.updateQuest.bind(this);
        this.pullData = this.pullData.bind(this);
        this.state = { //all data stored in state
            itemList: ['Flower task', 'Bird task', 'Tree task', 'Mammal task', 'Other task', 'Otter task'], //delete if pulled from database
            tasks: [],
            checked: [], //array to store button values
        }
    }

    componentDidMount(){
        this.pullData();
    }

    pullData()
    {
        axios.get('http://localhost:5000/quests/') 
        .then(response=>{      
            if(response.data.length === 0) //Make new elements if list is empty
            {
                console.log('makin stuff');
                this.state.itemList.forEach(element => {
                    this.createEntry(element);
                });
                this.setState({        
                    itemList: response.data.map(quest => quest.description),
                    checked: response.data.map(quest => quest.isDone),
                    tasks: response.data,
                    selectedTask: null
                })
            }
            else
            {
                console.log('stuff exists');
                this.setState({        
                    itemList: response.data.map(quest => quest.description),
                    checked: response.data.map(quest => quest.isDone),
                    tasks: response.data,
                    selectedTask: null
                }, ()=> {console.log(this.state.checked)})
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

        axios.post('http://localhost:5000/quests/add/', quest)
        .then(res => console.log(res.data));
    }

    handleToggle = (value, id) => () => {
        const currentIndex = this.state.itemList.indexOf(value);
        const newChecked = [...this.state.checked];
        var newVal;
        /*if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }*/
        if(this.state.checked[currentIndex]===false)
        {
            newVal = true;
        }
        else
        {
            newVal=false;
        }
        newChecked.splice(currentIndex, 1, newVal);

        this.setState({
            checked: (newChecked)
        }
        );
        //Save back to database
        this.updateQuest(id, value, newVal);

        console.log("value passed is " + newVal);
        console.log("Enabled val is " + this.state.checked[currentIndex]);
    }

    updateQuest(id, desc, newVal)
    {
        const newQuest = 
        {
            description: desc,
            isDone: newVal   
        }
        axios.post('http://localhost:5000/quests/update/' + id, newQuest)
        .then(res =>  this.pullData());

    }

    render(){

        return (
            <List>
            {this.state.tasks.map(value => {
                const labelId = `checkbox-list-label-${value.description}`;

                return (
                <ListItem key={value.description} role={undefined} dense button onClick={this.handleToggle(value.description, value._id)}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked= {value.isDone}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}                      
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value.description}`} />
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