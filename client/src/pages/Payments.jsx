import React, { useState } from 'react'
import { Container, Stack, Button } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LOGO from '../assets/img/dunkin-logo-large.png';
import PaymentsTable from '../components/PaymentsTable.jsx';
import { parseXML } from '../lib/util';

const Payments = () => {
    const [fileContent, setFileContent] = useState([])

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (file && file.type === 'text/xml') {
            const res = await parseXML(file)
            setFileContent(res)
        } else {
            // trigger toast
        }
    }

    let paymentsTable = <></>
    if (fileContent.length) {
        console.log(fileContent)
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
            </div>
            <div className="home_row">
                <Stack direction="row" alignItems="center" spacing={2}>
                    {fileContent.length ?
                        <>
                            <Button variant="contained" component="label" startIcon={<CheckIcon />}>
                                Make Payments
                            </Button>
                            <Button variant="contained" component="label" startIcon={<ClearIcon />} onClick={() => setFileContent([])}>
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