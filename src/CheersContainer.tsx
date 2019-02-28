import React, { useState, useEffect } from 'react';
import { WatchableStore } from "watchable-stores";
import { ICheersStore } from './CheersStore'
import { number } from 'prop-types';

//CREATING A CHEERS CONTAINER POSITION
export enum CheersContainerPosition {
    BOTTOM_CENTER = "bottom_center",
    BOTTOM_LEFT = "bottom_left",
    BOTTOM_RIGHT = "bottom_right",
    TOP_CENTER = "top_center",
    TOP_LEFT = "top_left",
    TOP_RIGHT = "top_right",
}

export interface ICheersContainerProps {
    position: CheersContainerPosition;
    store: WatchableStore<ICheersStore>;
    lightBackground?: boolean;
    className?: string | string[];
}

export interface IcheersContainerState {
    styles: any;
    cheers: any[];
}
let storeSubscriptionId= new Number();

function CheersContainer() {

    let [initialized, setInitialized] = useState(false);
    let [styles, setStyle] = useState({});
    //force cheers to behave like an array if you run it directly,
    //it returns never[] 
    let initArr = new Array()
    const [cheers, setCheers] = useState(initArr);

    let props: ICheersContainerProps;

    storeSubscriptionId = -1;


    useEffect(() => {
        if (!initialized) {
            storeSubscriptionId = props.store.watch((data) => {
                const cheer = ({ ...data, id: Math.random() });
                setCheers([cheer].concat(cheers) );
                setTimeout(() => {
                    setCheers(cheers.filter((t) => t.id !== cheer.id) );
                }, data.timer || 3000);
              });
        setInitialized(true);
        }
    });


}
