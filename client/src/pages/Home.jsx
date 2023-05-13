import React from 'react';
import { Container } from '@mui/material';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import LOGO from '../assets/img/dunkin-logo-large.png';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(`/${path}`)
    }

    return (
        <Container>
            <div className="logo_container">
                <img
                    src={LOGO}
                    alt=""
                    className="home_logo"
                />
                <h1>Method Dashboard</h1>
            </div>
            <div className="home_row">
                <div className="home_col" onClick={() => handleClick('payments')}>
                    <h3>Payments</h3>
                    <PaymentOutlinedIcon fontSize="large"/>
                </div>
                <div className="home_col" onClick={() => handleClick('reporting')}>
                    <h3>Reporting</h3>
                    <SummarizeOutlinedIcon fontSize="large"/>
                </div>
            </div>
        </Container>
    )
}

export default Home;