// Courses functionality
function initializeHomepage() {
    loadFeaturedCourses();
    loadTestimonials();
    setupCourseFilters();
}

async function loadFeaturedCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    const loadingElement = document.getElementById('courses-loading');
    
    try {
        const courses = await fetchCourses();
        renderCourses(courses, coursesGrid);
        loadingElement.classList.add('hidden');
        coursesGrid.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading courses:', error);
        loadingElement.innerHTML = '<p>Error loading courses. Please try again.</p>';
    }
}

async function fetchCourses(category = 'all') {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const courses = [
                // Course data from previous implementation
            ];
            
            if (category !== 'all') {
                resolve(courses.filter(course => course.category === category));
            } else {
                resolve(courses);
            }
        }, 1000);
    });
}

function renderCourses(courses, container) {
    if (courses.length === 0) {
        container.innerHTML = `
            <div class="no-courses">
                <i data-feather="frown"></i>
                <h3>No courses found</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
        return;
    }

    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-image-container">
                <img src="${course.image}" alt="${course.title}" class="course-image">
                ${course.badge ? `<span class="course-badge badge-${course.badge.toLowerCase()}">${course.badge}</span>` : ''}
            </div>
            <div class="course-content">
                <div class="rating">
                    <div class="stars">
                        ${Array(5).fill(0).map((_, i) => 
                            `<i data-feather="star" class="${i < Math.floor(course.rating) ? 'star-filled' : ''}"></i>`
                        ).join('')}
                    </div>
                    <span>${course.rating} (${course.reviews})</span>
                </div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-footer">
                    <div class="instructor">
                        <img src="${course.instructorAvatar}" alt="${course.instructor}">
                        <span>${course.instructor}</span>
                    </div>
                    <div class="price">$${course.price}</div>
                </div>
            </div>
        </div>
    `).join('');

    feather.replace();
}
