export function formatData(date) {
    return date.toLocaleDateString('en-UI',{
        month: 'short',
        day:'numeric',
        year:'numeric',
    })
       
    
}

