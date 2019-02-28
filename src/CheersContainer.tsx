import React = require("react");
import { useState, useEffect } from 'react';
import { WatchableStore } from "watchable-stores";
import { ICheersStore } from './CheersStore';
import { DarkColors, LightColors } from "./DefaultColors";
import ReactDOM = require("react-dom");

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

export default function CheersContainer() {

    
    // let storeSubscriptionId= new Number();
    let [initialized, setInitialized] = useState(false);
    const [styles, setStyle] = useState({});
    
    //it returns never[] 
    let initArr = new Array()
    const [cheers, setCheers] = useState(initArr);
    
    let _renderContainer = () => {
        const style = props.lightBackground ? LightColors : DarkColors;
        return (
          <div style={styles}
               className={"cheers-container " + (props.className || "")}>
            {
              cheers.map((cheer) => {
                return (
                  <div key={cheer.id}
                       className={"cheer cheer-" + cheer.status + " " + cheer.classNames}
                       style={style[cheer.status]}>
                    {cheer.message}
                  </div>
                );
              })
            }
          </div>
        );
      }

    //force cheers to behave like an array if you run it directly,
    let props: ICheersContainerProps;

    let storeSubscriptionId = -1;

    // THE USE EFFECT REPLACES COMPONENT LIFECYCLE
    useEffect(() => {
        window.addEventListener('mousemove', () => {

            storeSubscriptionId = props.store.watch((data) => {
                const cheer = ({ ...data, id: Math.random() });
                setCheers([cheer].concat(cheers));
                setTimeout(() => {
                    setCheers(cheers.filter((t) => t.id !== cheer.id));
                }, data.timer || 3000);
            });

            const styles: any = {};
            switch (props.position) {
                case CheersContainerPosition.TOP_LEFT:
                    styles.top = 10;
                    styles.left = 10;
                    break;
                case CheersContainerPosition.TOP_RIGHT:
                    styles.top = 10;
                    styles.right = 10;
                    break;
                case CheersContainerPosition.TOP_CENTER:
                    styles.top = 10;
                    styles.left = "50%";
                    styles.transform = "translateX(-50%)";
                    break;
                case CheersContainerPosition.BOTTOM_LEFT:
                    styles.bottom = 10;
                    styles.left = 10;
                    break;
                case CheersContainerPosition.BOTTOM_RIGHT:
                    styles.bottom = 10;
                    styles.right = 10;
                    break;
                case CheersContainerPosition.BOTTOM_CENTER:
                    styles.bottom = 10;
                    styles.left = "50%";
                    styles.transform = "translateX(-50%)";
                    break;
                default:
                    styles.bottom = 10;
                    styles.right = 10;
                    break;
            }
            setStyle(styles);
        });

        // returned function will be called on component unmount 
        return () => {
            window.removeEventListener('mousemove', () => {
                props.store.unwatch(storeSubscriptionId);
            })
        }

    }, []);

    return ReactDOM.createPortal(
        _renderContainer(),
        document.body,
    );    
}