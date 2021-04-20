import React, { useState } from 'react';
import {EnvironmentOutlined,SearchOutlined,FlagOutlined,
    CaretDownOutlined,ShoppingCartOutlined,HomeOutlined} from '@ant-design/icons';

import './navigationBar.scss'


const NavigationBar = ({logo}) => {
    const [search,setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="navBar">
            <div className="navBar__logo">
                <a href="#">
                    <img className="logo" src="https://i.pinimg.com/originals/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.png"></img>
                </a>  
            </div>
            <div className="navBar__main">
                <div className="navBar__main__item selected">
                    <HomeOutlined style={{color: "#fff"}}></HomeOutlined>
                    <p>Dashboard</p>
                </div>
                <div className="navBar__main__item">
                    <HomeOutlined style={{}}></HomeOutlined>
                    <p>Dashboard</p>
                </div>
                <div className="navBar__main__item">
                    <HomeOutlined style={{}}></HomeOutlined>
                    <p>Dashboard</p>
                </div>
                <div className="navBar__main__item">
                    <HomeOutlined style={{}}></HomeOutlined>
                    <p>Dashboard</p>
                </div>
                <div className="navBar__main__item">
                    <HomeOutlined style={{}}></HomeOutlined>
                    <p>Dashboard</p>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;