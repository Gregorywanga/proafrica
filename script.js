// Service details pop-up for services.html
(function () {
    var SERVICES = {
        stats: {
            title: "Statistical Analysis & Data Visualization",
            text: "We turn raw research and health data into clear, defensible findings. Our analysts work with your study design from the start so the results answer your research questions.",
            points: [
                "Study design support and sample size calculation",
                "Data cleaning, management and quality checks",
                "Descriptive, inferential and regression analysis",
                "Analysis in R, Python, SPSS and Stata",
                "Charts, dashboards and publication-ready tables"
            ]
        },
        genomics: {
            title: "Bioinformatics & Genomics",
            text: "We support laboratories and researchers in analysing biological and sequencing data, from raw reads to interpretable results.",
            points: [
                "Next-generation sequencing data processing",
                "Variant calling, annotation and interpretation",
                "Pathogen genomics and surveillance analysis",
                "Reproducible analysis pipelines",
                "Visualization and reporting of genomic results"
            ]
        },
        redcap: {
            title: "REDCap & Database Development",
            text: "We design and manage secure data collection systems so your study data is accurate, organised and ready for analysis.",
            points: [
                "REDCap project setup and data dictionary design",
                "Custom forms, validation rules and branching logic",
                "User roles, permissions and audit trails",
                "Relational database design and migration",
                "User training and ongoing technical support"
            ]
        },
        software: {
            title: "Custom Research Software Development",
            text: "When off-the-shelf tools do not fit your workflow, we build software tailored to your research or organisation.",
            points: [
                "Web and mobile data collection applications",
                "Dashboards and reporting tools",
                "Workflow automation and system integration",
                "Secure, documented and maintainable code",
                "Deployment, maintenance and handover"
            ]
        },
        infra: {
            title: "Server, Cloud & IT Infrastructure",
            text: "We set up and maintain the technical backbone your research and operations depend on, with security and reliability in mind.",
            points: [
                "Server installation and configuration",
                "Cloud setup, hosting and migration",
                "Data backup and disaster recovery",
                "Network and access security",
                "Monitoring and technical support"
            ]
        },
        ai: {
            title: "Artificial Intelligence (AI) & Machine Learning (ML)",
            text: "We apply AI and machine learning to health and research data to uncover patterns, support decisions and automate repetitive work.",
            points: [
                "Predictive modelling and classification",
                "Image and text data analysis",
                "Model training, validation and evaluation",
                "Deployment of models into practical tools",
                "Guidance on responsible and ethical AI use"
            ]
        },
        grants: {
            title: "Grant Writing & Scientific Publications",
            text: "We help researchers and organisations present their work clearly and competitively to funders and journals.",
            points: [
                "Grant proposal development and budgeting support",
                "Manuscript writing, editing and formatting",
                "Methods and results sections prepared with the analysis",
                "Journal selection and submission support",
                "Responses to reviewers"
            ]
        },
        training: {
            title: "Training & Capacity Building",
            text: "We equip teams with practical skills so they can run their own analysis and data systems with confidence.",
            points: [
                "Hands-on workshops in R, Python, SPSS and Stata",
                "REDCap and data management training",
                "Research methods and biostatistics courses",
                "Customised programmes for institutions and teams",
                "Mentorship and follow-up support"
            ]
        },
        laboratory: {
            title: "Laboratory Applications & Field Technical Services",
            text: "Leads laboratory and field application services, providing specialized expertise in laboratory technologies, molecular diagnostics, instrumentation, and technical consultancy. Oversees equipment demonstrations, method optimization, troubleshooting, technical training, and field implementation support for research institutions, healthcare facilities, and industry partners.",
            points: []
        }
    };

    var modal, dialog, titleEl, textEl, pointsEl, lastFocus;

    function build() {
        modal = document.createElement("div");
        modal.className = "svc-modal";
        modal.innerHTML =
            '<div class="svc-dialog" role="dialog" aria-modal="true" aria-labelledby="svc-title" tabindex="-1">' +
            '<button type="button" class="svc-close" aria-label="Close details">&times;</button>' +
            '<span class="section-label">SERVICE DETAILS</span>' +
            '<h2 id="svc-title"></h2>' +
            '<p class="svc-text"></p>' +
            '<ul class="svc-points"></ul>' +
            '<a class="btn primary-btn" href="contacts.html">Contact us about this service</a>' +
            '</div>';
        document.body.appendChild(modal);

        dialog = modal.querySelector(".svc-dialog");
        titleEl = modal.querySelector("#svc-title");
        textEl = modal.querySelector(".svc-text");
        pointsEl = modal.querySelector(".svc-points");

        modal.querySelector(".svc-close").addEventListener("click", close);
        modal.addEventListener("click", function (e) {
            if (e.target === modal) close();
        });
    }

    function open(key, trigger) {
        var s = SERVICES[key];
        if (!s) return;
        lastFocus = trigger;
        titleEl.textContent = s.title;
        textEl.textContent = s.text;
        pointsEl.innerHTML = "";
        s.points.forEach(function (p) {
            var li = document.createElement("li");
            li.textContent = p;
            pointsEl.appendChild(li);
        });
        modal.classList.add("open");
        document.body.classList.add("svc-lock");
        dialog.scrollTop = 0;
        dialog.focus();
    }

    function close() {
        modal.classList.remove("open");
        document.body.classList.remove("svc-lock");
        if (lastFocus) lastFocus.focus();
    }

    function init() {
        if (!document.querySelector(".service-card")) return;
        build();

        document.addEventListener("click", function (e) {
            var card = e.target.closest(".service-card");
            if (card) open(card.getAttribute("data-service"), card);
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && modal.classList.contains("open")) {
                close();
                return;
            }
            var card = e.target.closest && e.target.closest(".service-card");
            if (card && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                open(card.getAttribute("data-service"), card);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();


// Enquiry form pop-up for team.html
(function () {
    var MAX_BYTES = 10 * 1024 * 1024;
    var ALLOWED = /\.(pdf|doc|docx)$/i;

    function init() {
        var modal = document.getElementById("enquiry-modal");
        if (!modal) return;

        var dialog = modal.querySelector(".enq-dialog");
        var form = document.getElementById("enquiry-form");
        var formWrap = document.getElementById("enq-form-wrap");
        var success = document.getElementById("enq-success");
        var errorBox = document.getElementById("enq-error");
        var submitBtn = document.getElementById("enq-submit");
        var files = document.getElementById("enq-files");
        var openBtn = document.getElementById("open-enquiry");
        var lastFocus = null;

        function open() {
            lastFocus = document.activeElement;
            modal.classList.add("open");
            document.body.classList.add("svc-lock");
            dialog.scrollTop = 0;
            dialog.focus();
        }

        function close() {
            modal.classList.remove("open");
            document.body.classList.remove("svc-lock");
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        function showError(msg) {
            errorBox.textContent = msg;
            errorBox.hidden = false;
            errorBox.scrollIntoView({ block: "nearest" });
        }

        openBtn.addEventListener("click", open);
        document.getElementById("enq-close").addEventListener("click", close);
        document.getElementById("enq-done").addEventListener("click", close);
        modal.addEventListener("click", function (e) {
            if (e.target === modal) close();
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && modal.classList.contains("open")) close();
        });

        form.addEventListener("submit", function (e) {
            errorBox.hidden = true;

            var total = 0;
            for (var i = 0; i < files.files.length; i++) {
                var f = files.files[i];
                if (!ALLOWED.test(f.name)) {
                    e.preventDefault();
                    showError("\"" + f.name + "\" is not allowed. Please upload PDF or Word (.doc, .docx) files only.");
                    return;
                }
                total += f.size;
            }
            if (total > MAX_BYTES) {
                e.preventDefault();
                showError("Your files are larger than 10 MB in total. Please attach smaller files.");
                return;
            }

            // After sending, FormSubmit brings the visitor back to this page.
            if (location.protocol === "http:" || location.protocol === "https:") {
                document.getElementById("enq-next").value =
                    location.origin + location.pathname + "?enquiry=sent";
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
        });

        // Show the thank-you message after FormSubmit redirects back.
        if (/[?&]enquiry=sent/.test(location.search)) {
            formWrap.hidden = true;
            success.hidden = false;
            open();
            if (window.history && history.replaceState) {
                history.replaceState(null, "", location.pathname);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();