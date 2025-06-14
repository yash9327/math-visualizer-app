document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const visualizerContainer = document.getElementById('visualizer-container');
    const topicButtons = document.querySelectorAll('.topic-btn');

    // --- Theme Switcher ---
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });

    // --- Topic Loader ---
    async function loadVisualizer(topic) {
        // This is a simplified loader for when files are on a server.
        // It won't work from a local file path due to browser security (CORS).
        // Use the "Live Server" extension in VS Code to run this project.
        try {
            // Fetch the HTML for the selected topic
            const response = await fetch(`./visualizers/${topic}/index.html`);
            if (!response.ok) throw new Error('Failed to load visualizer.');
            const html = await response.text();
            visualizerContainer.innerHTML = html;

            // Remove existing script if any
            const oldScript = document.getElementById('visualizer-script');
            if (oldScript) oldScript.remove();

            // Create and append the new script for the topic
            const script = document.createElement('script');
            script.id = 'visualizer-script';
            script.src = `./visualizers/${topic}/script.js`;
            document.body.appendChild(script);

        } catch (error) {
            console.error('Error loading visualizer:', error);
            visualizerContainer.innerHTML = `<div class="placeholder"><p>Error loading content. Please ensure you are running this on a web server (like VS Code's Live Server).</p></div>`;
        }
    }

    topicButtons.forEach(button => {
        button.addEventListener('click', () => {
            const topic = button.getAttribute('data-topic');
            
            topicButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            loadVisualizer(topic);
        });
    });
});