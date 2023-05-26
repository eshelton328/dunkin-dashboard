import React, { useState } from 'react'
import { Container, Stack, Button } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LOGO from '../assets/img/dunkin-logo-large.png';
import PaymentsTable from '../components/PaymentsTable.jsx';
import { parseXML, processNewPayments } from '../lib/util';
import { useNavigate } from 'react-router-dom';


const Payments = () => {
    const [fileName, setFileName] = useState("")
    const [fileContent, setFileContent] = useState([])
    const navigate = useNavigate();

    const ColorAlerts = () => {
        return (
            <Alert severity="success" color="info">
                This is a success alert — check it out!
            </Alert>
        );
    }

    const handleClick = (path) => {
        navigate(`/${path}`)
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (file && file.type === 'text/xml') {
            const res = await parseXML(file)
            setFileName(file.name)
            setFileContent(res)
        }
    }

    const makePayments = async () => {
        const res = await processNewPayments(fileName, fileContent);
        if (res) {
            setFileName(fileName)
            setFileContent([])
        }
    }

    let paymentsTable = <></>
    if (fileContent.length) {
        paymentsTable = <PaymentsTable payments={fileContent} />
    }

    return (
        <Container>
            <div className="logo_container">
                <img
                    src={LOGO}
                    alt=""
                    className="home_logo"
                />
                <h1>Payments</h1>
                <h3 onClick={() => handleClick("reporting")}>Go to Reporting</h3>
            </div>
            <div className="home_row">
                <Stack direction="row" alignItems="center" spacing={2}>
                    {fileContent.length ?
                        <>
                            <Button variant="contained" component="label" startIcon={<CheckIcon />} onClick={() => makePayments()}>
                                Make Payments
                            </Button>
                            <Button 
                                variant="contained" 
                                component="label" 
                                startIcon={<ClearIcon />} 
                                onClick={() => {
                                    setFileName("")
                                    setFileContent([])
                                }}>
                                Cancel
                            </Button>
                        </>
                        :
                        <Button variant="contained" component="label" startIcon={<FileUploadIcon />}>
                            Upload
                            <input
                                hidden
                                type="file"
                                accept=".xml"
                                onChange={handleFileUpload}
                            />
                        </Button>
                    }
                </Stack>
            </div>
            <div className="home_row">
                {paymentsTable}
            </div>
        </Container>
    )
}

export default Payments;