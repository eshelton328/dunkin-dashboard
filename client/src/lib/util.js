import { createPaymentBulk, getSourceReport, getBranchReport, getStatusReport } from "./routes";

export const parseXML = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = async (event) => {
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
    
            resolve(fileData);
        }
        reader.onerror = reject;
        reader.readAsText(file);
    })
}

export const getPaymentsTableData = (array) => {
    let res = [];
    for (const el of array) {
        const name = `${el.employee?.firstName || ''} ${el.employee?.lastName || ''}`;

        res.push({
            'employee': name,
            'employeePhone': el.employee?.phone || 'n/a',
            'payor': el.payor?.dba || 'n/a',
            'payorAcc': el.payor?.accNum || NaN,
            'payorRout': el.payor?.abaRouting || NaN,
            'payeeAcc': el.payee?.loanAccNum || NaN,
            'amount': el.amount,
        });
    };

    return res;
}

export const getBatchesTableData = (array) => {
    let res = [];
    for (const el of array) {
        res.push({
            'createdAt': el.createdAt,
            'fileName': el.fileName,
            'batchId': el._id,
            'status': el.status,
            'sourceReport': el.reports.sourceRep,
            'branchReport': el.reports.branchRep,
            'statusReport': el.reports.statusRep,
        })
    };

    return res;
}

export const downloadSourceReport = async (fileName) => {
    let res = await getSourceReport(fileName);
    return res
}

export const downloadBranchReport = async (fileName) => {
    let res = await getBranchReport(fileName);
    return res
}

export const downloadStatusReport = async (fileName) => {
    let res = await getStatusReport(fileName)
    return res
}

const splitArray = (array, maxLength) => {
    const result = [];
    for (let i = 0; i < array.length; i += maxLength) {
        result.push(array.slice(i, i + maxLength));
    }
    return result;
}

export const processNewPayments = async (fileName, payments) => {
    const subBatches = splitArray(payments, 175)
    let batchId = false;
    const total = subBatches.length;
    for (let i = 0; i < subBatches.length; i++) {
        const subBatch = subBatches[i];
        const res = await createPaymentBulk(fileName, subBatch, batchId, i + 1, total);
        if (!batchId) {
            batchId = res;
        }
    }

    return true;
}