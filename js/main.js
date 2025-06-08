document.addEventListener('DOMContentLoaded', () => {
    // Navbar hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Sample records data (you can replace this with real data from your server)
    const sampleRecords = [
        {
            map: 'bhop_eazy',
            player: 'ProHopper',
            time: '00:45.231'
        },
        {
            map: 'bhop_arcane',
            player: 'SpeedDemon',
            time: '01:23.456'
        },
        {
            map: 'bhop_master',
            player: 'BunnyMaster',
            time: '02:10.789'
        }
    ];

    // Populate records
    const recordsContainer = document.querySelector('.records-container');
    if (recordsContainer) {
        sampleRecords.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.className = 'record';
            recordElement.innerHTML = `
                <div class="record-card">
                    <h3>${record.map}</h3>
                    <p><strong>Player:</strong> ${record.player}</p>
                    <p><strong>Time:</strong> ${record.time}</p>
                </div>
            `;
            recordsContainer.appendChild(recordElement);
        });
    }

    // Copy server IP when clicking connect button
    const connectBtn = document.querySelector('.connect-btn');
    const serverIP = 'connect bhop.servidor.com';

    connectBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(serverIP).then(() => {
            const originalText = connectBtn.textContent;
            connectBtn.textContent = 'IP Copiado!';
            setTimeout(() => {
                connectBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll === 0) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
});
