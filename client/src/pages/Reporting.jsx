import React, { useState, useEffect } from 'react';
import { Container, Stack, Button } from '@mui/material';
import { getAllBatches } from '../lib/routes';
import BatchesTable from '../components/BatchesTable.jsx';
import LOGO from '../assets/img/dunkin-logo-large.png';
import { useNavigate } from 'react-router-dom';

const Reporting = () => {
    const [batches, setBatches] = useState([]);
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(`/${path}`)
    }

    const fetchBatches = async () => {
        const data = await getAllBatches();
        if (data) {
            setBatches(data)
        }
    }

    useEffect(() => {
        fetchBatches();
    }, [])

    let batchesTable = <h3>No batch data... create a payment</h3>
    if (batches.length) {
        batchesTable = <BatchesTable batches={batches} />
    }

    return (
        <Container>
            <div className="logo_container">
                <img
                    src={LOGO}
                    alt=""
                    className="home_logo"
                />
                <h1>Reporting</h1>
                <h3 onClick={() => handleClick("payments")}>Go to Payments</h3>
            </div>
            <div className="home_row">
                {batchesTable}
            </div>
        </Container>
    )
}

export default Reporting;