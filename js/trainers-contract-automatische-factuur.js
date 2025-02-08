document.addEventListener('DOMContentLoaded', () => {
    const fileTypeSelect = document.getElementById('file-type');
    const templateInfoDiv = document.getElementById('template-info');

    fileTypeSelect.addEventListener('change', () => {
        const selectedType = fileTypeSelect.value;
        let templatePath = '';

        if (selectedType === 'invoice') {
            templatePath = '../File Templates/voorbeeld-factuur.docx';
        } else if (selectedType === 'contract') {
            templatePath = '../File Templates/voorbeeld-contract-trainers.docx';
        }

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
});

// check for Excel files that the format is correct (columns match)