// Content Loader for Megan Shih, LCSW Website
// This file handles loading content from JSON files and populating the HTML

class ContentLoader {
    constructor() {
        this.contentCache = {};
        this.fallbackContent = {
            'main-page': {
                hero: {
                    title: "Therapy to Reconnect, Heal, and Flourish",
                    subtitle: "Trauma-informed therapy for those feeling stuck in patterns, relationships, or emotions. Together, we'll create space for authentic healing and growth.",
                    buttons: {
                        primary: "Start Your Journey",
                        secondary: "Learn About My Approach"
                    }
                },
                therapyWithMe: {
                    title: "therapy with me",
                    content: [
                        "I find joy in working with clients who are feeling \"stuck.\" This can look like a variety of ways: feeling stuck in relationships; stuck in unhealthy patterns; stuck in emotions that make it difficult to experience healing, etc. You will be a good fit for me if you're someone who has had a history of painful and wounding events that you've pushed aside, and are now sensing the impacts of those moments. As a trauma-informed therapist, I work with my clients to make sense of their history, change the narratives that might be causing them suffering, and to create a new story that allows authentic flourishing.",
                        "Alongside a psychodynamic approach, I offer specific trauma interventions including EMDR and CPT. I strive to see my clients not only connect the present symptoms with the past, but to make distinct behavioral changes. As your therapist, you will experience not only clinical support, but a genuine relationship that I believe paves the way for lasting change.",
                        "I stand by research that shows that therapy is most effective when therapeutic alliance between client and therapist is strong, so if it does not feel like I will be the best therapy fit for you, I will support you in finding other resources. To learn more about me and my therapy style, I invite you to reach out for a free 15-min consult."
                    ]
                },
                services: {
                    title: "How I Can Help You",
                    services: [
                        {
                            title: "Individual Therapy",
                            description: "Process past wounds and create new narratives through psychodynamic therapy focused on lasting change.",
                            icon: "individual-therapy-icon.svg"
                        },
                        {
                            title: "EMDR",
                            description: "Eye Movement Desensitization and Reprocessing to help process traumatic memories and reduce their emotional impact.",
                            icon: "emdr-icon.svg"
                        },
                        {
                            title: "Cognitive Processing Therapy",
                            description: "Evidence-based treatment for trauma that helps you process and make sense of difficult experiences.",
                            icon: "cpt-icon.svg"
                        }
                    ]
                },
                education: {
                    title: "my education",
                    items: [
                        "B.S. UC Berkeley",
                        "M.S.W. UNC Chapel Hill",
                        "Post-MSW Fellowship at University of Colorado, Boulder Counseling and Psychiatric Services"
                    ]
                },
                experience: {
                    title: "experience & training",
                    content: "I have experience in the mental health field through a psychiatric inpatient setting, university counseling centers, and private practice. Thus, I have seen a vast array of clients ranging in adult age and in psychological experience. I am a Licensed Clinical Social Worker (#09926822) trained in various institutions, including a post-masters fellowship at CU Boulder, where I sharpened my clinical skills related to individual and group psychotherapy, crisis interventions, and integrative behavioral health."
                },
                outsideOffice: {
                    title: "who i am outside the therapy office",
                    content: "I am a daughter of Taiwanese immigrants and mom of two young kids. My favorite self-care activities are reading books, riding my bike, running, and unstructured time with close friends. I have a deep passion for high quality boba and am consistently trying to find the best boba in the Denver Metro area."
                },
                contactPreview: {
                    title: "Ready to Take the Next Step?",
                    subtitle: "I offer a free 15-minute consultation to see if we're a good fit. Reach out today to begin your healing journey.",
                    cards: [
                        {
                            title: "Free Consultation",
                            description: "15-minute phone call to discuss your needs and see if we're a good fit.",
                            buttonText: "Schedule Now",
                            buttonLink: "contact.html"
                        },
                        {
                            title: "Questions?",
                            description: "Feel free to reach out with any questions about therapy or my approach.",
                            buttonText: "Send Email",
                            buttonLink: "mailto:contact@meganshihlcsw.com"
                        }
                    ]
                },
                footer: {
                    mainInfo: {
                        name: "Megan Shih, LCSW",
                        description: "Trauma-informed therapy in Denver Metro area",
                        license: "License #09926822"
                    },
                    services: [
                        "Individual Therapy",
                        "EMDR",
                        "CPT",
                        "Trauma Therapy"
                    ],
                    information: [
                        "Fees & Insurance",
                        "Policies",
                        "Resources",
                        "Blog"
                    ],
                    contact: {
                        location: "Denver Metro Area",
                        email: "contact@meganshihlcsw.com"
                    }
                }
            }
        };
    }

