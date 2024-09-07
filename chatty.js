document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotContainer = document.getElementById('chatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');

    let chatHistory = [];

    function toggleChatbot() {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            startChat();
            chatbotContainer.style.display = 'block';
        } else {
            closeChat();
        }
    }

    function closeChat() {
        chatbotContainer.style.display = 'none';
        chatHistory = [];
        renderChatHistory();
    }

    function addMessage(content, isUser, question = null, option = null) {
        const message = {
            content: content,
            isUser: isUser,
            question: question,
            option: option
        };
        chatHistory.push(message);
        renderChatHistory();
    }

    function renderChatHistory() {
        chatbotMessages.innerHTML = '';
        chatHistory.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `chatbot-message ${message.isUser ? 'user' : 'bot'}`;

            const avatar = document.createElement('img');
            avatar.className = 'chatbot-avatar';
            avatar.src = message.isUser ? 'user-avatar.png' : 'image.png'; // Replace with your user and bot avatar paths
            messageElement.appendChild(avatar);

            const bubble = document.createElement('div');
            bubble.className = 'chatbot-bubble';

            if (message.question) {
                bubble.innerHTML = `<strong>${message.question}</strong><br>`;
            }

            bubble.innerHTML += message.content;

            if (message.option) {
                bubble.innerHTML += `<br><em>Option selected: ${message.option}</em>`;
            }

            messageElement.appendChild(bubble);

            chatbotMessages.appendChild(messageElement);
        });

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showOptions(options) {
        chatbotInput.innerHTML = '';
        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'chatbot-option';
            optionElement.textContent = option.text;
            optionElement.onclick = () => handleOptionClick(option.text); // Pass the option text to handler
            chatbotInput.appendChild(optionElement);
        });
    }

    function startChat() {
        addMessage('Hey there, welcome to SVECW! How can we help you?', false);
        showOptions([
            { text: 'Want to navigate a place?', handler: navigatePlace },
            { text: 'Want to know where to go?', handler: knowWhereToGo }
        ]);
    }

    function navigatePlace() {
        addMessage('Which category does the place belong to?', false, 'Navigation', null);
        showOptions([
            { text: 'Labs', handler: () => {
                console.log('Labs option clicked'); // Debug log
                window.location.href = 'index.html';
            }},
            { text: 'Hostels', handler: () => {
                console.log('Hostels option clicked'); // Debug log
                window.location.href = 'hostels.html';
            }},
            { text: 'Academics', handler: () => {
                console.log('Academics option clicked'); // Debug log
                window.location.href = 'index.html';
            }},
            { text: 'Other Facilities', handler: () => {
                console.log('Other Facilities option clicked'); // Debug log
                window.location.href = 'ohter.html';
            }}
        ]);
    }
    
    

    function askForPlace(category) {
        addMessage(`Please enter the ${category} name:`, false, 'Enter Place Name', null);
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type here...';
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const place = this.value.trim();
                if (place) {
                    addMessage(place, true, null, category); // Log the entered place name and category
                    provideLocation(category, place);
                }
            }
        });
        chatbotInput.innerHTML = '';
        chatbotInput.appendChild(input);
    }

    function provideLocation(category, place) {
        let locationMessage = '';
        switch (category) {
            case 'labs':
                locationMessage = `Click on the below location to navigate to ${place}: [Location Link for Labs]`;
                break;
            case 'hostels':
                locationMessage = `Click on the below location to navigate to ${place}: [Location Link for Hostels]`;
                break;
            case 'academics':
                locationMessage = `Click on the below location to navigate to ${place}: [Location Link for Academics]`;
                break;
            case 'other':
                locationMessage = `Click on the below location to navigate to ${place}: [Location Link for Other Facilities]`;
                break;
            default:
                locationMessage = `Location link not available for ${place} in ${category}.`;
        }
        addMessage(locationMessage, false, 'Location Provided', null);
        showOptions([
            { text: 'Any other queries?', handler: startChat },
            { text: 'Navigate to another place', handler: navigatePlace },
            { text: 'Want to know where to go?', handler: knowWhereToGo }
        ]);
    }

    function knowWhereToGo() {
        addMessage('Where are you going?', false, 'Where to Go', null);
        showOptions([
            { text: 'Fee', handler: () => showFeeOptions() },
            { text: 'Classroom', handler: () => showClassroomOptions() },
            { text: 'Hostels', handler: () => showHostelOptions() }
        ]);
    }

    function showFeeOptions() {
        addMessage('Which fee information do you need?', false, 'Fee Information', null);
        showOptions([
            { text: 'Hostel Fee', handler: () => provideFeeLocation('Hostel Fee') },
            { text: 'College Fee', handler: () => provideFeeLocation('College Fee') }
        ]);
    }

    function provideFeeLocation(type) {
        let locationMessage = '';
        switch (type) {
            case 'Hostel Fee':
                locationMessage = 'Hostel fee location link: [Hostel Fee Location Link]';
                break;
            case 'College Fee':
                locationMessage = 'College fee location link: [College Fee Location Link]';
                break;
            default:
                locationMessage = 'Fee location link not available.';
        }
        addMessage(locationMessage, false, 'Fee Location Provided', type);
        showOptions([
            { text: 'Any other queries?', handler: startChat },
            { text: 'Want to know where to go?', handler: knowWhereToGo }
        ]);
    }

    function showClassroomOptions() {
        addMessage('Which block or department?', false, 'Classroom Information', null);
        showOptions([
            { text: 'First Year - A Block', handler: () => provideClassroomLocation('First Year - A Block') },
            { text: 'CSE - IT D Block', handler: () => provideClassroomLocation('CSE - IT D Block') },
            { text: 'ECE - AI A Block', handler: () => provideClassroomLocation('ECE - AI A Block') },
            // Add more options as needed
        ]);
    }

    function provideClassroomLocation(classroom) {
        let locationMessage = `Location for ${classroom}: [Location Link for ${classroom}]`;
        addMessage(locationMessage, false, 'Classroom Location Provided', classroom);
        showOptions([
            { text: 'Any other queries?', handler: startChat },
            { text: 'Want to know where to go?', handler: knowWhereToGo }
        ]);
    }

    function showHostelOptions() {
        addMessage('Select a hostel:', false, 'Hostel Information', null);
        showOptions([
            { text: 'Hostel 1', handler: () => provideHostelLocation('Hostel 1') },
            { text: 'Hostel 2', handler: () => provideHostelLocation('Hostel 2') },
            // Add more options as needed
        ]);
    }

    function provideHostelLocation(hostel) {
        let locationMessage = `Location for ${hostel}: [Hostel Location Link]`;
        addMessage(locationMessage, false, 'Hostel Location Provided', hostel);
        showOptions([
            { text: 'Any other queries?', handler: startChat },
            { text: 'Want to know where to go?', handler: knowWhereToGo }
        ]);
    }

    function handleOptionClick(optionText) {
        addMessage(optionText, true, null, null); // Log the option selected by the user
        switch (optionText) {
            case 'Want to navigate a place?':
                navigatePlace();
                break;
            case 'Want to know where to go?':
                knowWhereToGo();
                break;
            default:
                // Handle other options if needed
                break;
        }
    }

    chatbotButton.addEventListener('click', toggleChatbot);
});
