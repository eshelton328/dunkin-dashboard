export const parseXML = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = async (event) => {
            console.log('reading file')
            const contents = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(contents, 'text/xml');
            const rows = xmlDoc.querySelector('root')?.querySelectorAll('row');
    
            if (rows.length === 0) {
                resolve([]);
            }
    
            let fileData = [];
            for (const row of rows) {
                const employee = row.querySelector('Employee');
                const payor = row.querySelector('Payor');
                const payee = row.querySelector('Payee');
    
                fileData.push({
                    'employee': employee && {
                        'dunkinId': employee.querySelector('DunkinId')?.textContent || '',
                        'dunkinBranch': employee.querySelector('DunkinBranch')?.textContent || '',
                        'firstName': employee.querySelector('FirstName')?.textContent || '',
                        'lastName': employee.querySelector('LastName')?.textContent || '',
                        'dob': employee.querySelector('DOB')?.textContent || '',
                        'phone': employee.querySelector('PhoneNumber')?.textContent || '',
                    },
                    'payor': payor && {
                        'dunkinId': payor.querySelector('DunkinId')?.textContent || '',
                        'abaRouting': payor.querySelector('ABARouting')?.textContent || '',
                        'accNum': payor.querySelector('AccountNumber')?.textContent || '',
                        'name': payor.querySelector('Name')?.textContent || '',
                        'dba': payor.querySelector('DBA')?.textContent || '',
                        'ein': payor.querySelector('EIN')?.textContent || '',
                        'address': {
                            'street': payor.querySelector('Address')?.querySelector('Line1').textContent || '',
                            'city': payor.querySelector('Address')?.querySelector('City').textContent || '',
                            'state': payor.querySelector('Address')?.querySelector('State').textContent || '',
                            'zip': payor.querySelector('Address')?.querySelector('Zip').textContent || '',
                        }
                    },
                    'payee': payee && {
                        'plaidId': payee.querySelector('PlaidId')?.textContent || '',
                        'loanAccNum': payee.querySelector('LoanAccountNumber')?.textContent || '',
                    },
                    'amount': row.querySelector('Amount')?.textContent || '',
                })
            }
    
            resolve(fileData)
        }
        reader.onerror = reject;
        reader.readAsText(file)
    })
}