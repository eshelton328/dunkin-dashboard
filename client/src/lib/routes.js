
export const getAllBatches = async () => {
    try {
        const res = await fetch('http://localhost:8080/batch');
        if (!res.ok) {
            throw new Error('Failed to retrieve batches')
        }
        const data = await res.json();
        return data.batches;
    } catch (error) {
        console.error(`Routes (getAllBatches) - ${error}`);
        return false
    }
}

export const createPaymentBulk = async (fileName, payments, batchId, job, jobTotal) => {
    try {
        const res = await fetch('http://localhost:8080/payment/bulk', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ fileName: fileName, payments: payments, batchId: batchId, jobNum: job, jobTotal: jobTotal})
        })

        if (!res.ok) {
            throw new Error('Failed to create payment');
        }

        const data = await res.json();
        return data.batchId.toString();
    } catch (error) {
        console.error('Error: ', error)
        return false;
    }
}

export const getSourceReport = async (fileName) => {
    try {
        const res = await fetch(`http://localhost:8080/report/source/${fileName}`)
        if (!res.ok) {
            throw new Error('Failed to get source report');
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `source_report_${fileName}`;
        a.click();
        return true;
    } catch (error) {
        console.error('Error: ', error)
        return false;
    }
}

export const getBranchReport = async (fileName) => {
    try {
        const res = await fetch(`http://localhost:8080/report/branch/${fileName}`)
        if (!res.ok) {
            throw new Error('Failed to get branch report');
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `branch_report_${fileName}`;
        a.click();
        return true;
    } catch (error) {
        console.error('Error: ', error)
        return false;
    }
}

export const getStatusReport = async (fileName) => {
    try {
        const res = await fetch(`http://localhost:8080/report/status/${fileName}`)
        if (!res.ok) {
            throw new Error('Failed to get branch report');
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `status_report_${fileName}`;
        a.click();
        return true;
    } catch (error) {
        console.error('Error: ', error)
        return false;
    }
}

export const refreshReportsByBatch = async (batchId) => {
    try {
        const res = await fetch(`http://localhost:8080/report/refresh/${batchId}`)
        if (!res.ok) {
            throw new Error('Failed to get branch report');
        }

        return true;
    } catch (error) {
        console.error('Error: ', error)
        return false;
    }
}