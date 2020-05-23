import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default class CheckboxList extends Component{
    
    constructor(props)
    {
        super(props); //needed for every constructor
        this.handleToggle = this.handleToggle.bind(this);
        this.state = { //all data stored in state
            itemList: ['Flower task', 'Bird task', 'Tree task', 'Mammal task', 'Other task', 'Otter task'], //delete if pulled from database
            checked: [], //array to store button values
        }
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