import React, { useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { AppContext } from '../../common/context';
import './input-list.scss';
import { findCategory } from '../../common/utils';
import { createGraph } from '../../helpers/draw-graph';

function InputList() {
    const { dataArray, categories, setContext } = useContext(AppContext);

    const handleSelect = (algoId, algoData) => {
        const { catName } = findCategory(categories, algoId);
        const data = JSON.parse(algoData);
        switch (catName) {
            case 'Graph':
                createGraph(data);
                setContext({
                    isDirGraph: data.directed,
                    playStatus: 0,
                });
                break;
            default:
        }
    };
    console.log(dataArray)

    return (
        <List className="inputList">
            {dataArray.map(({ algoId, algoData, createdOn }) => (
                <ListItem
                    button
                    key={createdOn}
                    className="listItem"
                    onClick={() => handleSelect(algoId, algoData)}
                >
                    <ListItemText
                        primary={new Date(createdOn + ' UTC').toLocaleString()}
                        className="listItemText"
                    />
                    <ListItemIcon>
                        <DeleteOutline className="listItemIcon" />
                    </ListItemIcon>
                </ListItem>
            ))}
        </List>
    );
}

export default InputList;
