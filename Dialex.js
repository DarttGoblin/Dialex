const analyse_text = document.querySelector('.analyse-text');
const results_container = document.querySelector('.results-container');

const flags = {
    'UAE Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_the_United_Arab_Emirates.svg.png',
    'Bahraini Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Bahrain.svg.png',
    'Algerian Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Algeria.svg.png',
    'Egyptian Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Egypt.svg.png',
    'Iraqi Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Iraq.svg.png',
    'Jordanian Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Jordan.svg.png',
    'Kuwaiti Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Kuwait.svg.png',
    'Lebanese Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Lebanon.svg.png',
    'Libyan Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Libya.svg.png',
    'Moroccan Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Morocco.svg.png',
    'Omani Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Oman.svg.png',
    'Palestinian Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Palestine.svg.png',
    'Qatari Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Qatar.svg.png',
    'Saudi Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Saudi_Arabia.svg.png',
    'Syrian Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_the_Syrian_revolution.svg.png',
    'Modern Standard Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Arabic.svg.png',
    'Tunisian Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Tunisia.svg.png',
    'Sudanese Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Sudan.svg.png',
    'Yemeni Dialect': 'Dialex.Media/Dialex.Media/Flags/Flag_of_Yemen.svg.png',
};

analyse_text.onclick = function() {
    if (user_input.value == '') {return}

    // Regular expression to check for Arabic letters
    const arabicRegex = /[\u0600-\u06FF]/;

    // Check if the input contains Arabic letters
    if (!arabicRegex.test(user_input.value)) {
        console.log("No Arabic text detected");
        alert("Please enter text in Arabic.");
        return;
    }

    console.log(user_input.value);
    console.log('Sending to model...');
    analyse_text.innerHTML = 'Analysing...';
    SendToModel(user_input.value);
}

function SendToModel(user_input) {
    fetch('http://localhost:6969', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8',},
        body: JSON.stringify({ user_input }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('success!');
            console.log(data.dialect);
            console.log(data.confidence);
            CreateResponse(data.dialect, data.confidence);
            analyse_text.innerHTML = 'Analyse Text';
        }

        else {
            console.error('Error:', error);
            alert('There was an error processing your file! Please try again.');
            analyse_text.innerHTML = 'Analyse Text';
        }
    })
    .catch(err => {
        console.error('Error:', err);
        // alert('There was an error with the server! Please try again.');
        alert('The model used in this project is too large for GitHub to handle. We are working on a solution, but in the meantime, you can check out the demo to see how the interface works!');
        analyse_text.innerHTML = 'Analyse Text';
    });
}

function CreateResponse(dialect, prediction) {
    const result_container = document.createElement('div');
    const result_image = document.createElement('img');
    const result_text_container = document.createElement('div');
    const result_title = document.createElement('span');
    const result_description = document.createElement('span');

    result_container.classList.add('result-container');
    result_image.classList.add('result-image');
    result_text_container.classList.add('result-text-container');
    result_title.classList.add('result-title');
    result_description.classList.add('result-description');   

    result_image.src = flags[dialect];
    result_title.innerHTML = dialect;
    result_description.innerHTML = `Your text was detected as ${dialect} with a confidence of ${(prediction * 100).toFixed(1)}%`;

    result_text_container.appendChild(result_title);
    result_text_container.appendChild(result_description);
    result_container.appendChild(result_image);
    result_container.appendChild(result_text_container);
    results_container.appendChild(result_container);

    result_container.scrollIntoView({ behavior: "smooth", block: "start" });
}