    async loadContent(pageName) {
        try {
            console.log(`Loading content for: ${pageName}`);
            const response = await fetch(`content/${pageName}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status}`);
            }
            const content = await response.json();
            this.contentCache[pageName] = content;
            console.log(`Successfully loaded content for: ${pageName}`, content);
            return content;
        } catch (error) {
            console.error('Error loading content:', error);
            console.log('Using fallback content...');
            // Use fallback content if JSON loading fails
            if (this.fallbackContent[pageName]) {
                this.contentCache[pageName] = this.fallbackContent[pageName];
                return this.fallbackContent[pageName];
            }
            return null;
        }
    }

    populateMainPage() {
        console.log('Populating main page...');
        const content = this.contentCache['main-page'];
        if (!content) {
            console.error('No content found for main page');
            return;
        }

        // Hero section
        const heroTitle = document.querySelector('.hero-text h1');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');

        if (heroTitle) {
            heroTitle.textContent = content.hero.title;
            console.log('Updated hero title');
        } else {
            console.warn('Hero title element not found');
        }

        if (heroSubtitle) {
            heroSubtitle.textContent = content.hero.subtitle;
            console.log('Updated hero subtitle');
        } else {
            console.warn('Hero subtitle element not found');
        }

        if (heroButtons) {
            const primaryBtn = heroButtons.querySelector('.btn-primary');
            const secondaryBtn = heroButtons.querySelector('.btn-secondary');
            if (primaryBtn) primaryBtn.textContent = content.hero.buttons.primary;
            if (secondaryBtn) secondaryBtn.textContent = content.hero.buttons.secondary;
            console.log('Updated hero buttons');
        } else {
            console.warn('Hero buttons element not found');
        }

        // Therapy with me section
        const therapySection = document.querySelector('#about .content-wrapper');
        if (therapySection) {
            const title = therapySection.querySelector('h2');
            const contentDiv = therapySection.querySelector('.therapy-content');

            if (title) {
                title.textContent = content.therapyWithMe.title;
                console.log('Updated therapy section title');
            }
            if (contentDiv) {
                contentDiv.innerHTML = content.therapyWithMe.content.map(paragraph =>
                    `<p>${paragraph}</p>`
                ).join('');
                console.log('Updated therapy section content');
            }
        } else {
            console.warn('Therapy section not found');
        }

        // Services section
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            const title = servicesSection.querySelector('.section-title');
            if (title) {
                title.textContent = content.services.title;
                console.log('Updated services title');
            }

            const servicesGrid = servicesSection.querySelector('.services-grid');
            if (servicesGrid) {
                servicesGrid.innerHTML = content.services.services.map(service => `
                    <div class="service-card">
                        <div class="service-icon">
                            <img src="images/${service.icon}" alt="${service.title}">
                        </div>
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                        <a href="#${service.title.toLowerCase().replace(/\s+/g, '-')}" class="service-link">Learn More</a>
                    </div>
                `).join('');
                console.log('Updated services grid');
            }
        } else {
            console.warn('Services section not found');
        }

        // Education section
        const educationSection = document.querySelector('#education .content-wrapper');
        if (educationSection) {
            const title = educationSection.querySelector('h2');
            const list = educationSection.querySelector('.education-list');

            if (title) {
                title.textContent = content.education.title;
                console.log('Updated education title');
            }
            if (list) {
                list.innerHTML = content.education.items.map(item =>
                    `<li>${item}</li>`
                ).join('');
                console.log('Updated education list');
            }
        } else {
            console.warn('Education section not found');
        }

        // Experience section
        const experienceSection = document.querySelector('#experience .content-wrapper');
        if (experienceSection) {
            const title = experienceSection.querySelector('h2');
            const contentDiv = experienceSection.querySelector('p');

            if (title) {
                title.textContent = content.experience.title;
                console.log('Updated experience title');
            }
            if (contentDiv) {
                contentDiv.textContent = content.experience.content;
                console.log('Updated experience content');
            }
        } else {
            console.warn('Experience section not found');
        }

        // Outside office section
        const outsideSection = document.querySelector('#outside-office .content-wrapper');
        if (outsideSection) {
            const title = outsideSection.querySelector('h2');
            const contentDiv = outsideSection.querySelector('p');

            if (title) {
                title.textContent = content.outsideOffice.title;
                console.log('Updated outside office title');
            }
            if (contentDiv) {
                contentDiv.textContent = content.outsideOffice.content;
                console.log('Updated outside office content');
            }
        } else {
            console.warn('Outside office section not found');
        }

        // Contact preview section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const title = contactSection.querySelector('h2');
            const subtitle = contactSection.querySelector('p');
            const cards = contactSection.querySelector('.contact-options');

            if (title) {
                title.textContent = content.contactPreview.title;
                console.log('Updated contact preview title');
            }
            if (subtitle) {
                subtitle.textContent = content.contactPreview.subtitle;
                console.log('Updated contact preview subtitle');
            }

            if (cards) {
                cards.innerHTML = content.contactPreview.cards.map(card => `
                    <div class="contact-card">
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                        <a href="${card.buttonLink}" class="btn-primary">${card.buttonText}</a>
                    </div>
                `).join('');
                console.log('Updated contact preview cards');
            }
        } else {
            console.warn('Contact preview section not found');
        }

        // Footer
        this.populateFooter(content.footer);
        console.log('Main page population complete');
    }

    populateContactPage() {
        console.log('Populating contact page...');
        const content = this.contentCache['contact-page'];
        if (!content) {
            console.error('No content found for contact page');
            return;
        }

        // Hero section
        const heroTitle = document.querySelector('.contact-hero-content h1');
        const heroSubtitle = document.querySelector('.contact-hero-content .hero-subtitle');

        if (heroTitle) {
            heroTitle.textContent = content.hero.title;
            console.log('Updated contact hero title');
        }
        if (heroSubtitle) {
            heroSubtitle.textContent = content.hero.subtitle;
            console.log('Updated contact hero subtitle');
        }

        // Contact info section
        const contactDetails = document.querySelector('.contact-details');
        if (contactDetails) {
            const title = contactDetails.querySelector('h2');
            if (title) {
                title.textContent = content.contactInfo.title;
                console.log('Updated contact info title');
            }

            const contactItems = contactDetails.querySelectorAll('.contact-item');
            content.contactInfo.sections.forEach((section, index) => {
                if (contactItems[index]) {
                    const h3 = contactItems[index].querySelector('h3');
                    const p = contactItems[index].querySelector('p');
                    const note = contactItems[index].querySelector('.note');

                    if (h3) h3.textContent = section.title;
                    if (p) {
                        if (section.title.includes('Email')) {
                            p.innerHTML = `<a href="mailto:${section.content}">${section.content}</a>`;
                        } else {
                            p.textContent = section.content;
                        }
                    }
                    if (note) {
                        note.textContent = section.note;
                        if (section.isEmergency) {
                            note.classList.add('emergency');
                        }
                    }
                }
            });
            console.log('Updated contact info sections');
        } else {
            console.warn('Contact details section not found');
        }

        // Form section
        const formContainer = document.querySelector('.contact-form-container');
        if (formContainer) {
            const formTitle = formContainer.querySelector('h2');
            if (formTitle) {
                formTitle.textContent = content.form.title;
                console.log('Updated form title');
            }

            const form = formContainer.querySelector('.contact-form');
            if (form) {
                // Clear existing form fields (except submit button and note)
                const submitButton = form.querySelector('.form-submit');
                const formNote = form.querySelector('.form-note');
                const consentGroup = form.querySelector('.checkbox-group');

                // Remove existing form groups except consent and submit
                const formGroups = form.querySelectorAll('.form-group:not(.checkbox-group)');
                formGroups.forEach(group => group.remove());

                // Add form fields
                content.form.fields.forEach(field => {
                    const fieldGroup = document.createElement('div');
                    fieldGroup.className = 'form-group';

                    const label = document.createElement('label');
                    label.setAttribute('for', field.name);
                    label.textContent = field.label;

                    let input;
                    if (field.type === 'textarea') {
                        input = document.createElement('textarea');
                        input.setAttribute('rows', field.rows);
                        if (field.placeholder) {
                            input.setAttribute('placeholder', field.placeholder);
                        }
                    } else if (field.type === 'select') {
                        input = document.createElement('select');
                        field.options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.setAttribute('value', option.value);
                            optionElement.textContent = option.text;
                            input.appendChild(optionElement);
                        });
                    } else {
                        input = document.createElement('input');
                        input.setAttribute('type', field.type);
                        if (field.placeholder) {
                            input.setAttribute('placeholder', field.placeholder);
                        }
                    }

                    input.setAttribute('id', field.name);
                    input.setAttribute('name', field.name);
                    if (field.required) {
                        input.setAttribute('required', '');
                    }

                    fieldGroup.appendChild(label);
                    fieldGroup.appendChild(input);

                    // Insert before consent group
                    if (consentGroup) {
                        form.insertBefore(fieldGroup, consentGroup);
                    } else {
                        form.appendChild(fieldGroup);
                    }
                });

                // Update consent text
                if (consentGroup) {
                    const consentLabel = consentGroup.querySelector('.checkbox-label');
                    if (consentLabel) {
                        const textSpan = consentLabel.querySelector('span:not(.checkmark)');
                        if (textSpan) {
                            textSpan.textContent = content.form.consent.text;
                        }
                    }
                }

                // Update submit button
                if (submitButton) {
                    const buttonText = submitButton.querySelector('.button-text');
                    if (buttonText) buttonText.textContent = content.form.submitButton;
                }

                // Update form note
                if (formNote) {
                    formNote.innerHTML = `<strong>Please note:</strong> ${content.form.note}`;
                }
                console.log('Updated form fields');
            }
        } else {
            console.warn('Form container not found');
        }

        // FAQ section
        const faqSection = document.querySelector('.faq-section');
        if (faqSection) {
            const title = faqSection.querySelector('h2');
            if (title) {
                title.textContent = content.faq.title;
                console.log('Updated FAQ title');
            }

            const faqGrid = faqSection.querySelector('.faq-grid');
            if (faqGrid) {
                faqGrid.innerHTML = content.faq.questions.map(q => `
                    <div class="faq-item">
                        <h3>${q.question}</h3>
                        <p>${q.answer}</p>
                    </div>
                `).join('');
                console.log('Updated FAQ grid');
            }
        } else {
            console.warn('FAQ section not found');
        }

        // Footer
        this.populateFooter(content.footer);
        console.log('Contact page population complete');
    }

    populateBlogPost(postId) {
        console.log(`Populating blog post: ${postId}`);
        const content = this.contentCache['blog-posts'];
        if (!content) {
            console.error('No blog posts content found');
            return;
        }

        const post = content.posts.find(p => p.id === postId);
        if (!post) {
            console.error(`Blog post with id ${postId} not found`);
            return;
        }

        // Update page title
        const pageTitle = document.querySelector('title');
        if (pageTitle) {
            pageTitle.textContent = `${post.title} | Megan Shih, LCSW`;
        }

        // Update post header
        const postHeader = document.querySelector('.post-header');
        if (postHeader) {
            const title = postHeader.querySelector('h1');
            const date = postHeader.querySelector('.post-date');
            const category = postHeader.querySelector('.post-category');

            if (title) title.textContent = post.title;
            if (date) date.textContent = post.date;
            if (category) category.textContent = post.category;
        }

        // Update post content
        const postContent = document.querySelector('.post-content');
        if (postContent) {
            postContent.innerHTML = post.content.map(item => {
                switch (item.type) {
                    case 'paragraph':
                        return `<p>${item.text}</p>`;
                    case 'heading':
                        return `<h2>${item.text}</h2>`;
                    case 'subheading':
                        return `<h3>${item.text}</h3>`;
                    default:
                        return `<p>${item.text}</p>`;
                }
            }).join('');
        }
        console.log('Blog post population complete');
    }

    populateFooter(footerContent) {
        const footer = document.querySelector('.footer');
        if (!footer || !footerContent) return;

        const footerSections = footer.querySelectorAll('.footer-section');

        // Main info section
        if (footerSections[0]) {
            const h3 = footerSections[0].querySelector('h3');
            const p1 = footerSections[0].querySelector('p:first-of-type');
            const p2 = footerSections[0].querySelector('p:last-of-type');

            if (h3) h3.textContent = footerContent.mainInfo.name;
            if (p1) p1.textContent = footerContent.mainInfo.description;
            if (p2) p2.textContent = footerContent.mainInfo.license;
        }

        // Services section
        if (footerSections[1]) {
            const ul = footerSections[1].querySelector('ul');
            if (ul) {
                ul.innerHTML = footerContent.services.map(service =>
                    `<li><a href="#${service.toLowerCase().replace(/\s+/g, '-')}">${service}</a></li>`
                ).join('');
            }
        }

        // Information section
        if (footerSections[2]) {
            const ul = footerSections[2].querySelector('ul');
            if (ul) {
                ul.innerHTML = footerContent.information.map(item =>
                    `<li><a href="#${item.toLowerCase().replace(/\s+/g, '-')}">${item}</a></li>`
                ).join('');
            }
        }

        // Contact section
        if (footerSections[3]) {
            const p1 = footerSections[3].querySelector('p:first-of-type');
            const p2 = footerSections[3].querySelector('p:last-of-type');

            if (p1) p1.textContent = footerContent.contact.location;
            if (p2) p2.innerHTML = `Email: <a href="mailto:${footerContent.contact.email}">${footerContent.contact.email}</a>`;
        }
        console.log('Footer population complete');
    }
}

// Initialize content loader
const contentLoader = new ContentLoader();

// Load content based on current page
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, starting content population...');
    const currentPage = window.location.pathname;
    console.log('Current page:', currentPage);

    if (currentPage.includes('contact.html')) {
        console.log('Loading contact page content...');
        await contentLoader.loadContent('contact-page');
        contentLoader.populateContactPage();
    } else if (currentPage.includes('blog/') && currentPage.includes('.html')) {
        console.log('Loading blog post content...');
        await contentLoader.loadContent('blog-posts');
        // Extract post ID from URL
        const postId = currentPage.split('/').pop().replace('.html', '');
        contentLoader.populateBlogPost(postId);
    } else {
        // Main page
        console.log('Loading main page content...');
        await contentLoader.loadContent('main-page');
        contentLoader.populateMainPage();
    }
});