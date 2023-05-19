import React, { useState } from 'react'
import { Container, Stack, Button } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LOGO from '../assets/img/dunkin-logo-large.png';

const Payments = () => {
    const [file, setFile] = useState(null);
    const [fileConent, setFileContent] = useState([])

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file && file.type === 'text/xml') {
            setFile(file)
            // process file
        } else {
            setFile(null)
        }
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
                    {file ?
                        <>
                            <Button variant="contained" component="label" startIcon={<CheckIcon />}>
                                Make Payments
                            </Button>
                            <Button variant="contained" component="label" startIcon={<ClearIcon />} onClick={() => setFile(null)}>
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
        </Container>
    )
}

export default Payments;