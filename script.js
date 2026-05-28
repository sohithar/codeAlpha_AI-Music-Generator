// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
window.addEventListener('load', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('uploadBox').classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('uploadBox').classList.remove('drag-over');
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('uploadBox').classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect({ target: { files } });
    }
}

// Handle file selection
function handleFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const fileName = files[0].name;
        console.log('Selected file:', fileName);
        document.querySelector('.upload-text').textContent = '✅ ' + fileName + ' Selected!';
    }
}

// Generate Music Function
function generateMusic() {
    const uploadBox = document.getElementById('uploadBox');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');
    const fileInput = document.getElementById('fileInput');
    
    // Check if file is selected or style is chosen
    if (!fileInput.files.length) {
        alert('Please select a MIDI file first! 🎵');
        return;
    }

    // Show loading
    loading.style.display = 'block';
    resultSection.style.display = 'none';

    // Get selected style
    const selectedStyle = document.querySelector('.style-btn.active');
    const style = selectedStyle ? selectedStyle.getAttribute('data-style') : 'classical';

    // Simulate API call
    setTimeout(() => {
        loading.style.display = 'none';
        resultSection.style.display = 'block';
        
        const fileName = fileInput.files[0].name;
        const resultText = document.getElementById('resultText');
        resultText.textContent = `Your "${style}" style music from "${fileName}" has been generated! It's ready to play or download. 🎉`;
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
}

// Play Music Function
function playMusic() {
    alert('🎵 Now playing your AI-generated music!\n\nNote: This is a demo. Connect to a real audio API to actually play music.');
}

// Download Music Function
function downloadMusic() {
    alert('⬇️ Your music is being downloaded!\n\nNote: In a real app, this would download the MP3/WAV file. This is a demo version.');
}

// Reset Form
function resetForm() {
    document.getElementById('fileInput').value = '';
    document.querySelector('.upload-text').textContent = 'Drag and Drop MIDI File Here';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('uploadBox').scrollIntoView({ behavior: 'smooth' });
}

// Style button selection
document.addEventListener('DOMContentLoaded', () => {
    const styleBtns = document.querySelectorAll('.style-btn');
    
    styleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            styleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Simple Analytics
function trackEvent(eventName) {
    console.log('Event tracked:', eventName);
    // In a real app, this would send data to Google Analytics or similar
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click_' + e.target.textContent.trim().substring(0, 20));
    }
});
