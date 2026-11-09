  const icons = ['🚀', '⚡', '💎', '🌟', '🎯', '🔥', '💡', '🎨', '🌈', '⭐', '🎭', '🎪', '🎬', '🎸', '🎵', '🎲', '🎯', '🏆', '⚽', '🎮'];
        
        const colorPalettes = [
            ['#7c3aed', '#2563eb', '#1e293b', '#f1f5f9'],
            ['#f59e0b', '#ef4444', '#78350f', '#fef3c7'],
            ['#10b981', '#06b6d4', '#064e3b', '#d1fae5'],
            ['#ef4444', '#ec4899', '#7f1d1d', '#fecdd3'],
            ['#3b82f6', '#8b5cf6', '#1e3a8a', '#dbeafe'],
            ['#ec4899', '#f59e0b', '#831843', '#fce7f3'],
            ['#14b8a6', '#06b6d4', '#134e4a', '#ccfbf1'],
            ['#f97316', '#fb923c', '#7c2d12', '#fed7aa'],
            ['#8b5cf6', '#a78bfa', '#4c1d95', '#ede9fe'],
            ['#06b6d4', '#22d3ee', '#164e63', '#cffafe'],
        ];

        const brandInput = document.getElementById('brandInput');
        const styleSelect = document.getElementById('styleSelect');
        const countSelect = document.getElementById('countSelect');
        const generateBtn = document.getElementById('generateBtn');
        const resultsSection = document.getElementById('resultsSection');
        const resultsGrid = document.getElementById('resultsGrid');
        const resultsCount = document.getElementById('resultsCount');
        const emptyState = document.getElementById('emptyState');

        generateBtn.addEventListener('click', generateLogos);

        function generateLogos() {
            const brand = brandInput.value.trim();
            const style = styleSelect.value;
            const count = parseInt(countSelect.value);

            if (!brand) {
                alert('Please enter a brand name!');
                return;
            }

            // Show loading state
            generateBtn.disabled = true;
            generateBtn.innerHTML = `
                <span>
                    <div class="spinner"></div>
                    Generating ${count} logos...
                </span>
            `;

            // Simulate API call
            setTimeout(() => {
                const results = [];
                for (let i = 0; i < count; i++) {
                    results.push({
                        id: i,
                        name: `${brand} ${style.charAt(0).toUpperCase() + style.slice(1)} ${i + 1}`,
                        icon: icons[Math.floor(Math.random() * icons.length)],
                        palette: colorPalettes[i % colorPalettes.length],
                        description: `${style} style logo concept #${i + 1}`
                    });
                }

                displayResults(results);

                // Reset button
                generateBtn.disabled = false;
                generateBtn.innerHTML = `
                    <span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        Generate Logo Ideas
                    </span>
                `;
            }, 2000);
        }

        function displayResults(results) {
            emptyState.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            resultsGrid.innerHTML = '';
            resultsCount.textContent = `${results.length} Logo${results.length > 1 ? 's' : ''}`;

            results.forEach((logo, index) => {
                const card = document.createElement('div');
                card.className = 'logo-card';
                card.style.animationDelay = `${(index % 20) * 0.05}s`;
                card.innerHTML = `
                    <div class="logo-icon">${logo.icon}</div>
                    <h3 class="logo-name">${logo.name}</h3>
                    <p class="logo-description">${logo.description}</p>
                    
                    <div class="palette-section">
                        <p class="palette-label">Color Palette</p>
                        <div class="palette-colors">
                            ${logo.palette.map(color => `
                                <div class="color-swatch" style="background-color: ${color}" title="${color}"></div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="card-actions">
                        <button class="btn btn-copy" onclick="copyLogo(${JSON.stringify(logo).replace(/"/g, '&quot;')})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            Copy
                        </button>
                        <button class="btn btn-save">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Save
                        </button>
                    </div>
                `;
                resultsGrid.appendChild(card);
            });

            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function copyLogo(logo) {
            const text = `Logo: ${logo.name}\nIcon: ${logo.icon}\nColors: ${logo.palette.join(', ')}`;
            navigator.clipboard.writeText(text).then(() => {
                alert('Logo details copied to clipboard!');
            });
        }