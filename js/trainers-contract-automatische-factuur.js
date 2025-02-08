document.addEventListener('DOMContentLoaded', () => {
    const fileTypeSelect = document.getElementById('file-type');
    const templateInfoDiv = document.getElementById('template-info');
    const uploadForm = document.getElementById('upload-form');
    const pdfFileInput = document.getElementById('pdf-file');

    fileTypeSelect.addEventListener('change', () => {
        const selectedType = fileTypeSelect.value;
        let templatePath = '';

        if (selectedType === 'invoice') {
            templatePath = 'test-website/File Templates/voorbeeld-factuur.docx';
            console.log("Invoice2")
        } else if (selectedType === 'contract') {
            templatePath = 'test-website/File Templates/voorbeeld-contract-trainers.docx';
            console.log("Contract2")
        }
        
        console.log("Try to fetch", templatePath)
        fetch(templatePath)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], `${selectedType}-template.pdf`, { type: 'application/pdf' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                pdfFileInput.files = dataTransfer.files;
            })
            .catch(error => console.error('Error loading template:', error));

 
    });

    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const pdfFile = document.getElementById('pdf-file').files[0];
        // const excelFile = document.getElementById('excel-file').files[0];

        // if (pdfFile && excelFile) {
            // Process the files (this is where you would add your processing logic)
            // For demonstration, we'll just download the PDF template

            const fileURL = URL.createObjectURL(pdfFile);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = pdfFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        // } else {
        //     console.error('Both PDF and Excel files are required.');
        // }
    });
});

// check for Excel files that the format is correct (columns match)