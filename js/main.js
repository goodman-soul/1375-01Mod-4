document.addEventListener('DOMContentLoaded', function() {
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonContents = document.querySelectorAll('.season-content');

    if (seasonTabs.length > 0 && seasonContents.length > 0) {
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetSeason = this.getAttribute('data-season');

                seasonTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                seasonContents.forEach(content => {
                    if (content.id === targetSeason) {
                        content.style.display = 'block';
                        content.style.animation = 'none';
                        content.offsetHeight;
                        content.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });

        const currentMonth = new Date().getMonth() + 1;
        let defaultSeason = 'spring';
        if (currentMonth >= 3 && currentMonth <= 5) {
            defaultSeason = 'spring';
        } else if (currentMonth >= 6 && currentMonth <= 8) {
            defaultSeason = 'summer';
        } else if (currentMonth >= 9 && currentMonth <= 11) {
            defaultSeason = 'autumn';
        } else {
            defaultSeason = 'winter';
        }

        const defaultTab = document.querySelector(`.season-tab[data-season="${defaultSeason}"]`);
        if (defaultTab) {
            defaultTab.click();
        }
    }

    const mapPoints = document.querySelectorAll('.map-point');
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const label = this.querySelector('.map-label');
            if (label) {
                label.style.transform = 'scale(1.1)';
                label.style.background = 'rgba(139, 0, 0, 0.9)';
                label.style.color = '#FFD700';
            }
        });

        point.addEventListener('mouseleave', function() {
            const label = this.querySelector('.map-label');
            if (label) {
                label.style.transform = 'scale(1)';
                label.style.background = 'rgba(255, 255, 255, 0.9)';
                label.style.color = '#8B0000';
            }
        });
    });

    const foodCards = document.querySelectorAll('.food-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        foodCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
});
