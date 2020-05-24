import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

import flowerOne from "../Badges/Flower 1.png";
import flowerTwo from "../Badges/Flower 2.png";
import flowerThree from "../Badges/Flower 3.png";

import birdOne from "../Badges/Bird 1.png"
import birdTwo from "../Badges/Bird 2.png"
import birdThree from "../Badges/Bird 3.png"

import mammalOne from "../Badges/Mammal 1.png";
import mammalTwo from "../Badges/Mammal 2.png";
import mammalThree from "../Badges/Mammal 3.png";

import treeOne from "../Badges/Tree 1.png";
import treeTwo from "../Badges/Tree 2.png";
import treeThree from "../Badges/Tree 3.png";

import AmphOne from "../Badges/Amphtile 1.png";
import AmphTwo from "../Badges/Amphtile 2.png";
import AmphThree from "../Badges/Amphtile 3.png";

import InsectOne from "../Badges/Insect 1.png";
import InsectTwo from "../Badges/Insect 2.png";
import InsectThree from "../Badges/Insect 3.png";

export default class CheckboxList extends Component{
    
    constructor(props)
    {
        super(props); //needed for every constructor
        this.handleToggle = this.handleToggle.bind(this);
        this.createEntry = this.createEntry.bind(this);
        this.updateQuest = this.updateQuest.bind(this);
        this.pullData = this.pullData.bind(this);
        this.state = { //all data stored in state
            itemList: ['Find a white flower', 'Find a flower as tall as you', 'Find a flower with more than 5 petals and 2 leaves',
            'Find a bird on the water', 'Find a bird perched in a tree', 'Find two birds together',
            'Find an evergreen tree', 'Find a young sapling', 'Find a tree with no leaves',
            'Find a two-legged mammal outdoors', 'Find a wild mammal feeding', 'Find a mammal near as small as your hand',
            'Find a snake in the sun', 'Find a warty toad', 'Find a turtle crossing the road',
            'Find a butterfly resting', 'Find a carpenter ant', 'Find an insect scuttling across the ground',
            ], //delete if pulled from database
            urls: [flowerOne, flowerTwo, flowerThree, 
                birdOne, birdTwo, birdThree, 
                mammalOne, mammalTwo, mammalThree, 
                treeOne, treeTwo, treeThree, 
                AmphOne, AmphTwo, AmphThree, 
                InsectOne, InsectTwo, InsectThree],
            urls2: ["../Badges/Flower 1.png", "../Badges/Flower 2.png", "../Badges/Flower 3.png", 
                "../Badges/Bird 1.png", "../Badges/Bird 2.png", "../Badges/Bird 3.png", 
                "../Badges/Mammal 1.png", "../Badges/Mammal 2.png", "../Badges/Mammal 3.png", 
                "../Badges/tree 1.png", "../Badges/tree 2.png", "../Badges/tree 3.png",
                "../Badges/Amphtile 1.png", "../Badges/Amphtile 2.png", "../Badges/Amphtile 3.png", 
                "../Badges/Insect 1.png", "../Badges/Insect 2.png", "../Badges/Insect 3.png"],
            tasks: [],
            completedTasks: [],
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
                var i;
                for(i = 0; i < this.state.itemList.length; i++)
                {
                    this.createEntry(this.state.itemList[i], this.state.urls[i]);
                }
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

            const tempArray = this.state.tasks.filter(quest => quest.isDone === true);

            this.setState({        
                completedTasks: tempArray,
            }, ()=> {console.log(this.state.completedTasks)})
        }) 
    }

    createEntry(newDescription, newImage)
    {
        const quest = 
        {
            description : newDescription,
            isDone : false,
            pictureURL: newImage,
        }

        axios.post('http://localhost:5000/quests/add/', quest)
        .then(res => console.log(res.data));
    }

    handleToggle = (value, id, url) => () => {
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
        this.updateQuest(id, value, url, newVal);

        console.log("value passed is " + newVal);
        console.log("Enabled val is " + this.state.checked[currentIndex]);
    }

    updateQuest(id, desc, url, newVal)
    {
        const newQuest = 
        {
            description: desc,
            isDone: newVal,
            pictureURL: url   
        }
        axios.post('http://localhost:5000/quests/update/' + id, newQuest)
        .then(res =>  this.pullData());

    }

    render(){
        return (
        <div>
            <List>
            {this.state.tasks.map(value => {
                const labelId = `checkbox-list-label-${value.description}`;

                return (
                <ListItem key={value.description} role={undefined} dense button onClick={this.handleToggle(value.description, value._id, value.pictureURL)}>
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
            <div>
                <GridList cellHeight={160} cols={3}>
                {this.state.completedTasks.map(value => {
                    const labelId = `checkbox-list-label-${value.description}`;

                    return (
                    <GridListTile key={value.pictureURL}>
                        <img src={value.pictureURL} alt = {value.description}/>
                    </GridListTile>
                    );
                })}
                </GridList>
            </div>
        </div>
    );
}
}