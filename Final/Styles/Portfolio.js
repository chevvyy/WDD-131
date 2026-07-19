// Renders the Portfolio page from PROJECTS (see projects-data.js):
// - category "bubble" filters
// - the project tile grid, filtered by the active category
// - a single in-page project detail view that loads whichever project was
//   selected, instead of navigating to a separate HTML page per project
(function () {
    const CATEGORY_ORDER = ['All', 'Branding Design', 'Typography', 'Infographics', 'Advertising', 'Package Design'];

    const filterBar = document.getElementById('portfolioFilters');
    const grid = document.getElementById('portfolioGrid');
    const detail = document.getElementById('projectDetail');
    const status = document.getElementById('portfolioStatus');

    if (!filterBar || !grid || !detail) return;

    let activeCategory = 'All';
    let lastOpenedTrigger = null;

    function renderFilters() {
        filterBar.innerHTML = '';
        CATEGORY_ORDER.forEach(function (category) {
            const bubble = document.createElement('button');
            bubble.type = 'button';
            bubble.className = 'bubble';
            bubble.textContent = category;
            bubble.setAttribute('aria-pressed', category === activeCategory ? 'true' : 'false');
            bubble.addEventListener('click', function () {
                activeCategory = category;
                renderFilters();
                renderGrid();
                filterBar.querySelector('[aria-pressed="true"]').focus();
            });
            filterBar.appendChild(bubble);
        });
    }

    function renderGrid() {
        grid.innerHTML = '';
        const projects = PROJECTS.filter(function (project) {
            return activeCategory === 'All' || project.categories.indexOf(activeCategory) !== -1;
        });

        projects.forEach(function (project, index) {
            const side = index % 2 === 0 ? 'pgl' : 'pgr';

            const tile = document.createElement('div');
            tile.className = side;

            const link = document.createElement('a');
            link.href = '#' + project.id;
            link.setAttribute('aria-label', 'View project details: ' + project.title);
            link.addEventListener('click', function (event) {
                event.preventDefault();
                openProject(project.id, link);
            });

            const img = document.createElement('img');
            img.src = project.thumbnail;
            img.alt = '';
            link.appendChild(img);

            const text = document.createElement('div');
            text.className = side + '2';
            text.innerHTML =
                '<h2>' + project.title + '</h2>' +
                '<h3>' + project.categories.join('/') + '</h3>' +
                '<p>' + project.tools + '</p>' +
                '<p>' + project.year + '</p>';

            tile.appendChild(link);
            tile.appendChild(text);
            grid.appendChild(tile);
        });

        if (projects.length === 0) {
            grid.innerHTML = '<p style="text-align:center;width:100%;">No projects in this category yet.</p>';
        }

        if (status) {
            status.textContent = projects.length + (projects.length === 1 ? ' project' : ' projects') +
                (activeCategory === 'All' ? ' shown' : ' shown in ' + activeCategory);
        }
    }

    function renderDetail(project) {
        const disclaimer = project.disclaimer
            ? '<p class="detailDisclaimer">*' + project.disclaimer + '*</p>'
            : '';
        const paragraphs = project.description.map(function (paragraph) {
            return '<p>' + paragraph + '</p>';
        }).join('');
        const gallery = project.images.map(function (src, i) {
            return '<img src="' + src + '" alt="' + project.title + ' – image ' + (i + 1) + ' of ' + project.images.length + '">';
        }).join('');

        detail.innerHTML =
            '<button type="button" class="detailClose" aria-label="Close project details">&times; Close</button>' +
            '<img class="detailHero" src="' + project.thumbnail + '" alt="">' +
            '<h2 tabindex="-1">' + project.title + '</h2>' +
            '<p class="detailCategory">' + project.categories.join(' / ') + '</p>' +
            disclaimer +
            paragraphs +
            '<div class="detailGallery">' + gallery + '</div>';

        const closeBtn = detail.querySelector('.detailClose');
        closeBtn.addEventListener('click', closeProject);
        detail.addEventListener('keydown', handleDetailKeydown);
        closeBtn.focus();
    }

    function handleDetailKeydown(event) {
        if (event.key === 'Escape') {
            closeProject();
        }
    }

    function openProject(id, trigger) {
        const project = PROJECTS.filter(function (p) { return p.id === id; })[0];
        if (!project) return;

        lastOpenedTrigger = trigger || lastOpenedTrigger;
        detail.classList.add('open');
        document.body.classList.add('detail-open');
        renderDetail(project);
        history.replaceState(null, '', '#' + id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function closeProject() {
        detail.removeEventListener('keydown', handleDetailKeydown);
        detail.classList.remove('open');
        document.body.classList.remove('detail-open');
        detail.innerHTML = '';
        history.replaceState(null, '', location.pathname + location.search);
        if (lastOpenedTrigger && document.body.contains(lastOpenedTrigger)) {
            lastOpenedTrigger.focus();
        }
        lastOpenedTrigger = null;
    }

    function handleHash() {
        const id = location.hash.replace('#', '');
        if (id && PROJECTS.some(function (p) { return p.id === id; })) {
            openProject(id);
        } else {
            closeProject();
        }
    }

    window.addEventListener('hashchange', handleHash);

    renderFilters();
    renderGrid();
    handleHash();
})();
