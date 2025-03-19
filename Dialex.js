const file_input = document.querySelector('.file-input');
const take_image = document.querySelector('.take-image');
const analyse_doc = document.querySelector('.analyse-doc');
const result_container = document.querySelector('.result-container');
const given_file = document.querySelector('.given-file');

UploadDocument();

analyse_doc.onclick = function() {
    if (file_input.files.length > 0) {
        console.log('Sending to model...');
        // SendToModel(user_file);
    } else {
        alert('Something is missing...');
    }
}

function SendToModel(user_file) {
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ user_file }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('success!');
        }

        else {
            console.error('Error:', error);
            alert('There was an error processing your file! Please try again.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('There was an error with the server! Please try again.');
    });
}

function UploadDocument() {
    file_input.onchange = function(event) {
        let file = event.target.files[0];
        if (file) {
            if (!file.type.match(/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|plain)/)) {
                return;
            }
            console.log("File Name:", file.name);
            console.log("File Type:", file.type);
            given_file.textContent = file.name;
        }
    };
}